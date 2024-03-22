import { getCurrentStatus, getQueue } from '@/API';
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from '@/utils';

export default function handler(req: NextApiRequest, res: NextApiResponse<{message: string}>) {
  log("Received update from spotify client")
  getQueue();
  getCurrentStatus()
  res.status(200).json({message: "Success"});
}