var Stopwatch = function(elem, options) {
    var timer = createTimer(),
        offset,
        clock,
        interval;


    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append timer
    elem.appendChild(timer);

    // initialize
    reset();

    function createTimer() {
        return document.createElement('span');
    }

    function start() {
        if (!interval) {
            offset   = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        clock = 0;
        render();
    }

    function delta() {
        var now = Date.now(),
            d   = now - offset;

        offset = now;
        return d;
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        var minutes = parseInt( clock/1000 / 60 ) % 60;
        var seconds = parseInt( clock/1000 ) % 60;

        var result = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds  < 10 ? '0' + seconds : seconds); // + ':' + (centisecond  < 10 ? '0' + centisecond : centisecond);

        timer.innerHTML = result;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
};


var sw = new Stopwatch(document.getElementById('time'), { delay: 100 });
document.getElementById('toggle').addEventListener('click', function(){
    sw.stop();
    sw.reset();
    sw.start();
});
document.getElementById('reset').addEventListener('click', function() {
    sw.stop();
    sw.reset();
    return false;
});