import { getTotalReactionCount } from "@/lib/utils/getTotalReactionCount";

export function sortByDateAscending(postsData) {
  return postsData.sort((a, b) => {
    return new Date(a.created) - new Date(b.created);
  });
}

export function sortByDateDescending(postsData) {
  return postsData.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
  });
}

export function sortByLikesAscending(postsData) {
  return postsData.sort((a, b) => {
    return (
      getTotalReactionCount(b.reactions) - getTotalReactionCount(a.reactions)
    );
  });
}

export function sortByCommentsAscending(postsData) {
  return postsData.sort((a, b) => {
    return b._count.comments - a._count.comments;
  });
}

export function sortPostsHandler(postsData, sortBySelector) {
  const sortBy = sortBySelector.value;

  switch (sortBy) {
    case "oldest":
      return sortByDateAscending(postsData);
    case "newest":
      return sortByDateDescending(postsData);
    case "mostLikes":
      return sortByLikesAscending(postsData);
    case "mostComments":
      return sortByCommentsAscending(postsData);
    default:
      return postsData;
  }
}
