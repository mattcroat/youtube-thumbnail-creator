import type { RequestHandler } from '@sveltejs/kit'

let thumbnail = {}

export const get: RequestHandler = async () => {
	return {
		body: { thumbnail }
	}
}

export const post: RequestHandler = async ({ request }) => {
	thumbnail = await request.json()

	return {}
}
