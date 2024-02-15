const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();
// require("./config/db.connection.js")

const challengesRouter = require('./routes/challenges')
const consoleRouter = require('./routes/console')
const promptsRouter = require('./routes/prompts')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    // Respond with 200 status for preflight requests
    res.sendStatus(200);
    return;
  }
  next();
});


// app.use("/", apiRouter)
app.use("/challenges", challengesRouter);
app.use("/console", consoleRouter);

app.get("/", (req, res) => {
  res.send("incorrect path");
});

// app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log(`listening on PORT ${port}`));

// const PORT = process.env.PORT || 3000; // Use Fly.io's PORT env var or default to 8000
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });