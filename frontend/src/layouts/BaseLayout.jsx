import { V } from "../components/VelocityBridge";

export function BaseLayout(props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{V.var("title")}</title>
        <link rel="stylesheet" href="/styles.css?v=7" />
      </head>
      <body class="bg-app-bg text-app-text font-sans antialiased m-0 p-0">

        <header class="py-8 bg-app-bg sticky top-0 z-50">
          <div class="container mx-auto px-6 max-w-5xl flex justify-between items-center">
            <h1 class="text-xl font-black tracking-tight">
              <span class="text-java">Dalvik</span><span class="text-solid">Stack</span>
            </h1>
            <nav class="flex gap-8 text-sm font-medium">
              <a href="/" class="text-app-muted hover:text-java transition-colors">Overview</a>
              <a href="/specs" class="text-app-muted hover:text-solid transition-colors">Architecture</a>
              <a href="/no-js" class="text-app-muted hover:text-java transition-colors">No-JS</a>
            </nav>
          </div>
        </header>

        <main class="min-h-[80vh]">
          {props.children}
        </main>

        <footer class="py-16 mt-20 bg-app-surface">
          <div class="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-app-muted">
            <p>DalvikStack Runtime Engine</p>
            <p>
              <span class="text-java font-bold">Java 1.7</span> + <span class="text-solid font-bold">SolidJS</span>
            </p>
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
