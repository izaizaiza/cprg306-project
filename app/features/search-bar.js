


export default function SearchBar({ query,  handleSearch, handleSubmit}) {
    /**
     * create a search bar that allows users to search for art pieces
     */

    

    return(
        <div
        className='bg-custom-black-pearl
                    rounded
                    items-center
                    justify-evenly
                    mx-auto
                    w-3/4'
                    >
            <form 
            onSubmit={handleSubmit}
            className='flex p-5 mt-10 mb-5 w-full justify-center'>
                <input
                className='text-custom-black-pearl w-3/4 rounded p-1 mr-5' 
                type="text"
                placeholder="Search for art pieces..." 
                value={query} 
                onChange={handleSearch} />
                <button 
                type="submit"
                className=' bg-white
                            text-custom-black-pearl  
                            hover:bg-custom-blue-light
                            hover:text-custom-pearl
                            font-bold
                            p-2
                            rounded'
                >Search</button>
            </form>
        </div>
    )
}


// could be replaced with a search bar component from a UI library like Tailwind UI or Material UI