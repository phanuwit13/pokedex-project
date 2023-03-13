export interface IPokemonListResponse {
  count: number
  next: string
  previous: null | string
  results: IPokemonListItem[]
}

export interface IPokemonListItem {
  name: string
  url: string
}
