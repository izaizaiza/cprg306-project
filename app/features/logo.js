
import Link from "next/link"

export default function Logo() {

    return(
        <div>
            <Link href="/">
                <h1
                className="text-custom-pink
                            text-4xl
                            hover:text-custom-pearl"
                > 
                    Art Roam
                </h1>
            </Link>
        </div>
    )
}