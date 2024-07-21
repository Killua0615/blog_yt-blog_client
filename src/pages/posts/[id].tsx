import { useRouter } from 'next/router';
import React from 'react';
import styles from "../../styles/Post.module.css";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

type Props = {
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
  const post = await res.json();

  console.log(post); // Log the fetched data to check its value

  return {
    props: {
      post,
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
    <div className={styles.container}>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.date}>{post.created_at}</div>
      <p className={styles.content}>{post.content}</p>
    </div>
  )
}

export default Post;