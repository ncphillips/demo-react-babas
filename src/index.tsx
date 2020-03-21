import * as React from "react";
import { render } from "react-dom";
import { watch, createCollection } from "babas";

import App from "./App";

const rootElement = document.getElementById("root");

const user = watch({ firstName: "Nolan", lastName: "Phillips" });
const posts = createCollection<{ title: string }>();

render(<App user={user} posts={posts} />, rootElement);
