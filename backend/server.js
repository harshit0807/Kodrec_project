const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Answer = require('./models/Answer'); 


app.use(cors());
app.use(express.json()); 

const mongoURL = 'mongodb+srv://harshit807saini:08072002oppo@cluster0.htrobhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));


app.post('/api/analyze', async (req, res) => {
  const { question, answer } = req.body;
  console.log('Received from frontend:', question, answer);

  try {
    const response = await axios.post('http://localhost:8000/analyze', {
      question,
      answer
    });

    const saved = await Answer.create({
      question,
      answer,
      correctness_score: response.data.correctness_score,
      sentiment: response.data.sentiment,
      keywords: response.data.keywords
    });
    console.log('✅ Saved to MongoDB:', saved); 

    
    res.json(saved);
    
  } catch (error) {
    console.error('Error talking to FastAPI:', error.message);
    res.status(500).send('Something went wrong');
  }
});

app.listen(3000, () => {
  console.log('Node.js server running on http://localhost:3000');
});
