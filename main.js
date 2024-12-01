document.addEventListener("DOMContentLoaded", () => {
    // Prompt the user for a URL when the page is loaded
    let urlSource = prompt('Provide one pic source URL (e.g., https://img.elmaz.com/uploads/img/00/06/01/22/99/6012299/6012299-3-rr.jpg?si=8738543)');

    // Ensure the user provides a URL
    if (!urlSource) {
        console.error('No URL provided.');
        alert('Please reload the page and provide a valid URL.');
        return;
    }

    let container = document.querySelector('.container'); // Select the main container
    const regex = /-(\d+)-r/; // Regex to match the number between dashes
    const match = urlSource.match(regex);

    if (match) {
        const originalNumber = match[1]; // Extract the matched number

        // Loop through numbers 0-20 and dynamically check and append images
        for (let i = 0; i <= 20; i++) {
            // Generate a new URL by replacing the matched number
            let updatedURL = urlSource.replace(`-${originalNumber}-`, `-${i}-`);
            checkAndCreateImage(updatedURL);
        }
    } else {
        console.error('The provided URL does not match the expected format.');
        alert('The URL format is invalid. Please reload and try again with a correct format.');
    }

    // Function to check if an image URL is valid and append it if it is
    function checkAndCreateImage(url) {
        let img = new Image(); // Create a new Image object
        img.src = url;

        // Load event confirms the image is valid
        img.onload = () => {
            createPictureBox(url); // Append the image if it loads successfully
        };

        // Error event skips the image if it cannot be loaded
        img.onerror = () => {
            console.warn(`Image not found: ${url}`); // Log the invalid image URL
        };
    }

    // Function to dynamically create and append images to the container
    function createPictureBox(url) {
        let picBox = document.createElement('div'); // Create a new div for each image
        picBox.className = 'pic-box'; // Assign the "pic-box" class

        let img = document.createElement('img'); // Create an img element
        img.className = 'image'; // Assign the "image" class
        img.src = url; // Set the src attribute to the validated URL
        img.alt = "Generated image"; // Add an alt attribute for accessibility

        picBox.appendChild(img); // Append the image to the .pic-box container
        container.appendChild(picBox); // Append the .pic-box to the main container
    }
});
