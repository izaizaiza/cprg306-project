
import Logo from './logo'
import Link from 'next/link'


export default function NavBar() {
    return(
        <nav className='flex justify-between items-center'>
           <Logo className='flex justify-self-center'/> 
            <div className='flex items-center 
                            rounded
                            text-custom-milano-red
                            hover:text-custom-pearl
                            bg-custom-black-pearl'>
                <Link 
                href="/favourites"
                className='p-1'
                >Favourites</Link>
            </div>
            
        </nav>
    )
}