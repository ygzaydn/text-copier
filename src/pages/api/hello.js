// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { translate } from "@vitalets/google-translate-api";
import { HttpProxyAgent } from "http-proxy-agent";
import { proxyList } from "@/constant/proxyList";
const agent = new HttpProxyAgent(
  "https://" + proxyList[Math.floor(Math.random() * proxyList.length)]
);

export default async function handler(req, res) {
  const textToTranslate = req.body.text;

  try {
    const { text } = await translate(textToTranslate, {
      to: "tr",
      //fetchOptions: { agent },
    });
    res.status(200).json({ text });
  } catch (err) {
    res.status(404).send("Error");
  }
}
