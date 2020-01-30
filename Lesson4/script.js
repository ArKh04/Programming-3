var socket = io();

function setup()
{
  createCanvas(1000, 1000);
  background('#acacac');
}
function draw()
{
    fill(0);
    socket.emit("send message", [mouseX,mouseY]);
    function drPx(msg)
    {
        ellipse(msg[0],msg[1],15,15);
    }   
    socket.on('display message', drPx);
}