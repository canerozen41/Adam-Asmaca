const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const playAgainBtn = document.getElementById("play-again");
const wrongLetter_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");

let correctLetters = [];
const wrongLetters = [];

let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascript", "java", "python","css","html"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_el.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </div>
        `).join("")}
    `;
    
    const w = word_el.innerText.replace(/\n/g, "").replace(/\s/g, "");
    if (w === selectedWord) {
        popup.style.display = "flex";
        message_el.innerText = "Tebrikler Kazandınız";
    }
}

playAgainBtn.addEventListener("click", () => {
    correctLetters = [];
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    items.forEach(item => item.style.display = "none");
    popup.style.display = "none";
});

displayWord();

function updateWrongLetters() {
    wrongLetter_el.innerHTML = `
        ${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join("")}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = "flex";
        message_el.innerText = "Malesef Kaybettiniz.";
    }
}

window.addEventListener("keydown", function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
});

function showNotification() {
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);
}
