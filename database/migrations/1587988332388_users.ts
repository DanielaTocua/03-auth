import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.string('name',100).notNullable()
      table.string('surname',100).notNullable()
      table.integer('type_id').unsigned().notNullable()
      table.string('address',180).notNullable()
      table.string('municipality',180).notNullable()
      table.string('department',180).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('profile_id').unsigned().index('user_profile_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
