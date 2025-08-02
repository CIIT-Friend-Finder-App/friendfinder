import { PropsWithChildren, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);


export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { profile } = useAuth();
 
    useEffect(() => { 
        if (!profile) {
            return;
        }
        const connect = async () => {
            await client.connectUser(
                {
                    id: profile.id,
                    name: profile.nickname, // Or a username from your profiles table
                    // image: 'https://i.imgur.com/fR9Jz14.png',
                },
                // In production, you should generate a user token on your backend
                // and fetch it here instead of using a dev token.
                client.devToken(profile.id)
            );
            setIsReady(true);
        };
 
        connect();
 
        return () => {
            // on component unmount, or when the user logs out
            client.disconnectUser();
            setIsReady(false);
        };
    }, [profile?.id]); // Re-run the effect when the user ID changes

    if (!isReady) {
        return <ActivityIndicator/ >;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>{children}</Chat>
        </OverlayProvider>
    );
}