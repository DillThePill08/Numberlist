function execute(list) {
    var code = list.split(/\n/g) //format string into array
    for (let i = 0; i < code.length; i++) { //iterate over array
        let int = parseInt(code[i]) //parse cmd into integer
        if (!isNaN(int)) { //if it's a real number
            code[i] = int //replace with number
        } else { //if it's a fake number
            code.splice(i, 1) //remove it
            i-- //move it back one to account for loss
        }
    }
    //we now have formatted code
    var pc = 0
    var cycle = ""
    var output = []
    var prev = 0
    //this thing for cycling
    function executeCycle() {
        if (cycle.length == 3) {
            switch (cycle) {
                case "ooo":
                    output.push(code[pc]) //output
                    break
                case "ooe":
                    code[pc] += code[pc + 1] || 0 //add
                    break
                    case "oeo":
                    code[pc] -= code[pc + 1] || 0 //subtract
                    break
                case "oee":
                    let pt = parseInt(prompt("Input"))//input
                    if (!isNaN(pt)) { //if it's a real number
                        code[pc] = pt //store it
                    } else { //if not
                        code[pc] = 0 //store zero
                    }
                    break
            }
            cycle = ""
        }
    }
        
    while (pc >= 0 && pc < code.length && code[pc]) {
        prev = code[pc] //prev to remember move
        executeCycle() //cycle if possible
        //add to cycle
        if (prev % 2) {
            cycle += "o"
        } else {
            cycle += "e"
        }
        pc += prev //move
        
        console.log(pc, prev, cycle)
    }
    document.getElementById("output").value = output.join(", ")
	document.getElementById("leftover").value = code.join("\n")
}