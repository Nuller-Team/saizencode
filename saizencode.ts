import { serve } from "https://deno.land/std/http/server.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

import menuData from "./menu.json" assert { type: "json" };

const args = parse(Deno.args);
const port = parseInt(args.port ?? "8000");

const server = new Application();

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = `
    <html>

    <head>
        <meta charset="utf-8" />
        <title>【Nuller-Apps】Saizencode</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Saizencode" />
        <meta property="og:site_name" content="Nuller-Apps" />
        <meta property="og:description" content="このアプリは、サイゼリヤのメニュー番号を手軽に検索できる便利なツールです。メニュー番号からは、直接その商品を注文することができます。また、メニュー名からメニュー番号に変換することもできます。ただし、このツールは非公式のものであり、実際の情報と異なる場合があることに注意してください。" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/Nuller-Team/saizencode/main/ocg/Saizencode.png" />
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="600">
    </head>

    <body class="bg-gray-100 min-h-screen flex items-center justify-center p-3">

        <div class="bg-white py-40 px-20 rounded-lg shadow-lg w-100">
            <div class="bg-yellow-100 my-3 border-l-4 border-yellow-400 p-4" role="alert">
                <p class="font-bold">注意事項</p>
                <p>このアプリは非公式のものです。そのため、情報や価格については正確でない可能性があります。あらかじめご了承ください。</p>
            </div>
            <h1 class="text-5xl font-bold mb-4">Saizencode🥗</h1>
            <p class="text-2xl font-bold mb-4">サイゼリヤのメニュー名やメニュー番号でメニュー詳細を検索することができます。</p>
            <form method="get" action="/search" class="flex">
                <input type="text" name="query"
                    class="rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white p-2 w-full"
                    placeholder="検索例）SA02" style="font-size: 16pt;" />
                <button type="submit"
                    class="px-4 bg-blue-500 text-white font-semibold rounded-r-lg border-t border-b border-r hover:bg-blue-700">
                    <span class="material-symbols-outlined">
                        search
                    </span>
                </button>
            </form>
            <div id="result" class="mt-4">${result}</div>
        </div>
    </body>

    </html>
    `;
  })
  .get("/search", (ctx) => {
    const query = ctx.request.url.searchParams.get("query")?.trim();
    let result = "";

    if (query) {
      const regex = new RegExp(query, "i");
      const filteredMenuList = menuData.filter(
        (menu) => regex.test(menu.name) || regex.test(menu.id)
      );

      if (filteredMenuList.length > 0) {
        result = `
          <table class="w-full mt-4">
            <thead>
              <tr>
                <th class="text-left px-4 py-2">メニュー番号</th>
                <th class="text-left px-4 py-2">メニュー名</th>
                <th class="text-left px-4 py-2">値段</th>
              </tr>
            </thead>
            <tbody>
        `;

        filteredMenuList.forEach((menu) => {
          result += `
            <tr>
              <td class="border px-4 py-2">${menu.id}</td>
              <td class="border px-4 py-2">${menu.name}</td>
              <td class="border px-4 py-2">${menu.price}円</td>
            </tr>
          `;
        });

        result += `
            </tbody>
          </table>
        `;
      } else {
        result = "<p>該当するメニューはありませんでした。</p>";
      }
    }

    ctx.response.body = `
    <html>

    <head>
        <meta charset="utf-8" />
        <title>【Nuller-Apps】Saizencode</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Saizencode" />
        <meta property="og:site_name" content="Nuller-Apps" />
        <meta property="og:description" content="このアプリはサイゼリヤのメニュー番号からメニュー名を検索できます。また、サイゼリヤのメニュー名からメニュー番号に変換できます。なおこのツールは非公式のため、
        実際の情報と異なる場合があります。" />
    </head>

    <body class="bg-gray-100 min-h-screen flex items-center justify-center p-3">

        <div class="bg-white py-40 px-20 rounded-lg shadow-lg w-100">
            <div class="bg-yellow-100 my-3 border-l-4 border-yellow-400 p-4" role="alert">
                <p class="font-bold">注意事項</p>
                <p>このアプリは非公式のものです。そのため、情報や価格については正確でない可能性があります。あらかじめご了承ください。</p>
            </div>
            <h1 class="text-5xl font-bold mb-4">Saizencode🥗</h1>
            <p class="text-2xl font-bold mb-4">サイゼリヤのメニュー名やメニュー番号でメニュー詳細を検索することができます。</p>
            <form method="get" action="/search" class="flex">
                <input type="text" name="query"
                    class="rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white p-2 w-full"
                    placeholder="検索例）SA02" style="font-size: 16pt;" />
                <button type="submit"
                    class="px-4 bg-blue-500 text-white font-semibold rounded-r-lg border-t border-b border-r hover:bg-blue-700">
                    <span class="material-symbols-outlined">
                        search
                    </span>
                </button>
            </form>
            <div id="result" class="mt-4">${result}</div>
        </div>
    </body>

    </html>

    `;
  })
server.use(router.routes());
server.use(router.allowedMethods());
await server.listen({ port });
console.log(`Server running on port ${port}`);
