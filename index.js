const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const Product = require('./db/products');
const Cart = require('./db/AddToCart');
const Favourite = require("./db/Favourite");
const app = express();

app.use(cors());
app.use(express.json());
app.post("/registration", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    // console.log(result);
    resp.send(result);
})

app.post("/login",async (req,resp) => {
    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user);
        }
        else{
            resp.send({result: "No user found"});
        }
    }
    else
    {
        resp.send({result: "No user found"});
    }
})

app.post("/addProduct", async (req,resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/Home/:email", async (req, resp) => {
    try {
      let result = await Product.find({ email: req.params.email });
      console.log(result);
      resp.send(result);
    } catch (error) {
      console.error("Error fetching products:", error);
      resp.status(500).send("Internal Server Error");
    }
  });

app.get("/get/:id", async (req,resp) => {
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send({result: "No Record Found"});
    }
})

app.put("/update/:id", async (req,resp) => {
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result);
})

app.post("/cart", async (req, resp) => {
    console.log("data>>>>>>>>>",req.body);
    let cart = new Cart(req.body);
    let result = await cart.save();
    result = result.toObject();
    // console.log(result);
    resp.send(result);
})

app.get("/cart/:email", async (req, resp) => {
    try {
        
      let result = await Cart.find({ email: req.params.email });
      console.log(result);
      resp.send(result);
    } catch (error) {
      console.error("Error fetching products:", error);
      resp.status(500).send("Internal Server Error");
    }
  });

app.get("/remove/:id",async (req,resp) => {
    try{
        console.log('req.params.id==remove==', req.params.id);
        let result = await Cart.deleteOne({_id:req.params.id });
        resp.send(result);
    }
    catch(error){
        console.log("Couldn't deleted that product");
    }
})

app.get("/user/:email",async (req,resp) => {
    try{
    const data = await User.findOne({email: req.params.email});
    resp.send(data);
    }
    catch(error){
        console.log("Couldn't get the user details");
    }
})

app.post("/favourite", async (req,resp) => {
    let favData = new Favourite(req.body);
    let result = await favData.save();
    result = result.toObject();
    console.log("fav",result);
    resp.send(result);
})

app.get("/favget/:id", async (req, resp) => {
        console.log('req.params.id==', req.params.id);
        const data = await Favourite.findOne({ productId: req.params.id });
        console.log('data==', data);
        if(data){
            resp.json({data: 'Records Found'});
        }
        else{
            resp.json({data: "No Records Found"});
        }
});


app.delete("/favdel/:id",async (req,resp) => {
    let result = await Favourite.deleteOne({productId: req.params.id});

    console.log('result==', result);
    resp.send(result);
})

app.delete("/delfav/:id",async (req,resp) => {
    let result = await Favourite.deleteOne({_id: req.params.id});

    console.log('result==', result);
    resp.send(result);
})

app.get("/allfavget/:email",async (req,resp) => {
    let result = await Favourite.find({email: req.params.email});
    console.log(">>>>>>>>>>>>>>>>>>>>>",result);
    resp.send(result);
})

app.listen(8000);




