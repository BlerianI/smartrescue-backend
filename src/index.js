import app from './app.js';
import config from './config.js';

const PORT = config.port || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))