import React from 'react'
import styled from 'styled-components'
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

const H3Length = styled.h3`
  margin: 0;
`

const DivLengthTime = styled.div`
  display: grid;
  grid-template-columns: 50px 100px 50px;
  justify-content: center;
  align-items: center;
`

const ButtonLenght = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: gray;
`

const Length = ({ tittle, changeTime, type, time, formatTime, lengthId, increId, decreId }) => {
  return (
    <div>
      <H3Length>{tittle}</H3Length>
      <div>
        <DivLengthTime>
          <ButtonLenght id={decreId} onClick={() => changeTime(-60, type)}>
            <BiCaretDown style={{width: '30px', height: '30px'}} />
          </ButtonLenght>
          <h3 id={lengthId}>{formatTime(time)}</h3>
          <ButtonLenght id={increId} onClick={() => changeTime(60, type)}>
            <BiCaretUp style={{width: '30px', height: '30px'}} />
          </ButtonLenght>
        </DivLengthTime>
      </div>
    </div>
  )
}

export default Length
