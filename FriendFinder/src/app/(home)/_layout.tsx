import { Redirect, Stack } from 'expo-router';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';
import { use } from 'react';
import { useAuth } from '../../providers/AuthProvider';

const client = StreamChat.getInstance('ehp59nmz9q48');

export default function HomeLayout() {

    const { user } = useAuth();

    if (!user) {
        return <Redirect href="/(auth)" />; 
    }

    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            </Stack>
        </ChatProvider>

    );
}