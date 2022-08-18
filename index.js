const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@hexadecimaltaskcluster.u5kptxd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("hexadecimaluser").collection("users");

    app.get("/users", async (req, res) => {
      const query = {};
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task1 server is running");
});
app.listen(port, () => {
  console.log("Task1 is Listening to port", port);
});
