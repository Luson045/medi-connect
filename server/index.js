
const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./modules/dashboard/authRoute');
const hospitalroute = require('./modules/hospital/index');
require('dotenv').config({ path: '../.env' });

const app = express();
const port = 3000;
const corsOptions = {

  origin: [
    "https://learnstocks.netlify.app",
    "https://console.cron-job.org/",
    "https://prodez-ai.netlify.app",
    "https://medi-connect-in.netlify.app",
    "http://localhost:3000",
  ], // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,

};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.json());
//mNXMrz3yBrdzw2hq,yuria4489
mongoose
	.connect(
		`mongodb+srv://yuria4489:${process.env.PASSDB}@medi-connect.xpbcr.mongodb.net/?retryWrites=true&w=majority&appName=Medi-Connect`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('MongoDB connection failed:', error));
//ping
app.get('/ping', async (req, res) => {
	res.status(200).json({ message: 'Active' });
});
// Get all todos for a specific user
app.post('/register', async (req, res) => {
	const { data } = req.body;
	const name = data.name;
	const age = data.age;
	const gender = data.gender;
	const contact = data.contact;
	const address = data.address;
	const department = data.department;
	const symptoms = data.symptoms;
	console.log('welcome: ', name);
	return res.status(200).json({ message: 'Successfull' });
});

app.use('/auth', authRoutes);
app.use('/hospitalapi', hospitalroute);
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
