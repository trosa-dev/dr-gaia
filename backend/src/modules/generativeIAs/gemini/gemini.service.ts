// DOCUMENTATION
// https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?project=dr-gaia

import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { TemperatureEnum } from '../@types/temperatureEnum';

//MODELS
//https://ai.google.dev/models/gemini?hl=pt-br

export enum GeminiModel {
  gemini_1_0_pro_001 = 'gemini-1.0-pro-001',
}

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  }

  async runGemini(params: {
    model: GeminiModel;
    prompt: string;
    temperature: TemperatureEnum;
  }) {
    try {
      const { model, prompt, temperature } = params;

      let handleTemperature = 0;

      switch (temperature) {
        case TemperatureEnum.minimum:
          handleTemperature = 0;
          break;
        case TemperatureEnum.half:
          handleTemperature = 0.5;
          break;
        case TemperatureEnum.maximum:
          handleTemperature = 1;
          break;
        default:
          throw 'Error at Gemini temperature';
      }

      const geminiModel = this.genAI.getGenerativeModel({ model: model });

      const generationConfig = {
        temperature: handleTemperature,
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

      return {
        message: response.candidates[0].content.parts[0].text,
        usage: {
          input_tokens: 0,
          output_tokens: 0,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
