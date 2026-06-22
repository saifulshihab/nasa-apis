"use client";

import { Button } from "@/components/ui/button";

export default function MarsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
      <h2 className="text-lg font-semibold text-destructive">
        Failed to load Mars Rover Photos
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button className="mt-4" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
