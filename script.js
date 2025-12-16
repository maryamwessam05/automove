const cards = document.querySelectorAll(".modelcard");

cards.forEach(card => {
    const btn = card.querySelector(".viewdeetg:not(.knowmore)");

    btn.addEventListener("click", () => {
        cards.forEach(c => {
            c.classList.remove("active");
            c.classList.add("inactive");
        });

        card.classList.add("active");
        card.classList.remove("inactive");
    });
});