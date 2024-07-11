const area = document.getElementsByClassName("main")[0];
console.log(area);
var graph = {};
var graph2 = [];
let dist = [];
var nodenum = 0;
let arr = [];
let adjacencyMatrix = [];
let isEditing = false; // Flag to track editing state

const child=document.getElementsByClassName('instructions')[0];
console.log(child);


function createNode(x, y) {
    const block = document.createElement("div");

    const existingCircle = document.elementFromPoint(x, y);
    if (existingCircle && existingCircle.classList.contains('block')) {
        return;
    } else {
        block.classList.add("block");
        block.style.top = `${y}px`;
        block.style.left = `${x}px`;
        block.style.transform = `translate(-50%,-50%)`;
        block.innerText = `${nodenum}`;
        block.id = nodenum;

        // Add node to graph object
        graph[`node${nodenum}`] = {
            id: nodenum,
            connectedNodes: [],
            lineID: null,
            weights: []
        };

        nodenum++;
    }

    block.addEventListener('click', ()=> {
        block.style.backgroundColor = 'black';
        arr.push(block.id);

        if (arr.length === 2) {
            drawUsingId(arr);
            arr = [];
        }
    });

    area.appendChild(block);
}

const drawUsingId = (ar) => {
    const id1 = Number(ar[0]);
    const id2 = Number(ar[1]);

    // Check if the same node is clicked twice
    if (id1 === id2) {
        document.getElementById(ar[0]).style.backgroundColor = "#333";
        return;
    }

    drawLine(id1, id2);
}

const drawLine = (id1, id2) => {
    // Check if a line already exists between id1 and id2
    if (graph[`node${id1}`].connectedNodes.includes(Number(id2))) {
        console.log(`Line already exists between node ${id1} and node ${id2}`);
        setTimeout(function () {
            document.getElementById(id1).style.backgroundColor = "#333";
            document.getElementById(id2).style.backgroundColor = "#333"
        }, 400); // Delay of 500 milliseconds

        return;
    }

    const block1 = document.getElementById(id1);
    const block2 = document.getElementById(id2);

    const x1 = Number(block1.style.left.slice(0, -2));
    const y1 = Number(block1.style.top.slice(0, -2));
    const x2 = Number(block2.style.left.slice(0, -2));
    const y2 = Number(block2.style.top.slice(0, -2));

    // Length of line
    const len = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    const slope = x2 - x1 ? (y2 - y1) / (x2 - x1) : y2 > y1 ? 90 : -90;

    // Drawing line
    const lineId = `line-${id1}-${id2}`;
    const line = document.createElement("div");
    line.id = lineId;
    line.classList.add("line");
    line.style.width = `${len}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.backgroundColor = id1 < id2 ? 'white' : 'lightseagreen';
    line.style.transform = `rotate(${x1 > x2 ? Math.PI + Math.atan(slope) : Math.atan(slope)}rad)`;

    // Update graph object with connected nodes and line ID
    graph[`node${id1}`].connectedNodes.push(Number(id2));
    const weight = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    graph[`node${id1}`].weights.push(weight);

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = `${weight}`;
    tooltip.contentEditable = true; // Make tooltip editable
    tooltip.addEventListener('focus', function () {
        isEditing = true; // Set flag to true when editing starts
    });
    tooltip.addEventListener('blur', function () {
        isEditing = false; // Reset flag when editing ends
        const newWeight = Number(tooltip.textContent);
        graph[`node${id1}`].weights[graph[`node${id1}`].connectedNodes.indexOf(Number(id2))] = newWeight;
    });

    line.appendChild(tooltip);

    area.appendChild(line);
    setTimeout(function () {
        document.getElementById(id1).style.backgroundColor = "#333";
        document.getElementById(id2).style.backgroundColor = "#333"
    }, 500); // Delay of 500 milliseconds
};

area.addEventListener("click", (event) => {
    child.remove();
    if (isEditing) return; // Do not create a node if editing is in progress
    const x = event.x;
    const y = event.y;
    createNode(x, y);
});

let destr = document.getElementById('destruction');
destr.addEventListener("click", () => {
    area.innerHTML = "";
    nodenum = 0;
    

    Toastify({
        text: "Graph Deleted",
        font: "Outfit",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
    graph = {};
    graph2=[];
    adjacencyMatrix=[];
    dist=[];

});

let complete = document.getElementById('complete');
complete.addEventListener('click', () => {
    run.disabled = false;
    Toastify({
        text: "Graph Initialized",
        fontFamily: "Outfit",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    // Iterate through graph nodes and construct adjacency matrix based on weights
    Object.keys(graph).forEach((nodeKey, i) => {
        const node = graph[nodeKey];
        const row = [];

        console.log(`NODE ${i} (ID: ${nodeKey}): ${JSON.stringify(node)}`);

        Object.keys(graph).forEach((otherNodeKey, j) => {
            const r = [];
            const otherNode = graph[otherNodeKey];
            console.log(`\tOTHERNODE ${j} (ID: ${otherNodeKey}): ${JSON.stringify(otherNode)}`);
            if (node.id == otherNode.id) {
                row.push(0);
            }
            else if (node.connectedNodes.includes(otherNode.id)) {
                const index = node.connectedNodes.indexOf(otherNode.id);
                r.push(node.id);
                r.push(otherNode.id);
                r.push(node.weights[index]);
                row.push(node.weights[index]);
                graph2.push(r);
                console.log(`\t\tConnected to NODE ${i} with weight: ${node.weights[index]}`);
            } else {
                row.push(Infinity); // No connection
                console.log(`\t\tNo connection to NODE ${i} (pushing Infinity)`);
            }
        });

        adjacencyMatrix.push(row);
    });

    console.log('Adjacency Matrix:');
    console.table(adjacencyMatrix);

});


let run = document.getElementById('run');

run.addEventListener('click', () => {
    dist = [];
    if (graph2.length === 0) {
        window.alert("No Graphs Found!!");
    }
    graph2.forEach(edge => {
        const u = edge[0];
        const v = edge[1];
        const lineId = `line-${u}-${v}`;
        const line = document.getElementById(lineId);
        if (line) {
            line.style.backgroundColor = (u < v) ? 'white' : 'lightseagreen';
        }
    });

    let srcnode = document.getElementsByClassName("src")[0];
    console.log(srcnode.value);
    for (let i = 0; i < nodenum; i++) {
        if (i === Number(srcnode.value)) {
            dist.push(0);
        }
        else {
            dist.push(Infinity);
        }
    }

    var edges = graph2.length;
    var nodes = nodenum;

    for (let i = 1; i <= nodes - 1; i++) {
        for (let j = 0; j < edges; j++) {
            const u = graph2[j][0];
            const v = graph2[j][1];
            const weight = graph2[j][2];

            // Check if there's a shorter path from u to v
            if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;

                // Highlight the line between u and v
                const currentLineId = `line-${u}-${v}`;
                const line = document.getElementById(currentLineId);
                if (line) {
                    line.style.backgroundColor = 'green';
                } else {
                    console.warn(`Line ${currentLineId} not found.`);
                }
            }
        }
    }

    // Output distances from srcnode to all nodes
    dist.forEach((distance, index) => {
        console.log(`Distance of node ${index} from node ${srcnode.value} is ${distance}`);
    });
});
