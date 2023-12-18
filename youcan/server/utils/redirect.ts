import { navigateTo } from "nuxt/app";

export async function clientsideRedirect(url: string) {
  return await navigateTo("/escape", { replace: true });
}
