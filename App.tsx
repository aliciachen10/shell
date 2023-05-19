import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import SettingsScreen from './components/SettingsScreen'
import InputScreen from './components/InputScreen'
import HomeScreen from './components/HomeScreen'
import GraphScreen from './components/GraphScreen'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

import { Text, ScrollView, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStore } from './store'

import { StyleSheet, Alert } from 'react-native'
// import { Button, Input } from 'react-native-elements'


export default function App() {
  // const [session, setSession] = useState<Session | null>(null)
  const session = useStore(state => state.session);
  const setSession = useStore(state => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  const Tab = createBottomTabNavigator();

  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Inputs" component={InputScreen} />
        <Tab.Screen name="Graphs" component={GraphScreen} />
      </Tab.Navigator>
    </NavigationContainer>


  )
}
// <View>
// {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} 
// {session && session.user ? <Account key={session.user.id} /> : <Auth />} 
// </View>