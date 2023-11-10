import express from 'express';
import {
    createChat,
    getChats,
    getChat,
    removeChat,
    clearChats,
    getSharedChat,
    shareChat
} from '../controllers/chatController';

const router = express.Router();

router.post('/', createChat);

// Get all chats for a user
router.get('/', getChats);

// Get a specific chat by id
router.get('/:id', getChat);

// Remove a specific chat by id
router.delete('/:id', removeChat);

// Clear all chats for a user
router.delete('/', clearChats);

// Get a shared chat by id
router.get('/shared/:id', getSharedChat);

// Share a chat
router.post('/share', shareChat);

export default router;
