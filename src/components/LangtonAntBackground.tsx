import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

// Canvas container for the Langton's Ant animation
const AntContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; // Makes sure it doesn't interfere with clicks
  z-index: 0; // Set to 0 to ensure it stays behind everything
`;

// Canvas element for drawing the Langton's Ant
const AntCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background-color: rgba(20, 30, 48, 0.15); /* Slightly visible dark blue background */
`;

// Function to determine if we're on a mobile device
const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

// Colors for the grid cells
const getColor = (state: number): string => {
  // Define a palette of colors that complement the background gradient
  const colors = [
    'rgba(22, 34, 52, 0.1)',     // Dark blue with low opacity for background
    'rgba(76, 161, 175, 0.65)',  // Teal (brand color)
    'rgba(230, 244, 255, 0.55)', // Light blue
    'rgba(41, 128, 185, 0.5)',   // Medium blue
    'rgba(142, 68, 173, 0.45)',  // Purple accent
    'rgba(39, 174, 96, 0.4)',    // Green accent
  ];
  
  return colors[state % colors.length];
};

// For ant visualization
const getAntColor = (): string => {
  // Random bright colors for ants to make them stand out
  const colors = [
    'rgba(255, 255, 255, 0.9)',  // White
    'rgba(255, 223, 0, 0.9)',    // Gold
    'rgba(255, 105, 180, 0.9)',  // Hot Pink
    'rgba(0, 255, 255, 0.9)',    // Cyan
    'rgba(127, 255, 0, 0.9)',    // Chartreuse
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

// Define directions: 0 = Up, 1 = Right, 2 = Down, 3 = Left
const directions = [
  { x: 0, y: -1 }, // Up
  { x: 1, y: 0 },  // Right
  { x: 0, y: 1 },  // Down
  { x: -1, y: 0 }  // Left
];

interface Ant {
  x: number;
  y: number;
  direction: number;
  color: string;
}

const LangtonAntBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>(0);
  const gridRef = useRef<Map<string, number>>(new Map());
  const antsRef = useRef<Ant[]>([]);
  
  // States and rule for Langton's Ant
  // For each state, if the cell is in that state, turn right (1) or left (-1) then advance
  // Extended rule sets for more complex patterns
const ruleSets = [
  "RL",       // Classic Langton's Ant
  "RLR",      // Triangle filler
  "LLRR",     // Symmetric growth
  "RRLLLRLLLRRR", // Complex pattern
  "LRRRRRLLR" // Chaotic growth
];

// Choose a random rule set each time
const rules = ruleSets[Math.floor(Math.random() * ruleSets.length)];
  
  // Initialize the canvas and ant
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      if (!canvas || !container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Reset and redraw on resize
      initializeGrid();
    };
    
    // Initialize grid and ants
    const initializeGrid = () => {
      if (!canvas) return;
      
      gridRef.current.clear();
      antsRef.current = [];
      
      // Create multiple ants for more interesting patterns
      const antCount = isMobileDevice() ? 5 : 10; // More starting points as requested
      
      // Create a function to get a completely random position
      const getRandomPosition = () => {
        const cellSize = getCellSize();
        const gridWidth = Math.floor(canvas.width / cellSize);
        const gridHeight = Math.floor(canvas.height / cellSize);
        
        return {
          x: Math.floor(Math.random() * gridWidth),
          y: Math.floor(Math.random() * gridHeight)
        };
      };
      
      // Create unique starting positions for ants
      const positions = new Set();
      
      for (let i = 0; i < antCount; i++) {
        // Get random position for this ant
        let pos;
        do {
          pos = getRandomPosition();
        } while (positions.has(`${pos.x},${pos.y}`)); // Ensure unique positions
        
        positions.add(`${pos.x},${pos.y}`);
        
        antsRef.current.push({
          x: pos.x,
          y: pos.y,
          direction: Math.floor(Math.random() * 4), // Random initial direction
          color: getAntColor()
        });
      }
    };
    
    // Cell size (larger and more visible)
    const getCellSize = () => {
      return isMobileDevice() ? 12 : 18;
    };
    
    // Framerate and step control - dramatically reduced for better performance
    let lastFrameTime = 0;
    const frameLimit = 1000 / 20; // Further reduced to 20fps for better performance
    let stepsPerFrame = isMobileDevice() ? 1 : 2; // Minimum steps per frame for slower motion
    
    // Animation function
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Limit frame rate for better performance
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameLimit) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cellSize = getCellSize();
      
      // Update ants multiple times per frame
      for (let step = 0; step < stepsPerFrame; step++) {
        antsRef.current.forEach(ant => {
          // Get the current cell's state
          const cellKey = `${ant.x},${ant.y}`;
          const currentState = gridRef.current.get(cellKey) || 0;
          
          // Update the cell state (cycle through states)
          const newState = (currentState + 1) % rules.length;
          gridRef.current.set(cellKey, newState);
          
          // Turn based on the rule
          const turn = rules[currentState] === 'R' ? 1 : -1;
          ant.direction = (ant.direction + turn + 4) % 4;
          
          // Move forward
          ant.x += directions[ant.direction].x;
          ant.y += directions[ant.direction].y;
          
          // Wrap around the edges
          if (ant.x < 0) ant.x = Math.floor(canvas.width / cellSize) - 1;
          if (ant.y < 0) ant.y = Math.floor(canvas.height / cellSize) - 1;
          if (ant.x >= Math.floor(canvas.width / cellSize)) ant.x = 0;
          if (ant.y >= Math.floor(canvas.height / cellSize)) ant.y = 0;
        });
      }
      
      // Draw all cells in the grid without borders
      gridRef.current.forEach((state, key) => {
        const [x, y] = key.split(',').map(Number);
        const cellX = x * cellSize;
        const cellY = y * cellSize;
        
        // Fill the cell without borders
        ctx.fillStyle = getColor(state);
        ctx.fillRect(cellX, cellY, cellSize, cellSize);
      });
      
      // Draw the ants with a slight glow
      antsRef.current.forEach(ant => {
        const centerX = ant.x * cellSize + cellSize/2;
        const centerY = ant.y * cellSize + cellSize/2;
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        
        // Draw ant as a larger, more visible circle
        ctx.beginPath();
        ctx.fillStyle = ant.color;
        ctx.arc(
          centerX, 
          centerY, 
          cellSize * 0.5, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Draw direction indicator
        ctx.beginPath();
        const dirX = centerX + Math.cos(ant.direction * Math.PI / 2) * (cellSize * 0.3);
        const dirY = centerY + Math.sin(ant.direction * Math.PI / 2) * (cellSize * 0.3);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(dirX, dirY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initializeGrid();
    animate(performance.now());
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <AntContainer ref={containerRef}>
      <AntCanvas ref={canvasRef} />
    </AntContainer>
  );
};

export default LangtonAntBackground;
