async function fetchChapter() {
    const apiUrl = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18';
    const headers = {
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
        'x-rapidapi-key': '86f8b0591fmshfe9efe48ca0a473p1ff713jsnd95e46c20fac'
    };

    try {
        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chapter data:', error);
        return null;
    }
}

function getChapterNumberFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('chapter')) || 1;  // Default to chapter 1 if not specified
}

async function displayChapter() {
    const chapterContent = document.getElementById('chapter-content');
    const chapterNumber = getChapterNumberFromUrl();
    const data = await fetchChapter();

    if (!data) {
        chapterContent.innerHTML = '<p>Error fetching chapter data. Please try again later.</p>';
        return;
    }

    const chapter = data.find(chap => chap.chapter_number === chapterNumber);
    console.log(chapter);
    console.log('Chapter loaded successfully');

    if (!chapter) {
        chapterContent.innerHTML = '<p>Chapter not found.</p>';
        return;
    }

    const chapterHTML = `
        <h2>
            <a href="../../index.html">Chapter ${chapter.chapter_number}: ${chapter.name} ( ${chapter.name_translated} )</a>
        </h2>
        <div class="chapters-grid">
            <div>
                <strong>Summary:</strong> ${chapter.chapter_summary}
            </div>
            <div>
                <strong>Chapter ${chapter.chapter_number}: ${chapter.name}</strong>
                <strong>Summary:</strong> ${chapter.chapter_summary_hindi}
            </div>
            <div>
                <a href="../shlokas/shloka.html?shloka=${chapter.chapter_number}">
                    <strong>Read more Verses:</strong> ${chapter.verses_count}
                </a>
                <div class="sidebar">
                        <a href="../shlokas/shloka.html?shloka=${chapter.chapter_number}" class="chapter-link">
                            <figure class="figureImage">
                                <img src="../../assets/images/image2.jpg"
                                  alt="Bhagavad Gita" width="70%" height="100%">
                                   <figcaption>Explore and Learn the Bhagavad Gita Anywhere, Anytime!</figcaption>
                            </figure>
                            <span class="read-more">Read More</span>
                        </a>
                </div>
                <div>
                        <h5>Write Comment</h5>
                            <form action="#" method="">
                                <input type="text" id="comment" name="comment" required>
                                <button type="submit">
                                    <i class="fas fa-paper-plane"></i> Send
                                </button>
                            </form>
                </div>
            </div>
        </div>
    `;
    chapterContent.innerHTML = chapterHTML;
}

// Call displayChapter function to fetch and display chapter data
document.addEventListener('DOMContentLoaded', displayChapter);
