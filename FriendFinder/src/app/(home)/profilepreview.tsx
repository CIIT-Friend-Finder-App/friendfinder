import { View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import { useState } from 'react';

export default function ProfilePreview() {
    return (
        <View style = {styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style = {styles.header}>
                    <Text style = {styles.heading}>Profile Preview</Text>
                    <Text style = {styles.subheading}>Here's what you'll look like to other users</Text>
                    <View style = {styles.card}>
                        <Text style = {styles.nickname}>Nickname, <Text style = {styles.age}>19</Text></Text>
                        <View style = {styles.bioContain}>
                            <Text style = {styles.bio}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Text>
                        </View>
                        <Text style = {styles.labels}>About Me</Text>
                        <View style = {styles.aboutmecontain}>
                            <View style = {styles.aboutmeparent}>
                                <Text style = {styles.aboutmechild}>She/Her</Text>
                            </View>
                            <View style = {styles.aboutmeparent}>
                                <Text style = {styles.aboutmechild}>Second Year</Text>
                            </View>
                            <View style = {styles.aboutmeparent}>
                                <Text style = {styles.aboutmechild}>BMMA - Graphic Design</Text>
                            </View>
                        </View>
                        <View style = {styles.bioContain}>
                            <Text style = {styles.labels}>Interests</Text>
                            <Text style = {styles.bio2}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                        </View>
                        <View style = {styles.bioContain}>
                            <Text style = {styles.labels}>Hobbies</Text>
                            <Text style = {styles.bio2}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                        </View>
                        <View style = {styles.bioContain}>
                            <Text style = {styles.labels}>Looking For</Text>
                            <Text style = {styles.bio2}>
                                Looking for a study buddy!
                            </Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.colcontainer}>
                    <View style = {styles.column}>
                        <Pressable style = {styles.button} onPress={() => goTo('createprofile')} ><Text style = {styles.buttontext}>Edit</Text></Pressable>
                    </View>
                    <View style = {styles.column}>
                        <Pressable style = {styles.button} onPress={() => finish()} ><Text style = {styles.buttontext}>Finish Profile</Text></Pressable>
                    </View>
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

    /*preview*/

    card: {
        width: 320,
        backgroundColor: '#FFD6EA',
        margin: 10,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#B3B3B3',
        borderStyle: 'solid',
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 3
    },

    nickname: {
        textAlign: 'center',
        fontFamily: 'HelveticaNeueHeavy',
        color: '#B3B3B3',
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 2,
    },

    age: {
        fontSize: 14,
        fontFamily: 'HelveticaNeueHeavy',
    },

    bioContain: {
        marginTop: 8 ,
        paddingBottom: 4,
        minHeight: 10,
        borderRadius: 7,
        width: 295,
        backgroundColor: '#ebebebff',
    },

    bio: {
        fontFamily: 'HelveticaNeueRoman',
        color: '#B3B3B3',
        fontSize: 12, 
        paddingTop: 6,
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center',
        lineHeight: 16,
    },

    labels: {
        fontFamily: 'HelveticaNeueHeavy',
        color: '#B3B3B3',
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 10,
    },

    aboutmecontain: {
        width: 295,
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },

    aboutmeparent: {
        padding: 10,
        borderRadius: 18,
        marginLeft: 5,
        marginBottom: 10,
        backgroundColor: '#ebebebff',
    },

    aboutmechild: {
        fontFamily: 'HelveticaNeueHeavy',
        color: '#B3B3B3',
    },

    bio2: {
        fontFamily: 'HelveticaNeueRoman',
        color: '#B3B3B3',
        fontSize: 12, 
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 2,
        lineHeight: 16,
    },

    /* buttons */

    colcontainer: {
        flexDirection: 'row',
        flex: 1,
    },
    column: {
        flex: 1,
    },

    button: {
        width: '90%',
        backgroundColor: '#F82E4B',
        marginTop: 20,
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