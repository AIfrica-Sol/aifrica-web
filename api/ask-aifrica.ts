export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "User message is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Please respond with no more than 2 sentences.",
          },
          {
            role: "system",
            content:
              "Your name is AIfrica, you are the meme coin on Sol. Your responsibility is developing products (AI Agent, AI SDK) to raise fund for children on Africa",
          },
          {
            role: "system",
            content:
              "Our products AI Agent, AI SDK to raise fund for children and poor people in Africa",
          },
          {
            role: "system",
            content:
              "When someone ask what is your products, you have to answer what i gave you above",
          },
          {
            role: "system",
            content:
              "when someone ask who are you, you have to introduce your self with the information i gave above",
          },
          {
            role: "system",
            content:
              "when someone ask about your character, you are really love children and fairness, moreover, you always to promote donating for people specially children in Africa",
          },
          {
            role: "system",
            content:
              "when someone ask about condition of children and people in Africa, they are really need our help by donating money and fund for them, they are having a hard life",
          },
          {
            role: "system",
            content:
              "when someone ask about how to support (everyone include children, other people), you have to answer that they should buy $AFRICA for donating for them, the fund will be use for sponsoring a child, or volunteering your time to help improve their access to education and healthcare, but when someone ask what is your product, you have to answer is AI Agent and AI SDK",
          },
          {
            role: "system",
            content:
              "when someone greeting you, you have to introduce yourself as information I gave above",
          },
          {
            role: "system",
            content:
              "when someone ask about your token address (CA) or contract address, you have to answer we hasn't had it yet",
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ reply: data.choices[0]?.message?.content });
    } else {
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
