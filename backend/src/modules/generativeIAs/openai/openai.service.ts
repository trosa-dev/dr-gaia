// DOCUMENTATION
// https://platform.openai.com/docs/models/overview
// https://platform.openai.com/playground

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

// MODELS
//https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo

export enum OpenaiModel {
  gpt_4_0125_preview = 'gpt-4-0125-preview',
  gpt_4_1106_preview = 'gpt-4-1106-preview',
  gpt_4_0613 = 'gpt-4-0613',
  gpt_3_5_turbo_0125 = 'gpt-3.5-turbo-0125',
  gpt_3_5_turbo_1106 = 'gpt-3.5-turbo-1106',
  gpt_3_5_turbo_0613 = 'gpt-3.5-turbo-0613',
  gpt_3_5_turbo_16k_0613 = 'gpt-3.5-turbo-16k-0613',
}

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API, // This is the default and can be omitted
    });
  }

  async runOpenai(params: {
    model: OpenaiModel;
    prompt: string;
    temperature: number;
  }) {
    try {
      const { model, prompt, temperature } = params;

      const openaiParams: OpenAI.Chat.ChatCompletionCreateParams = {
        model: model,
        temperature,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      };

      const chatCompletion: OpenAI.Chat.ChatCompletion =
        await this.openai.chat.completions.create(openaiParams);

      return {
        message: chatCompletion.choices[0].message.content,
        usage: chatCompletion.usage,
      };
    } catch (error) {
      console.log(error);
    }
  }

  getModels() {
    return this.openai.models.list();
  }
}
