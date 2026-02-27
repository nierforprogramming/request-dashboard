import { createContext, useEffect, useMemo, useState } from "react";
import { getTasks, reassignTaskAPI, updateTaskStatusAPI } from "../api/tasks";

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

  // It updates status of the tasks
  const updateTaskStatus = async (
    taskId,
    nextStatus,
    supervisorMessage = "",
  ) => {
    const id = Number(taskId);
    const payload = {
      status: nextStatus,
      lastUpdate: new Date().toDateString(),
    };

    // Only if message is provided
    if (supervisorMessage?.trim()) {
      payload.supervisorMessage = supervisorMessage.trim();
    }

    const res = await updateTaskStatusAPI(id, payload);
    if (!res.success) {
      setError(res.error);
      return;
    }

    //Local state update
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...payload } : task)),
    );
  };

  // Reassign tasks
  const reassignTask = async (taskId, nextAgent, message = "") => {
    const id = Number(taskId);

    const payload = {
      assignedTo: nextAgent,
      lastUpdate: new Date().toDateString(),
    };

    if (message?.trim()) payload.supervisorMessage = message.trim();

    const res = await reassignTaskAPI(id, payload);
    if (!res.success) {
      setError(res.error);
      return;
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...payload } : task)),
    );

    return;
  };

  // Get workload for active status
  const getActiveWorkLoad = () => {
    // Removes duplicate name and converts back to array
    const operators = [...new Set(tasks.map((task) => task.assignedTo))];

    // Filters Active tasks and returns with name
    return operators.map((name) => ({
      name,
      active: tasks.filter(
        (task) => task.assignedTo === name && task.status === "Active",
      ).length,
    }));
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
        updateTaskStatus,
        getActiveWorkLoad,
        reassignTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider };
export default TasksContext;
