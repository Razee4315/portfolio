import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)<{ $isScrolled: boolean }>(({ theme, $isScrolled }) => ({
  background: $isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
  backdropFilter: $isScrolled ? 'blur(10px)' : 'none',
  boxShadow: $isScrolled ? theme.shadows[4] : 'none',
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)<{ $isScrolled: boolean }>(({ theme, $isScrolled }) => ({
  color: $isScrolled ? theme.palette.primary.main : '#fff',
  margin: theme.spacing(0, 1),
  fontWeight: 500,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: $isScrolled ? theme.palette.primary.main : '#fff',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    '&:after': {
      width: '80%',
    },
  },
}));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = ['About', 'Education', 'Skills', 'Projects', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StyledAppBar $isScrolled={isScrolled}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <NavButton
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                $isScrolled={isScrolled}
              >
                {item}
              </NavButton>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
