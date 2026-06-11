import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function HydrationTest() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="inline-flex flex-col items-center gap-4">
      <div class="text-3xl font-bold font-mono">{count()}</div>
      <button 
        onClick={() => setCount(count() + 1)}
        class="px-6 py-2 bg-base-accent text-white font-bold text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all"
      >
        Test_Reactivity
      </button>
      <p class="text-[10px] text-base-dim uppercase tracking-wider">Client-side signal state</p>
    </div>
  );
}

const interactiveRoot = document.getElementById("interactive-root");
if (interactiveRoot) {
  interactiveRoot.innerHTML = "";
  render(() => <HydrationTest />, interactiveRoot);
}
