import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Alert } from "react-native";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { UserData } from "@/types/user";
interface AuthContextType {
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
    dob: string
  ) => Promise<string | null>;
  signOut: () => Promise<void>;
  user: User | null;
  userData: UserData | null;
  session: Session | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchUserData = useCallback(async (userId: string) => {
    if (!userId) return;

    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_uid", userId)
        .maybeSingle();

      if (userError) {
        console.error("Error fetching user data:", userError);
        return;
      }

      if (!userData) {
        console.warn("User data not found for auth_uid:", userId);
        return;
      }

      console.log("Fetched user data:", userData);
      setUserData(userData);
    } catch (err) {
      console.error("Unexpected error fetching user data:", err);
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    if (user?.id) {
      await fetchUserData(user.id);
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        }

        if (data.session && isMounted) {
          setSession(data.session);
          setUser(data.session.user);
          await fetchUserData(data.session.user.id);
        } else if (isMounted) {
          setSession(null);
          setUser(null);
          setUserData(null);
        }
      } catch (err) {
        console.error("Unexpected error initializing session:", err);
      }

      if (isMounted) {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.id);

        if (isMounted) {
          setSession(newSession);
          setUser(newSession?.user ?? null);

          if (newSession?.user && (!user || newSession.user.id !== user.id)) {
            await fetchUserData(newSession.user.id);
          } else if (!newSession) {
            setUserData(null);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [fetchUserData]);

  async function signUpWithEmail(
    name: string,
    email: string,
    password: string,
    dob: string
  ) {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error("Signup error:", error);
        setLoading(false);
        return error.message;
      }

      const { user } = data;
      if (!user) {
        setLoading(false);
        return "User signup successful, but no user data returned.";
      }

      const { error: insertError } = await supabase.from("users").insert([
        {
          auth_uid: user.id,
          name,
          email,
          password,
          dob,
        },
      ]);

      if (insertError) {
        console.error("Error inserting user data:", insertError);
        setLoading(false);
        return insertError.message || "Failed to store user data";
      }

      setUser(user);
      await fetchUserData(user.id);

      setLoading(false);
      return null;
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      setLoading(false);
      return "An unexpected error occurred";
    }
  }

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Authentication error:", error);
        setLoading(false);
        return error.message;
      }

      const { user } = data;
      if (!user) {
        setLoading(false);
        return "User ID not found";
      }

      setLoading(false);
      return null; // No error
    } catch (err) {
      console.error("Unexpected error during signin:", err);
      setLoading(false);
      return "An unexpected error occurred";
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert("Error", error.message);
        console.error(error);
      }
    } catch (err) {
      console.error("Unexpected error during signout:", err);
      Alert.alert("Error", "Failed to sign out");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signUpWithEmail,
        signInWithEmail,
        signOut,
        user,
        userData,
        session,
        loading,
        refreshUserData,
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
