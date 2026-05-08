import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const FIXTURE = "/fixtures/contrast.html";

/**
 * The README claims the design tokens meet WCAG AA. This test grounds that
 * claim by exercising every intended-AA foreground/background pair in
 * fixtures/contrast.html and running axe-core's color-contrast rule against
 * it in both light and dark themes.
 *
 * If a token change pushes any pair below 4.5:1 (AA for normal text), this
 * test fails and the offending pair is named in the violation report.
 */

async function runAxe(page: import("@playwright/test").Page) {
  return new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
}

test.describe("contrast fixture", () => {
  test("light mode passes axe color-contrast", async ({ page }) => {
    await page.goto(FIXTURE);
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
    const results = await runAxe(page);
    expect(results.violations, formatViolations(results.violations)).toEqual([]);
  });

  test("dark mode passes axe color-contrast", async ({ page }) => {
    await page.goto(FIXTURE);
    await page.evaluate(() => {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });
    const results = await runAxe(page);
    expect(results.violations, formatViolations(results.violations)).toEqual([]);
  });
});

function formatViolations(violations: Awaited<ReturnType<typeof runAxe>>["violations"]) {
  if (violations.length === 0) return "no violations";
  return violations
    .flatMap((v) =>
      v.nodes.map((node) => `  ${v.id}: ${node.target.join(" ")} — ${node.failureSummary}`)
    )
    .join("\n");
}
