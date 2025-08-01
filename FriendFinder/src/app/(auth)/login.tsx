import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Text, TextInput, Pressable } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { Redirect } from 'expo-router'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
        Alert.alert(error.message)
        setLoading(false)
        return
    } 
    if(user) {
        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                })
            if (profileError) {
               Alert.alert('Profile Creation Error', profileError.message)
            } else {
                Alert.alert('Sign Up Successful', 'Your account has been created!')
            }
        } catch (insertError) {
            console.error('Profile insertion error:', insertError)
            Alert.alert('Error', 'Could not create user profile')
        } 
    }
    setLoading(false) 
  }

    return (
      <View style = {styles.container}>

        <View style = {styles.header}>
          <Text style = {styles.logInHeading}>Login</Text>
          <Text style = {styles.logInSubHeading}>Welcome back!</Text>
        </View>

        {/* ====== INPUT FIELDS ====== */}
        <View style = {styles.inputFields}>
          <TextInput 
            placeholder = "Email"
            style = {styles.input}
            value = {email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput 
            placeholder = "Password"
            style = {styles.input}
            value = {password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Pressable style = {styles.logInBtn} onPress={() => signInWithEmail()} ><Text style = {styles.txtLogInBtn}>Log In</Text></Pressable>
          <Text style = {styles.orText}>OR</Text>
          <Pressable style = {styles.logInBtn} onPress={() => signUpWithEmail()} ><Text style = {styles.txtLogInBtn}>Sign Up</Text></Pressable>
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
    backgroundColor: 'white'
  },
  header: {
    flex: 2.3,
    padding: 10,
    justifyContent: 'center',
    marginBottom: -20,
  },
  logInHeading: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'HelveticaNeueHeavy',
    marginBottom: -5
  },
  logInSubHeading: {
    fontSize: 15,
    fontFamily: 'HelveticaNeueRoman'
  },
  inputFields: {
    flex: 2.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    
  },

  input: {
    borderWidth: 1,
    borderColor: '#A8A8A9',
    padding: 12,
    paddingLeft: 18,
    borderRadius: 30,
    width: '80%',
    backgroundColor: '#F3F3F3',
    marginBottom: 10,
    fontFamily: 'HelveticaNeueRoman',
    fontSize: 13
  },
  logInBtn: {
    width: '80%',
    backgroundColor: '#F82E4B',
    marginTop: 20,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    
  },
  txtLogInBtn: {
    color: 'white',
    fontFamily: 'HelveticaNeueRoman',
    fontSize: 13
  },

  orText: {
    marginTop: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeueRoman',
    fontSize: 10,
  },
});