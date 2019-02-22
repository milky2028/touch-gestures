const vue = new Vue({
  el: '#app',
  data: {
    initialX: 0,
    initialY: 0,
    distanceMovedX: 0
  },
  computed: {
    onGesture() {
      return {
        transform: `translateX(${this.distanceMovedX}px)`
      }
    }
  },
  methods: {
    handleGestureStart(event) {
      event.preventDefault();
      if ('PointEvent' in window) {
        event.target.setPointerCapture(event.pointerId)
      }
      [ this.initialX, this.initialY ] = this.getGesturePoint(event);
    },
    handleGestureMove(event) {
      event.preventDefault();
      const [ currentX, currentY ] = this.getGesturePoint(event)
      this.distanceMovedX = currentX - this.initialX;
      const s = vue.$el.querySelector('#swipe-box');
      s.style.transition = '';
      // s.style.transform = `translateX(${this.distanceMovedX})`;
    },
    handleGestureEnd(event) {
      event.preventDefault();
      if ('PointEvent' in window) {
        event.target.releasePointerCapture(event.pointerId);
      }
      this.removeOrReturnToOriginalPosition();
      // const [ currentX, currentY ] = this.getGesturePoint(event)
      // this.distanceMovedX = currentX - this.initialX;
      // window.requestAnimationFrame(this.onGesture)
      // this.initialX = 0
      // this.initialY = 0
      // this.distanceMovedX = -this.distanceMovedX
    },
    getGesturePoint(event) {
      if (event.targetTouches) {
        const x = event.targetTouches[0].clientX;
        const y = event.targetTouches[0].clientY;
        return [ x, y ];
      } else {
        const x = event.clientX;
        const y = event.clientY;
        return [ x, y ];
      }
    },
    removeOrReturnToOriginalPosition() {
      const swiper = vue.$el.querySelector('#swipe-box')
      if (this.distanceMovedX < window.innerWidth / 2) {
        swiper.style.transform = `translateX(0)`
        swiper.style.transition = `350ms ease-in`
      } else {
        swiper.style.transform = `translateX(${window.innerWidth}px)`
        swiper.style.transition = `350ms ease-out`
        swiper.display = 'none';
      }
    }
  }
});
