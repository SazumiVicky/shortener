/*
* dev: Sazumi Viki
* ig: @moe.sazumiviki
* gh: github.com/sazumivicky
* site: sazumi.moe
*/

function saveToLocalStorage(shortUrl) {
    let history = JSON.parse(localStorage.getItem('shortUrlHistory')) || [];
    history.unshift(shortUrl);
    if (history.length > 5) {
        history.pop();
    }
    localStorage.setItem('shortUrlHistory', JSON.stringify(history));
}

function loadFromLocalStorage() {
    let history = JSON.parse(localStorage.getItem('shortUrlHistory')) || [];
    const shortUrlList = document.getElementById('shortUrlList');
    shortUrlList.innerHTML = '';
    history.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        shortUrlList.appendChild(listItem);
    });
}

window.addEventListener('load', loadFromLocalStorage);

document.getElementById('shortenForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let longUrl = document.getElementById('longUrlInput').value;
    if (!longUrl) {
        const popup = document.createElement('div');
        popup.textContent = 'Please Input Link';
        popup.classList.add('input-popup');
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 3000);
        return;
    }
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        const popup = document.createElement('div');
        popup.textContent = 'Enter the link with http / https';
        popup.classList.add('input-popup');
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 3000);
        return;
    }
    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            longUrl: longUrl,
        }),
    });
    const shortUrl = await response.text();
    const shortUrlList = document.getElementById('shortUrlList');
    const listItem = document.createElement('li');
    listItem.textContent = shortUrl;
    if (shortUrlList.children.length >= 5) {
        shortUrlList.removeChild(shortUrlList.lastChild);
    }
    shortUrlList.insertBefore(listItem, shortUrlList.firstChild);
    saveToLocalStorage(shortUrl);
});

document.getElementById('shortUrlList').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const textToCopy = e.target.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const popup = document.createElement('div');
            popup.textContent = 'Link Copied';
            popup.classList.add('copy-popup');
            document.body.appendChild(popup);
            setTimeout(() => {
                popup.remove();
            }, 3000);
        }).catch((error) => {
            console.error('Error copying text: ', error);
        });
    }
});
