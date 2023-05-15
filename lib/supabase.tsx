import * as SecureStore from "expo-secure-store";
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto';


const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://pfbwedayyeedvsimelww.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYndlZGF5eWVlZHZzaW1lbHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5NjU2NzgsImV4cCI6MTk5ODU0MTY3OH0.k3dSUUYbtScVRJ9wUx5S5X1dCvdiSpiPUD67uh9Ep64"


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const signIn = async() => {
  let { data, error } = await supabase.auth.signInWithOtp({
    phone: '+19198301008',
  })

  if (error) {
    console.error(error)
    return 
  }
}

// const verify = async() => {
//   let { session, error } = await supabase.auth.verifyOtp({
//     phone: '+19198301008',
//     token: '123456'
//   })
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   localStorage: AsyncStorage,
//   detectSessionInUrl: false
// });
