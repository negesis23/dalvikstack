import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const { renderToString, createComponent } = require("solid-js/web");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEWS_DIR = path.resolve(__dirname, "../dist-ssr/views");
const SRC_TPL_DIR = path.resolve(__dirname, "../src/templates");
const OUT_DIR = path.resolve(__dirname, "../../backend/src/main/resources/templates");

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const shellSrc = path.join(SRC_TPL_DIR, "shell.vm");
  if (fs.existsSync(shellSrc)) {
    fs.copyFileSync(shellSrc, path.join(OUT_DIR, "shell.vm"));
  }

  if (!fs.existsSync(VIEWS_DIR)) return;
  const files = fs.readdirSync(VIEWS_DIR).filter(f => f.endsWith("View.js"));
  
  for (const f of files) {
    const View = require(path.join(VIEWS_DIR, f));
    const Comp = View.default || View;
    const name = f.replace("View.js", "").toLowerCase();
    const dest = `${name}.vm`;
    
    const html = renderToString(() => createComponent(Comp, {}));
    
    // Direct assignment to $content. 
    // We use a Velocity heredoc-like syntax or just a string if it's safe.
    // To be absolutely safe in Velocity 1.7, we'll use #set($content = '...') 
    // and escape any single quotes in the HTML.
    const escapedHtml = html.replace(/'/g, "''");
    
    const tplContent = `#set($content = '${escapedHtml}')\n#parse("shell.vm")`;
    
    fs.writeFileSync(path.join(OUT_DIR, dest), tplContent);
  }
}

run().catch(console.error);
