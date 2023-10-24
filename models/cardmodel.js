import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    summary: String,
    thumbnail: String,
    siteurl: String,
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    collection: 'AllCard' // Specify the custom collection name here
});

const CardModel = mongoose.models.CardModel || mongoose.model('CardModel', CardSchema);

export default CardModel;
