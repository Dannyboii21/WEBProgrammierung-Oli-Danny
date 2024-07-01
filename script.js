document.addEventListener("DOMContentLoaded", function () {
    // Selektiere die Overlay- und Popup-Elemente
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var cookieBanner = document.getElementById('cookie-banner');
    var acceptCookiesBtn = document.getElementById('accept-cookies-btn');

    // Funktion, um das Popup zu öffnen
    function openPopup() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    // Funktion, um das Popup zu schließen
    function closePopup() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    // Funktion, um den Cookie-Banner zu schließen
    function closeCookieBanner() {
        cookieBanner.style.display = 'none';
    }

    // Funktion, um die Cookie-Auswahl zu akzeptieren
    function acceptCookies() {
        closeCookieBanner();
        // Hier kannst du weitere Aktionen ausführen, wenn Cookies akzeptiert werden
    }

    // Füge Event-Listener für das Öffnen und Schließen des Popups hinzu
    document.getElementById('close-popup-btn').addEventListener('click', closePopup);

    // Füge Event-Listener für das Akzeptieren von Cookies hinzu
    acceptCookiesBtn.addEventListener('click', acceptCookies);

    // Überprüfe, ob der Cookie-Banner bereits akzeptiert wurde (durch den Benutzer)
    if (localStorage.getItem('cookiesAccepted')) {
        closeCookieBanner();
    }
    
    // API-Aufruf für ein zufälliges Hundebild oder -video
    fetch('https://random.dog/woof.json')
        .then(response => response.json())
        .then(data => {
            const dogMediaContainer = document.getElementById('dogMediaContainer');
            // Überprüfe, ob die Datei eine Bilddatei ist
            if (data.url.endsWith('.mp4')) {
                // Wenn es eine MP4-Datei ist, erstelle das Video-Element
                const video = document.createElement('video');
                video.controls = true;
                video.src = data.url;
                video.type = 'video/mp4';
                dogMediaContainer.appendChild(video);
            } else {
                // Wenn es eine Bilddatei ist, erstelle das Bild-Element
                const image = document.createElement('img');
                image.src = data.url;
                image.alt = 'Zufälliges Hundebild';
                dogMediaContainer.appendChild(image);
            }
        })
        .catch(error => console.error('Fehler beim Abrufen des Hundebilds oder -videos:', error));
    
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Ändert die Zeit zwischen den Slides (in Millisekunden)
    }

    // Kommentarbereich
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const comment = document.getElementById('comment').value;

        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `<strong>${username}</strong>: <p>${comment}</p>`;

        commentsContainer.prepend(commentElement);

        commentForm.reset();
    });

    // Loginbereich
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        // Hier kannst du die Anmeldeinformationen validieren
        console.log('Login:', loginUsername, loginPassword);

        loginForm.reset();
    });
});
