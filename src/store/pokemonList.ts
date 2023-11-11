import { create } from 'zustand'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'

const initialStore = {
  pokemon: { data: [], loading: false, error: null },
  fetchPokemon: { data: [], loading: false, error: null },
  hasMore: true,
}

type PokemonType = {
  data: IPokemonDetailResponse[]
  loading: boolean
  error: null | object
}

type usePokemonListStoreType = {
  pokemon: PokemonType
  fetchPokemon: PokemonType
  setPokemonList: (value: PokemonType) => void
  setFetchPokemonList: (value: PokemonType) => void
  clearPokemonList: () => void
  refetch?: () => void
  setRefetch: (fn: () => void) => void
  hasMore: boolean
  setHasMore: (value: boolean) => void
}

export const usePokemonListStore = create<usePokemonListStoreType>((set) => ({
  ...initialStore,
  setPokemonList: (value: PokemonType) =>
    set({ pokemon: { ...value, data: [...value.data] } }),
  setFetchPokemonList: (value: PokemonType) =>
    set({
      fetchPokemon: { ...value, data: [...value.data] },
      pokemon: { ...value, data: [...value.data] },
    }),
  clearPokemonList: () => set({ ...initialStore }),
  setRefetch: (fn) => set({ refetch: fn }),
  setHasMore: (value) => set({ hasMore: value }),
}))
