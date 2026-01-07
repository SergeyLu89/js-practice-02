import { galleryItems } from "./gallery-items.js";
const galleryList = document.querySelector(".gallery");
galleryList.addEventListener("click", onClick);

let instance = null;

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

function onClick(evt) {
  evt.preventDefault();
  const { target } = evt;
  if (!target.classList.contains("gallery__image")) {
    return;
  }
  showModal(target);
}

function showModal({ dataset: { source }, alt }) {
  instance = basicLightbox.create(
    `
    <img src=${source} alt=${alt}>
`,
    {
      onShow: () => {
        document.addEventListener("keydown", onKeyDown);
      },

      onClose: () => {
        document.removeEventListener("keydown", onKeyDown);
      },
    }
  );

  instance.show();
}

function onKeyDown(evt) {
  if (evt.code === "Escape" && instance.visible()) {
    instance.close();
  }
}
