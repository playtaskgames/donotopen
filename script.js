document.addEventListener("DOMContentLoaded", function () {
    // Countdown timer
    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("2024-09-01T00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            countdownElement.innerHTML = "EXPIRED";
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Modal functionality
    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close-button");
    const submitPasswordButton = document.getElementById("submit-password");
    const passwordInput = document.getElementById("password");
    const fileContent = document.getElementById("file-content");
    const passwordSection = document.getElementById("password-section");

    const correctPassword = "NiceYouMadeItToInspectionOrGithubPage";
    // You can get the encrypted text from here, dont bother
    const encryptedText = "Hint 1: <a href='https://www.imdb.com/title/tt1677720/' target='_blank'>https://www.imdb.com/title/tt1677720/</a>";

    document.querySelectorAll('.file').forEach(file => {
        file.addEventListener('click', () => {
            fileContent.innerText = '';
            passwordInput.value = '';
            passwordSection.style.display = 'block';
            modal.style.display = "flex";
        });
    });

    submitPasswordButton.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            fileContent.innerText = `Encrypted Content: ${encryptedText}`;
            passwordSection.style.display = 'none';
        } else {
            fileContent.innerText = "Incorrect password.";
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
        passwordSection.style.display = 'block';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            passwordSection.style.display = 'block';
        }
    });

    // Drag and drop functionality
    interact('.file').draggable({
        inertia: true,
        autoScroll: true,
        listeners: {
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });
    // Drag and drop functionality for modal window using interact.js
    interact('.modal-content').draggable({
        inertia: true,
        autoScroll: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',  // Restrict within the parent element
                endOnly: true
            })
        ],
        listeners: {
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });
    
});
