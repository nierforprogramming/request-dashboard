import { useEffect, useState } from "react";

const ReassignModal = ({ open, currentAgent, agents, onClose, onSubmit }) => {
  const [selectedAgent, setSelectedAgent] = useState(currentAgent || "");
  const [message, setMessage] = useState(""); // optional

  useEffect(() => {
    if (!open) return;
    setSelectedAgent(currentAgent || "");
    setMessage("");
  }, [open, currentAgent]);

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
        <div className="px-4 py-3 ">
          <h3 className="font-semibold text-lg">Reassign Task</h3>
          <p className="text-sm text-gray-500">
            Current: <span className="font-medium">{currentAgent}</span>
          </p>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <label className="font-semibold">Assign to</label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                Select an operator
              </option>

              {agents.map((name) => (
                <option
                  key={name}
                  value={name}
                  disabled={name === currentAgent}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional note for reassignment..."
              className="w-full min-h-22.5 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="px-4 py-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-200 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedAgent || selectedAgent === currentAgent}
            onClick={() => onSubmit(selectedAgent, message)}
            className="px-3 py-2 rounded-md bg-black text-white disabled:opacity-50 cursor-pointer"
          >
            Reassign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReassignModal;
