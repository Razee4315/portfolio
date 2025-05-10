import { Box, Container, Typography, Card, CardContent, Grid, useMediaQuery, useTheme } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 1),
  },
}));

const TimelineItemContent = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  '&:hover': {
    transform: 'translateY(-5px)',
    transition: 'transform 0.3s ease',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const EducationSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const educationData = [
    {
      degree: "Bachelor of Science in Artificial Intelligence",
      institution: "National University of Technology (NUTECH) Islamabad, Pakistan",
      duration: "2023 - 2027",
      description: "Specializing in Machine Learning, Deep Learning, and AI Systems Development. Active member of the university's AI research group."
    },
    {
      degree: "HSSC Computer Science",
      institution: "Public School and College Skardu, Pakistan",
      duration: "2020 - 2022",
      description: "Studied computer science, programming, data structures, and networking along with mathematics and physics."
    },
    {
      degree: "Matriculation",
      institution: "Jinnah Public School and College Skardu, Pakistan",
      duration: "2018 - 2020",
      description: "Studied science subjects, including mathematics, physics, and computer science."
    }
  ];

  return (
    <StyledSection id="education">
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component={motion.h2}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            color: 'primary.main',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }
          }}
        >
          Education
        </Typography>

        {/* Desktop Timeline View */}
        {!isMobile && (
          <Timeline position="alternate" sx={{
            '& .MuiTimelineItem-root': {
              minHeight: { sm: '200px' }
            },
            '& .MuiTimelineConnector-root': {
              height: { sm: '60px', md: '70px' }
            },
            '& .MuiTimelineDot-root': {
              margin: { sm: '12px 0' }
            },
            padding: { sm: '6px 16px' }
          }}>
            {educationData.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <SchoolIcon />
                  </TimelineDot>
                  {index !== educationData.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <TimelineItemContent>
                      <Typography 
                        variant="h6" 
                        color="primary.main" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: { sm: '1.25rem', md: '1.3rem' },
                          lineHeight: 1.3
                        }}
                      >
                        {item.degree}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { sm: '0.95rem', md: '1rem' }
                        }}
                      >
                        {item.duration}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: { sm: 1 },
                          fontSize: { sm: '0.95rem', md: '1rem' },
                          fontWeight: 'medium'
                        }}
                      >
                        {item.institution}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mt: { sm: 1 },
                          fontSize: { sm: '0.9rem', md: '0.95rem' },
                          lineHeight: { sm: 1.5 }
                        }}
                      >
                        {item.description}
                      </Typography>
                    </TimelineItemContent>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}

        {/* Mobile Card-Based View */}
        {isMobile && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {educationData.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                  >
                    <Card 
                      sx={{ 
                        boxShadow: 3, 
                        borderRadius: 2,
                        border: '1px solid rgba(76, 161, 175, 0.2)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5, 
                            mb: 1.5,
                            pb: 1.5,
                            borderBottom: '1px solid rgba(0,0,0,0.08)'
                          }}
                        >
                          <Box 
                            sx={{ 
                              bgcolor: 'primary.main', 
                              borderRadius: '50%', 
                              display: 'flex',
                              p: 1,
                              color: 'white'
                            }}
                          >
                            <SchoolIcon fontSize="small" />
                          </Box>
                          <Typography 
                            variant="h6" 
                            fontWeight="bold"
                            color="primary.main"
                            sx={{ fontSize: '1.25rem', lineHeight: 1.2 }}
                          >
                            {item.degree}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarTodayIcon fontSize="small" color="action" />
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: '0.95rem' }}
                          >
                            {item.duration}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                          <LocationOnIcon fontSize="small" color="action" sx={{ mt: 0.3 }} />
                          <Typography 
                            variant="body1"
                            sx={{ fontSize: '0.95rem', fontWeight: 'medium' }}
                          >
                            {item.institution}
                          </Typography>
                        </Box>

                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: '0.9rem',
                            lineHeight: 1.5, 
                            mt: 1,
                            pl: 0.5
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </StyledSection>
  );
};

export default EducationSection;
