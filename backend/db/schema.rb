# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_18_014518) do
  create_table "children", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "avatar_url"
    t.integer "age"
    t.integer "points"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "level"
    t.integer "xp"
    t.index ["user_id"], name: "index_children_on_user_id"
  end

  create_table "chore_assignments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "chore_id", null: false
    t.bigint "child_id", null: false
    t.datetime "completed_at"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["child_id"], name: "index_chore_assignments_on_child_id"
    t.index ["chore_id"], name: "index_chore_assignments_on_chore_id"
  end

  create_table "chores", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "points"
    t.integer "xp"
    t.integer "frequency"
    t.date "due_date"
    t.integer "day_of_week"
    t.json "days_of_week"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reward_redemptions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "child_id", null: false
    t.bigint "reward_id", null: false
    t.datetime "redeemed_at"
    t.boolean "approved", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["child_id"], name: "index_reward_redemptions_on_child_id"
    t.index ["reward_id"], name: "index_reward_redemptions_on_reward_id"
  end

  create_table "rewards", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "points_cost"
    t.boolean "is_active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "passcode_digest"
  end

  add_foreign_key "children", "users"
  add_foreign_key "chore_assignments", "children"
  add_foreign_key "chore_assignments", "chores"
  add_foreign_key "reward_redemptions", "children"
  add_foreign_key "reward_redemptions", "rewards"
end
