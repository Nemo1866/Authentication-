const express=require("express")
const app=express()
const bcrypt=require("bcrypt")

app.use(express.json())

let users=[]

app.get("/books",(req,res)=>{
    res.json(books)
})
app.get("/users",(req,res)=>{
res.json(users)
})

app.post("/register",async(req,res)=>{
try {

    let hashpassword= await bcrypt.hash(req.body.password,10)
    let user = {
        username:req.body.username,
        password:hashpassword
    }

    users.push(user)
    res.send("Succesfully created the user")
   
} catch (error) {
    console.log(error)
}

})

app.post("/login",async(req,res)=>{
   let user=users.find(user=>user.username===req.body.username)
   if(user == null){
    return res.status(201).send("Cannot find the user")
   }try {
    if(await bcrypt.compare(req.body.password,user.password)){
        res.send("Success")
    }else{
        res.send("Not allowed")
    }
    
   } catch (error) {
    console.log(error);
   }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})