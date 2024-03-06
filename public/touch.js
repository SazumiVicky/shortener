/*
* dev: Sazumi Viki
* ig: @moe.sazumiviki
* gh: github.com/sazumivicky
* site: sazumi.moe
*/

document.addEventListener("DOMContentLoaded", function() {
    const assistiveTouch = document.createElement('div');
    assistiveTouch.classList.add('assistive-touch');
    const image = document.createElement('img');
    image.src = 'http://cdn.sazumi.moe/file/78j9er.jpg';
    image.classList.add('assistive-image');
    assistiveTouch.appendChild(image);
    document.body.appendChild(assistiveTouch);

    let isDragging = false;
    let startX, startY, offsetX, offsetY;
    let isClick = false;

    const touchStartHandler = function(event) {
        const touch = event.targetTouches[0];
        isDragging = true;
        startX = touch.clientX;
        startY = touch.clientY;
        offsetX = assistiveTouch.offsetLeft;
        offsetY = assistiveTouch.offsetTop;
        event.preventDefault();
        isClick = true;
        setTimeout(function() {
            isClick = false;
        }, 300);
    };

    const touchMoveHandler = function(event) {
        if (isDragging) {
            const touch = event.targetTouches[0];
            const newX = offsetX + touch.clientX - startX;
            const newY = offsetY + touch.clientY - startY;
            assistiveTouch.style.left = newX + 'px';
            assistiveTouch.style.top = newY + 'px';
            event.preventDefault();
        }
    };

    const touchEndHandler = function(event) {
        isDragging = false;
        if (isClick) {
            displayPopup();
        }
    };

    assistiveTouch.addEventListener('touchstart', touchStartHandler);
    assistiveTouch.addEventListener('touchmove', touchMoveHandler);
    assistiveTouch.addEventListener('touchend', touchEndHandler);

    assistiveTouch.addEventListener('mousedown', function(event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        offsetX = assistiveTouch.offsetLeft;
        offsetY = assistiveTouch.offsetTop;
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            assistiveTouch.style.left = (event.pageX - startX + offsetX) + 'px';
            assistiveTouch.style.top = (event.pageY - startY + offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    const displayPopup = function() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        const popup = document.createElement('div');
        popup.classList.add('popup-container');
        popup.innerHTML = `
            <p>Sazumi Shortener Link simplifies URL creation by providing quick access to shortened and memorable URLs. With its straightforward interface, users can swiftly input long URLs and obtain shortened versions.Additionally, the service stores URL history locally for convenient access, making it an optimal choice for streamlining link sharing and access.</p>
            <span class="close-btn">&times;</span>
            <div class="social-icons">
                <a href="https://t.me/sazumiviki" target="_blank" class="social-icon">
                    <img src="https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/telegram.png" alt="Telegram">
                    <span>Telegram</span>
                </a>
                <a href="https://facebook.com/moe.sazumiviki" target="_blank" class="social-icon">
                    <img src="https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/facebook.png" alt="Facebook">
                    <span>Facebook</span>
                </a>
                <a href="https://instagram.com/moe.sazumiviki" target="_blank" class="social-icon">
                    <img src="https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/instagram%20(1).png" alt="Instagram">
                    <span>Instagram</span>
                </a>
            </div>
        `;
        document.body.appendChild(popup);

        const closeBtn = popup.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            popup.remove();
            overlay.remove();
        });
    };

    assistiveTouch.addEventListener('click', function(event) {
        if (!isClick) {
            displayPopup();
        }
    });

    document.addEventListener('click', function(event) {
        const clickInside = assistiveTouch.contains(event.target);
        if (!clickInside) {
            const popup = document.querySelector('.popup-container');
            if (popup && !popup.contains(event.target)) {
                popup.remove();
                document.querySelector('.overlay').remove();
            }
        }
    });
});
