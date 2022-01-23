const form = document.querySelector("#searchForm");
let userTerm = "";
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (userTerm) {
        const image = document.querySelectorAll(`.${userTerm}`);
        for (let i of image) {
            i.remove();
        }
    }
    userTerm = form.elements[0].value;
    const url = `https://api.tvmaze.com/search/shows?q=${userTerm}`;
    /*const config = {

        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }*/
    const data = await getMovie(url);
    for (let d of data) {
        if (d.show.image) {
            makeImage(d.show.image.medium, userTerm);
        }
    }
})

async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

function makeImage(img, userTerm) {
    const image = document.createElement("img");
    image.src = img;
    image.classList.add(`${userTerm}`);
    document.body.append(image);
}