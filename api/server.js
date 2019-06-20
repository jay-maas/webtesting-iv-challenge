const express = require('express')

const server = express()

server.get('/',  async (req, res) => {
    res.status(200).json({
        message: "Server running and ready for requests"
    })
})

module.exports = server