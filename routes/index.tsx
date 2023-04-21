import { Head } from "$fresh/runtime.ts";
import Saizencode from "../islands/Saizencode.tsx";
import menus from "../data/menu.json" assert { type: "json" };

export default function Home() {
  return (
    <>
      <Head>
        <title>Saizencode</title>
      </Head>
      <Saizencode menus={menus} />
    </>
  );
}
