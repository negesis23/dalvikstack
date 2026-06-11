import { BaseLayout } from "../layouts/BaseLayout";
import { Island } from "../components/Island";
import HydrationTest from "../components/HydrationTest";

export default function HomeView() {
  return (
    <BaseLayout>
      <section class="py-24">
        <div class="container mx-auto px-6 max-w-4xl">
          <h2 class="text-5xl font-black tracking-tight mb-8">Technical Architecture</h2>
          <p class="text-xl text-app-muted leading-relaxed">
            DalvikStack is a technical implementation demonstrating how modern frontend tools can be integrated with legacy <span class="text-java font-bold">Java 1.7</span> environments using a <span class="text-solid font-bold">SolidJS</span> compilation pipeline.
          </p>
        </div>
      </section>

      <section class="py-24 bg-app-surface">
        <div class="container mx-auto px-6 max-w-4xl">
          <h3 class="text-3xl font-bold mb-16">Compilation Pipeline</h3>

          <div class="space-y-16">
            <div class="flex flex-col md:flex-row gap-8 md:gap-12">
              <div class="flex-none w-16 h-16 bg-solid text-white flex items-center justify-center font-black text-2xl rounded-xl">1</div>
              <div>
                <h4 class="text-2xl font-bold mb-4">Frontend Source (JSX)</h4>
                <p class="text-app-muted text-lg leading-relaxed">
                  Components are written using <span class="text-solid font-bold">SolidJS JSX</span>. This provides a declarative way to build the UI and manage reactive state without the overhead of a Virtual DOM.
                </p>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-8 md:gap-12">
              <div class="flex-none w-16 h-16 bg-java text-white flex items-center justify-center font-black text-2xl rounded-xl">2</div>
              <div>
                <h4 class="text-2xl font-bold mb-4">Transpilation & SSR Extraction</h4>
                <p class="text-app-muted text-lg leading-relaxed">
                  During the build process, Babel transpiles the JSX into CommonJS. A custom Node.js script then executes these modules using Solid's <code>renderToString</code> to extract the final HTML structure.
                </p>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-8 md:gap-12">
              <div class="flex-none w-16 h-16 bg-solid-dark text-white flex items-center justify-center font-black text-2xl rounded-xl">3</div>
              <div>
                <h4 class="text-2xl font-bold mb-4">Backend Integration (.vm)</h4>
                <p class="text-app-muted text-lg leading-relaxed">
                  The extracted HTML is serialized as <span class="text-java font-bold">Apache Velocity (.vm)</span> templates. These templates are then loaded by the NanoHTTPD server and merged with server-side data at runtime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-32">
        <div class="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
          <h3 class="text-3xl font-bold mb-8">Smart Automated Islands</h3>
          <p class="text-app-muted text-lg mb-16 max-w-2xl mx-auto">
            Instead of manually rendering components, our pipeline uses an automated `<span class="text-solid">Island</span> />` component. Simply specify the component name and props in the JSX view, and the generic bootstrapper will dynamically locate and hydrate it on the client.
          </p>

          <Island
            name="HydrationTest"
            initialCount={0}
            step={2}
          >
            <HydrationTest initialCount={0} step={2} />
          </Island>
        </div>
      </section>
    </BaseLayout>
  );
}
