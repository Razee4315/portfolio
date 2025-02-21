import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const projectsData = [
  {
    title: "AI-Powered Image Recognition",
    description: "Developed a deep learning model using TensorFlow for real-time object detection and classification with 95% accuracy.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
    github: "https://github.com/yourusername/project1",
    demo: "https://demo-link.com"
  },
  {
    title: "Natural Language Processing Bot",
    description: "Created an intelligent chatbot using NLP techniques for automated customer service, reducing response time by 60%.",
    technologies: ["Python", "NLTK", "SpaCy", "Machine Learning"],
    github: "https://github.com/yourusername/project2",
  },
  {
    title: "Smart Healthcare System",
    description: "Implemented an AI-driven system for early disease detection using patient data analysis and prediction models.",
    technologies: ["Python", "scikit-learn", "PyTorch", "Data Analysis"],
    github: "https://github.com/yourusername/project3",
    demo: "https://demo-link.com"
  },
  {
    title: "Automated Trading Algorithm",
    description: "Designed and implemented an ML-based trading algorithm with real-time market data analysis and automated decision-making.",
    technologies: ["Python", "TensorFlow", "Pandas", "API Integration"],
    github: "https://github.com/yourusername/project4",
  }
];

const ProjectsSection = () => {
  return (
    <StyledSection id="projects">
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
          Projects
        </Typography>

        <Grid container spacing={4}>
          {projectsData.map((project, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom color="primary.main" fontWeight="bold">
                      {project.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ mt: 2, mb: 1 }}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      startIcon={<GitHubIcon />}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </Button>
                    {project.demo && (
                      <Button
                        startIcon={<LaunchIcon />}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </Button>
                    )}
                  </CardActions>
                </ProjectCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default ProjectsSection;
