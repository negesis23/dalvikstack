import { BaseLayout } from "../layouts/BaseLayout";

export default function HomeView() {
  return (
    <BaseLayout>
      <section class="py-16 md:py-32">
        <div class="container mx-auto px-6 md:px-12 space-y-6 md:space-y-8">
          <h2 class="text-5xl md:text-8xl font-black text-monokai-text leading-tight md:leading-[0.9] tracking-tighter">
            DalvikStack <br class="hidden md:block" />
            <span class="text-monokai-green">Architecture.</span>
          </h2>
          <p class="text-lg md:text-2xl font-medium text-monokai-text opacity-60 max-w-3xl leading-relaxed">
            A modular framework for legacy execution environments using AOT compilation and native virtualization.
          </p>
          <div class="pt-6 md:pt-10">
            <a href="/specs" class="bg-monokai-pink text-white font-black px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl uppercase tracking-widest text-sm md:text-base hover:opacity-90 active:scale-95 transition-all inline-block">
              View Specifications
            </a>
          </div>
        </div>
      </section>

      <section class="py-16 md:py-24 bg-monokai-panel">
        <div class="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div class="space-y-6">
            <h3 class="text-3xl md:text-4xl font-black text-monokai-blue uppercase tracking-tighter">System Integration</h3>
            <p class="text-base md:text-lg leading-relaxed opacity-70">
              DalvikStack integrates a Java backend with a SolidJS frontend, optimized for resource-constrained environments.
            </p>
          </div>
          <div id="counter-root" class="bg-monokai-bg p-8 md:p-12 rounded-3xl md:rounded-[3rem] text-center">
            <p class="text-monokai-pink text-xs font-bold uppercase tracking-widest mb-4">Reactive Module</p>
            <p class="text-4xl md:text-6xl font-black text-monokai-text animate-pulse">...</p>
          </div>
        </div>
      </section>

      <section class="py-16 md:py-32 container mx-auto px-6 md:px-12">
        <h3 class="text-4xl md:text-5xl font-black text-monokai-yellow mb-12 md:mb-20 tracking-tighter uppercase">Core Technologies</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            { color: "monokai-pink", title: "SolidJS AOT", desc: "UI library with ahead-of-time compilation for optimized DOM execution." },
            { color: "monokai-green", title: "NanoHTTPD", desc: "Embedded web server for minimal dependency environments." },
            { color: "monokai-blue", title: "Velocity", desc: "Server-side template engine for rapid content delivery." },
            { color: "monokai-yellow", title: "ECJ & DX", desc: "Compiler toolchain for Dalvik-compatible bytecode translation." },
            { color: "monokai-orange", title: "Tailwind CSS", desc: "Utility-first styling engine optimized for performance." },
            { color: "monokai-text", title: "Clean Design", desc: "Maintainable architecture with strict layer separation." }
          ].map(item => (
            <article class="bg-monokai-panel p-8 md:p-10 rounded-2xl md:rounded-3xl space-y-4">
              <div class={`w-12 md:w-16 h-1.5 md:h-2 bg-${item.color} rounded-full mb-4 md:mb-6`}></div>
              <h4 class="text-2xl md:text-3xl font-black tracking-tight">{item.title}</h4>
              <p class="text-sm md:text-lg opacity-60 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </BaseLayout>
  );
}
