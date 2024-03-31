import React from 'react';
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const baseUrl = "http://localhost:5000"
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully!');
      reset(); // Clear form
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register('name', { required: true })} />
      <input type="email" placeholder="Email" {...register('email', { required: true })} />
      <textarea placeholder="Message" {...register('message', { required: true })}></textarea>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
