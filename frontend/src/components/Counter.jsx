import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="space-y-6 md:space-y-10">
      <div class="flex flex-col items-center">
        <span class="text-[10px] md:text-xs font-black text-monokai-blue uppercase tracking-[0.4em] mb-2 md:mb-4 text-center">Counter</span>
        <div class="text-[6rem] md:text-[10rem] font-black text-monokai-text leading-none tracking-tighter">
          {count()}
        </div>
      </div>
      <div class="flex justify-center gap-4 md:gap-6">
        <button
          onClick={() => setCount(count() - 1)}
          class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-monokai-panel text-monokai-text text-2xl md:text-3xl font-black rounded-2xl md:rounded-3xl hover:bg-monokai-pink hover:text-white transition-all active:scale-90"
        >
          -
        </button>
        <button
          onClick={() => setCount(count() + 1)}
          class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-monokai-pink text-white text-2xl md:text-3xl font-black rounded-2xl md:rounded-3xl hover:bg-white hover:text-monokai-pink transition-all active:scale-90"
        >
          +
        </button>
      </div>
    </div>
  );
}
