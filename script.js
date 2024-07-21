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
    const encryptedText = "Hint 1 <br> <a href='https://www.imdb.com/title/tt1677720/' target='_blank'>https://www.imdb.com/title/tt1677720/</a>";

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
            fileContent.innerHTML = `${encryptedText} <br> Keep that in mind ;)`;
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

    interact('.modal-content').draggable({
        inertia: true,
        autoScroll: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
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

    const followersGoal = 50000;
    const followersCountElement = document.getElementById("followers-count");
    const progressBar = document.getElementById("progress-bar");

    const pixelateImage = (img, pixelationFactor) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const originalWidth = img.width;
        const originalHeight = img.height;

        canvas.width = originalWidth;
        canvas.height = originalHeight;

        context.drawImage(img, 0, 0, originalWidth, originalHeight);

        if (pixelationFactor !== 0) {
            for (let y = 0; y < originalHeight; y += pixelationFactor) {
                for (let x = 0; x < originalWidth; x += pixelationFactor) {
                    const pixel = context.getImageData(x, y, 1, 1).data;
                    context.fillStyle = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`;
                    context.fillRect(x, y, pixelationFactor, pixelationFactor);
                }
            }
        }

        const dataURL = canvas.toDataURL();
        document.getElementById("background-container").style.backgroundImage = `url(${dataURL})`;
    };

    const updateUI = (followersCount) => {
        followersCountElement.textContent = followersCount.toLocaleString();
        const progressPercentage = (followersCount / followersGoal) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        const maxPixelSize = 50;
        const pixelSize = maxPixelSize - (maxPixelSize * (followersCount / followersGoal));
        const img = new Image();
        img.src = 'trump.jpg';
        img.onload = () => pixelateImage(img, Math.max(pixelSize, 1));
    };

    const fetchFollowerCount = () => {
        fetch('/api/fetchFollowers')
            .then(response => response.json())
            .then(data => {
                console.log("Follower count fetched:", data.followersCount);
                updateUI(data.followersCount);
            })
            .catch(error => {
                console.error('Error fetching follower count:', error);
            });
    };

    // Fetch initial follower count
    fetchFollowerCount();

    // Set interval to fetch follower count every minute
    setInterval(fetchFollowerCount, 60000);
});
