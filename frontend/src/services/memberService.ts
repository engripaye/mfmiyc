import type { ApiResponse, MemberFormData } from "../types/member";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function submitMemberForm(
  formData: MemberFormData,
): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  let result: ApiResponse;

  try {
    result = (await response.json()) as ApiResponse;
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(result.message || "The submission failed.");
  }

  return result;
}
