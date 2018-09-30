window.Slider = function(ele) {
  this.flag = false;
  this.init_x = 0; // 初始值
  this.slide_x = 0; // 滑动值
  this.x = 0; // 位移
  this.ele = ele; // htmlElement
};
Slider.prototype = {
  constructor: Slider,
  init() {
    let _self = this;
    let ele = _self.ele;
    // slide
    ele.addEventListener('mousedown', () => {
      _self.down();
    });
    ele.addEventListener('touchstart',() => {
      _self.down();
    })
    ele.addEventListener('touchmove',() => {
      _self.move();
    })
    ele.addEventListener('mousemove', (e) => {
      _self.move();
    });
    ele.addEventListener('touchend',() => {
      _self.drop();
    })
    ele.addEventListener('mouseup', (e) => {
      _self.drop();
    })
    // reset
    ele.addEventListener('click',() => {
      ele.style.left = '0';
    });
  },
  down() {
    this.flag = true;
    let touch;
    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = event;
    }
    this.init_x = touch.clientX;
  },
  move() {
    let touch;
    let ele = this.ele;
    let inner_width = ele.offsetWidth/2;
    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = event;
    }
    if (this.flag) {
      this.slide_x = touch.clientX;
      this.x = this.slide_x - this.init_x;
      if (this.x < 0) {
        ele.style.left = -inner_width + 'px';
      } else if(this.x > 0){
        ele.style.left =  inner_width + 'px'; 
      };
    }
  },
  drop() {
    this.flag = false;
  }
}