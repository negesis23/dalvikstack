import { V } from "./VelocityBridge";
import { HydrationScript, NoHydration } from "solid-js/web";

/**
 * The Shell component provides the static HTML envelope (html, head, body).
 * It is ONLY used on the server during the .vm compilation phase.
 */
export function Shell(props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{V.var("title")}</title>
        <link rel="stylesheet" href="/styles.css?v=13" />
        <NoHydration>
          <HydrationScript />
        </NoHydration>
      </head>
      <body class="bg-app-bg text-app-text font-sans antialiased m-0 p-0 selection:bg-solid selection:text-white">
        <div id="app">
          {props.children}
        </div>

        {V.if("scripts")}
          {V.foreach("s", "scripts")}
            <script src={V.var("s")}></script>
          {V.end()}
        {V.end()}
      </body>
    </html>
  );
}
