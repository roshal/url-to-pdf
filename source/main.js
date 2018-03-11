const p__fs = require('fs')
const p__puppeteer = require('puppeteer')
const p__readline = require('readline')
const p__sanitize_filename = require('sanitize-filename')
{
	(async () => {
		const resources = p__fs.readFileSync('resources.txt', 'utf8').trimRight().split('\n')
		const browser = await p__puppeteer.launch()
		const page = await browser.newPage()
		await page.emulateMedia('screen')
		await page.setJavaScriptEnabled(false)
		for (const resource of resources) {
			console.log(resource)
			await page.goto(resource)
			const name = p__sanitize_filename(await page.title())
			await page.pdf({
				path: [
					'resources/',
					p__sanitize_filename(resource),
					' - ',
					name,
					'.pdf',
				].join(''),
				printBackground: true,
				width: 758,
				height: 1024,
				scale: 1.5,
			})
			console.log(' ', name)
		}
		await browser.close()
	})()
}
