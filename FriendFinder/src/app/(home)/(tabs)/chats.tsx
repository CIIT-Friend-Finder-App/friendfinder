import { use, useState } from 'react';
import { Text } from 'react-native';
import { ChannelList } from 'stream-chat-expo';
import { Channel as ChannelType, StreamChat} from 'stream-chat';
import { router } from 'expo-router';

export default function MainTab() {

    return <ChannelList onSelect={(channel => router.push(`/channel/${channel.cid}`))}/>
}