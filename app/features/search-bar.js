


export default function SearchBar({ query,  handleSearch, handleSubmit}) {
    /**
     * create a search bar that allows users to search for art pieces
     */

    

    return(
        <div
        className=' rounded
                    items-center
                    justify-evenly
                    mx-auto
                    w-3/4'
                    >
            <p className='text-lg pt-5 pb-2 pl-5 pr-5 text-custom-neon-blue text-center'>
                Search for art from the Chicago Art Museum and Harvard Art Museum</p>
            <form 
            onSubmit={handleSubmit}
            className='flex p-5 mb-5 w-full justify-center'>
                <input
                id = "searchBar"
                className='text-custom-black-pearl w-3/4 rounded p-1 mr-5 border-4 hover:border-custom-neon-blue' 
                type="text"
                placeholder="Search for art pieces..." 
                value={query} 
                onChange={handleSearch} />
            </form>
        </div>
    )
}


// could be replaced with a search bar component from a UI library like Tailwind UI or Material UI