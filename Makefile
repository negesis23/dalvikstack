# ==========================================
# DalvikStack Build System
# ==========================================

# Configuration
PORT     := 8080
B_DIR    := backend
F_DIR    := frontend
R_DIR    := $(B_DIR)/src/main/resources
D_DIR    := $(B_DIR)/dex
O_DIR    := $(B_DIR)/out
L_DIR    := $(B_DIR)/libs
P_DIR    := $(R_DIR)/public
T_DIR    := $(R_DIR)/templates
APP_DEX  := $(D_DIR)/app.dex.jar

# Tools
ECJ      := ecj
DX       := dx
NPM      := npm
DALVIKVM := dalvikvm

# Tailwind Oxide Libs
G_LIB    := $(HOME)/.node_glibc
S_LIB    := /system/lib:/data/data/com.termux/files/usr/lib
ENV      := LD_LIBRARY_PATH=$(G_LIB):$(S_LIB)

# Remote Dependencies
URLS := \
	https://repo1.maven.org/maven2/org/nanohttpd/nanohttpd/2.3.1/nanohttpd-2.3.1.jar \
	https://repo1.maven.org/maven2/org/apache/velocity/velocity/1.7/velocity-1.7.jar \
	https://repo1.maven.org/maven2/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar \
	https://repo1.maven.org/maven2/commons-lang/commons-lang/2.4/commons-lang-2.4.jar

JARS := $(addprefix $(L_DIR)/, $(notdir $(URLS)))
DEXS := $(addprefix $(D_DIR)/, $(notdir $(URLS:.jar=.dex.jar)))

# Target Files
TPL_SRCS := $(shell find $(F_DIR)/src -name "*.jsx" 2>/dev/null)
JS_SRCS  := $(shell find $(F_DIR)/src/entries -name "*.jsx" 2>/dev/null)
JAVA_SRCS:= $(shell find $(B_DIR)/src/main/java -name "*.java" 2>/dev/null)

# Logic
.PHONY: all build run watch dev clean deps frontend css assets backend

all: build

build: deps frontend css assets backend

dev: watch

deps: $(DEXS)

$(L_DIR)/%.jar:
	@mkdir -p $(@D)
	@URL=$(filter %$*,$(URLS)); \
	if [ ! -f $@ ]; then \
		printf "[DalvikStack] Fetching %s\n" "$*"; \
		curl -sL $$URL -o $@; \
	fi

$(D_DIR)/%.dex.jar: $(L_DIR)/%.jar
	@mkdir -p $(@D)
	@printf "[DalvikStack] Dexing %s\n" "$*"
	@$(DX) --dex --min-sdk-version=23 --output=$@ $<

frontend: $(T_DIR)/home.vm

$(T_DIR)/home.vm: $(TPL_SRCS)
	@printf "[DalvikStack] Compiling frontend templates\n"
	@mkdir -p $(F_DIR)/dist-ssr $(T_DIR)
	@cd $(F_DIR) && $(NPM) run build:ssr && $(NPM) run compile:templates

css: $(P_DIR)/styles.css

$(P_DIR)/styles.css: $(F_DIR)/src/styles/main.css
	@printf "[DalvikStack] Generating styles\n"
	@mkdir -p $(@D)
	@cd $(F_DIR) && $(ENV) $(NPM) run build:css

assets: $(P_DIR)/js/home.js

$(P_DIR)/js/home.js: $(JS_SRCS)
	@printf "[DalvikStack] Bundling page assets\n"
	@mkdir -p $(P_DIR)/js
	@cd $(F_DIR) && $(NPM) run build:client

backend: $(APP_DEX)

$(APP_DEX): $(JAVA_SRCS)
	@printf "[DalvikStack] Compiling backend\n"
	@mkdir -p $(O_DIR) $(D_DIR)
	@CP=$$(find $(L_DIR) -name "*.jar" | tr '\n' ':'); \
	$(ECJ) -source 1.7 -target 1.7 -cp "$$CP" -d $(O_DIR) $^
	@$(DX) --dex --min-sdk-version=23 --output=$@ $(O_DIR)

run:
	@printf "[DalvikStack] Executing service on :%s\n" "$(PORT)"
	@fuser -k $(PORT)/tcp 2>/dev/null || true
	@CP_DEX=$$(ls $(D_DIR)/*.dex.jar | tr '\n' ':'); \
	$(DALVIKVM) -Xmx256m -cp $(shell pwd)/$(R_DIR):$$CP_DEX com.dalvikstack.infra.Application

watch: build
	@printf "[DalvikStack] Starting development watcher\n"
	@node scripts/watch.js

clean:
	@printf "[DalvikStack] Cleaning artifacts\n"
	@rm -rf $(O_DIR) $(D_DIR)/app.dex.jar $(P_DIR) $(F_DIR)/dist-ssr $(T_DIR)/*.vm
	@rm -f $(R_DIR)/assets.properties
