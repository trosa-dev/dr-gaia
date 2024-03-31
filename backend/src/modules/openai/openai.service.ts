import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  constructor() {}

  async callOpenai() {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API, // This is the default and can be omitted
    });

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            'Um paciente com dor de cabeça. Retorne um array de objetos com a propriedade doenca para cada possibildiade.',
        },
      ],
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return chatCompletion;
  }
}
