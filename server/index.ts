import app from "./app.ts";

const server = Bun.serve({
    hostname: "0.0.0.0",
    port: process.env.PORT || 3000,
    fetch: app.fetch
});

console.log(`http://localhost:${server.port}`);

/**

bun 
hono

npm i -g bun
bun init
bun dev or start

bun i hono

bun i zod @hono/zod-validator

setup :

vite

vite+tailwind

vite+shadcn

*/