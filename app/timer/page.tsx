'use client'

import { useEffect, useState } from 'react'
import './styles.scss'
import { Box, Heading, Menu, Text } from 'grommet'
import { Button, Input, Select } from 'components'
import { PlusCircle } from 'app/public/plusCircle'
import { MinusCircle } from 'app/public/minusCircle'
import anime from 'animejs'

type AnimationType = 'SAND' | 'WATER'
const STANDARD_UNITS = ['hours', 'minutes', 'seconds']

export default function Page() {
  const [isPaused, setIsPaused] = useState(false)
  // cache these values in local storage
  const [totalOriginalSeconds, setTotalOrginalSeconds] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [units, setUnits] = useState(STANDARD_UNITS)
  const [animation, setAnimation] = useState<AnimationType>('SAND')

  useEffect(() => {
    let hasEnded = !hours && !minutes && !seconds
    if (!hasEnded) {
      hasEnded = units.every((unit) => {
        if (unit === 'hours') hasEnded = hasEnded && hours === 0
        else if (unit === 'minutes') hasEnded = hasEnded && minutes === 0
        else hasEnded = hasEnded && seconds === 0
      })
    }
    if (isPaused || hasEnded) return
    const timer = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1)
      else if (minutes > 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else if (hours > 0) {
        setHours(hours - 1)
        setMinutes(59)
        setSeconds(59)
      }

      anime({
        targets: '.dot',
        translateX: -(1+seconds),
        rotate: '1turn',
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [hours, minutes, seconds, units, isPaused])

  const timerAdd = STANDARD_UNITS.map((unit) => {
    if (units.includes(unit)) return null
    return (
      <Text key={unit} onClick={() => setUnits([...units, unit])}>
        <PlusCircle /> {unit}
      </Text>
    )
  })

  const timerInput = units.map((unit) => (
    <Box align="left" direction='row-responsive' gap="small" key={unit}>
      <div className='timer timer-input'>
        <Input
          color='purple'
          dropProps={{}}
          focusIndicator={false}
          id={`timer-input-${unit}`}
          key={unit}
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
          plain
          size="5xl"
          value={unit === 'hours' ? hours : unit === 'minutes' ? minutes : seconds}
        />
      </div>
      <Text className='timer-input-unit' size="5xl">{unit}</Text>
      <Text className='minus-circle' onClick={() => setUnits(units.filter((unitInList) => unitInList !== unit))}>
        <MinusCircle />
      </Text>
    </Box>
  ))

  const timerDisplay = units.map((unit) => (
    <Box
      direction='row'
      id={`timer-display-${unit}`}
      key={unit} onClick={() => setIsPaused(true)}
    >
      <Text
        className='timer timer-display'
        color='purple'
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
      <Select
        id='timer-animation-select'
        onChange={(e: { target: { value: any } }) => setAnimation(e.target.value)}
        options={['SAND', 'WATER']}
        value={animation}
      />
      <br /><br />
      {isPaused ? timerInput : timerDisplay}
      <br />
      <Button primary pad="medium" onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Start' : 'Stop'}
      </Button>
      {isPaused && timerAdd}
      <div className='dot' />
		</div>
	)
}
