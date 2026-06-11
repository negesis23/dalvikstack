# DalvikStack Boilerplate

A high-performance, professional fullstack project template designed specifically for virtualized and resource-constrained environments (DalvikVM / Android). DalvikStack bridges the gap between robust Java backend services and modern, reactive frontend development.

---

## 🚀 Core Philosophy

DalvikStack is built on the premise that constrained environments shouldn't mean archaic development workflows. It provides a modern "Developer Experience" (DX) while adhering to strict performance and compatibility constraints:

- **Zero VDOM Overhead**: Utilizing SolidJS for fine-grained reactivity, ensuring minimal CPU cycles are wasted on DOM diffing.
- **AOT Optimized**: Both frontend components and backend logic are compiled Ahead-of-Time to ensure instant execution and minimal memory footprint.
- **Stateless & Modular**: A clean separation between the application layer and the infrastructure, allowing for easy scaling and maintenance.
- **Professional Aesthetic**: A high-contrast, minimalist UI based on the Monokai palette, optimized for clarity and focus.

---

## 🛠 Technical Stack

### Backend Layer
- **Runtime**: Java 1.7 Bytecode (DEX-translated for Dalvik compatibility).
- **Core Server**: [NanoHTTPD](https://github.com/NanoHttpd/nanohttpd) – A lightweight, embedded HTTP server.
- **Template Engine**: [Apache Velocity](https://velocity.apache.org/) – High-speed server-side HTML rendering.
- **Routing**: Custom modular Router/Handler implementation for clean request dispatching.

### Frontend Layer
- **Framework**: [SolidJS](https://www.solidjs.com/) – Fine-grained reactivity without the Virtual DOM.
- **Styling**: [Tailwind CSS v4 Oxide](https://tailwindcss.com/) – High-performance utility-first CSS engine.
- **Bundling**: [esbuild](https://esbuild.github.io/) – Lightning-fast Javascript bundling.
- **Transpilation**: Babel for SolidJS JSX transformation.

---

## 📂 Project Structure

```text
.
├── backend/                # Java Backend Source
│   ├── src/main/java/      # Source code (Handlers, Router, Core)
│   ├── src/main/resources/ # Static assets & Velocity templates
│   ├── libs/               # External JAR dependencies
│   ├── out/                # Compiled .class files
│   └── dex/                # Final .dex.jar artifacts
├── frontend/               # Reactive Frontend Source
│   ├── src/                # SolidJS components, views, and styles
│   ├── dist-ssr/           # Transpiled JSX for template compilation
│   ├── scripts/            # Build and bundling scripts
│   └── package.json        # Node.js dependencies & scripts
├── scripts/                # Development orchestration scripts
├── Makefile                # Unified build system
└── README.md               # Project documentation
```

---

## ⚙️ Development Lifecycle

The project utilizes a unified `Makefile` to manage the entire lifecycle, ensuring consistency across different environments.

### 1. Initial Setup
Ensure you have the required tools installed (`ecj`, `dx`, `node`, `npm`, `make`, `dalvikvm`).

```bash
make deps    # Fetch remote dependencies and dex them
make build   # Perform a full project build (Backend + Frontend)
```

### 2. Standard Execution
Run the compiled application on the target VM.

```bash
make run
```
The server will start on port `8080` (configurable in the Makefile).

### 3. Professional Development Mode
For an optimized developer experience, use the `dev` target. This orchestrates incremental builds and automatic server restarts.

```bash
make dev
```
- **Monitors**: `frontend/src` and `backend/src/main/java`.
- **Intelligent Rebuild**: Detects what changed and only rebuilds the necessary modules.
- **Auto-Reload**: Restarts the server automatically after a successful build.

---

## 🏗 Architecture Flow

1.  **Request Entry**: NanoHTTPD receives an HTTP request.
2.  **Routing**: The `Router` matches the path to a specific `Handler`.
3.  **Data Processing**: The `Handler` performs business logic and populates a `VelocityContext`.
4.  **Template Merging**: The `TemplateEngine` merges the context with a Velocity template (`.vm`).
5.  **Hydration**: The resulting HTML is served to the client, where page-specific SolidJS bundles hydrate the reactive elements (e.g., counters, interactive forms).
6.  **Asset Resolution**: The `AssetHandler` manages static files (CSS/JS) using a 16KB buffer for efficient IO.

---

## 🎨 Design System

DalvikStack follows a strict **High-Contrast Minimalist** aesthetic:
- **Palette**: Deep blacks, Monokai pink, green, blue, and yellow.
- **Depth**: High-contrast borders and structural blocking (no shadows or gradients).
- **Typography**: Bold, uppercase tracking for labels; high-contrast font weights for hierarchy.
- **Responsiveness**: Mobile-first, fluid layout optimized for both small and large displays.

---

## 🛠 Configuration

Operational constants are centralized in `backend/src/main/java/com/dalvikstack/core/Config.java`:
- `APP_NAME`: Application branding.
- `PORT`: Execution port.
- `MIME_MAP`: File extension mappings.
- `BUFFER_SIZE`: IO performance tuning.

---

## ⚠️ Requirements & Compatibility

- **Target VM**: Dalvik (min-sdk 23 recommended).
- **Java**: Source/Target 1.7 (ECJ recommended).
- **Node.js**: v18+ for frontend tooling.
- **Environment**: Linux-based (Termux/Android environment tested).

---

## 📄 License

This boilerplate is provided as a technical implementation template for developers. Feel free to extend and modify for your specific use cases.

---
*Built with precision for the next generation of virtualized applications.*
