import { Component, For, JSX } from "solid-js";
import CopyButton from "./CopyButton";

interface Props {
  tags: string[];
}

const TagsBox: Component<Props> = (props: Props): JSX.Element => {
  return (
    <div class="bg-stone-50 border-2 border-slate-300 py-4 px-5 rounded">
      <p class="text-xs mb-2 uppercase font-bold text-slate-400 font-mono">
        Tags
      </p>
      <div class="flex justify-between items-center gap-5">
        <div class="flex gap-2 flex-wrap">
          <For each={props.tags}>
            {(tag) => (
              <>
                <span class="bg-slate-200 py-2 px-3 text-sm font-medium rounded-lg lowercase">
                  {tag}
                </span>
              </>
            )}
          </For>
        </div>
        <CopyButton copyText={props.tags.toLocaleString().toLowerCase()} />
      </div>
    </div>
  );
};

export default TagsBox;
