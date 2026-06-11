import { hydrate } from "solid-js/web";
import HomeView from "../views/HomeView";

// Standard SolidJS Hydration into the #root mount point
const root = document.getElementById("root");
if (root) {
  hydrate(() => <HomeView />, root);
}
