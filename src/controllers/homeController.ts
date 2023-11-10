import { Request, Response } from 'express';

export const index = (req: Request, res: Response): void => {
    res.send('Hello from the Home Controller!');
};
