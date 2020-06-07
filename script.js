var record_animation = false;
var name = "image_"
var total_frames = 400;
var frame = 0;
var loop = 0;
var total_time = 2*Math.PI;
var rate = total_time/total_frames;

var a = 0;
var phase_speed = 0.25;

var t = 0;
const t_rate = .003;

const fps = 30;
var stop_animation = false;
var fpsInterval, startTime, now, then, elapsed;


var interaction_variables = [phase_speed];

const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(fps);



function draw() {

    W = canvas.width = 300; //window.innerWidth;
    H = canvas.height = 300; //window.innerHeight;

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, W, H);

    for(i=150;i--;) {
        k = (1.015)**(i);
        d = 50*k;
        ctx.fillStyle = `rgba(${w=i%2*255},${w},${w},${1})`;
        ctx.fillRect(W/2+30*Math.sin(i*(.6+.5*Math.sin(a))+1*t)*k-d/2, H/2-d/2, d, d)
    }
    ctx.fillStyle = 'rgba(255,255,255,1)'
    ctx.fillRect(W/2-50, H/2-50/2, 100, 50);

    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 20
    ctx.rect(W/2-500, H/2-250, 1000, 500);
    ctx.stroke();

    //t += t_rate;

    a = (.5*phase_speed*1*Math.cos(t))%Math.PI;
  
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
        
        frame = (frame+1)%total_frames;
        time = rate*frame;
        t = time;

        if(record_animation) {

            if (loop === 1) { 
            let frame_number = frame.toString().padStart(total_frames.toString().length, '0');
            let filename = name+frame_number+'.png'
                
            dataURL = canvas.toDataURL();
            var element = document.createElement('a');
            element.setAttribute('href', dataURL);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            }

            if (frame + 1 === total_frames) {
                loop += 1;
            }

            if (loop === 2) { stop_animation = true }
        }
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

}

