import app from './app.js';
import config from './config.js';

const PORT = config.api.port;

app.listen(PORT, () =>
  console.log(`Server running in ${config.api.env} mode on port ${PORT}`),
);