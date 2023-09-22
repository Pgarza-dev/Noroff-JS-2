// Basic Types

/**
 * Represents a reaction on a post.
 * @typedef {Object} ReactionData
 * @property {string} symbol - The symbol for the reaction (e.g., "👍").
 * @property {number} count - The count of this reaction.
 */

/**
 * Represents an author of a comment or post.
 * @typedef {Object} AuthorData
 * @property {string} name - The name of the author.
 * @property {string} email - The email of the author.
 * @property {?string} avatar - The URL to the avatar image.
 * @property {?string} banner - The URL to the banner image.
 */

/**
 * Represents a comment on a post.
 * @typedef {Object} CommentData
 * @property {string} body - The body text of the comment.
 * @property {?number} replyToId - The ID of the comment to which this is a reply.
 * @property {number} id - The ID of the comment.
 * @property {string} created - The creation date (e.g., "2023-08-30T23:59:59Z").
 * @property {AuthorData} author - The author of the comment.
 */

/**
 * Represents a basic post.
 * @typedef {Object} PostDataBasic
 * @property {string} title - The title of the post.
 * @property {string} body - The body text of the post.
 * @property {string[]} tags - The tags associated with the post.
 * @property {?string} media - The URL to any associated media.
 * @property {string} created - The creation date (e.g., "2023-08-30T23:59:59Z").
 * @property {?string} updated - The last updated date (e.g., "2022-01-01T12:34:56Z").
 * @property {number} id - The ID of the post.
 */

// Composable Types

/**
 * Represents a post with comments.
 * @typedef {Object} Comments
 * @property {CommentData[]} comments - The comments on the post.
 * @property {Object} _count - Miscellaneous counts.
 * @property {number} _count.comments - The total number of comments.
 */

/**
 * Represents a post with reactions.
 * @typedef {Object} Reactions
 * @property {ReactionData[]} reactions - The reactions to the post.
 * @property {Object} _count - Miscellaneous counts.
 * @property {number} _count.reactions - The total number of reactions.
 */

/**
 * Represents a post with an author.
 * @typedef {Object} PostAuthor
 * @property {AuthorData} author - The author of the post.
 */

// Combined Types

/**
 * Represents a post with comments.
 * @typedef {PostDataBasic & Comments} PostDataWithComments
 */

/**
 * Represents a post with reactions.
 * @typedef {PostDataBasic & Reactions} PostDataWithReactions
 */

/**
 * Represents a post with an author.
 * @typedef {PostDataBasic & PostAuthor} PostDataWithAuthor
 */

/**
 * Represents a complete post with comments, reactions, and author.
 * @typedef {PostDataBasic & Comments & Reactions & PostAuthor} PostDataComplete
 */
