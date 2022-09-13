import { useState, useEffect, useMemo, useRef } from 'react'
import ProjectBlock from '../ProjectBlock/ProjectBlock'
import styled from 'styled-components'

const Home = () => {
  const [projects, setProjects] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ])
  // const [pages, setPages] = useState(1)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [scrollHeight, setScrollHeight] = useState('')
  const [display, setDisplay] = useState('block')
  const target = useRef()
  const element = target.current

  useEffect(() => {
    const handleWindowSize = (e) => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleWindowSize)
    return () => {
      window.removeEventListener('resize', handleWindowSize)
    }
  }, [width])

  useEffect(() => {
    const getScrollHeight = () => {
      return element?.scrollHeight
    }
    setScrollHeight(getScrollHeight())
  }, [])

  const projectDim = (width, height) => {
    const projectWindowWidth = Math.random() * (500 - 100) + 100
    const projectWindowHeight = Math.random() * (500 - 100) + 100
    const startPosWidth = Math.random() * (width / 2 - width / 4) + width / 4
    const startPosHeight =
      Math.random() * (height / 2 - 100 - height / 4) + height / 4
    const moveX = Math.random() * (width - projectWindowWidth)
    const moveY = Math.random()
    // * (height - projectWindowHeight / 3)

    const projectDimDetail = {
      projectWW: projectWindowWidth,
      projectWH: projectWindowHeight,
      positionH: startPosHeight,
      positionW: startPosWidth,
      moveX: moveX,
      moveY: moveY
    }
    return projectDimDetail
  }

  const collisionCheck = (currentProject, projectDimensions) => {
    for (let i = 0; i < projectDimensions.length; i++) {
      if (
        currentProject.moveX <
          projectDimensions[i].moveX + projectDimensions[i].projectWW &&
        currentProject.moveX + currentProject.projectWW >
          projectDimensions[i].moveX &&
        currentProject.moveY <
          projectDimensions[i].moveY + projectDimensions[i].projectWH &&
        currentProject.projectWH + currentProject.moveY >
          projectDimensions[i].moveY
      ) {
        return true
      }
    }
    return false
  }

  const projectProperties = () => {
    let properties = []
    for (let i = 0; i < projects.length; i++) {
      let project = projectDim(width, height)

      while (collisionCheck(project, properties)) {
        if (project.moveX + project.projectWW < width - 20) {
          if (i % 2 === 0) {
            project.moveY += 10
            project.moveX += 5
          } else {
            project.moveY += 10
            project.moveX -= project.moveX < 5 ? 0 : 5
          }
        } else {
          project.moveY += 10
        }
      }
      properties = [...properties, project]
    }
    return properties
  }

  const [projectDimensions, setProjectDimensions] = useState(
    projectProperties()
  )

  //   const bottom =
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
  const handleScroll = (e) => {
    if (!scrollHeight) {
      setScrollHeight(e.target.scrollHeight)
    }
    if (e.target.scrollTop > e.target.scrollHeight * 0.5) {
      e.target.scrollTop = 0
    }
    console.log(e.target.scrollTop + ' ' + e.target.clientHeight)
  }
  return (
    <HomeDiv
      width={width}
      height={height - 50}
      onScroll={handleScroll}
      ref={target}
    >
      <div
        style={{
          display: display,
          position: 'absolute',
          top: 0
        }}
      >
        {projects.map((project, idx) => (
          <ProjectBlock {...projectDimensions[idx]} key={idx} />
        ))}
      </div>
      <br />
      <div style={{ position: 'absolute', top: `${scrollHeight}px` }}>
        {projects.map((project, idx) => (
          <ProjectBlock {...projectDimensions[idx]} key={idx} />
        ))}
      </div>
    </HomeDiv>
  )
}

export default Home

const HomeDiv = styled.div`
  display: flex;
  flexdirection: column;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`
