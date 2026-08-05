const AuthCard = ({ children }) => {
    return (
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
            {children}
        </div>
    );
};

export default AuthCard;