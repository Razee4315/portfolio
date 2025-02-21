import { Box, Container, Typography, Paper, IconButton, Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  background: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[10],
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ContactSection = () => {
  return (
    <StyledSection id="contact">
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactCard>
                <Typography variant="h3" gutterBottom align="center" color="primary">
                  Get in Touch
                </Typography>
                <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
                  I'm always open to new opportunities and collaborations.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      required
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Connect With Me
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <a href="mailto:saqlainrazee@gmail.com" style={{ textDecoration: 'none' }}>
                      <IconButton color="primary">
                        <EmailIcon />
                      </IconButton>
                    </a>
                    <a href="https://linkedin.com/in/Razee4315" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <IconButton color="primary">
                        <LinkedInIcon />
                      </IconButton>
                    </a>
                    <a href="https://github.com/Razee4315" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <IconButton color="primary">
                        <GitHubIcon />
                      </IconButton>
                    </a>
                    <a href="https://twitter.com/Razee4315" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <IconButton color="primary">
                        <TwitterIcon />
                      </IconButton>
                    </a>
                  </Box>
                </Box>
              </ContactCard>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default ContactSection;
