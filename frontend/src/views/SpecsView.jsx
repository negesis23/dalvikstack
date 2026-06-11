import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function SpecsView() {
  return (
    <BaseLayout>
      <section class="py-24">
        <div class="container mx-auto px-6 max-w-5xl">
          <h2 class="text-4xl font-black mb-16">System Environment</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Operating System", value: V.var("os_name") + " " + V.var("os_version") },
              { label: "Java VM", value: V.var("vm_name") },
              { label: "Heap Memory", value: `${V.var("mem_usage")} MB` },
              { label: "HTTP Server", value: "NanoHTTPD 2.3.1" }
            ].map(s => (
              <div class="p-8 bg-app-surface rounded-2xl flex flex-col justify-between">
                <span class="text-xs font-bold text-solid uppercase tracking-widest mb-4 block">{s.label}</span>
                <p class="text-2xl font-bold leading-tight">{s.value}</p>
              </div>
            ))}
          </div>

          <h2 class="text-4xl font-black mt-32 mb-16">Technical Stack</h2>
          
          <div class="bg-app-surface rounded-2xl overflow-hidden">
            <table class="w-full text-left text-sm md:text-base">
              <thead class="bg-app-bg/50">
                <tr>
                  <th class="p-6 font-bold text-app-muted uppercase tracking-widest text-xs">Component</th>
                  <th class="p-6 font-bold text-app-muted uppercase tracking-widest text-xs">Technology</th>
                  <th class="p-6 font-bold text-app-muted uppercase tracking-widest text-xs">Role</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-app-bg/50">
                {[
                  { component: "Backend", tech: "Java 1.7 / NanoHTTPD", role: "Request handling and static serving" },
                  { component: "View Engine", tech: "Apache Velocity", role: "Server-side template merging" },
                  { component: "Frontend", tech: "SolidJS", role: "Client-side reactivity and JSX source" },
                  { component: "Transpiler", tech: "Babel / ECJ / DX", role: "Conversion to compatible bytecode/formats" },
                  { component: "Bundler", tech: "ESBuild", role: "Static asset optimization" }
                ].map(item => (
                  <tr class="hover:bg-app-bg/30 transition-colors">
                    <td class="p-6 font-bold">{item.component}</td>
                    <td class="p-6 font-mono text-java font-bold">{item.tech}</td>
                    <td class="p-6 text-app-muted">{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
