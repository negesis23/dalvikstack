import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function SpecsView() {
  return (
    <BaseLayout>
      <section class="py-20">
        <div class="container mx-auto px-6 max-w-4xl">
          <h2 class="text-3xl font-bold mb-12">System Environment</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Operating System", value: V.var("os_name") + " " + V.var("os_version") },
              { label: "Java VM", value: V.var("vm_name") },
              { label: "Heap Memory Usage", value: `${V.var("mem_usage")} MB` },
              { label: "HTTP Server", value: "NanoHTTPD 2.3.1" }
            ].map(s => (
              <div class="p-6 border border-base-border bg-base-surface">
                <span class="text-[10px] font-bold text-base-dim uppercase tracking-widest mb-1 block">{s.label}</span>
                <p class="font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          <h2 class="text-3xl font-bold mt-20 mb-12">Technical Stack</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse border border-base-border text-sm">
              <thead class="bg-base-surface">
                <tr>
                  <th class="p-4 border border-base-border font-bold">Component</th>
                  <th class="p-4 border border-base-border font-bold">Technology</th>
                  <th class="p-4 border border-base-border font-bold">Role</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { component: "Backend", tech: "Java 1.7 / NanoHTTPD", role: "Request handling and static serving" },
                  { component: "View Engine", tech: "Apache Velocity", role: "Server-side template merging" },
                  { component: "Frontend", tech: "SolidJS", role: "Client-side reactivity and JSX source" },
                  { component: "Transpiler", tech: "Babel / ECJ / DX", role: "Conversion to compatible bytecode/formats" },
                  { component: "Bundler", tech: "ESBuild", role: "Static asset optimization" }
                ].map(item => (
                  <tr>
                    <td class="p-4 border border-base-border">{item.component}</td>
                    <td class="p-4 border border-base-border font-mono">{item.tech}</td>
                    <td class="p-4 border border-base-border text-base-dim">{item.role}</td>
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
