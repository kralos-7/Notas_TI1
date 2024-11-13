import express from 'express'
import mongoose from 'mongoose'

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

// Ojo con la IP: 172.17.0.2 se debe sacar del server de mongo
mongoose.connect('mongodb://nico:12345678@172.17.0.2:27017/miapp?authSource=admin')

app.get('/', async (_req, res) => {
  console.log('Welcome')
  return res.send('Welcome to server mongo 🎉')
})

app.get('/listado', async (_req, res) => {
  console.log('listando... chanchitos...')
  const animales = await Animal.find();
  return res.send(animales)
})

app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' }) 
  return res.send(`Se creo otro chanchito 👍`)
})

app.listen(3000, () => console.log('listening...'))
