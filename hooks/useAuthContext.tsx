import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { UserData } from "@/types/user";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
    dob: string
  ) => Promise<string | null>;
  signInWithGoogle: () => Promise<string | null>;
  signOut: () => Promise<void>;
  user: User | null;
  userData: UserData | null;
  session: Session | null;
  loading: boolean;
  supabase: typeof supabase;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          await fetchUserData(data.session.user.id);
        } else {
          setSession(null);
          setUser(null);
          setUserData(null);
        }
      } catch (err) {
        console.error("Unexpected error initializing session:", err);
      }

      setLoading(false);
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          if (event === 'SIGNED_IN') {
            console.log("User signed in, checking if profile exists");
            
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("auth_uid", session.user.id)
              .maybeSingle();
            
            if ((!data && !error) || error) {
              console.log("Creating new user profile for OAuth user");
              
              const userEmail = session.user.email || '';
              const userName = session.user.user_metadata?.full_name || 'User';
              const currentDate = new Date().toISOString().split("T")[0];
              
              const randomPassword = Math.random().toString(36).slice(-12);
              
              const { error: insertError } = await supabase.from("users").insert([
                {
                  auth_uid: session.user.id,
                  name: userName,
                  email: userEmail,
                  password: randomPassword,
                  dob: currentDate,
                  role: 1, 
                  created_at: new Date().toISOString()
                },
              ]);
              
              if (insertError) {
                console.error("Error creating user profile for OAuth user:", insertError);
              } else {
                console.log("Successfully created user profile for OAuth user");
              }
            } else {
              console.log("User profile already exists");
            }
          }
          
          await fetchUserData(session.user.id);
        } else {
          setUserData(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  async function fetchUserData(userId: string) {
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
      setUserData(userData); // Simplified: directly set the data
    } catch (err) {
      console.error("Unexpected error fetching user data:", err);
    }
  }


  async function signUpWithEmail(
    name: string,
    email: string,
    password: string,
    dob: string
  ) {
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
        role: 1,
        created_at: new Date().toISOString()
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
  }

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Authentication error:", error);
      setLoading(false);
      return error.message;
    }

    const userId = data?.user?.id;
    if (!userId) {
      console.error("No user ID found after authentication");
      setLoading(false);
      return "User ID not found";
    }

    setUser(data.user);
    await fetchUserData(userId);

    setLoading(false);
    return null; // No error
  }

  async function signInWithGoogle() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: Platform.select({
            native: 'kin://auth/callback',
            default: undefined
          }),
          skipBrowserRedirect: Platform.OS === 'web' ? false : true,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
  
      if (error) {
        console.error("Google sign-in error:", error);
        setLoading(false);
        return error.message;
      }
  
      if (Platform.OS !== 'web') {
        if (data?.url) {
          const result = await WebBrowser.openAuthSessionAsync(
            data.url,
            'kin://auth/callback'
          );
          
          if (result.type === 'success') {
            const url = result.url;
            console.log("Auth successful, URL:", url);
          } else {
            console.log("Auth was dismissed or failed:", result.type);
            return "Authentication was cancelled";
          }
        }
      }
  
      setLoading(false);
      return null;
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err);
      setLoading(false);
      return "An unexpected error occurred";
    }
  }

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
      console.error(error);
    } else {
      setUser(null);
      setUserData(null);
      setSession(null);
    }
    setLoading(false);
  }


  return (
    <AuthContext.Provider
      value={{
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        user,
        userData,
        session,
        loading,
        supabase,
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