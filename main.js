let pictureBox = document.querySelector('.pic-box');
let urlSource = prompt('Provide one pic source URL');
const regex = /-(\d+)-r/; // Updated regex to match number between dashes
const match = urlSource.match(regex);

if (match) {
    const originalNumber = match[1]; // Extract the number from the match

    // Loop through numbers 0-20 and display images
    for (let i = 0; i <= 20; i++) {
        // Generate new URL by replacing the original number with the loop index
        let updatedURL = urlSource.replace(`-${originalNumber}-`, `-${i}-`);
        createPictureBox(updatedURL);
    }
} else {
    console.error('The provided URL does not match the expected format.');
}

// Function to create a picture box and append it to the container
function createPictureBox(url) {
    let picBox = document.createElement('div'); // Create div
    picBox.className = 'pic-box'; // Assign class to div

    let img = document.createElement('img'); // Create img element
    img.className = 'image'; // Assign class to img
    img.src = url; // Set the image source to the URL

    picBox.appendChild(img); // Append the img to the div
    pictureBox.appendChild(picBox); // Append the div to the container
}
