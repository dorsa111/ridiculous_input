
const gameContainer = document.getElementById('gameContainer');
const phoneNumberDisplay = document.getElementById('phoneNumber');
const clearButton = document.getElementById('clearButton');
const successMessage = document.getElementById('successMessage');
let phoneNumber = "";
const phoneFormat = "(xxx) xxx-xxxx";

function getRandomColor() {
    const colors = [
        'rgba(241, 94, 90, 0.7)', // Joy
        'rgba(94, 241, 181, 0.7)', // Sadness
        'rgba(241, 238, 90, 0.7)', // Fear
        'rgba(241, 180, 90, 0.7)', // Disgust
        'rgba(90, 134, 241, 0.7)'  // Anger
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updatePhoneNumberDisplay() {
    let formattedNumber = phoneFormat;
    for (let i = 0; i < phoneNumber.length; i++) {
        formattedNumber = formattedNumber.replace('x', phoneNumber[i]);
    }
    phoneNumberDisplay.textContent = "Your Phone Number: " + formattedNumber;
}

function createCircle(number) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.textContent = number;
    circle.style.backgroundColor = getRandomColor();

    const startX = Math.random() * (gameContainer.offsetWidth - 100);
    const startY = Math.random() * (gameContainer.offsetHeight - 100);
    let angle = Math.random() * 2 * Math.PI; // Random angle in radians
    const speed = 2;

    circle.style.top = startY + 'px';
    circle.style.left = startX + 'px';

    circle.addEventListener('mousedown', () => {
        if (phoneNumber.length < 10) {
            phoneNumber += number;
            updatePhoneNumberDisplay();
            circle.remove();
            createCircle(number);
            if (phoneNumber.length === 10) {
                showSuccessMessage();
            }
        }
    });

    gameContainer.appendChild(circle);

    function move() {
        const currentLeft = parseFloat(circle.style.left);
        const currentTop = parseFloat(circle.style.top);

        let newLeft = currentLeft + Math.cos(angle) * speed;
        let newTop = currentTop + Math.sin(angle) * speed;

        if (newLeft <= 0 || newLeft >= gameContainer.offsetWidth - 100) {
            angle = Math.PI - angle;
            newLeft = currentLeft + Math.cos(angle) * speed;
        }

        if (newTop <= 0 || newTop >= gameContainer.offsetHeight - 100) {
            angle = -angle;
            newTop = currentTop + Math.sin(angle) * speed;
        }

        circle.style.left = newLeft + 'px';
        circle.style.top = newTop + 'px';

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
}

function createCircles() {
    for (let i = 0; i < 10; i++) {
        createCircle(i);
    }
}

function startGame() {
    createCircles();
}

function clearGame() {
    phoneNumber = "";
    updatePhoneNumberDisplay();
    gameContainer.innerHTML = '';
    createCircles();
}

function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
        clearGame();
    }, 2000);
}

clearButton.addEventListener('click', clearGame);

startGame();
