
import Link from "next/link"

export default function Logo() {

    return(
        <div>
            <Link href="/">
                <h1
                className="text-custom-milano-red
                            text-4xl"
                > 
                    Art Roam
                </h1>
            </Link>
        </div>
    )
}