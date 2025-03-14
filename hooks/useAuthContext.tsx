import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

interface AuthContextType {
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: AuthError | null }>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
    dob: string
  ) => Promise<{ data: any; error: AuthError | PostgrestError | null }>;
  signOut: () => Promise<void>;
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function signUpWithEmail(
    name: string,
    email: string,
    password: string,
    dob: string
  ) {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Error", error.message);
      console.error(error);
      setLoading(false);
      return { data: null, error }; // No casting needed
    }

    const { user } = data;
    const { error: insertError } = await supabase.from("users").insert([
      {
        auth_uid: user?.id,
        name,
        email,
        password,
        dob,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user data:", insertError);
      setLoading(false);
      return { data: null, error: insertError }; // No casting needed
    }

    setLoading(false);
    return { data, error: null };
  }

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    return { data, error };
  }

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signUpWithEmail,
        signInWithEmail,
        signOut,
        user,
        session,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
