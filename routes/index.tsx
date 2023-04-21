import { Head } from "$fresh/runtime.ts";
import Saizencode from "../islands/Saizencode.tsx";
import menus from "../data/menu.json" assert { type: "json" };

export default function Home() {
  return (
    <>
      <Head>
        <title>Saizencode</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Saizencode" />
        <meta property="og:site_name" content="Nuller-Apps" />
        <meta property="og:description"
          content="このアプリは、サイゼリヤのメニュー番号を手軽に検索できる便利なツールです。メニュー番号からは、直接その商品を注文することができます。また、メニュー名からメニュー番号に変換することもできます。ただし、このツールは非公式のものであり、実際の情報と異なる場合があることに注意してください。" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image"
          content="https://raw.githubusercontent.com/Nuller-Team/saizencode/main/ocg/Saizencode.png" />
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="600"></meta>
      </Head>
      <Saizencode menus={menus} />
    </>
  );
}
