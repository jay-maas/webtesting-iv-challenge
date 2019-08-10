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

async function update(id, changes) {
  await db('characters')
        .where({ id })
        .update(changes, '*')

        return findById(id)
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
