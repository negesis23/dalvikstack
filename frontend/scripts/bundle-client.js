import esbuild from 'esbuild';
import { solidPlugin } from 'esbuild-plugin-solid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENTRIES_DIR = path.resolve(__dirname, '../src/entries');
const OUT_DIR = path.resolve(__dirname, '../../backend/src/main/resources/public/js');
const MANIFEST = path.resolve(__dirname, '../../backend/src/main/resources/assets.properties');

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  await esbuild.build({
    entryPoints: [path.resolve(__dirname, '../src/runtime.js')],
    bundle: true,
    outfile: path.join(OUT_DIR, 'runtime.js'),
    minify: true,
    format: 'iife',
    target: 'es6',
    define: { 'process.env.NODE_ENV': '"production"' }
  });

  const manifest = [];
  if (fs.existsSync(ENTRIES_DIR)) {
    const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    for (const f of files) {
      const name = f.replace(/\.(jsx|js)$/, '');
      const content = fs.readFileSync(path.join(ENTRIES_DIR, f), 'utf8');
      const needsRuntime = content.includes('solid-js') || content.includes('<');
      
      await esbuild.build({
        entryPoints: [path.join(ENTRIES_DIR, f)],
        bundle: true,
        outfile: path.join(OUT_DIR, `${name}.js`),
        minify: true,
        format: 'iife',
        target: 'es6',
        external: needsRuntime ? ['window.Solid', 'window.SolidWeb'] : [],
        define: { 'process.env.NODE_ENV': '"production"' },
        plugins: needsRuntime ? [
          {
            name: 'shim-solid',
            setup(build) {
              build.onResolve({ filter: /^solid-js$/ }, () => ({ path: 'solid-js', namespace: 'shim' }));
              build.onResolve({ filter: /^solid-js\/web$/ }, () => ({ path: 'solid-js-web', namespace: 'shim' }));
              build.onLoad({ filter: /.*/, namespace: 'shim' }, (args) => {
                const code = args.path === 'solid-js' ? 'module.exports = window.Solid' : 'module.exports = window.SolidWeb';
                return { contents: code, loader: 'js' };
              });
            }
          },
          solidPlugin({ generate: 'dom', hydratable: true })
        ] : [],
      });
      
      const scripts = needsRuntime ? [`/js/runtime.js`, `/js/${name}.js`] : [`/js/${name}.js`];
      manifest.push(`${name}.scripts=${scripts.join(',')}`);
      console.log(`[DalvikStack] Asset: ${name} (Runtime: ${needsRuntime})`);
    }
  }
  fs.writeFileSync(MANIFEST, manifest.join('\n'));
}

run();
