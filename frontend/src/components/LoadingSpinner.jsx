const LoadingSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-700" />
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
