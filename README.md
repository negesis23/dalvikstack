# DalvikStack

**DalvikStack** is a highly specialized, experimental web stack designed to run a modern, reactive frontend (SolidJS) on top of an archaic, resource-constrained backend environment: **Java 1.7 running on DalvikVM (Android/Termux)**.

This project exists as a proof-of-concept to bridge the gap between legacy infrastructure and bleeding-edge web technologies, specifically demonstrating how Server-Side Rendering (SSR) and build-time transpilation can completely eliminate the need for heavy server-side UI rendering engines.

## 🚀 The Architecture

DalvikStack operates on a strict **Zero-VDOM, Ahead-of-Time (AOT) Compiled** pipeline.

### 1. The Backend (Java 1.7 / NanoHTTPD)
At its core, the server is a lightweight instance of **NanoHTTPD**. Because we are targeting DalvikVM, the backend is strictly written in Java 1.7. 
- **Routing**: A custom, zero-dependency router maps HTTP requests to specific `Handler` classes.
- **View Engine**: We use **Apache Velocity (`.vm`)** as the final template engine. However, Velocity is *not* used to write the UI. It is only used to inject dynamic context variables (like system stats) into pre-compiled HTML shells.

### 2. The Frontend (SolidJS)
The entire User Interface is authored in **SolidJS (JSX)**. 
- Instead of using a Virtual DOM (React/Vue), SolidJS compiles directly to actual DOM mutations.
- The UI is designed with **TailwindCSS v4 (Oxide)**, ensuring that only the exact classes used are bundled into a minified, static CSS file.

### 3. The Compilation Pipeline (The Magic)
This is where DalvikStack shines. Java 1.7 cannot understand JSX. To solve this, we use a Node.js build pipeline:
1. **Transpilation**: Babel reads the `frontend/src/views` directory and transpiles the SolidJS JSX into CommonJS modules.
2. **SSR Extraction**: A custom script (`scripts/compile-templates.mjs`) executes these modules locally during the build phase using `renderToString()`.
3. **Template Generation**: The resulting raw HTML is sanitized and exported as `.vm` (Velocity) templates directly into the `backend/src/main/resources/templates` directory.
4. **Hydration**: For interactive elements, ESBuild bundles specific "islands" of SolidJS code which are injected into the final HTML payload, allowing the static Java-served page to become fully reactive on the client.

## 📂 Project Structure

```text
fullstack-dalvik/
├── backend/
│   ├── libs/                   # Java dependencies (NanoHTTPD, Velocity, Commons)
│   ├── src/main/java/          # Core server, Routing, and Handlers
│   └── src/main/resources/     # Output directory for CSS, JS, and .vm templates
├── frontend/
│   ├── src/                    # SolidJS components, views, layouts, and Tailwind CSS
│   ├── scripts/                # Node.js scripts for SSR transpilation and bundling
│   ├── package.json            # Node.js dependencies
│   └── dist-ssr/               # Temporary transpiled Babel output
├── Makefile                    # The heart of the build process
└── README.md                   # You are here
```

## 🛠️ Development Guide

Developing on DalvikStack requires both a Java toolchain (compatible with Dalvik, e.g., `ecj`, `dx`) and a modern Node.js environment.

### Prerequisites
- **Node.js**: v18 or higher.
- **Java**: `ecj` (Eclipse Compiler for Java) for Java 1.7 targeting.
- **Android/Termux SDK**: `dx` tool to convert `.class` files to `.dex`.
- **Make**: Standard GNU Make.

### Getting Started

1. **Install Dependencies**
   Fetch all required Java JARs (NanoHTTPD, Velocity) and automatically convert them to `.dex` format for the DalvikVM.
   ```bash
   make deps
   ```

2. **Full Compilation**
   This triggers the entire pipeline: Babel transpilation, SSR template generation, Tailwind CSS extraction, JS bundling, Java compilation, and final Dexing.
   ```bash
   make build
   ```

3. **Start the Development Server**
   DalvikStack includes a highly optimized, debounced file watcher that monitors both Java and frontend source files.
   ```bash
   make dev
   ```
   - Editing a `.java` file will surgically recompile only the backend.
   - Editing a `.jsx` file will trigger the Babel/SSR pipeline.
   - Editing a `.css` file will trigger the Tailwind Oxide engine.
   - The server (running on `http://localhost:8080`) will automatically restart upon successful compilation.

### Production Execution
To simply run the compiled artifact without the watcher:
```bash
make run
```

---
*DalvikStack: Because building modern web apps on 15-year-old virtual machines builds character.*