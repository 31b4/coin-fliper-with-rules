var fotomb = new Array()
function Random(){
    return Math.floor(Math.random() * 12) + 1;
}
function ValidTest(cord,x,y){
    if (cord[0]<x && cord[1]<y && cord[0]>=0 && cord[1]>=0) {
        return true
    }
    return false
}
function Generate5(x,y){
    var rnd5 = [Math.floor(Math.random() * x-1) + 1,Math.floor(Math.random() * y-1) + 1]
    fotomb[rnd5[0]][rnd5[1]] = 2
    counter = 0
}
function ImgHover(onoff,id){
    rnd = document.getElementById(id).value
    if(onoff){
        document.getElementById(id).src="imgs/"+(rnd-1)+".png"
    }else{
        document.getElementById(id).src="imgs/"+rnd+".png"
    }
}
function Generate10(x,y){
    for (let i = 0; i < 10; i++) {
        run = true
        while(run){
            var rndpos = [Math.floor(Math.random() * x-1) + 1,Math.floor(Math.random() * y-1) + 1]
            if(fotomb[rndpos[0]][rndpos[1]]==0){
                run = SameNeighboor(rndpos[0],rndpos[1],8,x,y)
            }
        }
        fotomb[rndpos[0]][rndpos[1]] = 8
    }
    console.log(fotomb)
}
function SameNeighboor(i,j,rnd,x,y){
    var run = false
    if (ValidTest([i+1,j],x,y)) {
        if(fotomb[i+1][j]==rnd){
            run = true
        }
    }
    if (ValidTest([i-1,j],x,y)) {
        if( fotomb[i-1][j]==rnd){
            run = true
        }
    }
    if (ValidTest([i,j+1],x,y)) {
        if( fotomb[i][j+1]==rnd){
            run = true
        }
    }
    if (ValidTest([i,j-1],x,y)) {
        if( fotomb[i][j-1]==rnd){
            run = true
        }
    }
    return run
}
function InsertImg(x,y){
    Generate5(x,y)
    Generate10(x,y)
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            var run = true
            var rnd=0
            while(run){
                run = false
                if(fotomb[i][j] != 0){
                    rnd= fotomb[i][j]
                    break
                }
                rnd = Random()
                if(rnd%2==1){
                    rnd++;
                }
                if (rnd== 2){
                    rnd += 2
                }
                if (rnd== 8){
                    rnd += 2
                }
                console.log(rnd)
                run = SameNeighboor(i,j,rnd,x,y)
            }
            console.log("rndjo "+ rnd)

            var td = document.getElementById(i+","+j)
            fotomb[i][j] = rnd
            var img = document.createElement("img")
            img.style.height="100px"
            img.src="imgs/"+rnd+".png"
            img.id=i+"img"+j
            img.value = rnd
            img.addEventListener('mouseenter', function() {
                ImgHover(true,i+"img"+j)
            }, false);
            img.addEventListener('mouseleave', function() {
                ImgHover(false,i+"img"+j)
            }, false);
            td.appendChild(img)
        }   
    }
}
function ResetAll(){
    fotomb = new Array()
    document.getElementById("table").innerHTML=""
}

function Epit(){
    ResetAll()
    var x = document.getElementById("n").value;
    var y = document.getElementById("in").value;
    for (let i = 0; i < x; i++) {
        var altomb = new Array
        for (let j = 0; j < y; j++) {
           altomb.push(0)
        }
        fotomb.push(altomb)   
    }
    var table = document.getElementById("table")
    for (let i = 0; i < x; i++) {
        var tr = document.createElement("tr")
        for (let j = 0; j < y; j++) {
            var td = document.createElement("td")
            td.id=i+","+j; 
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    InsertImg(x,y)
}