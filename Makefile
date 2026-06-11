PORT = 8080
F_DIR = frontend
B_DIR = backend
L_DIR = $(B_DIR)/libs
D_DIR = $(B_DIR)/dex
R_DIR = $(B_DIR)/src/main/resources
P_DIR = $(B_DIR)/src/main/resources/public
T_DIR = $(B_DIR)/src/main/resources/templates
O_DIR = $(B_DIR)/out
APP_DEX = $(D_DIR)/app.dex.jar

ECJ = ecj
DX = dx
NPM = npm

G_LIB = $(HOME)/.node_glibc
S_LIB = /system/lib:/data/data/com.termux/files/usr/lib
ENV = LD_LIBRARY_PATH=$(G_LIB):$(S_LIB)

URLS = \
	https://repo1.maven.org/maven2/org/nanohttpd/nanohttpd/2.3.1/nanohttpd-2.3.1.jar \
	https://repo1.maven.org/maven2/org/apache/velocity/velocity/1.7/velocity-1.7.jar \
	https://repo1.maven.org/maven2/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar \
	https://repo1.maven.org/maven2/commons-lang/commons-lang/2.4/commons-lang-2.4.jar

JARS = $(addprefix $(L_DIR)/, $(notdir $(URLS)))
DEXS = $(addprefix $(D_DIR)/, $(notdir $(URLS:.jar=.dex.jar)))

.PRECIOUS: $(L_DIR)/%.jar $(D_DIR)/%.dex.jar

.PHONY: all clean run dev frontend backend deps css assets

all: deps frontend css assets backend

deps: $(DEXS)

$(L_DIR)/%.jar:
	@mkdir -p $(L_DIR)
	@URL=$$(echo "$(URLS)" | tr ' ' '\n' | grep "$*.jar"); \
	if [ ! -f $@ ]; then echo "[DalvikStack] Fetching $*"; curl -sL $$URL -o $@; fi

$(D_DIR)/%.dex.jar: $(L_DIR)/%.jar
	@mkdir -p $(D_DIR)
	@if [ ! -f $@ ]; then echo "[DalvikStack] Dexing $*"; $(DX) --dex --min-sdk-version=23 --output=$@ $<; fi

frontend: $(T_DIR)/index.vm

$(T_DIR)/index.vm: $(shell find $(F_DIR)/src -name "*.jsx" 2>/dev/null)
	@echo "[DalvikStack] Compiling frontend"
	@mkdir -p $(F_DIR)/dist-ssr
	@cd $(F_DIR) && $(NPM) run build:ssr && $(NPM) run compile:templates

css: $(P_DIR)/styles.css

$(P_DIR)/styles.css: $(F_DIR)/src/styles/main.css
	@echo "[DalvikStack] Generating styles"
	@mkdir -p $(P_DIR)
	@cd $(F_DIR) && $(ENV) $(NPM) run build:css

assets: $(shell find $(F_DIR)/src/entries -name "*.jsx" 2>/dev/null)
	@echo "[DalvikStack] Bundling page assets"
	@mkdir -p $(P_DIR)/js
	@cd $(F_DIR) && $(NPM) run build:client

backend: $(APP_DEX)

$(APP_DEX): $(shell find $(B_DIR)/src/main/java -name "*.java")
	@echo "[DalvikStack] Compiling backend"
	@mkdir -p $(O_DIR) $(D_DIR)
	@CP=$$(find $(L_DIR) -name "*.jar" | tr '\n' ':'); \
	$(ECJ) -source 1.7 -target 1.7 -cp "$$CP" -d $(O_DIR) $^
	@$(DX) --dex --min-sdk-version=23 --output=$@ $(O_DIR)

run: all
	@echo "[DalvikStack] Service active on :$(PORT)"
	@fuser -k $(PORT)/tcp 2>/dev/null || true
	@CP_DEX=$$(ls $(D_DIR)/*.dex.jar | tr '\n' ':'); \
	dalvikvm -Xmx256m -cp $(shell pwd)/$(R_DIR):$$CP_DEX com.dalvikstack.infra.Application

dev: all
	@echo "[DalvikStack] Development mode active"
	@fuser -k $(PORT)/tcp 2>/dev/null || true
	@CP_DEX=$$(ls $(D_DIR)/*.dex.jar | tr '\n' ':'); \
	node $(F_DIR)/scripts/watch.js & \
	dalvikvm -Xmx256m -cp $(shell pwd)/$(R_DIR):$$CP_DEX com.dalvikstack.infra.Application

clean:
	rm -rf $(O_DIR) $(D_DIR)/app.dex.jar $(P_DIR) $(F_DIR)/dist-ssr $(T_DIR)/*.vm
	find $(F_DIR)/src -name "*.js" ! -name "runtime.js" -delete
