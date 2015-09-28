(function () {
  var interval = 10
  var stop = 120 * 1000
  var time = -interval
  var start = false
  var timer = null
  var pressedStart = false
  var pressedEnd = false
  window.setInterval(function() {
    Array.prototype.slice.apply(navigator.getGamepads()).filter(function(i){return i})
      .forEach(function(gamepad) {
        var button = gamepad.buttons[1]
        if (button.pressed) {
          if (start && pressedEnd) {
            alert('Finish!')
            window.clearInterval(timer)
            timer = null
          } else if (!timer) {
            pressedStart = true
            start = true
            timer = window.setInterval(getPad, interval)
          }
        } else if (pressedStart && !pressedEnd){
          pressedEnd = true
        }
      })
  }, 50)
  var getPad = function () {
    time += interval
    Array.prototype.slice.apply(navigator.getGamepads()).filter(function(i){return i})
      .forEach(function(gamepad) {
        document.getElementById('log').innerHTML += time + ', '+gamepad.axes[1]+"<br />\r\n"
      })
    if (time >= stop) {
      alert('Finish!')
      window.clearInterval(timer)
    }
  }
  document.getElementById('download').addEventListener('click', function () {
    blob = new Blob([document.getElementById('log').textContent], { type: 'text/csv;charset=utf-8;' })
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.style.display = "none"
    a.href = URL.createObjectURL(blob)
    a.download = 'fujisawa.csv'
    a.click()
  })
})()
