import React, { useContext } from 'react'
import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { CycleContext } from '../../context/CyclesContext'



export function Countdown() {
    const {activeCycle, markCycleAsFinished, activeCycleId, amountSecondsPassed, setSecondsPassed} = useContext(CycleContext)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
      const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCycleAsFinished])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}