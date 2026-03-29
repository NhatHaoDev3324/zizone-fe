'use client'
import { use } from 'react';
import FormSignIn from '@/components/forms/FormSignIn';
import FormSignUp from '@/components/forms/FormSignUp';
import FormForgotPassword from '@/components/forms/FormForgotPassword';
import FormResetPassword from '@/components/forms/FormResetPassword';
import { notFound } from 'next/navigation';
import { PATH } from '@/config/path';


interface AuthenticationClientProps {
    params: Promise<{
        route: "sign-in" | "sign-up" | "forgot-password" | "reset-password";
    }>;
}

export default function AuthenticationClient({ params }: AuthenticationClientProps) {
    const { route } = use(params);
    const signInRoute = PATH.SIGN_IN.replace("/", "");
    const signUpRoute = PATH.SIGN_UP.replace("/", "");
    const forgotPassRoute = PATH.FORGOT_PASSWORD.replace("/", "");
    const resetPassRoute = PATH.RESET_PASSWORD.replace("/", "");

    const validRoutes = [signInRoute, signUpRoute, forgotPassRoute, resetPassRoute];
    if (!validRoutes.includes(route)) {
        notFound();
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col justify-center items-center px-4 pb-8 md:px-8 rounded-xl backdrop-blur-3xl border bg-muted/20 pt-8">
                {route === signInRoute && <FormSignIn />}
                {route === signUpRoute && <FormSignUp />}
                {route === forgotPassRoute && <FormForgotPassword />}
                {route === resetPassRoute && <FormResetPassword />}
            </div>
        </div>
    );
}
