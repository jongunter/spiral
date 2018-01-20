

var spiralForm = document.getElementById('spiral-form');
var input = document.getElementById('spiral-number');
var output = document.getElementById('spiral-output');
spiralForm.addEventListener('submit', event => {
    event.preventDefault();
    const amount = parseInt(input.value);
    if(!isNaN(amount)){
        const spiral = new Spiral(amount);
        const renderer = new StringRenderer(spiral);
        const result = renderer.render();
        output.innerHTML = result;
    }
})