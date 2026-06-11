# DalvikStack

Technical implementation of a web stack running on Java 1.7 (DalvikVM) with a SolidJS frontend. 

This project explores the compilation of modern JSX-based UI into Apache Velocity templates for server-side rendering on resource-constrained environments.

## Architecture
- **Backend**: NanoHTTPD 2.3.1 (Java 1.7 Source/Target).
- **Frontend**: SolidJS components transpiled via Babel and bundled via ESBuild.
- **SSR**: Custom Node.js script to execute `renderToString()` at build-time, outputting `.vm` files for the Java Velocity engine.

## Usage
- **Dependencies**: `make deps`
- **Build**: `make build`
- **Development**: `make dev`
