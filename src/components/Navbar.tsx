import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container flex mx-auto text-white">
                    <div className="px-2 py-2 hover:bg-gray-300 hover:text-black">
                        <Link to="/">
                            Dashboard
                        </Link>
                    </div>
                    <div className="px-2 py-2 hover:bg-gray-300 hover:text-black">
                        <Link to="/operators">
                            Operators
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
