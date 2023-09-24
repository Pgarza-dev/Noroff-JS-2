import { CustomComponent } from "../customComponent.js";

export class PostMedia extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   */
  constructor(postData) {
    super();
    this.postData = postData;
  }

  connectedCallback() {
    const mediaElement = this.createPostMedia();
    if (mediaElement) {
      this.appendChild(mediaElement);
    }
  }

  createPostMedia() {
    if (this.postData.media) {
      const image = document.createElement("img");
      image.src = this.postData.media;
      image.alt = `${this.postData.author.name} posted an image with the title ${this.postData.title}.`;
      image.classList.add("post-media");
      return image;
    } else {
      return null;
    }
  }
}

customElements.define("post-media", PostMedia);
