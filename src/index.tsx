import * as React from "react";
import { render } from "react-dom";
import { watch, createCollection, Subscribable } from "babas";

import App, { Post } from "./App";

const rootElement = document.getElementById("root");

const user = watch({ firstName: "Nolan", lastName: "Phillips" });

interface Methods {
  add(post: Post): Post;
}
const posts = createCollection<Subscribable<Post>, Methods>({}, entries => ({
  add(post: Post) {
    return (entries[post.id] = watch(post));
  }
}));

interface Field {
  type: string;
  label: string;
}

posts.add({ id: "first", title: "First Post" });

posts.first!.subscribe(
  (post, key) => {
    console.log(post, key);
  },
  { title: true }
);

render(<App user={user} posts={posts} />, rootElement);
