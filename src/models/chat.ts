import { Schema, model, Document } from 'mongoose';

interface IMessage {
  content: string;
  role: string; // 'user' or 'assistant'
}

export interface IChat extends Document {
  id: string;
  title: string;
  userId: string;
  createdAt: number;
  path: string;
  messages: IMessage[];
  sharePath?: string;
}


const chatSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  path: { type: String, required: true },
  messages: [{
    content: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'assistant'] }
  }],
  sharePath: { type: String } // Optional: Only if you have sharing functionality
});

// Create the model
const ChatModel = model<IChat>('Chat', chatSchema);

export default ChatModel;
