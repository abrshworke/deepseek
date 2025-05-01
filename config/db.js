import mongoose from "mongoose";


let cached = global.mongoose || {conn : null , promise : null};

export default async function connectDB(){
    if (cached.conn) return cached.conn ;
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MDB).then((mongoose) => mongoose);
        
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("error to connect database :" , error);
    }

     return cached.conn
}