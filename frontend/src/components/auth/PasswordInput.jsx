import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PasswordInput = ({
    register,
    error,
}) => {

    const [show, setShow] = useState(false);

    return (

        <div>

            <div className="relative">

                <Input
                    type={
                        show
                            ? "text"
                            : "password"
                    }
                    placeholder="Enter password"
                    {...register("password", {
                        required:
                            "Password is required",
                    })}
                />

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShow(!show)}
                >

                    {
                        show
                            ? <EyeOff className="h-4 w-4" />
                            : <Eye className="h-4 w-4" />
                    }

                </Button>

            </div>

            {
                error && (
                    <p className="mt-2 text-sm text-red-500">
                        {error.message}
                    </p>
                )
            }

        </div>
    );
};

export default PasswordInput;