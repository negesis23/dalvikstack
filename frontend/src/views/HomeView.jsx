import { createSignal } from "solid-js";
import { BaseLayout } from "../layouts/BaseLayout";

export default function HomeView() {
  const [count, setCount] = createSignal(0);

  return (
    <BaseLayout>
      {/* Hero Section */}
      <section class="py-16 sm:py-32 lg:py-48">
        <div class="container-custom">
          <div class="max-w-5xl">
            <h2 class="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter mb-12 uppercase leading-[0.8] transition-all">
              Core <br/> <span class="text-brand-orange">Architecture</span>
            </h2>
            <p class="text-xl sm:text-3xl font-bold text-brand-muted leading-tight max-w-3xl">
              Deterministic state management for legacy Java virtual machine runtimes.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section class="py-10 sm:py-20">
        <div class="container-custom">
          <div class="block-blue">
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] mb-12 opacity-60">Technical Philosophy</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
              <div>
                <p class="text-3xl sm:text-5xl font-black leading-[1.1] mb-10 uppercase tracking-tighter">
                  Separation of environment concerns.
                </p>
                <p class="text-base sm:text-lg font-bold leading-relaxed opacity-90">
                  DalvikStack offloads UI orchestration to the build phase. This ensures that the Dalvik VM remains focused on data integrity and process execution, while the client maintains high-fidelity reactivity without Virtual DOM overhead.
                </p>
              </div>
              <div class="flex flex-col gap-6">
                <div class="h-32 bg-white/10 rounded-[2.5rem]"></div>
                <div class="h-32 bg-brand-orange rounded-[2.5rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Pipeline */}
      <section class="py-20 sm:py-40">
        <div class="container-custom">
          <div class="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">Compilation Pipeline</h3>
            <p class="text-brand-muted font-bold text-sm max-w-xs text-right hidden lg:block">
              Static analysis and bytecode optimization for legacy JVM.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="block-surface aspect-square flex flex-col justify-between">
              <span class="text-7xl font-black text-brand-orange opacity-10 leading-none">01</span>
              <div>
                <h4 class="text-2xl font-black uppercase mb-4 tracking-tighter">Babel Extraction</h4>
                <p class="text-brand-muted text-sm font-bold leading-relaxed">
                  Extracts SolidJS reactive definitions and converts JSX into server-compatible JavaScript functions.
                </p>
              </div>
            </div>

            <div class="block-surface aspect-square flex flex-col justify-between">
              <span class="text-7xl font-black text-brand-blue opacity-10 leading-none">02</span>
              <div>
                <h4 class="text-2xl font-black uppercase mb-4 tracking-tighter">SSR Synthesis</h4>
                <p class="text-brand-muted text-sm font-bold leading-relaxed">
                  Build-time execution of the component tree to generate static HTML fragments for Velocity injection.
                </p>
              </div>
            </div>

            <div class="block-surface aspect-square flex flex-col justify-between">
              <span class="text-7xl font-black text-white opacity-10 leading-none">03</span>
              <div>
                <h4 class="text-2xl font-black uppercase mb-4 tracking-tighter">DEX Compilation</h4>
                <p class="text-brand-muted text-sm font-bold leading-relaxed">
                  Optimization of Java source code into Dalvik-native bytecode via the DX toolchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section class="py-20">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-7 block-orange flex flex-col justify-between min-h-[400px]">
              <h4 class="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-12 text-black">High-Fidelity <br/> Hydration</h4>
              <p class="text-lg font-bold leading-tight text-black max-w-md">
                Deterministic state recovery ensures that client-side proxies attach to server-rendered nodes without re-rendering.
              </p>
            </div>
            <div class="lg:col-span-5 block-surface flex flex-col justify-center gap-12 text-center lg:text-left">
              <div>
                <h5 class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue mb-4">Memory Constraint</h5>
                <p class="text-2xl font-bold uppercase tracking-tight">256MB Heap</p>
              </div>
              <div>
                <h5 class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-4">Runtime Target</h5>
                <p class="text-2xl font-bold uppercase tracking-tight">Java 1.7 SE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Management Demo */}
      <section class="py-32 sm:py-64">
        <div class="container-custom flex flex-col items-center">
          <div class="max-w-2xl w-full text-center">
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue mb-20">Reactivity Validation</h3>
            <div class="block-orange flex flex-col items-center gap-16">
              <div class="text-[12rem] sm:text-[16rem] font-black tracking-tighter tabular-nums text-black leading-none">{count()}</div>
              <button 
                onClick={() => setCount(count() + 1)}
                class="w-full py-10 sm:py-16 bg-black rounded-[2.5rem] text-xs sm:text-sm font-black uppercase tracking-[0.5em] text-white hover:scale-[1.02] active:scale-95 transition-transform"
              >
                Update_Core_State
              </button>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Active Hydration Context</p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
