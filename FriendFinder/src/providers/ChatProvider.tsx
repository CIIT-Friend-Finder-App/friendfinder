import { PropsWithChildren, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);


export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { user } = useAuth();
 
    useEffect(() => {
        if (!user) {
            return;
        }
 
        const connect = async () => {
            await client.connectUser(
                {
                    id: user.id,
                    name: user.email, // Or a username from your profiles table
                    // image: 'https://i.imgur.com/fR9Jz14.png',
                },
                // In production, you should generate a user token on your backend
                // and fetch it here instead of using a dev token.
                client.devToken(user.id)
            );
            setIsReady(true);
        };
 
        connect();
 
        return () => {
            // on component unmount, or when the user logs out
            client.disconnectUser();
            setIsReady(false);
        };
    }, [user?.id]); // Re-run the effect when the user ID changes

    if (!isReady) {
        return <ActivityIndicator/ >;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>{children}</Chat>
        </OverlayProvider>
    );
}