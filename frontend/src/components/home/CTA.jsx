import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const CTA = () => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 shadow-sm sm:px-10 lg:px-16">

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                            Start Today
                        </span>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Ready to Take Control
                            <br />
                            of Your Taxes?
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Manage your income, expenses,
                            tax calculations and online filings
                            from one secure and modern platform.
                        </p>

                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                            <Button
                                size="lg"
                                className="h-12 px-8"
                                asChild
                            >
                                <Link to="/register">
                                    Create Free Account
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-8"
                                asChild
                            >
                                <Link to="/login">
                                    Login
                                </Link>
                            </Button>

                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">

                            <span>No Credit Card Required</span>

                            <span>•</span>

                            <span>Secure Authentication</span>

                            <span>•</span>

                            <span>Free to Get Started</span>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default CTA;