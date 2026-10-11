/* @preserve
- Leaflet 1.9.4, a JS library for interactive maps. 
https://leafletjs.com
- (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade

 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).leaflet = {})
}(this, function(t) {
    "use strict";

    function l(t) {
        for (var e, i, n = 1, o = arguments.length; n < o; n++)
            for (e in i = arguments[n]) t[e] = i[e];
        return t
    }
    var R = Object.create || function(t) {
        return N.prototype = t, new N
    };

    function N() {}

    function a(t, e) {
        var i, n = Array.prototype.slice;
        return t.bind ? t.bind.apply(t, n.call(arguments, 1)) : (i = n.call(arguments, 2), function() {
            return t.apply(e, i.length ? i.concat(n.call(arguments)) : arguments)
        })
    }
    var D = 0;

    function h(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++D), t._leaflet_id
    }

    function j(t, e, i) {
        var n, o, s = function() {
                n = !1, o && (r.apply(i, o), o = !1)
            },
            r = function() {
                n ? o = arguments : (t.apply(i, arguments), setTimeout(s, e), n = !0)
            };
        return r
    }

    function H(t, e, i) {
        var n = e[1],
            e = e[0],
            o = n - e;
        return t === n && i ? t : ((t - e) % o + o) % o + e
    }

    function u() {
        return !1
    }

    function i(t, e) {
        return !1 === e ? t : (e = Math.pow(10, void 0 === e ? 6 : e), Math.round(t * e) / e)
    }

    function W(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }

    function F(t) {
        return W(t).split(/\s+/)
    }

    function c(t, e) {
        for (var i in Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? R(t.options) : {}), e) t.options[i] = e[i];
        return t.options
    }

    function U(t, e, i) {
        var n, o = [];
        for (n in t) o.push(encodeURIComponent(i ? n.toUpperCase() : n) + "=" + encodeURIComponent(t[n]));
        return (e && -1 !== e.indexOf("?") ? "&" : "?") + o.join("&")
    }
    var V = /\{ *([\w_ -]+) *\}/g;

    function q(t, i) {
        return t.replace(V, function(t, e) {
            e = i[e];
            if (void 0 === e) throw new Error("No value provided for variable " + t);
            return e = "function" == typeof e ? e(i) : e
        })
    }
    var d = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };

    function G(t, e) {
        for (var i = 0; i < t.length; i++)
            if (t[i] === e) return i;
        return -1
    }
    var K = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    function Y(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t]
    }
    var X = 0;

    function J(t) {
        var e = +new Date,
            i = Math.max(0, 16 - (e - X));
        return X = e + i, window.setTimeout(t, i)
    }
    var $ = window.requestAnimationFrame || Y("RequestAnimationFrame") || J,
        Q = window.cancelAnimationFrame || Y("CancelAnimationFrame") || Y("CancelRequestAnimationFrame") || function(t) {
            window.clearTimeout(t)
        };

    function x(t, e, i) {
        if (!i || $ !== J) return $.call(window, a(t, e));
        t.call(e)
    }

    function r(t) {
        t && Q.call(window, t)
    }
    var tt = {
        __proto__: null,
        extend: l,
        create: R,
        bind: a,
        get lastId() {
            return D
        },
        stamp: h,
        throttle: j,
        wrapNum: H,
        falseFn: u,
        formatNum: i,
        trim: W,
        splitWords: F,
        setOptions: c,
        getParamString: U,
        template: q,
        isArray: d,
        indexOf: G,
        emptyImageUrl: K,
        requestFn: $,
        cancelFn: Q,
        requestAnimFrame: x,
        cancelAnimFrame: r
    };

    function et() {}
    et.extend = function(t) {
        function e() {
            c(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
        }
        var i, n = e.__super__ = this.prototype,
            o = R(n);
        for (i in (o.constructor = e).prototype = o, this) Object.prototype.hasOwnProperty.call(this, i) && "prototype" !== i && "__super__" !== i && (e[i] = this[i]);
        if (t.statics && l(e, t.statics), t.includes) {
            var s = t.includes;
            if ("undefined" != typeof L && L && L.Mixin) {
                s = d(s) ? s : [s];
                for (var r = 0; r < s.length; r++) s[r] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
            }
            l.apply(null, [o].concat(t.includes))
        }
        return l(o, t), delete o.statics, delete o.includes, o.options && (o.options = n.options ? R(n.options) : {}, l(o.options, t.options)), o._initHooks = [], o.callInitHooks = function() {
            if (!this._initHooksCalled) {
                n.callInitHooks && n.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var t = 0, e = o._initHooks.length; t < e; t++) o._initHooks[t].call(this)
            }
        }, e
    }, et.include = function(t) {
        var e = this.prototype.options;
        return l(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this
    }, et.mergeOptions = function(t) {
        return l(this.prototype.options, t), this
    }, et.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1),
            i = "function" == typeof t ? t : function() {
                this[t].apply(this, e)
            };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this
    };
    var e = {
        on: function(t, e, i) {
            if ("object" == typeof t)
                for (var n in t) this._on(n, t[n], e);
            else
                for (var o = 0, s = (t = F(t)).length; o < s; o++) this._on(t[o], e, i);
            return this
        },
        off: function(t, e, i) {
            if (arguments.length)
                if ("object" == typeof t)
                    for (var n in t) this._off(n, t[n], e);
                else {
                    t = F(t);
                    for (var o = 1 === arguments.length, s = 0, r = t.length; s < r; s++) o ? this._off(t[s]) : this._off(t[s], e, i)
                }
            else delete this._events;
            return this
        },
        _on: function(t, e, i, n) {
            "function" != typeof e ? console.warn("wrong listener type: " + typeof e) : !1 === this._listens(t, e, i) && (e = {
                fn: e,
                ctx: i = i === this ? void 0 : i
            }, n && (e.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(e))
        },
        _off: function(t, e, i) {
            var n, o, s;
            if (this._events && (n = this._events[t]))
                if (1 === arguments.length) {
                    if (this._firingCount)
                        for (o = 0, s = n.length; o < s; o++) n[o].fn = u;
                    delete this._events[t]
                } else "function" != typeof e ? console.warn("wrong listener type: " + typeof e) : !1 !== (e = this._listens(t, e, i)) && (i = n[e], this._firingCount && (i.fn = u, this._events[t] = n = n.slice()), n.splice(e, 1))
        },
        fire: function(t, e, i) {
            if (this.listens(t, i)) {
                var n = l({}, e, {
                    type: t,
                    target: this,
                    sourceTarget: e && e.sourceTarget || this
                });
                if (this._events) {
                    var o = this._events[t];
                    if (o) {
                        this._firingCount = this._firingCount + 1 || 1;
                        for (var s = 0, r = o.length; s < r; s++) {
                            var a = o[s],
                                h = a.fn;
                            a.once && this.off(t, h, a.ctx), h.call(a.ctx || this, n)
                        }
                        this._firingCount--
                    }
                }
                i && this._propagateEvent(n)
            }
            return this
        },
        listens: function(t, e, i, n) {
            "string" != typeof t && console.warn('"string" type argument expected');
            var o = e,
                s = ("function" != typeof e && (n = !!e, i = o = void 0), this._events && this._events[t]);
            if (s && s.length && !1 !== this._listens(t, o, i)) return !0;
            if (n)
                for (var r in this._eventParents)
                    if (this._eventParents[r].listens(t, e, i, n)) return !0;
            return !1
        },
        _listens: function(t, e, i) {
            if (this._events) {
                var n = this._events[t] || [];
                if (!e) return !!n.length;
                i === this && (i = void 0);
                for (var o = 0, s = n.length; o < s; o++)
                    if (n[o].fn === e && n[o].ctx === i) return o
            }
            return !1
        },
        once: function(t, e, i) {
            if ("object" == typeof t)
                for (var n in t) this._on(n, t[n], e, !0);
            else
                for (var o = 0, s = (t = F(t)).length; o < s; o++) this._on(t[o], e, i, !0);
            return this
        },
        addEventParent: function(t) {
            return this._eventParents = this._eventParents || {}, this._eventParents[h(t)] = t, this
        },
        removeEventParent: function(t) {
            return this._eventParents && delete this._eventParents[h(t)], this
        },
        _propagateEvent: function(t) {
            for (var e in this._eventParents) this._eventParents[e].fire(t.type, l({
                layer: t.target,
                propagatedFrom: t.target
            }, t), !0)
        }
    },
    it = (e.addEventListener = e.on, e.removeEventListener = e.clearAllEventListeners = e.off, e.addOneTimeEventListener = e.once, e.fireEvent = e.fire, e.hasEventListeners = e.listens, et.extend(e));

    function p(t, e, i) {
        this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
    }
    var nt = Math.trunc || function(t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t)
    };

    function m(t, e, i) {
        return t instanceof p ? t : d(t) ? new p(t[0], t[1]) : null == t ? t : "object" == typeof t && "x" in t && "y" in t ? new p(t.x, t.y) : new p(t, e, i)
    }

    function f(t, e) {
        if (t)
            for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
    }

    function _(t, e) {
        return !t || t instanceof f ? t : new f(t, e)
    }

    function s(t, e) {
        if (t)
            for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
    }

    function g(t, e) {
        return t instanceof s ? t : new s(t, e)
    }

    function v(t, e, i) {
        if (isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = +t, this.lng = +e, void 0 !== i && (this.alt = +i)
    }

    function w(t, e, i) {
        return t instanceof v ? t : d(t) && "object" != typeof t[0] ? 3 === t.length ? new v(t[0], t[1], t[2]) : 2 === t.length ? new v(t[0], t[1]) : null : null == t ? t : "object" == typeof t && "lat" in t ? new v(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : void 0 === e ? null : new v(t, e, i)
    }
    p.prototype = {
        clone: function() {
            return new p(this.x, this.y)
        },
        add: function(t) {
            return this.clone()._add(m(t))
        },
        _add: function(t) {
            return this.x += t.x, this.y += t.y, this
        },
        subtract: function(t) {
            return this.clone()._subtract(m(t))
        },
        _subtract: function(t) {
            return this.x -= t.x, this.y -= t.y, this
        },
        divideBy: function(t) {
            return this.clone()._divideBy(t)
        },
        _divideBy: function(t) {
            return this.x /= t, this.y /= t, this
        },
        multiplyBy: function(t) {
            return this.clone()._multiplyBy(t)
        },
        _multiplyBy: function(t) {
            return this.x *= t, this.y *= t, this
        },
        scaleBy: function(t) {
            return new p(this.x * t.x, this.y * t.y)
        },
        unscaleBy: function(t) {
            return new p(this.x / t.x, this.y / t.y)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        },
        ceil: function() {
            return this.clone()._ceil()
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        },
        trunc: function() {
            return this.clone()._trunc()
        },
        _trunc: function() {
            return this.x = nt(this.x), this.y = nt(this.y), this
        },
        distanceTo: function(t) {
            var e = (t = m(t)).x - this.x,
                t = t.y - this.y;
            return Math.sqrt(e * e + t * t)
        },
        equals: function(t) {
            return (t = m(t)).x === this.x && t.y === this.y
        },
        contains: function(t) {
            return t = m(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + i(this.x) + ", " + i(this.y) + ")"
        }
    }, f.prototype = {
        extend: function(t) {
            var e, i;
            if (t) {
                if (t instanceof p || "number" == typeof t[0] || "x" in t) e = i = m(t);
                else if (e = (t = _(t)).min, i = t.max, !e || !i) return this;
                this.min || this.max ? (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)) : (this.min = e.clone(), this.max = i.clone())
            }
            return this
        },
        getCenter: function(t) {
            return m((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
        },
        getBottomLeft: function() {
            return m(this.min.x, this.max.y)
        },
        getTopRight: function() {
            return m(this.max.x, this.min.y)
        },
        getTopLeft: function() {
            return this.min
        },
        getBottomRight: function() {
            return this.max
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(t) {
            var e, i;
            return (t = ("number" == typeof t[0] || t instanceof p ? m : _)(t)) instanceof f ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
        },
        intersects: function(t) {
            t = _(t);
            var e = this.min,
                i = this.max,
                n = t.min,
                t = t.max,
                o = t.x >= e.x && n.x <= i.x,
                t = t.y >= e.y && n.y <= i.y;
            return o && t
        },
        overlaps: function(t) {
            t = _(t);
            var e = this.min,
                i = this.max,
                n = t.min,
                t = t.max,
                o = t.x > e.x && n.x < i.x,
                t = t.y > e.y && n.y < i.y;
            return o && t
        },
        isValid: function() {
            return !(!this.min || !this.max)
        },
        pad: function(t) {
            var e = this.min,
                i = this.max,
                n = Math.abs(e.x - i.x) * t,
                t = Math.abs(e.y - i.y) * t;
            return _(m(e.x - n, e.y - t), m(i.x + n, i.y + t))
        },
        equals: function(t) {
            return !!t && (t = _(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight()))
        }
    }, s.prototype = {
        extend: function(t) {
            var e, i, n = this._southWest,
                o = this._northEast;
            if (t instanceof v) i = e = t;
            else {
                if (!(t instanceof s)) return t ? this.extend(w(t) || g(t)) : this;
                if (e = t._southWest, i = t._northEast, !e || !i) return this
            }
            return n || o ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), o.lat = Math.max(i.lat, o.lat), o.lng = Math.max(i.lng, o.lng)) : (this._southWest = new v(e.lat, e.lng), this._northEast = new v(i.lat, i.lng)), this
        },
        pad: function(t) {
            var e = this._southWest,
                i = this._northEast,
                n = Math.abs(e.lat - i.lat) * t,
                t = Math.abs(e.lng - i.lng) * t;
            return new s(new v(e.lat - n, e.lng - t), new v(i.lat + n, i.lng + t))
        },
        getCenter: function() {
            return new v((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new v(this.getNorth(), this.getWest())
        },
        getSouthEast: function() {
            return new v(this.getSouth(), this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(t) {
            t = ("number" == typeof t[0] || t instanceof v || "lat" in t ? w : g)(t);
            var e, i, n = this._southWest,
                o = this._northEast;
            return t instanceof s ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= o.lat && e.lng >= n.lng && i.lng <= o.lng
        },
        intersects: function(t) {
            t = g(t);
            var e = this._southWest,
                i = this._northEast,
                n = t.getSouthWest(),
                t = t.getNorthEast(),
                o = t.lat >= e.lat && n.lat <= i.lat,
                t = t.lng >= e.lng && n.lng <= i.lng;
            return o && t
        },
        overlaps: function(t) {
            t = g(t);
            var e = this._southWest,
                i = this._northEast,
                n = t.getSouthWest(),
                t = t.getNorthEast(),
                o = t.lat > e.lat && n.lat < i.lat,
                t = t.lng > e.lng && n.lng < i.lng;
            return o && t
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function(t, e) {
            return !!t && (t = g(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e))
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    };
    var ot = {
        latLngToPoint: function(t, e) {
            t = this.projection.project(t), e = this.scale(e);
            return this.transformation._transform(t, e)
        },
        pointToLatLng: function(t, e) {
            e = this.scale(e), t = this.transformation.untransform(t, e);
            return this.projection.unproject(t)
        },
        project: function(t) {
            return this.projection.project(t)
        },
        unproject: function(t) {
            return this.projection.unproject(t)
        },
        scale: function(t) {
            return 256 * Math.pow(2, t)
        },
        zoom: function(t) {
            return Math.log(t / 256) / Math.LN2
        },
        getProjectedBounds: function(t) {
            var e;
            return this.infinite ? null : (e = this.projection.bounds, t = this.scale(t), new f(this.transformation.transform(e.min, t), this.transformation.transform(e.max, t)))
        },
        infinite: !(v.prototype = {
            equals: function(t, e) {
                return !!t && (t = w(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === e ? 1e-9 : e))
            },
            toString: function(t) {
                return "LatLng(" + i(this.lat, t) + ", " + i(this.lng, t) + ")"
            },
            distanceTo: function(t) {
                return st.distance(this, w(t))
            },
            wrap: function() {
                return st.wrapLatLng(this)
            },
            toBounds: function(t) {
                var t = 180 * t / 40075017,
                    e = t / Math.cos(Math.PI / 180 * this.lat);
                return g([this.lat - t, this.lng - e], [this.lat + t, this.lng + e])
            },
            clone: function() {
                return new v(this.lat, this.lng, this.alt)
            }
        }),
        wrapLatLng: function(t) {
            var e = this.wrapLng ? H(t.lng, this.wrapLng, !0) : t.lng;
            return new v(this.wrapLat ? H(t.lat, this.wrapLat, !0) : t.lat, e, t.alt)
        },
        wrapLatLngBounds: function(t) {
            var e = t.getCenter(),
                i = this.wrapLatLng(e),
                n = e.lat - i.lat,
                e = e.lng - i.lng;
            return 0 == n && 0 == e ? t : (i = t.getSouthWest(), t = t.getNorthEast(), new s(new v(i.lat - n, i.lng - e), new v(t.lat - n, t.lng - e)))
        }
    },
    st = l({}, ot, {
        wrapLng: [-180, 180],
        R: 6371e3,
        distance: function(t, e) {
            var i = Math.PI / 180,
                n = t.lat * i,
                o = e.lat * i,
                s = Math.sin((e.lat - t.lat) * i / 2),
                e = Math.sin((e.lng - t.lng) * i / 2),
                t = s * s + Math.cos(n) * Math.cos(o) * e * e,
                i = 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1 - t));
            return this.R * i
        }
    }),
    rt = 6378137,
    rt = {
        R: rt,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
            var e = Math.PI / 180,
                i = this.MAX_LATITUDE,
                i = Math.max(Math.min(i, t.lat), -i),
                i = Math.sin(i * e);
            return new p(this.R * t.lng * e, this.R * Math.log((1 + i) / (1 - i)) / 2)
        },
        unproject: function(t) {
            var e = 180 / Math.PI;
            return new v((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
        },
        bounds: new f([-(rt = rt * Math.PI), -rt], [rt, rt])
    };

    function at(t, e, i, n) {
        d(t) ? (this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3]) : (this._a = t, this._b = e, this._c = i, this._d = n)
    }

    function ht(t, e, i, n) {
        return new at(t, e, i, n)
    }
    at.prototype = {
        transform: function(t, e) {
            return this._transform(t.clone(), e)
        },
        _transform: function(t, e) {
            return t.x = (e = e || 1) * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
        },
        untransform: function(t, e) {
            return new p((t.x / (e = e || 1) - this._b) / this._a, (t.y / e - this._d) / this._c)
        }
    };
    var lt = l({}, st, {
        code: "EPSG:3857",
        projection: rt,
        transformation: ht(lt = .5 / (Math.PI * rt.R), .5, -lt, .5)
    }),
    ut = l({}, lt, {
        code: "EPSG:900913"
    });

    function ct(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t)
    }

    function dt(t, e) {
        for (var i, n, o, s, r = "", a = 0, h = t.length; a < h; a++) {
            for (i = 0, n = (o = t[a]).length; i < n; i++) r += (i ? "L" : "M") + (s = o[i]).x + " " + s.y;
            r += e ? b.svg ? "z" : "x" : ""
        }
        return r || "M0 0"
    }
    var _t = document.documentElement.style,
        pt = "ActiveXObject" in window,
        mt = pt && !document.addEventListener,
        n = "msLaunchUri" in navigator && !("documentMode" in document),
        ft = y("webkit"),
        gt = y("android"),
        vt = y("android 2") || y("android 3"),
        yt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
        yt = gt && y("Google") && yt < 537 && !("AudioNode" in window),
        xt = !!window.opera,
        wt = !n && y("chrome"),
        bt = y("gecko") && !ft && !xt && !pt,
        Pt = !wt && y("safari"),
        Lt = y("phantom"),
        o = "OTransition" in _t,
        Tt = 0 === navigator.platform.indexOf("Win"),
        Mt = pt && "transition" in _t,
        zt = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !vt,
        _t = "MozPerspective" in _t,
        Ct = !window.L_DISABLE_3D && (Mt || zt || _t) && !o && !Lt,
        Zt = "undefined" != typeof orientation || y("mobile"),
        St = Zt && ft,
        Et = Zt && zt,
        kt = !window.PointerEvent && window.MSPointerEvent,
        Ot = !(!window.PointerEvent && !kt),
        At = "ontouchstart" in window || !!window.TouchEvent,
        Bt = !window.L_NO_TOUCH && (At || Ot),
        It = Zt && xt,
        Rt = Zt && bt,
        Nt = 1 < (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI),
        Dt = function() {
            var t = !1;
            try {
                var e = Object.defineProperty({}, "passive", {
                    get: function() {
                        t = !0
                    }
                });
                window.addEventListener("testPassiveEventSupport", u, e), window.removeEventListener("testPassiveEventSupport", u, e)
            } catch (t) {}
            return t
        }(),
        jt = !!document.createElement("canvas").getContext,
        Ht = !(!document.createElementNS || !ct("svg").createSVGRect),
        Wt = !!Ht && ((Wt = document.createElement("div")).innerHTML = "<svg/>", "http://www.w3.org/2000/svg" === (Wt.firstChild && Wt.firstChild.namespaceURI));

    function y(t) {
        return 0 <= navigator.userAgent.toLowerCase().indexOf(t)
    }
    var b = {
        ie: pt,
        ielt9: mt,
        edge: n,
        webkit: ft,
        android: gt,
        android23: vt,
        androidStock: yt,
        opera: xt,
        chrome: wt,
        gecko: bt,
        safari: Pt,
        phantom: Lt,
        opera12: o,
        win: Tt,
        ie3d: Mt,
        webkit3d: zt,
        gecko3d: _t,
        any3d: Ct,
        mobile: Zt,
        mobileWebkit: St,
        mobileWebkit3d: Et,
        msPointer: kt,
        pointer: Ot,
        touch: Bt,
        touchNative: At,
        mobileOpera: It,
        mobileGecko: Rt,
        retina: Nt,
        passiveEvents: Dt,
        canvas: jt,
        svg: Ht,
        vml: !Ht && function() {
            try {
                var t = document.createElement("div"),
                    e = (t.innerHTML = '<v:shape adj="1"/>', t.firstChild);
                return e.style.behavior = "url(#default#VML)", e && "object" == typeof e.adj
            } catch (t) {
                return !1
            }
        }(),
        inlineSvg: Wt,
        mac: 0 === navigator.platform.indexOf("Mac"),
        linux: 0 === navigator.platform.indexOf("Linux")
    },
    Ft = b.msPointer ? "MSPointerDown" : "pointerdown",
    Ut = b.msPointer ? "MSPointerMove" : "pointermove",
    Vt = b.msPointer ? "MSPointerUp" : "pointerup",
    qt = b.msPointer ? "MSPointerCancel" : "pointercancel",
    Gt = {
        touchstart: Ft,
        touchmove: Ut,
        touchend: Vt,
        touchcancel: qt
    },
    Kt = {
        touchstart: function(t, e) {
            e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && O(e);
            ee(t, e)
        },
        touchmove: ee,
        touchend: ee,
        touchcancel: ee
    },
    Yt = {},
    Xt = !1;

    function Jt(t, e, i) {
        return "touchstart" !== e || Xt || (document.addEventListener(Ft, $t, !0), document.addEventListener(Ut, Qt, !0), document.addEventListener(Vt, te, !0), document.addEventListener(qt, te, !0), Xt = !0), Kt[e] ? (i = Kt[e].bind(this, i), t.addEventListener(Gt[e], i, !1), i) : (console.warn("wrong event specified:", e), u)
    }

    function $t(t) {
        Yt[t.pointerId] = t
    }

    function Qt(t) {
        Yt[t.pointerId] && (Yt[t.pointerId] = t)
    }

    function te(t) {
        delete Yt[t.pointerId]
    }

    function ee(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
            for (var i in e.touches = [], Yt) e.touches.push(Yt[i]);
            e.changedTouches = [e], t(e)
        }
    }
    var ie = 200;

    function ne(t, i) {
        t.addEventListener("dblclick", i);
        var n, o = 0;

        function e(t) {
            var e;
            1 !== t.detail ? n = t.detail : "mouse" === t.pointerType || t.sourceCapabilities && !t.sourceCapabilities.firesTouchEvents || ((e = Ne(t)).some(function(t) {
                return t instanceof HTMLLabelElement && t.attributes.for
            }) && !e.some(function(t) {
                return t instanceof HTMLInputElement || t instanceof HTMLSelectElement
            }) || ((e = Date.now()) - o <= ie ? 2 === ++n && i(function(t) {
                var e, i, n = {};
                for (i in t) e = t[i], n[i] = e && e.bind ? e.bind(t) : e;
                return (t = n).type = "dblclick", n.detail = 2, n.isTrusted = !1, n._simulated = !0, n
            }(t)) : n = 1, o = e))
        }
        return t.addEventListener("click", e), {
            dblclick: i,
            simDblclick: e
        }
    }
    var oe, se, re, ae, he, le, ue = we(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
        ce = we(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]),
        de = "webkitTransition" === ce || "OTransition" === ce ? ce + "End" : "transitionend";

    function _e(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    }

    function pe(t, e) {
        var i = t.style[e] || t.currentStyle && t.currentStyle[e];
        return "auto" === (i = i && "auto" !== i || !document.defaultView ? i : (t = document.defaultView.getComputedStyle(t, null)) ? t[e] : null) ? null : i
    }

    function P(t, e, i) {
        t = document.createElement(t);
        return t.className = e || "", i && i.appendChild(t), t
    }

    function T(t) {
        var e = t.parentNode;
        e && e.removeChild(t)
    }

    function me(t) {
        for (; t.firstChild;) t.removeChild(t.firstChild)
    }

    function fe(t) {
        var e = t.parentNode;
        e && e.lastChild !== t && e.appendChild(t)
    }

    function ge(t) {
        var e = t.parentNode;
        e && e.firstChild !== t && e.insertBefore(t, e.firstChild)
    }

    function ve(t, e) {
        return void 0 !== t.classList ? t.classList.contains(e) : 0 < (t = xe(t)).length && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t)
    }

    function M(t, e) {
        var i;
        if (void 0 !== t.classList)
            for (var n = F(e), o = 0, s = n.length; o < s; o++) t.classList.add(n[o]);
        else ve(t, e) || ye(t, ((i = xe(t)) ? i + " " : "") + e)
    }

    function z(t, e) {
        void 0 !== t.classList ? t.classList.remove(e) : ye(t, W((" " + xe(t) + " ").replace(" " + e + " ", " ")))
    }

    function ye(t, e) {
        void 0 === t.className.baseVal ? t.className = e : t.className.baseVal = e
    }

    function xe(t) {
        return void 0 === (t = t.correspondingElement ? t.correspondingElement : t).className.baseVal ? t.className : t.className.baseVal
    }

    function C(t, e) {
        if ("opacity" in t.style) t.style.opacity = e;
        else if ("filter" in t.style) {
            var i = !1,
                n = "DXImageTransform.Microsoft.Alpha";
            try {
                i = t.filters.item(n)
            } catch (t) {
                if (1 === e) return
            }
            e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
        }
    }

    function we(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
            if (t[i] in e) return t[i];
        return !1
    }

    function be(t, e, i) {
        e = e || new p(0, 0);
        t.style[ue] = (b.ie3d ? "translate(" + e.x + "px," + e.y + "px)" : "translate3d(" + e.x + "px," + e.y + "px,0)") + (i ? " scale(" + i + ")" : "")
    }

    function Z(t, e) {
        t._leaflet_pos = e, b.any3d ? be(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
    }

    function Pe(t) {
        return t._leaflet_pos || new p(0, 0)
    }

    function Le() {
        S(window, "dragstart", O)
    }

    function Te() {
        k(window, "dragstart", O)
    }

    function Me(t) {
        for (; - 1 === t.tabIndex;) t = t.parentNode;
        t.style && (ze(), le = (he = t).style.outlineStyle, t.style.outlineStyle = "none", S(window, "keydown", ze))
    }

    function ze() {
        he && (he.style.outlineStyle = le, le = he = void 0, k(window, "keydown", ze))
    }

    function Ce(t) {
        for (; !((t = t.parentNode).offsetWidth && t.offsetHeight || t === document.body););
        return t
    }

    function Ze(t) {
        var e = t.getBoundingClientRect();
        return {
            x: e.width / t.offsetWidth || 1,
            y: e.height / t.offsetHeight || 1,
            boundingClientRect: e
        }
    }
    ae = "onselectstart" in document ? (re = function() {
        S(window, "selectstart", O)
    }, function() {
        k(window, "selectstart", O)
    }) : (se = we(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]), re = function() {
        var t;
        se && (t = document.documentElement.style, oe = t[se], t[se] = "none")
    }, function() {
        se && (document.documentElement.style[se] = oe, oe = void 0)
    });
    pt = {
        __proto__: null,
        TRANSFORM: ue,
        TRANSITION: ce,
        TRANSITION_END: de,
        get: _e,
        getStyle: pe,
        create: P,
        remove: T,
        empty: me,
        toFront: fe,
        toBack: ge,
        hasClass: ve,
        addClass: M,
        removeClass: z,
        setClass: ye,
        getClass: xe,
        setOpacity: C,
        testProp: we,
        setTransform: be,
        setPosition: Z,
        getPosition: Pe,
        get disableTextSelection() {
            return re
        },
        get enableTextSelection() {
            return ae
        },
        disableImageDrag: Le,
        enableImageDrag: Te,
        preventOutline: Me,
        restoreOutline: ze,
        getSizedParentNode: Ce,
        getScale: Ze
    };

    function S(t, e, i, n) {
        if (e && "object" == typeof e)
            for (var o in e) ke(t, o, e[o], i);
        else
            for (var s = 0, r = (e = F(e)).length; s < r; s++) ke(t, e[s], i, n);
        return this
    }
    var E = "_leaflet_events";

    function k(t, e, i, n) {
        if (1 === arguments.length) Se(t), delete t[E];
        else if (e && "object" == typeof e)
            for (var o in e) Oe(t, o, e[o], i);
        else if (e = F(e), 2 === arguments.length) Se(t, function(t) {
            return -1 !== G(e, t)
        });
        else
            for (var s = 0, r = e.length; s < r; s++) Oe(t, e[s], i, n);
        return this
    }

    function Se(t, e) {
        for (var i in t[E]) {
            var n = i.split(/\d/)[0];
            e && !e(n) || Oe(t, n, null, null, i)
        }
    }
    var Ee = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
    };

    function ke(e, t, i, n) {
        var o, s, r = t + h(i) + (n ? "_" + h(n) : "");
        e[E] && e[E][r] || (s = o = function(t) {
            return i.call(n || e, t || window.event)
        }, !b.touchNative && b.pointer && 0 === t.indexOf("touch") ? o = Jt(e, t, o) : b.touch && "dblclick" === t ? o = ne(e, o) : "addEventListener" in e ? "touchstart" === t || "touchmove" === t || "wheel" === t || "mousewheel" === t ? e.addEventListener(Ee[t] || t, o, !!b.passiveEvents && {
            passive: !1
        }) : "mouseenter" === t || "mouseleave" === t ? e.addEventListener(Ee[t], o = function(t) {
            t = t || window.event, We(e, t) && s(t)
        }, !1) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, o), e[E] = e[E] || {}, e[E][r] = o)
    }

    function Oe(t, e, i, n, o) {
        o = o || e + h(i) + (n ? "_" + h(n) : "");
        var s, r, i = t[E] && t[E][o];
        i && (!b.touchNative && b.pointer && 0 === e.indexOf("touch") ? (n = t, r = i, Gt[s = e] ? n.removeEventListener(Gt[s], r, !1) : console.warn("wrong event specified:", s)) : b.touch && "dblclick" === e ? (n = i, (r = t).removeEventListener("dblclick", n.dblclick), r.removeEventListener("click", n.simDblclick)) : "removeEventListener" in t ? t.removeEventListener(Ee[e] || e, i, !1) : t.detachEvent("on" + e, i), t[E][o] = null)
    }

    function Ae(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this
    }

    function Be(t) {
        return ke(t, "wheel", Ae), this
    }

    function Ie(t) {
        return S(t, "mousedown touchstart dblclick contextmenu", Ae), t._leaflet_disable_click = !0, this
    }

    function O(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
    }

    function Re(t) {
        return O(t), Ae(t), this
    }

    function Ne(t) {
        if (t.composedPath) return t.composedPath();
        for (var e = [], i = t.target; i;) e.push(i), i = i.parentNode;
        return e
    }

    function De(t, e) {
        var i, n;
        return e ? (n = (i = Ze(e)).boundingClientRect, new p((t.clientX - n.left) / i.x - e.clientLeft, (t.clientY - n.top) / i.y - e.clientTop)) : new p(t.clientX, t.clientY)
    }
    var je = b.linux && b.chrome ? window.devicePixelRatio : b.mac ? 3 * window.devicePixelRatio : 0 < window.devicePixelRatio ? 2 * window.devicePixelRatio : 1;

    function He(t) {
        return b.edge ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / je : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
    }

    function We(t, e) {
        var i = e.relatedTarget;
        if (!i) return !0;
        try {
            for (; i && i !== t;) i = i.parentNode
        } catch (t) {
            return !1
        }
        return i === t
    }
    var mt = {
        __proto__: null,
        on: S,
        off: k,
        stopPropagation: Ae,
        disableScrollPropagation: Be,
        disableClickPropagation: Ie,
        preventDefault: O,
        stop: Re,
        getPropagationPath: Ne,
        getMousePosition: De,
        getWheelDelta: He,
        isExternalTarget: We,
        addListener: S,
        removeListener: k
    };
    let Fe = it.extend({
        run: function(t, e, i, n) {
            this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = Pe(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0), this._complete())
        },
        _animate: function() {
            this._animId = x(this._animate, this), this._step()
        },
        _step: function(t) {
            var e = +new Date - this._startTime,
                i = 1e3 * this._duration;
            e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
        },
        _runFrame: function(t, e) {
            t = this._startPos.add(this._offset.multiplyBy(t));
            e && t._round(), Z(this._el, t), this.fire("step")
        },
        _complete: function() {
            r(this._animId), this._inProgress = !1, this.fire("end")
        },
        _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }
    });
    let A = it.extend({
        options: {
            crs: lt,
            center: void 0,
            zoom: void 0,
            minZoom: void 0,
            maxZoom: void 0,
            layers: [],
            maxBounds: void 0,
            renderer: void 0,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
        },
        initialize: function(t, e) {
            e = c(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = a(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), void 0 !== e.zoom && (this._zoom = this._limitZoom(e.zoom)), e.center && void 0 !== e.zoom && this.setView(w(e.center), e.zoom, {
                reset: !0
            }), this.callInitHooks(), this._zoomAnimated = ce && b.any3d && !b.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), S(this._proxy, de, this._catchTransitionEnd, this)), this._addLayers(this.options.layers)
        },
        setView: function(t, e, i) {
            if ((e = void 0 === e ? this._zoom : this._limitZoom(e), t = this._limitCenter(w(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && !0 !== i) && (void 0 !== i.animate && (i.zoom = l({
                    animate: i.animate
                }, i.zoom), i.pan = l({
                    animate: i.animate,
                    duration: i.duration
                }, i.pan)), this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan))) return clearTimeout(this._sizeTimer), this;
            return this._resetView(t, e, i.pan && i.pan.noMoveStart), this
        },
        setZoom: function(t, e) {
            return this._loaded ? this.setView(this.getCenter(), t, {
                zoom: e
            }) : (this._zoom = t, this)
        },
        zoomIn: function(t, e) {
            return t = t || (b.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e)
        },
        zoomOut: function(t, e) {
            return t = t || (b.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e)
        },
        setZoomAround: function(t, e, i) {
            var n = this.getZoomScale(e),
                o = this.getSize().divideBy(2),
                t = (t instanceof p ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n),
                n = this.containerPointToLatLng(o.add(t));
            return this.setView(n, e, {
                zoom: i
            })
        },
        _getBoundsCenterZoom: function(t, e) {
            e = e || {}, t = t.getBounds ? t.getBounds() : g(t);
            var i = m(e.paddingTopLeft || e.padding || [0, 0]),
                n = m(e.paddingBottomRight || e.padding || [0, 0]),
                o = this.getBoundsZoom(t, !1, i.add(n));
            return (o = "number" == typeof e.maxZoom ? Math.min(e.maxZoom, o) : o) === 1 / 0 ? {
                center: t.getCenter(),
                zoom: o
            } : (e = n.subtract(i).divideBy(2), n = this.project(t.getSouthWest(), o), i = this.project(t.getNorthEast(), o), {
                center: this.unproject(n.add(i).divideBy(2).add(e), o),
                zoom: o
            })
        },
        fitBounds: function(t, e) {
            if ((t = g(t)).isValid()) return t = this._getBoundsCenterZoom(t, e), this.setView(t.center, t.zoom, e);
            throw new Error("Bounds are not valid.")
        },
        fitWorld: function(t) {
            return this.fitBounds([
                [-90, -180],
                [90, 180]
            ], t)
        },
        panTo: function(t, e) {
            return this.setView(t, this._zoom, {
                pan: e
            })
        },
        panBy: function(t, e) {
            var i;
            return e = e || {}, (t = m(t).round()).x || t.y ? (!0 === e.animate || this.getSize().contains(t) ? (this._panAnim || (this._panAnim = new Fe, this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)), e.noMoveStart || this.fire("movestart"), !1 !== e.animate ? (M(this._mapPane, "leaflet-pan-anim"), i = this._getMapPanePos().subtract(t).round(), this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)) : (this._rawPanBy(t), this.fire("move").fire("moveend"))) : this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this) : this.fire("moveend")
        },
        flyTo: function(n, o, t) {
            if (!1 === (t = t || {}).animate || !b.any3d) return this.setView(n, o, t);
            this._stop();
            var s = this.project(this.getCenter()),
                r = this.project(n),
                e = this.getSize(),
                a = this._zoom,
                h = (n = w(n), o = void 0 === o ? a : o, Math.max(e.x, e.y)),
                i = h * this.getZoomScale(a, o),
                l = r.distanceTo(s) || 1,
                u = 1.42,
                c = u * u;

            function d(t) {
                t = (i * i - h * h + (t ? -1 : 1) * c * c * l * l) / (2 * (t ? i : h) * c * l), t = Math.sqrt(t * t + 1) - t;
                return t < 1e-9 ? -18 : Math.log(t)
            }

            function _(t) {
                return (Math.exp(t) - Math.exp(-t)) / 2
            }

            function p(t) {
                return (Math.exp(t) + Math.exp(-t)) / 2
            }
            var m = d(0);

            function f(t) {
                return h * (p(m) * (_(t = m + u * t) / p(t)) - _(m)) / c
            }
            var g = Date.now(),
                v = (d(1) - m) / u,
                y = t.duration ? 1e3 * t.duration : 1e3 * v * .8;
            return this._moveStart(!0, t.noMoveStart),
                function t() {
                    var e = (Date.now() - g) / y,
                        i = (1 - Math.pow(1 - e, 1.5)) * v;
                    e <= 1 ? (this._flyToFrame = x(t, this), this._move(this.unproject(s.add(r.subtract(s).multiplyBy(f(i) / l)), a), this.getScaleZoom(h / (e = i, h * (p(m) / p(m + u * e))), a), {
                        flyTo: !0
                    })) : this._move(n, o)._moveEnd(!0)
                }.call(this), this
        },
        flyToBounds: function(t, e) {
            t = this._getBoundsCenterZoom(t, e);
            return this.flyTo(t.center, t.zoom, e)
        },
        setMaxBounds: function(t) {
            return t = g(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this)
        },
        setMinZoom: function(t) {
            var e = this.options.minZoom;
            return this.options.minZoom = t, this._loaded && e !== t ? (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom ? this.setZoom(t) : this) : this
        },
        setMaxZoom: function(t) {
            var e = this.options.maxZoom;
            return this.options.maxZoom = t, this._loaded && e !== t ? (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom ? this.setZoom(t) : this) : this
        },
        panInsideBounds: function(t, e) {
            this._enforcingBounds = !0;
            var i = this.getCenter(),
                t = this._limitCenter(i, this._zoom, g(t));
            return i.equals(t) || this.panTo(t, e), this._enforcingBounds = !1, this
        }
    });
});