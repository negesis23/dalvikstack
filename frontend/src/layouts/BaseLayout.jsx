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
      <body class="bg-base-bg text-base-text font-sans antialiased m-0 p-0 selection:bg-base-accent/10 selection:text-base-accent">

        <header class="border-b border-base-border py-4 bg-base-bg sticky top-0 z-50">
          <div class="container mx-auto px-6 flex justify-between items-center">
            <h1 class="text-lg font-bold tracking-tight text-base-text">DalvikStack</h1>
            <nav class="flex gap-6 text-sm font-medium">
              <a href="/" class="text-base-dim hover:text-base-accent transition-colors">Overview</a>
              <a href="/specs" class="text-base-dim hover:text-base-accent transition-colors">Architecture</a>
              <a href="/no-js" class="text-base-dim hover:text-base-accent transition-colors">No-JS</a>
            </nav>
          </div>
        </header>

        <main>
          {props.children}
        </main>

        <footer class="border-t border-base-border py-12 mt-20">
          <div class="container mx-auto px-6 flex justify-between items-center text-xs text-base-dim">
            <p>DalvikStack Runtime Engine</p>
            <p>Java 1.7 + SolidJS</p>
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
