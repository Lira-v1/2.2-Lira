// === lira-core.js ===

const OPENAI_API_KEY = "sk-..."; // 🔐 Вставь свой ключ
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function askLira(prompt, memoryContext = []) {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": Bearer ${OPENAI_API_KEY},
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [...memoryContext, { role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("Ошибка OpenAI: " + err);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
