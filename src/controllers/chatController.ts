import { Request, Response } from 'express';
import ChatModel from '../models/chat';
import { nanoid } from 'nanoid';

export async function createChat(req: Request, res: Response): Promise<Response> {
  const userId = req.body.userId;
  const messages = req.body.messages;

  try {
    const title = req.body.title;
    const id = req.body.id;
    const createdAt = Date.now();
    const path = `/chat/${id}`;

    const payload = {
      id,
      title,
      userId,
      createdAt,
      path,
      messages,
    };

    const newChat = await ChatModel.findOneAndUpdate(
      { id },
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getChats(req: Request, res: Response): Promise<Response> {
  const userId = req.query.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const chats = await ChatModel.find({ userId }).sort({ createdAt: -1 }).exec();
    return res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getChat(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const userId = req.query.userId;

  try {
    const chat = await ChatModel.findOne({ id, userId }).exec();

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function removeChat(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    const chat = await ChatModel.findOneAndDelete({ id, userId });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found or not authorized to delete' });
    }

    return res.status(200).json({ message: 'Chat removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function clearChats(req: Request, res: Response): Promise<Response> {
  const userId = req.body.userId;

  try {
    await ChatModel.deleteMany({ userId });
    return res.status(200).json({ message: 'All chats cleared' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getSharedChat(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  try {
    const chat = await ChatModel.findOne({ id, sharePath: { $exists: true } });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found or not shared' });
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function shareChat(req: Request, res: Response): Promise<Response> {
  const userId = req.body.userId;
  const chatId = req.body.chatId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const chat = await ChatModel.findOne({ id: chatId, userId });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    chat.sharePath = `/share/${chat.id}`;
    await chat.save();

    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
