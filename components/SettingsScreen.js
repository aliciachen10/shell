import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

import { useStore } from '../store'

import { StyleSheet, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function SettingsScreen() {
    const session = useStore(state => state.session);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
    }

    async function signout() {
      const { error } = await supabase.auth.signOut()
    }
    
    
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
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      setLoading(false)
    }

    return (
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
      </View>
    )
    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text>Settings!</Text>
    //   </View>
    // );
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
    //for text input box
    inputContainer: {
      paddingTop: 15
    },
    textInput: {
      borderColor: '#CCCCCC',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 50,
      fontSize: 25,
      paddingLeft: 20,
      paddingRight: 20
    },
    //save button styles
    saveButton: {
      borderWidth: 1,
      borderColor: '#007BFF',
      backgroundColor: '#007BFF',
      padding: 15,
      margin: 5
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    }
    
  })
