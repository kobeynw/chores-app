import { API_BASE_URL } from "../config";

export async function registerUser(email, password, passcode) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, passcode }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Registration failed");
  }

  return data; // { token: "...", user: { ... } }
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data; // { token: "...", user: { ... } }
}

export async function verifyPasscode(passcode, token) {
  const res = await fetch(`${API_BASE_URL}/passcode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({ passcode }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to verify passcode");
  }

  return data.success; // Boolean
}