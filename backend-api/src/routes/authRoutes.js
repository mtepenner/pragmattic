const express = require('express');
const router = express.Router();
const prisma = require('../utils/db');
const { oauth2Client } = require('../services/googleCalendar');

// Step 1: Mobile app directs user here. We generate a Google Login URL.
router.get('/google', (req, res) => {
  const userId = req.query.userId; // Passed from mobile app
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Crucial: This gets us the refresh token
    prompt: 'consent',      // Forces Google to give us a new refresh token
    scope: ['https://www.googleapis.com/auth/calendar.events'],
    state: userId           // Pass the userId through Google's flow
  });
  res.redirect(url);
});

// Step 2: Google redirects the user back here after they log in.
router.get('/google/callback', async (req, res) => {
  const { code, state: userId } = req.query;
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    // Save the refresh token to the user's database profile
    if (userId && tokens.refresh_token) {
      await prisma.user.update({
        where: { id: userId },
        data: { googleRefreshToken: tokens.refresh_token }
      });
    }

    // Redirect the user back to the mobile app (using a deep link)
    res.redirect('exp://localhost:8081/--/SettingsScreen?status=success'); 
  } catch (error) {
    console.error('OAuth Error:', error);
    res.status(500).send('Authentication failed.');
  }
});

module.exports = router;
