// ...
import type { AuthProvider, SupportedAuthProvider } from '@toolpad/core';
import { SignInPage } from '@toolpad/core/SignInPage';
import { AuthError } from 'next-auth';
import { providers, signIn } from '../../../auth';

const providerMap: AuthProvider[] = providers.map((provider: any) => ({
    id: provider.id as SupportedAuthProvider,
    name: provider.name as string,
}));


export default function SignIn() {
    
    return (
        <SignInPage
            providers={providerMap}
            signIn={async (
                provider: AuthProvider,
                formData: FormData,
                callbackUrl?: string,
        ) => {
            'use server';
            try {
            return await signIn(provider.id, {
                ...
                (formData && {
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
                    redirectTo: callbackUrl ?? '/',
            });
            } catch (error) {
            if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
                throw error;
            }
            if (error instanceof AuthError) {
                return {
                error:
                    error.type === 'CredentialsSignin'
                    ? 'Invalid credentials.'
                    : 'An error with Auth.js occurred.',
                type: error.type,
                };
            }
            return {
                error: 'Something went wrong.',
                type: 'UnknownError',
            };
            
            }
        }}
        />
    );
}
