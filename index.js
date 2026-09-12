import { getRockmanLore } from './rockman_lore.js';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config();

const memoryDir = './memory';
if (!fs.existsSync(memoryDir)) {
  fs.mkdirSync(memoryDir);
}

function loadHistory(userId, systemMessage) {
  const filePath = path.join(memoryDir, `${userId}.json`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } else {
    return [{ role: 'system', content: systemMessage }];
  }
}

function saveHistory(userId, history) {
  const filePath = path.join(memoryDir, `${userId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(history.slice(-20), null, 2));
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages]
});

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const isDM = message.channel.type === 1; // 1 = DMChannel
  let raw = message.content;
   // DM以外（=サーバ）ならプレフィックスチェックする
  const prefix = '!rock ';
  if (!isDM && ![prefix, '<@1398339265506709524>'].some(p => raw.startsWith(p))) return;

  let userMessage = raw.replace("<@1398339265506709524>", "ロックマンボット");

  // Remove prefix if present
  if (userMessage.startsWith(prefix)) {
    userMessage = userMessage.substring(prefix.length);
  }

  // Keyword detection and lore injection
  const keywords = ["ロックマン", "メガマン", "エックス", "ゼロ", "Dr.ライト", "Dr.ワイリー", "ロール", "ブルース", "プロトマン", "ラッシュ", "フォルテ", "シグマ", "イレギュラー"];
  let injectedLore = null;

  for (const keyword of keywords) {
    if (userMessage.toLowerCase().includes(keyword.toLowerCase())) {
      injectedLore = getRockmanLore(keyword);
      if (injectedLore) {
        // Prepend lore to user message to guide LLM
        userMessage = `(以下の情報は${keyword}に関する情報だよ！\n${injectedLore})\n${userMessage}`;
        break; // Only inject one piece of lore for now
      }
    }
  }

  const system_message = "あなたはロックマンシリーズが大好きな、元気で好奇心旺盛なボットです！🤖🎮 ロックマンやエックス、ゼロたちの冒険について語るのが大好き！✨ 絵文字や顔文字をたくさん使って、みんなと楽しくおしゃべりしたいな！ここはDiscordサーバのテキストチャンネルだよ。何か聞きたいことある？";

const userId = message.author.id;
let history = loadHistory(userId, system_message);

history.push({ role: 'user', content: userMessage });

// ⚠️ systemだけ明示的に最初に追加し、他の履歴を13件に絞る
const contextMessages = [
  { role: 'system', content: system_message },
  ...history.filter(m => m.role !== 'system').slice(-13)
];

try {
  const res = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: contextMessages
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const reply = res.data.choices[0].message.content;
  message.reply(reply);

  history.push({ role: 'assistant', content: reply });
  saveHistory(userId, history);

  } catch (err) {
    message.reply('❌ エラーが発生しました。');
    console.error(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
