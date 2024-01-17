"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

export default function Paginate({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = Array.from({ length: totalPages });

  const onClick = (btnType: string | number) => {
    const pageValue =
      typeof btnType === "number"
        ? btnType
        : btnType === "next"
          ? Number(page) + 1
          : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onClick("prev")}
            disabled={Number(page) <= 1}
          >
            Previous
          </Button>
        </PaginationItem>
        {pages.map((_, index) => (
          <PaginationItem key={index}>
            <Button
              size="sm"
              variant={page === index + 1 ? "secondary" : "outline"}
              onClick={() => onClick(index + 1)}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button
            size="sm"
            onClick={() => onClick("next")}
            disabled={Number(page) >= totalPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
