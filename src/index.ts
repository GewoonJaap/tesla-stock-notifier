import { getTeslaInventory } from './tesla';
import { sendNtfyNotification } from './ntfy';
import { isVinNew, storeVin } from './store';

interface Env {
	TESLA_VIN_STORE: KVNamespace;
	NTFY_URL: string;
	TESLA_API_URL: string;
}

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log(`[${event.cron}] Worker started.`);

		try {
			console.log(`[${event.cron}] Fetching Tesla inventory from: ${env.TESLA_API_URL}`);
			const cars = await getTeslaInventory(env.TESLA_API_URL);
			console.log(`[${event.cron}] Found ${cars.length} cars in inventory.`);

			if (cars.length === 0) {
				console.log(`[${event.cron}] No cars found, skipping VIN check.`);
				return;
			}

			for (const car of cars) {
				const { VIN } = car;
				console.log(`[${event.cron}] Checking VIN: ${VIN}`);
				const newVin = await isVinNew(env.TESLA_VIN_STORE, VIN);

				if (newVin) {
					console.log(`[${event.cron}] New VIN found: ${VIN}. Storing and sending notification.`);
					await storeVin(env.TESLA_VIN_STORE, VIN);
					await sendNtfyNotification(env.NTFY_URL, `New Tesla in stock: ${VIN}`);
					console.log(`[${event.cron}] Notification sent for VIN: ${VIN}`);
				} else {
					console.log(`[${event.cron}] VIN already exists: ${VIN}. Skipping notification.`);
				}
			}
			console.log(`[${event.cron}] Worker finished successfully.`);
		} catch (error) {
			console.error(`[${event.cron}] Error in scheduled task:`, error);
			// Optionally send an error notification
			if (error instanceof Error) {
				await sendNtfyNotification(env.NTFY_URL, `Error in Tesla Stock Notifier: ${error.message}`);
			} else {
				await sendNtfyNotification(env.NTFY_URL, `An unknown error occurred in Tesla Stock Notifier.`);
			}
		}
	},
};