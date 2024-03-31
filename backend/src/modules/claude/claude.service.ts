import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class ClaudeService {
  constructor() {}

  async callClaude() {
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API,
    });

    const msg = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: "'Um paciente com dor de cabeça. Não retorne texto, retorne apenas um array de objetos com a propriedade doenca para cada possibildiade.'",
            },
          ],
        },
      ],
    });

    return msg;
  }
}
