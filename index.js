//welcome section auto typing credit to https://codepen.io/gschier/pen/DLmXKJ

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

  //Carousel bit

  var carousel = $('#carousel'),
  threshold = 150,
  slideWidth = 500,
  dragStart, 
  dragEnd;

$('#next').click(function(){ shiftSlide(-1) })
$('#prev').click(function(){ shiftSlide(1) })

carousel.on('mousedown', function(){
if (carousel.hasClass('transition')) return;
dragStart = event.pageX;
$(this).on('mousemove', function(){
  dragEnd = event.pageX;
  $(this).css('transform','translateX('+ dragPos() +'px)')
})
$(document).on('mouseup', function(){
  if (dragPos() > threshold) { return shiftSlide(1) }
  if (dragPos() < -threshold) { return shiftSlide(-1) }
  shiftSlide(0);
})
});

function dragPos() {
return dragEnd - dragStart;
}

function shiftSlide(direction) {
if (carousel.hasClass('transition')) return;
dragEnd = dragStart;
$(document).off('mouseup')
carousel.off('mousemove')
        .addClass('transition')
        .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
setTimeout(function(){
  if (direction === 1) {
    $('.slide:first').before($('.slide:last'));
  } else if (direction === -1) {
    $('.slide:last').after($('.slide:first'));
  }
  carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
},700)
} 