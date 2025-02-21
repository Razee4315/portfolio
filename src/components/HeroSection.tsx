import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Container, Grid } from '@mui/material';
import gsap from 'gsap';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1
  }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  border: '5px solid rgba(255, 255, 255, 0.3)',
  objectFit: 'cover',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '200px',
  },
}));

const AnimatedText = styled(Typography)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(20px)',
}));

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.to(imageRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2
    })
    .to(nameRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, '-=0.5')
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <HeroContainer ref={containerRef}>
      <ContentWrapper maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <AnimatedText ref={nameRef} variant="h1" component="h1" 
              sx={{ 
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                fontWeight: 700,
                mb: 2,
                letterSpacing: '0.02em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
              Saqlain Abbas
            </AnimatedText>
            <AnimatedText ref={titleRef} variant="h2" 
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 300,
                letterSpacing: '0.05em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
              Artificial Intelligence Engineer
            </AnimatedText>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <ProfileImage
              ref={imageRef}
              src="/profile.jpg"
              alt="Saqlain Abbas"
              sx={{ opacity: 0, transform: 'translateY(20px)' }}
            />
          </Grid>
        </Grid>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
