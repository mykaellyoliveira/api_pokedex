import {Schema, model, Document} from 'mongoose'
import { PokemonType } from './types/pokemon.type'
const PokemonSchema = new Schema<PokemonType & Document>({
  name: 
  { 
    type: String, 
    required: true 
  },
  type: [
    { 
      slot: Number, 
      name: String 
    }
  ],
  stats: [
    { value: Number, 
      name: String 
    }
  ],
  dex: { 
    type: Number, 
    required: true 
  },
  height: { 
    type: Number, 
    required: true 
  },
  weight: { 
    type: Number, 
    required: true 
  },
  moves: [String],
},{
  timestamps: true  
})

export default model('Pokemons', PokemonSchema)