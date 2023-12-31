
import Logo from './logo'
import Link from 'next/link'


export default function NavBar() {
    return(
        <nav className='flex justify-between items-center'>
           <Logo className='flex justify-self-center'/> 
            <div className='flex items-center 
                            rounded
                            text-custom-pink
                            hover:text-custom-pearl'>
                <Link 
                href="/pages/collection"
                className='p-2 text-2xl italic underline'
                >Collections</Link>
            </div>
            
        </nav>
    )
}