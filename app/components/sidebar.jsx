import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { assets } from '@/assets/assets';
import { useClerk , UserButton } from "@clerk/nextjs";
import { useAppContext } from '../context/appcontext';
import ChatLebel from './ChatLebel';


const Sidebar = ({ expand, setExpand }) => {
  const {openSignIn} = useClerk();
  const {user} = useAppContext();
  const [openMenu , setOpenMenu] = useState({id: 0 , open:false})

  return (
    
    <div className={`bg-[#131417] transition-all z-50 max-md:absolute max-md:h-screen ${expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"}`}>
      
      <div className="flex flex-col justify-between h-screen">

        <div>
      
          <div className={`flex ${expand ? "flex-row gap-10" : "flex-col items-center gap-8"}`}>
            <Image className={expand ? "w-36" : "w-10"} src={expand ? assets.logo_text : assets.logo_icon} alt='' />

            <div onClick={() => setExpand(!expand)}
              className='group relative items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'>
              <Image src={assets.menu_icon} alt='' className='md:hidden' />
              <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt='' className='hidden md:block w-7' />
              <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2" : "-top-12 left-0"} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg`}>
                {expand ? "close sidebar" : "open sidebar"}
                <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? "left-1/2 -top-1.5 -translate-x-1/2" : "left-4 -bottom-1.5"}`}></div>
              </div>
            </div>
          </div>

          <button className={`mt-8 mb-7 flex items-center justify-center cursor-pointer ${expand ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max" : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
            <Image className={expand ? 'w-6' : 'w-7'} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt='' />
            {expand && <p className='text-white font-medium'>New Chat</p>}
          </button>

          <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
            <p className='my-1'>recent</p>
            <ChatLebel openMenu={openMenu} setOpenMenu={setOpenMenu}/>
          </div>
        </div>

        <div onClick= { user ? null : openSignIn} className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'} gap-3 mb-10 text-white/60 text-sm p-2 cursor-pointer`}>             
              {
                user ? <UserButton />
                : <Image src={assets.profile_icon} alt=''  className='w-7' />
              }
          
          {expand && <span> My Profile</span>}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
