import express from "express";
import cors from "cors";
import cookieSession from "cookie-session"; 
import bodyParser from "body-parser"; 

import 'dotenv/config';

import router from "./src/router/router.js"

const app = express();

app.use('/static', express.static('public')) 

app.use(
	cors({
		origin: "http://localhost:3001",
		methods: "GET,POST,PUT,DELETE",
		credentials: true
	})
)

app.use(
	cookieSession({
		name: "session", // Cookie name saved in browser of client
		keys: ["key_encode_and_decode_session"], // Key to encode and decode cookie
		maxAge: 24 * 60 * 60 * 1000, // Expires of cookie (miliseconds)
	})
) 

app.use(bodyParser.json()) // middleware to parse incoming data from HTTP request as JSON and convert them into JavaScript objects
app.use(bodyParser.urlencoded({extended: true})) //Midđleware to parses incoming data from HTTP requests as URL-encoded and converts them into JavaScript objects

router(app)

const port = 8001;
app.listen(port, () => console.log(`Listenting on port ${port}...`));

