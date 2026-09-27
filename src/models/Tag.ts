import mongoose, { Schema } from 'mongoose';
import { BOOK_TAGS } from './Book';

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true, enum: BOOK_TAGS }
});

tagSchema.virtual('tag').get(function (this: { tag: string;  }) {

});

tagSchema.set('toJSON', { virtuals: true });
tagSchema.set('toObject', { virtuals: true });

export default mongoose.model('Tag', tagSchema);