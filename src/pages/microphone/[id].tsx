import { GetStaticPaths, GetStaticProps } from "next";
import { Microphone } from "../../../model/Microphone";
import { openDB } from "../../openDB";

export type MicrophoneDetailsProps = Microphone;
export default function MicrophoneDetails({
  id,
  brand,
  model,
  price,
  imageUrl,
}: MicrophoneDetailsProps) {
  return (
    <div>
      <div>{id}</div>
      <div>{brand}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>{imageUrl}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<MicrophoneDetailsProps> = async (
  ctx
) => {
  const db = await openDB();
  const id = ctx.params.id as string;
  const microphone = await db.get("select * from microphone where id=?", +id);
  return {
    props: microphone,
  };
};

export const getStaticPaths: GetStaticPaths<{id: string}> = async () => {
    const db = await openDB();
    const microphones = await db.all("select id from microphone");
    const paths = microphones.map(mic => {
        return { params: {id: mic.id.toString()}}
    });
    console.log(paths);
    return {
        paths,
        fallback: false
    }
}