

// component that renders a button to add an art piece to collections
export default function AddToCollectionButton({ item, onClick }){
    return (
        <button
            className="bg-custom-pearl text-custom-neon-blue font-bold py-2 px-4 rounded hover:text-custom-pearl hover:bg-custom-pink"
            onClick={() => onClick(item)}
        >
            Add to Collection
        </button>
    )
}
