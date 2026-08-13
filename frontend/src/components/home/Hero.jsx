import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="py-16 sm:py-20 lg:py-28">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    Manage Your Taxes
                    <span className="block text-slate-500">
                        Smarter. Faster. Securely.
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                    Track your income, manage expenses,
                    calculate tax automatically and
                    submit tax filings from one secure platform.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                    <Button
                        asChild
                        size="lg"
                    >
                        <Link to="/register">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        asChild
                    >
                        <Link to="/login">
                            Login
                        </Link>
                    </Button>

                </div>

            </div>
        </section>
    );
};

export default Hero;