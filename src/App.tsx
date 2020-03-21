import * as React from "react";
import "./styles.css";
import { watch, Subscribable, Collection } from "babas";

import { useCollection, useObject } from "./use-babas";

export interface Post {
  title: string;
  id: string;
}

export interface Props {
  user: Subscribable<{ firstName: string; lastName: string }>;
  posts: Collection<Subscribable<Post>>;
}
export default function App(props: Props) {
  const user = useObject(props.user);
  const posts = useCollection<Subscribable<Post>>(props.posts);

  return (
    <div className="App">
      <h1>Welcome {user.firstName}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        onChange={e => {
          user.firstName = e.target.value;
        }}
      />
      <button
        onClick={() => {
          posts[user.firstName] = watch({
            id: user.firstName,
            title: user.firstName
          });
        }}
      >
        Add Post
      </button>
      <PostCount posts={posts} />
      <ul>
        {posts.toArray().map(post => {
          return (
            <Post
              key={post.id}
              post={post}
              remove={() => {
                delete posts[post.id];
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

const PostCount = React.memo(function({
  posts
}: {
  posts: Collection<Subscribable<Post>>;
}) {
  return <div>{posts.toArray().length}</div>;
});

function Post({ post, remove }: { post: Subscribable<Post>; remove(): void }) {
  useObject(post);
  return (
    <>
      <li>
        {post.title}
        <button
          onClick={() => {
            post.title = post.title + "!";
          }}
        >
          Louder
        </button>
        <button onClick={remove}>Delete</button>
      </li>
    </>
  );
}
