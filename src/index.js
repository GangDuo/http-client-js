const express = require('express')
const cors = require('cors')
const axios = require('axios');
const app = express()
const corsOptions = {
  exposedHeaders: ["Content-Disposition"]
}

app.use(cors(corsOptions))

app.get('/get/:target', (req, res) => {
  const target = req.params.target
  axios.get(target, {responseType: 'arraybuffer'})
    .then(response => {
      if(response.status !== 200) throw new Error()
      const filename = response.request.path.slice(response.request.path.lastIndexOf('/') + 1)
      if(filename)
         res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.send(response.data)
    }).catch(err => {
      console.log('err:', err);
      res.status(response.status).send(err)
    });
})

const port = process.env.PORT || 3000
app.listen(port, _ => console.log(`Listening on port ${port}!`))
