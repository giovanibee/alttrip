'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import './styles.scss'
import { Box, Heading, Menu, Text } from 'grommet'
import { Button, Input, Select } from 'components'
import { PlusCircle } from 'app/public/plusCircle'
import { MinusCircle } from 'app/public/minusCircle'
// import path from 'app/public/falling-path.svg'
import { path as fallingPathSVG } from 'app/public/fallingPath'
import anime from 'animejs'

type AnimationType = 'SAND' | 'WATER'
const STANDARD_UNITS = ['hours', 'minutes', 'seconds']

// TODO
// 1. VERTICAL COLUMN
// 2. WATER ANIMATION
// 3. NUMBER OF PARTICLES BASED ON PERCENTAGE OF TIMER COMPLETED
// 4. SOUND WHEN TIMER ENDS

export default function Page() {
  const [isPaused, setIsPaused] = useState(false)
  // cache these values in local storage
  const [totalSeconds, setTotalSeconds] = useState(0)
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

      // TODO play sound when timer ends
      const currentTotalSeconds = hours*3600 + minutes*60 + seconds
      const amountComplete = totalSeconds - currentTotalSeconds
      if (amountComplete < 1) return

      const x = Math.floor(amountComplete / 5)
      const y = amountComplete % 5
      const targets = document.querySelectorAll('.dot')
      anime({
        targets,
        // translateX: window.innerWidth - x,
        translateY: window.innerHeight + y,
        delay: anime.stagger(100)
      })
      targets.forEach((target) => {
        const { x: _, y } = target.getBoundingClientRect()
        if (y > 480) {
          target.classList.add('fallen')
          target.classList.remove('dot')
        }
      })
      anime({
        targets,
        // translateX: window.innerWidth - x,
        translateY: -window.innerHeight + y,
        delay: anime.stagger(100)
      })

      targets.forEach((target) => {
        target.classList.add('fallen')
        target.classList.remove('dot')
      })
      const fallenParticles = document.querySelectorAll('.fallen')
      anime({
        targets: fallenParticles,
        translateY: 480,
        delay: anime.stagger(100)
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [hours, minutes, seconds, units, isPaused, totalSeconds])

  const backgroundAnimation = useMemo(() => {
    const currentTotalSeconds = hours*3600 + minutes*60 + seconds
    const amountComplete = totalSeconds - currentTotalSeconds

    const percentageComplete = amountComplete / totalSeconds
    console.log('percentageComplete', percentageComplete)
    const amountOfParticles = Math.floor(percentageComplete * 100) + 1
    console.log('amountOfParticles', amountOfParticles)
    if (isNaN(amountOfParticles) || amountOfParticles < 1) return null
    const numberOfRows = 100 // TODO: update to something more flexible later

    return(
      <div id='animation-container'>
        {[...Array(amountOfParticles)].map((_, i) => {
          const x = Math.floor(i / numberOfRows) + 1
          return (
            <div
              className='dot'
              id={`dot-${x}-${i}`}
              key={i}
            />
          )
        })}
      </div>
    )
  }, [hours, minutes, seconds, totalSeconds])

  const timerAdd = STANDARD_UNITS.map((unit) => {
    if (units.includes(unit)) return null
    return (
      <Text key={unit} onClick={() => setUnits([...units, unit])}>
        <PlusCircle /> {unit}
      </Text>
    )
  })

  const updateHours = useCallback((value: number) => {
    if (value > 23) value = 23
    setHours(value)
    setTotalSeconds(value*3600 + minutes*60 + seconds)
  }, [minutes, seconds])

  const updateMinutes = useCallback((value: number) => {
    if (value > 59) value = 59
    setMinutes(value)
    setTotalSeconds(hours*3600 + value*60 + seconds)
  }, [hours, seconds])

  const updateSeconds = useCallback((value: number) => {
    if (value > 59) value = 59
    setSeconds(value)
    setTotalSeconds(hours*3600 + minutes*60 + value)
  }, [hours, minutes])

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
            if (unit === 'hours') updateHours(value)
            else if (unit === 'minutes') updateMinutes(value)
            else updateSeconds(value)
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
      {backgroundAnimation}
		</div>
	)
}
