import { Link } from "react-router";

import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="border-t bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">

                <div>
                    <Logo />

                    <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
                        A secure platform to manage income,
                        expenses and tax filings with confidence.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Quick Links
                    </h3>

                    <div className="mt-4 space-y-3">

                        <Link
                            className="block text-slate-600 hover:text-slate-900"
                            to="/"
                        >
                            Home
                        </Link>

                        <Link
                            className="block text-slate-600 hover:text-slate-900"
                            to="/login"
                        >
                            Login
                        </Link>

                        <Link
                            className="block text-slate-600 hover:text-slate-900"
                            to="/register"
                        >
                            Register
                        </Link>

                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Resources
                    </h3>

                    <div className="mt-4 space-y-3 text-slate-600">

                        <p>Privacy Policy</p>

                        <p>Terms & Conditions</p>

                        <p>Documentation</p>

                    </div>
                </div>

            </div>

            <div className="border-t py-5 text-center text-sm text-slate-500">
                © 2026 IncomeTax. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;