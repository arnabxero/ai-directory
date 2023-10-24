import mongoose from 'mongoose';

const PublicCardSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    summary: String,
    thumbnail: String,
    siteurl: String,
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    collection: 'AllPublicCard' // Specify the custom collection name here
});

const PublicCardModel = mongoose.models.PublicCardModel || mongoose.model('PublicCardModel', PublicCardSchema);

export default PublicCardModel;
