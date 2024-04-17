// DOCUMENTATION
// https://platform.openai.com/docs/models/overview
// https://platform.openai.com/playground

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TemperatureEnum } from '../@types/temperatureEnum';

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
          throw 'Error at Claude temperature';
      }

      const openaiParams: OpenAI.Chat.ChatCompletionCreateParams = {
        model: model,
        temperature: handleTemperature,
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
        usage: {
          input_tokens: chatCompletion.usage.prompt_tokens,
          output_tokens: chatCompletion.usage.completion_tokens,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  getModels() {
    return this.openai.models.list();
  }
}
