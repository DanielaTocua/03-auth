import { DateTime } from 'luxon'
import { BaseModel, column,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Profile extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public description: string

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
  
  /* Relación 1:1 con Usuario*/
  @hasMany(()=> User,{
    localKey:'id',
    foreignKey:'profile_id',
  })
  public profile: HasMany<typeof User>
}
