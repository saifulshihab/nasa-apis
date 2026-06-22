"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROVERS, type Rover } from "@/lib/types";

export function MarsRoverSelect({ rover }: { rover: Rover }) {
  const router = useRouter();

  return (
    <Select
      value={rover}
      onValueChange={(value) => router.push(`/mars?rover=${value}&page=1`)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Rover" />
      </SelectTrigger>
      <SelectContent>
        {ROVERS.map((r) => (
          <SelectItem key={r} value={r}>
            {r[0].toUpperCase() + r.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
