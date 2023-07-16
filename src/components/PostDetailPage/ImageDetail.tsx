import React, { useState, useRef } from "react";
import styled from "styled-components";

interface ImageDetailProps {
  images: string[];
}

interface ImageSliderProps {
  numSlides: number;
  activeSlide: number;
}

const ImageDetailContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ImageSlider = styled.div<ImageSliderProps>`
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

const ImageSlide = styled.div`
  flex: 0 0 100%;
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IndexIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
`;

function ImageDetail({ images = [] }: ImageDetailProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const numSlides = images.length;

  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    startPos.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    if (e.clientX - startPos.current > 50) {
      setActiveSlide((prevSlide) =>
        prevSlide > 0 ? prevSlide - 1 : prevSlide
      );
      setIsDragging(false);
    } else if (startPos.current - e.clientX > 50) {
      setActiveSlide((prevSlide) =>
        prevSlide < numSlides - 1 ? prevSlide + 1 : prevSlide
      );
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ImageDetailContainer>
      <ImageSlider
        numSlides={numSlides}
        activeSlide={activeSlide}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translateX(-${activeSlide * 100}%)`,
        }}
      >
        {images.map((imageUrl, index) => (
          <ImageSlide key={index}>
            <Image src={imageUrl} alt={`Slide ${index + 1}`} />
          </ImageSlide>
        ))}
      </ImageSlider>
      <IndexIndicator>
        {activeSlide + 1} / {numSlides}
      </IndexIndicator>
    </ImageDetailContainer>
  );
}

export default ImageDetail;
