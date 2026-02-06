const text = ["So, I wanted to do something that stood out. Maybe even sweep you off your feet a bit. So, I decided to do so in the best way I knew how - Building a website.",
        "This website has been made from scratch - from the design, to the words. It was done so to remain authentic and portray genuine emotions. So, I hope you enjoy!",
        "The time we've spent together, though only just a few months, has felt like years to me.",
        "It has been a privilege to experience your beauty, your kindness and hear your innermost thoughts,",
        "which is something I've come to treasure and would never take for granted.",
        "Each day, I am in awe of the traits you've display, such as:",
        "your persistent optimism and faith in the face of trials,",
        "your accountability and willingness assess where you need to improve and work on it,",
        "your tendency to think about others", "Did I mention your beauty?", "You're very beautiful", "Like serious though...",
        "I love your smile...", "I love your laughter...", "You are absolutely Gorgeous! 😍", "Big up Mom and Dad! They did their thing.", "But anyways, long story short - I think you're amazing!",
        "Each day, I am filled with gratitude for the day we started talking.", "I thank God for our lives intersecting, and I hope it is intended for more than just a season.",
        "Now, I don't believe in celebrating valentines's day, so I won't ask you to be my valentine.", "But I do have another question:", "And I would be fully dunce if I didn't ask...",
        "Would you do me the honor of being my girlfriend?"]

const gifs = ["media/1.gif", "media/2.gif", "media/3.gif", "media/4.gif", "media/5.gif"];
const gifContainer = document.querySelector(".gif-container");

let count = 0;

const next = document.getElementById("nextBtn");
const prev = document.getElementById("prevBtn");

const audio = document.getElementById("celebration-audio");

const textArea = document.querySelector(".text");
const btnContainer1 = document.querySelector(".btn-container1");
const btnContainer2 = document.querySelector(".btn-container2");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
let yesScale = 1;
let noScale = 1;

//handles transitions for changing text
function changeText(newText) {
        textArea.classList.add("fade-out");

        setTimeout(() => {
                textArea.textContent = newText;
                textArea.classList.remove("fade-out");
        }, 500); // must match CSS transition duration
}

//Swaps buttons after the user reaches the end of the slides
function swapButtons(){
        btnContainer1.style.display = "none";
        btnContainer2.classList.remove("void");

        setTimeout(() => {
                btnContainer2.classList.remove("fade-out");
        }, 500); // must match CSS transition duration
}

//Handles movement logic for no button
function dodgeButton(button) {
        const padding = 20; // keep it on screen
        const maxX = window.innerWidth - button.offsetWidth - padding;
        const maxY = window.innerHeight - button.offsetHeight - padding;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        button.style.position = "absolute";
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
}

function resizeButtons(shrinkBtn, growBtn){
        noScale -= 0.1;
        yesScale += 0.1;

        shrinkBtn.style.transform = `scale(${Math.max(noScale, 0.4)})`;
        growBtn.style.transform = `scale(${yesScale})`;
}

function showGifs() {
        document.querySelector(".container").classList.add("fade-out");
        gifContainer.style.display = "block";

        gifs.forEach((gif, index) => {
                setTimeout(() => {
                        gifContainer.style.backgroundImage = `url(${gif})`;
                        gifContainer.classList.add("show");

                        // fade out before next gif
                        setTimeout(() => {
                                gifContainer.classList.remove("show");
                        }, 2500);
                }, index * 3000); // stagger
        });
}

function fadeInAudio(audio, duration = 2000) {
        audio.volume = 0;
        audio.play();

        const step = 0.05;
        const interval = duration * step;

        const fade = setInterval(() => {
                if (audio.volume < 1) {
                        audio.volume = Math.min(audio.volume + step, 1);
                } else {
                        clearInterval(fade);
                }
        }, interval);
}

function fadeOutAudio(audio, duration = 2000) {
        const step = 0.05;
        const interval = duration * step;

        const fade = setInterval(() => {
                if (audio.volume > 0) {
                        audio.volume = Math.max(audio.volume - step, 0);
                } else {
                        audio.pause();
                        clearInterval(fade);
                }
        }, interval);
}


noBtn.addEventListener("click", () => {
        resizeButtons(noBtn, yesBtn);
});


document.addEventListener("DOMContentLoaded",()=>{
        textArea.textContent = text[count];
})

//Next button functionality
next.addEventListener("click", function() {
        if (count < text.length-1) {
                count++;
                changeText(text[count]);
        }

        if(count === text.length-1) {
                swapButtons();
        }
})

//Previous button functionality
prev.addEventListener("click", function() {
        if (count > 0) {
                count--;
                changeText(text[count]);
        }
})

// mouse
//noBtn.addEventListener("mouseenter", () => dodgeButton(noBtn));

// touch
//noBtn.addEventListener("touchstart", () => dodgeButton(noBtn));


//Yes Button
yesBtn.addEventListener("click", () => {
        showGifs();
        fadeInAudio(audio, 2000); // fade in over 2s
        for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                        confetti({
                                particleCount: 200,
                                spread: 100,
                                startVelocity: 45,
                                gravity: 0.9,
                                ticks: 300,
                                origin: { y: 0.5 }
                        });

                        confetti({
                                particleCount: 100,
                                spread: 120,
                                origin: { y: 0.7 }
                        });
                }, i * 1200); // stagger each burst
        }

        // fade out audio when gifs are done
        const totalGifTime = gifs.length * 3000;
        setTimeout(() => {
                fadeOutAudio(audio, 2000);
        }, totalGifTime - 2000);
});

