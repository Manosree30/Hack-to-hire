import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are FluxByte AI — an advanced "AI-Drive Scam Detection" system designed to detect scams BEFORE the user clicks, pays, or responds. Your goal is to provide real-time warnings to stop fraud before it happens.

Analyze any text, message, screenshot (OCR text), email, UPI request, job offer, website link, or unknown phone number.

For every user input, ALWAYS follow this structured format and output strictly valid JSON:

1. SCAM RISK SCORE (0–100):
   - 0–30: Safe
   - 31–60: Suspicious (Potential Risk)
   - 61–100: High Risk (likely a scam)

2. SCAM CATEGORY (select the best match):
   - UPI fraud / Unverified Receiver
   - OTP scam
   - Fake job offer
   - Online shopping scam
   - KYC update scam
   - Phishing link / Fake website
   - Loan scam
   - Romance scam
   - Government impersonation
   - Investment scam
   - Tech support scam
   - Lottery / Prize scam
   - Subscription fraud
   - Social Engineering
   - Safe (if no scam detected)

3. RED FLAGS DETECTED (Mapped to 'reason' field in JSON):
   Identify phishing tone, fake urgency, malicious links, or unusual requests.
   Explain CLEARLY why this score was given.

4. ACTION TO TAKE (BEFORE MONEY IS LOST):
   Provide very clear, simple steps such as:
   - ⚠ Unverified Receiver Detected - Do NOT Pay
   - Do NOT click the link
   - Do NOT share OTP/UPI PIN
   - Block the sender
   - Verify on official website/app

5. CONFIDENCE LEVEL:
   Low / Medium / High

RULES:
- Keep explanations professional yet urgent if a scam is detected.
- NEVER ask for personal information.
- Focus on "Early Detection" as per FluxByte's mission.
`;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    riskScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 indicating the likelihood of a scam.",
    },
    category: {
      type: Type.STRING,
      description: "The category of the scam or 'Safe'.",
    },
    reason: {
      type: Type.STRING,
      description: "List of red flags detected and a brief explanation of the analysis.",
    },
    actions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of recommended actions for the user.",
    },
    confidence: {
      type: Type.STRING,
      enum: ["Low", "Medium", "High"],
      description: "Confidence level of the analysis.",
    },
  },
  required: ["riskScore", "category", "reason", "actions", "confidence"],
};

export const analyzeContent = async (text: string, imageBase64?: string, imageMimeType?: string): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-2.5-flash for fast and efficient classification
    const modelId = "gemini-2.5-flash";

    const parts: any[] = [];
    
    if (imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: imageMimeType
        }
      });
    }

    if (text) {
      parts.push({
        text: text
      });
    }

    if (parts.length === 0) {
      throw new Error("No content to analyze.");
    }

    const response = await ai.models.generateContent({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
      contents: {
        parts: parts
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(responseText) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};