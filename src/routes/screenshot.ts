import * as puppeteer from 'puppeteer'

export async function get() {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 720 })
	await page.goto('http://localhost:3000/thumbnails/svelte-todo-app')
	await page.screenshot({ path: `thumbnails/${Date.now()}.png` })
	await browser.close()

	return {
		status: 200
	}
}
