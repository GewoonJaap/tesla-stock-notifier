import { TeslaResponse } from './types/tesla';

export async function getTeslaInventory(apiUrl: string): Promise<TeslaResponse> {
	const response = await fetch(apiUrl, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0',
			Accept: '*/*',
			'Accept-Language': 'nl,en-US;q=0.7,en;q=0.3',
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-origin',
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch Tesla inventory: ${response.status} ${response.statusText}`);
	}
	const data: TeslaResponse = await response.json();
	return data;
}
