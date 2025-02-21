import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const StyledSection = styled('section')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  padding: '80px 0',
});

const ContentWrapper = styled('div')({
  textAlign: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  color: '#000',
});

const ProfileImage = styled('img')({
  width: '350px',
  height: '350px',
  borderRadius: '50%',
  marginBottom: '2rem',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  border: '4px solid white',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const HeroText = styled('div')`
  text-align: center;
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1A237E;
  }
  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #424242;
    margin-bottom: 2rem;
    line-height: 1.4;
  }
  p {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    line-height: 1.6;
    color: #616161;
    max-width: 800px;
    margin: 0 auto;
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
          <h2 ref={titleRef}>AI Engineer & Machine Learning Expert</h2>
          <p ref={descriptionRef}>Transforming ideas into intelligent solutions through AI innovation</p>
        </HeroText>
      </ContentWrapper>
    </StyledSection>
  );
};

export default HeroSection;
