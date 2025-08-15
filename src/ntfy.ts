import { Car } from './types/tesla';

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

export async function sendNtfyNotification(ntfyUrl: string, car: Car, bearerToken: string): Promise<void> {
	const imageUrl = getCarImageUrl(car);
	const body = {
		topic: 'tesla',
		message: `
New Tesla ${car.TrimName} available!
Year: ${car.Year}
Odometer: ${car.Odometer} ${car.OdometerTypeShort}
Discount: ${car.CurrencyCode} ${car.Discount}

Options:
${car.OptionCodeData.slice(0, 5)
	.map((option) => `- ${option.name}`)
	.join('\n')}
${car.OptionCodeData.length > 5 ? `\n...and ${car.OptionCodeData.length - 5} more options.` : ''}
`,
		title: `New Tesla in Stock: ${car.Model} ${car.TrimName} (${car.Year})`,
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
