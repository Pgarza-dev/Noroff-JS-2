import { Post } from "@/components/post/post";
import { getSinglePost } from "@/lib/services/posts";

const postsSection = document.querySelector("#posts");

function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  return postId;
}

async function setupPage() {
  const postId = getPostIdFromUrl();
  const singlePost = await getSinglePost(postId);
  postsSection.appendChild(new Post(singlePost));
}

setupPage();
