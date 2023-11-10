import mongoose from 'mongoose';

const mongoURI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/chat';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;
