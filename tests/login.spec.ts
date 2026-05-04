import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173';

test.describe('CampusBite Login Integration', () => {

  test('Success: Existing Student ID redirects to home', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#cb-studentid', '178145');
    await page.fill('#nur-password', 'test-pass');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home**');
    await expect(page).toHaveURL(/.*home/);
  });

  test('Error: Zod blocks IDs that are too short', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#cb-studentid', '12');
    await page.fill('#nur-password', 'any');
    await page.click('button[type="submit"]');

    const error = page.locator('text=Invalid Institutional ID');
    await expect(error).toBeVisible();
  });

});
