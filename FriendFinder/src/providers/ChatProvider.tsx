import { PropsWithChildren, use, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);


export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);


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
            <Chat client={client}>{children}</Chat>
        </OverlayProvider>
    );
}