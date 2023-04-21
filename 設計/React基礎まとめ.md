# Javascriptの基礎
## 環境構築
- Code sandboxでブラウザ上でReactアプリとか作れる
  - https://codesandbox.io/
- Try for freeからVanila テンプレートを選択
## 変数
- var変数
  - 上書きが可能
  - 再宣言も可能（もう一度 var val1 = ""みたいに宣言できる)

- let変数
  - 上書きが可能
  - 再宣言が不可能
    - already been declared みたいなエラー

- const変数
  - 上書きも再宣言も不可能 
  - constで定義したオブジェクトはプロパティの変更が可能
  - 配列の中身も変えられる
  - Reactの開発で使うのはほとんどがconst

## テンプレート文字列
- 文字列の中でJavascriptの変数を使える
- 以下がコード例
``` javascript
const name = "じゃけぇ";
const age = 28;

const message = `私の名前は${name}です．年齢は${age}です．`
console.log(message);
//結果：私の名前はじゃけぇです．年齢は28です．
```

## アロー関数
- ()の中に引数を書く
``` javascript
const func2 = (str) => {
    return str;
}
```
- ()を省略することもできる
``` javascript
const func2 = str => {
    return str;
}
```

- returnを省略することもできる
``` javascript
const func2 = str => str;
```
- 簡単な足し算を行うアロー関数
``` javascript
const func3 = (num1, num2) => {
  return num1 + num2;
};

console.log(func3(10,20));
//結果:30
```

## 分割代入
- こんな感じでオブジェクトの中を参照できる
``` javascript
const myProfile = {
  name : "じゃけぇ",
  age : 28,
};

const {name, age} = myProfile;
const message2 = `名前は${name}です．年齢は${age}歳です`
console.log(message2);

```
- 配列にも使える
``` javascript
const myProfile = ['じゃけぇ', 28];

const [name, age] = myProfile;
const message4 = `名前は${name}です．年齢は${age}です．`
console.log(message4);
```

## デフォルト値
- 引数にデフォルト値を設定できる
``` javascript
const sayHello = (name = "ゲスト") => console.log(`こんにちは${name}さん`);
sayHello();
//こんにちはゲストさん
```

## スプレッド構文
### 配列の展開
- 要素が順番に展開される（配列が展開される）
```javascript

const sumFunc = (num1,num2) => console.log(num1 + num2);
sumFunc(arr1[0],arr1[1]);
sumFunc(...arr1);
```
### 配列をまとめる
```javascript
const arr2 = [1,2,3,4,5];
const [num1, num2, ...arr3] = arr2;
console.log(num1);
console.log(num2);
console.log(arr3);
//arr3 = [3,4,5];
```

### 配列のコピー，結合
``` javascript
const arr4 = [10,20];
const arr5 = [30,40];

const arr6 = [...arr4]; //配列のコピー
const arr7 = [...arr4, ...arr5]; //配列の結合
```

### mapやfilterを使った配列の処理
#### map
```javascript

const nameArr = ["田中","山田","じゃけぇ"];

for (let index = 0; index < nameArr.length; index ++){
  console.log(nameArr[index]);
}

const nameArr2 = nameArr.map((name)=>{
  return name;
})
//順番に走査してくれる

nameArr.map((name) => console.log(name));//for文と一緒
```

- indexも取れる
```javascript
nameArr.map((name, index) => console.log(name + index));//indexには〇番目が入ってくる
```
#### filter
```javascript
const numArr = [1,2,3,4,5];
const newNumArr = numArr.filter((num) => {
  return num % 2 === 0; //奇数のものだけ返す
});
```

### 三項演算子
- ある条件 ? 条件がtrueの時：条件がfalseの時
``` javascript
const val1 = 1 > 0? 'trueです' : 'falseです';

const num = "1300";
const formattedNum = typeof num === 'number'? num.toLocaleString() : '数値を入力してください';
```

### 論理演算し
- ||は左側がfalseなら右を返す
```javascript
const num = 100;
const fee = num || "金額未設定です";
cosole.log(fee); //100
```
- &&は左側がtrueなら右を返す

# Reactの基礎
- index.htmlのrootに差し込む
- renderでHtmlに要素を入れていく
- javascriptの中でHTMLをリターンするのがJSX記法
- returnの中は一つのタグで囲われてなくてはならない
``` javascript
 return (
  <div>
    <h1>こんにちは！</h1>
    <p>お元気ですか？</p>
  </div>
 )
```
##　Reactでのボタンの作りかた
- こんな感じ↓
``` javascript
import React from "react";

const App = () => {
  const onClickButton = () => alert();
  return (
    <>
      <h1>こんにちは！</h1>
      <button onClick={onClickButton}>ボタン</button>
    </>
  );
};

export default App;
```

## Props
- コンポーネントに渡す引数的なもの
- コンポーネント：画面要素の一単位
- HTMLの中でJavascriptを使うときは{}を使う

- 使用例↓
```javascript
import React from "react";
import ColorfulMessage from "./components/Colorfulmessage";

const App = () => {
  const onClickButton = () => alert();

  return (
    <>
      <h1>こんにちは！</h1>
      <ColorfulMessage color="blue" message="お元気ですか？" />
      <ColorfulMessage color="pink" message="お元気です!" />
    </>
  );
};

export default App;
```
- Colorfulmessage.jsx
```javascript
import React from "react";

const ColorfulMessage = (props) => {
  const contentStyle = {
    color: props.color,
    fontSize: "18px"
  };
  return <p style={contentStyle}>{props.message}</p>;
};

export default ColorfulMessage;
```
- 子要素を指定してやってもいい(props.children)

## State
- 各コンポーネントがもつ状態
- useStateを使う
  - 配列から取り出す第一がステート変数名
  - 第２がその状態を実行する関数名
- 動的に変わる部分はuseStateで定義して変数と更新関数と初期値を設定していく！！
```javascript
  const [num, setNum] = useState(0);//0は初期値
```
## 再レンダリング
- Reactは特定の条件でコンポーネントを再レンダリングして差分を反映することで動的な表現を実現している
  - コンポーネントのStateが変更したとき
  - propsの中身が変わった場合
  - 親のコンポーネントが再レンダリングされた場合（例えば呼び出し元のコンポーネントのStateが変わった場合など）

## UseEffect
- UseEffectの第２引数には配列を取る
```javascript
  useEffect(() => {
    console.log("UseEffect!!!");
  }, []);
```
- ↑の場合，レンダリング後最初の一度だけUseEffect!!が表示される
- 第2引数の配列の中に値を設定すると，その配列が変化したときだけ，useEffectの中を通る
- ある変数の状態に応じて何かをしたいときはUseEffectを使う
- 処理の回数を分離できる


