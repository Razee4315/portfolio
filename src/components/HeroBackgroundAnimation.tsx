import StarfieldBackground from './StarfieldBackground';

/**
 * This component is a wrapper around StarfieldBackground for backward compatibility.
 * We've migrated from Three.js to a custom Canvas implementation for better performance.
 */
const HeroBackgroundAnimation = () => {
  // Simply return the new StarfieldBackground component
  return <StarfieldBackground />;
};

export default HeroBackgroundAnimation;
