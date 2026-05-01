import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const studentId = cookies.get("session_id");
  return {
    user: {
      id: studentId ?? "Guest"
    }
  };
};

export const actions: Actions = {
  // This must be an action to handle the button click via a form
  logout: async ({ cookies }) => {
    cookies.delete("session_id", { path: "/" });
    throw redirect(303, "/");
  }
};
