import { hydrate } from "solid-js/web";
import SpecsView from "../views/SpecsView";

const root = document.getElementById("root");
if (root) {
  hydrate(() => <SpecsView />, root);
}
