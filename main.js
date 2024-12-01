document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.createElement('div'); // Main container for images
    mainContainer.className = 'image-container'; // Assign a class for styling
    document.body.appendChild(mainContainer); // Append the container to the body

    // Function to recursively traverse the DOM until reaching `div.gallery`
    function findGalleryElement(element) {
        if (!element) return null;
        if (element.classList && element.classList.contains('gallery')) return element;

        // Check children recursively
        for (let child of element.children) {
            const found = findGalleryElement(child);
            if (found) return found;
        }
        return null;
    }

    // Function to find `div.list` inside the gallery
    function findListElement(galleryElement) {
        if (!galleryElement) return null;
        return galleryElement.querySelector('div.list');
    }

    // Function to grab and process all image URLs inside `div.list`
    function processImages(listElement) {
        if (!listElement) return;
        const images = listElement.querySelectorAll('img'); // Select all `img` elements

        images.forEach(img => {
            let src = img.src; // Get the image src
            if (src.includes('-rb.jpg')) {
                src = src.replace('-rb.jpg', '-rr.jpg'); // Replace "rb" with "rr"
                checkAndCreateImage(src, mainContainer); // Validate and append the modified image
            }
        });
    }

    // Start the process from the document body
    const gallery = findGalleryElement(document.body);
    if (gallery) {
        const list = findListElement(gallery);
        processImages(list);
    } else {
        console.warn('Gallery element not found!');
    }
});

// Function to check if an image URL is valid and append it if it is
async function checkAndCreateImage(url, container) {
    try {
        await loadImage(url); // Wait for the image to load
        createPictureBox(url, container); // If successful, create and append the image
    } catch (err) {
        console.warn(`Image not found or failed to load: ${url}`); // Handle errors
    }
}

// Function to load an image (returns a promise)
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image(); // Create a new Image object
        img.src = url;

        // Resolve on successful load
        img.onload = () => resolve(url);

        // Reject on error
        img.onerror = () => reject(url);
    });
}

// Function to dynamically create and append images to the container
function createPictureBox(url, container) {
    const picBox = document.createElement('div'); // Create a new div for each image
    picBox.className = 'pic-box'; // Assign the "pic-box" class

    const img = document.createElement('img'); // Create an img element
    img.className = 'image'; // Assign the "image" class
    img.src = url; // Set the src attribute to the validated URL
    img.alt = "Generated image"; // Add an alt attribute for accessibility

    picBox.appendChild(img); // Append the image to the .pic-box container
    container.appendChild(picBox); // Append the .pic-box to the main container
}
