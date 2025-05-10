import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StarfieldBackground from './StarfieldBackground';

const StyledSection = styled('section')`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%);
  padding: 80px 0;
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const ContentWrapper = styled('div')`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #000;
  position: relative;
  zIndex: 2; /* Ensure content is above the starfield */
  width: 100%;
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const ProfileImage = styled('img')`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  margin-bottom: 2rem;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border: 4px solid white;
  transition: transform 0.3s ease;
  position: relative;
  zIndex: 3; /* Higher z-index to ensure it's above everything else */
  
  &:hover {
    transform: scale(1.02);
  }
  
  /* Responsive adjustments for tablets */
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
    margin-bottom: 1.5rem;
  }
  
  /* Responsive adjustments for mobile phones */
  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
    border-width: 3px;
  }
`;

const HeroText = styled('div')`
  text-align: center;
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    
    @media (max-width: 768px) {
      font-size: 3rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
    }
  }
  
  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #e0e0e0;
    margin-bottom: 2rem;
    line-height: 1.4;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }
  
  p {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    line-height: 1.6;
    color: #bdbdbd;
    max-width: 800px;
    margin: 0 auto 1.5rem auto;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      line-height: 1.5;
      max-width: 100%;
      padding: 0 10px;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
      line-height: 1.4;
      margin-bottom: 1rem;
    }
  }
`;

const DownloadButton = styled('a')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  background-color: #4ca1af;
  color: #ffffff;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: all 0.6s ease;
    z-index: -1;
  }
  
  &:hover {
    background-color: #2c3e50;
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  }
  
  &:hover:before {
    transform: translateX(100%);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  /* Responsive adjustments for tablets */
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 10px 25px;
    font-size: 1rem;
  }
  
  /* Responsive adjustments for mobile phones */
  @media (max-width: 480px) {
    margin-top: 1rem;
    padding: 8px 20px;
    font-size: 0.9rem;
  }
`;

const HeroSection = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const elements = [nameRef.current, titleRef.current, descriptionRef.current];
    elements.forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
          element.style.transition = 'all 0.5s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  }, []);

  return (
    <StyledSection id="home">
      <StarfieldBackground />
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileImage
            src="./profile.jpg"
            alt="Saqlain Abbas"
          />
        </motion.div>

        <HeroText>
          <h1 ref={nameRef}>Saqlain Abbas</h1>
          <h2 ref={titleRef}>AI & Machine Learning Student</h2>
          <p ref={descriptionRef}>Passionate about learning and exploring the world of artificial intelligence and machine learning</p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <DownloadButton
              href="SaqlainAbbas_CV.pdf"
              download="SaqlainAbbas_CV.pdf"
            >
              <FileDownloadIcon style={{ marginRight: '10px', fontSize: '1.3rem' }} />
              Download CV
            </DownloadButton>
          </motion.div>
        </HeroText>
      </ContentWrapper>
    </StyledSection>
  );
};

export default HeroSection;
