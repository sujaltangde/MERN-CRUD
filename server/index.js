const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors())

const FoodModel = require("./models/Food");

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

app.use(express.json());

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
})

app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({
        foodName: foodName,
        daysSinceIAte: days
    })
    try {
        await food.save();
    } catch (err) {
        console.log(err);
    }

})


app.get('/read', async (req, res) => {
    try {
        const data = await FoodModel.find({});
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to retrieve foods' });
    }
})


app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const newDays = req.body.newNum;
    const id = req.body.id;

    try {
         const updatedFood = await FoodModel.findById(id)
            updatedFood.foodName = newFoodName;
            updatedFood.daysSinceIAte = newDays;
            await updatedFood.save();
        
    } catch (err) {
        console.log(err);
    }
});

app.delete('/delete/:id',async (req,res)=>{
   const id = req.params.id ;
   await FoodModel.findByIdAndRemove(id).exec()
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

