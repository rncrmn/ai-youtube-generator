import { Component, createSignal, Show } from "solid-js";
import { copyToClipboard } from "../utils/copytoclipboard";

interface Props {
  copyText: string;
}

const CopyButton: Component<Props> = (props) => {
  const [copied, setCopied] = createSignal<boolean>(false);

  const handleCopy = (e: Event) => {
    e.preventDefault();
    setCopied(true);
    copyToClipboard(props.copyText);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <button
      type="button"
      class="bg-green-200 hover:bg-green-300 p-2 font-mono font-bold uppercase text-xs rounded shadow-md"
      onClick={handleCopy}
    >
      <Show
        when={!copied()}
        fallback={
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            ></path>
          </svg>
        }
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          ></path>
        </svg>
      </Show>
    </button>
  );
};

export default CopyButton;
