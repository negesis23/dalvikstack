import { render } from "solid-js/web";
import Counter from "../components/Counter";

const root = document.getElementById("counter-root");
if (root) {
  root.innerHTML = "";
  render(() => <Counter />, root);
}
