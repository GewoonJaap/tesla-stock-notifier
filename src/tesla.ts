export interface Car {
    VIN: string;
}

export async function getTeslaInventory(apiUrl: string): Promise<Car[]> {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch Tesla inventory: ${response.status} ${response.statusText}`);
    }
    const data: { results: Car[] } = await response.json();
    return data.results || [];
}