import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const StyledSection = styled('section')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #1A237E 0%, #7B1FA2 100%)',
  padding: '80px 0',
  position: 'relative',
  overflow: 'hidden',
});

const ContentWrapper = styled(Container)({
  position: 'relative',
  zIndex: 1,
  color: '#fff',
  textAlign: 'center',
});

const ProfileImage = styled('img')({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  border: '4px solid #fff',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  marginBottom: '2rem',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledTypography = styled(Typography)({
  opacity: 0,
  transform: 'translateY(20px)',
});

const HeroSection = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
      })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        '-=0.5'
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        '-=0.5'
      );
  }, []);

  return (
    <StyledSection id="hero">
      <ContentWrapper maxWidth="lg">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileImage
            src="/profile.jpg"
            alt="Saqlain Abbas"
          />
        </motion.div>

        <StyledTypography
          ref={nameRef}
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
            letterSpacing: '0.1em',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Saqlain Abbas
        </StyledTypography>

        <StyledTypography
          ref={titleRef}
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            fontWeight: 500,
            mb: 3,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          AI Engineer & Machine Learning Expert
        </StyledTypography>

        <StyledTypography
          ref={descriptionRef}
          variant="h6"
          sx={{
            maxWidth: '800px',
            margin: '0 auto',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
          }}
        >
          Transforming ideas into intelligent solutions through AI innovation
        </StyledTypography>
      </ContentWrapper>
    </StyledSection>
  );
};

export default HeroSection;
