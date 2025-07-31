import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsNavigator() {
    return (
        <Tabs
        screenOptions={{
            tabBarActiveBackgroundColor: '#F83758',
            tabBarInactiveBackgroundColor: '#F83758',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: true,
        }}>
            <Tabs.Screen 
                name="index" 
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
                    title: 'Profile', 
                    tabBarIcon: ({size, color, focused}) => (
                    <FontAwesome5 name="user-alt" size={24} color={focused ? 'white' : '#FCA5B4'} />
                    ),
                }}
            />
        </Tabs>
    );
}