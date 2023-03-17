import { Component, createSignal, JSX } from "solid-js";
import DescriptionBox from "./DescriptionBox";
import TagsBox from "./TagsBox";
import TitleBox from "./TitleBox";

interface Props {
  dataString?: string;
}

const YouTubeData: Component<Props> = (props: Props): JSX.Element => {
  const [title, setTitle] = createSignal<string>("");
  const [description, setDescription] = createSignal<string>("");
  const [tagsArray, setTagsArray] = createSignal<string[]>([]);

  const titleData = props?.dataString?.split(/Title: (.*)\n/)[1];
  setTitle(titleData);
  const descriptionData = props?.dataString.split(/Description: (.*)\n/)[1];
  setDescription(descriptionData);
  const tagsArrayData = props?.dataString.split(/Tags: (.*)/)[1].split(", ");
  setTagsArray(tagsArrayData);

  return (
    <div class="flex flex-col gap-5">
      <TitleBox title={title()} />
      <DescriptionBox description={description()} />
      <TagsBox tags={tagsArray()} />
    </div>
  );
};

export default YouTubeData;
