import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
}));

const ProjectCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

const ProjectActions = styled(CardActions)({
  marginTop: 'auto',
  padding: '16px',
  justifyContent: 'center',
});

const projects = [
  {
    title: "DisasterConnect",
    description: "A web platform for disaster response, featuring real-time communication and interactive mapping.",
    technologies: ["Python", "Django", "React", "WebSocket", "PostgreSQL"],
    github: "https://github.com/Razee4315/DisasterConnect"
  },
  {
    title: "BinarySearchTreeVisualization",
    description: "An educational tool providing real-time visualization of BST operations through interactive animations.",
    technologies: ["C++", "Qt6", "OpenGL", "CMake"],
    github: "https://github.com/Razee4315/BinarySearchTreeVisualization"
  },
  {
    title: "Panda Chat",
    description: "A modern real-time chat application with instant messaging, file sharing, and an intuitive user interface.",
    technologies: ["TypeScript", "React", "Firebase", "WebSocket", "Material-UI"],
    github: "https://github.com/Razee4315/panda_chat"
  },
  {
    title: "Nutech Chatbot Assistant",
    description: "Fine-tuned an LLM on university data to create a custom chatbot, deployed with Gradio for interactive use.",
    technologies: ["Python", "LLM Fine-tuning", "Gradio"],
    github: "#"
  },
  {
    title: "NUTECH Virtual Tour",
    description: "An interactive campus tour using React and 360° media, focusing on optimized user experience.",
    technologies: ["React", "JavaScript", "360° Media"],
    github: "https://razee4315.github.io/nutech-tour"
  },
  {
    title: "Pitch and Yaw Coordinate Finder",
    description: "An HTML5/JavaScript tool to extract spherical coordinates from images, addressing a specific technical gap.",
    technologies: ["HTML5", "JavaScript", "Image Processing"],
    github: "https://razee4315.github.io/pitch-and-yaw-finder"
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
          {projects.map((project, index) => (
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
                  <ProjectActions>
                    {project.title !== "Nutech Chatbot Assistant" && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GitHubIcon />}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </Button>
                    )}
                  </ProjectActions>
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
