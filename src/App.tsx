import { Component, JSX, createSignal, Show } from "solid-js";
import axios from "axios";
import YouTubeData from "./components/YouTubeData";

const App: Component = (): JSX.Element => {
  const [text, setText] = createSignal<string>("");
  const [dataString, setDataString] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);

  const generateYTData = async (videoTopic: string) => {
    try {
      const url = "https://api.openai.com/v1/completions";
      const params = {
        model: "text-davinci-003",
        prompt: `Generate potential title, description, and tags (not hashtags) for a YouTube video on the topic of ${videoTopic} using the ChatGPT-3 OpenAI API. The video should be informative, engaging, and relevant to the target audience. The title, description, and tag should be concise, accurate, and keyword-rich. Thank you!`,
        max_tokens: 512,
        temperature: 0,
        n: 1,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_OPENAI_API_KEY,
      };

      const response = await axios.post(url, params, {
        headers: headers,
      });

      return response.data.choices[0]?.text;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setDataString("");
    const data: string = await generateYTData(text());
    setDataString(data);
    setLoading(false);
  };

  return (
    <div class="bg-gradient-to-r from-rose-100 to-teal-100 h-screen w-screen flex justify-center items-center">
      <div class="max-w-[768px] w-full px-4 md:px-0">
        <div>
          <h1 class="text-4xl text-red-700 font-bold text-center mb-10">
            YouTube Generator
          </h1>
          <form
            onSubmit={handleSubmit}
            class="flex justify-center items-center w-full shadow-md rounded-md mb-10"
          >
            <input
              type="text"
              placeholder="Profile card HTML and CSS"
              value={text()}
              onInput={(e) => setText((e.target as HTMLInputElement).value)}
              class="py-3 px-4 w-full bg-white rounded-tl-md rounded-bl-md focus:outline-none"
            />
            <button
              type="submit"
              class="py-3 px-4 font-semibold font-mono bg-white hover:bg-slate-900 disabled:cursor-not-allowed hover:text-white border-l-[1px] rounded-tr-md rounded-br-md"
              disabled={text() === "" ? true : false}
            >
              {!loading() ? (
                "Generate"
              ) : (
                <span class="flex justify-center items-center gap-2">
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 text-slate-900 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Generating
                </span>
              )}
            </button>
          </form>
        </div>
        <Show when={dataString() !== ""}>
          <YouTubeData dataString={dataString()} />
        </Show>
      </div>
    </div>
  );
};

export default App;
