const showArea = document.getElementById("showCity");

showArea.addEventListener("click", (e) => {
    if(e.target.className == 'toggle'){
        toggleEfect(e.target.parentElement.nextElementSibling);
    }
})

const toggleEfect = (element) => {
    if(element.style.display != "none"){
        element.style.display = "none";
    }
    else if(element.style.display == "none")
        element.style.display = "block";
}