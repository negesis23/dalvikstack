import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function SpecsView() {
  // Use server-injected data if available to prevent hydration flicker.
  // Fallback to Velocity tags for SSR rendering.
  const getVal = (key, fallback) => {
    if (typeof window !== "undefined" && window.SYSTEM_INFO && window.SYSTEM_INFO[key]) {
      return window.SYSTEM_INFO[key];
    }
    return fallback;
  };

  return (
    <BaseLayout>
      <section class="py-20 sm:py-40">
        <div class="container-custom">
          <h2 class="text-6xl sm:text-9xl font-black tracking-tighter mb-20 uppercase leading-[0.8]">
            Core <br/> <span class="text-brand-blue">Architecture</span>
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-32">
            {[
              { label: "Execution Layer", key: "os_name", v: V.var("os_name"), color: "block-orange" },
              { label: "Target Virtual Machine", key: "vm_name", v: V.var("vm_name"), color: "block-blue" },
              { label: "Memory Threshold", key: "mem_usage", v: `${V.var("mem_usage")} MB`, color: "block-surface" },
              { label: "I/O Infrastructure", key: "io", v: "NanoHTTPD 2.3.1", color: "block-surface" }
            ].map(s => (
              <div class={`h-80 flex flex-col justify-between ${s.color}`}>
                <span class="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{s.label}</span>
                <p class="text-xl sm:text-2xl font-black leading-tight uppercase">
                  {s.key ? getVal(s.key, s.v) : s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Matrix */}
      <section class="py-20 sm:py-40 bg-brand-bg">
        <div class="container-custom">
          <div class="block-surface">
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-12 sm:mb-24">Technology Integration Matrix</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr class="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted border-b border-white/5">
                    <th class="py-10 px-6">System Layer</th>
                    <th class="py-10 px-6">Implementation Framework</th>
                    <th class="py-10 px-6">Operational Scope</th>
                  </tr>
                </thead>
                <tbody class="text-base font-bold divide-y divide-white/5">
                  {[
                    { l: "Backend Engine", t: "Java 1.7 SE", r: "Network orchestration and stateless process management" },
                    { l: "Template Layer", t: "Apache Velocity 1.7", r: "Stateless string interpolation and macro expansion" },
                    { l: "Reactivity Core", t: "SolidJS 1.8", r: "Declarative state management and DOM reconciliation" },
                    { l: "Design System", t: "Tailwind CSS v4.0", r: "Utility-first design constraints and atomic styling" },
                    { l: "Build Toolchain", t: "ESBuild / DX", r: "JavaScript bundling and DEX-compatible bytecode optimization" }
                  ].map(item => (
                    <tr class="group hover:bg-white/5 transition-colors">
                      <td class="py-12 px-6 text-brand-blue uppercase tracking-tighter">{item.l}</td>
                      <td class="py-12 px-6 text-brand-orange font-mono uppercase tracking-tighter">{item.t}</td>
                      <td class="py-12 px-6 text-brand-muted leading-tight">{item.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Constraints and Stability */}
      <section class="py-20 sm:py-40">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div class="block-orange flex flex-col justify-between h-[500px] text-black">
              <h4 class="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none">Resource <br/> Optimization</h4>
              <p class="text-lg font-bold leading-tight opacity-70">
                Operating within a deterministic 256MB heap allocation, DalvikStack optimizes resource usage by employing stateless handlers and efficient object reuse during the request-response lifecycle.
              </p>
            </div>
            <div class="block-blue flex flex-col justify-between h-[500px] text-white">
              <h4 class="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none">Hydration <br/> Determinism</h4>
              <p class="text-lg font-bold leading-tight opacity-70">
                The hydration engine utilizes a deterministic marker strategy to ensure that client-side reactive proxies attach to server-rendered HTML nodes without re-execution or visual layout shifts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
