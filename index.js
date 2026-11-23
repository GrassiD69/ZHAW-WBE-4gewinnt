const express = require("express")
const app = express()

app.use(express.static("public"))

function error(status, msg) {
  const err = new Error(msg)
  err.status = status
  return err
}

app.use("/api", function (req, res, next) {
  const key = req.query["api-key"]

  if (!key) {
    return next(error(400, "api key required"))
  }
  if (!~apiKeys.indexOf(key)) {
    return next(error(401, "invalid api key"))
  }
  next()
})

app.use(express.json())

const apiKeys = ["c4game"]

const data = {
  c4state: {
    board: Array(6).fill('').map(el => Array(7).fill('')),
    currentColor: 'r'
  }
}

app.get("/api/data/:id", function (req, res, next) {
  const id = req.params.id
  const result = data[id]

  if (result) res.send(result)
  else next()
})

app.put("/api/data/:id", function (req, res, next) {
  const id = req.params.id

  if (!data[id]) {
    return next(error(404, "Data entry with this ID was not found"))
  }
  data[id] = req.body
  res.send(data[id])
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send({ error: err.message })
})

app.use(function (req, res) {
  res.status(404)
  res.send({ error: "not found" })
})

app.listen(3000)
console.log("Express started on port 3000")
