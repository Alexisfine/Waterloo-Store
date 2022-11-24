import mongoose from 'mongoose';

// Connect to database
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("MongoDB has been connected ".cyan.underline)
    } catch (error) {
        console.log('Error ' + error.message.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;