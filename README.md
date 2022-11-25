# ローカル起動方法
Angularで作ったクライアントアプリを
VSCodeでローカル起動します。  
【前提】  
node.js が入っていてnpmコマンドが使える環境であること
1. Gitからプロジェクトディレクトリを取得し、VSCodeのワークスペースにて開く。									
2. プロジェクトディレクトリで統合ターミナルを開き以下コマンドを実施してライブラリを追加する  
	・ライブラリインストール  
	```
	npm install
	```
3. ローカル起動  	
	```
	ng serve --open
	```

	失敗する場合  
	そもそものコマンドを受け付けない場合
	```
	Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
	```
	ng serve --openでこける場合
	```
	ng serve
	openオプションを抜いて、サーバー起動後手動で画面を開く
	```
4. 3の前に実施しても良い  
demo-serverless-client\src\environments\environment.ts  
このファイルに対してAWS-CloudFormationで作成したルートスタックの出力情報とAPIGateWayのデプロイ後のURL情報を設定する。



# 画面説明
|画面名|説明|
|:---|:----|
|トップ画面|起動時に表示されるトップ画面|
|商品一覧画面|商品TBL内の一覧表示を行う画面|
|商品詳細画面|商品の詳細情報を表示するモーダル|
|商品掲載画面|認証済ユーザーが商品の出品を行うモーダル|
|ログイン画面|認証を行うモーダル|
|新規登録画面|ユーザー登録を行う画面|
|ユーザー情報画面|認証済ユーザーが一部ユーザー情報、パスワード変更などを行う画面|
|投稿商品編集画面|投稿した商品の編集ができる画面|



# ざっくりした仕様
・ゲストユーザー<br>
　トップ画面に全商品表示<br>
　商品掲載はできない<br>
　新規ユーザー登録が表示される<br>

ゲストユーザーの画面遷移は以下<br>
　トップ - 商品一覧<br>
　　　└　商品詳細<br>
　　　└　ログイン<br>
　　　└　新規登録<br>


・認証済みユーザー<br>
トップ画面に全商品表示<br>
ログイン後商品掲載はできる<br>
ユーザー管理画面でパスワード変更ができる。<br>
自分の投稿した商品を削除編集できる。<br>

認証済ユーザーの画面遷移は以下<br>
トップ　ー　商品一覧<br>
　　　└　商品詳細<br>
　　　└　商品掲載<br>
　　　　ー　ログイン<br>
　　　　ー　ユーザー情報<br>
　　　　└　ユーザー編集<br>
　　　　└　投稿商品編集<br>


# その他設定
AWS-SDKをAngularで使用する設定  
1. demo-serverless-client\src\polyfills.ts  
以下を追加  
```
// "global is not defined"の対応
(window as any).global = window;
```

2. demo-serverless-client\tsconfig.app.json  
以下を設定  
```
"types": ["node"]
```

# demo-serverless-client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
