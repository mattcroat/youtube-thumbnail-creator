import type { RequestHandler } from '@sveltejs/kit'
import { saveScreenshot } from '$lib/screenshot'

export const get: RequestHandler = async () => {
  await saveScreenshot()
  return {}
}
