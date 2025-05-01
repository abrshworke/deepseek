'use client';

import Image from "next/image";
import { assets } from "@/assets/assets";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import PromptBox from "./components/PromptBox";
import Message from "./components/message";

export default function Home() {

  const [isloading , setIsloading] = useState(false);
  const [message , setMessage] = useState([]);
  const [expand ,setExpand] = useState(false);

  return (

    <div>

        <div className="flex h-screen">
          <Sidebar expand={expand} setExpand={setExpand}/>
          <div className="flex-1 flex flex-col items-center justify-center px-5 pb-6 bg-[#292a2d] text-white relative">
            <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
              <Image onClick={() => (expand ? setExpand(false) : setExpand(true))} className="rotate-180" src={assets.menu_icon} alt="menu"/>
              <Image className="rotate-180" src={assets.chat_icon} alt="chat"/>
            </div>

           {message.length !== 0 ? (
            <>
              <div className=" flex items-center gap-3">
                <Image src={assets.logo_icon} alt=" " className="h-16"/>
                <p className="text-2xl font-medium">Hi, I'm DeepSeek Developed by Abreham</p>
              </div>
              <p className="text-sm mt-2">How can i help you today?</p>
            </>
           ): (
            <div>
              <Message role='ai' content='what is next js'/>
            </div>
           )
          }

          <PromptBox isloading = {isloading}  setIsloading={setIsloading}/>

           <p className="text-xs absolute bottom-2 text-gray-500">Abrsh Generate for refernce only</p>
          </div>
        </div>
    </div>
    
  );

}


