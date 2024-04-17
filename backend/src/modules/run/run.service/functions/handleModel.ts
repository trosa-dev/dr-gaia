import { ClaudeModel } from 'src/modules/generativeIAs/claude/claude.service';
import { GeminiModel } from 'src/modules/generativeIAs/gemini/gemini.service';
import { OpenaiModel } from 'src/modules/generativeIAs/openai/openai.service';

export function handleModel(model: ClaudeModel | OpenaiModel | GeminiModel) {
  const isOpenAi = model.search('gpt');
  const isGemini = model.search('gemini');
  const isClaude = model.search('claude');

  if (isOpenAi >= 0) return 'openai';
  if (isGemini >= 0) return 'gemini';
  if (isClaude >= 0) return 'claude';

  throw `${model} is not part of ModelEnum`;
}
