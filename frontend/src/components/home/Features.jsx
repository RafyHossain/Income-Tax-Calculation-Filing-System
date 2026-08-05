import {
    Wallet,
    Receipt,
    Calculator,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
    {
        icon: Wallet,
        title: "Income Management",
        description:
            "Track every income source with a clean and organized dashboard.",
    },
    {
        icon: Receipt,
        title: "Expense Tracking",
        description:
            "Record expenses and categorize them for accurate tax reporting.",
    },
    {
        icon: Calculator,
        title: "Automatic Tax Calculation",
        description:
            "Calculate taxes instantly using predefined tax rules and formulas.",
    },
];

const Features = () => {
    return (
        <section
            id="features"
            className="bg-white py-16 sm:py-20"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-2xl text-center">

                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                        Features
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Everything You Need
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Powerful tools designed to simplify income tax management.
                    </p>

                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Features;