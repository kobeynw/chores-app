import { API_BASE_URL } from "../config";

export async function getProfile(token) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: { "Authorization": token }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to get User");
  }

  return data; // { user: { ... } }
}