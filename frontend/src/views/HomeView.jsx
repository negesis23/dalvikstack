import { BaseLayout } from "../layouts/BaseLayout";

export default function HomeView() {
  return (
    <BaseLayout>
      <section class="py-24 bg-base-surface">
        <div class="container mx-auto px-6 max-w-4xl">
          <h2 class="text-4xl font-extrabold tracking-tight mb-6">Technical Architecture Overview</h2>
          <p class="text-lg text-base-dim leading-relaxed">
            DalvikStack is a technical implementation demonstrating how modern frontend tools can be integrated with legacy Java 1.7 environments. The core of the system is a build-time compilation pipeline that converts JSX components into server-side templates.
          </p>
        </div>
      </section>

      <section class="py-20">
        <div class="container mx-auto px-6 max-w-4xl">
          <h3 class="text-2xl font-bold mb-12">Compilation Pipeline</h3>
          
          <div class="space-y-12">
            <div class="flex gap-8">
              <div class="flex-none w-12 h-12 bg-base-accent text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h4 class="text-lg font-bold mb-2">Frontend Source (JSX)</h4>
                <p class="text-base-dim leading-relaxed">
                  Components are written using <strong>SolidJS JSX</strong>. This provides a declarative way to build the UI and manage reactive state without the overhead of a Virtual DOM.
                </p>
              </div>
            </div>

            <div class="flex gap-8">
              <div class="flex-none w-12 h-12 bg-base-accent text-white flex items-center justify-center font-bold">2</div>
              <div>
                <h4 class="text-lg font-bold mb-2">Transpilation & SSR Extraction</h4>
                <p class="text-base-dim leading-relaxed">
                  During the build process, Babel transpiles the JSX into CommonJS. A custom Node.js script then executes these modules using Solid's <code>renderToString</code> to extract the final HTML structure.
                </p>
              </div>
            </div>

            <div class="flex gap-8">
              <div class="flex-none w-12 h-12 bg-base-accent text-white flex items-center justify-center font-bold">3</div>
              <div>
                <h4 class="text-lg font-bold mb-2">Backend Integration (.vm)</h4>
                <p class="text-base-dim leading-relaxed">
                  The extracted HTML is serialized as <strong>Apache Velocity (.vm)</strong> templates. These templates are then loaded by the NanoHTTPD server (running on Java 1.7) and merged with server-side data at runtime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 border-t border-base-border">
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <h3 class="text-xl font-bold mb-6">Interactive Hydration</h3>
          <p class="text-base-dim mb-10">
            While the initial view is rendered on the server, specific "islands" are hydrated on the client using SolidJS to provide interactivity.
          </p>
          <div id="interactive-root"></div>
        </div>
      </section>
    </BaseLayout>
  );
}
