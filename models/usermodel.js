import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    bookmarks: [String],
    settings: {
        type: mongoose.Schema.Types.Mixed, // Use Mixed type for JSON data
        default: {} // Default value for settings
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    collection: 'UserCollection' // Specify the custom collection name here
});

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', UserSchema);

export default UserModel;
