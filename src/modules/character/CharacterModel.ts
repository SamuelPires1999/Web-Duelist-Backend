import mongoose, { Document, Model, Schema, Types } from 'mongoose';

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Character',
  },
);

export interface ICharacter extends Document {
  name: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CharacterModel: Model<ICharacter> =
  mongoose.models['Character'] || mongoose.model('Character', CharacterSchema);

export default CharacterModel;