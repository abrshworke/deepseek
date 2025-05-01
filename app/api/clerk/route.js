import { Webhook } from "svix";
import User from "@/model/user";
import connectDB from "@/config/db";
import { Headers } from "openai/_shims";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req){
const wh = new Webhook(process.env.SECRET_SIGNIN)
const headerpayload = await headers()
const svixHeaders = {
    "svix-id": headerpayload.get("svix-id"),
    "svix-signature": headerpayload.get("svix-signature"),

};

const payload = await req.json();
const body = JSON.stringify(payload);
const {data , type} = wh.verify(body , svixHeaders)


const userData = {
    _id: data.id,
    email: data.email_addresses[0].email_address,
    name : `${data.first_name} ${data.last_name}`,
    image: data.image_url,
};
await connectDB();

switch (type) {

    case 'user.created':
        await User.create(userData)
        break;

    case 'user.updated':
        await User.findByIdAndUpdate(data.id, userData)
        break;
        
    case 'user.deleted':
        await User.findByIdAndDelete(data.id)
        break;
        
    default:
        break;    
 }

 return NextRequest.json({message: "event received"})

}
