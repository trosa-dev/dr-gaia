import { GeminiModel } from 'src/modules/generativeIAs/gemini/gemini.service';
import { OpenaiModel } from 'src/modules/generativeIAs/openai/openai.service';
import { ClaudeModel } from 'src/modules/generativeIAs/claude/claude.service';

export const models: (GeminiModel | OpenaiModel | ClaudeModel)[] = [
  // gemini
  GeminiModel.gemini_1_0_pro_001,
  GeminiModel.gemini_1_5_flash_001,
  GeminiModel.gemini_1_5_pro_001,

  // claude
  ClaudeModel.claude_3_sonnet_20240229,
  ClaudeModel.claude_3_haiku_20240307,
  ClaudeModel.claude_3_opus_20240229,
  ClaudeModel.claude_2_1,
  ClaudeModel.claude_2_0,
  ClaudeModel.claude_instant_1_2,

  // openai
  OpenaiModel.gpt_4_0125_preview,
  OpenaiModel.gpt_4_1106_preview,
  OpenaiModel.gpt_4_0613,
  OpenaiModel.gpt_3_5_turbo_0125,
  OpenaiModel.gpt_3_5_turbo_1106,
  OpenaiModel.gpt_3_5_turbo_0613,
  OpenaiModel.gpt_3_5_turbo_16k_0613,
  OpenaiModel.gpt_4o_2024_05_13,
];
