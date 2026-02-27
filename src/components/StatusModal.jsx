import { useEffect } from "react";

const STATUSES = ["Pending", "Active", "Completed", "Cancelled"];

const StatusModal = ({ open, currentStatus, onClose, onSelect }) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        // close only when clicking backdrop (not inside modal)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div className="relative z-10 w-[92vw] max-w-md rounded-md bg-white shadow-lg">
        <div className="px-4 py-3 border-b">
          <h3 className="font-semibold text-lg">Change Status</h3>
          <p className="text-sm text-gray-500">
            Current: <span className="font-medium">{currentStatus}</span>
          </p>
        </div>

        <div className="p-4 space-y-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              disabled={s === currentStatus}
              onClick={() => onSelect(s)}
              className={`w-full text-left px-3 py-2 rounded-md border
                ${s === currentStatus ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
              `}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="px-4 py-3 border-t flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
