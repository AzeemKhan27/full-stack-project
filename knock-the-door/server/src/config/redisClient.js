import redis from 'redis';

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_CLOUD_URI_HOST,
    port: process.env.REDIS_CLOUD_URI_HOST_PORT,
  },
  password: process.env.REDIS_CLOUD_PASSWORD,
  maxRetriesPerRequest: 100, // Increased retries to mitigate the issue
});

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('ready', () => {
  console.log('Redis is ready');
});

redisClient.connect().catch(console.error);

export default redisClient;

