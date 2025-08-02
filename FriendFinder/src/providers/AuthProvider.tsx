import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, use, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AuthContext = {
    session: Session | null;
    user: User | null;
}

const AuthContext = createContext({
    session: null,
    user: null,
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() =>{
    if (!session?.user) {
        return;
    }

    const fetchProfile = async () => {
        
    }

    fetchProfile();
  }, [session?.user])
  
    return (
        <AuthContext.Provider value={{ session, user: session?.user }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);