const express = require('express')
const mysql = require('mysql')

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const app = express()

const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

    const insertPeopleSql = `INSERT INTO people(name) values ('${randomName}')`
    
    connection.query(insertPeopleSql)

    const selectPeopleSql = `SELECT id, name FROM people;`

    connection.query(selectPeopleSql, (err, results, fields) => {
        if (err) throw err

        let listPeople = `<div>${[...results].map(people => `id: ${people.id} - name: ${people.name}</br>`).join("")}</div>`

        res.send(`<h1>Full Cycle Rocks!</h1>${listPeople}`)
    })

})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})