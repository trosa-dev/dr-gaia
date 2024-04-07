import { ModelEnum } from '../../@types/ModelEnum';

export const models: ModelEnum[] = [
  // claude
  ModelEnum.claude_3_opus_20240229,
  ModelEnum.claude_3_sonnet_20240229,
  ModelEnum.claude_3_haiku_20240307,
  ModelEnum.claude_2_1,
  ModelEnum.claude_2_0,
  ModelEnum.claude_instant_1_2,
  // gemini
  ModelEnum.gemini_1_0_pro_001,
  //openai
  ModelEnum.gpt_4_0125_preview,
  ModelEnum.gpt_4_1106_preview,
  ModelEnum.gpt_4_0613,
  ModelEnum.gpt_3_5_turbo_0125,
  ModelEnum.gpt_3_5_turbo_1106,
  ModelEnum.gpt_3_5_turbo_0613,
  ModelEnum.gpt_3_5_turbo_16k_0613,
];
