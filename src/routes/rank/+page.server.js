import { PRIVATE_API_KEY } from '$env/static/private';

// eslint-disable-next-line no-unused-vars
export async function load({ page, fetch}) {
	const responses = await fetch(`https://www.iamickdev.com/api/games/15puzzle`,{
		method: 'GET',
		headers: {
			'x-api-key': PRIVATE_API_KEY
		}
	}).then(r => r.json()).then(r => {
		return r;
	});

	return {
		data: responses
	};
}