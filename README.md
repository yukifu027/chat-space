
# 概要(このアプリでできることを書いて下さい)
# 制作背景(意図)
　⇒どんな課題や不便なことを解決するためにこのアプリを作っろうと思ったのか。
# DEMO(gifで動画や写真を貼って、ビューのイメージを掴んでもらいます)
　⇒できている範囲で貼り付けましょう。
# 実装予定の内容
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
