import { CustomComponent } from "../customComponent.js";
import userCardHtml from "./userCard.html?raw";

export class UserCard extends CustomComponent {
  constructor(user) {
    super();
    this.innerHTML = userCardHtml;
    this.user = user;
  }

  connectedCallback() {
    this.populateData({
      username: this.user.name,
      userProfileLink: {
        type: "attribute",
        attrName: "href",
        attrValue: `/user/?username=${this.user.name}`,
      },
      avatar: {
        type: "attribute",
        attrName: "src",
        attrValue: this.user.avatar || "/images/default_user.png",
      },
      userFollowers: this.setFollowersText(this.user._count.followers),
      userFollowing: this.setFollowingText(this.user._count.following),
      userPostsCount: this.setPostCountText(this.user._count.posts),
    });

    this.addEventListeners();
  }

  addEventListeners() {
    this.onClick("followBtn", this.followUser);
  }

  setFollowersText(count) {
    return count === 1 ? `${count} follower` : `${count} followers` || "";
  }

  setFollowingText(count) {
    return `${count} following` || "";
  }

  setPostCountText(count) {
    return count === 1 ? `${count} post` : `${count} posts` || "";
  }

  followUser() {
    // todo finish follow user for user card
    console.log("Follow user");
  }
}

customElements.define("user-card", UserCard);
