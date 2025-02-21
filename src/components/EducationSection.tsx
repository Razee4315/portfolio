import { Box, Container, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
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
}));

const EducationSection = () => {
  const educationData = [
    {
      degree: "Bachelor of Science in Artificial Intelligence",
      institution: "National University of Technology (NUTECH)",
      duration: "2023 - 2027",
      description: "Specializing in Machine Learning, Deep Learning, and AI Systems Development. Active member of the university's AI research group."
    },
    {
      degree: "Associate Degree in Computer Science",
      institution: "Punjab Group of Colleges",
      duration: "2020 - 2022",
      description: "Focused on programming fundamentals, data structures, and software development principles."
    },
    {
      degree: "Matriculation in Computer Science",
      institution: "Punjab School Education Board",
      duration: "2018 - 2020",
      description: "Completed with distinction, with special focus on mathematics and computer studies."
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
            mb: 6,
            color: 'primary.main',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Education
        </Typography>

        <Timeline position="alternate">
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
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {item.degree}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.duration}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {item.institution}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {item.description}
                    </Typography>
                  </TimelineItemContent>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </StyledSection>
  );
};

export default EducationSection;
