import express from 'express'

const port = process.env.PORT || 3333
const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello world!' })
})

app.listen(port, () => console.log(`🚀  Server is running port: ${port}`))
