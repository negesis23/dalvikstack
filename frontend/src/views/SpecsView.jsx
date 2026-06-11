import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function SpecsView() {
  return (
    <BaseLayout>
      <section class="py-16 md:py-32">
        <div class="container mx-auto px-6 md:px-12">
          <header class="mb-12 md:mb-20 space-y-4">
            <h2 class="text-5xl md:text-7xl font-black text-monokai-blue uppercase tracking-tighter">Specifications</h2>
            <div class="w-20 md:w-32 h-2 md:h-3 bg-monokai-blue"></div>
          </header>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <article class="bg-monokai-panel p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-between">
              <p class="text-xs font-bold text-monokai-pink uppercase tracking-widest mb-8 md:mb-10">Environment</p>
              <div>
                <p class="text-3xl md:text-5xl font-black text-monokai-text mb-2">{V.var("os_name")}</p>
                <p class="text-sm md:text-xl font-bold opacity-40 uppercase tracking-widest">Build {V.var("os_version")}</p>
              </div>
            </article>

            <article class="bg-monokai-panel p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-between">
              <p class="text-xs font-bold text-monokai-green uppercase tracking-widest mb-8 md:mb-10">Virtual Machine</p>
              <div>
                <p class="text-3xl md:text-5xl font-black text-monokai-text mb-2">{V.var("vm_name")}</p>
                <p class="text-sm md:text-xl font-bold opacity-40 uppercase tracking-widest">Optimized Execution</p>
              </div>
            </article>

            <article class="bg-monokai-panel p-8 md:p-10 rounded-2xl md:rounded-3xl md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
              <div class="space-y-2 w-full md:w-auto">
                <p class="text-xs font-bold text-monokai-yellow uppercase tracking-widest mb-4">Memory usage</p>
                <p class="text-5xl md:text-7xl font-black text-monokai-text">{V.var("mem_usage")} <span class="text-2xl md:text-3xl opacity-30">MB</span></p>
              </div>
              <div class="w-full md:w-1/2 h-16 md:h-20 bg-monokai-bg rounded-full p-3 md:p-4 flex items-center">
                <div class="h-full bg-monokai-green rounded-full" style="width: 45%;"></div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
