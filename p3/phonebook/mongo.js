const mongoose = require('mongoose')
require('dotenv').config()

// if (process.argv.length < 3) {
//     console.log('invalid numbero of arguments')
//     process.exit(1)
// }

const url = process.env.MONGO_URL
mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(res => {
        console.log("connected to MongoDB")
    })
    .catch(err => {
        console.log(err)
    })

const pbSchema = new mongoose.Schema({
    name: String,
    number: String
})

pbSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', pbSchema)

// if (process.argv.length === 3) {
//     console.log("tmp")
//     Person.find({}).then(res => {
//         res.forEach(person => {
//             console.log(person)
//         })
//         mongoose.connection.close()
//         process.exit(1)
//     })
// } else {
//     const name = process.argv[3]
//     const number = process.argv[4]

//     const person = new Person({
//         name: name,
//         number: number
//     })

//     person.save().then(res => {
//         console.log(res)
//         mongoose.connection.close()
//     })
// }


