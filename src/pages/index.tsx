// other imports...
import { revalidatePath } from "next/cache";
import { Post } from "src/types.ts";

type Post = {
  posts: Post[];
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();

  console.log(posts); // Log the fetched data to check its value

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24,
  };
}


export default function Home({ posts }: Props) {
  return (
    <p>hello</p>
  )
}

