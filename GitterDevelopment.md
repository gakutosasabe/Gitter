# Gitter
## 課題意識
- ギターの練習が続かない，Githubみたいに毎日草が生えたらやる気起きるのになぁ・・・
## Issue
- 意識せずに勝手に毎日のギターの練習が記録される
## Gitterとは
- Githubのように毎日のギター練習の記録を取ってくれるハードウェア
## 何ができるか
- ギターを練習すると意識しなくてもギターを何月何日にどれくらい練習したかWebにアップしてくれる
- 練習の様子（音や映像）を撮影してWebにアップしてくれる
## イメージ
![picture 1](images/gitter.drawio.svg)  

## 構成
- M5 stack C plus
  - 加速度でギターの取り外しを検知
  - Webサーバーに練習情報をPush
- ギタースタンド
  - M5 Stack C plusを固定する（３Dプリンターでアタッチメントを自作）
- クライアント（React）
  - サーバーから受け取った練習情報をもとにGithub風Webページを更新
- サーバー (Node.js)
  - M5 stack C plusから受け取った練習情報をまとめてクライアント側に渡す
## 開発
### React + Javascriptの環境構築
  - https://utubou-tech.com/react-javascript-env/
#### node.jsのインストール
- 公式からインストールしてくる(今回は18.14)
  - https://nodejs.org/ja/download/
- PCを再起動
- コマンドプロンプトで"node- v"と入力
![picture 2](images/ba2601a27802eece13efbbf1a5fe36d7542bee8116e4207e88496b01fe4d774e.png)  

### クライアント側開発
#### Reactアプリを作成する
- 任意のフォルダでコマンドプロンプトから下記コマンドを実行してアプリケーションを作成
```
npx create-react-app 任意のアプリケーション名(今回はclient)
```
※アプリケーション名に大文字は使えないので注意

- 下記表示がでれば作成成功
![](20230204160626.png)  

#### Reactアプリの動作確認
- アプリ名と同じディレクトリで下記コマンド実行
```
npm start or yarn start
```
- ブラウザでこの画面が表示されれば動作確認完了
![picture 3](images/b4dabefdc31bbb132dfbd67cee3779da5c7a4d6e7d540596eeacd21499157888.png) 

### サーバー側開発
#### Node.jsの初期設定
- 任意のフォルダでコマンドプロンプトで下記コマンドを実行してpackage.jsonを作る
```
npm init --yes
```
- 必要なモジュールをインストールする
```
npm install express nodemon
```
Express : フレームワーク
nodemon : ソースを監視して、自動でサーバーを再起動してくれるツール
#### サーバーPC側とM5StickCの通信方式について
- TCP/IP
  - 通信が保証されるのでおすすめ
- WebSocket
  - ブラウザ側でも通信できる
- UDP
  - リアルタイムに通信したいならUDP

- 今回はTCP/IPとする
#### Node側とM5StickCでTCP/IP通信を行う
##### Node側(サーバーモード)
- Node.jsでTCP/IP通信を行うにはnetモジュールが必要．下記コマンドでインストールする
```
npm install net
```

## 参考情報
- Node.jsとArduinoでプロトタイプ作成
  - https://html5experts.jp/girlie_mac/17684/
- Platform IOでマイコン開発ができる
- Nodeを使ったTCP/IP通信
  - https://hikoleaf.hatenablog.jp/entry/2019/06/09/131620
- React+Node.js(Express)でMySQL連携する
  - https://qiita.com/nemutya/items/b4c606168aa5be610e1e