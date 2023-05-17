const { MongoClient } = require('mongodb');
const redis = require('redis');

// MongoDB Connection
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Redis Connection
const redisClient = redis.createClient();

// Connect to MongoDB
mongoClient.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');

  // Perform MongoDB operations here...
});

// Connect to Redis
redisClient.on('error', (err) => {
  console.error('Failed to connect to Redis:', err);
  process.exit(1);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');

  // Perform Redis operations here...
});

// Close connections on process exit
process.on('SIGINT', () => {
  mongoClient.close();
  redisClient.quit();
  process.exit();
});
