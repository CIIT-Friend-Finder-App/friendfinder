import { Slot, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance('ehp59nmz9q48');

export default function HomeLayout() {

    useEffect(() => {
    const connect = async () => {
        // Only connect if a user is not already connected
        if (!client.user) {
        await client.connectUser(
            {
            id: 'test',
            name: 'John Doe',
            image: 'https://i.imgur.com/fR9Jz14.png',
            },
            client.devToken('test')
        );
        // commented out channel to avoid duplicate creation
        //const channel = client.channel('messaging', 'test', {
        //    name: 'Test',
        //});
        //await channel.watch();
        }
    };

    connect();
    }, []);

    return (
        <OverlayProvider>
            <Chat client={client}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                </Stack>
            </Chat>
        </OverlayProvider>
    );
}