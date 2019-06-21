const db = require('../../data/dbConfig.js')

const { insert, getAll, remove, findById, update } = require('./charactersModel.js')

beforeEach(async () => {
  await db('characters').truncate()
})

describe('characters model', () => {

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('insert()', () => {
    it('should insert characters', async () => {
      await insert({ name: 'Goku' })
      await insert({ name: 'Gohan' })

      const characters = await db('characters')

      expect(characters).toHaveLength(2)
    })

    it('should insert the provided character', async () => {
      let character = { name: 'Goku' }
      let inserted = await insert(character)
      expect(inserted.name).toBe(character.name)
    })
  })

  describe('getAll()', () => {
    it('should retrieve data from test db that has been placed with seed', async () => {
      await insert({ name: 'Goku' })
      await insert({ name: 'Gohan' })

      const characters = await getAll()
  
      expect(characters).toHaveLength(2)
    })
  })

  describe('remove()', () => {
    it('remove the item within the database with the provided id', async () => {
      await insert({ name: 'Goku' })

      await remove(1)

      const characters = await getAll()
      expect(characters).toHaveLength(0)
    })
  })

  describe('findById()', () => {
    it('find a character by their id', async () => {
      await insert({ name: 'Goku' })

      const character = await findById(1)
      expect(character).toEqual({ id: 1, image: null, name: 'Goku'})
    })
  })

  describe('update', () => {
    it('update characters info', async () => {
      await insert({ name: 'Goku' })

      const updatedChar = {
        name: 'goku',
        image: 'https://img00.deviantart.net/ef09/i/2018/057/3/7/goku_mastered_ssj_blue_migatte_palette_by_al3x796-dc4cqmh.png'
      }
      
      await update(1, updatedChar)

      const character = await findById(1)
      expect(character).toEqual({ id: 1, image: 'https://img00.deviantart.net/ef09/i/2018/057/3/7/goku_mastered_ssj_blue_migatte_palette_by_al3x796-dc4cqmh.png', name: 'goku'})
    })
  })

})
