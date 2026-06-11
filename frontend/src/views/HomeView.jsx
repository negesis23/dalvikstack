import { BaseLayout } from "../layouts/BaseLayout";

export default function HomeView() {
  return (
    <BaseLayout>
      <section class="min-h-[70vh] flex items-center bg-monokai-sub">
        <div class="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 py-20">
          <div class="space-y-8 self-center">
            <h2 class="text-6xl md:text-8xl font-black text-monokai-text uppercase tracking-tighter leading-[0.9]">
              Instruction <br />
              <span class="text-monokai-green">Execution.</span>
            </h2>
            <p class="text-xl md:text-2xl font-medium text-monokai-text opacity-40 max-w-xl leading-relaxed">
              Java-based backend services integrated with AOT-compiled frontend modules for resource-limited environments.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="/specs" class="bg-monokai-pink text-white font-black px-10 py-5 rounded-none uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all">
                Architecture Detail
              </a>
              <div class="flex items-center px-6 border border-monokai-panel">
                <span class="text-monokai-green font-bold text-xs uppercase tracking-widest">v1.0.4-stable</span>
              </div>
            </div>
          </div>
          <div class="hidden lg:block relative">
            <div class="absolute inset-0 bg-monokai-panel opacity-50 transform rotate-3"></div>
            <div class="relative bg-monokai-sub border-2 border-monokai-panel p-12 space-y-8">
              <div class="flex justify-between items-start">
                <span class="text-4xl font-black text-monokai-pink">01</span>
                <span class="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">Subsystem</span>
              </div>
              <p class="text-2xl font-black uppercase tracking-tight">Modular request dispatching with ahead-of-time reactivity.</p>
              <div class="h-1 bg-monokai-panel w-1/3"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-monokai-bg border-y border-monokai-panel">
        <div class="container mx-auto px-4 md:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div id="counter-root" class="bg-monokai-sub border-4 border-monokai-panel p-12 text-center space-y-6">
              <span class="text-[10px] font-black text-monokai-orange uppercase tracking-[0.5em]">Signal Counter</span>
              <p class="text-7xl font-black text-monokai-text">...</p>
            </div>
            <div class="lg:col-span-2 bg-monokai-panel p-12 flex flex-col justify-center space-y-6">
              <h3 class="text-3xl font-black text-monokai-yellow uppercase tracking-tight">Reactive State Control</h3>
              <p class="text-lg opacity-50 max-w-2xl leading-relaxed">
                The counter module demonstrates fine-grained reactivity using SolidJS signals, bypassing Virtual DOM overhead for direct DOM manipulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-32">
        <div class="container mx-auto px-4 md:px-12">
          <h3 class="text-4xl font-black text-monokai-text uppercase tracking-tighter mb-20">Technical Stack</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { color: "bg-monokai-pink", title: "Backend", desc: "NanoHTTPD implementation handling Java 1.7 bytecode execution.", tag: "JAVA" },
              { color: "bg-monokai-green", title: "Frontend", desc: "SolidJS UI components compiled to direct DOM instructions.", tag: "SOLID" },
              { color: "bg-monokai-blue", title: "Rendering", desc: "Apache Velocity engine for dynamic server-side template merging.", tag: "VTL" },
              { color: "bg-monokai-purple", title: "Execution", desc: "Bytecode translation into target format for native VM runtime.", tag: "DEX" }
            ].map(item => (
              <div class="group bg-monokai-sub border-2 border-monokai-panel p-10 hover:border-monokai-text transition-all cursor-default">
                <div class="flex justify-between items-start mb-10">
                  <div class={`w-12 h-12 ${item.color}`}></div>
                  <span class="text-[10px] font-black opacity-20 uppercase tracking-widest">{item.tag}</span>
                </div>
                <h4 class="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-monokai-green transition-colors">{item.title}</h4>
                <p class="text-base opacity-40 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-32 bg-monokai-sub border-t border-monokai-panel">
        <div class="container mx-auto px-4 md:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div class="lg:col-span-4 space-y-6">
              <h3 class="text-4xl font-black uppercase tracking-tighter leading-none">Internal <br /> Commands</h3>
              <p class="text-sm opacity-30 uppercase tracking-[0.2em]">Build system lifecycle</p>
            </div>
            <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { cmd: "make build", info: "Compile all modules" },
                { cmd: "make run", info: "Start execution" },
                { cmd: "make watch", info: "Auto-rebuild cycle" },
                { cmd: "make clean", info: "Clear artifacts" }
              ].map(c => (
                <div class="flex justify-between items-center p-6 bg-monokai-bg border border-monokai-panel font-mono text-xs">
                  <span class="text-monokai-pink font-bold">{c.cmd}</span>
                  <span class="opacity-30 uppercase">{c.info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
