(function(Vue) {

var app = new Vue({
  el: '#app',
  data: {
    debug: false,
    onProcessFinished: false,
    totalUnits: 5,
    tmProgress: [0, 0, 0, 0, 0],
    tmProgressTotal: 0,
    result: [],
    resultTotal: 0,
    resultBonus: 0
  },

  methods: {

    onTotalUnitsChange: function(event) {
      this.totalUnits = parseInt(event.target.value, 10);

      if (this.tmProgress.length > this.totalUnits) {
        this.tmProgress = this.tmProgress.slice(0, this.totalUnits);
      }
      else {
        var missingItems = this.totalUnits - this.tmProgress.length;
        for (var i = 0; i < missingItems; i++) {
          this.tmProgress.push(0);
        }
      }
    },

    onInputChange: function(event, index) {
      var progress = _toNumber(event.target.value);
      this.tmProgress[index] = progress;
    },

    onCalculateClick: function() {
      var vm = this;
      var data = _calculateTMfuseUnits(this.tmProgress);
      this.tmProgressTotal = _sumArray(this.tmProgress);
      this.result = data.result;
      this.resultBonus = data.bonus;
      this.resultTotal = _sumArray(vm.result);

      setTimeout(function() {
        vm.playAnimation();
      }, 50);
    },

    playAnimation: function() {
      var vm = this;
      vm.onProcessFinished = true;
      setTimeout(function() {
        vm.onProcessFinished = false;
      }, 100);
    }

  }
});


function _toNumber(v) {
  var r = parseFloat(v);
  if (isNaN(r)) { r = 0; }
  return r;
}


function _calculateTMfuseUnits(tmProgress) {
  var totalUnits = tmProgress.length;
  var bonusProgress = (totalUnits - 1) * 5;
  var totalTMProgress = _sumArray(tmProgress);

  var remainProgress = 100 - totalTMProgress - bonusProgress;
  var avgRemain = remainProgress / totalUnits;

  var result = [];
  for (var i = 0, len = totalUnits; i < len; i++) {
    result.push(tmProgress[i] + avgRemain);
  }

  return {
    result: result,
    bonus: bonusProgress
  };
}


function _sumArray(arr) {
  var result = 0;
  for (var i = 0, len = arr.length; i < len; i++) {
    result += arr[i];
  }
  return result;
}

window.__vueApp = app;

})(window.Vue);
