import Logo from "@/components/common/Logo";

const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-8 text-center">

            <div className="mb-6 flex justify-center">
                <Logo />
            </div>

            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            <p className="mt-3 text-slate-500">
                {subtitle}
            </p>

        </div>
    );
};

export default AuthHeader;