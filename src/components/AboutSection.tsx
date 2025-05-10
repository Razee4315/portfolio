import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 2),
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[10],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const AboutSection = () => {
  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 'inherit' }} />,
      title: "AI Enthusiast",
      description: "Transforming complex data into intelligent solutions. Passionate about pushing the boundaries of AI technology."
    },
    {
      icon: <CodeIcon sx={{ fontSize: 'inherit' }} />,
      title: "Problem Solver",
      description: "Turning challenges into opportunities through innovative coding and creative thinking."
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 'inherit' }} />,
      title: "Tech Explorer",
      description: "Always learning and exploring new technologies to build the future of AI applications."
    }
  ];

  return (
    <StyledSection id="about">
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component={motion.h2}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            mb: 6,
            color: 'primary.main',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }
          }}
        >
          About Me
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="h5" 
                textAlign="center" 
                maxWidth="800px" 
                mx="auto" 
                mb={{ xs: 4, sm: 6, md: 8 }}
                color="text.secondary"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.5 },
                  padding: { xs: '0 10px', sm: '0 15px', md: 0 }
                }}
              >
                From the mountains of Skardu to the frontiers of AI, I'm on a mission to create intelligent solutions that make a difference. Blending creativity with technical expertise to shape tomorrow's technology.
              </Typography>
            </motion.div>
          </Grid>
          
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <FeatureCard>
                  <IconWrapper>
                    {feature.icon}
                  </IconWrapper>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    fontWeight="bold" 
                    color="primary.main"
                    sx={{ 
                      fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1rem' },
                      lineHeight: { xs: 1.5, sm: 1.6 }
                    }}
                  >
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default AboutSection;
