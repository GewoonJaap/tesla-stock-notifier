import { Car } from './types/tesla';
import { normalizeModelCode } from './tesla';

function getCarImageUrl(car: Car): string {
	const baseUrl = 'https://static-assets.tesla.com/configurator/compositor';
	const params = new URLSearchParams({
		context: 'design_studio_2',
		bkba_opt: '1',
		model: car.Model,
		options: car.OptionCodeList,
		view: 'STUD_3QTR',
		size: '800',
		crop: '1150,647,390,180',
	});
	return `${baseUrl}?${params.toString()}`;
}

function generateNtfyMessage(car: Car): string {
	const optionsText = car.OptionCodeData.slice(0, 5)
		.filter((option) => option.name)
		.map((option) => `- ${option.name}`)
		.join('\n');
	const moreOptionsText = car.OptionCodeData.length > 5 ? `\n...and ${car.OptionCodeData.length - 5} more options.` : '';

	return `
New Tesla ${car.TrimName} available!
Year: ${car.Year}
Odometer: ${car.Odometer} ${car.OdometerTypeShort}
Discount: ${car.CurrencyCode} ${car.Discount}

Options:
${optionsText}${moreOptionsText}
`;
}

export async function sendNtfyNotification(ntfyUrl: string, car: Car, bearerToken: string): Promise<void> {
	const imageUrl = getCarImageUrl(car);
	const message = generateNtfyMessage(car);
	const title = `New Tesla in Stock: ${normalizeModelCode(car.Model)} ${car.TrimName} (${car.Year})`;

	const body = {
		topic: 'tesla',
		message: message,
		title: title,
		icon: imageUrl,
		attach: imageUrl,
		actions: [
			{
				action: 'view',
				label: 'View Car',
				url: `https://www.tesla.com/nl_nl/${car.Model}/order/${car.VIN}`,
			},
		],
	};

	await fetch(ntfyUrl, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${bearerToken}`,
		},
	});
}
