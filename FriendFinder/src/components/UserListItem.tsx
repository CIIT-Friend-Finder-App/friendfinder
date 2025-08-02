import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useChatContext } from "stream-chat-expo"
import { useAuth } from "../providers/AuthProvider";


const UserListItem =  ({ user }) => {
    const { client} = useChatContext();
    const { user: me } = useAuth();


    const onPress = async () => {
        const channel = client.channel('messaging', {
            members: [me.id, user.id]
        });
        await channel.watch();
        router.replace(`/(home)/channel/'${channel.cid}`);
    };

    return (
        <Pressable onPress={onPress} style = {styles.userlist}>
            <Text style = {styles.user}>{user.nickname}</Text>
        </Pressable>
    )
};

export default UserListItem;


const styles = StyleSheet.create({
    userlist: {
        padding: 20,
        backgroundColor: 'white',
    },

    user: {
        fontWeight: 'bold',
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 16,
    }
});