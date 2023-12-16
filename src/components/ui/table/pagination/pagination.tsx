// eslint-disable-next-line import/no-unresolved
import Arrow from '@/assets/icons/arrow'
import { Table } from '@tanstack/react-table'

import s from './pagination.module.scss'

import { DOTS, usePagination } from './usePagination'

const Pagination = (props: { siblingCount?: 1; table: Table<any> }) => {
  const { siblingCount, table } = props
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalCount = table.getPageCount()

  const paginationRange = usePagination({
    currentPage,
    pageSize: 1,
    siblingCount,
    totalCount,
  })

  //@ts-ignore
  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null
  // }

  //@ts-ignore
  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className={s.pagination_nav}>
      {table.getPageCount() > 1 ? (
        <div className={s.page_numbers}>
          <button
            className={''}
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <Arrow className={s.arrow_left} />
          </button>

          <ul className={s.numbersList}>
            {paginationRange?.map((pageNumber, ind) => {
              if (pageNumber === DOTS) {
                return (
                  <li className={'pagination-item dots'} key={pageNumber + ind}>
                    &#8230;
                  </li>
                )
              }

              return (
                <li
                  className={pageNumber === currentPage ? s.currentPageNumber : s.numberBlack}
                  key={pageNumber}
                  onClick={() => table.setPageIndex(+pageNumber - 1)}
                >
                  {pageNumber}
                </li>
              )
            })}
          </ul>
          <button
            className={''}
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <Arrow />
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <div className={s.itemsOnPage}>
        <label>Показать</label>
        <select
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
          style={{ background: 'black' }}
          value={table.getState().pagination.pageSize}
        >
          {[10, 20, 30, 40, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span>на странице</span>
      </div>
    </div>
  )
}

export default Pagination
