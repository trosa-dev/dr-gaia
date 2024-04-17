// DOCUMENTATION
// https://console.anthropic.com/dashboard

import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { TemperatureEnum } from '../@types/temperatureEnum';

// MODELS
// https://docs.anthropic.com/claude/docs/models-overview
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
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API,
    });
  }

  async runClaude(params: {
    model: ClaudeModel;
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

      const msg = await this.anthropic.messages.create({
        model: model,
        max_tokens: 1000,
        temperature: handleTemperature,
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

      return {
        message: msg.content[0].text,
        usage: {
          input_tokens: msg.usage.input_tokens,
          output_tokens: msg.usage.output_tokens,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
