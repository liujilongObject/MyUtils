!function () {
  window.Dragable = function(options={}){
     this.flag = false; // 开关
     if(JSON.stringify(options) !== '{}') {
       this.borderline = options.borderline;
     }else {
       this.borderline = true;
     }
     this.cur = { // 上一次坐标
      x: 0,
      y: 0
     };
     this.origin = {
      dx: 0, // 偏移量
      dy: 0,
      nx: 0, // 坐标差值
      ny: 0
     }
  };
  Dragable.prototype = {
      constructor:Dragable,
      init() {
        let outer = document.querySelector('.outer');
        let inner = document.querySelector('.inner');
        let _self = this;
        // start
        inner.addEventListener("mousedown", function () {
          _self.down(inner);
        }, false);
        inner.addEventListener("touchstart", function () {
          _self.down(inner);
        }, false)
        // move
        inner.addEventListener("mousemove", function () {
          _self.move(inner, outer);
        }, false);
        inner.addEventListener("touchmove", function () {
          _self.move(inner, outer);
        }, false)
        // end
        _self.drop(inner);
      },
      down(inner) {
        this.flag = true;
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.cur.x = touch.clientX;
        this.cur.y = touch.clientY;
        this.origin.dx = inner.offsetLeft; //相对偏移量
        this.origin.dy = inner.offsetTop;
      },
      move(inner, outer) {
        let _self = this;
        let b_width = outer.offsetWidth - inner.offsetWidth;
        let b_height = outer.offsetHeight - inner.offsetHeight;
        let x, y;
        if (_self.flag) {
          let touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          _self.origin.nx = touch.clientX - _self.cur.x; //当前坐标
          _self.origin.ny = touch.clientY - _self.cur.y;
          x = _self.origin.dx + _self.origin.nx; // 移动距离
          y = _self.origin.dy + _self.origin.ny;
          // 判断边界
          if(_self.borderline) {
            // x轴
            if (x <= 0) {
              x = 0;
              inner.style.boxShadow = '-3px 0 5px #aaa';
            } else if (x >= b_width) {
              x = b_width;
              inner.style.boxShadow = '3px 0 5px #aaa';
            }else {
              inner.style.boxShadow = '';
            }
            // y轴
            if (y <= 0) {
              y = 0;
              inner.style.boxShadow = '0 -3px 5px #aaa';
            } else if (y >= b_height) {
              y = b_height;
              inner.style.boxShadow = '0 3px 5px #aaa';
            }
          }
          inner.style.left = x + "px";
          inner.style.top = y + "px";
          // 阻止页面的滑动默认事件
          document.addEventListener('touchstart', function (event) {
            if (event.cancelable) {
              if (!event.defaultPrevented) {
                event.preventDefault();
              }
            }
          }, {
            passive: false
          });
        }
      },
      drop(inner) {
        let _self = this;
        document.body.addEventListener("mouseup", function () {
          _self.flag = false;
          inner.style.boxShadow = '';
        }, false);
        inner.addEventListener("touchend", function () {
          _self.flag = false;
          inner.style.boxShadow = '';
        }, false)
      }
    };
    
}();