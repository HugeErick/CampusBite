import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173';

// student IDs currently in the DB
const validIds = ['178145', '178919', '179234', '181439'];

test.describe('CampusBite DB Assertions', () => {

  // helper to login as a specific student
  async function login(page: any, id: string) {
    await page.goto(URL);
    await page.fill('#cb-studentid', id);
    await page.fill('#nur-password', 'test-pass');
    await page.click('button[type="submit"]');
  }

  // all DB records can authenticate
  for (const id of validIds) {
    test(`DB record ${id} authenticates and lands on /home`, async ({ page }) => {
      await login(page, id);
      await page.waitForURL('**/home**');
      // wait half sec maybe
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/.*home/);
    });
  }

  // (not in DB, should rejected)
  const nearMissIds = ['178144', '178920', '179235', '181440'];
  for (const id of nearMissIds) {
    test(`Near-miss ID ${id} is rejected`, async ({ page }) => {
      await login(page, id);
      const error = page.locator('text=Invalid Institutional ID');
      await expect(error).toBeVisible();
    });
  }

  test('Session cookie is set after successful login', async ({ page, context }) => {
    await login(page, '178145');
    await page.waitForURL('**/home**');
    await page.waitForTimeout(500);
    const cookies = await context.cookies();
    const session = cookies.find(c => c.name === 'session_id');
    expect(session).toBeDefined();
    expect(session?.value).toBe('178145');
    expect(session?.httpOnly).toBe(true);
    expect(session?.sameSite).toBe('Strict');
  });

  // session cookie is cleared after logout
  test('Session cookie is deleted after logout', async ({ page, context }) => {
    await login(page, '178145');
    await page.waitForURL('**/home**');
    await page.waitForTimeout(500);
    await page.goto(`${URL}/home/more`);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${URL}/**`);
    const cookies = await context.cookies();
    const session = cookies.find(c => c.name === 'session_id');
    expect(session).toBeUndefined();
  });
});
