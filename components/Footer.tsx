import Link from "next/link";

export default function Footer () {

    return(
        <footer className="bg-transparent py-4 text-center border-t border-gray-600">
            <p>© 2024 Powered by {" "}
              <Link href={'https://github.com/mibijoy007'} className="hover:underline text-blue-500">
                mibijoy007
              </Link>
              
              </p>
          </footer>
    )
}