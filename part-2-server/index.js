const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json())



// atlas database

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-wflxewq-shard-00-00.fqmaumg.mongodb.net:27017,ac-wflxewq-shard-00-01.fqmaumg.mongodb.net:27017,ac-wflxewq-shard-00-02.fqmaumg.mongodb.net:27017/?ssl=true&replicaSet=atlas-2tvwdm-shard-0&authSource=admin&appName=Cluster0`

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fqmaumg.mongodb.net/?appName=Cluster0`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const db = client.db('smart_db');
        const tasksCollection = db.collection('tasks');



        app.get('/tasks', async (req, res) => {
            const cursor = tasksCollection.find().sort({ dueDate: -1 })
            const result = await cursor.toArray();
            res.send(result);
        })


        app.get('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await tasksCollection.findOne(query);
            res.send(result);
        })

        app.post('/tasks', async (req, res) => {
            const newProduct = req.body;
            const result = await tasksCollection.insertOne(newProduct);
            res.send(result);
        })

        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await tasksCollection.deleteOne(query);
            res.send(result);
        })

        app.patch('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const query = { _id: new ObjectId(id) };

            const updateDoc = {
                $set: updatedData
            };

            const result = await tasksCollection.updateOne(query, updateDoc);
            res.send(result);
            console.log("ID:", id);
        });


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }
    finally {

    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(` port: ${port}`)
})

