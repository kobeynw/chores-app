import { API_BASE_URL } from "../config";

export async function getChildren(token) {
  const res = await fetch(`${API_BASE_URL}/children`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to get children");
  }

  return data;
}

export async function getChild(childId, token) {
  const res = await fetch(`${API_BASE_URL}/children/${childId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to get child");
  }

  return data;
}

/**
 * childData - {"child": {"name": "Emma", "age": 7, "avatar_url": "https://example.com/avatar.png"}}
 * data - {"id":3,"name":"Emma","avatar_url":"https://example.com/avatar.png","age":7,"points":0,"user_id":3,"created_at":"2025-06-30T02:44:06.330Z","updated_at":"2025-06-30T02:44:06.330Z"}
 */
export async function createChild(childData, token) {
  const res = await fetch(`${API_BASE_URL}/children`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({ child: childData }),
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to create child");
  }

  return data;
}

export async function updateChild(childId, childData, token) {
  const res = await fetch(`${API_BASE_URL}/children/${childId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({ child: childData }),
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.[0] || "Failed to update child");
  }

  return data;
}

export async function deleteChild(childId, token) {
  const res = await fetch(`${API_BASE_URL}/children/${childId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });
  
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.errors?.[0] || "Failed to delete child");
  }

  return true;
}