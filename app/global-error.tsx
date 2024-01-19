"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorMessage handleClick={() => reset()} />;
      </body>
    </html>
  );
}
