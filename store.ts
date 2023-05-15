import { Session } from "@supabase/supabase-js"
import create from "zustand"

export type Store = {
  session:Session |null;
  setSession: (session:Session | null) => void;

}

export const useStore = create<Store>((set, get) => ({
  session: null,   
  setSession: session => {
    set(state => ({ session }))
  },
}))