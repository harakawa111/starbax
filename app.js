// expressライブラリを読み込む
const express = require("express");
const path = require("path");

// expressのアプリケーションを作成
const app = express();
// ポート番号を指定。環境変数PORTがあればそれを使う。なければ3000番。
const PORT = process.env.PORT || 3000;

// publicディレクトリの中にあるファイル（htmlやcss）を静的ファイルとして配信する設定
app.use(express.static(path.join(__dirname, "public")));

// サーバーを起動
app.listen(PORT, () => {
  console.log(
    `サーバーがポート${PORT}で起動しました。 http://localhost:${PORT}`
  );
});
