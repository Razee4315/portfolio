import React, { useState } from 'react';
import { Box, Container, Typography, Paper, IconButton, Grid, TextField, Button, Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

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
  // Form submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Using user's Formspree ID: manobqba
      const response = await fetch('https://formspree.io/f/manobqba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
    setIsError(false);
  };
  const contactLinks = [
    {
      name: 'Email',
      icon: <EmailIcon />,
      link: 'mailto:saqlainrazee@gmail.com',
      text: 'saqlainrazee@gmail.com'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      link: 'https://www.linkedin.com/in/saqlainrazee',
      text: 'linkedin.com/in/saqlainrazee'
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      link: 'https://github.com/Razee4315',
      text: 'github.com/Razee4315'
    }
  ];
  
  return (
    <>
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




                  {/* Using direct form submission to Formspree */}
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="name"
                          label="Name"
                          variant="outlined"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="email"
                          label="Email"
                          variant="outlined"
                          required
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="subject"
                          label="Subject"
                          variant="outlined"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="message"
                          label="Message"
                          variant="outlined"
                          multiline
                          rows={4}
                          required
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          type="submit"
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                      {contactLinks.map((link, index) => (
                        <a href={link.link} key={index} style={{ textDecoration: 'none' }}>
                          <IconButton color="primary">
                            {link.icon}
                          </IconButton>
                        </a>
                      ))}
                    </Box>
                  </Box>
                </ContactCard>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </StyledSection>

      {/* Success notification */}
      <Snackbar open={isSubmitted} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Message sent successfully! Thanks for reaching out! I'll get back to you soon.
        </Alert>
      </Snackbar>

      {/* Error notification */}
      <Snackbar open={isError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Failed to send message. Please try again or contact me directly.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactSection;
