export const fetchAPI = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    // Server / HTTP errors
    if (!res.ok) {
      return {
        success: false,
        error: `Server Error: ${res.status} ${res.statusText}`,
      };
    }

    let data;
    try {
      data = await res.json();
    } catch {
      return { success: false, error: "Failed to parse JSON from server" };
    }

    // Empty data
    if (
      data === null ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === "object" && Object.keys(data).length === 0)
    ) {
      return { success: false, error: "No data found" };
    }

    return { success: true, data: data };
  } catch (err) {
    // Unexpected / network error
    if (err) {
      return {
        success: false,
        error: "Network error — please check your connection",
      };
    }
    return { success: false, error: "Unexpected error occurred" };
  }
};
