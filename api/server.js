const express = require('express')

const db = require('../data/dbConfig.js')

const charsModel = require('../api/models/charactersModel.js')

const server = express()

server.use(express.json())

server.get('/',  async (req, res) => {
    res.status(200).json({
        message: "Server running and ready for requests"
    })
})

server.get('/characters',  async (req, res) => {
    try {
        const characters = await charsModel.getAll()
        res.status(200).json(characters)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

server.post('/',  async (req, res) => {
    try {
        const newChar = await charsModel.insert(req.body)
        res.status(201).json(newChar)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

server.put('/:id',  async (req, res) => {
    try {
        const updatedChar = await charsModel.update(req.params.id, req.body)
        res.status(201).json(updatedChar)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

server.delete('/:id',  async (req, res) => {
    try {
        const deletedChar = await charsModel.remove(req.params.id)
        res.status(200).json(deletedChar)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = server