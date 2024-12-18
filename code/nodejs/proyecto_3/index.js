const { dir } = require('console')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join( __dirname,'view'))


app.get('/', (req, res)=> {
    res.render('index')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))