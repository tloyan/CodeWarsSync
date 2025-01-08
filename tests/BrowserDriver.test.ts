import { BrowserDriver } from '../src/BrowserDriver';

describe('BrowserDriver', () => {
  it('should open a browser', async () => {
    const browser = new BrowserDriver()
    await browser.open()
    expect(browser.browser).toBeDefined()
    await browser.close()
  })

  it('should close the browser', async () => {
    const browser = new BrowserDriver()
    await browser.open()
    await browser.close()
    await expect(async () => await browser.browser?.newPage()).rejects.toThrow()
  })

  // it('should login to codewars', async () => {
  //   const browser = new BrowserDriver()
  //   await browser.open()
  //   try {
  //     await browser.login()
  //     const cookies = await browser.browser?.cookies()
  //     const _session_id = cookies?.find(({ name }) => name === "_session_id")
  //     expect(_session_id?.name).toBeDefined()
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   await browser.close()
  // })
})