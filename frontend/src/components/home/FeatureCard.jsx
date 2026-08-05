const FeatureCard = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
            </p>

        </div>
    );
};

export default FeatureCard;