const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get('/',async (req,res)=>{
    const data = await getDataCollection();
    res.send(await data.find({}).toArray());
});
router.post('/',async (req,res)=>{
    const data = await getDataCollection();
    data.insertOne({
        text:req.fields.text,
        date: new Date(),
    })
    res.status(201).send();
});
router.delete('/:id',async (req,res)=>{
    const data = await getDataCollection();
    data.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
});
async function getDataCollection(){
    const client = mongodb.MongoClient.connect(`mongodb://AdminMono:123123123@127.0.0.1:27017/admin`)
    return (await client).db("vueExpress").collection("vueData");
}



module.exports = router;