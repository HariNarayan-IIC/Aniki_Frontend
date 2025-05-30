// CreateRoadmapCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme to match the provided image's aesthetics
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // A shade of green similar to the "Follow" buttons and "Create your own Roadmap" in the image
    },
    background: {
      default: '#1a1a1a', // Dark background color from the image
      paper: '#2a2a2a',   // Slightly lighter dark for cards, similar to the image's card background
    },
    text: {
      primary: '#ffffff', // White text for general content
      secondary: '#b0b0b0', // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // You can adjust this to a more specific font if known
    h6: {
      fontWeight: 600, // Slightly bolder for titles
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a', // Card background
          color: '#ffffff',           // Default text color for card
          border: '1px solid #4CAF50', // A subtle green border to match the theme
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep button text as is, not all caps
          fontWeight: 600,
        },
      },
    },
  },
});

function AdminPanelCard({ onCreate }) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Create New Roadmap
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start building a new interactive career roadmap with draggable nodes and connections.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" fullWidth onClick={onCreate}>
            Create Roadmap
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default AdminPanelCard;