import { TeslaResponse } from './types/tesla';

const FALLBACK_CAR_IMAGE_URLS: { [key: string]: string } = {
	S: 'https://static-assets.tesla.com/configurator/compositor/?model=ms&options=MDLS,PMNG,RENA,SC04,APF0,INPB0,WHSL,CPF0&view=STUD_3QTR&size=800&crop=1150,647,390,180',
	'3': 'https://static-assets.tesla.com/configurator/compositor/?model=m3&options=MDL3,PMNG,RENA,SC04,APF0,INPB0,WHSL,CPF0&view=STUD_3QTR&size=800&crop=1150,647,390,180',
	X: 'https://static-assets.tesla.com/configurator/compositor/?model=mx&options=MDLX,PMNG,RENA,SC04,APF0,INPB0,WHSL,CPF0&view=STUD_3QTR&size=800&crop=1150,647,390,180',
	Y: 'https://static-assets.tesla.com/configurator/compositor/?model=my&options=MDLY,PMNG,RENA,SC04,APF0,INPB0,WHSL,CPF0&view=STUD_3QTR&size=800&crop=1150,647,390,180',
	CYBERTRUCK:
		'https://static-assets.tesla.com/configurator/compositor/?model=ct&options=MDLCT,PMNG,RENA,SC04,APF0,INPB0,WHSL,CPF0&view=STUD_3QTR&size=800&crop=1150,647,390,180',
};

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

export const normalizeModelCode = (apiCode?: string): string => {
	if (!apiCode) return 'UNKNOWN';
	const code = apiCode
		.toLowerCase()
		.replace(/model\s?/i, '')
		.trim();
	switch (code) {
		case 'ms':
		case 's':
			return 'S';
		case 'm3':
		case '3':
			return '3';
		case 'mx':
		case 'x':
			return 'X';
		case 'my':
		case 'y':
			return 'Y';
		case 'ct':
		case 'cybertruck':
			return 'CYBERTRUCK';
		default:
			const upperCode = apiCode.toUpperCase();
			return upperCode in FALLBACK_CAR_IMAGE_URLS ? upperCode : apiCode;
	}
};
