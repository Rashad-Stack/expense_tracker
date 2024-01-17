import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { clsx, type ClassValue } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.error("Debug: error: ", error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

// Function to handle and join Zod validation errors into a single message
const handleZodValidationErrors = (error: ZodError): string => {
  if (error.issues.length > 0) {
    const errorMessages = error.issues.map((validationError) => {
      return `${validationError.path.join(".")} : ${validationError.message}`;
    });

    // Join all error messages into a single string
    return errorMessages.join(" ");
  }

  // Return a generic error message for unexpected cases
  return "An unexpected validation error occurred.";
};

export const clientError = (error: Error) => {
  if (error.name === "ZodError") {
    return handleZodValidationErrors(error as ZodError);
  } else if (error.name === "custom") {
    return error.message;
  }
  return "Something went wrong!";
};

export function formatDate(inputDate: Date | string) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}
