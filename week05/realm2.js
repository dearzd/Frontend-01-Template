var set = new Set();
var objects = [
    'eval',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Array',
    'Date',
    'RegExp',
    'Promise',
    'Proxy',
    'Map',
    'WeakMap',
    'Set',
    'WeakSet',
    'Function',
    'Boolean',
    'String',
    'Number',
    'Symbol',
    'Object',
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint16Array',
    'Uint32Array',
    'Uint8ClampedArray',
    'Atomics',
    'JSON',
    'Math',
    'Reflect'
];

let queue = [];
for (let p of objects) {
    queue.push({
        path: [p],
        object: this[p]
    })
//console.log(queue);

let current;

while (queue.length) {
    current = queue.shift();
    //console.log(current);

    console.log(current.path.join('.'));
    if (set.has(current.object)) {
        continue;
    }

    set.add(current.object);

    for (let p of Object.getOwnPropertyNames(current.object)) {
        var property = Object.getOwnPropertyDescriptor(current.object, p);

        if (
            property.hasOwnProperty('value') &&
            property.value !== null &&
            (typeof property.value === 'object' || typeof property.value === 'function')
        ) {
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            });
        }

        if (property.hasOwnProperty('get') && typeof property.get === 'function') {
            queue.push({
                path: current.path.concat([p]),
                object: property.get
            });
        }

        if (property.hasOwnProperty('set') && typeof property.set === 'function') {
            queue.push({
                path: current.path.concat([p]),
                object: property.set
            });
        }
    }
}
