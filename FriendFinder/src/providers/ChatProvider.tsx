import { PropsWithChildren, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);


export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        let isMounted = true;
        const connect = async () => {
            // Only connect if a user is not already connected
            if (!client.user) {
                try {
                    await client.connectUser(
                        {
                        id: 'test',
                        name: 'John Doe',
                        image: 'https://i.imgur.com/fR9Jz14.png',
                        },
                        client.devToken('test')
                    );
                    if (isMounted) {
                        setIsReady(true);
                    }
                    
                    // commented out channel to avoid duplicate creation
                    //const channel = client.channel('messaging', 'test', {
                    //    name: 'Test',
                    //});
                    //await channel.watch();
                } catch (e) {
                    console.error("Error connecting user:", e);
                }
            }
        };

        connect();

        return() => {
            isMounted = false;
            if (client.user) {
                client.disconnectUser();
                setIsReady(false);
            }
        };

    }, []);

    if (!isReady) {
        return <ActivityIndicator/ >;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>{children}</Chat>
        </OverlayProvider>
    );
}