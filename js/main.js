import listComp from './listComp.js';

// Fetch list items
fetch('https://jsonplaceholder.typicode.com/photos').then((response) => {
    return response.json();
}).then((data) => {
    let mainWrap = document.getElementById("mainWrap");
    let rowHeight = 50;

    let list = new listComp({data, rowHeight, mainWrap});
    list.init();

}).catch((error) => {
    console.log("Error occured during fetch data", error);
    alert("Error occured");
});