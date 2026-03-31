const { google } = require('googleapis');

// Configure the Google OAuth2 client using your .env credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Helper to initialize the calendar API with a user's specific refresh token
const getCalendarApi = (refreshToken) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: 'v3', auth: oauth2Client });
};

const createCalendarEvent = async (refreshToken, task) => {
  if (!refreshToken) return null;
  const calendar = getCalendarApi(refreshToken);
  
  // Calculate end time based on the task's durationMinutes
  const startTime = new Date(task.dueDate || new Date());
  const endTime = new Date(startTime.getTime() + task.durationMinutes * 60000);

  const event = {
    summary: `[Task] ${task.title}`,
    description: task.description || '',
    start: { dateTime: startTime.toISOString() },
    end: { dateTime: endTime.toISOString() }
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    return response.data.id; // Return the Google Event ID to save in our database
  } catch (error) {
    console.error('Google Calendar Insert Error:', error);
    return null;
  }
};

const deleteCalendarEvent = async (refreshToken, eventId) => {
  if (!refreshToken || !eventId) return;
  const calendar = getCalendarApi(refreshToken);
  
  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
  } catch (error) {
    console.error('Google Calendar Delete Error:', error);
  }
};

module.exports = { oauth2Client, createCalendarEvent, deleteCalendarEvent };
