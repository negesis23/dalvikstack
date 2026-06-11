import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function NoJsView() {
  return (
    <BaseLayout>
      <section class="py-32">
        <div class="container mx-auto px-6 max-w-4xl">
          <h2 class="text-5xl font-black tracking-tight mb-12">
            <span class="text-solid">Server-Side</span> Rendering
          </h2>
          
          <div class="p-10 bg-app-surface rounded-2xl mb-16 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-2 h-full bg-java"></div>
            <p class="text-2xl font-medium leading-relaxed">
              {V.var("message")}
            </p>
          </div>
          
          <div class="space-y-8">
            <h3 class="text-2xl font-bold">Implementation Details</h3>
            <p class="text-app-muted leading-relaxed text-lg">
              This page demonstrates the fallback capability of the stack. When a route does not require client-side interactivity, the system serves pure HTML rendered exclusively by the Java backend. 
            </p>
            <ul class="list-disc list-inside space-y-4 text-app-muted text-lg pl-4">
              <li>No JavaScript bundles are included in this response.</li>
              <li>The HTML structure was generated from a SolidJS JSX component at build-time.</li>
              <li>The dynamic content above was injected via <span class="text-java font-bold">Apache Velocity</span> template merging.</li>
            </ul>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
