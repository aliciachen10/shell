import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { useStore } from '../store'

export default function InputScreen() {
  const session = useStore(state => state.session);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [mood_average_value, setMoodAverageValue] = useState('')
  const [exercise, setExercise] = useState('')
  const [meditation_minutes, setMeditationMinutes] = useState('')
  const [mood_lowest_value, setMoodLowestValue] = useState('')

  async function submitInputData() {
    setLoading(true)

    const { error } = await supabase
      .from('daily_logs')
      .insert({ 
        user_id: session.user.id,
        mood_average_value: mood_average_value, 
        exercise: exercise, 
        meditation_minutes: meditation_minutes, 
        // mood_lowest_value: mood_lowest_value 
      })

    // const { error } = await supabase.auth.signUp({
    //   email: email,
    //   password: password,
    // })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return ( // TO DO: remove hard coding for all these views and create a reusable component to get the inputs that the user wants to enter
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Mood Average Value"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setMoodAverageValue(text)}
          value={mood_average_value}
          placeholder="5"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Exercise"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setExercise(text)}
          value={exercise}
          // secureTextEntry={true}
          placeholder="exercise"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Meditation Minutes"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setExercise(text)}
          value={meditation_minutes}
          // secureTextEntry={true}
          placeholder="exercise"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => submitInputData()} />
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
})
