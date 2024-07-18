async function fetchChapter(chapterNumber) {
    const apiUrlchapter = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`;
    const headerschapter = {
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
        'x-rapidapi-key': '86f8b0591fmshfe9efe48ca0a473p1ff713jsnd95e46c20fac'
    };

    try {
        const responsechapter = await fetch(apiUrlchapter, { headers: headerschapter });

        if (!responsechapter.ok) {
            throw new Error('Network response was not ok');
        }

        const datachapter = await responsechapter.json();
        console.log(datachapter);
        return datachapter;
        
    } catch (error) {
        console.error('Error fetching chapter data:', error);
        return null;
    }
}

async function fetchShlokas(chapterNumber) {
    const apiUrl = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/`;
    const headers = {
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
        'x-rapidapi-key': '86f8b0591fmshfe9efe48ca0a473p1ff713jsnd95e46c20fac'
    };

    try {
        const response = await fetch(apiUrl, { headers: headers });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching shlokas:', error);
        return null;
    }
}


function getChapterNumberFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('shloka')) || 1;  // Default to chapter 1 if not specified
}

async function displayShlokas() {
    const shlokaList = document.getElementById('shloka-list');
    const chapterNumber = getChapterNumberFromUrl();
    
    const chapter = await fetchChapter(chapterNumber);
    const shlokas = await fetchShlokas(chapterNumber);

    if (!chapter || !shlokas || shlokas.length === 0) {
        shlokaList.innerHTML = '<p>Error fetching shlokas or chapter data. Please try again later.</p>';
        return;
    }

    shlokaList.innerHTML = ''; // Clear previous content

    // Create the heading for the chapter
    const chapterHeading = document.createElement('h2');
    const chapterLink = document.createElement('a');
    chapterLink.href = `../chapters/chapter.html?chapter=${chapter.chapter_number}`;
    chapterLink.textContent = `Chapter ${chapter.chapter_number}: ${chapter.name} (${chapter.name_translated})`;
    chapterHeading.appendChild(chapterLink);
    
    // Append chapterHeading before shlokaList
    shlokaList.parentNode.insertBefore(chapterHeading, shlokaList);

    shlokas.forEach(shloka => {
        const translationsHTML = shloka.translations.map(translation => `
            <p class="translation"><strong>${translation.author_name}:</strong> ${translation.description}</p>
        `).join('');

        const shlokaHTML = `
            <div class="shloka-container">
                <h3>${shloka.slug}</h3>
                <p class="shloka">${shloka.text}</p>
                ${translationsHTML}
                <div>
                    <h5>Write Comment</h5>
                    <form action="#" method="">
                        <input type="text" id="comment" name="comment" required>
                        <button type="submit">
                            <i class="fas fa-paper-plane"></i> Send
                        </button>
                    </form>
                </div>
                <div class="social-sharing">
                    <div class="chapters-grid">
                        <a href="https://twitter.com/share?url=URL_TO_SHARE" target="_blank">
                            <i class="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=URL_TO_SHARE" target="_blank">
                            <i class="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=URL_TO_SHARE" target="_blank">
                            <i class="fab fa-linkedin-in"></i> Linkedin
                        </a>
                    </div>   
                </div>
            </div>
        `;
        shlokaList.innerHTML += shlokaHTML;
    });
}

// Call displayShlokas function to fetch and display shlokas
document.addEventListener('DOMContentLoaded', displayShlokas);
