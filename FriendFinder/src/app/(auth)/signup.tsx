import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Button, AppState, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import { Redirect } from 'expo-router';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
    const [ciitEmail, setCiitEmail] = useState('');
    const [fullName, inputFullName] = useState('');
    const [nickname, inputNickname] = useState('');
    const [pronouns, inputPronouns] = useState('');
    const [gender, inputGender] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tnc, inputTnc] = useState(false);
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
        setLoading(true)
        const {
        data: { session },
        error,
        } = await supabase.auth.signUp({
        email: ciitEmail,
        password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
        return <Redirect href={'/(auth)/login'}/>;
    }

    return (
        <View style = {styles.container}>
            { /* HEADER */}
            <View style = {styles.header}>
                <Text style = {styles.signupHeading}>Sign Up</Text>
                <Text style = {styles.signupSubheading}>Find and connect with other CIITzens today!</Text>
            </View>
            { /* SIGN UP FIELDS */}
            <ScrollView style = {styles.signupFormContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style = {styles.signupForm}>
                    <Text style = {styles.fieldTitle}>CIIT Email Address</Text>
                    <TextInput
                        placeholder = "@ciit.edu.ph"
                        style = {styles.inputFields}
                        value = {ciitEmail}
                        onChangeText={(ciitEmail) => setCiitEmail(ciitEmail)}
                    />
                    <Text style = {styles.fieldTitle}>Full Name</Text>
                    <TextInput
                        placeholder = "First Name, Surname"
                        style = {styles.inputFields}
                        value = {fullName}
                        onChangeText={inputFullName}
                    />
                    <Text style = {styles.fieldTitle}>Preferred Name</Text>
                    <TextInput
                        placeholder = "Name or nickname"
                        style = {styles.inputFields}
                        value = {nickname}
                        onChangeText={inputNickname}
                    />

                    <View style={{ flexDirection: 'row', flex: 1, gap: 8}}>
                    
                        <View style={{ flex: 1 }}>
                            <Text style={styles.fieldTitle}>Pronouns</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                selectedValue={pronouns}
                                onValueChange={inputPronouns}
                                style={styles.picker}
                               
                                >
                                <Picker.Item label="She/Her" value="she" style={styles.picker}/>
                                <Picker.Item label="He/Him" value="he" style={styles.picker}/>
                                <Picker.Item label="They/Them" value="they" style={styles.picker}/>
                                <Picker.Item label="Other" value="other" style={styles.picker}/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.fieldTitle}>Gender</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                selectedValue={gender}
                                onValueChange={inputGender}
                                style={styles.picker}
                               
                                >
                                <Picker.Item label="Female" value="female" style={styles.picker}/>
                                <Picker.Item label="Male" value="male" style={styles.picker}/>
                                <Picker.Item label="Nonbinary" value="nonbinary" style={styles.picker}/>
                                <Picker.Item label="Prefer not to say" value="none" style={styles.picker}/>
                                </Picker>
                            </View>
                        </View>
                    </View>



                    <Text style = {styles.fieldTitle}>Password</Text>
                    <TextInput
                        placeholder = "***"
                        style = {styles.inputFields}
                        value = {password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry
                    />

                    <View style={{ flexDirection: 'row', marginRight: 40, marginTop: 10}}>
                        <Checkbox
                            status={tnc ? 'checked' : 'unchecked'}
                            onPress={() => {
                            inputTnc(!tnc);
                            }}
                        />
                        <Text>I agree to the <Text style ={{color: '#F83758', textDecorationLine: 'underline'}}>Terms & Conditions</Text> and the <Text style ={{color: '#F83758', textDecorationLine: 'underline'}}>Privacy Policy</Text>.</Text>
                    </View>
                </View>
            </ScrollView>

            <View style = {styles.footer}>
                
                    <Pressable style = {styles.signupBtn} disabled={loading} onPress={() => signUpWithEmail()} ><Text style = {styles.txtSignupBtn}>Submit</Text></Pressable>
            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F3F3F3'
    },
    header: {
        paddingTop: 50
        

        
    },
    signupHeading: {
        fontFamily: 'HelveticaNeueHeavy',
        fontSize: 30,
        textAlign: 'center'

    },
    signupSubheading: {
        fontSize: 15,
        fontFamily: 'HelveticaNeueRoman',
        paddingBottom: 10,
        color: 'grey',
        fontStyle: 'italic'
    },
    fieldTitle: {
        fontFamily: 'HelveticaNeueRoman',
        marginTop: 2,
        marginBottom: 5
    },
    signupFormContainer: {
        width: 320,
        margin: 10,
        flexGrow: 1,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
                shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 3,
        backgroundColor: 'white',   
    },
    signupForm: {
        alignContent: 'center',
     
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#A8A8A9',
        borderRadius: 15,
        height: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        marginBottom: 4,

    },
    picker: {
        fontSize: 12,
        color: 'grey',
        fontFamily: 'HelveticaNeueRoman',
    },
    inputFields: {

        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#A8A8A9',
        borderRadius: 15,
        fontFamily: 'HelveticaNeueRoman',
        color: 'grey',
        fontSize: 10, 
        marginBottom: 10,
        paddingLeft: 18,
        height: 40
        
    },
    footer: {
        
        width: '100%',
        alignItems: 'center'
    },
    txtSignupBtn: {
        color: 'white',
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 13
    },
    signupBtn: {
        width: '50%',
        backgroundColor: '#F82E4B',
        marginTop: 20,
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
        marginBottom: 30,
    },

});