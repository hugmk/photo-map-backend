import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameFullNameToUsernameInUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('full_name', 'username')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('username', 'full_name')
    })
  }
}
