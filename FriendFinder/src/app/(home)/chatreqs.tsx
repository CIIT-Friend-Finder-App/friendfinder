import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import UserListItem from "../../components/UserListItem";

export default function UsersScreen() {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        // Only run if the user object is not null
        if (user) { 
            const fetchUsers = async () => {
                let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('id', user.id);
                
                if (error) {
                    console.error('Error fetching profiles:', error.message);
                    return;
                }
                
                setUsers(profiles);
                console.log('Fetched profiles:', profiles)
            };

            fetchUsers();
        }
    }, [user]); // Add 'user' as a dependency

    return (
        <FlatList 
        data={users} 
        contentContainerStyle={{gap: 5}}
        renderItem={({ item }) => <UserListItem user={item} />} 
        />      
    )
}