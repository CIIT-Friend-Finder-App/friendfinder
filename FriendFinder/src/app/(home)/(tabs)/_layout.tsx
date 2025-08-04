import { Link, Redirect, Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { supabase } from "../../../lib/supabase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, View } from "react-native";

let loaded = false

export default function TabsNavigator() {
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

    return (
        <Tabs
        screenOptions={{
            tabBarActiveBackgroundColor: '#F83758',
            tabBarInactiveBackgroundColor: '#F83758',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: true,
            tabBarStyle: {
                height: 115,

            },
            tabBarIconStyle: {
                marginTop: 10,
            }

        }}>
            <Tabs.Screen 
                name="meet" 
                options={{
                    title: 'Meet', 
                    tabBarIcon: ({size, color, focused}) => (
                        <MaterialCommunityIcons name="cards-outline" size={24} color={focused ? 'white' : '#FCA5B4'} />
                    ),
                }}
            />
            <Tabs.Screen 
                
                name="chats" 
                options={{
                    title: 'Chats', 
                    tabBarIcon: ({size, color, focused}) => (
            
                    <Ionicons name="chatbubbles-sharp" size={24} color={focused ? 'white' : '#FCA5B4'} />
          
                    ),
                    headerRight: () => (
                        <Link href={'/(home)/chatreqs'} asChild>
                            <Pressable>
                                <AntDesign 
                                name="pluscircle" 
                                size={24} 
                                color="#F83758" 
                                style={{marginRight: 15}} 
                                />
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen 
                name="requests" 
                options={{
                    title: 'Requests', 
                    tabBarIcon: ({size, color, focused}) => (
                    <Ionicons name="notifications-sharp" size={24} color={focused ? 'white' : '#FCA5B4'} />
                    ),
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: 'Account', 
                    tabBarIcon: ({size, color, focused}) => (
                    <FontAwesome5 name="user-alt" size={24} color={focused ? 'white' : '#FCA5B4'} />
                    ),
                }}
            />
        </Tabs>
    );
}