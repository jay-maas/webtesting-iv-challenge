const db = require('../../data/dbConfig')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
}

function insert(character) {
  return db('characters')
    .insert(character, 'id')
    .then(ids => {
      return db('characters')
        .where({ id: ids[0] })
        .first()
    })
}

function update(id, changes) {
  return db('characters')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
  return db('characters')
    .where({ id })
    .del()
} 

function getAll() {
  return db('characters')
}

function findById(id) {
  return db('characters')
  .where({ id })
  .first()
}
