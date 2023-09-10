// Let's put all the fetch requests here :)

const baseUrl = "";
const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "", // access tokens goes here, but should not be committed to git for security reasons, we'll talk about this later
  },
};

export const getAllPosts = async () => {
  const response = await fetch(`${baseUrl}/social/posts`, options);
  const posts = await response.json();
  return posts;
};
