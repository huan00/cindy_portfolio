import { useState, useEffect, useContext } from 'react'
import ProjectBlock from '../ProjectBlock/ProjectBlock'
import styled from 'styled-components'
import './styles.css'

const Home = () => {
  const [projects, setProjects] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ])
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleWindowSize = (e) => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleWindowSize)

    return () => {
      window.removeEventListener('resize', handleWindowSize)
    }
  }, [])

  const projectDim = () => {
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
      let project = projectDim()

      while (collisionCheck(project, properties)) {
        project = projectDim()
      }
      properties = [...properties, project]
    }
    return properties
  }

  const [projectDimensions, setProjectDimensions] = useState(
    projectProperties()
  )

  const render = () => {
    return projects.map((project, idx) => (
      <ProjectBlock {...projectDimensions[idx]} key={idx} />
    ))
  }

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    )
      render()
  }

  return (
    <div
      className="home-container"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {render()}
    </div>
  )
}

export default Home
