// other imports...
import Head from "next/head";
import Link from "next/link";
import styles from "./styles/Home.module.css";
import { Post } from "../types";

type Props = {
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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name = "description" content = "Generated by create next app" />
        <meta name = "viewport" content = "width=device-width, initial-scale=1" />
        <link rel = "icon" href = "/favicon.ico" />
      </Head>

      <div className={styles.homeContainer}>
        <h2>Rails & Next.js Blog</h2>
        <Link href="/create-post" className={styles.createButton}>
          Create new post
        </Link>

        <div>
          {posts.map((post: Post) => (
            <div key={post.id} className={styles.postCard}>
              <Link href={`/posts/${post.id}`} className={styles.postCardBox}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.content}</p>
              <Link href={`/edit-post/${post.id}`}>
                <button className={styles.editButton}>Edit</button>
              </Link>
              <button className={styles.deleteButton}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}