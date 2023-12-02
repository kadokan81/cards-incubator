import { useMemo } from 'react'

type UsePaginationParamType = {
  currentPage: number
  onChange: (pageNumber: number) => void
  pageSize: number
  siblingCount: number
  totalCount: number
}

export const usePagination = ({
  currentPage,
  pageSize,
  siblingCount = 1,
  totalCount,
}: UsePaginationParamType) => {
  const paginationRange = useMemo(() => {
    // Our implementation logic will go here
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
