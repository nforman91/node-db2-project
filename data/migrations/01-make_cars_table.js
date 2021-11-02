exports.up = async function (knex) {
  await knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.text('vin')
      .unique()
      .notNullable()
    tbl.text('make')
      .notNullable()
    tbl.text('model')
      .notNullable()
    tbl.integer('mileage')
      .notNullable()
    tbl.text('title')
    tbl.text('transmission')
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
}
