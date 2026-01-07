import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");
const galleryListItem = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`
  )
  .join("");

galleryList.insertAdjacentHTML("beforeend", galleryListItem);

new SimpleLightbox(".gallery__link", {
  captionsData: "alt",
  captionDelay: 250,
});
