import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function NoJsView() {
  return (
    <BaseLayout>
      <section class="py-24">
        <div class="container mx-auto px-6 max-w-4xl">
          <h2 class="text-4xl font-extrabold tracking-tight mb-8 text-base-accent">Server-Side Rendering (Pure)</h2>
          <div class="p-8 bg-base-surface border-l-4 border-base-accent mb-12">
            <p class="text-2xl font-medium leading-relaxed">
              {V.var("message")}
            </p>
          </div>
          
          <div class="space-y-8">
            <h3 class="text-xl font-bold">Implementation Details</h3>
            <p class="text-base-dim leading-relaxed">
              This page demonstrates the fallback capability of the stack. When a route does not require client-side interactivity, the system serves pure HTML rendered by the Java backend. 
            </p>
            <ul class="list-disc list-inside space-y-4 text-base-dim pl-4">
              <li>No JavaScript bundles are included in this response.</li>
              <li>The HTML structure was generated from a SolidJS component at build-time.</li>
              <li>The dynamic content above was injected via Apache Velocity.</li>
            </ul>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
