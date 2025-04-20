const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9095;

// Serve static files from the "dist" folder
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.send('Accessibility Plugin Server is Running...');
});

// Expose the plugin on `/accessibility-plugin.min.js`
app.get('/accessibility-plugin.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'accessibility-plugin.min.js'));
});

app.listen(PORT, () => {
  console.log(`Plugin is available at: http://localhost:${PORT}/accessibility-plugin.min.js`);
});
