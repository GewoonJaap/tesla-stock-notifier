export async function isVinNew(kvNamespace: KVNamespace, vin: string): Promise<boolean> {
    const existingVin = await kvNamespace.get(vin);
    return existingVin === null;
}

export async function storeVin(kvNamespace: KVNamespace, vin: string): Promise<void> {
    await kvNamespace.put(vin, 'true');
}