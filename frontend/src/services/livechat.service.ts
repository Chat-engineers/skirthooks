export const getUser = (
  token: string
): Promise<{ username: string; password: string }> => {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
