import React, { useContext, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import TasksContext from "../contexts/tasks.context";

const RoleAction = ({ role, taskId, taskStatus }) => {
  const [open, setOpen] = useState(false);
  const { updateTaskStatus } = useContext(TasksContext);

  const actions = useMemo(() => {
    if (taskStatus === "Cancelled" || taskStatus === "Completed") return [];

    if (role.name === "Operator") {
      if (taskStatus === "Pending") return ["Start"];
      if (taskStatus === "Active") return ["Mark Complete"];
      return [];
    }

    if (role.name === "Supervisor") {
      return ["Change Status", "Reassign"];
    }

    return [];
  }, [role.name, taskStatus]);

  const handleAction = async (action) => {
    // For Operator
    if (action === "Start") updateTaskStatus(taskId, "Active");
    if (action === "Mark Complete") updateTaskStatus(taskId, "Completed");

    // For Supervisor
    if (action === "Change Status") {
      //Maybe will do modal
      updateTaskStatus(taskId, "Active");
    }
    setOpen(false);
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
      </div>
    </>
  );
};

export default RoleAction;
