Slider = function () {
  this.elements = [];
  this.run = true;
}; 

Object.defineProperty(Slider.prototype, "size",{
  get: function(){
    return this.elements.length;
  }
});

Object.defineProperty(Slider.prototype, "currentSlide",{
  get: function(){
    var currentSlide = 0;
    for (var i = 0; i< this.size; i++) {
      if(this.elements[i].visible){
        currentSlide = i;
      }   
    }
    return currentSlide;
  }
});

Slider.prototype.render = function () {
  for(var i = 0, length = this.elements.length; i < length; ++i) {
    var element = this.elements[i];
    element.render();
  }
};

Slider.prototype.add = function(element) {
  if(Array.isArray(element)){
   this.elements.push.apply(this.elements, element);
  }else {
    this.elements.push(element);
  }
};

Slider.prototype.deleteByIndex = function(index) {
  this.elements.splice(index,1);
 };

Slider.prototype.deleteById = function(id) {
  for (var i = 0; i < this.elements.length; i++){
    if( this.elements[i].id === id){
    this.elements.splice(i,1);
    break;
    } 
  }  
};

Slider.prototype.delete = function (slide) {
  var index = this.elements.indexOf(slide);
  this.elements.splice(index,1);
};

Slider.prototype.showNext = function(){
  var point = this.currentSlide;
  this.elements[point].hide();
  if (point === this.size -1 ) {
    this.elements[0].show();
  }else{
    this.elements[point+1].show();
  }
};


Slider.prototype.showBefore = function () {
 var point = this.currentSlide;
  this.elements[point].hide();
  if (point === 0 ) {
    this.elements[this.size -1].show();
  }else{
    this.elements[point-1].show();
  }
  };

Slider.prototype.hideElementByIndex = function(index) {
  this.elements[index].hide();
};
  
Slider.prototype.hideElementById = function(id) {  
  for (var i = 0; i < this.size; i++){
    if( this.elements[i].id === id){
    this.elements[i].hide();
    break;
    } 
  }
};

Slider.prototype.hideElementByLink = function(slide) {
  var index = this.elements.indexOf(slide);
  this.elements[index].hide();
};

Slider.prototype.hideElementByIndexRange = function(index1, index2) {
  for (var i = index1; i <= index2; i++) {
    this.elements[i].hide();
  }
};

Slider.prototype.showElementByIndex = function(index) {
  this.elements[index].show();
};

Slider.prototype.showElementById = function(id) {  
  for (var i = 0; i < this.size; i++){
    if( this.elements[i].id === id){
    this.elements[i].show();
    break;
    } 
  }
};

Slider.prototype.showElementByLink = function(slide) {
  var index = this.elements.indexOf(slide);
  this.elements[index].show();
};

Slider.prototype.showElementByIndexRange = function(index1, index2) {
  for (var i = index1; i <= index2; i++) {
    this.elements[i].show();
  }
};

Slider.prototype.autoShow = function(time, direction) { 
  var self = this;
  if(direction === 'r'){
    if(self.run){
    var intervalID = setInterval(function () {
      if(self.run){
      var point =self.currentSlide; 
      self.elements[point].hide();
      ++point;
      point %= self.size;
      self.elements[point].show();
      }  
    }, time);
  }else{
    clearInterval(intervalID);
  }
}
  if(direction === 'l'){
    if(self.run){
    var intervalI = setInterval(function () {
      if(self.run){
      if(self.currentSlide === 0){
        self.elements[0].hide();
        self.elements[self.size-1].show(); 
      }else{
        var point =self.currentSlide; 
        self.elements[point].hide();
        --point;
        point %= self.size;
        self.elements[point].show();
      }}
    }, time);
  }else{
    clearInterval(intervalI);
  }
  }

};

Slide = function(slide){
  this.slide = slide;
  this.visible = false;
  this.id = Math.floor(Math.random()*100);
};

Slide.prototype.hide = function (){
 this.visible = false;
 this.render();
};

Slide.prototype.show = function (){
 this.visible = true;
 this.render();
};

Slide.prototype.toString = function () {
 return "Информация об объекте " + this.visible + " " + this.slide;
};

Slide.prototype.render = function () {
  if(this.visible) {
    this.slide.removeAttribute('style', 'display: block');
  } else {
    this.slide.setAttribute('style', 'display: none;');
  }
};
//работа с домиком

var test = new Slider();
var slides = document.querySelectorAll( ".slide" );
for (var i = 0; i < slides.length; i++) {
  test.add(new Slide (slides[i]));
};


var buttonNext = document.querySelector('.slider-next');
buttonNext.addEventListener( "click", function () {
  test.showNext();
});

var buttonBefore = document.querySelector('.slider-previous');
buttonBefore.addEventListener( "click", function () {
  test.showBefore();
});

var stop = document.querySelector('.slider-wrapper');
stop.addEventListener('mouseenter', function () {
  test.run = false;
});

var runner = document.querySelector('.slider-wrapper');
runner.addEventListener('mouseleave', function () {
  test.run = true;
});

test.showElementByIndex(0);
test.render();
test.autoShow(5000,'r');