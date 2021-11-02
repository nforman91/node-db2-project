exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.text('vin')
      .unique()
    tbl.text('make')
    tbl.text('model')
    tbl.integer('mileage')
    tbl.text('title')
    tbl.text('transmission')
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};
