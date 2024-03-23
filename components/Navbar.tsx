import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

const Navbar = async () => {

  const {userId} = auth();
  if(!userId){
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where:{
      userId,
    }
  })

  return (
    // <div className='border-b '>
    //     <div className='h-16 flex items-center px-4'>
    //         <StoreSwitcher items={stores}></StoreSwitcher>
    //         <MainNav></MainNav>
    //         <div className='ml-auto flex items-center space-x-4'>
    //             <UserButton afterSignOutUrl='/'></UserButton>
    //         </div>
    //     </div>
    // </div>
    <div className="border-b">
    <div className="flex h-16 items-center px-4">
      <StoreSwitcher items={stores} />
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        {/* <ThemeToggle /> */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </div>
  )
}

export default Navbar