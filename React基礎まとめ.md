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

