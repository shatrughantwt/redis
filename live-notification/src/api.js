import express from 'express';
import Redis from 'ioredis';
import { create } from 'node:domain';

const app = express();
app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/notify', async (req, res) => {
    const payload = {
        title: req.body.title || 'Default Title',
        createdAt: new Date().toISOString(),
    }

    const receivers = await publisher.publish("notification", JSON.stringify(payload),
);
    res.json({ message: `Notification sent to ${receivers} subscribers`
    });
}); 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});