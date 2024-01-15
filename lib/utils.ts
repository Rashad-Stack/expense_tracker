import { clsx, type ClassValue } from "clsx";
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
