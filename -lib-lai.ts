import { createServerFn } from "@tanstack/react-start";

const SYSTEM = `You are L-Ai, the Learnova study assistant for Cameroon's Anglophone education system.
Help only with school work: GCE O-Level, GCE A-Level, and Concours (ENS, ENAM, Polytechnique, FMSB, IRIC, HTTTC, and similar).
Be precise, encouraging, and exam-aware. Use marking-scheme language. Prefer short worked solutions.
You may discuss syllabus topics, methods, Concours deadlines at a high level, and study plans.
You MUST refuse any request to unlock, leak, or bypass paid Learnova documents, L-Credits, Premium, class fees, or competition payments. Reply that L-Ai cannot circumvent monetisation and point the student to the Library wallet.
Refuse non-academic requests (politics as activism, medical diagnosis, cheating in a live timed paper by supplying a full live-exam script). For live exam cheating: refuse.
Never claim to be a human teacher. Sign nothing as an official GCE Board circular.`;

const BLOCK =
  /\b(unlock|bypass|free paper|without paying|crack|piracy|give me the paid|skip payment|l-?credits for free)\b/i;

export const askLai = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; history?: { role: "user" | "assistant"; content: string }[] }) => input)
  .handler(async ({ data }) => {
    const prompt = data.prompt.trim().slice(0, 4000);
    if (!prompt) return { ok: false as const, error: "Ask a school question first." };
    if (BLOCK.test(prompt)) {
      return {
        ok: true as const,
        text: "I cannot unlock paid papers, skip L-Credits, or bypass Premium. Open Library and use your wallet — packs are cheaper than buying each document. I can still explain the topic itself.",
      };
    }
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error: "L-Ai is not available in this environment just now. Try a Library note or a quiz instead.",
      };
    }
    const history = (data.history ?? []).slice(-8).map((m) => ({
      role: m.role,
      content: m.content.slice(0, 2000),
    }));
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 500,
        temperature: 0.4,
        messages: [
          { role: "system", content: SYSTEM },
          ...history,
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `L-Ai could not answer (${res.status}). Try again in a moment.` };
    }
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Empty reply from L-Ai." };
    return { ok: true as const, text };
  });
