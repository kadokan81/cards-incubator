import React, { useState } from 'react'

import { Column } from '@tanstack/react-table'

import s from './tableHeader.module.scss'

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
  const [myCards, setMyCards] = useState(false)

  const myCardHandler = () => {
    setMyCards(false)
    namesRow?.setFilterValue('Bob Anderson')
  }
  const allCardHandler = () => {
    setMyCards(true)
    namesRow?.setFilterValue('')
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
      <FilterRange cardsRow={cardsRow} />
    </div>
  )
}
