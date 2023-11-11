import { useForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { generationList } from '@/utils/optionList'
import { pokemonListServices, pokemonDetailServices } from '@/service'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'
import { usePokemonListStore } from '@/store/pokemonList'
import { useSearchParams } from 'react-router-dom'

const useSearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, watch } = useForm({
    defaultValues: {
      type: searchParams.get('type') || 'all types',
      generation: searchParams.get('generation') || 0,
      keyword: searchParams.get('keyword') || '',
      sort: searchParams.get('sort') || 'id',
    },
  })

  const {
    setFetchPokemonList,
    setPokemonList,
    pokemon,
    fetchPokemon,
    setRefetch,
    setHasMore,
  } = usePokemonListStore()

  const watchType = watch('type')
  const watchGeneration = watch('generation')
  const watchKeyword = watch('keyword')
  const watchSort = (watch('sort') as 'id') || 'name'

  const fetchPokemonList = async (filter: {
    name: string
    limit: number
    offset: number
  }) => {
    const checkCurrentGen =
      fetchPokemon.data[0]?.id >= filter.offset &&
      fetchPokemon.data[0]?.id <= filter.limit + filter.offset
    let pokemonList = []
    if (checkCurrentGen) {
      setFetchPokemonList({
        ...pokemon,
        loading: true,
      })
    } else {
      setFetchPokemonList({
        data: [],
        error: null,
        loading: true,
      })
    }
    const response = await pokemonListServices.getPokemonList(
      filter.limit,
      filter.offset
    )
    if (response.status === 200) {
      const pokemonResults = response.data?.results || []
      let limit = 20
      const offset = checkCurrentGen ? fetchPokemon.data.length : 0
      if (offset + limit > pokemonResults.length)
        limit = pokemonResults.length - offset
      for (let index = 0; index < limit; index++) {
        const name = pokemonResults[index + offset].name
        const response = await pokemonDetailServices.getPokemonDetail(name)
        const monster = await response?.data
        await pokemonList.push({ ...monster, score: 0 })
      }

      const results = pokemonList.map((item) => ({
        ...item,
        image:
          item?.sprites?.other?.dream_world?.front_default ||
          item?.sprites?.other?.['official-artwork']?.front_default,
      })) as unknown as IPokemonDetailResponse[]
      setFetchPokemonList({
        data: checkCurrentGen ? [...pokemon.data, ...results] : [...results],
        loading: false,
        error: null,
      })
      setHasMore(
        !(
          (response.data?.results.length || 0) ===
          [...pokemon.data, ...results].length
        )
      )
    }
  }

  const filterPokemon = (
    pokeData: IPokemonDetailResponse[],
    keyword: string,
    type: string,
    key: 'id' | 'name'
  ) => {
    const filterKeyword = (data: IPokemonDetailResponse[]) => {
      return data.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    const result = filterKeyword(
      type.toLowerCase() !== 'all types'
        ? pokeData.filter((item) =>
            item.types.find((v) =>
              v.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : [...pokeData]
    )

    const dataResponse = sortBy(result, key)
    setPokemonList({ ...pokemon, data: dataResponse, loading: false })
  }

  const sortBy = (data: IPokemonDetailResponse[], key: 'id' | 'name') => {
    switch (key) {
      case 'id':
        return data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))

      case 'name':
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )

      default:
        return data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    }
  }

  useEffect(() => {
    const searchParams: {
      generation?: string
      keyword?: string
      sort?: string
      type?: string
    } = {}
    if (watchType) searchParams['generation'] = watchGeneration.toString()
    if (watchType) searchParams['type'] = watchType
    if (watchSort) searchParams['sort'] = watchSort
    if (watchKeyword) searchParams['keyword'] = watchKeyword
    if (Object.keys(searchParams).length) setSearchParams(searchParams)
  }, [watchType, watchKeyword, watchSort, watchGeneration])

  const handleRefetch = useCallback(() => {
    fetchPokemonList(generationList[Number(searchParams.get('generation'))])
  }, [pokemon, fetchPokemon, searchParams.get('generation')])

  useEffect(() => {
    if (searchParams.get('generation') !== undefined) {
      handleRefetch()
    }
  }, [searchParams.get('generation')])

  useEffect(() => {
    const keyword = searchParams.get('keyword') || ''
    const sort = searchParams.get('sort') as 'id' | 'name'
    const type = searchParams.get('type') || 'all types'
    filterPokemon(fetchPokemon.data, keyword, type, sort)
  }, [searchParams, fetchPokemon])

  useEffect(() => {
    setRefetch(handleRefetch)
  }, [handleRefetch, searchParams.get('generation')])

  return {
    fieldType: register('type'),
    fieldGeneration: register('generation'),
    fieldKeyword: register('keyword'),
    fieldSort: register('sort'),
  }
}

export { useSearchForm }
