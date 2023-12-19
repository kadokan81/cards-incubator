import React, { FC, useEffect, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import { Column } from '@tanstack/react-table'

import s from './filter-range.module.scss'

import { Typography } from '../../typography'

type Props = {
  cardsRow: Column<any, unknown> | undefined
  maxNum: number
  minNum: number
  range: number[]
  setRange: React.Dispatch<React.SetStateAction<number[]>>
}

export const FilterRange: FC<Props> = ({ cardsRow, maxNum, minNum, range, setRange }) => {

  return (
    <div className={s.rootRange}>
      <Typography as={'h3'} className={s.rangeTitle}>
        Number of cards
      </Typography>
      <div className={s.rangeBody}>
        <input
          className={s.minInput}
          max={maxNum}
          min={minNum}
          onChange={e => {
            setRange(prev => [parseInt(e.target.value.replace(/^0+/, '')), prev[1]])
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              cardsRow?.setFilterValue(range)
            }
          }}
          onMouseLeave={() => {
            cardsRow?.setFilterValue(range)
          }}
          type={'number'}
          value={range[0]}
        />
        <Slider.Root
          className={s.sliderRoot}
          max={maxNum}
          min={minNum}
          minStepsBetweenThumbs={1}
          onValueChange={e => {
            setRange(e)
          }}
          onValueCommit={() => {
            cardsRow?.setFilterValue(range)
            //also can make server request
            //   table.getColumn('cardsCount')?.setFilterValue(range)
          }}
          value={range}
        >
          <Slider.Track className={s.sliderTrack}>
            <Slider.Range className={s.sliderRange} />
          </Slider.Track>
          <Slider.Thumb className={s.sliderThumb} />
          <Slider.Thumb className={s.sliderThumb} />
        </Slider.Root>
        <input
          className={s.minInput}
          max={maxNum}
          min={minNum}
          onChange={e => {
            setRange(prev => [prev[0], parseInt(e.target.value.replace(/^0+/, ''))])
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              cardsRow?.setFilterValue(range)
            }
          }}
          onMouseLeave={() => {
            cardsRow?.setFilterValue(range)
          }}
          type={'number'}
          value={range[1] || ''}
        />
      </div>
    </div>
  )
}
