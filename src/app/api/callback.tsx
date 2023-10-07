"use server"
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default function all(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log(data);
  fs.writeFileSync("../../token.txt", data);
  // localStorage.setItem("token", data);
  return res.status(200).json({ test: "test" })
}