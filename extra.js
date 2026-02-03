const envelope = document.getElementById("envelope");
const overlay = document.getElementById("intro-overlay");

envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    envelope.style.backgroundImage = `url(media/envelope-open.png)`;

    setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
    }, 1200);
});


