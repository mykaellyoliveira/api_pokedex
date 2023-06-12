export interface PokemonType{
    name: string
    type: {
        slot: number, 
        name: string
    }[]
    stats: {
        value: number, 
        name: string
    }[]
    dex: number
    height: number
    weight: number 
    moves: string[]
}
