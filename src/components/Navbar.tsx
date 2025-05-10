import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Container, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  useMediaQuery 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Use shouldForwardProp to prevent custom props from being passed to DOM elements
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== '$isScrolled',
})<{ $isScrolled: boolean }>(({ theme, $isScrolled }) => ({
  background: $isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
  backdropFilter: $isScrolled ? 'blur(10px)' : 'none',
  boxShadow: $isScrolled ? theme.shadows[4] : 'none',
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$isScrolled',
})<{ $isScrolled: boolean }>(({ theme, $isScrolled }) => ({
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
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
      // Close drawer if it's open after navigation
      if (drawerOpen) {
        setDrawerOpen(false);
      }
    }
  };

  // Mobile drawer component
  const drawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{
        '& .MuiDrawer-paper': { 
          width: 250, 
          right: 0,
          left: 'auto',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(44, 62, 80, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: isScrolled ? '#2c3e50' : '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(item.toLowerCase())}
              sx={{
                textAlign: 'center',
                color: isScrolled ? '#2c3e50' : '#fff',
                '&:hover': {
                  backgroundColor: isScrolled ? 'rgba(76, 161, 175, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <StyledAppBar $isScrolled={isScrolled} sx={{ zIndex: 1200 }}>
      <Container maxWidth="lg" sx={{ padding: isMobile ? '0' : '0 24px' }}>
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: isMobile ? 'flex-end' : 'center', 
          gap: 2, 
          paddingRight: isMobile ? 2 : 16,
          paddingLeft: isMobile ? 8 : 16,
          minHeight: '56px'
        }}>
          {!isMobile && <Box sx={{ flexGrow: 1 }} />}
          
          {/* Desktop navigation */}
          {!isMobile && (
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
          )}
          
          {/* Mobile hamburger menu */}
          {isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginRight: 0, paddingRight: 0 }}>
              <IconButton 
                onClick={() => setDrawerOpen(true)}
                sx={{ 
                  color: isScrolled ? '#2c3e50' : '#fff',
                  marginRight: 0,
                  paddingRight: 0,
                  paddingLeft: 0,
                  marginLeft: 0,
                  position: 'relative',
                  right: 0
                }}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          
          {!isMobile && <Box sx={{ flexGrow: 1 }} />}
        </Toolbar>
      </Container>
      {drawer}
    </StyledAppBar>
  );
};

export default Navbar;
