import { BaseLayout } from "../layouts/BaseLayout";
import { V } from "../components/VelocityBridge";

export default function NoJsView() {
  return (
    <BaseLayout>
      <section class="py-20 sm:py-40">
        <div class="container-custom">
          <h2 class="text-6xl sm:text-9xl font-black tracking-tighter mb-20 uppercase leading-[0.8]">
            SSR <br/> <span class="text-brand-orange">Verification</span>
          </h2>
          
          <div class="block-orange mt-20">
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] mb-12 opacity-50">Operational Status: Pure SSR</h3>
            <p class="text-3xl sm:text-6xl font-black leading-tight mb-16 uppercase tracking-tighter">
              {V.var("message")}
            </p>
            <div class="flex flex-wrap gap-4">
              <div class="px-10 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Static_Execution</div>
              <div class="px-10 py-5 border-4 border-black text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Zero_Client_Overhead</div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mt-8">
            <div class="block-surface h-96 flex flex-col justify-between">
              <h4 class="text-2xl sm:text-4xl font-black uppercase tracking-tighter">Validation <br/> Protocol</h4>
              <p class="text-brand-muted text-base sm:text-lg font-bold leading-relaxed">
                This verification layer ensures the integrity of the pre-rendering engine by delivering content without client-side hydration. It serves as the primary diagnostic for server-side stability.
              </p>
            </div>
            <div class="block-blue h-96 flex flex-col justify-between">
              <h4 class="text-2xl sm:text-4xl font-black uppercase tracking-tighter">Network <br/> Efficiency</h4>
              <p class="text-white/70 text-base sm:text-lg font-bold leading-relaxed">
                By bypassing the JavaScript execution cycle, the system achieves the theoretical minimum for Time-to-First-Byte while maintaining visual and structural consistency with the reactive views.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
