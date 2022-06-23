let img = document.querySelector('.image')
let pictureBox = document.querySelector('.pic-box')

async function getPictures(i) {
    let URL = `https://img.elmaz.com/uploads/img/00/05/48/47/67/5484767/5484767-${i}-rr.jpg?si=8147857`
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('data', data)
        let img = document.createElement('img')
        img.src = data.url
        pictureBox.appendChild(img)

        createPictureBox(data.url)
    } catch (err) {
        console.log(err);
    }
}


// create async await fetch pictures function
// async function getPictures(i) {
//     let URL = `https://img.elmaz.com/uploads/img/00/05/48/47/67/5484767/5484767-${i}-rr.jpg?si=8147857`
//     let response = await fetch(URL)
//     let data = await response.json()
//     console.log('data', data)
//     let img = document.createElement('img')
//     img.src = data.url
//     pictureBox.appendChild(img)

//     createPictureBox(data.url)
// }

for (let i = 1; i <= 20; i++) {  // loop through 20 pictures
    getPictures(i)
}

function createPictureBox(url) {
    let picBox = document.createElement('div')  // create div
    picBox.className = 'pic-box'
    let img = document.createElement('img')  // create img
    img.className = 'image'
    img.src = url
    picBox.appendChild(img)
    pictureBox.appendChild(picBox)
}









