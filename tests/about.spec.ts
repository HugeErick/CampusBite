import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173';

async function loginAndGo(page: any, path: string) {
  await page.goto(URL);
  await page.fill('#cb-studentid', '178145');
  await page.fill('#nur-password', 'test-pass');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/home**');
  await page.goto(`${URL}${path}`);
}

test.describe('About Page', () => {

  test('renders page title and heading', async ({ page }) => {
    await loginAndGo(page, '/home/about');
    await expect(page).toHaveTitle('About | CampusBite');
    await expect(page.locator('h1')).toContainText('Acerca de CAMPUSBITE');
  });

  test('renders all 3 feature cards', async ({ page }) => {
    await loginAndGo(page, '/home/about');
    const cards = page.locator('section.grid h3');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Sistema de Turnos Inteligente');
    await expect(cards.nth(1)).toContainText('Pedidos Personalizados');
    await expect(cards.nth(2)).toContainText('Pago Seguro');
  });

  test('renders all 5 how-it-works steps', async ({ page }) => {
    await loginAndGo(page, '/home/about');
    // steps are numbered divs inside the ¿Cómo funciona? section
    const steps = page.locator('section').last().locator('div.flex.items-start');
    await expect(steps).toHaveCount(5);
  });

  test('renders footer with version and copyright', async ({ page }) => {
    await loginAndGo(page, '/home/about');
    await expect(page.locator('footer')).toContainText('CAMPUSBITE v1.0.0');
    await expect(page.locator('footer')).toContainText('© 2026');
  });

});

test.describe('Bottom Nav (home layout)', () => {

  test('HOME button navigates to /home', async ({ page }) => {
    await loginAndGo(page, '/home/about');
    await page.click('nav button:has-text("HOME")');
    await expect(page).toHaveURL(/.*\/home$/);
  });

  test('ABOUT button navigates to /home/about', async ({ page }) => {
    await loginAndGo(page, '/home');
    await page.click('nav button:has-text("ABOUT")');
    await expect(page).toHaveURL(/.*\/home\/about/);
  });

  test('MORE button navigates to /home/more', async ({ page }) => {
    await loginAndGo(page, '/home');
    await page.click('nav button:has-text("MORE")');
    await expect(page).toHaveURL(/.*\/home\/more/);
  });

  test('ABOUT nav button is active on /home/about', async ({ page }) => {
    await loginAndGo(page, '/home/about');
    const aboutBtn = page.locator('nav button:has-text("ABOUT")');
    // Active button gets text-(--customGold) class
    await expect(aboutBtn).toHaveClass(/customGold/);
  });

});
