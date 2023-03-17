import { Component, createSignal, JSX } from "solid-js";
import CopyButton from "./CopyButton";

interface Props {
  title: string;
}

const TitleBox: Component<Props> = (props: Props): JSX.Element => {
  const [copied, setCopied] = createSignal<boolean>(false);

  return (
    <div class="bg-stone-50 border-2 border-slate-300 py-4 px-5 rounded">
      <p class="text-xs mb-2 uppercase font-bold text-slate-400 font-mono">
        Title
      </p>
      <div class="flex justify-between items-center gap-5">
        <div class="font-medium">{props.title}</div>
        <CopyButton copyText={props.title} />
      </div>
    </div>
  );
};

export default TitleBox;
