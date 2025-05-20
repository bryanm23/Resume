package com.resume.api.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    
    public static final String QUEUE_RESUME_UPDATE = "resume.update";
    public static final String QUEUE_RESUME_NOTIFICATION = "resume.notification";
    public static final String EXCHANGE_RESUME = "resume.exchange";
    public static final String ROUTING_KEY_UPDATE = "resume.update.key";
    public static final String ROUTING_KEY_NOTIFICATION = "resume.notification.key";

    @Bean
    public Queue resumeUpdateQueue() {
        return new Queue(QUEUE_RESUME_UPDATE, true);
    }

    @Bean
    public Queue resumeNotificationQueue() {
        return new Queue(QUEUE_RESUME_NOTIFICATION, true);
    }

    @Bean
    public DirectExchange resumeExchange() {
        return new DirectExchange(EXCHANGE_RESUME);
    }

    @Bean
    public Binding bindingUpdate(Queue resumeUpdateQueue, DirectExchange resumeExchange) {
        return BindingBuilder.bind(resumeUpdateQueue)
                .to(resumeExchange)
                .with(ROUTING_KEY_UPDATE);
    }

    @Bean
    public Binding bindingNotification(Queue resumeNotificationQueue, DirectExchange resumeExchange) {
        return BindingBuilder.bind(resumeNotificationQueue)
                .to(resumeExchange)
                .with(ROUTING_KEY_NOTIFICATION);
    }
} 