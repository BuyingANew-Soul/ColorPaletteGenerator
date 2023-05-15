const form = document.querySelector("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    var text = form.elements.text.value;
    fetch("/palette", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            text: text
        })
    })
    .then(response => response.json())
    .then(data => {
        const colors = data.colors;
        const container = document.querySelector(".container");
        container.innerHTML = "";
        colors.forEach(color => {
            const div = document.createElement("div");
            div.style.backgroundColor = color;
            div.classList.add("color");
            div.style.width = `calc(100%/ ${colors.length})`

            // copying color code by clicking the color divs
            div.addEventListener("click", function(){
                navigator.clipboard.writeText(color);
            });

            // showing the hex codes on colors
            const span = document.createElement("span");
            span.innerText = color;
            div.appendChild(span);
            
            container.appendChild(div);
        });
    })
})   