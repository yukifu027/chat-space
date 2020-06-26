<h2 align="center">Mirai</h2>

[![Image from Gyazo](https://i.gyazo.com/60f216f03a4eac13189fe087190cd917.jpg)](https://gyazo.com/60f216f03a4eac13189fe087190cd917)


# 概要
**友人や仲間とグループで会話できる**チャットアプリです。ユーザーは、他のユーザーを招待し、写真またはテキストのやりとりを通じてグループチャットを楽しむことができます。

# 制作期間
20日間

# 制作背景
TECHCAMPというプログラミングスクールのカリキュラム内にある課題制作です。
新しい技術（機能）として、以下のことを実装しました。

新規登録機能
複数人によるグループチャット機能
チャット相手の検索機能
チャットグループへのユーザー招待機能
チャットの履歴表示機能
画像送信機能
チャットの自動更新
 
# DEMO

### 1. トップページからログイン

![Mirai-app](https://gyazo.com/a91b17866111dc0e8aa7743f899f08f4.gif)

### 2. 検索欄または一覧から気になる遺産を選ぶ（初期データとして登録されている）

[![Image from Gyazo](https://i.gyazo.com/a5e6e640164726c7879df10eef2b4b80.jpg)](https://gyazo.com/a5e6e640164726c7879df10eef2b4b80)

### 3.　負の遺産へのレビューを行う

![Mirai-app](https://i.gyazo.com/fedeeba42e1a31c36b52063154e4e8b1.gif)

### （4. ユーザー自ら遺産の追加も可能）

![Mirai-app](https://i.gyazo.com/35ebf5050ef81da56919b575e68ccd4c.png)

# 工夫したポイント
- ローディングアニメーションを実装し、ユーザーにインパクトのあるUIを心がけました。
- 検索には、曖昧検索かつ非同期通信を採用し、ユーザーの使いやすさを重視しました。
- ユーザー自身も自由に負の遺産を投稿できることで、世間から認知されていない場所が改めて認知される機会を作りました。
- レビュー機能を追加し、当事者が当時の記憶を書き残し、また旅行者も感想を書き残せることで、「記憶継承の文化をみんなで作り上げていくサービス」ということを意識しました。
- 機能を絞る事で、老若男女誰もが使いやすいように設計しました。

# 使用技術(開発環境)
Ruby/Ruby on Rails/MySQL/Github/Visual Studio Code

# 課題や今後実装したい機能
<dl>
  <dt>本番環境で画像が表示されない</dt>
  <dd>S3のストレージと連携させることで、heroku特有のデータベースリセットを回避する</dd>
  <dt>ボランティアガイドの申し込みの手続きが複雑かつ認知されていない</dt>
  <dd>施設の公式アカウントを作成し、ボランティアガイドとユーザーのマッチング機能を実装する</dd>
  <dt>検索方法を増やす</dt>
  <dd>ジャンルテーブルを作成し、ジャンルでユーザーが検索できるようにする</dd>
  <dt>ログイン方法を増やす</dt>
  <dd>APIを用いて、手軽なSNSログインを実装することで、ユーザーの利用率をあげる</dd>
  <dt>遺産の場所が一目でわからない</dt>
  <dd>GoogleMapのAPIを実装し、遺産の場所がすぐにわかるようにしたい</dd>
  <dt>多言語対応していない</dt>
  <dd>英語の翻訳版も載せられるようにしたい</dd>
</dl>

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :groups_users

 ## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|stringr|null: false|

### Association
- has_many :messages
- has_many :users, through: :groups_users
- has_many :groups_users
 
 ## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|-------|
|image|text|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
