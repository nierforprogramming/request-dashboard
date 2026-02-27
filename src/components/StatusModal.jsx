import { useEffect, useState } from "react";

const STATUSES = ["Pending", "Active", "Completed", "Cancelled"];

const StatusModal = ({ open, currentStatus, onClose, onSubmit }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [message, setMessage] = useState("");

  // reset when opened / status changes
  useEffect(() => {
    if (!open) return;
    setSelectedStatus(currentStatus);
    setMessage("");
  }, [open, currentStatus]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-[92vw] max-w-md rounded-md bg-white shadow-lg">
        <div className="px-4 py-3">
          <h3 className="font-semibold text-lg">Change Status</h3>
          <p className="text-sm text-gray-500">
            Current: <span className="font-medium">{currentStatus}</span>
          </p>
        </div>

        <div className="p-4 space-y-3">
          {/* Status select */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3 py-2 rounded-md border border-gray-200 text-left
                    ${selectedStatus === s ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Optional message */}
          <div className="space-y-2">
            <label className="font-semibold">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note about why this status changed..."
              className="w-full min-h-22.5 border border-gray-200 rounded-md p-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="px-4 py-3 border-t flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-md border border-gray-200  cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSubmit(selectedStatus, message)}
            className="px-3 py-2 rounded-md bg-black text-white hover:opacity-90 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
