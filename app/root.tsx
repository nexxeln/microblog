import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import reset from "@unocss/reset/tailwind.css";

import uno from "~/styles/uno.css";
import globals from "~/styles/globals.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: uno },
  { rel: "stylesheet", href: globals },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-#050505 text-neutral-300 font-sans">
        <main className="flex flex-col items-center ">
          <h1 className="text-4xl text-red-400 text-center pt-10 font-black">
            <Link to="/">nexxel's microblog</Link>
          </h1>
          <div className="w-4/5 md:w-2/5 pb-10">
            <Outlet />
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
