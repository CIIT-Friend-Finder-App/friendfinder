import { Stack } from 'expo-router';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';

const client = StreamChat.getInstance('ehp59nmz9q48');

export default function HomeLayout() {

    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            </Stack>
        </ChatProvider>

    );
}