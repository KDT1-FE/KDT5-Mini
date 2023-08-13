import React from 'react';
import ReactPaginate from 'react-paginate';
import { IPaginationProps } from '@/types/ICommon';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange
}: IPaginationProps) {
  return (
    <ReactPaginate
      previousLabel={<HiChevronLeft className="text-xl" />}
      nextLabel={<HiChevronRight className="text-xl" />}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={selected => onPageChange(selected.selected)}
      containerClassName={'flex justify-center items-center mt-4'}
      pageClassName={'px-2 py-1 border rounded-lg'}
      pageLinkClassName={'text-blue-500'}
      activeClassName={'bg-blue-200'}
      previousClassName={'px-1 py-1 border rounded-lg '}
      previousLinkClassName={'text-blue-500'}
      nextClassName={'px-1 py-1 border rounded-lg'}
      nextLinkClassName={'text-blue-500'}
      breakLinkClassName={'text-blue-500'}
    />
  );
}
