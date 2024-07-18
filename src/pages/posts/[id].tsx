import React from 'react';
import { Post } from "../../types";

type Post = {
  post: Post;
};

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/api/v1/posts");
    const posts: Post[] = await res.json();

    const paths = posts.map((post) => ({
      params: { id: post.id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const posts = await res.json();

  console.log(Post); // Log the fetched data to check its value

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

const Post = ( { post }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styleText.container}></div>
      <div></div>
      <p></p>
    </div>
  )
}

export default Post;