const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
};

export default AuthCard;