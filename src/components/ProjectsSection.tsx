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
    description: "A mission-critical platform revolutionizing disaster response coordination. Built with Python, Django, and WebSocket technology, it enables real-time resource allocation, emergency team coordination, and status updates during crisis situations. Features include interactive mapping, resource tracking, and priority-based task management.",
    technologies: ["Python", "Django", "WebSocket", "PostgreSQL", "Redis", "React"],
    github: "https://github.com/Razee4315/DisasterConnect"
  },
  {
    title: "BinarySearchTreeVisualization",
    description: "An innovative educational tool that brings data structures to life. This Qt/C++ application provides real-time visualization of BST operations, helping students master complex algorithms through interactive animations. Features step-by-step visualization, operation history, and customizable tree layouts.",
    technologies: ["C++", "Qt6", "OpenGL", "CMake"],
    github: "https://github.com/Razee4315/BinarySearchTreeVisualization"
  },
  {
    title: "Panda Chat",
    description: "A modern, feature-rich real-time chat application built with TypeScript and React. Implements WebSocket for instant messaging, Firebase for authentication and data persistence, and features an intuitive UI with emoji support, file sharing, and end-to-end encryption.",
    technologies: ["TypeScript", "React", "Firebase", "WebSocket", "Material-UI"],
    github: "https://github.com/Razee4315/panda_chat"
  },
  {
    title: "FractalForge",
    description: "An advanced fractal visualization tool that combines mathematical precision with artistic expression. Built with Python and OpenGL, it offers real-time rendering of Mandelbrot and Julia sets, custom color palettes, and deep zoom capabilities up to 10^16x magnification.",
    technologies: ["Python", "OpenGL", "NumPy", "PyQt5"],
    github: "https://github.com/Razee4315/FractalForge"
  },
  {
    title: "CaseKeeper",
    description: "A sophisticated legal case management system built with C# and .NET Core. Features document management, deadline tracking, client communication portal, and automated billing. Implements clean architecture and domain-driven design principles.",
    technologies: ["C#", ".NET Core", "Entity Framework", "SQL Server", "Azure"],
    github: "https://github.com/Razee4315/CaseKeeper"
  },
  {
    title: "Flatmate Expense Manager",
    description: "A comprehensive solution for shared living expenses. This full-stack application streamlines expense tracking, bill splitting, and settlement between flatmates. Features real-time balance updates, expense categorization, and automated monthly reports.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Material-UI"],
    github: "https://github.com/Razee4315/Flatmate_Expense_Manager"
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
