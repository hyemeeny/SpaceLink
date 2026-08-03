import API_URL from "@/constants/config";

export const checkEmail = async (email: string) => {
  const res = await fetch(`${API_URL}/users/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, message: error.message };
  }

  return res.json();
};
