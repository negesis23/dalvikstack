import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function HydrationTest() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="inline-flex flex-col items-center gap-6 p-10 bg-app-surface rounded-2xl w-full max-w-sm">
      <div class="text-6xl font-black font-mono text-java">{count()}</div>
      <button 
        onClick={() => setCount(count() + 1)}
        class="px-8 py-4 bg-solid text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-solid-dark active:scale-95 transition-all w-full"
      >
        Test Reactivity
      </button>
      <p class="text-[10px] text-app-muted uppercase tracking-widest">Client-side signal state</p>
    </div>
  );
}

const interactiveRoot = document.getElementById("interactive-root");
if (interactiveRoot) {
  interactiveRoot.innerHTML = "";
  render(() => <HydrationTest />, interactiveRoot);
}
