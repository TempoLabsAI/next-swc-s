"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase";

// Safe headers access with fallbacks
const getHost = (): string => {
  try {
const headersInstance = headers(); // No await needed in Next.js 15
const headersObj = Object.fromEntries(
  Array.from(headersInstance.entries())
);
    return (
      headersObj['host'] || 
      headersObj['x-forwarded-host']?.split(',')[0] || 
      process.env.NEXTAUTH_URL?.replace(/https?:\/\//, '') || 
      'localhost:3000'
    );
  } catch (error) {
    console.error("Header access failed - using fallback:", error);
    return 'localhost:3000';
  }
};

export const signUpAction = async (formData: FormData) => {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const fullName = formData.get("full_name")?.toString() || '';
    const supabase = await createClient();
    const host = getHost();

    if (!email || !password) {
      return encodedRedirect(
        "error",
        "/sign-up",
        "Email and password are required",
      );
    }

    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://${host}/auth/callback`,
        data: {
          full_name: fullName,
          email: email,
        }
      },
    });

    if (error) {
      console.error(`Signup error [${error.code}]: ${error.message}`);
      return encodedRedirect("error", "/sign-up", error.message);
    }

    if (user) {
      try {
        const { error: updateError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            name: fullName,
            full_name: fullName,
            email: email,
            user_id: user.id,
            token_identifier: user.id,
            created_at: new Date().toISOString()
          });

        if (updateError) {
          console.error('Profile update failed:', updateError.message);
        }
      } catch (err) {
        console.error('User creation error:', err);
      }
    }

    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for verification.",
    );
  } catch (error) {
    console.error("Signup process failed:", error);
    return encodedRedirect(
      "error",
      "/sign-up",
      "An unexpected error occurred during signup"
    );
  }
};

export const signInAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(`Login failed [${error.code}]: ${error.message}`);
      return encodedRedirect("error", "/sign-in", error.message);
    }

    return redirect("/dashboard");
  } catch (error) {
    console.error("Login process failed:", error);
    return encodedRedirect(
      "error",
      "/sign-in",
      "An unexpected error occurred during login"
    );
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  try {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const host = getHost();

    if (!email) {
      return encodedRedirect("error", "/forgot-password", "Email is required");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://${host}/auth/callback?next=/protected/reset-password`,
    });

    if (error) {
      console.error(`Password reset failed [${error.code}]: ${error.message}`);
      return encodedRedirect(
        "error",
        "/forgot-password",
        "Could not initiate password reset",
      );
    }

    return encodedRedirect(
      "success",
      "/forgot-password",
      "Check your email for reset instructions",
    );
  } catch (error) {
    console.error("Password reset process failed:", error);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "An unexpected error occurred"
    );
  }
};

export const resetPasswordAction = async (formData: FormData) => {
  try {
    const supabase = await createClient();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
      return encodedRedirect(
        "error",
        "/protected/reset-password",
        "Both password fields are required",
      );
    }

    if (password !== confirmPassword) {
      return encodedRedirect(
        "error",
        "/protected/reset-password",
        "Passwords do not match",
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error(`Password update failed [${error.code}]: ${error.message}`);
      return encodedRedirect(
        "error",
        "/protected/reset-password",
        "Failed to update password",
      );
    }

    return encodedRedirect(
      "success",
      "/protected/reset-password",
      "Password updated successfully",
    );
  } catch (error) {
    console.error("Password update process failed:", error);
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "An unexpected error occurred"
    );
  }
};

export const signOutAction = async () => {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/sign-in");
  } catch (error) {
    console.error("Logout failed:", error);
    return redirect("/sign-in?error=logout_failed");
  }
};