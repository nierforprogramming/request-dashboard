import { baseURL } from "../assets";
import { fetchAPI } from "./errorHandler";

// All tasks
export const getTasks = async () => {
  const result = await fetchAPI(`${baseURL}/tasks`);

  if (!result.success) {
    // Keep the error in the result
    return { success: false, error: result.error };
  }

  return { success: true, data: result.data };
};

// Updates the status
export const updateTaskStatusAPI = async (taskId, payload) => {
  return await fetchAPI(`${baseURL}/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

// Reassigning the tasks
export const reassignTaskAPI = async (taskId, payload) => {
  return await fetchAPI(`${baseURL}/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
