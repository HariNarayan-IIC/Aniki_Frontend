// CreateRoadmapCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';


function AdminPanelCard({ onCreate }) {
  return (
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
  );
}

export default AdminPanelCard;
