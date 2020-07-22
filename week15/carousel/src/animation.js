export class Timeline {
    constructor() {
        this.animations = [];
        this.startTime = null;
        this.pauseTime = null;
        this.tickId = null;
        this.state = 'inited';
    }

    add(animation, addTime) {
        this.animations.push(animation);
        if (this.state === 'playing') {
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
        } else {
            animation.addTime = addTime !== void 0 ? addTime : 0;
        }
    }

    tick() {
        let t = Date.now() - this.startTime;/*console.log(t);*/
        let animations = this.animations.filter(a => !a.finished);
        for (let animation of animations) {
            const {object, property, duration, delay, timingFunction, template, addTime} = animation;

            // (t - delay) / duration means how much time gone
            // timingFunction return an number of 0 - 1 to indicate animation progression according time
            let progression = timingFunction((t - delay - addTime) / duration);

            if (t - delay - addTime > duration) {
                progression = 1;
                animation.finished = true;
            }

            let value = animation.valueFromProgression(progression);

            object[property] = template(value);
        }
        if (animations.length) {
            this.tickId = requestAnimationFrame(() => this.tick());
        } else {
            this.state = 'finished';
        }
    }

    start() {
        if (this.state !== 'inited') {
            return;
        }
        this.state = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    pause() {
        if (this.state !== 'playing') {
            return;
        }
        this.state = 'paused';
        this.pauseTime = Date.now();
        cancelAnimationFrame(this.tickId);
    }

    resume() {
        if (this.state !== 'paused') {
            return;
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    restart() {
        if (this.state !== 'playing') {
            return;
        }
        this.pause();
        this.animations = this.animations.map(a => (a.finished = false, a));
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tickId = null;
        this.state = 'playing';
        this.tick();
    }

    reset() {
        this.pause();
        this.animations = [];
        this.startTime = null;
        this.pauseTime = null;
        this.tickId = null;
        this.state = 'inited';
    }
}

export class Animation {
    constructor({object, property, start, end, duration, delay, timingFunction, template}) {
        this.object = object;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction || (t => t);
        this.template = template;
    }

    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start);
    }
}

export class ColorAnimation {
    constructor({object, property, start, end, duration, delay, timingFunction, template}) {
        this.object = object;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction || (t => t);
        this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
    }

    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        };
    }
}