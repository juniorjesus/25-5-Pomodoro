import { useState } from "react";
import Length from "./Length";
import styled from 'styled-components'
import { BiPause, BiPlay, BiReset } from "react-icons/bi";

const DivPrincipal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: white;
  background: #282623;
`

const DivPLength = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const DivTime = styled.div`
  border: solid;
  border-radius: 20px;
  width: 300px;
  margin: 0 0 20px 0;
  border-color: gray;
`

const ButtonPSR = styled.button`
  border: none;
  background: transparent;
  width: 40px;
  height: 40px;
`

const App = () => {

  const [dtime, setDTime] = useState(60 * 25)
  const [btime, setBTime] = useState(60 * 5)
  const [stime, setSTime] = useState(60 * 25)
  const [timeOn, setTimeOn] = useState(false)
  const [breakOn, setBreakOn] = useState(false)
  const [bAudio, setBAudio] = useState(new Audio('http://www.sonidosmp3gratis.com/sounds/alarma-good-morning-5-5.mp3'))

  const playBSound = () => {
    bAudio.currentTime = 0
    bAudio.play()
  }

  const formatTime = time => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    return (
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  const changeTime = (cant, type) => {
    if (type === 'break') {
      if (btime <= 60 && cant < 0) {
        return
      }
      setBTime(oper => oper + cant)
    } else {
      if (stime <= 60 && cant < 0) {
        return
      }
      setSTime(oper => oper + cant)
      if (!timeOn) {
        setDTime(stime + cant)
      }
    }
  }

  const controlTime = () => {
    let second = 1000
    let date = new Date().getTime()
    let nextDate = new Date().getTime() + second
    let onBVariable = breakOn

    if (!timeOn) {
      let interval = setInterval(() => {
        date = new Date().getTime()
        if (date > nextDate) {
          setDTime(oper => {
            if (oper <= 0 && !onBVariable) {
              playBSound()
              onBVariable = true
              setBreakOn(true)
              return btime
            } else if (oper <= 0 && onBVariable) {
              playBSound()
              onBVariable = false
              setBreakOn(false)
              return stime
            }
            return oper - 1
          })
          nextDate += second
        }
      }, 30)
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }

    if (timeOn) {
      clearInterval(localStorage.getItem('interval-id'))
    }

    setTimeOn(!timeOn)
  }

  const resetTime = () => {
    setDTime(25 * 60)
    setBTime(5 * 60)
    setSTime(25 * 60)
  }

  return (
    <DivPrincipal>
      <h1 style={{fontSize: '60px'}}>25 + 5 Clock</h1>
      <DivPLength>
        <div id="break-label">
          <Length
            lengthId='break-length'
            increId='break-increment'
            decreId='break-decrement'
            tittle={'break length'}
            changeTime={changeTime}
            type={'break'}
            time={btime}
            formatTime={formatTime}
          />
        </div>
        <div id="session-label">
          <Length
            lengthId='session-length'
            increId='session-increment'
            decreId='session-decrement'
            tittle={'session length'}
            changeTime={changeTime}
            type={'session'}
            time={stime}
            formatTime={formatTime}
          />
        </div>
      </DivPLength>
      <DivTime>
        <h3 id="timer-label">{breakOn ? 'Break' : 'Session'}</h3>
        <h1 id="time-left">{formatTime(dtime)}</h1>
      </DivTime>
      <div>
        <ButtonPSR id="start_stop" onClick={controlTime}>
          {
            timeOn
              ?
              <BiPause style={{width: '30px', height: '30px', color: 'white'}} />
              :
              <BiPlay style={{width: '30px', height: '30px', color: 'white'}} />
          }
        </ButtonPSR>
        <ButtonPSR id="reset" onClick={resetTime}>
          <BiReset style={{width: '30px', height: '30px', color: 'white'}} />
        </ButtonPSR>
      </div>
    </DivPrincipal>
  );
}

export default App;
