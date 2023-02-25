import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Book from 'App/Models/Book'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public name: string
  @column() public surname: string
  @column() public type_id: number
  @column() public address: string
  @column() public municipality: string
  @column() public department: string
  @column() public email: string
  @column() public profile_id: number

  @column({ serializeAs: null }) public password: string
  @column() public rememberMeToken?: string

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  /*Relación 1: n con Books*/ 
  @hasMany(()=> Book,{
    localKey:'id',
    foreignKey:'user_id',
  })
  public profile: HasMany<typeof Book>
}
