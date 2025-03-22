import { Box, Container, Typography, Paper, IconButton, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

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
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Replace these with your actual EmailJS service ID, template ID, and public key
    const serviceId = 'service_id'; // You'll need to create this in EmailJS
    const templateId = 'template_id'; // You'll need to create this in EmailJS
    const publicKey = 'public_key'; // Your EmailJS public key

    emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        to_name: 'Saqlain Abbas',
        from_email: formData.email,
        to_email: 'saqlainrazee@gmail.com',
        subject: formData.subject,
        message: formData.message,
      },
      publicKey
    )
    .then(() => {
      setLoading(false);
      setSnackbarMessage('Thank you. I will get back to you as soon as possible.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      setSnackbarMessage('Something went wrong. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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

                <form ref={formRef} onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
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
                        name="message"
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
                        sx={{ mt: 2 }}
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
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
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledSection>
  );
};

export default ContactSection;
