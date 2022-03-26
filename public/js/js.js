console.log('Client side javascript is running succesfully...');

// //Using promise to fetch and parse the json data from an URL
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    document.querySelector('#msg1').textContent = 'Fetching Weather Information for you...';
    document.querySelector('#msg2').textContent = '';

    const location = document.querySelector('input')?.value;
    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('#msg1').textContent = data.error;
                document.querySelector('#msg2').textContent = '';
            }
            else {
                document.querySelector('#msg1').textContent = data.location;
                document.querySelector('#msg2').textContent = data.forecast;
            }
        });
    });
    //console.log('submitted location =' + location);
});