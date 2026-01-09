import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Photo from './photo.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({
    prepare: (value: number) => String(value),
    consume: (value: string) => Number(value),
  })
  declare photoId: number

  @column({
    prepare: (value: number) => String(value),
    consume: (value: string) => Number(value),
  })
  declare userId: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Photo, {
    foreignKey: 'photoId',
  })
  declare photo: BelongsTo<typeof Photo>
}
