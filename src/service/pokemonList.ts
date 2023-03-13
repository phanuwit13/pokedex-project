import { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { POKEMON_BASE_URL } from '@/utils/constant'
import { handleResponse, IResponse } from '@/utils/response'
import { IPokemonListResponse } from '@/interface/pokemonList'

interface IGetPokemonListResponse extends IResponse {
  status: number | undefined
  data?: IPokemonListResponse
}

export const pokemonListServices = {
  getPokemonList: async (
    limit?: string,
    offset?: string
  ): Promise<IGetPokemonListResponse> => {
    try {
      const response = await axios.get(
        `${POKEMON_BASE_URL}/pokemon?limit=${limit || 151}&offset=${
          offset || 0
        }`
      )
      return handleResponse.success(response)
    } catch (error: any) {
      return handleResponse.error(error)
    }
  },
}
