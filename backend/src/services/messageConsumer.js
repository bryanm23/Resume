import rabbitMQService, { QUEUES } from '../config/rabbitmq.js';

class MessageConsumer {
  async start() {
    try {
      // Handle resume updates
      await rabbitMQService.consumeMessage(QUEUES.RESUME_UPDATE, async (message) => {
        console.log('Received resume update:', message);
        // TODO: Implement resume update logic
      });

      // Handle notifications
      await rabbitMQService.consumeMessage(QUEUES.RESUME_NOTIFICATION, async (message) => {
        console.log('Received notification:', message);
        // TODO: Implement notification logic
      });

      // Handle user activity
      await rabbitMQService.consumeMessage(QUEUES.USER_ACTIVITY, async (message) => {
        console.log('Received user activity:', message);
        // TODO: Implement user activity logic
      });

      console.log('Message consumers started successfully');
    } catch (error) {
      console.error('Error starting message consumers:', error);
      throw error;
    }
  }
}

const messageConsumer = new MessageConsumer();
export default messageConsumer; 