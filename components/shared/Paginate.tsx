import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

export default function Paginate() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="secondary" size="sm">
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="sm" variant="default">
            1
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="sm" variant="secondary">
            2
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="sm" variant="secondary">
            3
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button size="sm">Next</Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
