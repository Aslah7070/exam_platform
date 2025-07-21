import axios, { AxiosError } from "axios";

const axiosError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<{ message?: string }>;
    if (axiosError.response) {
      return (
        axiosError?.response?.data?.message ||
        `Error: ${axiosError?.response.status} - ${axiosError?.response.statusText}`
      );
    } else if (axiosError.request) {
      return "";
    } else {
      return `Error in making request: ${axiosError.message}`;
    }
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return "An unexpected error occurred, please try again";
  }
};

export default axiosError;