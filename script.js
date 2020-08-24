var a = .5
var phase_speed = 0.25;

var t = 0;
var t_rate = .01;

var loop_duration = 4;
var fps = 50;
var t_max = 2*Math.PI;
var total_frames = fps*loop_duration;
t_rate = t_max/total_frames;

var stop_animation = false;
var fpsInterval, startTime, now, then, elapsed;


var interaction_variables = [phase_speed, a];

const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(fps);



function draw() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, W, H);

    for(i=150;i--;) {
        k = (1.015)**(i);
        d = 50*k;
        ctx.fillStyle = `rgba(${w=i%2*255},${w},${w},${1})`;
        ctx.fillRect(W/2+30*Math.sin(i*a+1*t)*k-d/2, H/2-d/2, d, d)
    }
    ctx.fillStyle = 'rgba(255,255,255,1)'
    ctx.fillRect(W/2-50, H/2-50/2, 100, 50);

    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 20
    ctx.rect(W/2-500, H/2-250, 1000, 500);
    ctx.stroke();

    t += t_rate;

    //a = (.5*phase_speed*t)%Math.PI;

    //a = 1.5 + .0*Math.sin(t)

    //console.log(a)
  
}






function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();    
     }

    if (stop_animation) {
        return;
    }

     if(enable_interaction) {
        canvas.addEventListener('mousedown', e => {
            get_mouse_pos = true;
            getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
            get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
     
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
    }
   
 }
 

function getMousePosition(canvas, event) {
    interaction(canvas,event, ...interaction_variables)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event, ...interaction_variables)
}


function interaction(canvas, event, ...interaction_variables) {

    mouse_x = event.clientX/canvas.width;
    mouse_y = event.clientY/canvas.height;

    x_center = mouse_x - 0.5;
    y_center = mouse_y - 0.5;

    phase_speed = 2*Math.abs(y_center);

    a = 2*Math.PI*mouse_y
    //console.log(a);

}

