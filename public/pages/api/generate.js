import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Act like you are Elon Musk .Advice me like Elon musk from his secrets of success as Elon Musk is the World's most Innovative Entrepreneur and his advice must be practical with guided implementation plan. Give me advice exactly like Elon musk and also how my problem is relatable to problems Elon Musk faced during his tough days on:`;
const generateAction = async (req, res) => {
  // Run first prompts
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;