const n=15;
let array=[5,6,8,9,4,5,2];
showBar(array);
  
var input=document.getElementById('input');
var get=document.querySelector('#start');
var selectElement = document.getElementById("selector");

get.addEventListener('click',function(){
    console.log(input.value);
   
    console.log(selectElement.value);
    var stringArray = input.value.split(" ");

    array = stringArray.map(function(str) {
    return parseInt(str, 10); // parseInt with base 10
    });
    showBar(array);
    
})



console.log(array);


function bubbleSort(array){
    const swaps=[];
do{ 
    const len = array.length;
    var swapped=false;
    for(let i=1;i<len;i++){
        if(array[i-1]>array[i]){
            swapped=true;
            swaps.push([i-1,i]);
            [array[i-1],array[i]]=[array[i],array[i-1]];
        }
    }

}
while(swapped);
return swaps;
}


function selectionSort(array) {
    const swaps = [];
    const len = array.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swaps.push([i, minIndex]);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return swaps;
}

function insertionSort(array) {
    const swaps = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j - 1] > array[j]) {
            swaps.push([j - 1, j]);
            [array[j - 1], array[j]] = [array[j], array[j - 1]];
            j--;
        }
    }
    return swaps;
}

function play(){
    const copy=[...array];
   
    const selectElement = document.getElementById('selector');
    const selectedValue = selectElement.value;
    
    console.log(selectedValue);
    if (typeof window[selectedValue] === 'function') {

        const swaps =window[selectedValue](copy);
        animate(swaps);
      } else {
        console.error(`${selectedValue} is not a function or does not exist.`);
      }
    
    
   
    
}

function animate(swaps){
    if(swaps.length==0){
        showBar(array);
        return;}
    const [i,j]=swaps.shift();
    [array[i],array[j]]=[array[j],array[i]];
    showBar(array,[i,j]);
    setTimeout(function(){
        animate(swaps);
    },800);
}


function showBar(array,indices){

    const maxVal = Math.max(...array) || 1; // Default to 1 if array is empty
    
    // Calculate the height of the container based on the max value
    const containerHeight = maxVal*8.6; // Adjust multiplier for desired scaling
    
    // Set the height of the container
    container.style.height = containerHeight + "px";
    
    // Clear existing bars
    container.innerHTML = "";
for(let i=0;i<array.length;i++){
    const bar=document.createElement("div");
    bar.style.height=array[i]*8+"px";
    bar.classList.add("bar")
    if(indices && indices.includes(i)){
        const index = indices.indexOf(i);
            bar.style.backgroundColor = index === 0 ? "salmon" : "rgb(0, 255, 183)";
    }
    container.appendChild(bar);

}
}


document.getElementById('navigateButton').addEventListener('click', function() {
    window.location.href = './BELLMANFORD/index.html';
});
