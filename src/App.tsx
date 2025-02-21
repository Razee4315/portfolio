import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Global, css } from '@emotion/react';
import theme from './theme';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: ${theme.palette.background.default};
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.palette.background.default};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.palette.primary.main};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.primary.dark};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </ThemeProvider>
  );
}

export default App;
