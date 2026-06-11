import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function SpecsView() {
  return (
    <BaseLayout>
      <section class="py-24 bg-monokai-sub">
        <div class="container mx-auto px-4 md:px-12">
          <header class="mb-20 space-y-4">
            <h2 class="text-6xl md:text-8xl font-black text-monokai-text uppercase tracking-tighter leading-none">System <br /> Architecture</h2>
            <div class="h-2 w-24 bg-monokai-blue"></div>
          </header>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: "Environment", value: V.var("os_name"), color: "bg-monokai-pink", sub: "Platform Context" },
              { label: "Execution", value: V.var("vm_name"), color: "bg-monokai-green", sub: "Runtime Engine" },
              { label: "Memory", value: `${V.var("mem_usage")} MB`, color: "bg-monokai-blue", sub: "Heap State" },
              { label: "Network", value: "NanoHTTPD", color: "bg-monokai-yellow", sub: "Core Server" },
              { label: "UI Layer", value: "SolidJS", color: "bg-monokai-orange", sub: "AOT Reactive" },
              { label: "View Engine", value: "Velocity", color: "bg-monokai-purple", sub: "VTL Parser" }
            ].map(spec => (
              <div class="bg-monokai-bg border-l-8 border-monokai-panel p-10 space-y-8 hover:border-monokai-text transition-all">
                <span class="text-[10px] font-black text-monokai-text opacity-20 uppercase tracking-[0.4em]">{spec.label}</span>
                <div class="space-y-1">
                  <p class="text-3xl font-black text-monokai-text tracking-tighter uppercase truncate">{spec.value}</p>
                  <p class="text-xs font-bold text-monokai-text opacity-40 uppercase tracking-widest">{spec.sub}</p>
                </div>
                <div class={`h-1 w-12 ${spec.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-32">
        <div class="container mx-auto px-4 md:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div class="lg:col-span-4 space-y-8">
              <h3 class="text-4xl font-black uppercase tracking-tighter leading-none text-monokai-yellow">Module <br /> Registry</h3>
              <p class="text-lg opacity-40 leading-relaxed font-medium">
                Surgical mapping of all active bytecode packages and frontend entries currently registered in the project classpath.
              </p>
              <div class="pt-8 border-t border-monokai-panel">
                <span class="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">Registry Status: Synchronized</span>
              </div>
            </div>
            <div class="lg:col-span-8 bg-monokai-sub border-2 border-monokai-panel p-1 md:p-2">
              <div class="bg-monokai-bg p-8 md:p-12 space-y-4">
                {[
                  { name: "infra.router", type: "Java", status: "Active", color: "text-monokai-green" },
                  { name: "infra.handler", type: "Java", status: "Active", color: "text-monokai-green" },
                  { name: "infra.util", type: "Java", status: "Active", color: "text-monokai-green" },
                  { name: "js.home", type: "Solid", status: "Loaded", color: "text-monokai-blue" },
                  { name: "js.specs", type: "Solid", status: "Loaded", color: "text-monokai-blue" }
                ].map(mod => (
                  <div class="flex justify-between items-center py-4 border-b border-monokai-panel last:border-0 group hover:bg-monokai-panel px-4 transition-colors">
                    <div class="flex items-center gap-6">
                      <span class="text-[10px] font-black opacity-20 uppercase w-12">{mod.type}</span>
                      <span class="text-xs font-bold text-monokai-text uppercase tracking-widest">{mod.name}</span>
                    </div>
                    <span class={`text-[10px] font-black uppercase tracking-widest ${mod.color}`}>{mod.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
