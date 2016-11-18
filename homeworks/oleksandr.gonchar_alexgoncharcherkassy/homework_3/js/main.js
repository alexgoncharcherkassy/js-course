var originalSetTimeout = window.setTimeout;

window.setTimeout = function (delay, callback) {
    if (typeof callback != 'function') {
        throw new TypeError();
    }
    if (typeof delay != 'number') {
        throw new TypeError();
    }
    var aArgs = arguments;

    return originalSetTimeout(function () {
        callback.apply(this, aArgs);
    }, delay);
};

window.setInterval = function (callback, delay) {
    if (typeof callback != 'function') {
        throw new TypeError();
    }
    if (typeof delay != 'number') {
        throw new TypeError();
    }

    var aArgs = aArgs;

    setTimeout(delay, function () {
        callback.apply(this, aArgs);
        return setInterval(callback, delay);
    });
};

function freeze(delay, callback) {
    var timeout = [];

    return function () {
        var aArgs = arguments;

        timeout.push(setTimeout(delay, function () {
            callback.apply(this, aArgs);
        }));

        if (timeout.length > 1) {
            clearTimeout(timeout.pop());
        }
    }
}
function createPipe(originalFnc, args) {
    var result;

    return function () {
        var aArgs = arguments;

        for (var i = 0; i < args.length; i++) {
            result = args[i].apply(this, result ? [result] : aArgs);
        }

        return originalFnc.apply(this, [result]);
    };
}
function originalFnc(string) {
    var aString = string.split(' ');

    for (var i = 0; i < aString.length; i++) {
        aString[i] = aString[i].charAt(0).toUpperCase() + aString[i].slice(1)
    }
    string = aString.join(' ');

    return string;
}

function filterDigits(string) {

    return string.replace(/[0-9]/g, '');
}

function filterSpecial(string) {

    return string.replace(/[\!\@\#\$\%\^\&\*\(\)\+\=\-\/]/g, '');
}

function filterWhiteSpaces(string) {

    return string.replace(/\s+/g, ' ');
}