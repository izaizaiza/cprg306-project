

"use client"
import Collection from "../features/collection"
import { useArtContext } from "../features/art-context"

export default function Page() {

    const { collection } = useArtContext();
    return(
        <div>
            <h1> Collections</h1>
            <Collection collection={collection}/>
        </div>
    )
}