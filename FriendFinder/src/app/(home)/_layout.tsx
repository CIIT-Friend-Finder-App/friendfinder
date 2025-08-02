import { Redirect, Slot, Stack } from 'expo-router';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';


const client = StreamChat.getInstance('ehp59nmz9q48');

export default function HomeLayout() {
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

    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name ="(tabs)" options={{headerShown: false}} />
            </Stack>
        </ChatProvider>
    );
}