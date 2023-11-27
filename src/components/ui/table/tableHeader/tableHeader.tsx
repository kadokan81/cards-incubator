import React, { useState } from 'react'

// eslint-disable-next-line import/no-unresolved
import { DeleteIcon } from '@/assets/icons'
import { Column } from '@tanstack/react-table'

import s from './tableHeader.module.scss'

import Button from '../../button/button'
import { Typography } from '../../typography'
import { DebouncedInput } from '../debouncedInput'
import { FilterRange } from '../filter-range'

type Props = {
  cardsRow: Column<any, unknown> | undefined
  globalFilter: string
  namesRow: Column<any, unknown> | undefined
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
}

export const TableHeader = ({ cardsRow, globalFilter, namesRow, setGlobalFilter }: Props) => {
  const maxNum = cardsRow?.getFacetedMinMaxValues()?.[1] ?? 100
  const minNum = cardsRow?.getFacetedMinMaxValues()?.[0] ?? 0
  const [myCards, setMyCards] = useState(true)
  const [range, setRange] = useState([minNum, maxNum])

  const myCardHandler = () => {
    setMyCards(false)
    namesRow?.setFilterValue('Bob Anderson')
  }
  const allCardHandler = () => {
    setMyCards(true)
    namesRow?.setFilterValue('')
  }

  const resetAllFiltersHandler = () => {
    setGlobalFilter('')
    namesRow?.setFilterValue('')
    cardsRow?.setFilterValue([])
    setMyCards(true)
    setRange([minNum, maxNum])
  }

  return (
    <div className={s.tableHeader_body}>
      <div className={s.global_filter}>
        <DebouncedInput
          onChange={value => setGlobalFilter(String(value))}
          placeholder={'Search all columns...'}
          style={{ background: 'inherit' }}
          value={globalFilter ?? ''}
        />
      </div>
      <div className={s.switcherBlock}>
        <Typography as={'h4'}>Show packs cards</Typography>
        <div className={s.switcherGroup}>
          <button
            className={myCards ? s.switcher : s.switcher__active}
            onClick={() => myCardHandler()}
          >
            My Cards
          </button>
          <button
            className={!myCards ? s.switcher : s.switcher__active}
            onClick={() => allCardHandler()}
          >
            All Cards
          </button>
        </div>
      </div>
      <div className={s.range__filter}>
        <FilterRange
          cardsRow={cardsRow}
          maxNum={maxNum}
          minNum={minNum}
          range={range}
          setRange={setRange}
        />
      </div>
      <div className={s.delete__filters}>
        <Button
          iconStart={<DeleteIcon />}
          onClick={() => resetAllFiltersHandler()}
          variant={'secondary'}
        >
          Clear Filter
        </Button>
      </div>
    </div>
  )
}
