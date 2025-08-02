const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./mongo')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const ids = ["1", "2", "3", "4"]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            return res.status(404)
        }
    })
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const personToAdd = new Person({
        name: person.name,
        number: person.number
    })

    personToAdd.save().then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => console.log(err))

    // if (data.some(x => x.name.toLowerCase() === person.name.toLowerCase())) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    // let id = Math.floor(Math.random() * 9999999)
    // while (ids.includes(String(id))) {
    //     id = Math.floor(Math.random() * 9999999)
    // }
    // person.id = String(id)
    // ids.push(String(id))
    // data.push(person)

    // res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => {
        res.status(204).end()
    }).catch(
        err => console.log(err)
    )
})

app.get('/info', (req, res) => {
    const counts = data.length
    const now = new Date()

    res.send('<div>Phonebook has info for ' + counts + ' people</div><div>' + now + '</div>')
})



const PORT = 3002
app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})
