## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|referencesforeign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|integer|null: false|
|image|integer|null: true|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
