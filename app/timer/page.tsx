'use client'

import { useState } from 'react'
import './styles.scss'
import { Box, Heading, Text } from 'grommet'
import { Button, Input } from 'components'

const STANDARD_UNITS = ['hours', 'minutes', 'seconds']

export default function Page() {
  const [isPaused, setIsPaused] = useState(false)
  // cache these values in local storage
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [units, setUnits] = useState(STANDARD_UNITS)
  const timerAdd = STANDARD_UNITS.map((unit) => {
    if (units.includes(unit)) return null
    return (
      <Button
        key={unit}
        onClick={() => setUnits([...units, unit])}
      >
        add {unit}
      </Button>
    )
  })

  const timerInput = units.map((unit) => (
    <Box direction='row' key={unit}>
      <Button
        onClick={() => setUnits(units.filter((unitInList) => unitInList !== unit))}
      >
        remove
      </Button>
      <Input
        color='purple'
        dropProps={{}}
        id={`timer-input-${unit}`}
        className='timer timer-input'
        focusIndicator={false}
        plain
        key={unit}
        value={unit === 'hours' ? hours : unit === 'minutes' ? minutes : seconds}
        onChange={(e: { target: { value: any } }) => {
          let value = parseInt(e.target.value.replace(/[^0-9:]/g, ''))
          if (isNaN(value)) value = 0
          else if (value > 99) value = Math.floor(value*0.1)
          else if (unit === 'hours' && value > 23) value = 23
          else if (unit !== 'hours' && value > 59) value = 59

          if (unit === 'hours') setHours(value)
          else if (unit === 'minutes') setMinutes(value)
          else setSeconds(value)
        }}
        size="5xl"
      />
      <Text className='timer-input-unit' size="5xl">{unit}</Text>
    </Box>
  ))

  const timerDisplay = units.map((unit) => (
    <Box id={`timer-display-${unit}`} direction='row' key={unit} onClick={
      () => setIsPaused(true)
    }>
      <Text
        color='purple'
        className='timer timer-display'
        size="5xl"
      >
        {unit === 'hours' ? hours : unit === 'minutes' ? minutes : seconds}
      </Text>
      <Text className='timer-input-unit' size="5xl">{unit}</Text>
    </Box>
  ))

	return (
		<div>
			<Heading>Timer</Heading>
      {isPaused ? timerInput : timerDisplay}
      <Button primary pad="medium" onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Start' : 'Stop'}
      </Button>
      {isPaused && timerAdd}
		</div>
	)
}
