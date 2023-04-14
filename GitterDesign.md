# GitterDesign
- Gitterの設計情報はこのファイルで行う
  - ちゃんと静的モデリングするか～
# 構成
![picture 1](images/gitter.drawio.svg)  
# コンテキスト図
![context](images/context.drawio.svg)

# DFD0
![DFD0](images/DFD0.drawio.svg)

# DFD1(ReactでのHMI側)
![DFD1](images/DFD1.drawio.svg)

# モジュール構造図
![Module](images/module.drawio.svg)
# データ設計
## M5stack⇔TCP/IPサーバー(Node.js)間
| 項目 |値|行先|備考|
|:--:|:--:|:--:|:--:|
|練習検出情報|START/END|M5→Express|練習開始・終了情報とタイムスタンプは一緒に送信|
|バッテリー容量|battery:〇〇| M5→Express||

## サーバー側ギター検出情報保存ファイル（json)
| 項目 |値|行先|例|
|:--:|:--|:--:|:--|
|練習情報|{<br>"practice_status":START/END<br>"time_stamp":yyyy/mm/dd hh:mm:ss.mmm<br>}|ローカルに保存|

## Expressサーバー(Node.js)⇔React間
| 項目 |値|行先|
|:--:|:--|:--:|
|練習情報|{<br>"practice_status":START/END<br>"time_stamp":yyyy/mm/dd hh:mm:ss.mmm<br>}|Express→React|{"ID":aaaaaaa<br>"practice_start_time":2023/07/22 17:56:39 <br>"practice_end_time":2023/07/23 18:09:32}|
|デバイス情報|{<br>"battery":バッテリー情報<br>}|Express→React|

## React側練習時間配列
|項目|値|例|
|:--:|:--:|:--:|
|練習情報配列|{date:"日付",count:練習時間分数},|{date:"2023/10/23", count:16.8},<br>{date:"2023/10/24",count:0},<br>{date:"2023/10/25",count:20}

# 画面設計
# デザイン図
- https://www.figma.com/file/YPeIc900GOsdSCfJvz9jbA/Gitter-Web%E3%82%A2%E3%83%97%E3%83%AA?node-id=1126%3A9450&t=qhOplVa6hKExsTIF-0

-　一旦こんな感じを目指す
  
  ![design](20230305230629.png)

# ブランケット設計
## ポンチ絵
![picture 1](images/0a069c396832b4fdd51da8485c128432f7d5c26f976f655ec9b04621dbca3bc9.jpg)  
