import { create } from 'zustand'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'

const initialStore = {
  pokemon: { data: [], loading: false, error: null },
  fetchPokemon: { data: [], loading: false, error: null },
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
}

export const usePokemonListStore = create<usePokemonListStoreType>((set) => ({
  ...initialStore,
  setPokemonList: (value: PokemonType) => set({ pokemon: value }),
  setFetchPokemonList: (value: PokemonType) =>
    set({ fetchPokemon: value, pokemon: value }),
  clearPokemonList: () => set({ ...initialStore }),
}))
