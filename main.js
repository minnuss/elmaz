document.addEventListener("DOMContentLoaded", async () => {
    // Prompt the user for a base URL
    let urlSource = prompt('Provide one pic source URL (e.g., https://img.elmaz.com/uploads/img/00/06/01/22/99/6012299/6012299-3-rr.jpg?si=8738543)');

    // Validate the user-provided URL
    if (!urlSource) {
        console.error('No URL provided.');
        alert('Please reload the page and provide a valid URL.');
        return;
    }

    const container = document.querySelector('.container'); // Select the container
    const regex = /-(\d+)-r/; // Regex to match the dynamic number in the URL
    const match = urlSource.match(regex);

    if (match) {
        const originalNumber = match[1]; // Extract the matched number
        const start = parseInt(originalNumber); // Convert to number for manipulation

        // Loop through numbers 0-20 and dynamically generate and check images
        for (let i = 0; i <= 20; i++) {
            let updatedURL = urlSource.replace(`-${originalNumber}-`, `-${i}-`); // Update URL
            await checkAndCreateImage(updatedURL, container); // Await ensures sequential execution
        }
    } else {
        console.error('The provided URL does not match the expected format.');
        alert('The URL format is invalid. Please reload and try again with a correct format.');
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
});
