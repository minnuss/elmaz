const corsProxy = "https://cors-anywhere.herokuapp.com/";
const initialURL = prompt("Paste Elmaz profile url");

async function fetchAndProcessImages(initialURL) {
    try {
        // Fetch the HTML content from the given URL
        const response = await fetch(initialURL);
        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }

        const htmlText = await response.text(); // Get the page content as text
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html'); // Parse HTML content into a DOM

        // Start processing the DOM
        const mainContainer = document.createElement('div'); // Main container for images
        mainContainer.className = 'image-container'; // Assign a class for styling
        document.body.appendChild(mainContainer); // Append the container to the body

        // Locate the `div.gallery`
        const gallery = findGalleryElement(doc.body);
        if (gallery) {
            const list = findListElement(gallery);
            processImages(list, mainContainer); // Process images and append them
        } else {
            console.warn('Gallery element not found!');
        }
    } catch (error) {
        console.error(`Error processing images: ${error.message}`);
    }
}

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
function processImages(listElement, container) {
    if (!listElement) return;
    const images = listElement.querySelectorAll('img'); // Select all `img` elements

    images.forEach(img => {
        let src = img.src; // Get the image src
        if (src.includes('-rb.jpg')) {
            src = src.replace('-rb.jpg', '-rr.jpg'); // Replace "rb" with "rr"
            checkAndCreateImage(src, container); // Validate and append the modified image
        }
    });
}

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

fetchAndProcessImages(corsProxy + initialURL);
