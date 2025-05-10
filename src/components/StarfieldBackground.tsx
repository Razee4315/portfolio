import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
// We don't need keyframes anymore since we're using canvas animation
// import { keyframes } from '@emotion/react';

// Canvas container for the neural network animation
const StarfieldContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; // Makes sure it doesn't interfere with clicks
  z-index: 0; // Set to 0 to ensure it stays behind everything including the profile image
`;

// Canvas element for drawing the neural network
const NetworkCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

// We're now using canvas for all rendering, so we don't need this styled component

// Get a random position within the canvas dimensions
const getRandomPosition = (dimension: number) => {
  return Math.random() * dimension;
};

// Function to determine if we're on a mobile device
const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

// Generate a random size between min and max
const getRandomSize = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

// Adjust size based on device for better mobile performance
const getDeviceAdjustedSize = (size: number) => {
  // Reduce size on mobile devices
  if (isMobileDevice()) {
    return size * 0.8;
  }
  return size;
};

// Calculate distance between two points
const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Generate a random color in the blue-teal palette
const getRandomColor = () => {
  // Generate colors in the blue-teal range for visual consistency
  const r = Math.floor(Math.random() * 50); // Low red for blue-teal colors
  const g = Math.floor(Math.random() * 100 + 120); // Medium-high green 
  const b = Math.floor(Math.random() * 80 + 175); // High blue
  return `rgba(${r}, ${g}, ${b}, 0.9)`;
};

// Define a node in the neural network
type Node = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  isMain: boolean;
  lastProcessed: number; // For throttling calculations
  color: string; // Custom color for the node
  pulseSpeed: number; // Speed of pulsing animation (for main nodes)
  fadeSpeed: number; // Speed of opacity changes
  maxSpeed: number; // Maximum speed this node can achieve
};

const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const maxDistanceRef = useRef<number>(120); // Max distance for drawing lines
  const mousePositionRef = useRef<{x: number, y: number} | null>(null); // Track mouse position
  const mouseInfluenceRadius = useRef<number>(150); // How far the mouse influence reaches
  const lastMouseMoveTime = useRef<number>(0); // For throttling mouse events
  const lastFrameTime = useRef<number>(0); // For limiting frame rate

  // Initialize the canvas and nodes
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Throttled mouse event handler - only process every 16ms (~ 60fps)
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveTime.current < 16) return; // Skip if too soon
      
      lastMouseMoveTime.current = now;
      // Get position relative to the canvas
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mousePositionRef.current = null;
    };
    
    // Only add mouse events to the hero section element that contains this component
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      // Recalculate max distance based on screen size
      maxDistanceRef.current = Math.min(canvas.width, canvas.height) / 5;
    };

    // Initial resize and event listener for window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create nodes with increased count and randomness
    const createNodes = () => {
      const nodes: Node[] = [];
      // Adjust node density based on device type
      // Use fewer nodes on mobile for better performance
      const isMobile = isMobileDevice();
      const densityFactor = isMobile ? 20000 : 12000;
      const maxNodes = isMobile ? 60 : 100;
      const numNodes = Math.min(Math.floor(canvas.width * canvas.height / densityFactor), maxNodes);
      
      // Distribute nodes more randomly across the entire screen
      // Greatly reduce clustering effect - make only 40% of nodes in clusters
      const useClusteringEffect = Math.random() < 0.5; // 50% chance to use any clustering at all
      const clusterCenters = [];
      
      // Generate random cluster centers if we're using clustering
      if (useClusteringEffect) {
        // Create smaller, more distributed clusters
        const numClusters = Math.floor(Math.random() * 5) + 3; // 3-7 clusters for more distribution
        
        for (let i = 0; i < numClusters; i++) {
          // Ensure clusters are spread out across the screen
          // Divide the screen into sections and place one cluster in each section
          const sectionWidth = canvas.width / Math.ceil(Math.sqrt(numClusters));
          const sectionHeight = canvas.height / Math.ceil(Math.sqrt(numClusters));
          
          const sectionX = i % Math.ceil(Math.sqrt(numClusters));
          const sectionY = Math.floor(i / Math.ceil(Math.sqrt(numClusters)));
          
          clusterCenters.push({
            x: sectionX * sectionWidth + Math.random() * sectionWidth,
            y: sectionY * sectionHeight + Math.random() * sectionHeight,
            radius: Math.random() * 150 + 100 // Smaller clusters between 100-250px
          });
        }
      }
      
      for (let i = 0; i < numNodes; i++) {
        // Determine if this node should be part of a cluster (only 40% chance now)
        const useCluster = useClusteringEffect && Math.random() < 0.4 && clusterCenters.length > 0;
        let x, y;
        
        if (useCluster) {
          // Choose a random cluster
          const cluster = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
          // Generate position within the cluster with less central concentration
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * cluster.radius; // Linear random for less concentration
          x = cluster.x + Math.cos(angle) * radius;
          y = cluster.y + Math.sin(angle) * radius;
          
          // Keep within bounds
          x = Math.max(0, Math.min(x, canvas.width));
          y = Math.max(0, Math.min(y, canvas.height));
        } else {
          // Random position anywhere on the screen - more likely now
          x = getRandomPosition(canvas.width);
          y = getRandomPosition(canvas.height);
        }
        
        // More varied node types (20% main nodes now)
        const isMain = Math.random() < 0.2;
        // Get size based on node type and adjust for device
        let nodeSize = isMain ? 
          getRandomSize(3, 7) : // More variance in main node sizes
          getRandomSize(1, 3.5); // More variance in regular node sizes

        // Apply device-specific adjustment
        nodeSize = getDeviceAdjustedSize(nodeSize);
        
        // Much more significant initial velocities for more movement
        const speedVariance = isMain ? 0.5 : 0.8; // Increased speed for all nodes
        const minSpeed = 0.15;
        
        // Calculate velocities with minimum speed enforced
        let vx = (Math.random() - 0.5) * speedVariance;
        let vy = (Math.random() - 0.5) * speedVariance;
        
        // Ensure every node has at least some minimum velocity
        if (Math.abs(vx) < minSpeed) {
          vx += (vx >= 0 ? 1 : -1) * minSpeed;
        }
        if (Math.abs(vy) < minSpeed) {
          vy += (vy >= 0 ? 1 : -1) * minSpeed;
        }
        
        // Now assign to constants that won't be modified
        const initialVx = vx;
        const initialVy = vy;
        
        // Generate custom color (main nodes have their own color, others are white with varying opacity)
        const nodeColor = isMain ? getRandomColor() : 'rgba(255, 255, 255, 0.8)';
        
        nodes.push({
          x,
          y,
          size: nodeSize,
          vx: initialVx,
          vy: initialVy,
          isMain,
          lastProcessed: 0,
          color: nodeColor,
          pulseSpeed: Math.random() * 3 + 2, // Between 2-5 seconds per pulse
          fadeSpeed: Math.random() * 2 + 1,  // Between 1-3 seconds per fade
          maxSpeed: isMain ? 0.8 : 1.2 // Increased maximum speed cap for more movement
        });
      }
      return nodes;
    };

    nodesRef.current = createNodes();

    // Animation function with frame limiting
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Limit to ~40fps for better performance
      const frameInterval = 25; // 1000ms / 40fps ≈ 25ms
      if (timestamp - lastFrameTime.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = timestamp;

      // Clear canvas - optimize by only clearing the used area
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const now = performance.now();
      
      // Performance optimization: process nodes with throttling
      // Draw connections between nodes - reduced frequency for better performance
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Pre-calculate connections to reduce render calls
      const connections: {fromX: number, fromY: number, toX: number, toY: number, color: string, width: number}[] = [];
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const throttleInterval = nodeA.isMain ? 10 : 25; // Process main nodes more frequently
        
        // Skip processing this node if it was processed too recently
        if (now - nodeA.lastProcessed < throttleInterval && !mousePositionRef.current) {
          continue;
        }
        
        nodeA.lastProcessed = now;
        
        // Apply mouse influence if mouse is in the hero section
        if (mousePositionRef.current) {
          const dx = mousePositionRef.current.x - nodeA.x;
          const dy = mousePositionRef.current.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // If node is within influence radius, move it toward or away from mouse
          if (distance < mouseInfluenceRadius.current) {
            // Calculate force - closer nodes are affected more strongly
            const force = (mouseInfluenceRadius.current - distance) / mouseInfluenceRadius.current;
            
            // Main nodes are attracted to mouse, regular nodes are gently repelled
            const direction = nodeA.isMain ? 1 : -0.5;
            
            // Apply force to velocity (with damping)
            nodeA.vx += (dx / distance) * force * 0.15 * direction; // Reduced force
            nodeA.vy += (dy / distance) * force * 0.15 * direction;
            
            // Reduced random movement for stability
            if (Math.random() < 0.3) { // Only add randomness 30% of the time
              nodeA.vx += (Math.random() - 0.5) * 0.05;
              nodeA.vy += (Math.random() - 0.5) * 0.05;
            }
          }
        }
        
        // Apply velocity with device-appropriate damping
        // More damping on mobile for better performance
        const isMobile = isMobileDevice();
        const dampingFactor = isMobile ? 0.95 : 0.97;
        nodeA.vx *= dampingFactor;
        nodeA.vy *= dampingFactor;
        
        // Apply random acceleration occasionally to keep nodes moving
        // Lower probability on mobile for better performance
        const randomAccelChance = isMobile ? 0.03 : 0.05; // 3% chance on mobile, 5% on desktop
        if (Math.random() < randomAccelChance) {
          const accelFactor = isMobile ? 0.08 : 0.1;
          nodeA.vx += (Math.random() - 0.5) * accelFactor;
          nodeA.vy += (Math.random() - 0.5) * accelFactor;
        }
        
        // Cap speed at maximum
        const currentSpeed = Math.sqrt(nodeA.vx * nodeA.vx + nodeA.vy * nodeA.vy);
        if (currentSpeed > nodeA.maxSpeed) {
          nodeA.vx = (nodeA.vx / currentSpeed) * nodeA.maxSpeed;
          nodeA.vy = (nodeA.vy / currentSpeed) * nodeA.maxSpeed;
        }
        
        // Update position
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;
        
        // Bounce off edges
        if (nodeA.x <= 0 || nodeA.x >= canvas.width) nodeA.vx *= -1;
        if (nodeA.y <= 0 || nodeA.y >= canvas.height) nodeA.vy *= -1;
        
        // Keep node in bounds
        nodeA.x = Math.max(0, Math.min(nodeA.x, canvas.width));
        nodeA.y = Math.max(0, Math.min(nodeA.y, canvas.height));
        
        // Limit connections to nearby nodes for performance
        // Only check half the nodes at each frame to improve performance
        for (let j = i + 1; j < nodes.length; j++) {
          // Skip every other connection check if not a main node for performance
          if (!nodeA.isMain && !nodes[j].isMain && j % 2 !== 0) continue;
          
          const nodeB = nodes[j];
          const distance = getDistance(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          
          if (distance < maxDistanceRef.current) {
            // Opacity based on distance
            const opacity = 1 - (distance / maxDistanceRef.current);
            
            // Store connection for batch rendering
            connections.push({
              fromX: nodeA.x,
              fromY: nodeA.y,
              toX: nodeB.x,
              toY: nodeB.y,
              color: nodeA.isMain || nodeB.isMain 
                ? `rgba(76, 161, 175, ${opacity * 0.5})` 
                : `rgba(255, 255, 255, ${opacity * 0.15})`,
              width: nodeA.isMain || nodeB.isMain ? 1 : 0.5
            });
          }
        }
      }
      
      // How many connections to draw - limit for performance
      // Significantly limit connections on mobile
      const isMobile = isMobileDevice();
      const maxConnections = isMobile ? 50 : 100;
      let numConnectionsDrawn = 0;
      
      // Batch render connections for better performance
      for (const conn of connections) {
        if (numConnectionsDrawn >= maxConnections) break;
        ctx.strokeStyle = conn.color;
        ctx.lineWidth = conn.width;
        ctx.beginPath();
        ctx.moveTo(conn.fromX, conn.fromY);
        ctx.lineTo(conn.toX, conn.toY);
        ctx.stroke();
        numConnectionsDrawn++;
      }
      
      // Reset shadow settings before batch node rendering
      ctx.shadowBlur = 0;
      
      // Sort nodes to render main nodes last (on top)
      const sortedNodes = [...nodes].sort((a, b) => a.isMain === b.isMain ? 0 : a.isMain ? 1 : -1);
      
      // Draw normal nodes first (without expensive shadows)
      for (const node of sortedNodes) {
        if (node.isMain) continue; // Skip main nodes for now
        
        // Add slight pulsing effect based on time
        // Reduce pulse effect on mobile devices for better performance
        const isMobile = isMobileDevice();
        const pulseAmount = isMobile ? 0.05 : 0.1;
        const pulseScale = 1 + Math.sin(now / 1000 * node.pulseSpeed) * pulseAmount;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2);
        // Use the node's custom color or the default white
        ctx.fillStyle = node.color || 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
      
      // Now draw main nodes with shadows (expensive operation, but only for a few nodes)
      for (const node of sortedNodes) {
        if (!node.isMain) continue; // Only process main nodes here
        
        // Add dynamic pulsing effect for main nodes
        // Reduce effects on mobile devices for better performance
        const isMobile = isMobileDevice();
        
        const pulseAmount = isMobile ? 0.1 : 0.2;
        const pulseScale = 1 + Math.sin(now / 1000 * node.pulseSpeed) * pulseAmount;
        
        const glowIntensity = Math.abs(Math.sin(now / 1000 * (node.pulseSpeed / 2)));
        
        // Add glow effect just for main nodes
        // Reduce shadow blur on mobile for better performance
        const shadowBlurBase = isMobile ? 5 : 10;
        const shadowBlurVariance = isMobile ? 4 : 8;
        ctx.shadowBlur = shadowBlurBase + glowIntensity * shadowBlurVariance;
        ctx.shadowColor = node.color.replace('0.9', `${0.5 + glowIntensity * 0.3}`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2);
        
        // Create gradient with custom colors
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * 2.5
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, node.color.replace('0.9', '0'));
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation with the current timestamp
    animate(performance.now());
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      
      // Remove mouse event listeners
      const heroSection = document.getElementById('home');
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <StarfieldContainer ref={containerRef}>
      <NetworkCanvas ref={canvasRef} />
    </StarfieldContainer>
  );
};

export default StarfieldBackground;
