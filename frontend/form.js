

let form = document.getElementById('submit');

form.addEventListener("click", postInfo);

function postInfo(e) {
    e.preventDefault();

    var ItemName = document.getElementById('Item').value;
    var count = document.getElementById('longitude').value;
    var pincode = document.getElementById('Pincode').value;

    let url = 'http://localhost:4000/';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Item: ItemName,
            Pincode: pincode,
            Count: count
        })
    }).then((response) => response.json())
    .then((data) => console.log(data))
    .then((error) => console.log(error));
}