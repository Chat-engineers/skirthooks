export const getUser = (
  token: string
): Promise<{ username: string; password: string }> => {
  return fetch(`/me`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
