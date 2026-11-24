
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function(card) {

            const category = card.dataset.category;

            if (selectedFilter === "all" || category === selectedFilter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

const projectImages = document.querySelectorAll(".project-image");

projectImages.forEach(function(image) {

    image.addEventListener("click", function() {

        const background = getComputedStyle(image).backgroundImage;
        const imageUrl = background.match(/url\(["']?(.*?)["']?\)/);

        if (imageUrl) {
            modalImage.src = imageUrl[1];

            const title = image.closest(".project-card")
                .querySelector("h3");

            modalImage.alt = title
                ? title.textContent
                : "Project image";

            imageModal.classList.add("active");
            imageModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }

    });

});

function closeImageModal() {
    imageModal.classList.remove("active");
    imageModal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", function(event) {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && imageModal.classList.contains("active")) {
        closeImageModal();
    }
});
document.getElementById("year").textContent = new Date().getFullYear();

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
