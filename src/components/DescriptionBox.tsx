import { Component, JSX } from "solid-js";
import CopyButton from "./CopyButton";

interface Props {
  description: string;
}

const DescriptionBox: Component<Props> = (props: Props): JSX.Element => {
  return (
    <div class="bg-stone-50 border-2 border-slate-300 py-4 px-5 rounded">
      <p class="text-xs mb-2 uppercase font-bold text-slate-400 font-mono">
        Description
      </p>
      <div class="flex justify-between items-center gap-5">
        <div class="font-medium">{props.description}</div>
        <CopyButton copyText={props.description} />
      </div>
    </div>
  );
};

export default DescriptionBox;
