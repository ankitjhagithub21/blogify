import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Blogify Brand */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-2xl font-semibold mb-4">Blogify</h2>
                        <p className="">
                            Your go-to platform for sharing ideas and stories that inspire. Stay
                            connected with the world through Blogify.
                        </p>
                    </div>
                    {/* Navigation Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li>
                                <a href="#" className=" hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className=" hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className=" hover:text-white">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className=" hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Social Media Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className=" hover:text-white">
                                <i className="fab fa-facebook" /> {/* FontAwesome Icon */}
                            </a>
                            <a href="#" className=" hover:text-white">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className=" hover:text-white">
                                <i className="fab fa-instagram" />
                            </a>
                            <a href="#" className=" hover:text-white">
                                <i className="fab fa-linkedin" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* Copyright Section */}
                <div className="mt-8 border-t pt-4 text-center">
                    <p>© {new Date().getFullYear()} Blogify. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer
