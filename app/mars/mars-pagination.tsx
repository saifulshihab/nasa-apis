"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Rover } from "@/lib/types";

const TOTAL_PHOTOS = 800;
const PHOTOS_PER_PAGE = 25;
const TOTAL_PAGES = Math.ceil(TOTAL_PHOTOS / PHOTOS_PER_PAGE);

export function MarsPagination({
  rover,
  page,
}: {
  rover: Rover;
  page: number;
}) {
  const router = useRouter();

  const goTo = (target: number) => {
    if (target < 1 || target > TOTAL_PAGES) return;
    router.push(`/mars?rover=${rover}&page=${target}`);
  };

  const pages = Array.from({ length: 5 }, (_, i) => page - 2 + i).filter(
    (p) => p >= 1 && p <= TOTAL_PAGES
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(page - 1);
            }}
          />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault();
                goTo(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
