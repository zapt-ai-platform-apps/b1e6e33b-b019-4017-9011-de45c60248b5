import { authenticateUser } from './_apiUtils.js';
import OpenAI from 'openai';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

const openai = new OpenAI({
  apiKey: process.env.VITE_PUBLIC_AI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    console.log(`Processing AI request for user: ${user.id}`);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    
    return res.status(200).json({ 
      content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ 
      error: error.message || 'Failed to process request'
    });
  }
}