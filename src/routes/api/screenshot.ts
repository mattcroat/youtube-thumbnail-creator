import type { RequestHandler } from '@sveltejs/kit'
import * as puppeteer from 'puppeteer'

export const get: RequestHandler = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.waitForNetworkIdle()
	await page.setViewport({ width: 1280, height: 720 })
	await page.goto('http://localhost:3000/thumbnail')
	await page.screenshot({
		path: `thumbnails/${Date.now()}.png`
	})
	await browser.close()

	return { status: 200 }
}
