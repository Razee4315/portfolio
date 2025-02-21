import { Box, Container, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
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

const ContactCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[10],
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
    transform: 'translateY(-3px)',
    transition: 'transform 0.3s ease',
  },
}));

const ContactSection = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <StyledSection id="contact">
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
          Get in Touch
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ContactCard>
                <form onSubmit={handleSubmit}>
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
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        required
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Connect With Me
                  </Typography>
                  <Box>
                    <SocialButton
                      href="mailto:saqlainrazee@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <EmailIcon />
                    </SocialButton>
                    <SocialButton
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon />
                    </SocialButton>
                    <SocialButton
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon />
                    </SocialButton>
                    <SocialButton
                      href="https://twitter.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon />
                    </SocialButton>
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
