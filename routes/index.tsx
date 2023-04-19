import { Head } from "$fresh/runtime.ts";
interface MenuItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export default function Home() {
  const menuItems: MenuItem[] = readCsv("static/menu.csv");

  return (
    <>
      <Head>
        <title>Saizencode</title>
      </Head>
      <div class="container mx-auto px-4 py-8">
        <div class="container">
          <div class="bg-green-500 py-4 p-10">
            <h1 class="text-white text-4xl font-bold">Saizencode</h1>
            <h2 class="text-white text-2xl">サイゼリヤのメニュー情報を探します。</h2>
          </div>

          <div class="bg-gray-200 p-4 font-bold">
            <p class="text-yellow-600 text-2xl">注意事項：</p>
            <li>これは2023年4月の情報です。実際の情報や店舗によって異なる場合があります。</li>
            <li>このアプリは非公式です。ここに掲載されている商品情報や価格などのは間違っている場合があります。</li>
          </div>
        </div>
        <div class="flex m-4">
          <div class="relative w-full">
            <input
              type="text"
              placeholder="メニュー番号や価格、メニュー名から検索できます。"
              class="border-2 border-gray-400 rounded-full py-2 px-4 block w-full appearance-none leading-normal focus:outline-none focus:border-blue-500"
            />
            <div class="absolute top-0 right-0 bottom-0">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-full"
              >
                検索
              </button>
            </div>
          </div>
        </div>
        {menuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            class="flex justify-between items-center bg-white p-4 mb-4 shadow-md"
          >
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center text-white font-bold text-3xl mr-4">
                {menuItem.emoji}
              </div>
              <div>
                <p class="text-gray-500 text-sm">{menuItem.id}</p>
                <h3 class="text-lg font-medium">{menuItem.name}</h3>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold text-gray-800 mr-2">
                ¥{menuItem.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function readCsv(filePath: string): MenuItem[] {
  const file = Deno.openSync(filePath);
  const decoder = new TextDecoder("utf-8");
  const content = decoder.decode(Deno.readAllSync(file));
  Deno.close(file.rid);

  const lines = content.trim().split("\n");
  const header = lines.shift()!.split(","); // ヘッダー行を除外し、カンマ区切りで配列に変換

  return lines.map((line) => {
    const values = line.split(",");
    const menuItem: MenuItem = {} as MenuItem;
    header.forEach((key, index) => {
      menuItem[key] = values[index];
      if (key === "price") {
        menuItem[key] = Number(values[index]); // priceを数値に変換
      }
    });
    return menuItem;
  });
}
