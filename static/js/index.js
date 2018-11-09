window.onload = function() {
  var slide = document.querySelectorAll(".slide"),
      winH = window.innerHeight,
      totalDist = (slide.length-1) * winH;
      start = 0,
      end = 0,
      index = 0,
      dist = 0,
      startY = 0,
      endY = 0;
  slide.forEach(function(el) {
    el.style.height = winH + 'px';
  });
  var EventUtil = {
    addHandler: function(el, type, handler) {
      if(el.addEventListener) {
        el.addEventListener(type, handler, false);
      } else if(el.attachEvent) {
        el.attachEvent('on' + type, handler);
      } else {
        el.on[type] = handler;
      }
    },
    getWheelDelta: function(ev) {
      return ev.wheelDelta ? ev.wheelDelta : -ev.detail * 40;
    },
    getEvent: function(ev) {
      return ev ? ev : window.ev;
    },
    ua: navigator.userAgent
  };
  function movePages(ev) {
    var event = EventUtil.getEvent(ev),
        wheelDelta = EventUtil.getWheelDelta(event),
        wrap = document.querySelector(".wrap");
    start = new Date().getTime();
    if(end - start < -600) {
      if(wheelDelta < 0 && dist > -totalDist) {
        dist -= winH;
        wrap.style.transform = "translate3d(0, " + dist + "px, 0)";
        end = new Date().getTime();
        console.log("down");
      } else if(wheelDelta > 0 && dist < 0) {
        dist += winH;
        wrap.style.transform = "translate3d(0, " + dist + "px, 0)";
        end = new Date().getTime();
        console.log('up');
      }
    } else {
      ev.preventDefault();
    }
  }
  function mobliePage(ev) {

  }
  if(EventUtil.ua.toLowerCase().indexOf("firefox") === -1) {
    EventUtil.addHandler(document, 'mousewheel', movePages);
  } else {
    EventUtil.addHandler(window, 'DOMMouseScroll', movePages);
  }
  EventUtil.addHandler(document, "touchstart", function(ev) {
    startY = ev.touches[0].pageY.toFixed(2);
  });
  EventUtil.addHandler(document, "touchend", function(ev) {
    var wrap = document.querySelector(".wrap");
    endY = ev.changedTouches[0].pageY.toFixed(2);
    if(endY - startY > 0 && dist < 0) {
      dist += winH;
      wrap.style.transform = "translate3d(0, " + dist + "px, 0)";
      console.log('down');
    } else if(dist > -totalDist) {
      dist -= winH;
      wrap.style.transform = "translate3d(0, " + dist + "px, 0)";
      console.log('up');
    }
  })
}
