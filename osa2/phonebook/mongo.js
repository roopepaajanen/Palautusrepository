const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://roopepaajanen:${password}@cluster0.p0ar5mq.mongodb.net/noteApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    name: name,
    number: number
  });

  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
.catch(error => {
    console.log("Error saving note:", error)
    mongoose.connection.close()
    })
.catch(error => {
    console.log("Error connecting to MongoDB:", error)
    mongoose.connection.close()
    })