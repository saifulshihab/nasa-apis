"use client";

import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export function ApodHdToggle({ hd }: { hd: boolean }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <span>HD Image</span>
      <Switch
        checked={hd}
        onCheckedChange={(checked) => router.push(`/apod?hd=${checked}`)}
      />
    </div>
  );
}
