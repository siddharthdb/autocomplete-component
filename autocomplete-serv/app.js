const express = require('express');
const cors = require('cors');
const countries = require('./countries.json');

const app = express();

const port = 3000

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/countries', (req, res) => {
    const query = req.query;
    const nameCountries = countries.map(c => c.name);
    if (query && query.q) {
        const filter = nameCountries.filter(c => c.toLowerCase().indexOf(query.q) > -1)
        res.send(filter.splice(0, 15));
    } else {
        res.send(nameCountries);
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

