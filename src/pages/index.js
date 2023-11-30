import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [text, setText] = useState("");
    console.log(text.split(""));
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="w-full">
                <h1 className="text-blue-300 text-2xl mb-6">
                    Metni Yapıştırın
                </h1>
                <textarea
                    className={`w-full bg-slate-50 h-64 text-blue-500 rounded-xl`}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="w-full flex flex-col">
                <h1 className="text-blue-300 text-2xl mb-6">
                    Düzeltilmiş Metin
                </h1>
                <textarea
                    className={`w-full bg-slate-50 h-64 text-blue-500 p-2`}
                    value={text.replaceAll("\n", " ")}
                    readOnly
                />
                <button
                    onClick={() =>
                        navigator.clipboard.writeText(
                            text.replaceAll("\n", " ")
                        )
                    }
                    className="bg-blue-500 px-4 py-2 rounded-sm ml-auto"
                >
                    Metni Kopyala
                </button>
            </div>
        </main>
    );
}
