import app from './app.js';
import config from './config.js';
import bodyParser from 'body-parser';

const PORT = config.port;
const HOST = '0.0.0.0';

app.use(bodyParser.json());

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});