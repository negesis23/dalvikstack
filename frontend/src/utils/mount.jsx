import { render } from "solid-js/web";
import { createComponent } from "solid-js";

export function mountIslands(registry) {
  if (typeof document === "undefined") return;

  document.querySelectorAll('[data-island]').forEach(el => {
    const compName = el.getAttribute('data-island');
    const propsStr = el.getAttribute('data-props');
    const props = propsStr ? JSON.parse(decodeURIComponent(propsStr)) : {};
    
    const Component = registry[compName];
    
    if (Component) {
      // Clear the SSR generated DOM to avoid ID mismatches
      el.innerHTML = "";
      // Re-render the interactive client component synchronously
      render(() => createComponent(Component, props), el);
      console.log(`[DalvikStack] Hydrated Island: <${compName} />`);
    } else {
      console.warn(`[DalvikStack] Island Component '${compName}' not found in registry.`);
    }
  });
}
