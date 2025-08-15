export async function isVinNew(kvNamespace: KVNamespace, vin: string): Promise<boolean> {
	const existingVin = await kvNamespace.get(vin);
	return existingVin === null;
}

export async function storeVin(kvNamespace: KVNamespace, vin: string): Promise<void> {
	const now = new Date().toISOString();
	await kvNamespace.put(vin, now);
}

export async function cleanupOldVins(kvNamespace: KVNamespace): Promise<void> {
	const { keys } = await kvNamespace.list();
	const now = new Date();
	const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

	for (const key of keys) {
		const lastSeenString = await kvNamespace.get(key.name);
		if (lastSeenString) {
			const lastSeen = new Date(lastSeenString);
			if (lastSeen < twentyFourHoursAgo) {
				await kvNamespace.delete(key.name);
				console.log(`Removed old VIN: ${key.name}`);
			}
		}
	}
}
