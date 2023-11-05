import React from "react";

interface PaginationProps {
  totalPage: number;
  page: number;
  onChange: (page: number) => void;
}
export const Pagination = ({ page, totalPage, onChange }: PaginationProps) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex">
        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:hover:text-white `}
            onClick={() => {
              if (page !== 1) onChange(page - 1);
            }}
          >
            {"<"}
          </a>
        </li>
        {Array.from(Array(totalPage)).map((value, index) => (
          <li>
            <a
              className={`relative block rounded ${
                page === index + 1 ? "bg-neutral-700" : "bg-transparent"
              } px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:hover:text-white`}
              onClick={() => {
                onChange(index + 1);
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:hover:text-white `}
            onClick={() => {
              if (page !== totalPage) onChange(page + 1);
            }}
            aria-disabled
          >
            {">"}
          </a>
        </li>
      </ul>
    </nav>
  );
};
