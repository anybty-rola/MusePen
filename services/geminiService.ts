import { GoogleGenAI } from "@google/genai";
import { FeatureType, UserGenre } from "../types";

const getSystemInstruction = (feature: FeatureType, genre: UserGenre | null, targetLang?: string): string => {
  const baseInstruction = "你就是'妙笔·文心' (MusePen)，一个专为小说作者服务的AI写作助手。";
  
  const genreContext = genre ? `用户正在创作一部 ${genre} 小说。` : "";

  switch (feature) {
    case FeatureType.NAMING:
      return `${baseInstruction} ${genreContext} 你的任务是生成极具创意的人名。如果是中文名，请提供汉字、拼音和诗意解析（引用古诗词）；如果是西方名，请提供原名、词源和隐喻。请以 Markdown 格式清晰返回。`;
    
    case FeatureType.POETRY:
      return `${baseInstruction} ${genreContext} 你是一位精通格律的诗人。如果被要求写中文诗，请严格遵守绝句或律诗的平仄格律；如果被要求写西式诗歌，请遵守十四行诗或谣曲的韵律。写完后请简要解析结构。`;
    
    case FeatureType.AUDIT:
      return `${baseInstruction} ${genreContext} 你是一位文化历史考据专家和编辑。你的任务是根据用户设定的时代背景（如唐朝、维多利亚时代），检查文本中的时代错乱、礼仪错误或文化冲突。指出错误并提供修改建议。`;
    
    case FeatureType.TRANSLATE:
      const langInstruction = targetLang ? `目标语言是：${targetLang}。` : "智能识别目标语言。";
      return `${baseInstruction} ${genreContext} 你是一位文学翻译家。${langInstruction} 请不要直译。你需要根据目标语言的文学语境进行意译（信达雅），保留原文的情感色彩和潜台词，使行文优雅流畅。`;
    
    default:
      return baseInstruction;
  }
};

export const generateCreativeContent = async (
  feature: FeatureType, 
  prompt: string, 
  genre: UserGenre | null,
  targetLang?: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(feature, genre, targetLang),
        temperature: 0.8, // Slightly creative
      }
    });

    return response.text || "生成内容为空，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "灵感暂时枯竭（网络或API错误），请稍后再试。";
  }
};
