import { GetStaticProps } from "next";
import Link from "next/link";
import { Microphone } from "../../model/Microphone";
import { openDB } from "../openDB";

export interface IndexProps {
  microphones: Microphone[];
}

export default function Index({microphones}: IndexProps) {
  return <div>
    {microphones.map(microphone => (
      <Link key={microphone.id} href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
        <a>{`${microphone.brand} ${microphone.model}`}</a>
      
      </Link>
    ))}
  </div>
return <pre>{JSON.stringify(microphones, null, 4)}</pre>;
}

export const getStaticProps: GetStaticProps = async ctx => {
  const db = await openDB();
  const microphones = await db.all("select * from microphone");

  return {
    props: {microphones}
  };
}