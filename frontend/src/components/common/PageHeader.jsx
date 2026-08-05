const PageHeader = ({
    title,
    description,
    className = "",
    align = "left",
}) => {
    return (
        <div
            className={`space-y-2 ${
                align === "center" ? "text-center" : "text-left"
            } ${className}`}
        >
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {title}
            </h1>

            {description && (
                <p className="max-w-2xl text-base text-slate-600 md:text-lg">
                    {description}
                </p>
            )}
        </div>
    );
};

export default PageHeader;