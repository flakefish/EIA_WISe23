for (let index = 0; index < 1000; index++) {
let image = document.createElement('a-image');
let randomX = (Math.random() * 15)  - 5;
let randomY = (Math.random() * 15)  - 5;
let randomZ = (Math.random() * 15)  - 5;

image.setAttribute('width', '0.1');
image.setAttribute('height', '0.1');
//image.setAttribute('position', randomX + ' ' + randomY + ' ' + '-20');
image.setAttribute('animation', "property: position; from:" + randomX + " " + randomY + " " + randomZ + ";  to: -10 1.5 0; dur:" + randomX * 5000 + "; loop: true; easing: easeInOutSine");
image.setAttribute('src', '/22-snowflake-png-image.png');
document.getElementById('1').appendChild(image);
};

