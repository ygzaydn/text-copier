import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { translate } from "@vitalets/google-translate-api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [text, setText] = useState("");
    const [translated, setTranslated] = useState("");

    const translateToTr = async (textToTranslate) => {
        try {
            const { text } = await translate(textToTranslate, {
                to: "tr",
            });
            console.log(resp);
        } catch (err) {
            console.log(err);
            setTranslated("");
            alert("Çeviri Sırasında Hata Oluştu");
        }
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-black`}
        >
            <div className="w-full my-4">
                <h1 className="text-blue-300 text-2xl mb-6">
                    Metni Yapıştırın
                </h1>
                <textarea
                    className={`w-full bg-slate-50 h-64 text-blue-500 rounded-xl`}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="w-full flex flex-col my-8">
                <h1 className="text-blue-300 text-2xl mb-6">
                    Düzeltilmiş Metin
                </h1>
                <textarea
                    className={`w-full bg-slate-50 h-64 text-blue-500 p-2`}
                    value={text.replaceAll(" \n", "\n").replaceAll("\n", " ")}
                    readOnly
                />
                <div className="flex space-around mt-2">
                    <button
                        disabled={text.length < 1}
                        onClick={() => {
                            navigator.clipboard.writeText(
                                text
                                    .replaceAll(" \n", "\n")
                                    .replaceAll("\n", " ")
                            );
                            if (text.length > 0) {
                                alert("Metin Kopyalandı");
                            }
                        }}
                        className="bg-blue-500 px-4 py-2 rounded-sm mx-auto disabled:bg-gray-500 transition-all cursor-pointer disabled:cursor-default text-slate-50"
                    >
                        Metni Kopyala
                    </button>
                    {/*   <button
                        disabled={text.length < 1}
                        onClick={() =>
                            translateToTr(
                                text
                                    .replaceAll(" \n", "\n")
                                    .replaceAll("\n", " ")
                            )
                        }
                        className="bg-green-500 px-4 py-2 rounded-sm mx-auto disabled:bg-gray-500 transition-all cursor-pointer disabled:cursor-default text-slate-50"
                    >
                        Metni Türkçeye Çevir
                    </button> */}
                </div>
            </div>
            {translated !== "" && (
                <div className="w-full flex flex-col my-4">
                    <h1 className="text-blue-300 text-2xl mb-6">
                        Çevrilmiş Metin
                    </h1>
                    <textarea
                        className={`w-full bg-slate-50 h-64 text-blue-500 p-2`}
                        value={translated}
                        readOnly
                    />
                </div>
            )}
        </main>
    );
}
