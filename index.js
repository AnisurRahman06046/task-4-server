require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Password}@cluster0.2hgpwci.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const order = client.db("Order").collection("order");
    const orderedItems = client.db("Order").collection("orderedItems");

    app.post("/order", async (req, res) => {
      const query = req.body;
      console.log(query);
      const result = await order.insertOne(query);
      res.send(result);
    });

    app.post("/ordereditems", async (req, res) => {
      const query = req.body;
      console.log(query);
      const result = await orderedItems.insertOne(query);
      res.send(result);
    });

    app.get("/ordereditems", async (req, res) => {
      const query = {};
      const result = await order.find(query).toArray();
      res.send(result);
      console.log(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("server is runnning", port);
});
