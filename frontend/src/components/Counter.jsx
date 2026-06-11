import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="flex flex-col items-center gap-8">
      <p class="text-7xl md:text-8xl font-black text-monokai-text tracking-tighter tabular-nums leading-none">
        {count()}
      </p>
      <div class="flex gap-2 w-full">
        <button 
          onClick={() => setCount(count() - 1)}
          class="flex-1 bg-monokai-panel border border-monokai-panel hover:border-monokai-pink text-monokai-text font-black py-4 transition-all active:scale-95 uppercase text-xs tracking-widest"
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(count() + 1)}
          class="flex-1 bg-monokai-panel border border-monokai-panel hover:border-monokai-green text-monokai-text font-black py-4 transition-all active:scale-95 uppercase text-xs tracking-widest"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
