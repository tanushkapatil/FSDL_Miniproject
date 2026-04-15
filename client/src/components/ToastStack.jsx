const toneStyles = {
  success: "border-emerald-100 bg-emerald-50 text-emerald-800",
  error: "border-rose-100 bg-rose-50 text-rose-800",
  info: "border-sky-100 bg-sky-50 text-sky-800",
};

const ToastStack = ({ toasts }) => {
  return (
    <div className="fixed right-4 top-4 z-50 flex w-[min(92vw,360px)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border px-4 py-3 shadow-md ${toneStyles[toast.type] || toneStyles.info}`}
        >
          <p className="text-sm font-semibold">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
