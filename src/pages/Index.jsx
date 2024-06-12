import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [activeBrushSize, setActiveBrushSize] = useState(brushSizes[0]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    isDrawing.current = true;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.strokeStyle = activeColor;
    ctxRef.current.lineWidth = activeBrushSize;
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    isDrawing.current = false;
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <Flex
        position="absolute"
        bottom={0}
        width="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p={4}
        justifyContent="space-around"
        alignItems="center"
      >
        <VStack>
          {colors.map((color) => (
            <IconButton
              key={color}
              aria-label={color}
              icon={<FaCircle color={color} />}
              size="lg"
              isRound
              onClick={() => setActiveColor(color)}
              border={activeColor === color ? "2px solid black" : "none"}
            />
          ))}
        </VStack>
        <VStack>
          {brushSizes.map((size) => (
            <IconButton
              key={size}
              aria-label={`Brush size ${size}`}
              icon={<FaCircle size={`${size}px`} />}
              size="lg"
              isRound
              onClick={() => setActiveBrushSize(size)}
              border={activeBrushSize === size ? "2px solid black" : "none"}
            />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;