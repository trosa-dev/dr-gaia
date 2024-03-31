// DOCUMENTATION
// https://console.anthropic.com/dashboard

import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

export enum ClaudeModel {
  claude_3_opus_20240229 = 'claude-3-opus-20240229',
  claude_3_sonnet_20240229 = 'claude-3-sonnet-20240229',
  claude_3_haiku_20240307 = 'claude-3-haiku-20240307',
  claude_2_1 = 'claude-2.1',
  claude_2_0 = 'claude-2.0',
  claude_instant_1_2 = 'claude-instant-1.2',
}

@Injectable()
export class ClaudeService {
  constructor() {}

  async runClaude(params: { model: ClaudeModel; prompt: string }) {
    const { model, prompt } = params;

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API,
    });

    const msg = await anthropic.messages.create({
      model: model,
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    return msg;
  }
}
