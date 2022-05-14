import type { RequestHandler } from '@sveltejs/kit'
import { openBrowser } from '$root/lib/screenshot'

export const get: RequestHandler = async () => {
  await openBrowser()
  return {}
}
