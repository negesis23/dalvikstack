import { V } from "../components/VelocityBridge";

export function BaseLayout(props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{V.var("title")}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-monokai-bg text-monokai-text font-sans antialiased m-0 p-0 overflow-x-hidden selection:bg-monokai-pink selection:text-white">
        <header class="h-20 md:h-24 flex items-center bg-monokai-sub border-b border-monokai-panel sticky top-0 z-50">
          <div class="container mx-auto px-4 md:px-12 flex justify-between items-center">
            <h1 class="text-2xl md:text-3xl font-black text-monokai-pink tracking-tight">DalvikStack</h1>
            <nav class="flex gap-8 md:gap-12 text-[11px] font-black uppercase tracking-widest">
              <a href="/" class="hover:text-monokai-green transition-all">Home</a>
              <a href="/specs" class="hover:text-monokai-blue transition-all">Architecture</a>
            </nav>
          </div>
        </header>

        <main class="min-h-screen">
          {props.children}
        </main>
        <footer class="py-16 bg-monokai-sub border-t border-monokai-panel">
          <div class="container mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="text-center md:text-left">
              <p class="text-lg font-black uppercase tracking-tighter mb-2">DalvikStack</p>
              <p class="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Execution Layer Bridge</p>
            </div>
            <p class="text-[10px] font-black opacity-20 uppercase tracking-widest">&copy; 2026 DalvikStack implementation</p>
          </div>
        </footer>
        {V.if("$scripts")}
          {V.foreach("$s", "$scripts")}
            <script src={V.var("s")}></script>
          {V.end()}
        {V.end()}
      </body>
    </html>
  );
}
