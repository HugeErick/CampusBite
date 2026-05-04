// routes/pageserver aka login page server

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createServerClient } from "$lib/supabase/server";

export type LoginForm = {
  success: boolean;
  message: string;
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const supabase = createServerClient();

    const data = await request.formData();
    const studentId = data.get('studentId');

    if (!studentId) {
      return fail(400, { success: false, message: 'ID is required' });
    }

    // Verify with Supabase
    const { data: user, error } = await supabase
    .from("students")
    .select("student_id")
    .eq("student_id", studentId)
    .single();

    if (error || !user) {
      return fail(401, { success: false,  message: 'Invalid Institutional ID' });
    }

    // Set the cookie (valid for 7 days)
    cookies.set('session_id', user.student_id.toString(), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    });

    redirect(303, "/home?welcome=1");
  }
};
