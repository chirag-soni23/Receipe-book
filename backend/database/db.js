import mongoose from 'mongoose';

export const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"ReceipeBook"
        }); 
        console.log("Mongodb connect successfully!")       
    } catch (error) {
        console.log("Mongodb connection error");
        process.exit(1);       
    }
}