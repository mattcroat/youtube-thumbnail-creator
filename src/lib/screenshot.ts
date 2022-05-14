import * as puppeteer from 'puppeteer'

let page: puppeteer.Page

export async function openBrowser() {
  const browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 720 })
  await page.goto('http://localhost:3000/')
}

export async function saveScreenshot() {
  const timestamp = new Date().getTime()
  const dirname = process.cwd()

  await page.screenshot({
    path: `${dirname}/thumbnail/thumbnail-${timestamp}.png`,
    type: 'png',
  })
}
