// Let's put all the fetch requests here :)

const baseUrl = "https://api.noroff.dev/api/v1";
const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "", // access tokens goes here, but should not be committed to git for security reasons, we'll talk about this later
  },
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${baseUrl}/social/posts`, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts: ${response.status}, ${response.statusText}`
      );
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
