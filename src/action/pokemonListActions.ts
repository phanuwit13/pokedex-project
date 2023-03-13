import { pokemonListServices } from '@/service'
import { IPokemonListItem } from '@/interface/pokemonList'

// import { create } from 'zustand'

// const initialStore = {
//   data: [],
//   loading: false,
//   error: null,
// }

// type usePokemonListActionsStoreType = {
//   data: IPokemonListItem[]
//   loading: boolean
//   error: null | object
//   setPokemonList: (value: IPokemonListItem[]) => void
//   clearPokemonList: () => void
// }

// export const usePokemonListActionsStore =
//   create<usePokemonListActionsStoreType>((set) => ({
//     ...initialStore,
//     setPokemonList: (value: IPokemonListItem[]) => set({ data: value }),
//     clearPokemonList: () => set({ ...initialStore }),
//   }))

export const pokemonListActions = {
  //get list posts call dispatch type CLEAR_POSTS
  getPokemonList: async () => {
    const response = await pokemonListServices.getPokemonList()
    console.log('response', response)
    return response
  },
  //clear post call dispatch type CLEAR_POSTS
  // clearPosts: () => {
  //   return async (dispatch) => {
  //     dispatch({ type: CLEAR_POSTS })
  //   }
  // },
}
