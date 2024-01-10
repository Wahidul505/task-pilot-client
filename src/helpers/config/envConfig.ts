export const getBaseURL = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://task-pilot-server-xi.vercel.app/api/v1"
  );
};
