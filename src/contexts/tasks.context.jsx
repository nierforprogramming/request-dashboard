import { createContext, useEffect, useMemo, useState } from "react";
import { getTasks } from "../api/tasks";

const TasksContext = createContext();

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("All Tasks");
  const [role, setRole] = useState("");

  useEffect(() => {
    const _getTasks = async () => {
      const res = await getTasks();
      if (!res.success) {
        return setError(res.error);
      }

      setError(null);
      setTasks(res.data);
    };

    _getTasks();
  }, []);

  // Getting status Tasks
  const statusTasks = [
    {
      status: "Pending",
      value: tasks?.filter((task) => task.status === "Pending").length,
    },
    {
      status: "Active",
      value: tasks?.filter((task) => task.status === "Active").length,
    },
    {
      status: "Completed",
      value: tasks?.filter((task) => task.status === "Completed").length,
    },
    {
      status: "Cancelled",
      value: tasks?.filter((task) => task.status === "Cancelled").length,
    },
  ];

  // Filter by status
  const filteredTasks = useMemo(() => {
    if (filterText === "All Tasks") return tasks;
    return tasks.filter((task) => task.status === filterText);
  }, [tasks, filterText]);

  // Per Operator tasks
  const perOperatorTasks = (operator) => {
    return tasks.filter((task) => task.assignedTo === operator.name);
  };

  const perOperatorStatus = (operator) => {
    return [
      {
        status: "Pending",
        value: tasks?.filter(
          (task) =>
            task.status === "Pending" && task.assignedTo === operator.name,
        ).length,
      },
      {
        status: "Active",
        value: tasks?.filter(
          (task) =>
            task.status === "Active" && task.assignedTo === operator.name,
        ).length,
      },
      {
        status: "Completed",
        value: tasks?.filter(
          (task) =>
            task.status === "Completed" && task.assignedTo === operator.name,
        ).length,
      },
      {
        status: "Cancelled",
        value: tasks?.filter(
          (task) =>
            task.status === "Cancelled" && task.assignedTo === operator.name,
        ).length,
      },
    ];
  };
  return (
    <TasksContext.Provider
      value={{
        error,
        tasks,
        statusTasks,
        filteredTasks,
        setFilterText,
        filterText,
        role,
        setRole,
        perOperatorTasks,
        perOperatorStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider };
export default TasksContext;
