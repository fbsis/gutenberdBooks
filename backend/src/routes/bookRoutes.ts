import { Router, Request, Response } from 'express';
import { getBookById } from '../controllers/bookController';
const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  await getBookById(req, res);
});

export default router;