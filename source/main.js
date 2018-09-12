const p__fs = require('fs')
const p__puppeteer = require('puppeteer')
const p__readline = require('readline')
const p__sanitize_filename = require('sanitize-filename')
//
const sanitize = (filename) => {
	return p__sanitize_filename(filename, {
		replacement: '-',
	})
}
const resources = p__fs.readFileSync('resources.txt', 'utf8').trimRight().split('\n')
{
	(async () => {
		const browser = await p__puppeteer.launch()
		const page = await browser.newPage()
		await page.emulateMedia('screen')
		await page.setJavaScriptEnabled(false)
		for (const resource of resources) {
			console.log(resource)
			const url = [
				// 'https://m.habrahabr.ru/post/',
				resource,
				// '/',
			].join('')
			await page.goto(url)
			const name = sanitize(await page.title())
			await page.pdf({
				path: [
					'resources/',
					sanitize(resource),
					// ' - ',
					' ',
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
