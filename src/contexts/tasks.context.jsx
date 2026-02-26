import { createContext, useEffect, useMemo, useState } from "react";
import { getTasks } from "../api/tasks";

const TasksContext = createContext();

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("All Tasks");

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
  return (
    <TasksContext.Provider
      value={{
        error,
        tasks,
        statusTasks,
        filteredTasks,
        setFilterText,
        filterText,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider };
export default TasksContext;
