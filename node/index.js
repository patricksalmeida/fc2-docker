const express = require('express')
const mysql = require('mysql')

const app = express()

const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
}

const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Patrick')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle!</h1>')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})