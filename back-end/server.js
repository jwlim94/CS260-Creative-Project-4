const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/note', {
  useNewUrlParser: true
});

// Create a scheme for items in the note
const itemSchema = new mongoose.Schema({
    subject: String,
    date: String,
    title: String,
    keyword: String,
    description: String,
  });
  
  // Create a model for items in note
  const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async (req, res) => {
    const item = new Item({
      subject: req.body.subject,
      date: req.body.date,
      title: req.body.title,
      keyword: req.body.keyword,
      description: req.body.description,
    });
    try {
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.get('/api/items', async (req, res) => {
    try {
      let items = await Item.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.delete('/api/items/:_id', async (req, res) => {
    try {
      await Item.deleteOne({
        _id: req.params._id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/items/:_id', async (req, res) => {
    try {
      let item = await Item.findOne({
        _id: req.params._id
      });
      item.subject = req.body.subject;
      item.date = req.body.date;
      item.title = req.body.title;
      item.keyword = req.body.keyword;
      item.description = req.body.description;
      await item.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });


app.listen(3000, () => console.log('Server listening on port 3000!'));