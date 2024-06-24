const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); 
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
