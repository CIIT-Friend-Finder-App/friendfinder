import { View, ScrollView, Text, StyleSheet, Pressable, TextInput, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

export default function CreateProfile() {
    const [loading, setLoading] = useState(true)
    const [nickname, setNickname] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    const [hobbies, setHobbies] = useState<string[]>([]);
    const [lf, setLF] = useState('');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const maxDate = new Date(2010, 11, 31);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate || birthday;
            toggleDatepicker();
            setBirthday(currentDate);
        } else {
            toggleDatepicker();
        }
    };

    const { session } = useAuth();

    useEffect(() => {
        if (session) getProfile()
    }, [session])
    async function getProfile() {
        try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`nickname, birthday, course, year, bio, interests, hobbies, lf`)
            .eq('id', session?.user.id)
            .single()
        if (error && status !== 406) {
            throw error
        }
        if (data) {
            setNickname(data.nickname)
            setBirthday(data.birthday ? new Date(data.birthday) : null);
            setCourse(data.course || '');
            setYear(data.year || '');
            setBio(data.bio || '')
            setInterests(data.interests || []); 
            setHobbies(data.hobbies || []); 
            setLF(data.lf || '')
        }
        } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message)
        }
        } finally {
        setLoading(false)
        }
    }

    async function updateProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
                
            // Validate required fields
            if (!nickname) {
                Alert.alert('Error', 'Nickname is required')
                return
            }

            // Define default values for pickers
            const defaultCourse = 'bmma-a'; // First course in the list
            const defaultYear = 'firstyr'; // First year in the list
            const defaultLF = 'studybuddy'; // First "Looking For" option

            // 🆕 Generate a unique avatar URL using the user's ID
            const avatarUrl = `https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${session.user.id}&scale=100`;

            // Prepare the update object with default values and the avatar URL
            const updates = {
                id: session.user.id,
                nickname,
                birthday: birthday ? birthday.toISOString().split('T')[0] : null, // Use date only
                course: course || defaultCourse, // Use selected course or default
                year: year || defaultYear, // Use selected year or default
                bio,
                interests: interests.filter(item => item.trim() !== ''), // Remove empty strings
                hobbies: hobbies.filter(item => item.trim() !== ''), // Remove empty strings
                lf: lf || defaultLF, // Use selected "Looking For" or default
                updated_at: new Date().toISOString(),
                avatar_url: avatarUrl // 🆕 Add the avatar URL to the updates object
            }

            console.log('Updating profile with:', updates)

            const { data, error } = await supabase
                .from('profiles')
                .upsert(updates)
                .select()

            if (error) {
                console.error('Supabase error details:', error)
                throw error
            }

            console.log('Profile update result:', data)
            Alert.alert('Success', 'Profile updated successfully!')
            router.replace('/(home)');
        } catch (error) {
            console.error('Full error:', error)
            Alert.alert(
                'Error', 
                error instanceof Error 
                    ? error.message 
                    : 'An unexpected error occurred while updating the profile'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style = {styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style = {styles.header}>
                    <Text style = {styles.heading}>Profile Creation</Text>
                    <Text style = {styles.subheading}>Let other users get to know you!</Text>
                </View>    
                <View style = {styles.form}>
                    <Text style = {styles.label}>Nickname</Text>
                    <TextInput 
                        placeholder = "Choose a name to hide your identity" 
                        style = {styles.input} 
                        value={nickname}
                        onChangeText={setNickname}>
                    </TextInput>
                    <Text style = {styles.label}>Birthday</Text>
                    {showPicker && (
                        <DateTimePicker 
                        maximumDate={maxDate}
                        mode="date" 
                        display="spinner" 
                        value={birthday || new Date()}
                        onChange={onChange}/>
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDatepicker}>
                            <TextInput 
                                placeholder="Sat January 01 2000"
                                style = {styles.input}
                                value={birthday ? birthday.toDateString() : ''}
                                placeholderTextColor={'grey'}
                                editable={false}>
                            </TextInput>
                        </Pressable>
                    )}

                    <View style = {styles.colcontainer}>
                        <View style = {styles.column}>
                            <Text style = {styles.label}>Course</Text>
                            <View style = {styles.picker}>
                                <Picker
                                    selectedValue = {course}
                                    onValueChange = {(itemValue, itemIndex) =>
                                    setCourse(itemValue)
                                }>
                                <Picker.Item label = "BMMA - Animation" value="bmma-a" style = {styles.pickeritem} />
                                <Picker.Item label = "BMMA - Graphic Design" value="bmma-gd" style = {styles.pickeritem} />
                                <Picker.Item label = "BMMA - Video and Film Production" value="bmma-fvp" style = {styles.pickeritem} />
                                <Picker.Item label = "BS - Computer Science" value="bscs" style = {styles.pickeritem} />
                                <Picker.Item label = "BS - Entrepreneurship" value="bsentrep" style = {styles.pickeritem} />
                                <Picker.Item label = "BS - Entertainment and Multimedia Computing" value="bsemc" style = {styles.pickeritem} />
                                <Picker.Item label = "BS - Information Systems" value="bsis" style = {styles.pickeritem} />
                                </Picker>
                            </View>
                        </View>
                        <View style = {styles.column}>
                            <Text style = {styles.label}>Year</Text>
                            <View style = {styles.picker}>
                                <Picker
                                    selectedValue = {year}
                                    onValueChange = {(itemValue, itemIndex) =>
                                    setYear(itemValue)
                                }>
                                <Picker.Item label = "First Year" value="firstyr" style = {styles.pickeritem} />
                                <Picker.Item label = "Second Year" value="secondyr" style = {styles.pickeritem} />
                                <Picker.Item label = "Third Year" value="thirdyr" style = {styles.pickeritem} />
                                <Picker.Item label = "Fourth Year" value="fourthyr" style = {styles.pickeritem} />
                                <Picker.Item label = "Irregular / Prefer not to say / Others" value="other" style = {styles.pickeritem} />
                                </Picker>
                            </View>
                        </View>
                    </View>


                    <Text style = {styles.label}>Bio (Optional)</Text>
                    <TextInput
                        placeholder= "Anything else you want people to know about you?"
                        style = {styles.input} 
                        multiline = {true}
                        value = {bio}
                        onChangeText= {setBio}>
                    </TextInput>
                    <Text style = {styles.label}>Interests</Text>
                    <TextInput
                        placeholder= "Let others know what you're interested in!"
                        style = {styles.input} 
                        multiline = {true}
                        value = {interests.join(', ')} 
                        onChangeText= {(text) => setInterests(text.split(',').map(item => item.trim()))}>
                    </TextInput>
                    <Text style = {styles.label}>Hobbies</Text>
                    <TextInput
                        placeholder= "Tell people about what you like to do in your free time!"
                        style = {styles.input} 
                        multiline = {true}
                        value = {hobbies.join(', ')} 
                        onChangeText= {(text) => setHobbies(text.split(',').map(item => item.trim()))}>
                    </TextInput>
                    <Text style = {styles.label}>Looking For:</Text>
                    <View style = {styles.picker}>
                        <Picker
                            selectedValue = {lf}
                            onValueChange = {(itemValue, itemIndex) =>
                            setLF(itemValue) // Use setLF directly
                        }>
                        <Picker.Item label = "A study buddy!" value="studybuddy" style = {styles.pickeritem} />
                        <Picker.Item label = "A roommate!" value="roommate" style = {styles.pickeritem} />
                        <Picker.Item label = "A food trip friend!" value="foodtripfriend" style = {styles.pickeritem} />
                        <Picker.Item label = "A gaming friend!" value="gamingfriend" style = {styles.pickeritem} />
                        <Picker.Item label = "All of the above! / Multiple" value="all" style = {styles.pickeritem} />
                        </Picker>
                    </View>
                </View>
                <View style = {styles.column}>
                    <Text style = {styles.coltext}>You can edit your profile again later on!</Text>
                    <Pressable 
                    style={styles.button} 
                    onPress={updateProfile} 
                    disabled={loading}><Text style = {styles.buttontext}>Finish Profile</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },

    /*for header*/

    header: {
        paddingTop: 50,

    },

    heading: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'HelveticaNeueHeavy'
    },

    subheading: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'HelveticaNeueRoman',
        fontStyle: 'italic',
        color: 'grey',
        paddingBottom: 10,
    },

    /*form*/

    form: {
        width: 320,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 3
    },

    label: {
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 14,
        paddingLeft: 5,
        paddingTop: 2,
    },

    input: {
        fontFamily: 'HelveticaNeueRoman',
        color: 'grey',
        fontSize: 10, 
        borderWidth: 1,
        borderColor: '#A8A8A9',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        lineHeight: 18,
    },

    picker: {
        borderWidth: 1,
        borderColor: '#A8A8A9',
        borderRadius: 15,
        margin: 10,
    },

    pickeritem: {
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 12,
    },

    colcontainer: {
        flexDirection: 'row',
        flex: 1,
    },
    column: {
        flex: 1,
    },

    coltext: {
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 12,  
        color: 'grey',
        textAlign: 'center',
        marginTop: 10, 
    },

    button: {
        width: '90%',
        backgroundColor: '#F82E4B',
        marginTop: 10,
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttontext: {
        color: 'white',
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 13
    },
});