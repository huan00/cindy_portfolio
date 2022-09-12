import React from 'react'
import './styles.css'
import styled, { keyframes } from 'styled-components'

const ProjectBlock = ({
  moveX,
  moveY,
  projectWH,
  projectWW,
  positionW,
  positionH
}) => {
  return (
    <StyledDiv
      positionH={positionH}
      positionW={positionW}
      projectWW={projectWW}
      projectWH={projectWH}
      moveX={moveX}
      moveY={moveY}
    >
      <div>
        <h4>Project Name:</h4>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
          ratione quibusdam?
        </p>
      </div>
    </StyledDiv>
  )
}

export default ProjectBlock

const movement = (moveX, moveY) => keyframes`
  to{
    left: ${moveX}px;
    top: ${moveY}px
  }
`

// const movement = keyframes`
//   to {
//     left: 50px;
//     top: 100px;
//   }
// `

const StyledDiv = styled.div`
  width: ${(props) => props.projectWW}px;
  height: ${(props) => props.projectWH}px;
  border: 1px solid black;
  position: absolute;
  left: ${(props) => props.positionW}px;
  top: ${(props) => props.positionH}px;
  animation: ${(props) => movement(props.moveX, props.moveY)} 0.5s linear
    forwards 1s;
`
