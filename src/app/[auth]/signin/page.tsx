'use client';

import { useSession,signIn,signOut } from "inspector/promises";

export default function Component() {

    const { data:Session }= useSession();
    if (session){
        return (
            <>
            {Session.user.email}
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}