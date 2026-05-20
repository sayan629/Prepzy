import { SignInButton, SignUpButton, UserButton,Show } from '@clerk/nextjs';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { checkUser } from '@/lib/checkUser';

const Header  = async() => {
  const user = await checkUser();
  return (
  <nav className='fixed top-0 inset-x-0 z-50 flex items-center 
  justify-between px-10 py-3 border-b border-white/7 
  backdrop-blur-xl'>
    {/* Logo */}
    <Link href={"/"}>
      <Image src={"/prepzy_logoo.png"} 
      alt="Prepzy Logo" 
      width={1000} 
      height={1000} 
      className="h-11 w-auto"
      />
    </Link>

    {/* Redirection logic */}
    {/* Sign in */}
    <div className="flex items-center gp-3">
        <Show when="signed-out">
              { /* Link */}   
               {/* Credits */}  
              <SignInButton mode="modal">
                <Button variant = "ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant = "gold">Get Started</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
    </div>
  </nav>
  );
};
export default Header;