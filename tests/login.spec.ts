import { test, expect } from '@playwright/test';

// Change this to match your local dev URL
const URL = 'http://localhost:5173'; 

test.describe('CampusBite Login Integration', () => {
  
  test('Success: Existing Student ID redirects to home', async ({ page }) => {
    await page.goto(URL);
    
    // Fill the ID we manually added to Supabase
    await page.fill('#cb-studentid', '178145');
    await page.fill('#nur-password', 'test-pass'); // "toy" password
    
    await page.click('button[type="submit"]');

    // Check for the success message
    const successMsg = page.locator('text=Login successfully!');
    await expect(successMsg).toBeVisible();

    // Wait for the redirect to /home
    await page.waitForURL('**/home');
    await expect(page).toHaveURL(/.*home/);
  });

  test('Error: Zod blocks IDs that are too short', async ({ page }) => {
    await page.goto(URL);
    
    await page.fill('#cb-studentid', '12'); 
    await page.fill('#nur-password', 'any');
    await page.click('button[type="submit"]');

    // Check for Zod error message
    const error = page.locator('text=Invalid Institional ID.');
    await expect(error).toBeVisible();
  });
});
