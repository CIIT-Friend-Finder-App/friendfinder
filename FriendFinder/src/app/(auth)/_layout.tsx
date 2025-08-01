import { Redirect, Slot } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AuthLayout() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("nickname") // Assuming this is your flag
          .eq("id", user.id)
          .single();

        if (error) {
          setProfile(null);
        } else {
          setProfile(data);
        }
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  if (loading || !user) {
    return <Slot />;
  }

  // Check if the user exists and has NOT completed their profile.
  if (user && !profile?.nickname) {
    // Redirect to the create profile page
    return <Redirect href="/(home)/createprofile" />; 
  }

  // If the user exists AND HAS completed their profile, redirect to the home page.
  if (user && profile?.nickname) {
    return <Redirect href="/(home)/" />;
  }

  // Fallback for when there's no user.
  return <Slot />;
}