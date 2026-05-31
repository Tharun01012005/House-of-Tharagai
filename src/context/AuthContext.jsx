import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);
const SESSION_KEY = "tharagai_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRef = useRef(null);

  // Keep ref in sync with state
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          loadUserProfile(parsed.id);
          return;
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      // Fetch from users table
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      } else {
        // Also get email from login_credentials
        const { data: creds } = await supabase
          .from("login_credentials")
          .select("email")
          .eq("id", userId)
          .single();

        setUser({
          ...profile,
          email: creds?.email || "",
        });
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = useCallback(async (payload) => {
    const { name, email, phone, password } = payload;

    // 1. Insert into login_credentials
    const { data: cred, error: credError } = await supabase
      .from("login_credentials")
      .insert({ email: email.toLowerCase(), password })
      .select()
      .single();

    if (credError) {
      if (credError.code === "23505") {
        throw new Error("An account with this email already exists");
      }
      throw new Error(credError.message || "Registration failed");
    }

    // 2. Insert into users table with the same id
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .insert({
        id: cred.id,
        name,
        phone,
      })
      .select()
      .single();

    if (profileError) {
      // Cleanup: remove the credential we just created
      await supabase.from("login_credentials").delete().eq("id", cred.id);
      throw new Error(profileError.message || "Registration failed");
    }

    const fullUser = { ...profile, email };
    setUser(fullUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: cred.id }));
    return fullUser;
  }, []);

  // LOGIN
  const login = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase
      .from("login_credentials")
      .select("id, email")
      .eq("email", email.toLowerCase())
      .eq("password", password)
      .single();

    if (error || !data) {
      throw new Error("Invalid email or password");
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.id)
      .single();

    if (profileError) {
      throw new Error("Account found but profile is missing");
    }

    const fullUser = { ...profile, email: data.email };
    setUser(fullUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: data.id }));
    return fullUser;
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  // REFRESH
  const refreshUser = useCallback(async () => {
    const currentUser = userRef.current;
    if (!currentUser?.id) return null;
    await loadUserProfile(currentUser.id);
    return userRef.current;
  }, []);

  // UPDATE PROFILE
  const updateProfile = useCallback(
    async (payload) => {
      const currentUser = userRef.current;
      if (!currentUser?.id) {
        throw new Error("Unauthorized");
      }

      const { data, error } = await supabase
        .from("users")
        .update(payload)
        .eq("id", currentUser.id)
        .select()
        .single();

      if (error) throw error;

      const updated = { ...data, email: currentUser.email };
      setUser(updated);
      return updated;
    },
    []
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading: loading,
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
    }),
    [user, loading, login, register, logout, refreshUser, updateProfile]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}