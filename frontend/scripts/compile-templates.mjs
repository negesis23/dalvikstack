import { renderToString, createComponent } from "solid-js/web";
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const VIEWS_DIR = path.resolve(__dirname, "../dist-ssr/views");
const OUT_DIR = path.resolve(__dirname, "../../backend/src/main/resources/templates");

function decode(s) {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}

async function run() {
  if (!fs.existsSync(VIEWS_DIR)) return;
  const files = fs.readdirSync(VIEWS_DIR).filter(f => f.endsWith("View.js"));
  
  for (const f of files) {
    const View = require(path.join(VIEWS_DIR, f));
    const Comp = View.default || View;
    const name = f.replace("View.js", "").toLowerCase();
    const dest = `${name}.vm`;
    
    const html = renderToString(() => createComponent(Comp, {}));
    const out = decode(html);
    
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, dest), out);
  }
}

run();
