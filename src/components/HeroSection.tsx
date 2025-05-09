import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const StyledSection = styled('section')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
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
    color: #ffffff;
  }
  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #e0e0e0;
    margin-bottom: 2rem;
    line-height: 1.4;
  }
  p {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    line-height: 1.6;
    color: #bdbdbd;
    max-width: 800px;
    margin: 0 auto 1.5rem auto;
  }
`;

const DownloadButton = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '2rem',
  backgroundColor: '#4ca1af',
  color: '#ffffff',
  padding: '12px 30px',
  fontSize: '1.1rem',
  borderRadius: '30px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textDecoration: 'none',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '2px solid transparent',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)',
    transform: 'translateX(-100%)',
    transition: 'all 0.6s ease',
    zIndex: -1,
  },
  '&:hover': {
    backgroundColor: '#2c3e50',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 25px rgba(0,0,0,0.2)',
  },
  '&:hover:before': {
    transform: 'translateX(100%)',
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
});

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
