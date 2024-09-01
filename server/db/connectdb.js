const mongoose = require("mongoose")

const databaseconnect = async() =>{
        try{
            const connect = await mongoose.connect(process.env.MONGOURI)
            if(connect){
                console.log("Mongodb connected....");
            }
            else{
                console.log("Something went wrong in connecting mongodb...");
            }
        }
        catch(err){
            console.log("Mongodb error:",err)
        }
}
module.exports = databaseconnect;