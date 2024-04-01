// import dotenv from 'dotenv';
// dotenv.config();

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey : process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// async function callChatGPT(text){
//   try {
//     const completion = await openai.createCompletion({
//       model : "text-davinci-003",
//       prompt : text,
//       max_tokens : 3000
    
//     });
    
//     console.log(completion.choices[0].text);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// await callChatGPT("what is redis")