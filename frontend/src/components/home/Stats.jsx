import {
    Users,
    FileText,
    ShieldCheck,
    Zap,
} from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "10K+",
        title: "Active Users",
    },
    {
        icon: FileText,
        value: "50K+",
        title: "Tax Filings",
    },
    {
        icon: Zap,
        value: "99.9%",
        title: "Accuracy",
    },
    {
        icon: ShieldCheck,
        value: "Secure",
        title: "Protected Data",
    },
];

const Stats = () => {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4">

                <div className="text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                        Trusted Platform
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        Built for Secure Tax Management
                    </h2>

                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="text-3xl font-bold">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default Stats;