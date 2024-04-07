import { ModelEnum } from '../../@types/ModelEnum';

export function handleModel(model: ModelEnum) {
  const isOpenAi = model.search('gpt');
  const isGemini = model.search('gemini');
  const isClaude = model.search('claude');

  if (isOpenAi >= 0) return 'openai';
  if (isGemini >= 0) return 'gemini';
  if (isClaude >= 0) return 'claude';

  throw `${model} is not part of ModelEnum`;
}
