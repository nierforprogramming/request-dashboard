import React, { useContext, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import TasksContext from "../contexts/tasks.context";
import StatusModal from "./StatusModal";

const RoleAction = ({ role, taskId, taskStatus }) => {
  const [open, setOpen] = useState(false);
  const { updateTaskStatus } = useContext(TasksContext);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const actions = useMemo(() => {
    if (role.name === "Supervisor") {
      return ["Change Status", "Reassign"];
    }

    // Operator won't be able to change the status if they are :
    if (taskStatus === "Cancelled" || taskStatus === "Completed") return [];

    // Permissions for Operator
    if (role.name === "Operator") {
      if (taskStatus === "Pending") return ["Start"];
      if (taskStatus === "Active") return ["Mark Complete"];
      return [];
    }

    return [];
  }, [role.name, taskStatus]);

  const handleAction = async (action) => {
    // For Operator
    // Operator
    if (action === "Start") {
      await updateTaskStatus(taskId, "Active");
      setOpen(false);
      return;
    }
    if (action === "Mark Complete") {
      await updateTaskStatus(taskId, "Completed");
      setOpen(false);
      return;
    }

    // For Supervisor
    if (action === "Change Status") {
      setStatusModalOpen(true);
      setOpen(false);
      return;
    }

    // Reassign is for later
  };

  if (actions.length === 0) return null;
  return (
    <>
      <div className="relative w-50">
        <div className="bg-white rounded-sm px-4  flex items-center space-x-2 py-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
            className="cursor-pointer  hover:bg-gray-200 p-2 rounded-sm font-semibold"
          >
            <BsThreeDots />
          </button>
        </div>

        {open && (
          <div className="bg-white absolute py-4 top-12 w-full shadow-md">
            <ul className="ml-2">
              <div className="font-semibold  px-2">Project Action</div>
              {actions.map((action, index) => (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAction(action);
                  }}
                  className={`hover:bg-gray-100 w-full cursor-pointer px-2`}
                  key={index}
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal area */}
        <StatusModal
          open={statusModalOpen}
          currentStatus={taskStatus}
          onClose={() => setStatusModalOpen(false)}
          onSelect={(newStatus) => {
            updateTaskStatus(taskId, newStatus);
            console.log(taskId);

            setStatusModalOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default RoleAction;
