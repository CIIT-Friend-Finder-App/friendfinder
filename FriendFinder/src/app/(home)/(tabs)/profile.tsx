import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { useAuth } from '../../../providers/AuthProvider'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    const { session } = useAuth();
    const { profile } = useAuth();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true)
    const [visible, changeVisibility] = useState(false);
    const toggleDelete = () => {
        changeVisibility(!visible);
    };

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
      }
    } finally {
      setLoading(false)
    }
  }


  return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {{fontFamily: 'HelveticaNeueHeavy', fontSize: 30}}>Account</Text>
            </View>
            <View style = {styles.profile}>
                <View style = {styles.pfp}><Text></Text></View>
                <Text style = {{fontFamily: 'HelveticaNeueHeavy', fontSize: 20}}>{profile.nickname}</Text>
                <Text style = {{fontStyle: 'italic', fontFamily: 'HelveticaNeueRoman', color: '#808080'}}>{user.email}</Text>
            </View>
            <View style = {styles.settings}>
                <Text style = {{fontFamily: 'HelveticaNeueHeavy', fontSize: 18, paddingBottom: 25}}>Settings</Text>
                <Pressable style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style = {styles.settingsLabel}>Profile Preview</Text>
                    <AntDesign name="right" size={15} color="black" margin={4}/>
                </Pressable>
                <View style={styles.line}></View>
                <Pressable style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style = {styles.settingsLabel}>Help</Text>
                    <AntDesign name="right" size={15} color="black" margin={4}/>
                </Pressable>
                <View style={styles.line}></View>
                <Pressable onPress={() => supabase.auth.signOut()} style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style = {styles.settingsLabel}>Log Out</Text>
                    <MaterialIcons name="logout" size={15} color="black" margin={4} />
                </Pressable>
                <View style={styles.line}></View>
                <Pressable onPress={toggleDelete} style = {{flexDirection: 'row', justifyContent: 'space-between'}} >
                    <Text style = {styles.deleteLabel}>Delete Account</Text>
                </Pressable>
                <View style={styles.line}></View>
                <Modal transparent={true} visible={visible} onRequestClose={toggleDelete}>
                    <View style = {styles.overlay}>
                        <TouchableOpacity style = {{position: 'absolute', top: 0,  bottom: 0, left: 0, right: 0}} onPress={toggleDelete} />
                        <View style = {styles.deleteConfirmation}>
                            <Text style = {{fontFamily: 'HelveticaNeueHeavy', textAlign: 'center', fontSize: 15}}>Are you sure you want to delete account?</Text>
                            <Text style = {{fontFamily: 'HelveticaNeueRoman', textAlign: 'center', fontSize: 12}}>This will permanently delete your account and cannot be undone.</Text>
                            <View style = {{gap: 7, marginTop: 10}}>
                                <Pressable onPress={toggleDelete} style = {styles.deleteButton}><Text style = {{fontFamily: 'HelveticaNeueRoman', color: 'white', textAlign: 'center', fontSize: 12, fontWeight: 700}}>Yes, delete my account.</Text></Pressable>
                                <Pressable onPress={toggleDelete} style = {styles.cancelDelete}><Text style = {{fontFamily: 'HelveticaNeueRoman', color: 'black', textAlign: 'center', fontSize: 12, fontWeight: 700}}>Keep my account.</Text></Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        padding: 20,
        alignItems: 'center'
    },
    header: {
        height: 100,
        padding: 20,
        width: '100%'
    },
    navbar: {
        position: 'absolute',
        backgroundColor: '#F83758',
        width: '115%',
        bottom: 0,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
       
        
    },
    selectedNav: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
     
   
    },
    profile: {
        alignItems: 'center',
        height: 200,
        
        
    },
    pfp: {
        backgroundColor: 'pink',
        height: 80,
        width: 80,
        borderRadius: 50,
        marginBottom: 10
    },
    settings: {
        width: 320,

    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 17,
        width: 320
    },
    settingsLabel: {
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 15,
        marginTop: 6

    },
    deleteLabel: {
        fontFamily: 'HelveticaNeueRoman',
        fontSize: 15,
        color: 'red',
        marginTop: 6
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteConfirmation: {
        backgroundColor: 'white',
        width: 250,
        height: 200,
        borderRadius: 30,
        zIndex: 10,
        padding: 30,
        gap: 10

    },
    deleteButton: {
        width: '100%',
        backgroundColor: '#F83758',
        height: 30,
        justifyContent: 'center',
        borderRadius: 30,
    },
    cancelDelete: {
        width: '100%',
        backgroundColor: '#ebebebff',
        height: 30,
        justifyContent: 'center',
        borderRadius: 30,
    }
})