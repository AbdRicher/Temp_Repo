import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 3000;


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/userdatabase'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define the Mongoose schema
const registrationSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthday: { type: Date }, // Assuming birthday is a Date object
  gender: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    lowercase: true, // Store emails in lowercase
    trim: true
  },
  phone: {
    type: String, // Store phone numbers as strings
    required: true,
  },
  subject: { type: String, required: true }
});

// Create the Mongoose model
const Registration = mongoose.model('user', registrationSchema);

// Registration route
app.post('/register', async (req, res) => {
  try {
    const registrationData = req.body;
    console.log("📥 Received data:", registrationData);

    // Check if email already exists
    const existingUser = await Registration.findOne({ email: registrationData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' });
    }

    // Create and save new registration
    const newRegistration = new Registration(registrationData);
    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('❌ Error during registration:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }

    res.status(500).json({ message: 'An error occurred during registration.' });
  }
});

app.post('/', async (req, res) => {
    console.log("📥 Full Request Body:", req.body); // Debugging step

    const username = req.body.username;
    const password = req.body.password;

    console.log("📥 Username:", username);
    console.log("📥 Password:", password);

    try {
        // Check if a user exists in the database
        const user = await Registration.findOne({ email: username, phone: password });

        if (!user) {
            console.log("❌ User not found or incorrect credentials.");
            return res.status(401).json({ message: "User not found or incorrect credentials." });
        }

        console.log("✅ Login successful:", user);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("❌ Error checking user:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
});
 
  
// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
