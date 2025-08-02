import { Redirect, Slot } from 'expo-router';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';
import React, { use, useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import finish from '../(home)/profilepreview';


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

  // Fallback for when there's no user.
 
    return (
        <ChatProvider>
            <Slot>
            </Slot>
        </ChatProvider>

    );
}