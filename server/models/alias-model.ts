import mongoose, { InferSchemaType, Schema } from 'mongoose'

const AliasSchema = new Schema(
  {
    alias: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }, // adds createdAt and updatedAt fields automatically
)

export type Alias = InferSchemaType<typeof AliasSchema>

export default mongoose.model('Alias', AliasSchema)
