import { test, expect } from '@playwright/test';

test.describe('Superhero battle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the hero and villain selectors and a battle button', async ({ page }) => {
    await expect(page.getByRole('combobox', { name: 'Hero' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Villain' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Battle' })).toBeVisible();
  });

  test('Thanos beats Aquaman', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Hero' }).selectOption('Aquaman');
    await page.getByRole('combobox', { name: 'Villain' }).selectOption('Thanos');
    await page.getByRole('button', { name: 'Battle' }).click();

    await expect(page.getByTestId('result')).toHaveText('Winner: Thanos');
  });

  test('shows the winner once the battle is over', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Hero' }).selectOption('Gamora');
    await page.getByRole('combobox', { name: 'Villain' }).selectOption('Lex Luthor');
    await page.getByRole('button', { name: 'Battle' }).click();

    await expect(page.getByTestId('result')).toHaveText('Winner: Gamora', { timeout: 1000 });
  });

  test('Thor beats Harley Quinn', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Hero' }).selectOption('Thor');
    await page.getByRole('combobox', { name: 'Villain' }).selectOption('Harley Quinn');
    await page.getByRole('button', { name: 'Fight!' }).click();

    await expect(page.getByTestId('result')).toHaveText('Winner: Thor');
  });
});
