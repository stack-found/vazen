import { expect, test } from "@playwright/test";

test.describe("web smoke", () => {
  test("renders the landing page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Vazen/);
    await expect(page.getByRole("heading", { name: "Vazen" })).toBeVisible();
    await expect(
      page.getByText("The production-grade starter kit for modern full-stack applications")
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Button" })).toBeVisible();
    await expect(page.getByText("API Health :")).toBeVisible();
  });

  test("renders the login page", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText("Login Page")).toBeVisible();
  });
});
