import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import User from './user.js'

export default class Photo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({
    prepare: (value: number) => String(value), // Convertir en string pour la DB
    consume: (value: string) => Number(value), // Convertir en number pour le model
  })
  declare userId: number

  @column({ columnName: 'image_url' })
  declare imageUrl: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @column({ columnName: 'ai_caption' })
  declare aiCaption: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment, {
    foreignKey: 'photoId',
  })
  declare comments: HasMany<typeof Comment>
}
