import { Link } from "react-router";
import { Landmark } from "lucide-react";

const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-3"
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Landmark className="h-5 w-5" />
            </div>

            <div>
                <h1 className="text-xl font-bold leading-none">
                    IncomeTax
                </h1>

                <p className="mt-1 text-xs text-muted-foreground">
                    Filing System
                </p>
            </div>
        </Link>
    );
};

export default Logo;