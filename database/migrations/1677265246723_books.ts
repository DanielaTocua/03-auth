import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title',200).notNullable()
      table.string('editorial',200).notNullable()
      table.integer('format').unsigned().notNullable()
      table.integer('pages').unsigned().notNullable()
      table.integer('user_id').unsigned().index('books_user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
