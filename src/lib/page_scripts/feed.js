import { getAllPosts } from "../services/posts.js";
import { Post } from "../../components/post/post.js";

async function renderFeed() {
  const postsData = await getAllPosts();

  console.log(postsData);

  const postsSection = document.querySelector("#posts");
  postsData.forEach((postData) => {
    postsSection.appendChild(new Post(postData));
  });
}

renderFeed();
