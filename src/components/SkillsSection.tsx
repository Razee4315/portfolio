import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import BiotechIcon from '@mui/icons-material/Biotech';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloudIcon from '@mui/icons-material/Cloud';
import MemoryIcon from '@mui/icons-material/Memory';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
}));

const SkillCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: 'none',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
    '& .skill-icon': {
      transform: 'scale(1.1)',
      color: theme.palette.primary.main,
    },
    '& .skill-background': {
      transform: 'scale(1.2)',
      opacity: 0.1,
    }
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .skill-icon': {
    fontSize: '2.5rem',
    color: theme.palette.text.primary,
    transition: 'all 0.3s ease',
  },
  '& .skill-background': {
    position: 'absolute',
    right: '-20px',
    top: '-20px',
    fontSize: '8rem',
    opacity: 0.05,
    transform: 'rotate(-15deg)',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
  }
}));

const skillsData = [
  {
    category: "Machine Learning & AI",
    icon: <PsychologyIcon />,
    bgIcon: <AutoFixHighIcon />,
    skills: [
      {
        name: "Deep Learning",
        icon: "🧠",
        level: "Expert"
      },
      {
        name: "Computer Vision",
        icon: "👁️",
        level: "Advanced"
      },
      {
        name: "Natural Language Processing",
        icon: "📝",
        level: "Advanced"
      },
      {
        name: "TensorFlow & PyTorch",
        icon: "🔮",
        level: "Expert"
      }
    ]
  },
  {
    category: "Computer Vision",
    icon: <BiotechIcon />,
    bgIcon: <MemoryIcon />,
    skills: ["OpenCV", "Image Processing", "Object Detection", "Face Recognition", "Video Analysis"]
  },
  {
    category: "Natural Language Processing",
    icon: <StorageIcon />,
    bgIcon: <CloudIcon />,
    skills: ["NLTK", "Transformers", "Sentiment Analysis", "Text Generation", "Named Entity Recognition"]
  },
  {
    category: "Programming",
    icon: <CodeIcon />,
    bgIcon: <DataObjectIcon />,
    skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL"]
  },
  {
    category: "Development Tools",
    icon: <TerminalIcon />,
    bgIcon: <CodeIcon />,
    skills: ["Git", "Docker", "AWS", "Linux", "VS Code"]
  }
];

const SkillsSection = () => {
  return (
    <StyledSection id="skills">
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
          Technical Expertise
        </Typography>

        <Grid container spacing={4}>
          {skillsData.map((category, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SkillCard>
                  <IconWrapper>
                    <span className="skill-icon">{category.icon}</span>
                    <Typography variant="h5" fontWeight="bold">
                      {category.category}
                    </Typography>
                    <span className="skill-background">{category.bgIcon}</span>
                  </IconWrapper>
                  <Box sx={{ mt: 3 }}>
                    {category.skills.map((skill, skillIndex) => (
                      <Typography
                        key={skillIndex}
                        variant="body1"
                        sx={{
                          my: 1,
                          display: 'flex',
                          alignItems: 'center',
                          '&:before': {
                            content: '""',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            marginRight: 2,
                          }
                        }}
                      >
                        {typeof skill === 'object' ? `${skill.name} (${skill.level})` : skill}
                      </Typography>
                    ))}
                  </Box>
                </SkillCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default SkillsSection;
