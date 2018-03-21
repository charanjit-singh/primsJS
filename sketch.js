var x=0;
var vertexCount=0;
var CanvasX=800,CanvasY=600;
var pointsClickedX=[];
var pointsClickedY=[];
var idClicked=[];
var selectedCount=0;
var idSelected=[];
var inputBox;


function setup()
{
    CanvasX=window.innerWidth-20;
    CanvasY= window.innerHeight-20;
 createCanvas(CanvasX,CanvasY);
 strokeWeight(4);
 textSize(30);

}

function draw()
{

}
function isInsideCanvas()
{
    return mouseX<CanvasX&&mouseY<CanvasY;
}

function isInSafeZone(x,y)
{
    for(var i=0;i<pointsClickedX.length;i+=1)
    {
        if(x<pointsClickedX[i]+80 && x> pointsClickedX[i]-80)
        {
            for(var j=0;j<pointsClickedY.length;j+=1)
            {
                 if(y<pointsClickedY[i]+80 && y> pointsClickedY[i]-80)
                 {
                     return 0;
                 }
            }
        }
        
    }
    return 1;
    
}
function getNodeOn(x,y)
{
    var returnValue=[];
    
    for(var i=0;i<pointsClickedX.length;i+=1)
    {
        if(x<pointsClickedX[i]+30 && x> pointsClickedX[i]-30)
        {
            for(var j=0;j<pointsClickedY.length;j+=1)
            {
                 if(y<pointsClickedY[i]+30 && y> pointsClickedY[i]-30)
                 {
                     
                     returnValue.push(pointsClickedX[i]);
                     returnValue.push(pointsClickedY[i]);
                     returnValue.push(idClicked[i]);
                     return returnValue;
                 }
            }
        }
        
    }
    return 0;
    
    
}
function touchEnded()
{
   
 if(isInsideCanvas())
 {
     if(isInSafeZone(mouseX,mouseY))
     {
         fill(255);
     ellipse(mouseX,mouseY,80,80);
     fill(0);
     text(vertexCount,mouseX,mouseY);
     
     idClicked.push(vertexCount);
     vertexCount+=1;
     pointsClickedX.push(mouseX);
     pointsClickedY.push(mouseY);
     }
 
 else if(getNodeOn(mouseX,mouseY))
 {
     if(selectedCount<=1)
     {
    selectedCount+=1;
     var coords=getNodeOn(mouseX,mouseY);
     
     idSelected.push(coords[2]);
     fill(255,0,0);
     ellipse(coords[0],coords[1],80,80);
     fill(255,255,0);
     text(coords[2],coords[0],coords[1]);
     fill(0); 
     if(drawEdges()){
     fill(255);
     ellipse(pointsClickedX[idSelected[0]],pointsClickedY[idSelected[0]],80,80);
     fill(0);
     text(idClicked[idSelected[0]], pointsClickedX[idSelected[0]],pointsClickedY[idSelected[0]]);
     fill(255);
     ellipse(pointsClickedX[idSelected[1]],pointsClickedY[idSelected[1]],80,80);
     fill(0);
     text(idClicked[idSelected[1]], pointsClickedX[idSelected[1]],pointsClickedY[idSelected[1]]);
     
     inputBox = createInput();
    
    inputBox.position( Math.abs(pointsClickedX[idSelected[0]]+pointsClickedX[idSelected[1]])/2,Math.abs(pointsClickedY[idSelected[0]]+pointsClickedY[idSelected[1]])/2);
    inputBox.size(0);
    inputBox.elt.focus();
    
    inputBox.input(handleInput);
    
     console.log(inputBox);
     }
     
     }
     else
     {
         //deselect All;
         selectedCount=0;
         idSelected=[];
         drawEdges();
     }
     
 }

 }   
}
function drawEdges()
{
    if(selectedCount==2)
    {
        fill(100);
        
        line(pointsClickedX[idSelected[0]],pointsClickedY[idSelected[0]],pointsClickedX[idSelected[1]],pointsClickedY[idSelected[1]] );
    
        return 1;
    }
    else 
    {
        //unSelect all
        
        return 0;
    }
}

function handleInput()
{
    var labelX,labelY;
    labelX=Math.abs(pointsClickedX[idSelected[0]]+pointsClickedX[idSelected[1]])/2;
        labelY=Math.abs(pointsClickedY[idSelected[0]]+pointsClickedY[idSelected[1]])/2;
    if(this.value()[this.value().length-1]=='x')
    {
console.log('END');
this.remove();
return;
    }
    fill(0,255,0);
    
     text(this.value(),labelX,labelY).rotate(30);
   
    console.log(this.value());
}
