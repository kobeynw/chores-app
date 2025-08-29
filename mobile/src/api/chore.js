import { API_BASE_URL } from "../config";

export async function createChore(choreData, token) {
  const res = await fetch(`${API_BASE_URL}/chores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({ chore: choreData }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to create chore");
  }

  return data;
}