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
