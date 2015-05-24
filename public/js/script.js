(function() {
    var log = document.getElementById('log');
    var oldLog = console.log;
    
    console.log = function(message) {
        var message = typeof message === 'object' ? JSON.stringify(message) : (message + '');
        message = '\n> ' + message.trim() + '\n';

        log.innerHTML += message;

        oldLog.apply(console, arguments);
    }
})();