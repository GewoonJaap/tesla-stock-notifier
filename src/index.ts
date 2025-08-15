import { Hono } from 'hono';
import { getTeslaInventory } from './tesla';
import { sendNtfyNotification } from './ntfy';
import { isVinNew, storeVin, cleanupOldVins } from './store';

const app = new Hono<{ Bindings: Env }>();

app.get('/api/stock', async (c) => {
	try {
		const cars = await getTeslaInventory(c.env.TESLA_API_URL);
		return c.json(cars);
	} catch (error) {
		console.error('Error fetching stock:', error);
		return c.text('Error fetching stock', 500);
	}
});

async function scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
	console.log(`[${event.cron}] Worker started.`);

	try {
		await cleanupOldVins(env.TESLA_VIN_STORE);
		console.log(`[${event.cron}] Fetching Tesla inventory from: ${env.TESLA_API_URL}`);
		const teslaResponse = await getTeslaInventory(env.TESLA_API_URL);
		const cars = teslaResponse.results;
		console.log(`[${event.cron}] Found ${cars.length} cars in inventory.`);

		if (cars.length === 0) {
			console.log(`[${event.cron}] No cars found, skipping VIN check.`);
			return;
		}

		for (const car of cars) {
			const { VIN } = car;
			console.log(`[${event.cron}] Checking VIN: ${VIN}`);
			const newVin = await isVinNew(env.TESLA_VIN_STORE, VIN);

			await storeVin(env.TESLA_VIN_STORE, VIN);
			if (newVin) {
				console.log(`[${event.cron}] New VIN found: ${VIN}. Storing and sending notification.`);
				await sendNtfyNotification(env.NTFY_URL, car, env.NTFY_BEARER_TOKEN);
				console.log(`[${event.cron}] Notification sent for VIN: ${VIN}`);
			} else {
				console.log(`[${event.cron}] VIN already exists: ${VIN}. Skipping notification.`);
			}
		}
		console.log(`[${event.cron}] Worker finished successfully.`);
	} catch (error) {
		console.error(`[${event.cron}] Error in scheduled task:`, error);
	}
}

export default {
	fetch: app.fetch,
	scheduled,
};
