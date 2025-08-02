import { View, Text, StyleSheet } from "react-native"


const UserListItem =  ({ user }) => {
    return (
        <View style = {styles.userlist}>
            <Text style = {styles.user}>{user.nickname}</Text>
        </View>
    )
}

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