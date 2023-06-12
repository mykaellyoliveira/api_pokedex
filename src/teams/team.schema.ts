import {Schema, model, Document, SchemaType} from 'mongoose'

const TeamSchema = new Schema({
    trainerName: {
        type: String, 
        required: true,
    },
    team: 
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pokemons', 
            required: true,
        }
    ],
})
export default model('Teams', TeamSchema)
