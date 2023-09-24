import { getAllPosts } from "../services/posts.js";
import { Post } from "../../components/post/post.js";
import { postStore } from "../stores/postStore.js";

async function renderFeed() {
  const postsData = await getAllPosts();
  postStore.setState(() => ({ posts: postsData }));

  const postsSection = document.querySelector("#posts");
  postsData.forEach((postData) => {
    postsSection.appendChild(new Post(postData));
  });
}

renderFeed();
