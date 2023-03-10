import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('profile_id').references('profiles.id').onDelete('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
