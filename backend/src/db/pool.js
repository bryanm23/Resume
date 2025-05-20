import pg from 'pg';

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'resume_db'
});

// Log connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test the connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to database');
    done();
  }
});

export default pool; 