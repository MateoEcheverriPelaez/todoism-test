import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TaskPage } from "../pages/TaskPage";
import { IntroPage } from "../pages/IntroPage";

test.describe("Suite de pruebas", () => {
  let loginPage: LoginPage;
  let taskPage: TaskPage;
  let introPage: IntroPage;

  test.beforeEach(async ({ page }) => {
    test.slow();
    loginPage = new LoginPage(page);
    taskPage = new TaskPage(page);
    introPage = new IntroPage(page);
    await introPage.goToLogin();
    await loginPage.loginWithTestAccount();
  });

  test("Add task", async ({ page }) => {
    await taskPage.addTask("New homework");

    // Verificar que se creó la tarea
    await taskPage.verifyTaskVisible("New homework");
  });

  test("Complete task", async ({ page }) => {
    await taskPage.addTask("Nueva tarea");
    await taskPage.completeTask("Nueva tarea");

    // Verificar que la tarea está marcada como completada al mostrarse el ícono de completada
    await expect(
      page.locator('span:has-text("check_box Nueva tarea")')
    ).toBeVisible();
  });

  test("Clear task", async ({ page }) => {
    await taskPage.addTask("homework");
    await taskPage.completeTask("homework");
    await taskPage.clearTasks();

    // Verificar que la tarea fue limpiada y ya no se encuentra visible
    await expect(page.locator("text=homework")).not.toBeVisible();
  });
});
