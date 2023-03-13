export interface IPokemonDetailResponse {
  abilities: IAbilities[]
  base_experience: number
  forms: IForms[]
  game_indices: IGameIndices[]
  height: number
  held_items: []
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_types: []
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
  score: number
  image?: string
}

export interface IAbilities {
  ability: IAbility
  is_hidden: boolean
  slot: number
}

export interface IAbility {
  name: string
  url: string
}
export interface IForms {
  name: string
  url: string
}

export interface IGameIndices {
  game_index: number
  version: IVersion
}

export interface IVersion {
  name: string
  url: string
}

export interface MoveLearnMethod {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: MoveLearnMethod
  version_group: VersionGroup
}

export interface Move {
  move: Move2
  version_group_details: VersionGroupDetail[]
}

export interface Move2 {
  name: string
  url: string
}

export interface Species {
  name: string
  url: string
}

export interface DreamWorld {
  front_default: string
  front_female?: any
}

export interface Home {
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface OfficialArtwork {
  front_default: string
  front_shiny: string
}

export interface Other {
  dream_world: DreamWorld
  home: Home
  'official-artwork': OfficialArtwork
}

export interface RedBlue {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
}

export interface Yellow {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
}

export interface Crystal {
  back_default: string
  back_shiny: string
  back_shiny_transparent: string
  back_transparent: string
  front_default: string
  front_shiny: string
  front_shiny_transparent: string
  front_transparent: string
}

export interface Gold {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent: string
}

export interface Silver {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent: string
}

export interface Emerald {
  front_default: string
  front_shiny: string
}

export interface FireredLeafgreen {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface RubySapphire {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

export interface DiamondPearl {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface HeartgoldSoulsilver {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface Platinum {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface Animated {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface BlackWhite {
  animated: Animated
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface OmegarubyAlphasapphire {
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface XY {
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface Icons {
  front_default: string
  front_female?: any
}

export interface UltraSunUltraMoon {
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

export interface Icons2 {
  front_default: string
  front_female?: any
}

export interface Sprites {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
  other: Other
}

export interface Stat2 {
  name: string
  url: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Type2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}
