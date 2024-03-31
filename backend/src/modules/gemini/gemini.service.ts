// DOCUMENTATION
// https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?project=dr-gaia

import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';

export enum GeminiModel {
  gemini_1_0_pro = 'gemini-1.0-pro',
  gemini_1_0_pro_001 = 'gemini-1.0-pro-001',
}

@Injectable()
export class GeminiService {
  constructor() {}

  async runGemini(params: { model: GeminiModel; prompt: string }) {
    const { model, prompt } = params;

    const API_KEY = process.env.GEMINI_API;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const geminiModel = genAI.getGenerativeModel({ model: model });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = geminiModel.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;

    return response;
  }
}
