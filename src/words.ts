"use server";

const words = [
  "Turnip",
  "Carrot",
  "Cucumber",
  "Tomato",
  "Banana",
  "Apple",
  "Lemon",
  "Orange",
  "Clementine",
  "Pineapple",
];

export async function getWord(id: string) {
  return (
    words[id.charCodeAt(0) % words.length] + Math.floor(Math.random() * 99)
  );
}
