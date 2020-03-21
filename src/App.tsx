import * as React from "react";
import "./styles.css";
import { watch, Subscribable, Collection } from "babas";

export interface Props {
  user: Subscribable<{ firstName: string; lastName: string }>;
  posts: Collection<Subscribable<{ title: string; id: string }>>;
}
export default function App(props: Props) {
  const user = useObject(props.user);
  const posts = useCollection<{ title: string }>(props.posts);

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

function Post({
  post,
  remove
}: {
  post: Subscribable<{ title: string; id: string }>;
  remove(): void;
}) {
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

function useObject<T>(obj: Subscribable<T>) {
  const [, tick] = React.useState(0);

  React.useEffect(() => {
    return obj.subscribe(() => tick(p => p + 1));
  }, [obj, tick]);

  return obj;
}

function useCollection<T>(col: Collection<T>) {
  const [, tick] = React.useState(0);

  React.useEffect(() => {
    return col.subscribe(() => tick(p => p + 1));
  }, [col, tick]);

  return col;
}
