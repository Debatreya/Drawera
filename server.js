const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('root'))

// Serve static files from the 'root' folder
app.use(express.static(path.join(__dirname, 'root')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'root', 'index.html'));
});

app.listen(3000, ()=>{
    console.log('server is listening to post 300, http://localhost:3000');
})