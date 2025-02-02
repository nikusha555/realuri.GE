import db from '../config/db.conf.js'; // Adjust the path if needed
import schedule from 'node-schedule';

// Run every minute to check expired hot news
schedule.scheduleJob('* * * * *', async () => {
    try {
        const query = `UPDATE news SET is_hot = 0, hot_until = NULL WHERE is_hot = 1 AND hot_until < NOW()`;
        await db.execute(query);
        console.log('Expired hot news status removed');
    } catch (err) {
        console.error('Error updating hot news:', err);
    }
});

export default schedule;
