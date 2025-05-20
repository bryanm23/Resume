import amqp from 'amqplib';

// Queue names
export const QUEUES = {
  RESUME_UPDATE: 'resume.update',
  RESUME_NOTIFICATION: 'resume.notification',
  USER_ACTIVITY: 'user.activity'
};

// Exchange names
export const EXCHANGES = {
  RESUME: 'resume.exchange',
  USER: 'user.exchange'
};

// Routing keys
export const ROUTING_KEYS = {
  RESUME_UPDATE: 'resume.update.key',
  RESUME_NOTIFICATION: 'resume.notification.key',
  USER_ACTIVITY: 'user.activity.key'
};

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();

      // Setup exchanges
      await this.channel.assertExchange(EXCHANGES.RESUME, 'direct', { durable: true });
      await this.channel.assertExchange(EXCHANGES.USER, 'direct', { durable: true });

      // Setup queues
      await this.channel.assertQueue(QUEUES.RESUME_UPDATE, { durable: true });
      await this.channel.assertQueue(QUEUES.RESUME_NOTIFICATION, { durable: true });
      await this.channel.assertQueue(QUEUES.USER_ACTIVITY, { durable: true });

      // Bind queues to exchanges
      await this.channel.bindQueue(QUEUES.RESUME_UPDATE, EXCHANGES.RESUME, ROUTING_KEYS.RESUME_UPDATE);
      await this.channel.bindQueue(QUEUES.RESUME_NOTIFICATION, EXCHANGES.RESUME, ROUTING_KEYS.RESUME_NOTIFICATION);
      await this.channel.bindQueue(QUEUES.USER_ACTIVITY, EXCHANGES.USER, ROUTING_KEYS.USER_ACTIVITY);

      console.log('Successfully connected to RabbitMQ');

      // Handle connection close
      this.connection.on('close', () => {
        console.error('RabbitMQ connection closed. Attempting to reconnect...');
        setTimeout(() => this.connect(), 5000);
      });
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      setTimeout(() => this.connect(), 5000);
    }
  }

  async publishMessage(exchange, routingKey, message) {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel not initialized');
      }
      await this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
      console.log(`Message published to exchange: ${exchange}, routing key: ${routingKey}`);
    } catch (error) {
      console.error('Error publishing message:', error);
      throw error;
    }
  }

  async consumeMessage(queue, callback) {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel not initialized');
      }
      await this.channel.consume(queue, (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          callback(content);
          this.channel.ack(msg);
        }
      });
      console.log(`Consumer started for queue: ${queue}`);
    } catch (error) {
      console.error('Error consuming message:', error);
      throw error;
    }
  }

  async closeConnection() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('RabbitMQ connection closed successfully');
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const rabbitMQService = new RabbitMQService();
export default rabbitMQService; 