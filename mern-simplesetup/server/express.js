import express from 'express'

const app = express ()

app.use (bodyParser.json ())
app.use (bodyParser.urlencoded ({extended:true}))
app.use (cookieParse ())
app.use (compress ())
app.use (cors ())
app.use (helmet ())

app.listen(port, function onStart(err) {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', port)
  })

export default app