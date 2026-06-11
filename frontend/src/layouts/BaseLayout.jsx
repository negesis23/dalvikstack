import { Header, Footer } from "../components/SharedUI";

export function BaseLayout(props) {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-grow">
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
