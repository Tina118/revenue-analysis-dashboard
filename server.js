// Import required libraries
const express = require('express');
const { json } = require('body-parser');
const { connect, Schema, model } = require('mongoose');
var jwt = require('jsonwebtoken');

// Create an Express application
const app = express()

// MongoDB Connection
connect('mongodb://127.0.0.1:27017/revenuseanalysisdashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Create a schema for user data
const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
})

const User = model('User', userSchema)

// Use the JSON body parser middleware for handling JSON requests
app.use(json())

// Sign-up route
app.post('/api/signup', async (req, res) => {
  const userData = req.body;
  
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      // Email already exists, return an error
      res.status(200).send({ error: 'Entered email is already registered' });
    } else {
      // Create a new user and save it to the database
      const newUser = new User(userData);
      await newUser.save();
      res.status(200).send({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error saving data to MongoDB' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Find the user by email
    const user = await User.findOne({ email })

    if (!user) {
      res.status(200).send({ error: 'User not found' })
      return
    }

    // Compare the provided password with the password in the database
    const passwordMatch = password === user.password

    if (passwordMatch) {
      var token = jwt.sign({ success: true, email: user.email }, 'jwtsecret')
      res.status(200).send({ success: true, token })
    } else {
      res.status(200).send({ error: 'Password is incorrect' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Server error' })
  }
})

// Define the port on which the server will listen
const port = process.env.PORT || 5000 // Change the port number if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
