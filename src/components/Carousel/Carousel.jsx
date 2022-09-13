import { useState, useRef, useEffect } from 'react'
import ProjectBlock from '../ProjectBlock/ProjectBlock'
import styled from 'styled-components'

const Carousel = ({ count, children, projects, projectDimensions }) => {
  const [visibleSlide, setVisibleSlide] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const target = useRef()

  const scrollListener = () => {
    if (!target.current) {
      return
    }

    const element = target.current
    const windowScroll = element.scrollLeft
    const totalWidth = element.scrollWidth - element.clientWidth
    if (windowScroll === 0) {
      return setScrollProgress(0)
    }
    if (windowScroll > totalWidth) {
      return setScrollProgress(100)
    }
    setScrollProgress((windowScroll / totalWidth) * 100)
  }

  useEffect(() => {
    target.current.addEventListener('touchmove', scrollListener)
    return () =>
      target.current &&
      target.current.removeEventListener('touchmove', scrollListener)
  })
  return (
    <CarouselContainer ref={target}>
      <div>
        {projects.map((project, idx) => (
          <ProjectBlock {...projectDimensions[idx]} key={idx} />
        ))}
      </div>
      <div>
        {projects.map((project, idx) => (
          <ProjectBlock {...projectDimensions[idx]} key={idx} />
        ))}
      </div>
      <div>
        {projects.map((project, idx) => (
          <ProjectBlock {...projectDimensions[idx]} key={idx} />
        ))}
      </div>
    </CarouselContainer>
  )
}

export default Carousel

const CarouselContainer = styled.div`
  display: flex;
  flext-direction: row;
  width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`
