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
      <body class="bg-monokai-bg text-monokai-text font-sans antialiased m-0 p-0">
        <header class="h-20 md:h-24 flex items-center bg-monokai-panel sticky top-0 z-50">
          <div class="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <h1 class="text-2xl md:text-3xl font-black tracking-tighter text-monokai-pink">DalvikStack</h1>
            <nav class="flex gap-6 md:gap-10 text-xs md:text-sm font-bold uppercase tracking-widest">
              <a href="/" class="text-monokai-text hover:text-monokai-green transition-colors">Home</a>
              <a href="/specs" class="text-monokai-text hover:text-monokai-blue transition-colors">Specs</a>
            </nav>
          </div>
        </header>
        <main class="min-h-screen">
          {props.children}
        </main>
        <footer class="py-12 md:py-20 bg-monokai-panel">
          <div class="container mx-auto px-6 md:px-12 text-center space-y-2">
            <p class="text-lg font-black uppercase">DalvikStack</p>
            <p class="text-xs font-bold opacity-40 uppercase tracking-widest">Modular Fullstack Framework &bull; 2026</p>
          </div>
        </footer>
        {V.if("$dev")}
        <script>
          {`
            (function() {
              const connect = () => {
                const sse = new EventSource('/hmr');
                sse.onmessage = (e) => {
                  if (e.data === 'reload') {
                    console.log('[DalvikStack] HMR: Reloading...');
                    window.location.reload();
                  }
                };
                sse.onerror = () => {
                  sse.close();
                  setTimeout(connect, 1000);
                };
              };
              connect();
            })();
          `}
        </script>
        {V.end()}
        {V.if("$scripts")}
          {V.foreach("$s", "$scripts")}
            <script src={V.var("s")}></script>
          {V.end()}
        {V.end()}
      </body>
    </html>
  );
}
