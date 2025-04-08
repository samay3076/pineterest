const images = [
    {
        url: `https://picsum.photos/200/300`,
        title: 'Nature Photography',
        source: 'unsplash.com'
    },
    {
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqoi-QDYZ-gFG_zPpOXc9kB8xXFr2BfsUYg&s`,
        title: 'Food Photography',
        source: 'unsplash.com'
    },
    {
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-oRlDrviPadml4rsOSuZ_wcFvfMh1DjJ-cA&s`,
        title: 'Travel Photography',
        source: 'unsplash.com'
    },
    {
        url: `https://i.ytimg.com/vi/FHcztviT46U/maxresdefault.jpg`,
        title: 'Architecture',
        source: 'unsplash.com'
    },
    {
        url: `https://source.unsplash.com/random`,
        title: '',
        source: 'unsplash.com'
    },
    {
        url: `https://picsum.photos/1024/1024?nocache=`,
        title: 'Fashion',
        source: 'unsplash.com'
    },
];
;


function createPin(image) {
    const pin = document.createElement('div');
    pin.className = 'pin';
    
    pin.innerHTML = `
        <img src="${image.url}" alt="${image.title}">
        <div class="pin-overlay">
            <div class="top">
                <button class="save-btn">Save</button>
                <button class="more-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div class="bottom">
                <a href="#" class="source">
                    <i class="fas fa-external-link-alt"></i>
                    ${image.source}
                </a>
                <div class="share">
                    <i class="fas fa-share"></i>
                </div>
            </div>
        </div>
    `;
    
    return pin;
}

// Function to load pins
function loadPins() {
    const container = document.querySelector('.pin-container');
    
    // Create multiple sets of images for infinite scroll effect
    for (let i = 0; i < 4; i++) {
        images.forEach(image => {
            const pin = createPin(image);
            container.appendChild(pin);
        });
    }
}


function handleInfiniteScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        loadPins();
    }
}

const modal = document.getElementById('createModal');
const createBtn = document.getElementById('createBtn');
const closeBtn = document.querySelector('.close-btn');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

createBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});


uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        handleImageUpload(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const newPin = {
            url: e.target.result,
            title: 'My Upload',
            source: 'local'
        };
        const pin = createPin(newPin);
        document.querySelector('.pin-container').insertBefore(pin, document.querySelector('.pin'));
        modal.classList.remove('active');
    };
    reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPins();
    window.addEventListener('scroll', handleInfiniteScroll);
});


const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const pins = document.querySelectorAll('.pin');
    
    pins.forEach(pin => {
        const title = pin.querySelector('img').alt.toLowerCase();
        if (title.includes(searchTerm)) {
            pin.style.display = 'block';
        } else {
            pin.style.display = 'none';
        }
    });
});

// Save button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn')) {
        e.target.textContent = 'Saved';
        e.target.style.backgroundColor = '#111';
    }
});