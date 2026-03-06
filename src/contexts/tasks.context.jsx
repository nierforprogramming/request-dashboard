import { createContext, useEffect, useMemo, useReducer, useState } from "react";

const TasksContext = createContext();

const TasksData = [
  {
    id: "1",
    title: "Fix login validation bug",
    content: "Users can submit empty password field",
    status: "Pending",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Charlie",
    supervisorMessage: "",
  },
  {
    id: "2",
    title: "Update dashboard UI",
    content: "Improve spacing and card alignment",
    status: "Active",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Bob",
    supervisorMessage: "No longer needed",
  },
  {
    id: "3",
    title: "Add search functionality",
    content: "Implement search filter for tasks",
    status: "Active",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Charlie",
    supervisorMessage: "No need",
  },
  {
    id: "4",
    title: "Fix API timeout issue",
    content: "Requests taking too long to respond",
    status: "Completed",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "David",
    supervisorMessage: "",
  },
  {
    id: "5",
    title: "Implement task reassignment",
    content: "Supervisor can reassign tasks",
    status: "Pending",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Bob",
    supervisorMessage: "",
  },
  {
    id: "6",
    title: "Add loading skeleton",
    content: "Show skeleton while fetching data",
    status: "Cancelled",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Bob",
    supervisorMessage: "Project restructure",
  },
  {
    id: "7",
    title: "Fix mobile responsiveness",
    content: "Dashboard breaks on small screens",
    status: "Completed",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Niraj",
    supervisorMessage: "",
  },
  {
    id: "8",
    title: "Add cancel confirmation",
    content: "Prompt before cancelling task",
    status: "Completed",
    lastUpdate: "Wed Mar 04 2026",
    assignedTo: "Niraj",
    supervisorMessage: "",
  },
  {
    id: "9",
    title: "Optimize API calls",
    content: "Reduce unnecessary network requests",
    status: "Active",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Niraj",
    supervisorMessage: "Urgent task",
  },
  {
    id: "10",
    title: "Fix status badge colors",
    content: "Incorrect colors for statuses",
    status: "Pending",
    lastUpdate: "Fri Feb 27 2026",
    assignedTo: "Niraj",
    supervisorMessage: "",
  },
];

const inititalState = {
  requests: TasksData,
  currentIndex: 0,
};

// Helper function to change status automatically
const nextStatus = (status) => {
  switch (status) {
    case "Pending":
      return "Active";

    case "Active":
      return "Completed";

    case "Completed":
      return "Cancelled";

    case "Cancelled":
      return "Pending";

    default:
      return status;
  }
};

// Every state change is done by one dispatch
function reducer(state, action) {
  switch (action.type) {
    // Manual update like PATCH but local
    case "UPDATE_STATUS": {
      const { id, status, supervisorMessage = "" } = action.payload;

      const updated = state.requests.map((request) => {
        if (request.id !== id) return request;

        return {
          ...request,
          status,
          lastUpdate: new Date().toDateString(),
          supervisorMessage: supervisorMessage.trim()
            ? supervisorMessage.trim()
            : request.supervisorMessage,
        };
      });

      return { ...state, requests: updated };
    }

    case "REASSIGN_TASK": {
      const { id, assignedTo, supervisorMessage = "" } = action.payload;

      const updated = state.requests.map((request) => {
        if (request.id !== id) return request;

        return {
          ...request,
          assignedTo,
          lastUpdate: new Date().toDateString(),
          supervisorMessage: supervisorMessage.trim()
            ? supervisorMessage.trim()
            : request.supervisorMessage,
        };
      });

      return { ...state, requests: updated };
    }
    case "TICK": {
      const updated = state.requests.map((task, index) => {
        if (index !== state.currentIndex) return task;

        return {
          ...task,
          status: nextStatus(task.status),
          lastUpdate: new Date().toDateString(),
        };
      });

      return {
        ...state,
        requests: updated,
        currentIndex: (state.currentIndex + 1) % state.requests.length,
      };
    }
    default:
      return state;
  }
}

function TasksProvider({ children }) {
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("All Tasks");
  const [role, setRole] = useState("");
  const [state, dispatch] = useReducer(reducer, inititalState);

  const tasks = state.requests;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 3000);

    return () => clearInterval(id);
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
    const payload = {
      status: nextStatus,
      lastUpdate: new Date().toDateString(),
    };

    // Only if message is provided
    if (supervisorMessage?.trim()) {
      payload.supervisorMessage = supervisorMessage.trim();
    }

    //Local state update
    dispatch({
      type: "UPDATE_STATUS",
      payload: {
        id: taskId,
        status: nextStatus,
        supervisorMessage,
      },
    });
  };

  // Reassign tasks
  const reassignTask = async (taskId, nextAgent, message = "") => {
    const payload = {
      assignedTo: nextAgent,
      lastUpdate: new Date().toDateString(),
    };

    if (message?.trim()) payload.supervisorMessage = message.trim();

    dispatch({
      type: "REASSIGN_TASK",
      payload: {
        id: taskId,
        assignedTo: nextAgent,
        supervisorMessage: message,
      },
    });
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
        setError,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider };
export default TasksContext;
