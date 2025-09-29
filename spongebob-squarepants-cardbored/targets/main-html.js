/**
 * Cooked with Flambe
 * https://github.com/aduros/flambe
 */
'use strict';
(function() {
    var J, c, ca, l, j, f, C, q, m, g, $, i, S, B, U, Q, T, V, Y, G, v, y, M, o, h, d, I, n, P, E, w, z, H, K, x, aa;

    function t(a, b) {
        function e() {}
        e.prototype = a;
        var c = new e,
            d;
        for (d in b) c[d] = b[d];
        return c
    }

    function ea(a) {
        return a instanceof Array ? function() {
            return A.iter(a)
        } : "function" == typeof a.iterator ? s(a, a.iterator) : a.iterator
    }

    function s(a, b) {
        var e = function() {
            return e.method.apply(e.scope, arguments)
        };
        e.scope = a;
        e.method = b;
        return e
    }
    var k = {},
        r = function() {
            return G.__string_rec(this, "")
        },
        X = function(a, b) {
            b = b.split("u").join("");
            this.r = RegExp(a, b)
        };
    k.EReg = X;
    X.__name__ = ["EReg"];
    X.prototype = {
        matchedPos: function() {
            if (null == this.r.m) throw "No string matched";
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            }
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) a = this.r.m[a];
            else throw "EReg::matched";
            return a
        },
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        __class__: X
    };
    var F = function() {
        this.h = {}
    };
    k.Hash = F;
    F.__name__ = ["Hash"];
    F.prototype = {
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    return this.ref["$" + this.it.next()]
                }
            }
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b.substr(1));
            return A.iter(a)
        },
        remove: function(a) {
            a = "$" + a;
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        exists: function(a) {
            return this.h.hasOwnProperty("$" + a)
        },
        get: function(a) {
            return this.h["$" + a]
        },
        set: function(a, b) {
            this.h["$" + a] = b
        },
        __class__: F
    };
    var A = function() {};
    k.HxOverrides = A;
    A.__name__ = ["HxOverrides"];
    A.dateStr = function(a) {
        var b = a.getMonth() + 1,
            e = a.getDate(),
            c = a.getHours(),
            d = a.getMinutes(),
            f = a.getSeconds();
        return a.getFullYear() + "-" + (10 > b ? "0" + b : "" + b) + "-" + (10 > e ? "0" + e : "" + e) + " " + (10 > c ? "0" + c : "" + c) + ":" + (10 > d ? "0" + d : "" + d) + ":" + (10 > f ? "0" + f : "" + f)
    };
    A.strDate = function(a) {
        switch (a.length) {
            case 8:
                var a = a.split(":"),
                    b = new Date;
                b.setTime(0);
                b.setUTCHours(a[0]);
                b.setUTCMinutes(a[1]);
                b.setUTCSeconds(a[2]);
                return b;
            case 10:
                return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
            case 19:
                return a = a.split(" "),
                    b = a[0].split("-"), a = a[1].split(":"), new Date(b[0], b[1] - 1, b[2], a[0], a[1], a[2]);
            default:
                throw "Invalid date format : " + a;
        }
    };
    A.cca = function(a, b) {
        var e = a.charCodeAt(b);
        return e != e ? void 0 : e
    };
    A.substr = function(a, b, e) {
        if (null != b && 0 != b && null != e && 0 > e) return "";
        null == e && (e = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > e && (e = a.length + e - b);
        return a.substr(b, e)
    };
    A.remove = function(a, b) {
        for (var e = 0, c = a.length; e < c;) {
            if (a[e] == b) return a.splice(e, 1), !0;
            e++
        }
        return !1
    };
    A.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur <
                    this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var W = function() {
        this.h = {}
    };
    k.IntHash = W;
    W.__name__ = ["IntHash"];
    W.prototype = {
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
            return A.iter(a)
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        exists: function(a) {
            return this.h.hasOwnProperty(a)
        },
        get: function(a) {
            return this.h[a]
        },
        set: function(a, b) {
            this.h[a] = b
        },
        __class__: W
    };
    var ba = function() {};
    k.Lambda = ba;
    ba.__name__ = ["Lambda"];
    ba.array = function(a) {
        for (var b = [], a = ea(a)(); a.hasNext();) {
            var e = a.next();
            b.push(e)
        }
        return b
    };
    ba.has = function(a, b, e) {
        if (null == e)
            for (e = ea(a)(); e.hasNext();) {
                if (a = e.next(), a == b) return !0
            } else
                for (var c = ea(a)(); c.hasNext();)
                    if (a = c.next(), e(a, b)) return !0;
        return !1
    };
    ba.count = function(a, b) {
        var e = 0;
        if (null == b)
            for (var c = ea(a)(); c.hasNext();) c.next(), e++;
        else
            for (c = ea(a)(); c.hasNext();) {
                var d = c.next();
                b(d) && e++
            }
        return e
    };
    var da = function() {
        this.length = 0
    };
    k.List = da;
    da.__name__ = ["List"];
    da.prototype = {
        iterator: function() {
            return {
                h: this.h,
                hasNext: function() {
                    return null != this.h
                },
                next: function() {
                    if (null == this.h) return null;
                    var a = this.h[0];
                    this.h = this.h[1];
                    return a
                }
            }
        },
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        __class__: da
    };
    var L = function() {};
    k.Reflect = L;
    L.__name__ = ["Reflect"];
    L.field = function(a, b) {
        var e = null;
        try {
            e = a[b]
        } catch (c) {}
        return e
    };
    L.setProperty = function(a, b, e) {
        var c;
        if (a.__properties__ && (c = a.__properties__["set_" + b])) a[c](e);
        else a[b] = e
    };
    L.fields = function(a) {
        var b = [];
        if (null != a) {
            var e = Object.prototype.hasOwnProperty,
                c;
            for (c in a) e.call(a, c) && b.push(c)
        }
        return b
    };
    L.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    L.compareMethods = function(a, b) {
        return a == b ? !0 : !L.isFunction(a) || !L.isFunction(b) ? !1 : a.scope == b.scope && a.method == b.method && null != a.method
    };
    var p = function() {};
    k.Std = p;
    p.__name__ = ["Std"];
    p.string = function(a) {
        return G.__string_rec(a, "")
    };
    p.parseInt = function(a) {
        var b = parseInt(a, 10);
        if (0 == b && (120 == A.cca(a, 1) || 88 == A.cca(a, 1))) b = parseInt(a);
        return isNaN(b) ? null : b
    };
    p.parseFloat = function(a) {
        return parseFloat(a)
    };
    p.random = function(a) {
        return Math.floor(Math.random() * a)
    };
    var Z = function() {
        this.b = ""
    };
    k.StringBuf = Z;
    Z.__name__ = ["StringBuf"];
    Z.prototype = {
        __class__: Z
    };
    var R = function() {};
    k.StringTools = R;
    R.__name__ = ["StringTools"];
    R.urlEncode = function(a) {
        return encodeURIComponent(a)
    };
    R.urlDecode = function(a) {
        return decodeURIComponent(a.split("+").join(" "))
    };
    R.startsWith = function(a, b) {
        return a.length >= b.length && A.substr(a, 0, b.length) == b
    };
    R.isSpace = function(a, b) {
        var e = A.cca(a, b);
        return 9 <= e && 13 >= e || 32 == e
    };
    R.ltrim = function(a) {
        for (var b =
                a.length, e = 0; e < b && R.isSpace(a, e);) e++;
        return 0 < e ? A.substr(a, e, b - e) : a
    };
    R.rtrim = function(a) {
        for (var b = a.length, e = 0; e < b && R.isSpace(a, b - e - 1);) e++;
        return 0 < e ? A.substr(a, 0, b - e) : a
    };
    R.trim = function(a) {
        return R.ltrim(R.rtrim(a))
    };
    R.replace = function(a, b, e) {
        return a.split(b).join(e)
    };
    var D = k.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
    };
    D.TNull = ["TNull", 0];
    D.TNull.toString = r;
    D.TNull.__enum__ = D;
    D.TInt = ["TInt", 1];
    D.TInt.toString =
        r;
    D.TInt.__enum__ = D;
    D.TFloat = ["TFloat", 2];
    D.TFloat.toString = r;
    D.TFloat.__enum__ = D;
    D.TBool = ["TBool", 3];
    D.TBool.toString = r;
    D.TBool.__enum__ = D;
    D.TObject = ["TObject", 4];
    D.TObject.toString = r;
    D.TObject.__enum__ = D;
    D.TFunction = ["TFunction", 5];
    D.TFunction.toString = r;
    D.TFunction.__enum__ = D;
    D.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = D;
        a.toString = r;
        return a
    };
    D.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = D;
        a.toString = r;
        return a
    };
    D.TUnknown = ["TUnknown", 8];
    D.TUnknown.toString = r;
    D.TUnknown.__enum__ = D;
    var N =
        function() {};
    k.Type = N;
    N.__name__ = ["Type"];
    N.getClassName = function(a) {
        return a.__name__.join(".")
    };
    N.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    N.resolveClass = function(a) {
        a = k[a];
        return null == a || !a.__name__ ? null : a
    };
    N.resolveEnum = function(a) {
        a = k[a];
        return null == a || !a.__ename__ ? null : a
    };
    N.createInstance = function(a, b) {
        switch (b.length) {
            case 0:
                return new a;
            case 1:
                return new a(b[0]);
            case 2:
                return new a(b[0], b[1]);
            case 3:
                return new a(b[0], b[1], b[2]);
            case 4:
                return new a(b[0], b[1], b[2], b[3]);
            case 5:
                return new a(b[0],
                    b[1], b[2], b[3], b[4]);
            case 6:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5]);
            case 7:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
            case 8:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
            default:
                throw "Too many arguments";
        }
    };
    N.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    N.createEnum = function(a, b, e) {
        var c = L.field(a, b);
        if (null == c) throw "No such constructor " + b;
        if (L.isFunction(c)) {
            if (null == e) throw "Constructor " + b + " need parameters";
            return c.apply(a, e)
        }
        if (null !=
            e && 0 != e.length) throw "Constructor " + b + " does not need parameters";
        return c
    };
    N.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    N["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return D.TBool;
            case "string":
                return D.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? D.TInt : D.TFloat;
            case "object":
                if (null == a) return D.TNull;
                var b = a.__enum__;
                if (null != b) return D.TEnum(b);
                a = a.__class__;
                return null != a ? D.TClass(a) : D.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? D.TObject :
                    D.TFunction;
            case "undefined":
                return D.TNull;
            default:
                return D.TUnknown
        }
    };
    var u = function() {};
    k.Xml = u;
    u.__name__ = ["Xml"];
    u.parse = function(a) {
        return B.Parser.parse(a)
    };
    u.createElement = function(a) {
        var b = new u;
        b.nodeType = u.Element;
        b._children = [];
        b._attributes = new F;
        b.setNodeName(a);
        return b
    };
    u.createPCData = function(a) {
        var b = new u;
        b.nodeType = u.PCData;
        b.setNodeValue(a);
        return b
    };
    u.createCData = function(a) {
        var b = new u;
        b.nodeType = u.CData;
        b.setNodeValue(a);
        return b
    };
    u.createComment = function(a) {
        var b = new u;
        b.nodeType =
            u.Comment;
        b.setNodeValue(a);
        return b
    };
    u.createDocType = function(a) {
        var b = new u;
        b.nodeType = u.DocType;
        b.setNodeValue(a);
        return b
    };
    u.createProlog = function(a) {
        var b = new u;
        b.nodeType = u.Prolog;
        b.setNodeValue(a);
        return b
    };
    u.createDocument = function() {
        var a = new u;
        a.nodeType = u.Document;
        a._children = [];
        return a
    };
    u.prototype = {
        toString: function() {
            if (this.nodeType == u.PCData) return this._nodeValue;
            if (this.nodeType == u.CData) return "<![CDATA[" + this._nodeValue + "]]\>";
            if (this.nodeType == u.Comment) return "<\!--" + this._nodeValue +
                "--\>";
            if (this.nodeType == u.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
            if (this.nodeType == u.Prolog) return "<?" + this._nodeValue + "?>";
            var a = new Z;
            if (this.nodeType == u.Element) {
                a.b += p.string("<");
                a.b += p.string(this._nodeName);
                for (var b = this._attributes.keys(); b.hasNext();) {
                    var e = b.next();
                    a.b += p.string(" ");
                    a.b += p.string(e);
                    a.b += p.string('="');
                    a.b += p.string(this._attributes.get(e));
                    a.b += p.string('"')
                }
                if (0 == this._children.length) return a.b += p.string("/>"), a.b;
                a.b += p.string(">")
            }
            for (b = this.iterator(); b.hasNext();) e =
                b.next(), a.b += p.string(e.toString());
            this.nodeType == u.Element && (a.b += p.string("</"), a.b += p.string(this._nodeName), a.b += p.string(">"));
            return a.b
        },
        addChild: function(a) {
            if (null == this._children) throw "bad nodetype";
            null != a._parent && A.remove(a._parent._children, a);
            a._parent = this;
            this._children.push(a)
        },
        firstElement: function() {
            if (null == this._children) throw "bad nodetype";
            for (var a = 0, b = this._children.length; a < b;) {
                var e = this._children[a];
                if (e.nodeType == u.Element) return e;
                a++
            }
            return null
        },
        elementsNamed: function(a) {
            if (null ==
                this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    for (var b = this.cur, e = this.x.length; b < e;) {
                        var c = this.x[b];
                        if (c.nodeType == u.Element && c._nodeName == a) break;
                        b++
                    }
                    this.cur = b;
                    return b < e
                },
                next: function() {
                    for (var b = this.cur, e = this.x.length; b < e;) {
                        var c = this.x[b];
                        b++;
                        if (c.nodeType == u.Element && c._nodeName == a) return this.cur = b, c
                    }
                    return null
                }
            }
        },
        elements: function() {
            if (null == this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    for (var a = this.cur, b =
                            this.x.length; a < b && !(this.x[a].nodeType == u.Element);) a += 1;
                    this.cur = a;
                    return a < b
                },
                next: function() {
                    for (var a = this.cur, b = this.x.length; a < b;) {
                        var e = this.x[a],
                            a = a + 1;
                        if (e.nodeType == u.Element) return this.cur = a, e
                    }
                    return null
                }
            }
        },
        iterator: function() {
            if (null == this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    return this.cur < this.x.length
                },
                next: function() {
                    return this.x[this.cur++]
                }
            }
        },
        exists: function(a) {
            if (this.nodeType != u.Element) throw "bad nodeType";
            return this._attributes.exists(a)
        },
        set: function(a, b) {
            if (this.nodeType != u.Element) throw "bad nodeType";
            this._attributes.set(a, b)
        },
        get: function(a) {
            if (this.nodeType != u.Element) throw "bad nodeType";
            return this._attributes.get(a)
        },
        getParent: function() {
            return this._parent
        },
        setNodeValue: function(a) {
            if (this.nodeType == u.Element || this.nodeType == u.Document) throw "bad nodeType";
            return this._nodeValue = a
        },
        getNodeValue: function() {
            if (this.nodeType == u.Element || this.nodeType == u.Document) throw "bad nodeType";
            return this._nodeValue
        },
        setNodeName: function(a) {
            if (this.nodeType !=
                u.Element) throw "bad nodeType";
            return this._nodeName = a
        },
        getNodeName: function() {
            if (this.nodeType != u.Element) throw "bad nodeType";
            return this._nodeName
        },
        __class__: u,
        __properties__: {
            set_nodeName: "setNodeName",
            get_nodeName: "getNodeName",
            set_nodeValue: "setNodeValue",
            get_nodeValue: "getNodeValue"
        }
    };
    J = function() {};
    c = void 0;
    ca = void 0;
    l = void 0;
    j = void 0;
    k["com.nick.spongeBob.capri_sun_adventure_jungle.DocumentApp"] = J;
    J.__name__ = ["com", "nick", "spongeBob", "capri_sun_adventure_jungle", "DocumentApp"];
    J.main = function() {
        y.init();
        J._fillEntity = new M;
        J._fillSprite = new o.FillSprite(0, 960, 560);
        J._fillEntity.add(J._fillSprite);
        y.root.addChild(J._fillEntity);
        f.JSEmbedProxy.getIsCrossdomain() ? f.WorkinCloud.instance._getAssets().setCrossdomainBaseUrl(J.appendAssetsToUrl(f.JSEmbedProxy.getBase())) : f.WorkinCloud.instance._getAssets()._setBaseUrl(J.trimUrl(f.JSEmbedProxy.getBase()));
        f.WorkinCloud.instance._getDispatcher().addEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, J._onBootstrapLoad);
        f.WorkinCloud.instance._getAssets().addPackDef("bootstrap");
        f.WorkinCloud.instance._getAssets().loadPack("bootstrap")
    };
    J._onBootstrapLoad = function() {
        f.WorkinCloud.instance._getDispatcher().removeEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, J._onBootstrapLoad);
        if (c.ConstantsApp.LOAD_FONT_EARLY) {
            f.WorkinCloud.instance._getDispatcher().addEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, J._onFontLoad);
            var a = f.WorkinCloud.instance._getAssets().getXML(c.ConstantsApp.CONFIG_XML_PATH);
            f.WorkinCloud.instance.setString(C.ConstantsCloud.STRING_REGION_ID, p.string(a.node.resolve("localization").node.resolve("region").getInnerData()));
            f.WorkinCloud.instance._getAssets().addPackDef("fonts_" + f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID));
            f.WorkinCloud.instance._getAssets().loadPack("fonts_" + f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID))
        } else J._initServices(), U.delay(J._initMain, 800)
    };
    J._onFontLoad = function() {
        f.WorkinCloud.instance._getDispatcher().removeEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, J._onFontLoad);
        J._initServices();
        U.delay(J._initMain, 800)
    };
    J._initMain = function() {
        J._main =
            new ca
    };
    J._initServices = function() {
        for (var a = f.WorkinCloud.instance._getAssets().getXML(c.ConstantsApp.CONFIG_XML_PATH).node.resolve("services").nodes.resolve("service").iterator(); a.hasNext();) {
            var b = a.next();
            switch (b.att.resolve("type").toString()) {
                case "analytics":
                    "true" == b.att.resolve("enabled").toString() && (f.WorkinCloud.instance.log("[DocumentApp](_initServices) initAnalytics"), q.ServiceAnalytics.init(b.att.resolve("id").toString()));
                    break;
                case "canadaTracking":
                    "true" == b.att.resolve("enabled").toString() &&
                        (f.WorkinCloud.instance.log("[DocumentApp](_initServices) initCanadaTracking"), q.ServiceAnalytics.enableCanadaTracking(b.att.resolve("showGameTitle").toString()));
                    break;
                case "nickavatar":
                    "true" == b.att.resolve("enabled").toString() ? (f.WorkinCloud.instance.log("[DocumentApp](_initServices) initNickAvatar"), q.ServiceNickAvatar._getInstance().enable(b.att.resolve("url").toString())) : q.ServiceNickAvatar._getInstance().disable();
                    break;
                case "leaderboard":
                    "true" == b.att.resolve("enabled").toString() ? (f.WorkinCloud.instance.log("[DocumentApp](_initServices) initLeaderboard"),
                        q.ServiceNickLeaderboard._getInstance().enable(b.att.resolve("url").toString(), b.att.resolve("keyword").toString())) : q.ServiceNickLeaderboard._getInstance().disable()
            }
        }
    };
    J.trimUrl = function(a) {
        if ("" == a) return "";
        if (0 > a.indexOf("http")) return "/" == a.charAt(0) && (a = A.substr(a, 1, a.length - 1)), a;
        var b = a.indexOf("http://");
        0 > b ? (b = a.indexOf("https://"), b = 0 > b ? 0 : b + 8) : b += 7;
        b = a.indexOf("/", b);
        a = A.substr(a, b, a.length - b);
        return a = J.appendAssetsToUrl(a)
    };
    J.appendAssetsToUrl = function(a) {
        if (0 == a.length) return a;
        "/" !=
        a.charAt(a.length - 1) && (a += "/");
        a.indexOf("/assets") < a.length - 9 && (a += "assets/");
        return a
    };
    ca = function() {
        this._RATE_REFRESH_SCALE = 0.4;
        f.WorkinCloud.instance.log("[Main] Constructed");
        this._root = y.root;
        this._timeline = new M;
        this._root.addChild(this._timeline);
        y.uncaughtError.connect(s(this, this.errorHandler));
        f.WorkinCloud.instance._getInput().prime();
        this._scaleSprite = new o.Sprite;
        this._timeline.add(this._scaleSprite);
        this._layerWorld = new M;
        this._layerUI = new M;
        this._timeline.addChild(this._layerWorld);
        this._timeline.addChild(this._layerUI);
        this._dt = 0;
        this._timerRefreshScale = 0.0010;
        this._isUIActive = this._isWorldActive = !1;
        this._flagFirstPlay = !0;
        this._flagInitialLoadComplete = this._flagWebAudioUnlocked = !1;
        this._flagGameplayPaused = !0;
        this._flagJSEmbedExists = this._flagJSEmbedPauseState = !1;
        G.__instanceof(y._platform.getStage(), h.html.HtmlStage) && (c.ConstantsApp.scaleFactor = G.__cast(y._platform.getStage(), h.html.HtmlStage).scaleFactor);
        this._flagJSEmbedExists = f.JSEmbedProxy.getExists();
        this._changeActions = [];
        this._flowstack = [];
        this._addEventListeners();
        this._beginEngine()
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.Main"] = ca;
    ca.__name__ = ["com", "nick", "spongeBob", "capri_sun_adventure_jungle", "Main"];
    ca.prototype = {
        _disposeWorld: function() {
            this._isWorldActive && (this._isWorldActive = !1, this._world.dispose(), this._world = null)
        },
        _onEventInterfaceChange: function(a) {
            this._executeInterfaceChange(a.flowId, a.screenId)
        },
        _handleWebAudioUnlock: function() {
            this._flagWebAudioUnlocked || (this._flagWebAudioUnlocked = !0, f.WorkinCloud.instance._getSound().playSound("audio/silent"))
        },
        _onEventFilesLoading: function(a) {
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, a._getData().value)
        },
        _onEventInput: function(a) {
            this._handleWebAudioUnlock();
            f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) || this._ui.handleInput(a) && this._isWorldActive && this._world.handleInput(a)
        },
        _onFlowEvent: function(a) {
            this._addFlowEvent(a.flowId)
        },
        _onMuteToggle: function() {
            f.WorkinCloud.instance._getSound().setMute(!f.WorkinCloud.instance._getSound().getMute())
        },
        _enableInput: function() {
            f.WorkinCloud.instance._getDispatcher().addEventListener(m.WMEventInput.EVENT_INPUT, s(this, this._onEventInput))
        },
        _addEventListeners: function() {
            f.WorkinCloud.instance._getDispatcher().addEventListener(m.WMEventUpdate.EVENT_UPDATE, s(this, this._onEventUpdate));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_MUTE_TOGGLE, s(this, this._onMuteToggle));
            f.WorkinCloud.instance._getDispatcher().addEventListener(m.WMEventFlow.EVENT_FLOW, s(this, this._onFlowEvent));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_WORLD_GENERATION_COMPLETE, s(this, this._onWorldGenerationComplete));
            f.WorkinCloud.instance._getDispatcher().addEventListener(C.ConstantsCloud.EVENT_FILES_LOADING, s(this, this._onEventFilesLoading))
        },
        _executeInterfaceChange: function(a, b) {
            for (var e = this._changeActions.length; 0 < e;) e--, this._changeActions[e]._getScreenId() == b && this._changeActions[e]._getChangeEvent() == a && (this._changeActions[e]._getAction()(), this._changeActions.splice(e,
                1))
        },
        _unpauseGameplay: function(a) {
            null == a && (a = !0);
            a && (this._flagGameplayPaused = !1);
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_UNPAUSE))
        },
        _pauseGameplay: function(a) {
            null == a && (a = !0);
            a && (this._flagGameplayPaused = !0);
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_PAUSE))
        },
        _executeFlowStack: function(a) {
            if (!this._ui._getHasTransition()) switch (f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1), a) {
                case c.ConstantsScreen.FLOW_SPLASH_PLAY:
                    f.WorkinCloud.instance._getSound().playMusic("audio/spongebobsquarepants_cardboardjungle");
                    q.ServiceAnalytics.sendCanadaTrackingCall("play");
                    this._onGameNew();
                    this._gotoAndPlayGame();
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP:
                    this._ui.openScreen(c.ConstantsScreen.SCREEN_HELP, !1);
                    break;
                case c.ConstantsScreen.FLOW_HELP_CLOSE:
                    this._ui.closeScreen(c.ConstantsScreen.SCREEN_HELP);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU:
                    f.WorkinCloud.instance.log("[Main] Main Menu Flow Click");
                    this._pauseGameplay();
                    this._ui.openScreen(c.ConstantsScreen.SCREEN_GAMEPLAY_MENU, !1);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE:
                    this._unpauseGameplay();
                    this._ui.closeScreen(c.ConstantsScreen.SCREEN_GAMEPLAY_MENU);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT:
                    this._ui.openScreen(c.ConstantsScreen.SCREEN_QUIT_CONFIRM, !1);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES:
                    this._resetFlagsResults();
                    this._gotoEndGame(!1);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO:
                    this._ui.closeScreen(c.ConstantsScreen.SCREEN_QUIT_CONFIRM);
                    break;
                case c.ConstantsScreen.FLOW_BRANCH_GAME_LOSE:
                    this._pauseGameplay();
                    this._resetFlagsResults();
                    this._gotoEndGame(!1);
                    break;
                case c.ConstantsScreen.FLOW_BRANCH_GAME_WIN:
                    this._resetFlagsResults();
                    f.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_LEVEL, 1);
                    10 < f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) ? (this._pauseGameplay(), this._gotoEndGame(!0)) : (this._disposeWorld(), q.ServiceAnalytics.sendCanadaTrackingCall("replay"), this._onGameNew(), f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) + (c.ConstantsApp.PLAYER_MAX_HEALTH / 2 | 0)), f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) >=
                        c.ConstantsApp.PLAYER_MAX_HEALTH && f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, c.ConstantsApp.PLAYER_MAX_HEALTH), this._gotoAndPlayGame());
                    break;
                case c.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN:
                    this._disposeWorld();
                    q.ServiceAnalytics.sendCanadaTrackingCall("replay");
                    this._onGameNew();
                    f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, c.ConstantsApp.PLAYER_MAX_HEALTH);
                    this._gotoAndPlayGame();
                    break;
                case c.ConstantsScreen.FLOW_START_OVER:
                    this._disposeWorld();
                    q.ServiceAnalytics.sendCanadaTrackingCall("replay");
                    this._onGameNew();
                    f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, c.ConstantsApp.PLAYER_MAX_HEALTH);
                    f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LEVEL, 1);
                    f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_SCORE, 0);
                    this._gotoAndPlayGame();
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_OPEN:
                    this._pauseGameplay();
                    this._ui.openScreen(c.ConstantsScreen.SCREEN_TUTORIAL, !1);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_CLOSE:
                    this._unpauseGameplay();
                    this._ui.closeScreen(c.ConstantsScreen.SCREEN_TUTORIAL);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME:
                    f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_HELP_FIRST_TIME, !0);
                    this._pauseGameplay();
                    this._ui.openScreen(c.ConstantsScreen.SCREEN_HELP, !1);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME_CLOSE:
                    f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_HELP_FIRST_TIME, !1), this._unpauseGameplay(), this._ui.closeScreen(c.ConstantsScreen.SCREEN_HELP)
            }
        },
        _runFlowStack: function() {
            if (0 != this._flowstack.length)
                for (; 0 < this._flowstack.length;) this._executeFlowStack(this._flowstack[0]),
                    this._flowstack.shift()
        },
        _addFlowEvent: function(a) {
            this._flowstack.push(a)
        },
        _hideOrientationAlert: function() {
            f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) && (f.WorkinCloud.instance.log("[Main](_showOrientationAlert) Back to landscape."), f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT, !1), f.JSEmbedProxy.unpause(), f.JSEmbedProxy.alertOff())
        },
        _showOrientationAlert: function() {
            f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) || (f.WorkinCloud.instance.log("[Main](_showOrientationAlert) Portrait mode!"),
                f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT, !0), f.JSEmbedProxy.pause(), f.JSEmbedProxy.alertOn(f.WorkinCloud.instance._getLocalize().getData("orientation_landscape")._getString()))
        },
        _onEventUpdate: function(a) {
            this._dt = a.getDt();
            0.12 < this._dt && (this._dt = 0.12);
            if (this._flagJSEmbedExists && (f.JSEmbedProxy.getIsPaused() != this._flagJSEmbedPauseState && ((this._flagJSEmbedPauseState = f.JSEmbedProxy.getIsPaused()) ? this._pauseGameplay(!1) : this._flagGameplayPaused || this._unpauseGameplay()),
                    this._timerRefreshScale -= this._dt, 0 >= this._timerRefreshScale)) {
                this._timerRefreshScale = this._RATE_REFRESH_SCALE;
                if (this._flagInitialLoadComplete && f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE)) {
                    if (f.JSEmbedProxy.getCanvasHeight() > f.JSEmbedProxy.getCanvasWidth()) {
                        this._showOrientationAlert();
                        return
                    }
                    if (f.WorkinCloud.instance.getValue(c.ConstantsApp.BOOL_ORIENTATION_ALERT)) {
                        this._hideOrientationAlert();
                        return
                    }
                }
                this._flagJSEmbedExists && (a = f.JSEmbedProxy.getCanvasScale() * c.ConstantsApp.scaleFactor,
                    a != this._scaleSprite.scaleX._value && (this._scaleSprite.scaleX.set__(this._scaleSprite.scaleY.set__(a)), f.WorkinCloud.instance._getInput()._setScale(a)))
            }
            g.tween.WorkinTweener._getInstance().update(this._dt);
            f.WorkinCloud.instance.update(this._dt);
            this._isUIActive && this._ui.update(this._dt);
            this._isWorldActive && (this._world.update(this._dt), this._world.render());
            f.WorkinCloud.instance._getSound().update(this._dt);
            f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_GAME_LOSE) ? this._onFlowEvent(new m.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_GAME_LOSE)) :
                f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_GAME_WIN) ? this._onFlowEvent(new m.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_GAME_WIN)) : f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LEVEL_LOSE) ? this._onFlowEvent(new m.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE)) : f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LEVEL_WIN) && this._onFlowEvent(new m.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN));
            this._runFlowStack()
        },
        _generateWorld: function() {
            this._isWorldActive && this._disposeWorld();
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0);
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP);
            this._isWorldActive = !0;
            this._world = new l.World(this._layerWorld)
        },
        _resetFlagsResults: function() {
            f.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_GAME_WIN);
            f.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_GAME_LOSE);
            f.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_LEVEL_WIN);
            f.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_LEVEL_LOSE)
        },
        _onGameNew: function() {
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_COMBO, 0);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_QUEEN_HEALTH, 0);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.QUEEN_MAX_HEALTH, 0);
            this._resetFlagsResults()
        },
        _gotoEndGame: function(a) {
            this._flagWonPreviousGame = a;
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_END_GAME, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN);
            this._disposeWorld()
        },
        _gotoSplash: function() {
            this._enableInput();
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_SPLASH, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN)
        },
        _onWorldGenerationComplete: function() {
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            this._world.start();
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_GAMEPLAY_HUD, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN);
            this._unpauseGameplay()
        },
        _gotoAndPlayGame: function() {
            this._loadChunks(["gameplay"], s(this, this._eventLoadCompleteGameplay), 800) && (this._isWorldActive ? f.WorkinCloud.instance.log("[Main](_gotoAndPlayGame) World already exists. Using existing world instead of creating new one.") :
                this._generateWorld())
        },
        _generateUI: function() {
            this._isUIActive = !0;
            this._ui.addScreen(c.ConstantsScreen.SCREEN_LOADING, j.screens.ScreenLoading, "ui/loading_panel");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_LOADING_OVERLAY, j.screens.ScreenGeneric, "ui/loading_2/loading_overlay");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_CUTSCENE_BORDERS, j.screens.ScreenGeneric, "ui/cutscene/cutscene_border");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_SPLASH, j.screens.ScreenSplash, "splash_bg");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_HELP,
                j.screens.ScreenHelp);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_GAMEPLAY_MENU, j.screens.ScreenGameplayMenu);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_QUIT_CONFIRM, j.screens.ScreenQuitConfirm);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_GAMEPLAY_HUD, j.screens.ScreenGameplayHUD);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_END_GAME, j.screens.ScreenEndGame, "ui/end_screen/endscreen_nobacking_bg");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_PAUSE_ALERT, j.screens.ScreenPauseAlert);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_TUTORIAL,
                j.screens.ScreenTutorial);
            this._ui.addEventListener(m.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT, s(this, this._onEventInterfaceChange))
        },
        _registerInput: function() {
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_SPACE, [d.Key.Space]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_LEFT, [d.Key.Left, d.Key.A]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_RIGHT, [d.Key.Right, d.Key.D]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_UP, [d.Key.Up, d.Key.W]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_DOWN, [d.Key.Down, d.Key.S]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_Z, [d.Key.Z]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_X, [d.Key.X]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_C, [d.Key.C]);
            f.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_P, [d.Key.P])
        },
        _setDefaults: function() {
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAMEOVER, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_WIN, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_LOSE, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LEVEL_WIN, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LEVEL_LOSE, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT, !1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_FIRST_LOAD, !0);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_HELP_FIRST_TIME, !1);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LEVEL, 1);
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_TOUCH_DEVICE, y._platform.getTouch().get_supported());
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, 3);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LIVES, 3);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_SCORE, 0);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, 0);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_QUEEN_HEALTH,
                0);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.QUEEN_MAX_HEALTH, 0);
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, c.ConstantsApp.PLAYER_MAX_HEALTH);
            f.WorkinCloud.instance._getSound().setMute(c.ConstantsApp.OPTION_SILENCE_AUDIO)
        },
        _beginEngine: function() {
            f.WorkinCloud.instance.log("[Main](_beginEngine)");
            this._timeline.add(new $.ComponentUpdater);
            this._parseConfigXML();
            this._ui = new j.ScreenManager(this._layerUI);
            this._setDefaults();
            this._generateUI();
            this._registerInput();
            this._beginInitialLoad()
        },
        _eventLoadCompleteInitial: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            this._flagInitialLoadComplete = !0;
            U.delay(s(this, this._gotoSplash), 800)
        },
        _eventLoadCompleteGameplay: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            U.delay(s(this, this._gotoAndPlayGame), 800)
        },
        _loadChunksDelayCallback: function() {
            this._loadChunks(this._loadChunksCurrent,
                this._loadCallbackMethod, 0)
        },
        _loadChunks: function(a, b, e) {
            null == e && (e = 0);
            for (var O = 0, d = !0; O < a.length;) f.WorkinCloud.instance._getAssets().isChunkLoaded(a[O]) || (d = !1), O++;
            if (d) return !0;
            f.WorkinCloud.instance._getAssets().isLoading() || f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, 0);
            this._loadChunksCurrent = a;
            this._loadCallbackMethod = b;
            if (0 < e) return U.delay(s(this, this._loadChunksDelayCallback), e), this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP), !1;
            f.WorkinCloud.instance._getDispatcher().addEventListener(C.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            for (O = 0; O < a.length;) f.WorkinCloud.instance._getAssets().isChunkLoaded(a[O]) || f.WorkinCloud.instance._getAssets().loadChunk(a[O]), O++;
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0);
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP);
            return !1
        },
        _beginInitialLoad: function() {
            this._loadChunks(["initial"], s(this, this._eventLoadCompleteInitial),
                800);
            f.WorkinCloud.instance._getAssets().loadFolder("fonts_" + f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID))
        },
        _parseConfigXML: function() {
            f.WorkinCloud.instance.log("[Main](_parseConfigXML) Parse Config XML: " + c.ConstantsApp.CONFIG_XML_PATH);
            for (var a = f.WorkinCloud.instance._getAssets().getXML(c.ConstantsApp.CONFIG_XML_PATH), b = a.node.resolve("packs").nodes.resolve("pack").iterator(); b.hasNext();) {
                for (var e = b.next(), O = [], d = e.nodes.resolve("flump").iterator(); d.hasNext();) {
                    var g =
                        d.next();
                    O.push(g.att.resolve("id").toString())
                }
                d = [];
                for (g = e.nodes.resolve("tiles").iterator(); g.hasNext();) {
                    var h = g.next();
                    d.push(h.att.resolve("id").toString())
                }
                f.WorkinCloud.instance._getAssets().addPackDef(e.att.resolve("id").toString(), O, d)
            }
            for (b = a.node.resolve("chunks").nodes.resolve("chunk").iterator(); b.hasNext();) e = b.next(), f.WorkinCloud.instance._getAssets().addChunk(e.att.resolve("id").toString(), e);
            c.ConstantsApp.LOAD_FONT_EARLY || (f.WorkinCloud.instance.setString(C.ConstantsCloud.STRING_REGION_ID,
                p.string(a.node.resolve("localization").node.resolve("region").getInnerData())), f.WorkinCloud.instance.log("[Main] Localization : Set Region: " + f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID)))
        },
        errorHandler: function(a) {
            f.WorkinCloud.instance.log("Error:" + a)
        },
        __class__: ca
    };
    c = {
        ConstantsApp: function() {}
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.data.ConstantsApp"] = c.ConstantsApp;
    c.ConstantsApp.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,data,ConstantsApp".split(",");
    c.ConstantsApp.initEnemyList = function() {
        c.ConstantsApp.enemyList = [];
        switch (f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL)) {
            case 1:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                break;
            case 2:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly,
                    c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                break;
            case 3:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear,
                    c.ConstantsApp.LAYER_ENEMY_BACK, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !0));
                break;
            case 4:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear,
                    c.ConstantsApp.LAYER_ENEMY_BACK, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear, c.ConstantsApp.LAYER_ENEMY_BACK, !0, !0));
                break;
            case 5:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly,
                    c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly,
                    c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !0));
                break;
            case 6:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaRhino, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                break;
            case 7:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear,
                    c.ConstantsApp.LAYER_ENEMY_FRONT, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaRhino, c.ConstantsApp.LAYER_ENEMY_BACK, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaRhino, c.ConstantsApp.LAYER_ENEMY_FRONT, !1, !0));
                break;
            case 8:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly,
                    c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear,
                    c.ConstantsApp.LAYER_ENEMY_BACK, !1, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaRhino, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                break;
            case 9:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear, c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaBear, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaRhino,
                    c.ConstantsApp.LAYER_ENEMY_FRONT, !0, !0));
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemySeaRhino, c.ConstantsApp.LAYER_ENEMY_BACK, !0, !0));
                break;
            case 10:
                c.ConstantsApp.enemyList.push(new l.elements.other.EnemyDef(l.elements.enemies.EnemyQueenJelly, c.ConstantsApp.LAYER_ENEMY_BACK, !1, !1))
        }
    };
    c.ConstantsApp.initTutorialElements = function() {
        c.ConstantsApp._tutorialElements = [];
        c.ConstantsApp._tutorialElements.push(new i.TextLocalized(480, 230, "intro_text_1", "", {
            origin: new g.WorkinPoint(0.5,
                0.5),
            center: !0
        }));
        c.ConstantsApp._tutorialElements.push(new i.TextLocalized(400, 410, "intro_text_2", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }));
        c.ConstantsApp._tutorialElements.push(new i.TextLocalized(435, 200, "intro_text_3", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        c.ConstantsApp._tutorialElements.push(new i.TextLocalized(390, 390, "intro_text_4", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        c.ConstantsApp._tutorialElements.push(new i.TextLocalized(480, 230, "intro_text_5", "", {
            origin: new g.WorkinPoint(0.5,
                0.5),
            center: !0
        }));
        c.ConstantsApp._tutorialElements.push(new i.TextLocalized(350, 410, "intro_text_6", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }));
        c.ConstantsApp._tutorialElements.push(new i.Element({
            x: 10,
            y: 0,
            asset: "intro_story_backing"
        }));
        c.ConstantsApp._tutorialElements.push(new i.Element({
            x: 681,
            y: 264,
            asset: "intro_story_pat"
        }));
        c.ConstantsApp._tutorialElements.push(new i.Element({
            x: 53,
            y: 121,
            asset: "intro_story_sb_bored"
        }));
        c.ConstantsApp._tutorialElements.push(new i.Element({
            x: 25,
            y: 73,
            asset: "intro_story_sb_happy"
        }))
    };
    c.ConstantsApp.getTutorialElements = function() {
        return c.ConstantsApp._tutorialElements
    };
    c.ConstantsApp.dispose = function() {
        if (null != c.ConstantsApp._tutorialElements) {
            for (var a = c.ConstantsApp._tutorialElements.length; 0 < a--;) c.ConstantsApp._tutorialElements.pop();
            c.ConstantsApp._tutorialElements = null
        }
        for (a = c.ConstantsApp.enemyList.length; 0 < a--;) c.ConstantsApp.enemyList.pop();
        c.ConstantsApp.enemyList = null
    };
    c.ConstantsApp.getDifficulty = function() {
        return c.ConstantsApp._difficulty
    };
    c.ConstantsApp.setDifficulty =
        function(a) {
            c.ConstantsApp._difficulty = a
        };
    c.ConstantsScreen = function() {};
    k["com.nick.spongeBob.capri_sun_adventure_jungle.data.ConstantsScreen"] = c.ConstantsScreen;
    c.ConstantsScreen.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,data,ConstantsScreen".split(",");
    m = {};
    f = void 0;
    C = void 0;
    q = void 0;
    g = void 0;
    $ = void 0;
    i = void 0;
    S = void 0;
    m.WMEventDispatcher = function() {
        this._signals = new F
    };
    k["com.workinman.events.WMEventDispatcher"] = m.WMEventDispatcher;
    m.WMEventDispatcher.__name__ = ["com", "workinman",
        "events", "WMEventDispatcher"
    ];
    m.WMEventDispatcher.prototype = {
        dispose: function() {
            for (var a = this._signals.iterator(); a.hasNext();) a.next().dispose();
            this._signals = null
        },
        dispatchEvent: function(a) {
            this._signals.exists(a.getEventId()) && this._signals.get(a.getEventId()).dispatchEvent(a)
        },
        removeEventListener: function(a, b) {
            this._signals.exists(a) && (this._signals.get(a).removeEventListener(b), this._signals.get(a).isEmtpy() && (this._signals.get(a).dispose(), this._signals.remove(a)))
        },
        addEventListener: function(a,
            b) {
            this._signals.exists(a) || this._signals.set(a, new m._WMEventDispatcher.WMEventTracker);
            this._signals.get(a).addEventListener(b)
        },
        __class__: m.WMEventDispatcher
    };
    j = {
        ScreenManager: function(a) {
            m.WMEventDispatcher.call(this);
            this._container = a;
            this._layerScreen = new M;
            this._layerTransition = new M;
            this._container.addChild(this._layerScreen);
            this._container.addChild(this._layerTransition);
            this._isPaused = !1;
            this._screens = [];
            this._screensOpen = [];
            this._screensQueue = [];
            this._transitionType = -1;
            this._flagCloseAllScreensWhenBottomCloses =
                this._flagHasScreenshot = this._flagOpenScreenAfterTransition = this._flagCloseScreenAfterTransition = this._flagHasTransition = !1;
            this._camera = new g.WorkinCamera(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y)
        }
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.ScreenManager"] = j.ScreenManager;
    j.ScreenManager.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,ScreenManager".split(",");
    j.ScreenManager.__super__ = m.WMEventDispatcher;
    j.ScreenManager.prototype = t(m.WMEventDispatcher.prototype, {
        _transitionPlay: function() {
            this._transition.show();
            this._transition.start()
        },
        _removeTransition: function() {
            this._flagHasTransition && (this._layerTransition.removeChild(this._transition._getEntity()), this._transition._getDispatcher().removeEventListener(m.WMEventScreenOut.EVENT_SCREEN_OUTPUT, s(this, this._onEventTransitionOutput)), this._transition.dispose(), this._transition = null, this._flagHasTransition = !1)
        },
        _addTransition: function(a, b) {
            null == b && (b = !0);
            if (this._flagHasTransition) {
                if (!b) return;
                this._removeTransition()
            }
            this._transition =
                new j.transitions.TransitionBase(a);
            this._transition.hide();
            this._transition._getDispatcher().addEventListener(m.WMEventScreenOut.EVENT_SCREEN_OUTPUT, s(this, this._onEventTransitionOutput));
            this._layerTransition.addChild(this._transition._getEntity());
            this._flagHasTransition = !0
        },
        _updateTransition: function(a) {
            switch (this._transitionType) {
                case c.ConstantsScreen.TRANSITION_SCROLL:
                    this._transitionScreenHeadedOut._getPos().x -= 3E3 * a;
                    this._transitionScreenHeadedIn._getPos().x -= 3E3 * a;
                    0 >= this._transitionScreenHeadedIn._getPos().x &&
                        (this._transitionScreenHeadedIn._getPos().x = 0, this._flagHasTransition = !1, this._onTransitionCloseScreen(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, {
                            screenId: this._transitionScreenHeadedIn.id
                        })));
                    break;
                case c.ConstantsScreen.TRANSITION_SCROLL_UP:
                    this._transitionScreenHeadedOut._getPos().y -= 2E3 * a;
                    this._transitionScreenHeadedIn._getPos().y -= 2E3 * a;
                    0 >=
                        this._transitionScreenHeadedIn._getPos().y && (this._transitionScreenHeadedIn._getPos().y = 0, this._flagHasTransition = !1, this._onTransitionCloseScreen(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, {
                            screenId: this._transitionScreenHeadedIn.id
                        })));
                    break;
                case c.ConstantsScreen.TRANSITION_SCROLL_DOWN:
                    this._transitionScreenHeadedOut._getPos().y += 2E3 * a;
                    this._transitionScreenHeadedIn._getPos().y +=
                        2E3 * a;
                    0 <= this._transitionScreenHeadedIn._getPos().y && (this._transitionScreenHeadedIn._getPos().y = 0, this._flagHasTransition = !1, this._onTransitionCloseScreen(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, {
                        screenId: this._transitionScreenHeadedIn.id
                    })));
                    break;
                case c.ConstantsScreen.TRANSITION_FADE:
                    this._transition.update(a), this._transition.flagDispose &&
                        (this._removeTransition(), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, {})))
            }
        },
        _removeScreenDisplay: function(a) {
            this._layerScreen.removeChild(a)
        },
        _addScreenDisplay: function(a) {
            this._layerScreen.addChild(a)
        },
        _dispatchEventChange: function(a, b) {
            this.dispatchEvent(new m.WMEventInterfaceChange(a, b))
        },
        _onQueueConditionMet: function(a, b) {
            null == b && (b = "");
            for (var e = 0; e < this._screensQueue.length;) this._screensQueue[e].validateCondition(a,
                b) && (this._generateScreen(this._screensQueue[e].screenData), this._screensQueue.splice(e, 1)), e++
        },
        dispose: function() {
            for (var a = 0; a < this._screensOpen.length;) this._disposeScreen(this._screensOpen[a].id), a++;
            this._screens = this._screensQueue = null;
            this._removeTransition();
            this._container.removeChild(this._layerScreen);
            this._container.removeChild(this._layerTransition);
            this._layerTransition = this._layerScreen = null;
            m.WMEventDispatcher.prototype.dispose.call(this)
        },
        _getScreenData: function(a) {
            for (var b = this._screens.length -
                    1; 0 <= b;) {
                if (this._screens[b].id == a) return this._screens[b];
                b--
            }
            f.WorkinCloud.instance.log("[ScreenManager](_getScreenData) ERROR: Screen >" + a + "< idoes not exist. getScreenData() returning NULL.");
            return null
        },
        _hasScreenData: function(a) {
            for (var b = this._screens.length - 1; 0 <= b;) {
                if (this._screens[b].id == a) return !0;
                b--
            }
            return !1
        },
        _removeScreenshot: function() {
            this._flagHasScreenshot && (this._layerScreen.removeChild(this._screenshot._getEntity()), this._screenshot.dispose(), this._screenshot = null, this._flagHasScreenshot = !1)
        },
        _addScreenshot: function() {
            f.WorkinCloud.instance.log("[ScreenManager](_addScreenshot) ERROR: Screenshots not supported in HTML5 yet.")
        },
        _onTransitionCloseScreen: function() {
            this._flagCloseScreenAfterTransition && (this.closeScreen(this._screenIdToCloseAfterTransition, !1), this._flagCloseScreenAfterTransition = !1);
            this._flagOpenScreenAfterTransition && (this.openScreen(this._screenIdToOpenDuringTransition, !1), this._flagOpenScreenAfterTransition = !1)
        },
        _onEventTransitionOutput: function(a) {
            a.flowId == c.ConstantsScreen.OUTPUT_OPENED ?
                (f.WorkinCloud.instance.log("[ScreenManager] Transition Midway..."), this._onTransitionCloseScreen(), this._removeScreenshot(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY)) : a.flowId == c.ConstantsScreen.OUTPUT_CLOSED && (f.WorkinCloud.instance.log("[ScreenManager] Transition Complete."), this._removeScreenshot(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE))
        },
        _onEventScreenOutput: function(a) {
            a.flowId == c.ConstantsScreen.OUTPUT_OPENED ? this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_COMPLETE,
                a.screenId) : a.flowId == c.ConstantsScreen.OUTPUT_CLOSED && (this._dispatchEventChange(c.ConstantsScreen.CHANGE_CLOSE_COMPLETE, a.screenId), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_CLOSED_SPECIFIC, a.screenId), this._flagHasTransition && this._transitionType == c.ConstantsScreen.TRANSITION_STAGED && this._transitionPlay())
        },
        _disposeScreen: function(a) {
            for (var b = 0; b < this._screensOpen.length;) {
                if (this._screensOpen[b].id == a) {
                    this._screensOpen[b]._getDispatcher().removeEventListener(m.WMEventScreenOut.EVENT_SCREEN_OUTPUT,
                        s(this, this._onEventScreenOutput));
                    this._removeScreenDisplay(this._screensOpen[b]._getEntity());
                    this._screensOpen[b].dispose();
                    this._screensOpen.splice(b, 1);
                    break
                }
                b++
            }
        },
        _generateScreen: function(a) {
            if (this.isScreenOpen(a.id)) this.getScreen(a.id).reset(), this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_BEGIN, a.id);
            else {
                var b = N.createInstance(a.screenClass, [a.id, a.assetClassName, a.data]);
                if (null == b) f.WorkinCloud.instance.log("[ScreenManager](_generateScreen) ERROR: Screen Class for >" + a.id + "< not found.");
                else {
                    if (this._flagHasTransition) switch (this._transitionScreenHeadedIn = b, this._transitionType) {
                        case c.ConstantsScreen.TRANSITION_SCROLL:
                            b._getPos().x = c.ConstantsApp.STAGE_WIDTH;
                            break;
                        case c.ConstantsScreen.TRANSITION_SCROLL_UP:
                            b._getPos().y = c.ConstantsApp.STAGE_HEIGHT;
                            break;
                        case c.ConstantsScreen.TRANSITION_SCROLL_DOWN:
                            b._getPos().y = -c.ConstantsApp.STAGE_HEIGHT
                    }
                    this._screensOpen.push(b);
                    b.renderPosition(this._camera);
                    this._addScreenDisplay(b._getEntity());
                    b._getDispatcher().addEventListener(m.WMEventScreenOut.EVENT_SCREEN_OUTPUT,
                        s(this, this._onEventScreenOutput));
                    b.open(!0);
                    this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_BEGIN, a.id)
                }
            }
        },
        _addScreenToQueue: function(a, b, e) {
            null == e && (e = "");
            this.hasQueuedScreen(a.id) || this._screensQueue.push(new j.screens.data.ScreenQueueData(a, b, e))
        },
        removeAllQueuedScreens: function() {
            for (var a = this._screensQueue.length - 1; 0 <= a;) this._screensQueue.splice(a, 1), a--
        },
        removeQueuedScreen: function(a) {
            for (var b = this._screensQueue.length - 1; 0 <= b;) {
                if (this._screensQueue[b].screenData.id == a) {
                    this._screensQueue.splice(b,
                        1);
                    break
                }
                b--
            }
        },
        hasQueuedScreen: function(a) {
            for (var b = this._screensQueue.length - 1; 0 <= b;) {
                if (this._screensQueue[b].screenData.id == a) return !0;
                b--
            }
            return !1
        },
        isScreenOpen: function(a) {
            for (var b = this._screensOpen.length - 1; 0 <= b;) {
                if (this._screensOpen[b].id == a) return !0;
                b--
            }
            return !1
        },
        getScreen: function(a) {
            null == a && (a = "");
            if (0 == this._screensOpen.length) return f.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: no screens are open. Unable to getScreen()"), null;
            if ("" == a) return this._screensOpen[this._screensOpen.length -
                1];
            for (var b = this._screensOpen.length - 1; 0 <= b;) {
                if (this._screensOpen[b].id == a) return this._screensOpen[b];
                b--
            }
            f.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: Screen >" + a + "< is not open or does not exist. getScreen() returning NULL.");
            return null
        },
        update: function(a) {
            if (!this._isPaused) {
                0.15 < a && (a = 0.15);
                this._flagHasTransition && this._updateTransition(a);
                for (this._loop = this._screensOpen.length - 1; 0 <= this._loop;) this._screensOpen[this._loop].update(a), this._screensOpen[this._loop].renderPosition(this._camera),
                    this._screensOpen[this._loop].flagDispose && (this._disposeScreen(this._screensOpen[this._loop].id), 0 == this._screensOpen.length && this._onQueueConditionMet(c.ConstantsScreen.CONDITION_CLOSED_ALL)), this._loop--
            }
        },
        _getHasTransition: function() {
            return this._flagHasTransition
        },
        changeScreenTo: function(a, b, e, O) {
            null == O && (O = "");
            null == e && (e = -1);
            null == b && (b = !1);
            f.WorkinCloud.instance.log("[ScreenManager](changeTo) " + a);
            this.removeAllQueuedScreens();
            if (this.isScreenOpen(a)) {
                f.WorkinCloud.instance.log("[ScreenManager](changeTo) Screen is already open.");
                for (b = this._screensOpen.length - 1; 0 <= b;) this._screensOpen[b].id != a && this.closeScreen(this._screensOpen[b].id, !1, b), b--;
                this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_BEGIN, a);
                this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_COMPLETE, a)
            } else if (this._flagOpenScreenAfterTransition = this._flagCloseScreenAfterTransition = !1, 0 < this._screensOpen.length) {
                f.WorkinCloud.instance.log("[ScreenManager](changeFrom) " + this._screensOpen[0].id);
                this._screensOpen[0].suspend();
                var d = c.ConstantsScreen.CONDITION_CLOSED_ALL;
                if (-1 < e) switch (this._transitionType = e, this._transitionType) {
                    case c.ConstantsScreen.TRANSITION_SCREENSHOT:
                        this._flagOpenScreenAfterTransition = !0;
                        b = !1;
                        this._addScreenshot();
                        this._transitionPlay();
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        d = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL_UP:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        d = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL_DOWN:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        d = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        d = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_FADE:
                        this._addTransition(O, this._flagHasTransition ? this._transition._getIsOutro() ? !0 : !1 : !1), this._flagCloseScreenAfterTransition = !0, b = !1, this._transitionPlay(), d = c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY
                }
                if (0 < this._screensOpen.length && (this._flagCloseScreenAfterTransition ? this._screenIdToCloseAfterTransition =
                        this._screensOpen[0].id : this.closeScreen(this._screensOpen[0].id, b, 0), 1 < this._screensOpen.length))
                    for (b = 1; b < this._screensOpen.length;) this.closeScreen(this._screensOpen[b].id, !1, this._screensOpen.length), b++;
                this._flagOpenScreenAfterTransition ? (f.WorkinCloud.instance.log("[ScreenManager] Store Screen to open at transition midway: " + a), this._screenIdToOpenDuringTransition = a) : this.openScreen(a, !0, d)
            } else this.openScreen(a, !1)
        },
        _moveScreenToTop: function(a) {
            var b = this.getScreen(a);
            if (null == b) f.WorkinCloud.instance.log("[ScreenManager](_moveScreenToTop) ERROR: Screen >" +
                a + "< is not open or does not exist. Cancelling move.");
            else {
                b.isClosing() && b.open(!1);
                for (var e = this._screensOpen.length - 1; 0 <= e && !(this._screensOpen[e].id == a);) e--;
                this._screensOpen.splice(e, 1);
                b.reset();
                this._removeScreenDisplay(b._getEntity());
                this._addScreenDisplay(b._getEntity());
                this._screensOpen.push(b)
            }
        },
        openScreen: function(a, b, e, O) {
            null == O && (O = "");
            null == e && (e = 0);
            null == b && (b = !0);
            f.WorkinCloud.instance.log("[ScreenManager](openScreen) " + a);
            if (this._hasScreenData(a))
                if (this.isScreenOpen(a)) this._moveScreenToTop(a);
                else {
                    if (e != c.ConstantsScreen.CONDITION_IMMEDIATE && b) {
                        if (0 < this._screensOpen.length) {
                            this._addScreenToQueue(this._getScreenData(a), e, O);
                            return
                        }
                        if ((e == c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE || e == c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY) && this._flagHasTransition) {
                            this._addScreenToQueue(this._getScreenData(a), e, O);
                            return
                        }
                    }
                    this._generateScreen(this._getScreenData(a))
                }
            else f.WorkinCloud.instance.log("[ScreenManager](closeScreen) ERROR: Screen >" + a + "< does not exist. Cancelling open().")
        },
        closeScreen: function(a,
            b, e) {
            null == e && (e = -1);
            null == b && (b = !0);
            null == a && (a = "");
            if (0 == this._screensOpen.length) this.removeQueuedScreen(a);
            else {
                if ("" == a) e = this._screensOpen[this._screensOpen.length - 1];
                else if (0 <= e && e < this._screensOpen.length) e = this._screensOpen[e];
                else if (e = this.getScreen(a), null == e) {
                    this.removeQueuedScreen(a);
                    return
                }
                e.close(b);
                this._dispatchEventChange(c.ConstantsScreen.CHANGE_CLOSE_BEGIN, a)
            }
        },
        handleInput: function(a) {
            for (var b = !0, e = this._screensOpen.length - 1; 0 <= e && b;) this._screensOpen[e].handleInput(a, e == this._screensOpen.length -
                1) || (b = !1), e--;
            return b
        },
        addScreen: function(a, b, e, c, d) {
            null == c && (c = 0);
            null == e && (e = "");
            this._screens.push(new j.screens.data.ScreenData(a, b, e, c, d))
        },
        __class__: j.ScreenManager,
        __properties__: {
            get_isTransition: "_getHasTransition"
        }
    });
    i = {
        IPoolable: function() {}
    };
    k["com.workinman.display.IPoolable"] = i.IPoolable;
    i.IPoolable.__name__ = ["com", "workinman", "display", "IPoolable"];
    i.IPoolable.prototype = {
        __class__: i.IPoolable,
        __properties__: {
            set_isPooled: "_setIsPooled",
            get_isPooled: "_getIsPooled",
            set_isActive: "_setIsActive",
            get_isActive: "_getIsActive"
        }
    };
    i.Poolable = function() {
        this._flagPooled = !0;
        this._flagActive = !1
    };
    k["com.workinman.display.Poolable"] = i.Poolable;
    i.Poolable.__name__ = ["com", "workinman", "display", "Poolable"];
    i.Poolable.__interfaces__ = [i.IPoolable];
    i.Poolable.prototype = {
        _setIsActive: function(a) {
            return this._flagActive = a
        },
        _getIsActive: function() {
            return this._flagActive
        },
        _setIsPooled: function(a) {
            return this._flagPooled = a
        },
        _getIsPooled: function() {
            return this._flagPooled
        },
        dispose: function() {
            this.release()
        },
        release: function() {
            this._flagActive = !1
        },
        renew: function() {
            this._flagActive = !0
        },
        __class__: i.Poolable,
        __properties__: {
            set_isPooled: "_setIsPooled",
            get_isPooled: "_getIsPooled",
            set_isActive: "_setIsActive",
            get_isActive: "_getIsActive"
        }
    };
    i.Element = function(a) {
        i.Poolable.call(this, a);
        this._entity = new M;
        this._display = new o.Sprite;
        this._entity.add(this._display);
        this._elements = [];
        this._textureEntity = new M;
        this._entity.addChild(this._textureEntity);
        this._texture = new o.Sprite;
        this._textureEntity.add(this._texture);
        this._dispatcher = new m.WMEventDispatcher;
        this._initPos = new g.WorkinPoint;
        this._pos = new g.WorkinPoint;
        this._velocity = new g.WorkinPoint;
        this._renderOffset = new g.WorkinPoint;
        this._renderOrigin = new g.WorkinPoint;
        this._render = new i.Renderable;
        this._tweener = new g.tween.WorkinTween;
        this._collisionBox = new I.Rectangle(0, 0, 0, 0);
        this._collisionBoxOffset = new g.WorkinPoint;
        this._uniqueId = C.ConstantsCloud.getUniqueId();
        this._type = this._layer = this._assetId = "";
        this._useCamera = !0;
        this._doDelete = !1;
        !0 == a.pooled ? this._setIsPooled(!0) : (this._setIsPooled(!1),
            this.renew(a));
        this._addEventListeners()
    };
    k["com.workinman.display.Element"] = i.Element;
    i.Element.__name__ = ["com", "workinman", "display", "Element"];
    i.Element.__super__ = i.Poolable;
    i.Element.prototype = t(i.Poolable.prototype, {
        testPointBoxCollision: function(a) {
            return a.x > this._collisionBox.x && a.x < this._collisionBox.x + this._collisionBox.width ? !0 : !1
        },
        testLineBoxCollision: function(a) {
            return a._getP0().x < this._collisionBox.x && a._getP1().x < this._collisionBox.x || a._getP0().x > this._collisionBox.x + this._collisionBox.width &&
                a._getP1().x > this._collisionBox.x + this._collisionBox.width ? !1 : !0
        },
        testBoxCollision: function(a) {
            if (this._collisionBox.x > a.x && this._collisionBox.x < a.x + a.width || a.x > this._collisionBox.x && a.x < this._collisionBox.x + this._collisionBox.width)
                if (this._collisionBox.y > a.y && this._collisionBox.y < a.y + a.height || a.y > this._collisionBox.y && a.y < this._collisionBox.y + this._collisionBox.height) return !0;
            return !1
        },
        _updateCollisionBox: function() {
            this._collisionBox.x = this._getPos().x + this._collisionBoxOffset.x;
            this._collisionBox.y =
                this._getPos().y + this._collisionBoxOffset.y
        },
        _showCollisionBox: function() {
            !1 == c.ConstantsApp.OPTION_SHOW_COLLISION_BOX || !1 == this._getShowCollisionBox() || (null != this._collisionBoxEntity && this._textureEntity.removeChild(this._collisionBoxEntity), this._collisionBoxDebug = new o.FillSprite(49887, this._collisionBox.width | 0, this._collisionBox.height | 0), this._collisionBoxDebug.x.set__(this._collisionBoxOffset.x), this._collisionBoxDebug.y.set__(this._collisionBoxOffset.y), this._collisionBoxDebug.alpha.set__(0.5),
                this._collisionBoxEntity = new M, this._collisionBoxEntity.add(this._collisionBoxDebug), this._textureEntity.addChild(this._collisionBoxEntity))
        },
        _setCollision: function(a, b) {
            null == b ? (this._collisionBoxOffset.x = -(this._renderOrigin.x * this._getRenderable().width), this._collisionBoxOffset.y = -(this._renderOrigin.y * this._getRenderable().height)) : (this._collisionBoxOffset.x = b.x, this._collisionBoxOffset.y = b.y);
            null == a ? (this._collisionBox.width = this._getRenderable().width, this._collisionBox.height = this._getRenderable().height) :
                (this._collisionBox.width = a.x, this._collisionBox.height = a.y);
            this._showCollisionBox()
        },
        _removeEventListeners: function() {},
        _addEventListeners: function() {},
        setOrigin: function(a) {
            this._renderOrigin.toPoint(a);
            this._render.width = this._texture.getNaturalWidth();
            this._render.height = this._texture.getNaturalHeight();
            this._texture.x.set__(-(this._renderOrigin.x * this._render.width));
            this._texture.y.set__(-(this._renderOrigin.y * this._render.height))
        },
        applyRenderable: function() {
            this._display.x.set__(this._render.x);
            this._display.y.set__(this._render.y);
            this._display.scaleX.set__(this._render.scaleX);
            this._display.scaleY.set__(this._render.scaleY);
            this._display.rotation.set__(this._render.rotation);
            this._display.alpha.set__(this._render.alpha);
            this._display.set_visible(this._render.visible)
        },
        renderPositionWithoutCamera: function() {
            this._render.x = this._pos.x + this._renderOffset.x;
            this._render.y = this._pos.y + this._renderOffset.y;
            this.applyRenderable()
        },
        renderPosition: function(a) {
            null == a || !1 == this._useCamera ? (this._render.x =
                this._pos.x + this._renderOffset.x, this._render.y = this._pos.y + this._renderOffset.y) : (this._render.x = this._pos.x - a._getPos().x + a._getScreenCenterX() + this._renderOffset.x, this._render.y = this._pos.y - a._getPos().y + a._getScreenCenterY() + this._renderOffset.y);
            for (var b = 0, e = this._elements; b < e.length;) {
                var c = e[b];
                ++b;
                c.renderPosition(a)
            }
            this.applyRenderable()
        },
        _addElement: function(a) {
            this._elements.push(a);
            this._entity.addChild(a._getEntity());
            return a
        },
        _onTweensComplete: function() {},
        updatePosFromTweener: function(a) {
            this._tweener.update(a);
            this._pos.to(this._tweener._getCurrent().x, this._tweener._getCurrent().y);
            this._tweener._getBoolAllTweensComplete() && this._onTweensComplete()
        },
        updatePositionFromVelocity: function(a) {
            this._pos.x += this._velocity.x * a;
            this._pos.y += this._velocity.y * a
        },
        update: function(a) {
            this._updateCollisionBox();
            for (var b = 0, e = this._elements; b < e.length;) {
                var c = e[b];
                ++b;
                c.update(a)
            }
        },
        swapTexture: function(a) {
            this._textureEntity.remove(this._texture);
            this._texture.dispose();
            this._texture = a;
            this._render.width = this._texture.getNaturalWidth();
            this._render.height = this._texture.getNaturalHeight();
            this._texture.x.set__(-(this._renderOrigin.x * this._render.width));
            this._texture.y.set__(-(this._renderOrigin.y * this._render.height));
            this._textureEntity.add(this._texture)
        },
        setTexture: function(a) {
            "" != a && (!1 == f.WorkinCloud.instance._getAssets().hasAsset(a) ? f.WorkinCloud.instance.log("[Element](setTexture) No asset named " + a + " exists!") : this.swapTexture(new o.ImageSprite(f.WorkinCloud.instance._getAssets().getTexture(a))))
        },
        _getUniqueId: function() {
            return this._uniqueId
        },
        _setLayer: function(a) {
            return this._layer = a
        },
        _getLayer: function() {
            return this._layer
        },
        _getDepth: function() {
            return this._pos.z
        },
        _getDispatcher: function() {
            return this._dispatcher
        },
        _getEntity: function() {
            return this._entity
        },
        _getRenderable: function() {
            return this._render
        },
        _setDoDelete: function(a) {
            return this._doDelete = a
        },
        _getDoDelete: function() {
            return this._doDelete
        },
        _setPos: function(a) {
            this._pos.toPoint(a);
            return this._pos
        },
        _getPos: function() {
            return this._pos
        },
        _getShowCollisionBox: function() {
            return !0
        },
        _getInitPos: function() {
            return this._initPos
        },
        _getType: function() {
            return this._type
        },
        dispose: function() {
            if (this._getIsPooled()) this.release();
            else {
                for (var a = 0, b = this._elements; a < b.length;) {
                    var e = b[a];
                    ++a;
                    e.dispose()
                }
                this._elements = null;
                this._removeEventListeners();
                this._dispatcher.dispose();
                this._dispatcher = null;
                this._entity.dispose();
                this._velocity = this._pos = this._initPos = this._entity = null;
                this._texture.dispose();
                this._display = this._texture = null;
                this._textureEntity.dispose();
                this._renderOrigin = this._renderOffset =
                    this._render = this._textureEntity = null;
                this._tweener.dispose();
                this._tweener = null;
                null != this._collisionBox && (this._collisionBoxOffset = this._collisionBox = null);
                null != this._collisionBoxDebug && (this._collisionBoxDebug = null);
                null != this._collisionBoxEntity && (this._collisionBoxEntity = null)
            }
        },
        release: function() {
            this._getIsPooled() && i.Poolable.prototype.release.call(this)
        },
        renew: function(a) {
            a.asset && (this._assetId = a.asset, this.setTexture(this._assetId));
            this._doDelete = !1;
            a.layer && (this._layer = a.layer);
            a.type &&
                (this._type = a.type);
            a.x && (this._initPos.x = this._pos.x = a.x);
            a.y && (this._initPos.y = this._pos.y = a.y);
            a.rot && (this._render.rotation = a.rot);
            a.scale && (this._render.scaleX = this._render.scaleY = a.scale);
            null != a.useCamera && (this._useCamera = a.useCamera);
            a.origin ? this.setOrigin(a.origin) : this.setOrigin(new g.WorkinPoint(0, 0));
            this._collisionBox = new I.Rectangle(0, 0, 0, 0);
            this._collisionBoxOffset = new g.WorkinPoint
        },
        __class__: i.Element,
        __properties__: t(i.Poolable.prototype.__properties__, {
            get_type: "_getType",
            get_initPos: "_getInitPos",
            get_showCollisionBox: "_getShowCollisionBox",
            set_pos: "_setPos",
            get_pos: "_getPos",
            set_doDelete: "_setDoDelete",
            get_doDelete: "_getDoDelete",
            get_renderable: "_getRenderable",
            get_entity: "_getEntity",
            get_dispatcher: "_getDispatcher",
            set_layer: "_setLayer",
            get_layer: "_getLayer"
        })
    });
    j.buttons = {};
    j.buttons.ButtonBase = function(a, b, e, c, d, f, h) {
        null == h && (h = "");
        null == f && (f = "");
        null == d && (d = "");
        null == c && (c = "");
        this._DEBUG_SHOW_HITBOX = !1;
        null == e && (e = new g.WorkinPoint(0.5, 0.5));
        i.Element.call(this, {
            x: a,
            y: b,
            asset: this._assetUp,
            origin: e
        });
        this._assetUp = "" == c ? this._getDefaultAssetUp() : c;
        this._assetOver = "" == d ? this._getDefaultAssetOver() : d;
        this._assetDown = "" == f ? this._getDefaultAssetDown() : f;
        this._assetDisabled = "" == h ? this._getDefaultAssetDisabled() : h;
        this._flagDragged = this._flagClickTransition = this._flagDown = !1;
        this.enable();
        this._buildHitBox();
        this._buttonScaleBase = new g.WorkinPoint(1, 1)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.buttons.ButtonBase"] = j.buttons.ButtonBase;
    j.buttons.ButtonBase.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,buttons,ButtonBase".split(",");
    j.buttons.ButtonBase.__super__ = i.Element;
    j.buttons.ButtonBase.prototype = t(i.Element.prototype, {
        _renderDisabled: function() {
            "" != this._assetDisabled && this.setTexture(this._assetDisabled)
        },
        _renderReturnUp: function() {
            this._flagClickTransition || (g.tween.WorkinTweener._getInstance().tween(this._render, 0.15, {
                scaleX: this._buttonScaleBase.x,
                scaleY: this._buttonScaleBase.y
            }).ease(g.tween.PennerManager.EASE_QUAD_OUT), this._renderUp())
        },
        _renderDown: function() {
            this._flagClickTransition || (g.tween.WorkinTweener._getInstance().tween(this._render,
                0.15, {
                    scaleX: 1.04 * this._buttonScaleBase.x,
                    scaleY: 1.04 * this._buttonScaleBase.y
                }).ease(g.tween.PennerManager.EASE_QUAD_OUT), "" != this._assetDown && this.setTexture(this._assetDown))
        },
        _renderUp: function() {
            "" != this._assetUp && this.setTexture(this._assetUp)
        },
        setScale: function(a, b) {
            this._buttonScaleBase.x = a;
            this._buttonScaleBase.y = b;
            this._render.scaleX = this._buttonScaleBase.x;
            this._render.scaleY = this._buttonScaleBase.y
        },
        _playSoundClick: function() {
            f.WorkinCloud.instance._getSound().playSound("button_click")
        },
        update: function(a) {
            i.Element.prototype.update.call(this, a);
            this._flagDown && !1 == f.WorkinCloud.instance._getInput().getInput(c.ConstantsApp.INPUT_CLICK) && (this._upConnection.dispose(), this._renderReturnUp())
        },
        _onCancelDrag: function() {
            this._flagDragged = !1;
            this._dispatch(j.buttons.ButtonBase.CANCEL_DRAG)
        },
        _onUp: function() {
            !f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) && this._flagDown && (this._upConnection.dispose(), this._upConnection = null, this._flagDown = !1, this._renderReturnUp(),
                this._click(), this._flagDragged && this._onCancelDrag(), this._dispatch(j.buttons.ButtonBase.UP))
        },
        _onDown: function() {
            f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) || (this._flagDown = !0, this._renderDown(), this._upConnection = this._hitBox.get_pointerUp().connect(s(this, this._onUpEvent)), this._dispatch(j.buttons.ButtonBase.DOWN))
        },
        _onClickTransitionComplete: function() {
            this._flagClickTransition = !1;
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            this._dispatch(j.buttons.ButtonBase.CLICK);
            "" != this._getClickFlow() && f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventFlow(this._getClickFlow()));
            "" != this._getClickEvent() && f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(this._getClickEvent()));
            g.tween.WorkinTweener._getInstance().stop(this._render);
            this._render.scaleX = this._buttonScaleBase.x;
            this._render.scaleY = this._buttonScaleBase.y
        },
        _click: function() {
            !f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_INPUT_LOCK) && !f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) &&
                (this._flagClickTransition = !0, this._playSoundClick(), g.tween.WorkinTweener._getInstance().tween(this._render, 0.25, {
                    scaleX: 0.96 * this._buttonScaleBase.x,
                    scaleY: 0.96 * this._buttonScaleBase.y
                }).ease(g.tween.PennerManager.EASE_QUAD_OUT), g.tween.WorkinTweener._getInstance().tween(this._render, 0.25, {
                    scaleX: 0.99 * this._buttonScaleBase.x,
                    scaleY: 0.99 * this._buttonScaleBase.y
                }, null, null, !1).ease(g.tween.PennerManager.EASE_ELASTIC_OUT).delay(0.25).onComplete(s(this, this._onClickTransitionComplete)), f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0))
        },
        _dispatch: function(a) {
            this._GET_DO_DISPATCH() && this._dispatcher.dispatchEvent(new m.WMEvent(a))
        },
        _onUpEvent: function(a) {
            this._onUp(a.viewX, a.viewY)
        },
        _onDownEvent: function(a) {
            this._onDown(a.viewX, a.viewY)
        },
        _getClickFlow: function() {
            return ""
        },
        _getClickEvent: function() {
            return ""
        },
        _GET_DISABLE_FRAME: function() {
            return 1
        },
        _GET_CUSTOM_HIT_BOX: function() {
            return new I.Point(0, 0)
        },
        _GET_DO_DISPATCH: function() {
            return !0
        },
        _getDefaultAssetDisabled: function() {
            return ""
        },
        _getDefaultAssetDown: function() {
            return ""
        },
        _getDefaultAssetOver: function() {
            return ""
        },
        _getDefaultAssetUp: function() {
            return ""
        },
        dispose: function() {
            this.disable();
            this._downConnection.dispose();
            this._downConnection = null;
            this._flagDown && (this._upConnection.dispose(), this._upConnection = null);
            this._hitBox.dispose();
            this._buttonScaleBase = null;
            i.Element.prototype.dispose.call(this)
        },
        _buildHitBox: function() {
            this._DEBUG_SHOW_HITBOX ? this._hitBox = new o.FillSprite(16711680, this._render.width | 0, this._render.height | 0) : (this._hitBox = new o.ImageSprite(y.createTexture(this._render.width |
                0, this._render.height | 0)), this._hitBox.alpha.set__(0));
            var a = new M;
            a.add(this._hitBox);
            this._textureEntity.addChild(a);
            this._downConnection = this._hitBox.get_pointerDown().connect(s(this, this._onDownEvent))
        },
        disable: function() {
            this._flagEnabled = !1;
            this._renderDisabled()
        },
        enable: function() {
            this._flagEnabled = !0;
            this._renderUp()
        },
        __class__: j.buttons.ButtonBase,
        __properties__: t(i.Element.prototype.__properties__, {
            get__DO_DISPATCH: "_GET_DO_DISPATCH",
            get__clickEvent: "_getClickEvent",
            get__clickFlow: "_getClickFlow"
        })
    });
    j.buttons.ButtonSoundToggle = function(a, b, e, c, d) {
        this._onAssets = c;
        this._offAssets = d;
        this._refreshMuteState();
        j.buttons.ButtonBase.call(this, a, b, e, this._currentAssets[0], this._currentAssets[1], this._currentAssets[3 == this._currentAssets.length ? 2 : 1])
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.buttons.ButtonSoundToggle"] = j.buttons.ButtonSoundToggle;
    j.buttons.ButtonSoundToggle.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,buttons,ButtonSoundToggle".split(",");
    j.buttons.ButtonSoundToggle.__super__ =
        j.buttons.ButtonBase;
    j.buttons.ButtonSoundToggle.prototype = t(j.buttons.ButtonBase.prototype, {
        _getClickEvent: function() {
            return ""
        },
        _refreshMuteState: function() {
            this._currentAssets = f.WorkinCloud.instance._getSound().getMute() ? this._offAssets : this._onAssets;
            this._assetUp = this._currentAssets[0];
            this._assetOver = this._currentAssets[1];
            this._assetDown = this._currentAssets[3 == this._currentAssets.length ? 2 : 1]
        },
        _click: function() {
            this._flagEnabled && !f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_INPUT_LOCK) &&
                !f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) && (f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_MUTE_TOGGLE)), this._refreshMuteState(), this._renderReturnUp(), j.buttons.ButtonBase.prototype._click.call(this))
        },
        __class__: j.buttons.ButtonSoundToggle
    });
    i.Display = function(a, b, e, c) {
        null == e && (e = "");
        this._flagLocked = !1;
        i.Element.call(this, {
            x: a,
            y: b,
            asset: e,
            origin: c
        });
        this._addEventListeners()
    };
    k["com.workinman.display.Display"] = i.Display;
    i.Display.__name__ = ["com", "workinman", "display", "Display"];
    i.Display.__super__ = i.Element;
    i.Display.prototype = t(i.Element.prototype, {
        lock: function() {
            this._flagLocked = !0
        },
        dispose: function() {
            i.Element.prototype.dispose.call(this);
            this._removeEventListeners()
        },
        _updateValue: function() {
            return ""
        },
        _refresh: function() {},
        _onUpdateDisplay: function(a) {
            this._flagLocked || a._getData().valueID == this._updateValue() && this._refresh()
        },
        _removeEventListeners: function() {
            i.Element.prototype._removeEventListeners.call(this);
            f.WorkinCloud.instance._getDispatcher().removeEventListener(i.Display.EVENT_UPDATE_DISPLAY,
                s(this, this._onUpdateDisplay))
        },
        _addEventListeners: function() {
            i.Element.prototype._addEventListeners.call(this);
            f.WorkinCloud.instance._getDispatcher().addEventListener(i.Display.EVENT_UPDATE_DISPLAY, s(this, this._onUpdateDisplay))
        },
        __class__: i.Display
    });
    j.displays = {};
    j.displays.DisplayCombo = function(a, b, e) {
        null == e && (e = 0);
        this._STATE_OUT = 4;
        this._STATE_WAIT = 3;
        this._STATE_IN_OUT = 2;
        this._STATE_IN = 1;
        this._STATE_IDLE = 0;
        i.Display.call(this, a, b, "", new g.WorkinPoint(0.5, 0.5));
        this._comboHeat = this._addElement(new i.Element({
            asset: "popup_backing_green",
            scale: 0.5,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._comboHot = this._addElement(new i.Element({
            asset: "popup_backing_red",
            scale: 0.5,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._comboCold = this._addElement(new i.Element({
            asset: "popup_backing_blue",
            scale: 0.5,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._updateBacking();
        this._addElement(new i.TextLocalized(-10, -10, "combo", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._currentCombo = f.WorkinCloud.instance.getInt(this._updateValue());
        this._textNum = this._addElement(new i.TextBase(60,
            10, p.string(this._currentCombo), f.WorkinCloud.instance._getLocalize().getData("combo")._getFontName(), {
                origin: new g.WorkinPoint(0.5, 0.5)
            }));
        this._textNum._getRenderable().scaleX = this._textNum._getRenderable().scaleY = 0 == e ? f.WorkinCloud.instance._getLocalize().getData("combo")._getScale() : e;
        this._refresh();
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayCombo"] = j.displays.DisplayCombo;
    j.displays.DisplayCombo.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayCombo".split(",");
    j.displays.DisplayCombo.__super__ = i.Display;
    j.displays.DisplayCombo.prototype = t(i.Display.prototype, {
        dispose: function() {
            this._textNum = null;
            i.Display.prototype.dispose.call(this)
        },
        _updateValue: function() {
            return c.ConstantsApp.INT_COMBO
        },
        _refresh: function() {
            this._currentCombo = f.WorkinCloud.instance.getInt(this._updateValue());
            this._textNum._setText(p.string(this._currentCombo));
            this._updateBacking();
            0 < this._currentCombo && this._setState(this._STATE_IN)
        },
        _onTweensComplete: function() {
            switch (this._state) {
                case this._STATE_WAIT:
                    this._setState(this._STATE_OUT)
            }
        },
        update: function(a) {
            switch (this._state) {
                case this._STATE_IN:
                    1 > this._getRenderable().alpha && (this._getRenderable().alpha += 3 * a, 1 <= this._getRenderable().alpha && (this._getRenderable().alpha = 1));
                    1.2 > this._getRenderable().scaleX && (this._getRenderable().scaleX = this._getRenderable().scaleY += 5 * a, 1.2 <= this._getRenderable().scaleX && (this._getRenderable().scaleX = 1.2, this._getRenderable().scaleY = 1.2));
                    1.2 == this._getRenderable().scaleX && this._setState(this._STATE_IN_OUT);
                    break;
                case this._STATE_IN_OUT:
                    1 > this._getRenderable().alpha &&
                        (this._getRenderable().alpha += 3 * a, 1 <= this._getRenderable().alpha && (this._getRenderable().alpha = 1));
                    1 < this._getRenderable().scaleX && (this._getRenderable().scaleX = this._getRenderable().scaleY -= 5 * a, 1 >= this._getRenderable().scaleX && (this._getRenderable().scaleX = 1, this._getRenderable().scaleY = 1, this._setState(this._STATE_WAIT)));
                    break;
                case this._STATE_WAIT:
                    1 > this._getRenderable().alpha && (this._getRenderable().alpha += 3 * a, 1 <= this._getRenderable().alpha && (this._getRenderable().alpha = 1));
                    this.updatePosFromTweener(a);
                    break;
                case this._STATE_OUT:
                    0 < this._getRenderable().alpha && (this._getRenderable().alpha -= 3 * a, 0 >= this._getRenderable().alpha && (this._getRenderable().alpha = 0)), 0 < this._getRenderable().scaleX && (this._getRenderable().scaleX = this._getRenderable().scaleY -= 5 * a, 0 >= this._getRenderable().scaleX && (this._getRenderable().scaleX = 0, this._getRenderable().scaleY = 0)), 0 == this._getRenderable().alpha && this._setState(this._STATE_IDLE)
            }
            i.Display.prototype.update.call(this, a)
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_COMBO,
                        0);
                    this._getRenderable().alpha = 0;
                    this._getRenderable().scaleX = this._getRenderable().scaleY = 0.5;
                    break;
                case this._STATE_WAIT:
                    this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(this._getPos(), 2, g.tween.PennerManager.EASE_LINEAR), this._tweener.start()
            }
        },
        _updateBacking: function() {
            7 > this._currentCombo ? (this._comboCold._getRenderable().alpha = 1 - this._currentCombo / 6, this._comboHot._getRenderable().alpha = 0) : this._comboCold._getRenderable().alpha = 0;
            6 < this._currentCombo &&
                13 > this._currentCombo ? this._comboHot._getRenderable().alpha = (this._currentCombo - 6) / 6 : 12 < this._currentCombo && (this._comboHot._getRenderable().alpha = 1)
        },
        __class__: j.displays.DisplayCombo
    });
    j.displays.DisplayHealth = function(a, b) {
        i.Display.call(this, a, b);
        this._addElement(new i.Element({
            asset: "hud_health_backing"
        }));
        this._addElement(new i.TextLocalized(49, 20, "health", "", {}));
        this._healthSlider2 = this._addElement(new i.Element({
            x: 14,
            y: 42,
            asset: "hud_health_slider_02"
        }));
        this._healthSlider = this._addElement(new i.Element({
            x: 14,
            y: 42,
            asset: "hud_health_slider"
        }));
        this._refresh()
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayHealth"] = j.displays.DisplayHealth;
    j.displays.DisplayHealth.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayHealth".split(",");
    j.displays.DisplayHealth.__super__ = i.Display;
    j.displays.DisplayHealth.prototype = t(i.Display.prototype, {
        dispose: function() {
            this._healthSlider2 = this._healthSlider = null;
            i.Display.prototype.dispose.call(this)
        },
        _updateValue: function() {
            return c.ConstantsApp.INT_HEALTH
        },
        _refresh: function() {
            var a = f.WorkinCloud.instance.getInt(this._updateValue());
            0 >= a && (a = 0);
            this._healthSlider2._getPos().x = this._healthSlider._getPos().x = this._healthSlider._getInitPos().x + 146 * (a / c.ConstantsApp.PLAYER_MAX_HEALTH);
            this._healthSlider2._getRenderable().alpha = a / c.ConstantsApp.PLAYER_MAX_HEALTH;
            this._healthSlider._getRenderable().alpha = 1 - a / c.ConstantsApp.PLAYER_MAX_HEALTH
        },
        __class__: j.displays.DisplayHealth
    });
    j.displays.DisplayLevel = function(a, b, e) {
        null == e && (e = 0);
        this._STATE_OUT = 3;
        this._STATE_WAIT =
            2;
        this._STATE_IN = 1;
        this._STATE_IDLE = 0;
        i.Display.call(this, a, b, "", new g.WorkinPoint(0.5, 0.5));
        this._addElement(new i.Element({
            asset: "intro_backing",
            origin: new g.WorkinPoint(0.5, 0.5),
            scale: 0.8
        }));
        a = 0;
        10 > f.WorkinCloud.instance.getInt(this._updateValue()) && (a = 20);
        this._addElement(new i.TextLocalized(-40 + a, 0, "level", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        b = f.WorkinCloud.instance.getInt(this._updateValue());
        this._textNum = this._addElement(new i.TextBase(50 + a, -18, p.string(b), f.WorkinCloud.instance._getLocalize().getData("level")._getFontName(), {
            origin: new g.WorkinPoint(0, 0)
        }));
        this._textNum._getRenderable().scaleX = this._textNum._getRenderable().scaleY = 0 == e ? f.WorkinCloud.instance._getLocalize().getData("level")._getScale() : e;
        this._refresh();
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayLevel"] = j.displays.DisplayLevel;
    j.displays.DisplayLevel.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayLevel".split(",");
    j.displays.DisplayLevel.__super__ = i.Display;
    j.displays.DisplayLevel.prototype =
        t(i.Display.prototype, {
            dispose: function() {
                this._textNum = null;
                i.Display.prototype.dispose.call(this)
            },
            update: function(a) {
                if (!f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED)) {
                    switch (this._state) {
                        case this._STATE_IN:
                        case this._STATE_WAIT:
                        case this._STATE_OUT:
                            this.updatePosFromTweener(a)
                    }
                    i.Display.prototype.update.call(this, a)
                }
            },
            _onTweensComplete: function() {
                switch (this._state) {
                    case this._STATE_IN:
                        this._setState(this._STATE_WAIT);
                        break;
                    case this._STATE_WAIT:
                        f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_DISPLAY_GO));
                        this._setState(this._STATE_OUT);
                        break;
                    case this._STATE_OUT:
                        this._setState(this._STATE_IDLE)
                }
            },
            _setState: function(a) {
                this._state = a;
                switch (this._state) {
                    case this._STATE_IDLE:
                        this._getPos().x = this._getInitPos().x + c.ConstantsApp.STAGE_WIDTH;
                        break;
                    case this._STATE_IN:
                        this._getPos().x = this._getInitPos().x + c.ConstantsApp.STAGE_WIDTH;
                        this._tweener.clearTweens();
                        this._tweener.setStartFromPoint(this._getPos());
                        this._tweener.addTween(new g.WorkinPoint(this._getPos().x - c.ConstantsApp.STAGE_WIDTH, this._getPos().y),
                            0.5, g.tween.PennerManager.EASE_LINEAR);
                        this._tweener.start();
                        break;
                    case this._STATE_WAIT:
                        this._tweener.clearTweens();
                        this._tweener.setStartFromPoint(this._getPos());
                        this._tweener.addTween(this._getPos(), 2, g.tween.PennerManager.EASE_LINEAR);
                        this._tweener.start();
                        break;
                    case this._STATE_OUT:
                        this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(new g.WorkinPoint(this._getPos().x - c.ConstantsApp.STAGE_WIDTH, this._getPos().y), 0.5, g.tween.PennerManager.EASE_LINEAR),
                            this._tweener.start()
                }
            },
            _updateValue: function() {
                return c.ConstantsApp.INT_LEVEL
            },
            _refresh: function() {
                var a = f.WorkinCloud.instance.getInt(this._updateValue());
                this._textNum._setText(p.string(a))
            },
            __class__: j.displays.DisplayLevel
        });
    j.displays.DisplayLoadingProgress = function(a, b) {
        this._TWEEN_SPEED = 5;
        i.Display.call(this, a, b);
        this._addElement(new i.Element({
            asset: "loading_bar_backing"
        }));
        this._slider = this._addElement(new i.Element({
            x: 31,
            y: 122,
            asset: "loading_bar_slider"
        }));
        var e = f.WorkinCloud.instance.getInt(this._updateValue());
        this._currentXPos = this._slider._getInitPos().x;
        this._newXPos = this._slider._getInitPos().x + 344 * (e / 100);
        f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_FIRST_LOAD) ? (f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_FIRST_LOAD, !1), this._startTweening = !0) : this._startTweening = !1;
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, s(this, this._onEventScreenTransitionCompleted))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayLoadingProgress"] =
        j.displays.DisplayLoadingProgress;
    j.displays.DisplayLoadingProgress.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayLoadingProgress".split(",");
    j.displays.DisplayLoadingProgress.__super__ = i.Display;
    j.displays.DisplayLoadingProgress.prototype = t(i.Display.prototype, {
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, s(this, this._onEventScreenTransitionCompleted));
            i.Display.prototype.dispose.call(this)
        },
        _onEventScreenTransitionCompleted: function() {
            this._startTweening = !0
        },
        _updateValue: function() {
            return c.ConstantsApp.INT_LOADING_PROGRESS
        },
        update: function(a) {
            this._startTweening && (this._currentXPos += (this._newXPos - this._currentXPos) * a * this._TWEEN_SPEED, this._slider._getPos().x = this._currentXPos);
            i.Display.prototype.update.call(this, a)
        },
        _refresh: function() {
            var a = f.WorkinCloud.instance.getInt(this._updateValue()),
                a = this._slider._getInitPos().x + 345 * (a / 100);
            a > this._newXPos && (this._newXPos = a)
        },
        __class__: j.displays.DisplayLoadingProgress
    });
    j.displays.DisplayQueenHealth = function(a, b) {
        this._STATE_OUT = 3;
        this._STATE_IN = 1;
        this._STATE_IDLE = 0;
        i.Display.call(this, a, b);
        this._addElement(new i.Element({
            asset: "hud_health_backing"
        }));
        this._addElement(new i.TextLocalized(58, 20, "queen", "", {}));
        this._healthSlider2 = this._addElement(new i.Element({
            x: 14,
            y: 42,
            asset: "hud_health_slider_02"
        }));
        this._healthSlider = this._addElement(new i.Element({
            x: 14,
            y: 42,
            asset: "hud_health_slider"
        }));
        this._refresh();
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SHOW_QUEEN_HEALTH,
            s(this, this._onEventShowHealth));
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_HIDE_QUEEN_HEALTH, s(this, this._onEventHideHealth));
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayQueenHealth"] = j.displays.DisplayQueenHealth;
    j.displays.DisplayQueenHealth.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayQueenHealth".split(",");
    j.displays.DisplayQueenHealth.__super__ = i.Display;
    j.displays.DisplayQueenHealth.prototype =
        t(i.Display.prototype, {
            dispose: function() {
                this._healthSlider2 = this._healthSlider = null;
                f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SHOW_QUEEN_HEALTH, s(this, this._onEventShowHealth));
                f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_HIDE_QUEEN_HEALTH, s(this, this._onEventHideHealth));
                i.Display.prototype.dispose.call(this)
            },
            _onEventHideHealth: function() {
                this._setState(this._STATE_OUT)
            },
            _onEventShowHealth: function() {
                this._setState(this._STATE_IN)
            },
            _updateValue: function() {
                return c.ConstantsApp.INT_QUEEN_HEALTH
            },
            _refresh: function() {
                if (0 != f.WorkinCloud.instance.getInt(c.ConstantsApp.QUEEN_MAX_HEALTH)) {
                    var a = f.WorkinCloud.instance.getInt(this._updateValue());
                    0 >= a && (a = 0);
                    this._healthSlider2._getPos().x = this._healthSlider._getPos().x = this._healthSlider._getInitPos().x + 146 * (a / f.WorkinCloud.instance.getInt(c.ConstantsApp.QUEEN_MAX_HEALTH));
                    this._healthSlider2._getRenderable().alpha = a / f.WorkinCloud.instance.getInt(c.ConstantsApp.QUEEN_MAX_HEALTH);
                    this._healthSlider._getRenderable().alpha =
                        1 - a / f.WorkinCloud.instance.getInt(c.ConstantsApp.QUEEN_MAX_HEALTH)
                }
            },
            update: function(a) {
                switch (this._state) {
                    case this._STATE_IDLE:
                        this._getPos().y = this._getInitPos().y - 200;
                        break;
                    case this._STATE_IN:
                        this.updatePosFromTweener(a);
                        break;
                    case this._STATE_OUT:
                        this.updatePosFromTweener(a)
                }
                i.Display.prototype.update.call(this, a)
            },
            _setState: function(a) {
                this._state = a;
                switch (this._state) {
                    case this._STATE_IDLE:
                        this._getPos().y = this._getInitPos().y - 200;
                        break;
                    case this._STATE_IN:
                        this._tweener.clearTweens();
                        this._tweener.setStartFromPoint(this._getPos());
                        this._tweener.addTween(this._getInitPos(), 1, g.tween.PennerManager.EASE_LINEAR);
                        this._tweener.start();
                        break;
                    case this._STATE_OUT:
                        this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(new g.WorkinPoint(this._getPos().x, this._getPos().y - 200), 1, g.tween.PennerManager.EASE_LINEAR), this._tweener.start()
                }
            },
            __class__: j.displays.DisplayQueenHealth
        });
    j.displays.DisplayScore = function(a, b, e, c, d) {
        null == d && (d = !1);
        null == e && (e = 0);
        i.Display.call(this, a, b, "", c);
        !1 == d ? (this._addElement(new i.Element({
                asset: "hud_score_backing"
            })),
            this._addElement(new i.TextLocalized(48, 34, "score", "", {}))._getRenderable().rotation = -3) : this._addElement(new i.TextLocalized(0, 0, "score", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        !1 == d ? (a = f.WorkinCloud.instance.getInt(this._updateValue()), this._textNum = this._addElement(new i.TextBase(45, 57, p.string(a), f.WorkinCloud.instance._getLocalize().getData("score")._getFontName(), {}))) : (a = f.WorkinCloud.instance.getInt(this._updateValue()), this._textNum = this._addElement(new i.TextBase(0, 28, p.string(a), f.WorkinCloud.instance._getLocalize().getData("score")._getFontName(), {
            origin: new g.WorkinPoint(0.5, 0.5)
        })));
        this._textNum._getRenderable().scaleX = this._textNum._getRenderable().scaleY = 0 == e ? f.WorkinCloud.instance._getLocalize().getData("score")._getScale() : e;
        this._refresh()
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayScore"] = j.displays.DisplayScore;
    j.displays.DisplayScore.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayScore".split(",");
    j.displays.DisplayScore.__super__ = i.Display;
    j.displays.DisplayScore.prototype =
        t(i.Display.prototype, {
            dispose: function() {
                this._textNum = null;
                i.Display.prototype.dispose.call(this)
            },
            _updateValue: function() {
                return c.ConstantsApp.INT_SCORE
            },
            _refresh: function() {
                var a = f.WorkinCloud.instance.getInt(this._updateValue());
                this._textNum._setText(p.string(a))
            },
            __class__: j.displays.DisplayScore
        });
    j.displays.DisplayStamina = function(a, b) {
        i.Display.call(this, a, b);
        this._addElement(new i.Element({
            asset: "hud_attack_backing"
        }));
        this._addElement(new i.TextLocalized(49, 21, "energy", "", {}));
        this._attackSlider =
            this._addElement(new i.Element({
                x: 14,
                y: 44,
                asset: "hud_attack_slider"
            }));
        this._easterEggMode = !1;
        this._glow1 = this._addElement(new i.Element({
            x: -18,
            y: 35,
            asset: "energy_glow_01"
        }));
        this._glow1._getRenderable().alpha = 0;
        this._glow2 = this._addElement(new i.Element({
            x: -18,
            y: 35,
            asset: "energy_glow_02"
        }));
        this._glow2._getRenderable().alpha = 0;
        this._glow2FadeOut = !1;
        this._refresh();
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG, s(this, this._onActivateEasterEgg))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.displays.DisplayStamina"] = j.displays.DisplayStamina;
    j.displays.DisplayStamina.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,displays,DisplayStamina".split(",");
    j.displays.DisplayStamina.__super__ = i.Display;
    j.displays.DisplayStamina.prototype = t(i.Display.prototype, {
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG, s(this, this._onActivateEasterEgg));
            i.Display.prototype.dispose.call(this)
        },
        _onActivateEasterEgg: function() {
            this._easterEggMode = !0
        },
        _updateValue: function() {
            return c.ConstantsApp.FLOAT_STAMINA
        },
        _refresh: function() {
            var a = f.WorkinCloud.instance.getInt(this._updateValue());
            this._attackSlider._getPos().x = this._attackSlider._getInitPos().x + 143 * (a / c.ConstantsApp.PLAYER_MAX_STAMINA)
        },
        update: function(a) {
            this._easterEggMode && (0 < this._attackSlider._getRenderable().alpha && (this._attackSlider._getRenderable().alpha -= 2 * a, 0 >= this._attackSlider._getRenderable().alpha && (this._attackSlider._getRenderable().alpha =
                0)), 1 > this._glow1._getRenderable().alpha && (this._glow1._getRenderable().alpha += 2 * a, 1 <= this._glow1._getRenderable().alpha && (this._glow1._getRenderable().alpha = 1)), this._glow2FadeOut && 0 < this._glow2._getRenderable().alpha ? (this._glow2._getRenderable().alpha -= 2 * a, 0 >= this._glow2._getRenderable().alpha && (this._glow2._getRenderable().alpha = 0, this._glow2FadeOut = !1)) : !1 == this._glow2FadeOut && 1 > this._glow2._getRenderable().alpha && (this._glow2._getRenderable().alpha += 2 * a, 1 <= this._glow2._getRenderable().alpha &&
                (this._glow2._getRenderable().alpha = 1, this._glow2FadeOut = !0)));
            i.Display.prototype.update.call(this, a)
        },
        __class__: j.displays.DisplayStamina
    });
    j.screens = {};
    j.screens.ScreenBase = function(a, b) {
        this._STATE_SUSPENDED = "suspend";
        this._STATE_OPENED = "opened";
        this._STATE_OUT = "out";
        this._STATE_IN = "in";
        this.id = a;
        i.Element.call(this, {
            asset: b
        });
        this._clickWall = new M;
        var e = new o.FillSprite(16711680, c.ConstantsApp.STAGE_WIDTH, c.ConstantsApp.STAGE_HEIGHT);
        e.alpha.set__(0);
        this._clickWall.add(e);
        this._entity.addChild(this._clickWall);
        this._entity.addChild(this._textureEntity);
        this._buildButtons();
        this._flagStateAnimationComplete = this._flagStateCompleteTemp = this.flagDispose = !1;
        this._states = [];
        this._generateStates();
        this._stateIndex = this._states.length + 2;
        this._setFirstState();
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, s(this, this._onEventScreenTransitionCompleted))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenBase"] = j.screens.ScreenBase;
    j.screens.ScreenBase.__name__ =
        "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenBase".split(",");
    j.screens.ScreenBase.__super__ = i.Element;
    j.screens.ScreenBase.prototype = t(i.Element.prototype, {
        _onStateComplete: function() {
            this._flagStateCompleteTemp = !1;
            "" != this._states[this._stateIndex].outFunc && f.WorkinCloud.instance.log("[ScreenBase](_onStateComplete) Out Func not supported in HTML5 yet");
            switch (this._states[this._stateIndex].actionOnComplete) {
                case j.screens.data.ScreenStateData.ACTION_OPENED:
                    this._setOpenedState();
                    this._dispatcher.dispatchEvent(new m.WMEventScreenOut(c.ConstantsScreen.OUTPUT_OPENED, this.id));
                    break;
                case j.screens.data.ScreenStateData.ACTION_CLOSED:
                    this.setFlagDispose();
                    this._dispatcher.dispatchEvent(new m.WMEventScreenOut(c.ConstantsScreen.OUTPUT_CLOSED, this.id));
                    break;
                case j.screens.data.ScreenStateData.ACTION_NEW_STATE:
                    this._setState(this._states[this._stateIndex].actionData);
                    break;
                case j.screens.data.ScreenStateData.ACTION_EVENT:
                    this._dispatcher.dispatchEvent(new m.WMEvent(this._states[this._stateIndex].actionData));
                    break;
                case j.screens.data.ScreenStateData.ACTION_FLOW:
                    this._doFlowEvent(this._states[this._stateIndex].actionData)
            }
        },
        _findStateIndex: function(a) {
            for (var b = this._states.length - 1; 0 <= b;) {
                if (this._states[b].id == a) return b;
                b--
            }
            return -1
        },
        getState: function() {
            return this._states[this._stateIndex].id
        },
        _setState: function(a, b) {
            null == b && (b = !1);
            var e = this._findStateIndex(a);
            if (0 > e) f.WorkinCloud.instance.log("[ScreenBase](_setState) ERROR : State >" + a + "< not found."), f.WorkinCloud.instance.log("[ScreenBase](_setState) cancelling setState().");
            else if (b || e != this._stateIndex) this._flagStateAnimationComplete = this._flagStateCompleteTemp = !1, this._stateIndex = e
        },
        _addState: function(a, b, e, c, d, f) {
            null == f && (f = "");
            null == d && (d = "");
            null == c && (c = "");
            null == e && (e = 0);
            this._states.push(new j.screens.data.ScreenStateData(a, b, e, c, d, f))
        },
        isClosing: function() {
            return this.getState() == this._STATE_OUT
        },
        close: function() {
            this.setFlagDispose();
            this._dispatcher.dispatchEvent(new m.WMEventScreenOut(c.ConstantsScreen.OUTPUT_CLOSED, this.id))
        },
        suspend: function() {
            this._setState(this._STATE_SUSPENDED)
        },
        open: function() {
            this._setOpenedState();
            this._dispatcher.dispatchEvent(new m.WMEventScreenOut(c.ConstantsScreen.OUTPUT_OPENED, this.id))
        },
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED, s(this, this._onEventScreenTransitionCompleted));
            this._states = null;
            i.Element.prototype.dispose.call(this)
        },
        reset: function() {
            this._setFirstState()
        },
        handleInput: function(a) {
            var b = !0;
            switch (a.input) {
                case c.ConstantsApp.INPUT_CLICK:
                    switch (a.phase) {
                        case 1:
                            this._onInputDown(a.x,
                                a.y) || (b = !1);
                            break;
                        case 2:
                            this._onInputMove(a.x, a.y) || (b = !1);
                            break;
                        case 0:
                            this._onInputUp(a.x, a.y) || (b = !1)
                    }
                    break;
                default:
                    this._onInput(a) || (b = !1)
            }
            return b
        },
        update: function(a) {
            i.Element.prototype.update.call(this, a);
            this._flagStateCompleteTemp && this._onStateComplete()
        },
        _doFlowEvent: function(a) {
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventFlow(a))
        },
        _buildButtons: function() {},
        _onInput: function() {
            return this.getState() != this._STATE_OPENED ? !1 : !0
        },
        _onInputMove: function() {
            return this.getState() !=
                this._STATE_OPENED ? !1 : !0
        },
        _onInputUp: function() {
            return this.getState() != this._STATE_OPENED ? !1 : !0
        },
        _onInputDown: function() {
            return this.getState() != this._STATE_OPENED ? !1 : !0
        },
        _generateStates: function() {
            this._addState(this._STATE_IN, "in", j.screens.data.ScreenStateData.ACTION_OPENED);
            this._addState(this._STATE_OUT, "out", j.screens.data.ScreenStateData.ACTION_CLOSED);
            this._addState(this._STATE_OPENED, "open");
            this._addState(this._STATE_SUSPENDED, "suspend")
        },
        _setOpenedState: function() {
            this._setState(this._STATE_OPENED)
        },
        _setFirstState: function() {
            this._setState(this._STATE_IN)
        },
        setFlagDispose: function() {
            this.flagDispose = !0
        },
        _onEventScreenTransitionCompleted: function() {},
        __class__: j.screens.ScreenBase,
        __properties__: t(i.Element.prototype.__properties__, {
            get_state: "getState"
        })
    });
    j.screens.ScreenEndGame = function(a, b, e) {
        null == b && (b = "");
        this._BLINK_TIME = 1;
        j.screens.ScreenBase.call(this, a, b, e);
        this._blinkTimer = this._BLINK_TIME;
        a = 0;
        f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_WIN) ? 10 < f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) &&
            (this._addElement(new i.Element({
                asset: "sb_endscreen_backing",
                x: 175,
                y: -78
            })), this._addElement(new i.TextLocalized(c.ConstantsApp.STAGE_CENTER_X - 70, 85, "congrats_win", "", {
                origin: new g.WorkinPoint(0.5, 0.5),
                center: !0
            }))._getRenderable().rotation = -10, c.ConstantsApp.setDifficulty(c.ConstantsApp.getDifficulty() + 1), a = 30) : (this._addElement(new i.Element({
                asset: "sb_endscreen_small_backing_01",
                x: 165,
                y: -78
            })), this._addElement(new i.TextLocalized(420, 105, "game_over", "", {
                origin: new g.WorkinPoint(0.5, 0.5),
                center: !0
            }))._getRenderable().rotation = -10);
        this._score = new j.displays.DisplayScore(425, 210 + a, 0, null, !0);
        this._score.lock();
        this._score._getRenderable().rotation = -10;
        this._score._getRenderable().scaleX = this._score._getRenderable().scaleY = 1.6;
        this._addElement(this._score);
        b = "";
        f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE);
        this._buttonYes = this._addElement(new j.buttons.ButtonBase(290, 460, new g.WorkinPoint(0.5, 0.5), "popup_backing_red", "popup_backing_red", "popup_backing_red"));
        this._buttonYes._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            s(this, this._onYesClick));
        b = f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_WIN) ? "continue" : "play_again";
        this._buttonYes._addElement(new i.TextLocalized(0, 0, b, "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._buttonYes.setScale(0.6, 0.6);
        this._buttonYes._getRenderable().rotation = -12;
        f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_WIN) && 10 < f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) && (this._buttonYes._getPos().x = 9999);
        this._buttonNew = this._addElement(new j.buttons.ButtonBase(590, 390 +
            a, new g.WorkinPoint(0.5, 0.5), "popup_backing_blue", "popup_backing_blue", "popup_backing_blue"));
        this._buttonNew._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onStartOverClick));
        this._buttonNew._addElement(new i.TextLocalized(0, 0, "start_over", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._buttonNew.setScale(0.6, 0.6);
        this._buttonNew._getRenderable().rotation = 10
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenEndGame"] = j.screens.ScreenEndGame;
    j.screens.ScreenEndGame.__name__ =
        "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenEndGame".split(",");
    j.screens.ScreenEndGame.__super__ = j.screens.ScreenBase;
    j.screens.ScreenEndGame.prototype = t(j.screens.ScreenBase.prototype, {
        dispose: function() {
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        _onStartOverClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_START_OVER)
        },
        _onYesClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN)
        },
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a)
        },
        __class__: j.screens.ScreenEndGame
    });
    j.screens.ScreenGameplayHUD = function(a, b, e) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, e);
        this._addElement(new j.displays.DisplayScore(750, -10));
        this._addElement(new j.displays.DisplayHealth(20, -5));
        this._addElement(new j.displays.DisplayStamina(220, -5));
        10 == f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) && this._addElement(new j.displays.DisplayQueenHealth(485, -5));
        this._addElement(new j.buttons.ButtonBase(880,
            45, new g.WorkinPoint(0, 0), "ui/gameplay_hud/hud_pause_up", "ui/gameplay_hud/hud_pause_down", "ui/gameplay_hud/hud_pause_down"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onEventPauseClick));
        this._addElement(new j.displays.DisplayLevel(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y));
        this._addElement(new l.elements.other.Go({
            x: c.ConstantsApp.STAGE_CENTER_X,
            y: c.ConstantsApp.STAGE_CENTER_Y
        }));
        this._arrayPopUp = [];
        for (a = 4; 0 < a--;) this._arrayPopUp.push(this._addElement(new l.elements.other.PopUp({
            x: 480,
            y: 310,
            direction: a
        })));
        this._spawnHelp = this._popUpCounter = this._popUpIndex = 0;
        this._addElement(new j.displays.DisplayCombo(820, c.ConstantsApp.STAGE_CENTER_Y));
        this._addElement(new l.elements.other.EasterEggPopUp({
            x: 480,
            y: 310
        }));
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_POP_UP, s(this, this._onSpawnPopUp));
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_BATTLE_COMMENCE, s(this, this._onBattleCommence))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenGameplayHUD"] =
        j.screens.ScreenGameplayHUD;
    j.screens.ScreenGameplayHUD.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenGameplayHUD".split(",");
    j.screens.ScreenGameplayHUD.__super__ = j.screens.ScreenBase;
    j.screens.ScreenGameplayHUD.prototype = t(j.screens.ScreenBase.prototype, {
        _onEventPauseClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU)
        },
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_BATTLE_COMMENCE,
                s(this, this._onBattleCommence));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_POP_UP, s(this, this._onSpawnPopUp));
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        _onBattleCommence: function() {
            1 < f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) || (this._spawnHelp = 0.2)
        },
        _onEventScreenTransitionCompleted: function() {
            this.getState() != this._STATE_OPENED || 1 < f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) || this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_OPEN)
        },
        update: function(a) {
            0 < this._spawnHelp && (this._spawnHelp -= a, 0 >= this._spawnHelp && (this._spawnHelp = 0, this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME)));
            j.screens.ScreenBase.prototype.update.call(this, a)
        },
        _onSpawnPopUp: function(a) {
            this._popUpCounter++;
            4 == this._popUpCounter && (this._popUpCounter = 0, this._arrayPopUp[this._popUpIndex].showPopUp(a._getData().enemyType, a._getData().numOfEnemies), this._popUpIndex++, 3 < this._popUpIndex && (this._popUpIndex = 0))
        },
        __class__: j.screens.ScreenGameplayHUD
    });
    j.screens.ScreenGameplayMenu = function(a, b, e) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, e);
        this._addElement(new i.Element({
            asset: "ui/menu/menu_backing",
            x: c.ConstantsApp.STAGE_CENTER_X,
            y: c.ConstantsApp.STAGE_CENTER_Y,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(new i.TextLocalized(c.ConstantsApp.STAGE_CENTER_X + 5, 65, "paused", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }))._getRenderable().rotation = -6;
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_WIDTH / 2 + 95, 175, new g.WorkinPoint(0.5,
            0), "ui/menu/menu_help_up", "ui/menu/menu_help_down", "ui/menu/menu_help_down"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onEventHelpClick));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_WIDTH / 2 - 60, 180, new g.WorkinPoint(0.5, 0), "ui/menu/menu_play_up", "ui/menu/menu_play_down", "ui/menu/menu_play_down"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onEventResumeClick));
        this._addElement(new j.buttons.ButtonSoundToggle(c.ConstantsApp.STAGE_WIDTH /
            2 - 55, 360, new g.WorkinPoint(0.5, 0), ["menu_sound_on_up", "menu_sound_on_down", "menu_sound_on_down"], ["menu_sound_off_up", "menu_sound_off_down", "menu_sound_off_down"]))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onEventSoundToggleClick));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_WIDTH / 2 + 110, 350, new g.WorkinPoint(0.5, 0), "ui/menu/menu_close_up", "ui/menu/menu_close_down", "ui/menu/menu_close_down"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            s(this, this._onEventQuitClick))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenGameplayMenu"] = j.screens.ScreenGameplayMenu;
    j.screens.ScreenGameplayMenu.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenGameplayMenu".split(",");
    j.screens.ScreenGameplayMenu.__super__ = j.screens.ScreenBase;
    j.screens.ScreenGameplayMenu.prototype = t(j.screens.ScreenBase.prototype, {
        _removeEventListeners: function() {
            j.screens.ScreenBase.prototype._removeEventListeners.call(this)
        },
        _addEventListeners: function() {
            j.screens.ScreenBase.prototype._addEventListeners.call(this)
        },
        _onEventQuitClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT)
        },
        _onEventResumeClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE)
        },
        _onEventSoundToggleClick: function() {
            this.getState()
        },
        _onEventHelpClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP)
        },
        __class__: j.screens.ScreenGameplayMenu
    });
    j.screens.ScreenGeneric = function(a, b, e) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, e);
        this._flagHasSpaceAction = !1
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenGeneric"] = j.screens.ScreenGeneric;
    j.screens.ScreenGeneric.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenGeneric".split(",");
    j.screens.ScreenGeneric.__super__ = j.screens.ScreenBase;
    j.screens.ScreenGeneric.prototype = t(j.screens.ScreenBase.prototype, {
        _onInputMove: function() {
            return !1
        },
        _onInputUp: function() {
            return !1
        },
        _onInputDown: function() {
            return !1
        },
        __class__: j.screens.ScreenGeneric
    });
    j.screens.ScreenHelp = function(a, b, e) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, e);
        this._addElement(new i.Element({
            asset: "ui/help/help_backing",
            x: c.ConstantsApp.STAGE_CENTER_X,
            y: c.ConstantsApp.STAGE_CENTER_Y - 25,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(new i.TextLocalized(240, 96, "help", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }))._getRenderable().rotation = -12;
        this._addElement(new i.TextLocalized(225, 195, "help_text_1", "", {}));
        this._addElement(new i.TextLocalized(270, 283, "help_text_2", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }));
        this._addElement(new i.TextLocalized(420, 156, "help_text_3", "", {}));
        this._addElement(new i.TextLocalized(200, 467, "help_text_4", "", {}));
        f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) ? this._addElement(new i.TextLocalized(540, 80, "help_text_5b", "", {})) : this._addElement(new i.TextLocalized(540, 80, "help_text_5a",
            "", {}));
        a = this._addElement(new j.buttons.ButtonBase(825, 305, new g.WorkinPoint(0.5, 0.5), "ui/menu/menu_close_up", "ui/menu/menu_close_down", "ui/menu/menu_close_down"));
        a._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onEventPlayClick));
        a.setScale(0.6, 0.6)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenHelp"] = j.screens.ScreenHelp;
    j.screens.ScreenHelp.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenHelp".split(",");
    j.screens.ScreenHelp.__super__ =
        j.screens.ScreenBase;
    j.screens.ScreenHelp.prototype = t(j.screens.ScreenBase.prototype, {
        _onEventPlayClick: function() {
            this.getState() == this._STATE_OPENED && (f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_HELP_FIRST_TIME) ? this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME_CLOSE) : this._doFlowEvent(c.ConstantsScreen.FLOW_HELP_CLOSE))
        },
        __class__: j.screens.ScreenHelp
    });
    j.screens.ScreenLoading = function(a, b, e) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, e);
        a = 0;
        f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_WIN) &&
            (this._addElement(new l.elements.other.CongratsText({
                x: 480,
                y: 80
            })), a = 70);
        this._displayLoading = this._addElement(new j.displays.DisplayLoadingProgress(205, 188 + a));
        this._addElement(new i.TextLocalized(420, 260 + a, "loading", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }));
        this._timerSpin = 0.25;
        this._loadSpinner = this._addElement(new i.Element({
            x: 675,
            y: 208 + a,
            origin: new g.WorkinPoint(0.5, 0.5),
            asset: "loading_spinner_bottom"
        }));
        this._addElement(new i.Element({
            x: 675,
            y: 208 + a,
            origin: new g.WorkinPoint(0.5, 0.5),
            asset: "loading_spinner_top"
        }))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenLoading"] = j.screens.ScreenLoading;
    j.screens.ScreenLoading.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenLoading".split(",");
    j.screens.ScreenLoading.__super__ = j.screens.ScreenBase;
    j.screens.ScreenLoading.prototype = t(j.screens.ScreenBase.prototype, {
        dispose: function() {
            this._loadSpinner = null;
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this,
                a);
            this._timerSpin -= a;
            0 >= this._timerSpin && (this._timerSpin = 0.1, this._loadSpinner._getRenderable().rotation += 45)
        },
        __class__: j.screens.ScreenLoading
    });
    j.screens.ScreenPauseAlert = function(a, b, e) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, e);
        this._alertBox = new o.FillSprite(0, c.ConstantsApp.STAGE_WIDTH | 0, c.ConstantsApp.STAGE_HEIGHT | 0);
        a = new M;
        a.add(this._alertBox);
        this._textureEntity.addChild(a);
        this._textAlert = this._addElement(new i.TextLocalized(50, 50, "orientation_portrait", "", {
            origin: new g.WorkinPoint(0,
                0.5)
        }))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenPauseAlert"] = j.screens.ScreenPauseAlert;
    j.screens.ScreenPauseAlert.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenPauseAlert".split(",");
    j.screens.ScreenPauseAlert.__super__ = j.screens.ScreenBase;
    j.screens.ScreenPauseAlert.prototype = t(j.screens.ScreenBase.prototype, {
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a)
        },
        __class__: j.screens.ScreenPauseAlert
    });
    j.screens.ScreenQuitConfirm =
        function(a, b, e) {
            j.screens.ScreenBase.call(this, a, b, e);
            this._addElement(new i.Element({
                asset: "ui/quit/qc_backing",
                x: c.ConstantsApp.STAGE_CENTER_X + 5,
                y: c.ConstantsApp.STAGE_CENTER_Y - 18,
                origin: new g.WorkinPoint(0.5, 0.5)
            }));
            this._addElement(new i.TextLocalized(c.ConstantsApp.STAGE_CENTER_X + 5, c.ConstantsApp.STAGE_CENTER_Y - 70, "quit_confirm_header", "", {
                origin: new g.WorkinPoint(0.5, 0.5),
                center: !0
            }))._getRenderable().rotation = -4;
            this._buttonYes = this._addElement(new j.buttons.ButtonBase(410, 400, new g.WorkinPoint(0.5,
                0.5), "ui/quit/qc_btn_blank_up", "ui/quit/qc_btn_blank_down", "ui/quit/qc_btn_blank_down"));
            this._buttonYes._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onYesClick));
            this._buttonYes._addElement(new i.TextLocalized(0, 0, "yes", "", {
                origin: new g.WorkinPoint(0.5, 0.5)
            }));
            this._buttonYes._getRenderable().rotation = 5;
            this._buttonNo = this._addElement(new j.buttons.ButtonBase(565, 380, new g.WorkinPoint(0.5, 0.5), "ui/quit/qc_btn_blank_up", "ui/quit/qc_btn_blank_down", "ui/quit/qc_btn_blank_down"));
            this._buttonNo._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onNoClick));
            this._buttonNo._addElement(new i.TextLocalized(0, 0, "no", "", {
                origin: new g.WorkinPoint(0.5, 0.5)
            }));
            this._buttonNo._getRenderable().rotation = -15
        };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenQuitConfirm"] = j.screens.ScreenQuitConfirm;
    j.screens.ScreenQuitConfirm.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenQuitConfirm".split(",");
    j.screens.ScreenQuitConfirm.__super__ =
        j.screens.ScreenBase;
    j.screens.ScreenQuitConfirm.prototype = t(j.screens.ScreenBase.prototype, {
        _onNoClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO)
        },
        _onYesClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES)
        },
        dispose: function() {
            this._buttonNo = this._buttonYes = null;
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        __class__: j.screens.ScreenQuitConfirm
    });
    j.screens.ScreenScreenshot =
        function() {};
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenScreenshot"] = j.screens.ScreenScreenshot;
    j.screens.ScreenScreenshot.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenScreenshot".split(",");
    j.screens.ScreenScreenshot.__super__ = j.screens.ScreenBase;
    j.screens.ScreenScreenshot.prototype = t(j.screens.ScreenBase.prototype, {
        dispose: function() {
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        __class__: j.screens.ScreenScreenshot
    });
    j.screens.ScreenSplash =
        function(a, b, e) {
            null == b && (b = "");
            this._BLINK_TIME = 1;
            j.screens.ScreenBase.call(this, a, b, e);
            this._blinkTimer = this._BLINK_TIME;
            "en" != f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID) ? (this._addElement(new i.Element({
                asset: "splash_title_plain_backing",
                x: 0,
                y: 0,
                origin: new g.WorkinPoint(0, 0)
            })), this._addElement(new i.TextLocalized(c.ConstantsApp.STAGE_CENTER_X - 180, 150, "title", "", {
                origin: new g.WorkinPoint(0.5, 0.5),
                center: !0
            }))) : (this._addElement(new i.Element({
                asset: "splash_title",
                x: 0,
                y: 0,
                origin: new g.WorkinPoint(0, 0)
            })), this._addElement(new i.Element({
                asset: "nick_logo",
                x: 0,
                y: 0,
                origin: new g.WorkinPoint(0, 0)
            })));
            this._addElement(new i.Element({
                asset: "splash_monsters",
                x: 0,
                y: 0,
                origin: new g.WorkinPoint(0, 0)
            }));
            this._addElement(new i.Element({
                asset: "sb_and_pat",
                x: 960,
                y: 560,
                origin: new g.WorkinPoint(1, 1)
            }));
            a = f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) ? "tap_anywhere" : "click_anywhere";
            f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID);
            this._textClickToPlay =
                this._addElement(new i.TextLocalized(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_HEIGHT - 50, a, "", {
                    origin: new g.WorkinPoint(0.5, 0.5)
                }))
        };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenSplash"] = j.screens.ScreenSplash;
    j.screens.ScreenSplash.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenSplash".split(",");
    j.screens.ScreenSplash.__super__ = j.screens.ScreenBase;
    j.screens.ScreenSplash.prototype = t(j.screens.ScreenBase.prototype, {
        _onInputDown: function() {
            if (this.getState() !=
                this._STATE_OPENED) return !1;
            this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY);
            return !1
        },
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a);
            this._blinkTimer -= a;
            0 >= this._blinkTimer && (0 == this._textClickToPlay._getRenderable().alpha ? (this._blinkTimer = this._BLINK_TIME, this._textClickToPlay._getRenderable().alpha = 1) : (this._blinkTimer = this._BLINK_TIME / 2, this._textClickToPlay._getRenderable().alpha = 0))
        },
        __class__: j.screens.ScreenSplash
    });
    j.screens.ScreenTutorial = function(a, b, e) {
        null ==
            b && (b = "");
        this._STATE_INTRO6 = 5;
        this._STATE_INTRO5 = 4;
        this._STATE_INTRO4 = 3;
        this._STATE_INTRO3 = 2;
        this._STATE_INTRO2 = 1;
        this._STATE_INTRO1 = 0;
        j.screens.ScreenBase.call(this, a, b, e);
        this._addElement(c.ConstantsApp.getTutorialElements()[6]);
        this._addElement(c.ConstantsApp.getTutorialElements()[7]);
        this._spongeBobBored = this._addElement(c.ConstantsApp.getTutorialElements()[8]);
        this._spongeBobHappy = this._addElement(c.ConstantsApp.getTutorialElements()[9]);
        this._dialogArray = [];
        this._dialogArray.push(this._addElement(c.ConstantsApp.getTutorialElements()[0]));
        this._dialogArray.push(this._addElement(c.ConstantsApp.getTutorialElements()[1]));
        this._dialogArray.push(this._addElement(c.ConstantsApp.getTutorialElements()[2]));
        this._dialogArray.push(this._addElement(c.ConstantsApp.getTutorialElements()[3]));
        this._dialogArray.push(this._addElement(c.ConstantsApp.getTutorialElements()[4]));
        this._dialogArray.push(this._addElement(c.ConstantsApp.getTutorialElements()[5]));
        this._buttonSkip = this._addElement(new j.buttons.ButtonBase(840, 490, new g.WorkinPoint(0.5, 0.5),
            "popup_backing_green", "popup_backing_green", "popup_backing_green"));
        this._buttonSkip._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, s(this, this._onSkipClick));
        this._buttonSkip._addElement(new i.TextLocalized(0, 0, "skip", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._buttonSkip.setScale(0.5, 0.5);
        this._buttonSkip._getRenderable().rotation = -10;
        this._setTutorialState(this._STATE_INTRO1)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.ScreenTutorial"] = j.screens.ScreenTutorial;
    j.screens.ScreenTutorial.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,ScreenTutorial".split(",");
    j.screens.ScreenTutorial.__super__ = j.screens.ScreenBase;
    j.screens.ScreenTutorial.prototype = t(j.screens.ScreenBase.prototype, {
        dispose: function() {
            this._dialogArray = null;
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        _onSkipClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_CLOSE)
        },
        _onInputDown: function(a, b) {
            if (this.getState() !=
                this._STATE_OPENED || a > this._buttonSkip._getPos().x - this._buttonSkip._getRenderable().width / 2 && a < this._buttonSkip._getPos().x + this._buttonSkip._getRenderable().width / 2 && b > this._buttonSkip._getPos().y - this._buttonSkip._getRenderable().height / 2 && b < this._buttonSkip._getPos().y + this._buttonSkip._getRenderable().height / 2) return !1;
            switch (this._tutorialState) {
                case this._STATE_INTRO1:
                    this._setTutorialState(this._STATE_INTRO2);
                    break;
                case this._STATE_INTRO2:
                    this._setTutorialState(this._STATE_INTRO3);
                    break;
                case this._STATE_INTRO3:
                    this._setTutorialState(this._STATE_INTRO4);
                    break;
                case this._STATE_INTRO4:
                    this._setTutorialState(this._STATE_INTRO5);
                    break;
                case this._STATE_INTRO5:
                    this._setTutorialState(this._STATE_INTRO6);
                    break;
                case this._STATE_INTRO6:
                    this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_CLOSE)
            }
            return !1
        },
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a)
        },
        _updateDialog: function(a) {
            for (var b = this._dialogArray.length; 0 < b--;) b == a ? this._dialogArray[b]._getPos().x = this._dialogArray[b]._getInitPos().x : this._dialogArray[b]._getPos().x = 9999
        },
        _setTutorialState: function(a) {
            this._tutorialState = a;
            switch (this._tutorialState) {
                case this._STATE_INTRO1:
                    this._spongeBobHappy._getPos().x = 9999;
                    break;
                case this._STATE_INTRO5:
                    this._spongeBobBored._getPos().x = 9999, this._spongeBobHappy._getPos().x = this._spongeBobHappy._getInitPos().x
            }
            this._updateDialog(this._tutorialState)
        },
        __class__: j.screens.ScreenTutorial
    });
    j.screens.data = {};
    j.screens.data.ChangeActionData = function() {};
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.data.ChangeActionData"] =
        j.screens.data.ChangeActionData;
    j.screens.data.ChangeActionData.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,data,ChangeActionData".split(",");
    j.screens.data.ChangeActionData.prototype = {
        _getAction: function() {
            return this._action
        },
        _getChangeEvent: function() {
            return this._changeEvent
        },
        _getScreenId: function() {
            return this._screenId
        },
        __class__: j.screens.data.ChangeActionData,
        __properties__: {
            get_screenId: "_getScreenId",
            get_changeEvent: "_getChangeEvent",
            get_action: "_getAction"
        }
    };
    j.screens.data.ScreenData =
        function(a, b, e, c, d) {
            null == c && (c = 0);
            null == e && (e = "");
            this.id = a;
            this.screenClass = b;
            this.assetClassName = e;
            this.layer = c;
            this.data = null == d ? new F : d
        };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.data.ScreenData"] = j.screens.data.ScreenData;
    j.screens.data.ScreenData.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,data,ScreenData".split(",");
    j.screens.data.ScreenData.prototype = {
        __class__: j.screens.data.ScreenData
    };
    j.screens.data.ScreenQueueData = function(a, b, e) {
        null == e && (e = "");
        this.screenData = a;
        this.openCondition = b;
        this.openTestString = e
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.data.ScreenQueueData"] = j.screens.data.ScreenQueueData;
    j.screens.data.ScreenQueueData.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,data,ScreenQueueData".split(",");
    j.screens.data.ScreenQueueData.prototype = {
        validateCondition: function(a, b) {
            null == b && (b = "");
            return this.openCondition == a ? "" == this.openTestString || this.openTestString == b : !1
        },
        __class__: j.screens.data.ScreenQueueData
    };
    j.screens.data.ScreenStateData = function(a, b, e, c, d, f) {
        this.id = a;
        this.animation = b;
        this.actionOnComplete = e;
        this.actionData = c;
        this.inFunc = d;
        this.outFunc = f
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.screens.data.ScreenStateData"] = j.screens.data.ScreenStateData;
    j.screens.data.ScreenStateData.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,screens,data,ScreenStateData".split(",");
    j.screens.data.ScreenStateData.prototype = {
        __class__: j.screens.data.ScreenStateData
    };
    j.transitions = {};
    j.transitions.TransitionBase =
        function(a, b, e, c) {
            null == c && (c = "");
            null == e && (e = !1);
            null == b && (b = !0);
            this._STATE_OUT = 3;
            this._STATE_IDLE = 2;
            this._STATE_IN = 1;
            this._STATE_HIDDEN = 0;
            this._transitionId = c;
            this._flagOutOnly = e;
            this.flagDispose = !1;
            i.Element.call(this, {
                asset: a
            });
            b ? this._setState(this._STATE_HIDDEN) : this._flagOutOnly ? this._setState(this._STATE_OUT) : this._setState(this._STATE_IN)
        };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.ui.transitions.TransitionBase"] = j.transitions.TransitionBase;
    j.transitions.TransitionBase.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,ui,transitions,TransitionBase".split(",");
    j.transitions.TransitionBase.__super__ = i.Element;
    j.transitions.TransitionBase.prototype = t(i.Element.prototype, {
        dispose: function() {
            i.Element.prototype.dispose.call(this);
            this._mc = null
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_HIDDEN:
                    this.hide()
            }
        },
        show: function() {
            this._mc.set_visible(!0)
        },
        hide: function() {
            this._mc.set_visible(!1)
        },
        start: function() {
            this.show();
            this._setState(this._STATE_IN)
        },
        update: function(a) {
            i.Element.prototype.update.call(this, a)
        },
        _getIsOutro: function() {
            return this._state ==
                this._STATE_OUT
        },
        __class__: j.transitions.TransitionBase,
        __properties__: t(i.Element.prototype.__properties__, {
            get_isOutro: "_getIsOutro"
        })
    });
    l = {
        World: function(a) {
            this._SPAWN_DELAY = 0.5;
            this._POOL_PARTICLES = "_POOL_PARTICLES";
            this._STATE_GAMEPLAY = 1;
            this._STATE_INITIALIZING = 0;
            m.WMEventDispatcher.call(this);
            this._timeline = a;
            this._timerCrystal = 0.2;
            this._elementManager = new i.ElementManager(this._timeline, c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_BG);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_ENEMY_BACK);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_PLAYER);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_ENEMY_FRONT);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_FG);
            this._mouseDown = !1;
            this._currentMotionLine = new g.WorkinLine(new g.WorkinPoint, new g.WorkinPoint);
            this._enemies = [];
            this._doSpawn = !1;
            this._currentDeadEnemies = this._currentSpawnedEnemies = 0;
            this._spawnDelay = this._SPAWN_DELAY;
            this._easterEggCrayon = null;
            this._isBossLevel =
                10 == f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) ? !0 : !1;
            f.WorkinCloud.instance.stack([s(this, this._initPools), s(this, this._initParticles), s(this, this._initPlayer), s(this, this._initEnemies), s(this, this._initTutorialElements), s(this, this._initBackground), s(this, this._onGenerationComplete)]);
            this._setState(this._STATE_INITIALIZING)
        }
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.World"] = l.World;
    l.World.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,World".split(",");
    l.World.__super__ = m.WMEventDispatcher;
    l.World.prototype = t(m.WMEventDispatcher.prototype, {
        _onGenerationComplete: function() {
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_WORLD_GENERATION_COMPLETE))
        },
        _spawnBackgroundTile: function(a, b, e, O, d, f, g, h) {
            null == h && (h = 2);
            null == g && (g = 4);
            this._elementManager.addElement(new l.elements.BackgroundTile({
                x: 0,
                y: 0,
                assets: a,
                offsetX: b,
                offsetY: e,
                scrollratiox: d,
                scrollratioy: f,
                totalTiles: g,
                totalAssetParts: h,
                layer: c.ConstantsApp.LAYER_BG
            }))
        },
        _initBackground: function() {
            this._elementManager.addElement(new l.elements.Background({
                asset: "jungle_bg_sky"
            }));
            this._spawnBackgroundTile("jungle_bg_mid", 0, 0, 1003, 1, 1, 2, 1);
            this._spawnBackgroundTile("jungle_bg_fg", 0, 0, 1013, 1, 1, 2, 1);
            this._elementManager.addElement(new l.elements.Background({
                asset: "jungle_bg_fog_overlay"
            }));
            this._patrick = this._elementManager.addElement(new l.elements.Patrick({
                x: 625,
                y: 350,
                target: this._player
            }));
            10 == f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) && this._elementManager.addElement(new l.elements.other.EasterEggBush({
                x: f.WorkinUtils.getRandom(0,
                    50, !0),
                y: c.ConstantsApp.GROUND_LEVEL - 100
            }));
            this._elementManager.addElement(new i.Element({
                x: 200 + f.WorkinUtils.getRandom(0, 200, !0),
                y: c.ConstantsApp.GROUND_LEVEL - 100,
                asset: "jungle_midg_plant_02",
                layer: c.ConstantsApp.LAYER_BG,
                origin: new g.WorkinPoint(0.5, 1)
            }));
            this._elementManager.addElement(new i.Element({
                x: 600 + f.WorkinUtils.getRandom(0, 200, !0),
                y: c.ConstantsApp.GROUND_LEVEL - 100,
                asset: "jungle_midg_plant_02",
                layer: c.ConstantsApp.LAYER_BG,
                origin: new g.WorkinPoint(0.5, 1)
            }));
            this._elementManager.addElement(new i.Element({
                x: f.WorkinUtils.getRandom(0,
                    200, !0),
                y: c.ConstantsApp.GROUND_LEVEL - 90,
                asset: "jungle_midg_plant_01",
                layer: c.ConstantsApp.LAYER_BG,
                origin: new g.WorkinPoint(0.5, 1)
            }));
            this._elementManager.addElement(new i.Element({
                x: 300 + f.WorkinUtils.getRandom(0, 200, !0),
                y: c.ConstantsApp.GROUND_LEVEL - 90,
                asset: "jungle_midg_plant_01",
                layer: c.ConstantsApp.LAYER_BG,
                origin: new g.WorkinPoint(0.5, 1)
            }));
            this._elementManager.addElement(new i.Element({
                x: 900 + f.WorkinUtils.getRandom(0, 200, !0),
                y: c.ConstantsApp.GROUND_LEVEL - 90,
                asset: "jungle_midg_plant_01",
                layer: c.ConstantsApp.LAYER_BG,
                origin: new g.WorkinPoint(0.5, 1)
            }))
        },
        _initTutorialElements: function() {
            1 == f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) && c.ConstantsApp.initTutorialElements()
        },
        _initEnemies: function() {
            c.ConstantsApp.initEnemyList();
            this._totalEnemiesNum = c.ConstantsApp.enemyList.length
        },
        _initPlayer: function() {
            var a = 0;
            10 == f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) && (a = 400);
            this._player = this._elementManager.addElement(new l.elements.Player({
                x: 100 + a,
                y: c.ConstantsApp.GROUND_LEVEL
            }))
        },
        _initParticles: function() {
            this._spongs = []
        },
        _onEventInitPoolComplete: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(i.PoolManager.ALL_POOLS_FULL, s(this, this._onEventInitPoolComplete));
            f.WorkinCloud.instance.unpauseStack()
        },
        _initPools: function() {
            f.WorkinCloud.instance.pauseStack();
            f.WorkinCloud.instance._getDispatcher().addEventListener(i.PoolManager.ALL_POOLS_FULL, s(this, this._onEventInitPoolComplete));
            this._poolManager = new i.PoolManager;
            this._poolManager.addPool(this._POOL_PARTICLES, l.elements.Particle, 20)
        },
        handleInput: function(a) {
            if (!(f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED) ||
                    this._state == this._STATE_INITIALIZING)) switch (a.input) {
                case c.ConstantsApp.INPUT_CLICK:
                    switch (a.phase) {
                        case m.WMEventInput.PHASE_DOWN:
                            this._mouseDown = !0;
                            break;
                        case m.WMEventInput.PHASE_UP:
                            this._player.doMove(a.swipe, f.WorkinCloud.instance._getInput()._getPointer()._getLine(), this._elementManager._getCamera()), this._mouseDown = !1
                    }
            }
        },
        _unpause: function() {
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1)
        },
        _pause: function() {
            f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !0)
        },
        _spawnParticle: function(a) {
            var b = [];
            b.x = a.x;
            b.y = a.y;
            b.type = c.ConstantsApp.TYPE_PARTICLE;
            b.layer = a.layer ? a.layer : c.ConstantsApp.LAYER_FG;
            a.scale && (b.scale = a.scale);
            switch (a.particle) {
                case c.ConstantsApp.PARTICLE_POOF:
                    b.movie = a.particle;
                    b.y += (0.5 < Math.random() ? 1 : -1) * 10 * Math.random();
                    b.vx = (200 + p.random(250)) * (0.5 < Math.random() ? 1 : -1) / 2;
                    b.vy = (200 + p.random(250)) * (0.5 < Math.random() ? 1 : -1) / 2;
                    b.rotRate = -500 + p.random(1E3);
                    b.fadeRate = 1;
                    b.origin = new g.WorkinPoint(0.5, 0.5);
                    break;
                case c.ConstantsApp.PARTICLE_TRAIL:
                    b.movie = p.string(a.particle) +
                        "_white";
                    b.vx = 0;
                    b.vy = 0;
                    b.scaleX = a.scaleX;
                    b.angle = a.angle;
                    b.origin = new g.WorkinPoint(0.5, 0.9);
                    b.fadeRate = 3;
                    break;
                case c.ConstantsApp.PARTICLE_CARDBOARD:
                    b.movie = p.string(a.particle) + p.string(f.WorkinUtils.getRandom(1, 3, !0)), b.y += (0.5 < Math.random() ? 1 : -1) * 10 * Math.random(), b.vx = (200 + p.random(250)) * (0.5 < Math.random() ? 1 : -1) / 2, b.vy = (-500 - p.random(300)) / 2, b.gravity = 1E3, b.rotRate = -500 + p.random(1E3), b.lifespan = 3, b.origin = new g.WorkinPoint(0.5, 0.5)
            }
            this._elementManager.addElement(this._poolManager.createElement(this._POOL_PARTICLES,
                b))
        },
        _onEventSpawnParticle: function(a) {
            this._spawnParticle(a._getData())
        },
        _onEventSpawnEasterEgg: function(a) {
            a = a._getData().pos;
            this._easterEggCrayon = this._elementManager.addElement(new l.elements.other.EasterEggCrayon({
                x: a.x,
                y: a.y
            }))
        },
        _onSpawnHitEffect: function(a) {
            var b = a._getData().pos;
            this._elementManager.addElement(new l.elements.EffectHit({
                x: b.x,
                y: b.y,
                angle: a._getData().angle
            }))
        },
        _onSpawnSwooshEffect: function() {},
        _onAttackSB: function(a) {
            this._player.testBoxCollision(a._getData().box) && (this._player.doDamage(a._getData().damage,
                a._getData().direction), this._patrick.doLaugh())
        },
        _onCheckCollisions: function(a) {
            var b = a._getData().line,
                e = 0,
                b = g.WorkinMath.getAngleFromTwoPoints(b._getP0(), b._getP1());
            if (this._player.get_isGrounded())
                if (0 >= b && -90 < b) b = 0;
                else if (180 <= b || -90 >= b) b = 180;
            for (var O = "", d = this._elementManager._getElements().length; 0 < d--;)
                if (this._elementManager._getElements()[d]._getType() == c.ConstantsApp.TYPE_ENEMY) {
                    if (this._elementManager._getElements()[d].testLineBoxCollision(a._getData().line)) {
                        G.__cast(this._elementManager._getElements()[d],
                            l.elements.enemies.EnemyBase).doDamage(1);
                        var h = new g.WorkinPoint(G.__cast(this._elementManager._getElements()[d], l.elements.enemies.EnemyBase)._getPos().x, G.__cast(this._elementManager._getElements()[d], l.elements.enemies.EnemyBase)._getPos().y + G.__cast(this._elementManager._getElements()[d], l.elements.enemies.EnemyBase)._getParticleOffset());
                        f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_HIT_EFFECT, {
                            pos: h,
                            angle: b
                        }));
                        for (var i = 3; 0 < i--;) {
                            var j = {
                                x: h.x,
                                y: h.y,
                                particle: c.ConstantsApp.PARTICLE_CARDBOARD
                            };
                            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_PARTICLE, j))
                        }
                        f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_COMBO, f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_COMBO) + 1);
                        f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_SCORE, f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_SCORE) + G.__cast(this._elementManager._getElements()[d], l.elements.enemies.EnemyBase).get_hitScore() * f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_COMBO));
                        e++;
                        O = G.__cast(this._elementManager._getElements()[d], l.elements.enemies.EnemyBase).get_enemyType()
                    }
                } else if (this._elementManager._getElements()[d]._getType() == c.ConstantsApp.TYPE_EASTER_EGG_BUSH) {
                if (this._elementManager._getElements()[d].testLineBoxCollision(a._getData().line)) {
                    G.__cast(this._elementManager._getElements()[d], l.elements.other.EasterEggBush).doDamage(1);
                    h = new g.WorkinPoint(G.__cast(this._elementManager._getElements()[d], l.elements.other.EasterEggBush)._getPos().x, G.__cast(this._elementManager._getElements()[d],
                        l.elements.other.EasterEggBush)._getPos().y + G.__cast(this._elementManager._getElements()[d], l.elements.other.EasterEggBush)._getParticleOffset());
                    for (i = 3; 0 < i--;) j = {
                        x: h.x,
                        y: h.y,
                        particle: c.ConstantsApp.PARTICLE_CARDBOARD
                    }, f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_PARTICLE, j))
                }
            } else this._elementManager._getElements()[d]._getType() == c.ConstantsApp.TYPE_EASTER_EGG_CRAYON && (h = a._getData().line, (this._elementManager._getElements()[d].testPointBoxCollision(h._getP0()) ||
                this._elementManager._getElements()[d].testPointBoxCollision(h._getP1())) && G.__cast(this._elementManager._getElements()[d], l.elements.other.EasterEggCrayon).doConsume());
            0 < e && (this._patrick.doOh(), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_POP_UP, {
                enemyType: O,
                numOfEnemies: e
            })), f.WorkinCloud.instance._getSound().playSound("sword_shing"))
        },
        _onUnpause: function() {
            this._unpause()
        },
        _onPause: function() {
            this._pause()
        },
        _removeEventListeners: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_PAUSE,
                s(this, this._onPause));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_UNPAUSE, s(this, this._onUnpause));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_CHECK_COLLISIONS, s(this, this._onCheckCollisions));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_ATTACK_SB, s(this, this._onAttackSB));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_SWOOSH_EFFECT, s(this, this._onSpawnSwooshEffect));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_HIT_EFFECT, s(this, this._onSpawnHitEffect));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_PARTICLE, s(this, this._onEventSpawnParticle));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_ENEMY, s(this, this._onEventSpawnEnemy));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_BABY_JELLY, s(this, this._onEventSpawnBabyJelly));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_BOSS_DEAD, s(this, this._onEventBossDead));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPAWN_EASTER_EGG, s(this, this._onEventSpawnEasterEgg))
        },
        _addEventListeners: function() {
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_PAUSE, s(this, this._onPause));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_UNPAUSE, s(this, this._onUnpause));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_CHECK_COLLISIONS, s(this, this._onCheckCollisions));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_ATTACK_SB, s(this, this._onAttackSB));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_SWOOSH_EFFECT, s(this, this._onSpawnSwooshEffect));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_HIT_EFFECT, s(this, this._onSpawnHitEffect));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_PARTICLE, s(this, this._onEventSpawnParticle));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_ENEMY, s(this, this._onEventSpawnEnemy));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_BABY_JELLY, s(this, this._onEventSpawnBabyJelly));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_BOSS_DEAD, s(this, this._onEventBossDead));
            f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPAWN_EASTER_EGG, s(this, this._onEventSpawnEasterEgg))
        },
        render: function() {
            this._elementManager.renderElements()
        },
        _getClosestEnemyDistance: function() {
            for (var a = 9999, b = null, e = this._enemies.length; 0 < e--;)
                if (!this._enemies[e]._getDoDelete()) {
                    var c = g.WorkinMath.distBetweenPoints(this._player._getPos(), this._enemies[e]._getPos());
                    a > c && (a = c, b = this._enemies[e])
                }
            9999 == a ? a = 0 : this._player._getPos().x > b._getPos().x && (a *= -1);
            return a
        },
        _updateCamera: function(a) {
            if (this._player._getIsPlay() || 0 < this._enemies.length) {
                var b = this._getClosestEnemyDistance(),
                    e = Math.abs(b);
                650 < e || 200 > e ? this._elementManager._getCamera()._getPos().x < this._player._getPos().x - c.ConstantsApp.CAMERA_TETHER_X ? (this._elementManager._getCamera()._getPos().x += this._player.speed * a, this._elementManager._getCamera()._getPos().x > this._player._getPos().x - c.ConstantsApp.CAMERA_TETHER_X && (this._elementManager._getCamera()._getPos().x = this._player._getPos().x - c.ConstantsApp.CAMERA_TETHER_X)) :
                    this._elementManager._getCamera()._getPos().x > this._player._getPos().x + c.ConstantsApp.CAMERA_TETHER_X && (this._elementManager._getCamera()._getPos().x -= this._player.speed * a, this._elementManager._getCamera()._getPos().x < this._player._getPos().x + c.ConstantsApp.CAMERA_TETHER_X && (this._elementManager._getCamera()._getPos().x = this._player._getPos().x + c.ConstantsApp.CAMERA_TETHER_X)) : this._elementManager._getCamera()._getPos().x < this._player._getPos().x + b / 2 ? (this._elementManager._getCamera()._getPos().x +=
                        this._player.speed / 2 * a, this._elementManager._getCamera()._getPos().x > this._player._getPos().x + b / 2 && (this._elementManager._getCamera()._getPos().x = this._player._getPos().x + b / 2)) : this._elementManager._getCamera()._getPos().x > this._player._getPos().x + b / 2 && (this._elementManager._getCamera()._getPos().x -= this._player.speed / 2 * a, this._elementManager._getCamera()._getPos().x < this._player._getPos().x + b / 2 && (this._elementManager._getCamera()._getPos().x = this._player._getPos().x + b / 2))
            } else !1 == this._player._getIsPlay() &&
                10 == f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_LEVEL) && (this._elementManager._getCamera()._getPos().x < this._player._getPos().x ? (this._elementManager._getCamera()._getPos().x += this._player.speed * a, this._elementManager._getCamera()._getPos().x > this._player._getPos().x && (this._elementManager._getCamera()._getPos().x = this._player._getPos().x)) : this._elementManager._getCamera()._getPos().x > this._player._getPos().x && (this._elementManager._getCamera()._getPos().x -= this._player.speed * a, this._elementManager._getCamera()._getPos().x <
                    this._player._getPos().x && (this._elementManager._getCamera()._getPos().x = this._player._getPos().x)));
            320 > this._elementManager._getCamera()._getPos().x ? this._elementManager._getCamera()._getPos().x = 320 : this._elementManager._getCamera()._getPos().x > c.ConstantsApp.STAGE_WIDTH - 35 && (this._elementManager._getCamera()._getPos().x = c.ConstantsApp.STAGE_WIDTH - 35)
        },
        _spawnEnemy: function(a, b, e, d) {
            var f = b == c.ConstantsApp.LAYER_ENEMY_FRONT ? 600 : 400,
                g = 0,
                h = -1;
            this._player._getPos().x + f > 1.3 * c.ConstantsApp.STAGE_WIDTH ?
                (g = this._player._getPos().x - f, h = 1) : (g = this._player._getPos().x + f, h = -1);
            null != d && (g = d.x);
            this._enemies.push(this._elementManager.addElement(N.createInstance(a, [{
                x: g,
                y: c.ConstantsApp.GROUND_LEVEL,
                directionFace: h,
                target: this._player,
                layer: b,
                active: e
            }])));
            this._patrick.doPoint()
        },
        _onEventSpawnBabyJelly: function(a) {
            this._spawnEnemy(l.elements.enemies.EnemyJelly, 2 == f.WorkinUtils.getRandom(1, 2, !0) ? c.ConstantsApp.LAYER_ENEMY_FRONT : c.ConstantsApp.LAYER_ENEMY_BACK, !0, a._getData().pos)
        },
        _onEventSpawnEnemy: function() {
            this._doSpawn = !0
        },
        _updateSpawner: function(a) {
            this._doSpawn && 0 < this._spawnDelay && (this._spawnDelay -= a, 0 >= this._spawnDelay && this._currentSpawnedEnemies < this._totalEnemiesNum && (c.ConstantsApp.enemyList[this._currentSpawnedEnemies].wait ? this._currentDeadEnemies == this._currentSpawnedEnemies && (this._spawnEnemy(c.ConstantsApp.enemyList[this._currentSpawnedEnemies].classType, c.ConstantsApp.enemyList[this._currentSpawnedEnemies].layer, c.ConstantsApp.enemyList[this._currentSpawnedEnemies].active), this._currentSpawnedEnemies++) :
                (this._spawnEnemy(c.ConstantsApp.enemyList[this._currentSpawnedEnemies].classType, c.ConstantsApp.enemyList[this._currentSpawnedEnemies].layer, c.ConstantsApp.enemyList[this._currentSpawnedEnemies].active), this._currentSpawnedEnemies++), this._spawnDelay = this._SPAWN_DELAY))
        },
        _onEventBossDead: function() {
            this._player.doWin(!0);
            this._patrick.doLose()
        },
        _updateEnemies: function() {
            for (var a = this._enemies.length; 0 < a--;) this._enemies[a]._getDoDelete() && (this._enemies.splice(a, 1), this._currentDeadEnemies++);
            this._currentDeadEnemies ==
                this._totalEnemiesNum && !1 == this._isBossLevel && (this._player.doWin(), this._patrick.doLose())
        },
        update: function(a) {
            if (!(!0 == f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED) && this._state != this._STATE_INITIALIZING)) switch (a = Math.round(1E3 * a) / 1E3, this._state) {
                case this._STATE_INITIALIZING:
                    null != this._poolManager && this._poolManager.update(a);
                    break;
                case this._STATE_GAMEPLAY:
                    this._updateSpawner(a);
                    this._updateEnemies(a);
                    this._elementManager.updateElements(a);
                    for (var b = f.WorkinCloud.instance._getInput()._getMultiTouch().iterator(); b.hasNext();) {
                        var e =
                            b.next();
                        if (!1 == e._getConsumed()) switch (e._getSwipe()) {
                            case e.SWIPE_UP:
                                e._setConsumed(!0);
                                break;
                            case e.SWIPE_DOWN:
                                e._setConsumed(!0);
                                break;
                            case e.SWIPE_LEFT:
                                e._setConsumed(!0);
                                break;
                            case e.SWIPE_RIGHT:
                                e._setConsumed(!0)
                        }
                    }
                    null != this._easterEggCrayon && this._mouseDown && this._easterEggCrayon.testPointBoxCollision(new g.WorkinPoint(f.WorkinCloud.instance._getInput()._getPointer()._getCurrentPos().x + (this._elementManager._getCamera()._getPos().x - this._elementManager._getCamera()._getScreenCenterX()), f.WorkinCloud.instance._getInput()._getPointer()._getCurrentPos().y +
                        (this._elementManager._getCamera()._getPos().y - this._elementManager._getCamera()._getScreenCenterY()))) && (this._easterEggCrayon.doConsume(), this._easterEggCrayon = null);
                    this._updateCamera(a)
            }
        },
        _setState: function(a) {
            this._state = a;
            switch (a) {
                case this._STATE_INITIALIZING:
                    this._elementManager._getCamera()._getPos().x -= 200, f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_WIN, !1)
            }
        },
        dispose: function() {
            c.ConstantsApp.dispose();
            this._elementManager.dispose();
            this._elementManager = null;
            this._poolManager.dispose();
            this._timeline = this._poolManager = null;
            this._removeEventListeners();
            this._spongs = null;
            m.WMEventDispatcher.prototype.dispose.call(this)
        },
        start: function() {
            this._addEventListeners();
            this._setState(this._STATE_GAMEPLAY)
        },
        __class__: l.World
    });
    l.elements = {};
    l.elements.Background = function(a) {
        a.layer = c.ConstantsApp.LAYER_BG;
        a.useCamera = !1;
        i.Element.call(this, a)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.Background"] = l.elements.Background;
    l.elements.Background.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,Background".split(",");
    l.elements.Background.__super__ = i.Element;
    l.elements.Background.prototype = t(i.Element.prototype, {
        __class__: l.elements.Background
    });
    l.elements.BackgroundTile = function(a) {
        i.Element.call(this, a);
        this._display.dispose();
        this._lastCameraPos = new g.WorkinPoint(c.ConstantsApp.STAGE_CENTER_X, 0);
        this._tiles = [];
        this._tileAsset = a.assets;
        this._tileWidth = 0;
        this._scrollRatioX = a.scrollratiox;
        this._scrollRatioY = a.scrollratioy;
        this._totalTiles = a.totalTiles ? a.totalTiles : 4;
        this._totalAssetParts = a.totalAssetParts ? a.totalAssetParts :
            2;
        this._currentAssetPart = 1;
        this._offsetX = a.offsetX ? a.offsetX : 0;
        this._offsetY = a.offsetY ? a.offsetY : 0;
        this._tEntList = [];
        this._spawnTiles()
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.BackgroundTile"] = l.elements.BackgroundTile;
    l.elements.BackgroundTile.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,BackgroundTile".split(",");
    l.elements.BackgroundTile.__super__ = i.Element;
    l.elements.BackgroundTile.prototype = t(i.Element.prototype, {
        dispose: function() {
            for (var a =
                    0, b = this._tiles; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
            this._tiles = null;
            i.Element.prototype.dispose.call(this)
        },
        _resortTiles: function() {
            for (var a = this._tEntList.length; 0 < a;) a--, this._entity.addChild(this._tEntList[a])
        },
        renderPosition: function(a) {
            for (var b = this._tiles.length; 0 < b;) b--, this._tiles[b].renderPosition(a)
        },
        update: function() {},
        _spawnTile: function(a) {
            var b = new M;
            this._entity.addChild(b);
            this._tEntList.push(b);
            a = new l.elements.BackgroundTilePiece(this._tileAsset + this._currentAssetPart, new g.WorkinPoint(a +
                this._offsetX, this._offsetY), new g.WorkinPoint(this._scrollRatioX, this._scrollRatioY));
            this._currentAssetPart++;
            this._currentAssetPart > this._totalAssetParts && (this._currentAssetPart = 1);
            b.add(a);
            this._tiles.push(a);
            this._tileWidth = a.getNaturalWidth();
            return this._tileWidth - 1
        },
        _spawnTiles: function() {
            this._totalWidth = 0;
            for (var a = this._totalTiles; 0 < a--;) this._totalWidth += this._spawnTile(this._totalWidth);
            for (a = this._tiles.length; 0 < a;) a--, this._tiles[a].setTotalWidth(this._totalWidth);
            this._resortTiles()
        },
        __class__: l.elements.BackgroundTile
    });
    y = void 0;
    M = void 0;
    o = void 0;
    h = void 0;
    d = void 0;
    I = void 0;
    n = void 0;
    P = void 0;
    E = void 0;
    w = void 0;
    z = void 0;
    H = void 0;
    K = void 0;
    x = void 0;
    x = void 0;
    aa = void 0;
    x = void 0;
    x = void 0;
    n = {
        Disposable: function() {}
    };
    k["flambe.util.Disposable"] = n.Disposable;
    n.Disposable.__name__ = ["flambe", "util", "Disposable"];
    n.Disposable.prototype = {
        __class__: n.Disposable
    };
    P = function() {};
    k["flambe.Component"] = P;
    P.__name__ = ["flambe", "Component"];
    P.__interfaces__ = [n.Disposable];
    P.prototype = {
        _internal_init: function(a,
            b) {
            this.owner = a;
            this.next = b
        },
        get_name: function() {
            return null
        },
        dispose: function() {
            null != this.owner && this.owner.remove(this)
        },
        onUpdate: function() {},
        onRemoved: function() {},
        onAdded: function() {},
        __class__: P,
        __properties__: {
            get_name: "get_name"
        }
    };
    I = {
        Point: function(a, b) {
            null == b && (b = 0);
            null == a && (a = 0);
            this.x = a;
            this.y = b
        }
    };
    k["flambe.math.Point"] = I.Point;
    I.Point.__name__ = ["flambe", "math", "Point"];
    I.Point.prototype = {
        __class__: I.Point
    };
    o = {
        Sprite: function() {
            this.blendMode = this.scissor = null;
            var a = this;
            this._flags =
                11;
            this._localMatrix = new I.Matrix;
            var b = function() {
                a._flags |= 12
            };
            this.x = new E.AnimatedFloat(0, b);
            this.y = new E.AnimatedFloat(0, b);
            this.rotation = new E.AnimatedFloat(0, b);
            this.scaleX = new E.AnimatedFloat(1, b);
            this.scaleY = new E.AnimatedFloat(1, b);
            this.anchorX = new E.AnimatedFloat(0, b);
            this.anchorY = new E.AnimatedFloat(0, b);
            this.alpha = new E.AnimatedFloat(1)
        }
    };
    k["flambe.display.Sprite"] = o.Sprite;
    o.Sprite.__name__ = ["flambe", "display", "Sprite"];
    o.Sprite.hitTest = function(a, b, e) {
        var c = a._compMap.Sprite_1;
        if (null !=
            c) {
            if (3 != (c._flags & 3)) return null;
            c.getLocalMatrix().inverseTransform(b, e, o.Sprite._scratchPoint) && (b = o.Sprite._scratchPoint.x, e = o.Sprite._scratchPoint.y);
            var d = c.scissor;
            if (null != d && !d.contains(b, e)) return null
        }
        a = o.Sprite.hitTestBackwards(a.firstChild, b, e);
        return null != a ? a : null != c && c.containsLocal(b, e) ? c : null
    };
    o.Sprite.render = function(a, b) {
        var e = a._compMap.Sprite_1;
        if (null != e) {
            var c = e.alpha._value;
            if (0 == (e._flags & 1) || 0 >= c) return;
            b.save();
            1 > c && b.multiplyAlpha(c);
            null != e.blendMode && b.setBlendMode(e.blendMode);
            c = e.getLocalMatrix();
            b.transform(c.m00, c.m10, c.m01, c.m11, c.m02, c.m12);
            c = e.scissor;
            null != c && b.applyScissor(c.x, c.y, c.width, c.height);
            e.draw(b)
        }
        c = a._compMap.Director_0;
        if (null != c)
            for (var c = c.occludedScenes, d = 0; d < c.length;) {
                var f = c[d];
                ++d;
                o.Sprite.render(f, b)
            }
        for (c = a.firstChild; null != c;) d = c.next, o.Sprite.render(c, b), c = d;
        null != e && b.restore()
    };
    o.Sprite.hitTestBackwards = function(a, b, e) {
        if (null != a) {
            var c = o.Sprite.hitTestBackwards(a.next, b, e);
            return null != c ? c : o.Sprite.hitTest(a, b, e)
        }
        return null
    };
    o.Sprite.__super__ =
        P;
    o.Sprite.prototype = t(P.prototype, {
        set_pointerEnabled: function(a) {
            this._flags = n.BitSets.set(this._flags, 2, a);
            return a
        },
        set_visible: function(a) {
            this._flags = n.BitSets.set(this._flags, 1, a);
            return a
        },
        get_pointerUp: function() {
            null == this._internal_pointerUp && (this._internal_pointerUp = new n.Signal1);
            return this._internal_pointerUp
        },
        get_pointerMove: function() {
            null == this._internal_pointerMove && (this._internal_pointerMove = new n.Signal1);
            return this._internal_pointerMove
        },
        get_pointerDown: function() {
            null == this._internal_pointerDown &&
                (this._internal_pointerDown = new n.Signal1);
            return this._internal_pointerDown
        },
        draw: function() {},
        onUpdate: function(a) {
            this.x.update(a);
            this.y.update(a);
            this.rotation.update(a);
            this.scaleX.update(a);
            this.scaleY.update(a);
            this.alpha.update(a);
            this.anchorX.update(a);
            this.anchorY.update(a)
        },
        getLocalMatrix: function() {
            0 != (this._flags & 4) && (this._flags &= -5, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value, 3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
            return this._localMatrix
        },
        containsLocal: function(a, b) {
            return 0 <= a && a < this.getNaturalWidth() && 0 <= b && b < this.getNaturalHeight()
        },
        getNaturalHeight: function() {
            return 0
        },
        getNaturalWidth: function() {
            return 0
        },
        get_name: function() {
            return "Sprite_1"
        },
        __class__: o.Sprite,
        __properties__: t(P.prototype.__properties__, {
            set_visible: "set_visible",
            get_visible: "get_visible",
            get_pointerDown: "get_pointerDown",
            get_pointerUp: "get_pointerUp",
            set_pointerEnabled: "set_pointerEnabled",
            get_pointerEnabled: "get_pointerEnabled"
        })
    });
    o.ImageSprite = function(a) {
        o.Sprite.call(this);
        this.texture = a
    };
    k["flambe.display.ImageSprite"] = o.ImageSprite;
    o.ImageSprite.__name__ = ["flambe", "display", "ImageSprite"];
    o.ImageSprite.__super__ = o.Sprite;
    o.ImageSprite.prototype = t(o.Sprite.prototype, {
        getNaturalHeight: function() {
            return this.texture.get_height()
        },
        getNaturalWidth: function() {
            return this.texture.get_width()
        },
        draw: function(a) {
            a.drawImage(this.texture, 0, 0)
        },
        __class__: o.ImageSprite
    });
    l.elements.BackgroundTilePiece = function(a, b, e) {
        o.ImageSprite.call(this,
            f.WorkinCloud.instance._getAssets().getTexture(a));
        this._pos = b;
        this._scrollRatio = e;
        this._assetWidth = this.getNaturalWidth();
        this._parallaxOffset = -c.ConstantsApp.STAGE_CENTER_X * (1 - this._scrollRatio.x)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.BackgroundTilePiece"] = l.elements.BackgroundTilePiece;
    l.elements.BackgroundTilePiece.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,BackgroundTilePiece".split(",");
    l.elements.BackgroundTilePiece.__super__ = o.ImageSprite;
    l.elements.BackgroundTilePiece.prototype = t(o.ImageSprite.prototype, {
        renderPosition: function(a) {
            var b = Math.round(a._getPos().x * this._scrollRatio.x),
                e = Math.round(b % this._totalWidth);
            e > this._totalWidth - c.ConstantsApp.STAGE_CENTER_X ? this._pos.x < e + c.ConstantsApp.STAGE_CENTER_X - this._totalWidth && (e = Math.round(b % this._totalWidth) - this._totalWidth) : e < c.ConstantsApp.STAGE_CENTER_X && this._pos.x + this._assetWidth > this._totalWidth + (e - c.ConstantsApp.STAGE_CENTER_X) && (e = this._totalWidth + Math.round(b % this._totalWidth));
            this.x.set__(this._pos.x - e + c.ConstantsApp.STAGE_CENTER_X);
            this.y.set__(0 == this._scrollRatio.y ? 0 : this._pos.y - a._getPos().y + c.ConstantsApp.STAGE_CENTER_Y * this._scrollRatio.y)
        },
        setTotalWidth: function(a) {
            this._totalWidth = a
        },
        __class__: l.elements.BackgroundTilePiece
    });
    i.AnimatedElement = function(a) {
        if (null != a.movie && "" != a.movie && (null == a.library || "" == a.library) && (null == a.asset || "" == a.asset)) a.asset = a.movie;
        this._animations = new F;
        this._queuedAnimations = [];
        this._lastFrame = -1;
        this._currentFrame = 0;
        this._currentAnimation =
            "";
        this._fps = 24;
        this._animationStopped = !0;
        this._library = "";
        this._loopComplete = !1;
        this._symbol = "";
        this._workFrame = 0;
        this._currentAnimDef = null;
        i.Element.call(this, a)
    };
    k["com.workinman.display.AnimatedElement"] = i.AnimatedElement;
    i.AnimatedElement.__name__ = ["com", "workinman", "display", "AnimatedElement"];
    i.AnimatedElement.__super__ = i.Element;
    i.AnimatedElement.prototype = t(i.Element.prototype, {
        _onAnimationComplete: function() {},
        _setFrame: function(a) {
            this._movie.set_position(Math.floor(a) / this._frames * this._duration)
        },
        _runAnimation: function(a) {
            "" != this._currentAnimation && !0 == this._doLoop() && !1 == this._animationStopped && (this._currentFrame = !1 == this._currentAnimDef._getReverse() ? this._currentFrame + this._fps * a : this._currentFrame - this._fps * a, !1 == this._currentAnimDef._getReverse() ? Math.floor(this._currentFrame) > this._currentAnimDef._getEnd() && (this._currentFrame = this._currentAnimDef._getStart() + (this._currentFrame - Math.floor(this._currentFrame)), this._loopComplete = !0) : Math.ceil(this._currentFrame) < this._currentAnimDef._getStart() &&
                (this._currentFrame = this._currentAnimDef._getEnd() + (this._currentFrame - Math.ceil(this._currentFrame)), this._loopComplete = !0), !0 == this._loopComplete && (this._loopComplete = !1, this._currentLoop--, !1 == this._doLoop() && (this._animationStopped = !0, this._currentFrame = !1 == this._currentAnimDef._getReverse() ? this._currentAnimDef._getEnd() : this._currentAnimDef._getStart(), 0 < this._queuedAnimations.length ? (this._doAnimate(this._queuedAnimations[0]._getName(), this._queuedAnimations[0]._getLoops(), this._queuedAnimations[0]._getForce()),
                    this._queuedAnimations.splice(0, 1)) : this._onAnimationComplete(this._currentAnimDef._getId()))), this._workFrame = !1 == this._currentAnimDef._getReverse() ? Math.floor(this._currentFrame) : Math.ceil(this._currentFrame), null != this._movie && this._workFrame != this._lastFrame && (this._setFrame(this._workFrame), this._lastFrame = this._workFrame))
        },
        _doLoop: function() {
            return 0 < this._currentLoop || this._flagLoop
        },
        update: function(a) {
            i.Element.prototype.update.call(this, a);
            this._runAnimation(a)
        },
        clearQueue: function() {
            for (; 0 <
                this._queuedAnimations.length;) this._queuedAnimations.splice(0, 1)
        },
        stopAnimation: function() {
            this._animationStopped = !0
        },
        setLoop: function(a) {
            this._currentLoop = a;
            this._flagLoop = 0 == a;
            return this
        },
        _doAnimate: function(a, b, e) {
            null == e && (e = !1);
            null == b && (b = 0);
            this._currentAnimation == a && !1 == e || (null != this._animations && this._animations.exists(a) ? (this._currentAnimDef = null, this._currentAnimDef = this._animations.get(a), this._currentFrame = this._currentAnimDef._getStart(), this._currentAnimation = a, this.setLoop(b),
                this._animationStopped = !1, this._setFrame(this._currentFrame)) : f.WorkinCloud.instance.log("Animation not found: " + a))
        },
        animate: function(a, b, e) {
            null == e && (e = !1);
            null == b && (b = 0);
            this.clearQueue();
            this._doAnimate(a, b, e);
            return this
        },
        addAnimation: function(a, b, e) {
            this._animations.set(a, new i.AnimationDef(a, b - 1, e - 1));
            return this
        },
        setLibraryAndSymbol: function(a, b) {
            this._library = a;
            this._symbol = b;
            this._texture.dispose();
            var e = f.WorkinCloud.instance._getAssets().getLibrary(this._library)._symbols.get(this._symbol);
            this._duration = e.duration;
            this._frames = e.frames;
            this._movie = e.createSprite();
            this._movie.set_paused(!0);
            this._texture = this._movie;
            this._textureEntity.add(this._texture);
            return this
        },
        _setAnimationFrameRelative: function(a) {
            this._currentFrame = this._currentAnimDef._getStart() + a;
            return this._getAnimationFrameRelative()
        },
        _getAnimationFrameRelative: function() {
            return this._currentFrame - this._currentAnimDef._getStart() | 0
        },
        _setAnimationFrame: function(a) {
            this._currentFrame = a;
            this._setFrame(this._currentFrame);
            this.stopAnimation();
            return this._currentFrame | 0
        },
        _getAnimationFrame: function() {
            return this._currentFrame | 0
        },
        _setAnimationRatio: function(a) {
            a = Math.floor(a * (this._currentAnimDef._getEnd() - this._currentAnimDef._getStart()) + this._currentAnimDef._getStart());
            a != this._currentFrame && this._setAnimationFrame(a);
            return this._getAnimationRatio()
        },
        _getAnimationRatio: function() {
            return (this._currentFrame - this._currentAnimDef._getStart()) / (this._currentAnimDef._getEnd() - this._currentAnimDef._getEnd())
        },
        _setFps: function(a) {
            return this._fps =
                a
        },
        _getFps: function() {
            return this._fps
        },
        _getCurrentAnimation: function() {
            return this._currentAnimation
        },
        renew: function(a) {
            if (null != a.movie && "" != a.movie && (null == a.library || "" == a.library) && (null == a.asset || "" == a.asset)) a.asset = a.movie;
            i.Element.prototype.renew.call(this, a);
            a.library && a.movie && this.setLibraryAndSymbol(a.library, a.movie);
            a.fps && (this._fps = a.fps)
        },
        dispose: function() {
            this._queuedAnimations = this._currentAnimDef = this._animations = this._movie = null;
            i.Element.prototype.dispose.call(this)
        },
        __class__: i.AnimatedElement,
        __properties__: t(i.Element.prototype.__properties__, {
            set_fps: "_setFps",
            get_fps: "_getFps",
            set_animationFrame: "_setAnimationFrame",
            get_animationFrame: "_getAnimationFrame"
        })
    });
    l.elements.EffectHit = function(a) {
        this._STATE_IDLE = 0;
        a.library = "gameplay_asset";
        a.movie = "_hitSlash";
        a.layer = c.ConstantsApp.LAYER_FG;
        i.AnimatedElement.call(this, a);
        this._addAnimation();
        a.angle && (this._getRenderable().rotation = a.angle);
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.EffectHit"] =
        l.elements.EffectHit;
    l.elements.EffectHit.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,EffectHit".split(",");
    l.elements.EffectHit.__super__ = i.AnimatedElement;
    l.elements.EffectHit.prototype = t(i.AnimatedElement.prototype, {
        dispose: function() {
            i.AnimatedElement.prototype.dispose.call(this)
        },
        update: function(a) {
            i.AnimatedElement.prototype.update.call(this, a)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_IDLE:
                    this._setDoDelete(!0)
            }
        },
        _setState: function(a) {
            this._state =
                a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this.animate("idle", 1)
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 7)
        },
        __class__: l.elements.EffectHit
    });
    l.elements.EffectSwoosh = function() {
        this._STATE_IDLE = 0
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.EffectSwoosh"] = l.elements.EffectSwoosh;
    l.elements.EffectSwoosh.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,EffectSwoosh".split(",");
    l.elements.EffectSwoosh.__super__ = i.AnimatedElement;
    l.elements.EffectSwoosh.prototype =
        t(i.AnimatedElement.prototype, {
            dispose: function() {
                i.AnimatedElement.prototype.dispose.call(this)
            },
            update: function(a) {
                this.updatePositionFromVelocity(a);
                i.AnimatedElement.prototype.update.call(this, a)
            },
            _onAnimationComplete: function() {
                switch (this._state) {
                    case this._STATE_IDLE:
                        this._setDoDelete(!0)
                }
            },
            __class__: l.elements.EffectSwoosh
        });
    l.elements.Mark = function() {};
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.Mark"] = l.elements.Mark;
    l.elements.Mark.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,Mark".split(",");
    l.elements.Mark.__super__ = i.Element;
    l.elements.Mark.prototype = t(i.Element.prototype, {
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_MARK_ENDED, s(this, this._onMarkEnded));
            i.Element.prototype.dispose.call(this)
        },
        _onMarkEnded: function() {
            this._getRenderable().alpha = 0
        },
        update: function(a) {
            i.Element.prototype.update.call(this, a)
        },
        renew: function(a) {
            a.asset = "mark";
            a.layer = c.ConstantsApp.LAYER_FG;
            a.origin = new g.WorkinPoint(0.5, 0.5);
            i.Element.prototype.renew.call(this,
                a);
            this._getRenderable().alpha = 1
        },
        __class__: l.elements.Mark
    });
    l.elements.Particle = function(a) {
        a.type = c.ConstantsApp.TYPE_PARTICLE;
        this._active = !1;
        i.AnimatedElement.call(this, a)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.Particle"] = l.elements.Particle;
    l.elements.Particle.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,Particle".split(",");
    l.elements.Particle.__super__ = i.AnimatedElement;
    l.elements.Particle.prototype = t(i.AnimatedElement.prototype, {
        dispose: function() {
            i.AnimatedElement.prototype.dispose.call(this)
        },
        updatePositionFromVelocity: function(a) {
            0 != this._gravity && (this._velocity.y += this._gravity * a);
            i.AnimatedElement.prototype.updatePositionFromVelocity.call(this, a)
        },
        _deactivate: function() {
            this._active = !1;
            this.release()
        },
        _doLifespanDecrement: function(a) {
            0 < this._lifespan && (this._lifespan -= a, 0 >= this._lifespan && this._deactivate())
        },
        update: function(a) {
            this._active && (0 != this._delayTimer ? (this._delayTimer -= a, 0 > this._delayTimer && (this._delayTimer = 0, this._alpha = 1, this._getRenderable().alpha = this._alpha)) : (0 !=
                this._fadeRate && 0 != this._alpha && (this._alpha -= this._fadeRate * a, 0 >= this._alpha && (this._alpha = 0, this._deactivate()), this._getRenderable().alpha = this._alpha), 0 != this._scaleRate && (this._scaleX += this._scaleRate * a, this._scaleY += this._scaleRate * a, this._getRenderable().scaleX = this._scaleX, this._getRenderable().scaleY = this._scaleY), 0 != this._rotRate && (this._getRenderable().rotation += this._rotRate * a), this._doLifespanDecrement(a), this.updatePositionFromVelocity(a)), i.AnimatedElement.prototype.update.call(this,
                a))
        },
        renderPosition: function(a) {
            i.AnimatedElement.prototype.renderPosition.call(this, a)
        },
        renew: function(a) {
            this._getPos().to(0, 0);
            this._velocity.to(0, 0, 0);
            this._renderOffset.to(0, 0);
            a.origin || (a.origin = new g.WorkinPoint(0.5, 0.5));
            i.AnimatedElement.prototype.renew.call(this, a);
            a.vx && (this._velocity.x = a.vx);
            a.vy && (this._velocity.y = a.vy);
            this._active = !0;
            this._alpha = 1;
            this._delayTimer = 0;
            a.delayTimer && (this._delayTimer = a.delayTimer, this._alpha = 0);
            this._getRenderable().alpha = this._alpha;
            this._fadeRate =
                0;
            a.fadeRate && (this._fadeRate = a.fadeRate);
            this._scaleX = this._getRenderable().scaleX;
            this._scaleY = this._getRenderable().scaleY;
            a.scale ? this._getRenderable().scaleX = this._getRenderable().scaleY = this._scaleX = this._scaleY = a.scale : (this._scaleX = this._scaleY = 0.75 + 0.5 * Math.random(), this._getRenderable().scaleX = this._scaleX, this._getRenderable().scaleY = this._scaleY);
            a.scaleX && (this._scaleX = a.scaleX, this._getRenderable().scaleX = this._scaleX);
            a.scaleY && (this._scaleY = this._getRenderable().scaleY, this._getRenderable().scaleY =
                this._scaleY);
            this._scaleRate = 0;
            a.scaleRate && (this._scaleRate = a.scaleRate);
            this._getRenderable().rotation = 0;
            a.angle && (this._getRenderable().rotation = a.angle);
            this._rotRate = 0;
            a.rotRate && (this._rotRate = a.rotRate);
            this._gravity = 0;
            a.gravity && (this._gravity = a.gravity);
            this._lifespan = 1;
            0 < this._fadeRate ? this._lifespan = 0 : a.lifespan && (this._lifespan = a.lifespan)
        },
        __class__: l.elements.Particle
    });
    l.elements.Patrick = function(a) {
        this._FACING_LEFT = -1;
        this._FACING_RIGHT = 1;
        this._STATE_OH_POST = 5;
        this._STATE_OH_PRE =
            4;
        this._STATE_OH = 3;
        this._STATE_LAUGH = 2;
        this._STATE_POINT = 1;
        this._STATE_IDLE = 0;
        a.library = "gameplay_asset";
        a.movie = "_pat";
        a.layer = c.ConstantsApp.LAYER_BG;
        i.AnimatedElement.call(this, a);
        a.target && (this._target = a.target);
        this._addAnimation();
        this._directionFace = this._FACING_LEFT;
        this._hasLost = !1;
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.Patrick"] = l.elements.Patrick;
    l.elements.Patrick.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,Patrick".split(",");
    l.elements.Patrick.__super__ = i.AnimatedElement;
    l.elements.Patrick.prototype = t(i.AnimatedElement.prototype, {
        dispose: function() {
            this._target = null;
            i.AnimatedElement.prototype.dispose.call(this)
        },
        _setDirectionFace: function(a) {
            this._directionFace != a && (this._directionFace = a, this._getRenderable().scaleX *= -1)
        },
        doLose: function() {
            !1 == this._hasLost && this._state != this._STATE_OH ? (this._hasLost = !0, this._setState(this._STATE_OH_PRE)) : !1 == this._hasLost && this._state == this._STATE_OH && (this._hasLost = !0)
        },
        doOh: function() {
            this._setState(this._STATE_OH)
        },
        doLaugh: function() {
            this._setState(this._STATE_LAUGH)
        },
        doPoint: function() {
            this._setState(this._STATE_POINT)
        },
        update: function(a) {
            this._getPos().x < this._target._getPos().x ? this._setDirectionFace(this._FACING_RIGHT) : this._setDirectionFace(this._FACING_LEFT);
            i.AnimatedElement.prototype.update.call(this, a)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_IDLE:
                    5 == f.WorkinUtils.getRandom(1, 5, !0) ? this._setState(this._STATE_POINT) : this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_POINT:
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_LAUGH:
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_OH:
                    this._hasLost ? this._setState(this._STATE_OH_PRE) : this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_OH_PRE:
                    this._setState(this._STATE_OH_POST)
            }
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this.animate("idle", 1, !0);
                    break;
                case this._STATE_POINT:
                    this.animate("point", 1, !0);
                    break;
                case this._STATE_LAUGH:
                    this.animate("laugh", 1);
                    break;
                case this._STATE_OH:
                    this.animate("oh", 1);
                    break;
                case this._STATE_OH_PRE:
                    this.animate("ohEndPre", 1);
                    break;
                case this._STATE_OH_POST:
                    this.animate("ohEndPost")
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 40);
            this.addAnimation("point", 41, 57);
            this.addAnimation("laugh", 58, 82);
            this.addAnimation("oh", 83, 101);
            this.addAnimation("ohEndPre", 83, 95);
            this.addAnimation("ohEndPost", 86, 95)
        },
        __class__: l.elements.Patrick
    });
    l.elements.Player = function(a) {
        this._PARTICLE_DELAY = 0.0050;
        this._GRAVITY_VEL = 50;
        this._MOVE_SPEED = 500;
        this._FACING_LEFT = -1;
        this._FACING_RIGHT =
            1;
        this._STATE_TIRED = 9;
        this._STATE_WIN = 8;
        this._STATE_DEAD = 7;
        this._STATE_HIT = 6;
        this._STATE_FALL = 5;
        this._STATE_DASH_ATTACK_POST = 4;
        this._STATE_DASH_ATTACK_PRE = 3;
        this._STATE_ATTACK = 2;
        this._STATE_WALK = 1;
        this._STATE_IDLE = 0;
        this._BEHAVIOR_PLAY = 2;
        this._BEHAVIOR_WAIT = 1;
        this._BEHAVIOR_ENTER = 0;
        a.library = "gameplay_asset";
        a.movie = "_sb";
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        a.type = c.ConstantsApp.TYPE_PLAYER;
        i.AnimatedElement.call(this, a);
        this._addAnimation();
        this._directionFace = this._FACING_RIGHT;
        this._velocity.x =
            200;
        this._inputVelocity = new g.WorkinPoint;
        this._moveRight = this._moveLeft = !1;
        this._state = -1;
        this._currentLine = new g.WorkinLine(new g.WorkinPoint, new g.WorkinPoint);
        this.speed = this._MOVE_SPEED;
        this._hitDirection = this._currentAngle = this._vertical_vel = 0;
        this._ignoreHitTween = !1;
        this._state = this._behavior = -1;
        this._particleDelay = this._PARTICLE_DELAY;
        this._easterEggMode = this._forceWinCheck = !1;
        f.WorkinCloud.instance.setFloat(c.ConstantsApp.FLOAT_STAMINA, c.ConstantsApp.PLAYER_MAX_STAMINA);
        this._setCollision(new g.WorkinPoint(150,
            150), new g.WorkinPoint(-75, -150));
        this._setDirectionFace(this._FACING_RIGHT);
        this._setBehavior(this._BEHAVIOR_ENTER);
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_BATTLE_COMMENCE, s(this, this._onBattleCommence));
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG, s(this, this._onActivateEasterEgg))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.Player"] = l.elements.Player;
    l.elements.Player.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,Player".split(",");
    l.elements.Player.__super__ = i.AnimatedElement;
    l.elements.Player.prototype = t(i.AnimatedElement.prototype, {
        get_isGrounded: function() {
            return this._getPos().y == this._getInitPos().y
        },
        _getDirectionFace: function() {
            return this._directionFace
        },
        _getIsPlay: function() {
            return this._behavior == this._BEHAVIOR_PLAY
        },
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_BATTLE_COMMENCE, s(this, this._onBattleCommence));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG,
                s(this, this._onActivateEasterEgg));
            i.AnimatedElement.prototype.dispose.call(this)
        },
        _onActivateEasterEgg: function() {
            this._easterEggMode = !0
        },
        _onBattleCommence: function() {
            this._setBehavior(this._BEHAVIOR_PLAY)
        },
        doWin: function(a) {
            null == a && (a = !1);
            this.get_isGrounded() ? this._setState(this._STATE_WIN) : this._forceWinCheck = a
        },
        _doDead: function() {
            this._setState(this._STATE_DEAD)
        },
        doDamage: function(a, b) {
            this._state != this._STATE_DEAD && (f.WorkinCloud.instance._getSound().playSound("hit", 0.6), f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH,
                f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) - (this._easterEggMode ? 2 : a)), this._hitDirection = b, this._setState(this._STATE_HIT), 0 >= f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) && this._doDead())
        },
        doMove: function(a, b, e) {
            if (!(this._behavior == this._BEHAVIOR_ENTER || this._behavior == this._BEHAVIOR_WAIT) && !(this._state == this._STATE_ATTACK || this._state == this._STATE_DASH_ATTACK_POST || this._state == this._STATE_HIT || this._state == this._STATE_DEAD || this._state == this._STATE_WIN || this._state ==
                    this._STATE_TIRED)) this._currentLine.originTo(b._getP0().x + (e._getPos().x - e._getScreenCenterX()), b._getP0().y + (e._getPos().y - e._getScreenCenterY())), this._currentLine.endTo(b._getP1().x + (e._getPos().x - e._getScreenCenterX()), b._getP1().y + (e._getPos().y - e._getScreenCenterY())), this._currentAngle = g.WorkinMath.getAngleFromTwoPoints(this._currentLine._getP0(), this._currentLine._getP1()), 600 < this._currentLine._getLength() && this._currentLine._setLength(600), 100 > this._currentLine._getLength() || f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) <
                c.ConstantsApp.PLAYER_MAX_STAMINA / c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS ? this.get_isGrounded() && this._setState(this._STATE_DASH_ATTACK_PRE) : this._setState(this._STATE_ATTACK)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_DASH_ATTACK_POST:
                    f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) < c.ConstantsApp.PLAYER_MAX_STAMINA / c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS ? this._setState(this._STATE_TIRED) : this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_HIT:
                    this._ignoreHitTween &&
                        this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_DEAD:
                    f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_LOSE, !0);
                    break;
                case this._STATE_WIN:
                    f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_WIN, !0), f.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_WIN, !0)
            }
        },
        _onTweensComplete: function() {
            switch (this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this._setBehavior(this._BEHAVIOR_WAIT)
            }
            switch (this._state) {
                case this._STATE_DASH_ATTACK_PRE:
                    var a = g.WorkinMath.distBetweenPoints(this._currentLine._getP0(),
                        this._currentLine._getP1());
                    0 == this._currentAngle || 100 > a || f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) < c.ConstantsApp.PLAYER_MAX_STAMINA / c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS ? this._setState(this._STATE_IDLE) : this._setState(this._STATE_ATTACK);
                    break;
                case this._STATE_ATTACK:
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_CHECK_COLLISIONS, {
                        line: this._currentLine
                    })), !1 == this._easterEggMode && f.WorkinCloud.instance.setFloat(c.ConstantsApp.FLOAT_STAMINA,
                        f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) - c.ConstantsApp.PLAYER_MAX_STAMINA / c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS), this.get_isGrounded() ? this._setState(this._STATE_DASH_ATTACK_POST) : this._setState(this._STATE_FALL)
            }
        },
        _updateInputVelocity: function() {
            this._state != this._STATE_HIT && (this._moveLeft ? (this._inputVelocity.x = -1, this._setDirectionFace(this._FACING_LEFT)) : this._moveRight ? (this._inputVelocity.x = 1, this._setDirectionFace(this._FACING_RIGHT)) : this._inputVelocity.x = 0)
        },
        _doFall: function(a) {
            if (this._state == this._STATE_HIT) 0 >= this._getPos().x ? (this._velocity.x = 0, this._getPos().x = 0) : this._getPos().x >= 1.3 * c.ConstantsApp.STAGE_WIDTH && (this._velocity.x = 0, this._getPos().x = 1.3 * c.ConstantsApp.STAGE_WIDTH), this._velocity.y += this._GRAVITY_VEL * (this._state == this._STATE_DEAD ? 2 : 1), this._getPos().y >= this._getInitPos().y && (this._velocity.y = 0, this._getPos().y = this._getInitPos().y, this._state != this._STATE_DEAD && (f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) < c.ConstantsApp.PLAYER_MAX_STAMINA /
                c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS ? this._setState(this._STATE_TIRED) : this._setState(this._STATE_IDLE)));
            else if (this._getPos().y < this._getInitPos().y) {
                var b = this._vertical_vel;
                this._vertical_vel += this._GRAVITY_VEL / 2 * (this._state == this._STATE_DEAD ? 2 : 1);
                this._getPos().y += b * a;
                this._getPos().y >= this._getInitPos().y && (this._vertical_vel = 0, this._getPos().y = this._getInitPos().y, this._state != this._STATE_DEAD && (f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) < c.ConstantsApp.PLAYER_MAX_STAMINA /
                    c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS ? this._setState(this._STATE_TIRED) : this._setState(this._STATE_IDLE)))
            }
        },
        _updateStamina: function(a) {
            f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) < c.ConstantsApp.PLAYER_MAX_STAMINA && (f.WorkinCloud.instance.setFloat(c.ConstantsApp.FLOAT_STAMINA, f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) + c.ConstantsApp.PLAYER_ATTACK_CHARGER_SPEED * (this._easterEggMode ? 10 : this._state == this._STATE_TIRED ? 1.3 : 0.7) * a), f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) >=
                c.ConstantsApp.PLAYER_MAX_STAMINA && f.WorkinCloud.instance.setFloat(c.ConstantsApp.FLOAT_STAMINA, c.ConstantsApp.PLAYER_MAX_STAMINA))
        },
        updatePositionFromVelocity: function(a) {
            this._pos.x += this._velocity.x * this._inputVelocity.x * a;
            this._pos.y += this._velocity.y * this._inputVelocity.y * a
        },
        update: function(a) {
            this._forceWinCheck && this.get_isGrounded() && this._setState(this._STATE_WIN);
            this._updateInputVelocity();
            this.updatePositionFromVelocity(a);
            switch (this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this.updatePosFromTweener(a)
            }
            switch (this._state) {
                case this._STATE_DASH_ATTACK_PRE:
                    this.updatePosFromTweener(a);
                    break;
                case this._STATE_ATTACK:
                    this.updatePosFromTweener(a);
                    break;
                case this._STATE_TIRED:
                    f.WorkinCloud.instance.getFloat(c.ConstantsApp.FLOAT_STAMINA) >= 3 * (c.ConstantsApp.PLAYER_MAX_STAMINA / 4) && this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_HIT:
                    i.AnimatedElement.prototype.updatePositionFromVelocity.call(this, a)
            }
            this._updateStamina(a);
            this._doFall(a);
            i.AnimatedElement.prototype.update.call(this, a)
        },
        _setDirectionFace: function(a) {
            this._directionFace != a && (this._directionFace = a, this._getRenderable().scaleX *=
                -1)
        },
        updatePosFromTweener: function(a) {
            i.AnimatedElement.prototype.updatePosFromTweener.call(this, a)
        },
        _setState: function(a) {
            if (!(this._state == a && this._state != this._STATE_DASH_ATTACK_PRE)) switch (this._state = a, this._state) {
                case this._STATE_IDLE:
                    this.speed = this._MOVE_SPEED;
                    this.animate("idle");
                    break;
                case this._STATE_WALK:
                    this.animate("walk");
                    break;
                case this._STATE_DASH_ATTACK_PRE:
                    this.speed = this._MOVE_SPEED;
                    this._getPos().x > this._currentLine._getP0().x ? this._setDirectionFace(this._FACING_LEFT) : this._getPos().x <
                        this._currentLine._getP0().x && this._setDirectionFace(this._FACING_RIGHT);
                    a = 0 >= this._currentLine._getP0().x ? 0 : this._currentLine._getP0().x >= 1.3 * c.ConstantsApp.STAGE_WIDTH ? 1.3 * c.ConstantsApp.STAGE_WIDTH : this._currentLine._getP0().x;
                    this.animate("walk");
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(new g.WorkinPoint(a, this._getPos().y), g.WorkinMath.distBetweenPoints(this._getPos(), new g.WorkinPoint(a, this._getPos().y)) / this.speed, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._STATE_ATTACK:
                    f.WorkinCloud.instance._getSound().playSound("sword_swing", 2);
                    this.speed = 5 * this._MOVE_SPEED;
                    this._currentLine._getP0().x > this._currentLine._getP1().x ? this._setDirectionFace(this._FACING_LEFT) : this._currentLine._getP0().x < this._currentLine._getP1().x && this._setDirectionFace(this._FACING_RIGHT);
                    a = 0 >= this._currentLine._getP1().x ? 0 : this._currentLine._getP1().x >= 1.3 * c.ConstantsApp.STAGE_WIDTH ? 1.3 * c.ConstantsApp.STAGE_WIDTH : this._currentLine._getP1().x;
                    this._getPos().x = this._currentLine._getP0().x;
                    this._getPos().y = this._currentLine._getP0().y <= this._getInitPos().y ? this._currentLine._getP0().y : this._getInitPos().y;
                    this.animate("attack");
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(new g.WorkinPoint(a, this._currentLine._getP1().y <= this._getInitPos().y ? this._currentLine._getP1().y : this._getInitPos().y), g.WorkinMath.distBetweenPoints(this._getPos(), new g.WorkinPoint(a, this._currentLine._getP1().y <=
                        this._getInitPos().y ? this._currentLine._getP1().y : this._getInitPos().y)) / this.speed, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    for (a = 6; 0 < a--;) {
                        var b = {
                            x: this._getPos().x,
                            y: this._getPos().y,
                            scale: 2,
                            particle: c.ConstantsApp.PARTICLE_POOF
                        };
                        f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_PARTICLE, b))
                    }
                    break;
                case this._STATE_FALL:
                    this.animate("fall");
                    break;
                case this._STATE_DASH_ATTACK_POST:
                    this.animate("postAttack", 1);
                    break;
                case this._STATE_HIT:
                    this.speed =
                        2 * this._MOVE_SPEED;
                    this._velocity.x = 600 * this._hitDirection;
                    this._velocity.y = -600;
                    this.animate("hitAnim");
                    break;
                case this._STATE_DEAD:
                    this.animate("die", 1);
                    break;
                case this._STATE_WIN:
                    this.animate("win", 3);
                    break;
                case this._STATE_TIRED:
                    this.animate("tired")
            }
        },
        _setBehavior: function(a) {
            if (this._behavior != a) switch (this._behavior = a, this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this.animate("walk");
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(new g.WorkinPoint(this._getPos().x - c.ConstantsApp.STAGE_CENTER_X,
                        this._getPos().y));
                    this._tweener.addTween(this._getPos(), g.WorkinMath.distBetweenPoints(new g.WorkinPoint(this._getPos().x - c.ConstantsApp.STAGE_CENTER_X, this._getPos().y), this._getPos()) / this.speed, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._BEHAVIOR_WAIT:
                    this._setState(this._STATE_IDLE), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_ENEMY, {}))
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 40);
            this.addAnimation("preAttack",
                41, 57);
            this.addAnimation("attack", 58, 58);
            this.addAnimation("fall", 59, 59);
            this.addAnimation("postAttack", 60, 70);
            this.addAnimation("walk", 71, 91);
            this.addAnimation("hit", 92, 92);
            this.addAnimation("hitAnim", 92, 107);
            this.addAnimation("die", 108, 140);
            this.addAnimation("win", 142, 165);
            this.addAnimation("tired", 166, 190)
        },
        __class__: l.elements.Player,
        __properties__: t(i.AnimatedElement.prototype.__properties__, {
            get_isPlay: "_getIsPlay",
            get_isGrounded: "get_isGrounded"
        })
    });
    l.elements.TestElement = function() {};
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.TestElement"] =
        l.elements.TestElement;
    l.elements.TestElement.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,TestElement".split(",");
    l.elements.TestElement.__super__ = i.Element;
    l.elements.TestElement.prototype = t(i.Element.prototype, {
        update: function(a) {
            i.Element.prototype.update.call(this, a);
            this.updatePositionFromVelocity(a);
            if (0 < this._velocity.x && this._pos.x > c.ConstantsApp.STAGE_WIDTH - this._render.width / 2 || 0 > this._velocity.x && this._pos.x < this._render.width / 2) this._velocity.x *= -1;
            if (0 < this._velocity.y &&
                this._pos.y > c.ConstantsApp.STAGE_HEIGHT - this._render.height / 2 || 0 > this._velocity.y && this._pos.y < this._render.height / 2) this._velocity.y *= -1;
            this.rect.x = this._pos.x - this._render.width / 2;
            this.rect.y = this._pos.y - this._render.height / 2;
            this._render.rotation += this._rotation * a
        },
        dispose: function() {
            this.rect = null;
            i.Element.prototype.dispose.call(this)
        },
        renew: function(a) {
            i.Element.prototype.renew.call(this, a);
            this.rect = new I.Rectangle(this._render.x, this._render.y, this._render.width, this._render.height)
        },
        __class__: l.elements.TestElement
    });
    l.elements.enemies = {};
    l.elements.enemies.EnemyBase = function(a) {
        this._FACING_LEFT = -1;
        this._FACING_RIGHT = 1;
        this._BEHAVIOR_PERSUIT = 2;
        this._BEHAVIOR_WANDER = 1;
        this._BEHAVIOR_ENTER = 0;
        a.library = "gameplay_asset";
        a.type = c.ConstantsApp.TYPE_ENEMY;
        i.AnimatedElement.call(this, a);
        a.target && (this._target = a.target);
        this._state = this._behavior = -1;
        this._directionFace = this._getDefaultFace();
        this._health = this._getDefaultHealth();
        this._attackHitBox = new I.Rectangle(0, 0, 200, 200);
        this._moveVelocity = new g.WorkinPoint;
        this._addAnimation();
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_BATTLE_COMMENCE, s(this, this._onBattleCommence));
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_EARLY_DEATH, s(this, this._onEarlyDeath));
        this._castParticles();
        this._setDirectionFace(a.directionFace);
        this._doneScaling = !1;
        this._getRenderable().alpha = 0;
        this._initScaleX = this._getRenderable().scaleX = this._directionFace == this._getDefaultFace() ? 0.5 : -0.5;
        this._getRenderable().scaleY = 0.5
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.enemies.EnemyBase"] =
        l.elements.enemies.EnemyBase;
    l.elements.enemies.EnemyBase.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,enemies,EnemyBase".split(",");
    l.elements.enemies.EnemyBase.__super__ = i.AnimatedElement;
    l.elements.enemies.EnemyBase.prototype = t(i.AnimatedElement.prototype, {
        get_damage: function() {
            return 2
        },
        get_enemyType: function() {
            return ""
        },
        get_hitScore: function() {
            return 2
        },
        get_score: function() {
            return 20
        },
        _getDefaultHealth: function() {
            return 2 * c.ConstantsApp.getDifficulty()
        },
        _getDefaultFace: function() {
            return this._FACING_LEFT
        },
        _getParticleScale: function() {
            return 2
        },
        _getParticleOffset: function() {
            return 0
        },
        _getMoveSpeed: function() {
            return 200
        },
        _getoffSet: function() {
            return this._getLayer() == c.ConstantsApp.LAYER_ENEMY_BACK ? -50 : 0
        },
        dispose: function() {
            this._moveVelocity = null;
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_BATTLE_COMMENCE, s(this, this._onBattleCommence));
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_EARLY_DEATH, s(this, this._onEarlyDeath));
            i.AnimatedElement.prototype.dispose.call(this)
        },
        _castParticles: function() {
            for (var a = 6; 0 < a--;) {
                var b = {
                    x: this._getPos().x,
                    y: this._getPos().y + this._getParticleOffset(),
                    scale: this._getParticleScale(),
                    particle: c.ConstantsApp.PARTICLE_POOF
                };
                f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_PARTICLE, b))
            }
        },
        _onEarlyDeath: function() {
            this._doDead()
        },
        _onBattleCommence: function() {
            this._setBehavior(this._BEHAVIOR_WANDER)
        },
        _doDead: function() {
            f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_SCORE, f.WorkinCloud.instance.getInt(c.ConstantsApp.INT_SCORE) +
                this.get_score())
        },
        _doHit: function() {},
        doDamage: function(a) {
            0 >= this._health || (this._health -= a, this._doHit(), 0 >= this._health && this._doDead())
        },
        _getTargetRange: function() {
            return null != this._target ? Math.abs(this._getPos().x - this._target._getPos().x) : 0
        },
        updatePositionFromVelocity: function(a) {
            this._pos.x += this._velocity.x * this._moveVelocity.x * a;
            this._pos.y += this._velocity.y * this._moveVelocity.y * a
        },
        update: function(a) {
            1 > this._getRenderable().alpha && (this._getRenderable().alpha += 2 * a, 1 <= this._getRenderable().alpha &&
                (this._getRenderable().alpha = 1));
            0 > this._initScaleX && !1 == this._doneScaling ? -1 < this._getRenderable().scaleX && (this._getRenderable().scaleX += -2 * a, this._getRenderable().scaleY += 2 * a, -1 >= this._getRenderable().scaleX && (this._getRenderable().scaleX = -1, this._getRenderable().scaleY = 1, this._doneScaling = !0)) : 0 < this._initScaleX && !1 == this._doneScaling && 1 > this._getRenderable().scaleX && (this._getRenderable().scaleX += 2 * a, this._getRenderable().scaleY += 2 * a, 1 <= this._getRenderable().scaleX && (this._getRenderable().scaleX =
                1, this._getRenderable().scaleY = 1, this._doneScaling = !0));
            i.AnimatedElement.prototype.update.call(this, a)
        },
        _setDirectionFace: function(a) {
            this._directionFace == a || !1 == this._doneScaling || (this._directionFace = a, this._getRenderable().scaleX *= -1)
        },
        _setState: function() {},
        _setBehavior: function() {},
        _addAnimation: function() {},
        __class__: l.elements.enemies.EnemyBase,
        __properties__: t(i.AnimatedElement.prototype.__properties__, {
            get_offSet: "_getoffSet",
            get_moveSpeed: "_getMoveSpeed",
            get_particleOffset: "_getParticleOffset",
            get_defaultFace: "_getDefaultFace",
            get_defaultHealth: "_getDefaultHealth",
            get_score: "get_score",
            get_hitScore: "get_hitScore",
            get_enemyType: "get_enemyType"
        })
    });
    l.elements.enemies.EnemyJelly = function(a) {
        this.MAGNITUDE = 2;
        this._STATE_DIE = 5;
        this._STATE_HIT = 4;
        this._STATE_ATTACK_POST = 3;
        this._STATE_ATTACK_PRE = 2;
        this._STATE_SWIM = 1;
        this._STATE_IDLE = 0;
        a.movie = "_small_jelly";
        a.y = a.layer == c.ConstantsApp.LAYER_ENEMY_FRONT ? a.y - 210 : a.y - 130;
        l.elements.enemies.EnemyBase.call(this, a);
        this._addElement(new i.Element({
            y: this._getLayer() ==
                c.ConstantsApp.LAYER_ENEMY_FRONT ? 210 : 130,
            asset: "shadow",
            useCamera: !1,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._setCollision(new g.WorkinPoint(200, 200), new g.WorkinPoint(-100, -100));
        this._setFps(f.WorkinUtils.getRandom(20, 30, !0));
        this._velocity.x = this._getMoveSpeed();
        this._shakeTimer = this._attackCooldown = 0;
        a.active ? this._setBehavior(this._BEHAVIOR_WANDER) : this._setBehavior(this._BEHAVIOR_ENTER)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.enemies.EnemyJelly"] = l.elements.enemies.EnemyJelly;
    l.elements.enemies.EnemyJelly.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,enemies,EnemyJelly".split(",");
    l.elements.enemies.EnemyJelly.__super__ = l.elements.enemies.EnemyBase;
    l.elements.enemies.EnemyJelly.prototype = t(l.elements.enemies.EnemyBase.prototype, {
        get_enemyType: function() {
            return c.ConstantsApp.ENEMY_JELLY
        },
        dispose: function() {
            l.elements.enemies.EnemyBase.prototype.dispose.call(this)
        },
        _doDead: function() {
            this._setState(this._STATE_DIE)
        },
        _doHit: function() {
            this._setState(this._STATE_HIT)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_ATTACK_PRE:
                    this._attackHitBox.x = this._getPos().x + -100;
                    this._attackHitBox.y = this._getPos().y + -100;
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_ATTACK_SB, {
                        box: this._attackHitBox,
                        direction: this._directionFace,
                        damage: this.get_damage()
                    }));
                    this._setState(this._STATE_ATTACK_POST);
                    break;
                case this._STATE_ATTACK_POST:
                    this._attackCooldown = 2 == f.WorkinUtils.getRandom(0, 2, !0) ? 0 : 1.2;
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_HIT:
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_DIE:
                    this._castParticles(), l.elements.enemies.EnemyBase.prototype._doDead.call(this), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_BABY_JELLY_DIED)), this._setDoDelete(!0)
            }
        },
        _onTweensComplete: function() {},
        update: function(a) {
            this._state == this._STATE_HIT && 0 < this._shakeTimer && (this._shakeTimer -= a, 0 >= this._shakeTimer ? (this._shakeTimer = 0, this._renderOffset.to(0, 0)) : this._renderOffset.to(this.MAGNITUDE *
                p.random(4) * (1 >= p.random(2) ? -1 : 1), this.MAGNITUDE * p.random(4) * (1 >= p.random(2) ? -1 : 1)));
            switch (this._behavior) {
                case this._BEHAVIOR_WANDER:
                    this._getTargetRange() <= 700 + this._getoffSet() && this._setBehavior(this._BEHAVIOR_PERSUIT);
                    break;
                case this._BEHAVIOR_PERSUIT:
                    this._state != this._STATE_ATTACK_PRE && this._state != this._STATE_ATTACK_POST && this._state != this._STATE_HIT && this._state != this._STATE_DIE && (0 < this._attackCooldown && (this._attackCooldown -= a, 0 >= this._attackCooldown && (this._attackCooldown = 0)), this._getTargetRange() >
                        800 + this._getoffSet() ? (this._moveVelocity.x = 0, this._setBehavior(this._BEHAVIOR_WANDER)) : this._getTargetRange() <= 800 + this._getoffSet() && this._getTargetRange() >= 100 + this._getoffSet() && 0 == this._attackCooldown ? (this._target._getPos().x < this._getPos().x ? (this._setDirectionFace(this._FACING_LEFT), this._moveVelocity.x = -1) : (this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x = 1), this.updatePositionFromVelocity(a), this._setState(this._STATE_SWIM)) : this._getTargetRange() <= 10 + this._getoffSet() || 0 <
                        this._attackCooldown ? (0 >= this._getPos().x || this._getPos().x >= 1.3 * c.ConstantsApp.STAGE_WIDTH ? this._moveVelocity.x = 0 : this._target._getPos().x > this._getPos().x ? (this._setDirectionFace(this._FACING_LEFT), this._moveVelocity.x = -1) : (this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x = 1), this.updatePositionFromVelocity(a), this._setState(this._STATE_SWIM)) : (this._target._getPos().x < this._getPos().x ? this._setDirectionFace(this._FACING_LEFT) : this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x =
                            0, this._setState(this._STATE_ATTACK_PRE)))
            }
            l.elements.enemies.EnemyBase.prototype.update.call(this, a)
        },
        _setState: function(a) {
            if (this._state != a) switch (this._state = a, this._state) {
                case this._STATE_IDLE:
                    this.animate("idle");
                    break;
                case this._STATE_SWIM:
                    this.animate("swim");
                    break;
                case this._STATE_ATTACK_PRE:
                    f.WorkinCloud.instance._getSound().playSound("zap");
                    this.animate("attackPre", 1);
                    break;
                case this._STATE_ATTACK_POST:
                    this.animate("attackPost", 1);
                    break;
                case this._STATE_HIT:
                    this._shakeTimer = 0.2;
                    this.animate("hit",
                        1);
                    break;
                case this._STATE_DIE:
                    this.animate("die", 1)
            }
        },
        _setBehavior: function(a) {
            if (this._behavior != a) switch (this._behavior = a, this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this.animate("idle");
                    break;
                case this._BEHAVIOR_WANDER:
                    this._setState(this._STATE_IDLE)
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 40);
            this.addAnimation("swim", 41, 80);
            this.addAnimation("attackPre", 81, 88);
            this.addAnimation("attackPost", 89, 95);
            this.addAnimation("hit", 96, 102);
            this.addAnimation("die", 103, 110)
        },
        __class__: l.elements.enemies.EnemyJelly
    });
    l.elements.enemies.EnemyQueenJelly = function(a) {
        this._MAX_BABY_JELLIES = 3;
        this._STATE_SPAWN = 8;
        this._STATE_LEAD = 7;
        this._STATE_DIE = 6;
        this._STATE_HIT = 5;
        this._STATE_ATTACK_POST = 4;
        this._STATE_ATTACK_PRE = 3;
        this._STATE_SWIM = 2;
        this._STATE_IDLE_LOOP = 1;
        this._STATE_IDLE = 0;
        a.movie = "_queen_jelly";
        l.elements.enemies.EnemyBase.call(this, a);
        this._setCollision(new g.WorkinPoint(500, 500), new g.WorkinPoint(-250, -500));
        this._attackHitBox.width = this._attackHitBox.height = 500;
        this._velocity.x = this._getMoveSpeed();
        this._attackCooldown =
            0.2;
        this._spawnDelay = 1;
        this._numOfBabyJellies = 0;
        f.WorkinCloud.instance.setInt(c.ConstantsApp.QUEEN_MAX_HEALTH, this._getDefaultHealth());
        f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_QUEEN_HEALTH, this._getDefaultHealth());
        a.active ? this._setBehavior(this._BEHAVIOR_WANDER) : this._setBehavior(this._BEHAVIOR_ENTER);
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_BABY_JELLY_DIED, s(this, this._onEventBabyJellyDied));
        f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_SHOW_QUEEN_HEALTH))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.enemies.EnemyQueenJelly"] = l.elements.enemies.EnemyQueenJelly;
    l.elements.enemies.EnemyQueenJelly.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,enemies,EnemyQueenJelly".split(",");
    l.elements.enemies.EnemyQueenJelly.__super__ = l.elements.enemies.EnemyBase;
    l.elements.enemies.EnemyQueenJelly.prototype = t(l.elements.enemies.EnemyBase.prototype, {
        get_enemyType: function() {
            return c.ConstantsApp.ENEMY_QUEEN_JELLY
        },
        get_hitScore: function() {
            return 10
        },
        get_score: function() {
            return 100
        },
        get_damage: function() {
            return 6
        },
        _getDefaultHealth: function() {
            return 8 * c.ConstantsApp.getDifficulty()
        },
        _getParticleScale: function() {
            return 6
        },
        _getParticleOffset: function() {
            return -200
        },
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_BABY_JELLY_DIED, s(this, this._onEventBabyJellyDied));
            l.elements.enemies.EnemyBase.prototype.dispose.call(this)
        },
        _onEventBabyJellyDied: function() {
            this._numOfBabyJellies--
        },
        _doDead: function() {
            this._state !=
                this._STATE_DIE && (f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_HIDE_QUEEN_HEALTH)), this._setState(this._STATE_DIE))
        },
        _doHit: function() {
            this._state != this._STATE_ATTACK_PRE && this._state != this._STATE_ATTACK_POST && this._state != this._STATE_HIT && this._state != this._STATE_DIE && this._state != this._STATE_SPAWN && (f.WorkinCloud.instance.setInt(c.ConstantsApp.INT_QUEEN_HEALTH, this._health), this._setState(this._STATE_HIT))
        },
        doDamage: function(a) {
            this._state != this._STATE_ATTACK_PRE &&
                this._state != this._STATE_ATTACK_POST && this._state != this._STATE_HIT && this._state != this._STATE_DIE && this._state != this._STATE_SPAWN && (this._health -= a, this._doHit(), 0 >= this._health && this._doDead())
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_IDLE_LOOP:
                    this._behavior == this._BEHAVIOR_ENTER ? this._setState(this._STATE_IDLE_LOOP) : 3 == f.WorkinUtils.getRandom(1, 3, !0) ? this._setState(this._STATE_IDLE_LOOP) : this._setState(this._STATE_ATTACK_PRE);
                    break;
                case this._STATE_ATTACK_PRE:
                    this._attackHitBox.x =
                        this._getPos().x + -250;
                    this._attackHitBox.y = this._getPos().y + -250;
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_ATTACK_SB, {
                        box: this._attackHitBox,
                        direction: this._directionFace,
                        damage: this.get_damage()
                    }));
                    this._setState(this._STATE_ATTACK_POST);
                    break;
                case this._STATE_ATTACK_POST:
                    this._attackCooldown = 2 == f.WorkinUtils.getRandom(0, 2, !0) ? 0.1 : 1;
                    this._setState(this._STATE_IDLE_LOOP);
                    break;
                case this._STATE_HIT:
                    this._attackCooldown = 2 == f.WorkinUtils.getRandom(0,
                        2, !0) ? 0.1 : 2;
                    3 == f.WorkinUtils.getRandom(1, 3, !0) ? this._setState(this._STATE_IDLE_LOOP) : this._setState(this._STATE_ATTACK_PRE);
                    break;
                case this._STATE_DIE:
                    this._castParticles();
                    l.elements.enemies.EnemyBase.prototype._doDead.call(this);
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_BOSS_DEAD));
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_EARLY_DEATH));
                    this._setDoDelete(!0);
                    break;
                case this._STATE_LEAD:
                    this._attackCooldown =
                        3, this._setState(this._STATE_SPAWN)
            }
        },
        _onTweensComplete: function() {},
        update: function(a) {
            switch (this._behavior) {
                case this._BEHAVIOR_WANDER:
                    this._state != this._STATE_ATTACK_PRE && this._state != this._STATE_ATTACK_POST && this._state != this._STATE_HIT && this._state != this._STATE_DIE && this._state != this._STATE_SPAWN ? (this._target._getPos().x > this._getPos().x ? this._setDirectionFace(this._FACING_RIGHT) : this._setDirectionFace(this._FACING_LEFT), 0 < this._attackCooldown && (this._attackCooldown -= a, 0 >= this._attackCooldown &&
                        (this._spawnDelay = 1, this._setState(this._STATE_LEAD)))) : this._state == this._STATE_SPAWN && (0 < this._attackCooldown && (this._attackCooldown -= a, 0 >= this._attackCooldown && (this._attackCooldown = 2, this._setState(this._STATE_IDLE_LOOP))), 0 < this._spawnDelay && (this._spawnDelay -= a, 0 >= this._spawnDelay && this._numOfBabyJellies < this._MAX_BABY_JELLIES && (this._attackHitBox.x = this._getPos().x + -250, this._attackHitBox.y = this._getPos().y + -500, f.WorkinCloud.instance._getSound().playSound("zap"), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_ATTACK_SB, {
                        box: this._attackHitBox,
                        direction: this._directionFace,
                        damage: this.get_damage()
                    })), this._spawnDelay = 0.8, f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_BABY_JELLY, {
                        pos: this._getPos()
                    })), this._numOfBabyJellies++)))
            }
            l.elements.enemies.EnemyBase.prototype.update.call(this, a)
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this.animate("idle");
                    break;
                case this._STATE_IDLE_LOOP:
                    this.animate("idle", 1, !0);
                    break;
                case this._STATE_SWIM:
                    this.animate("swim");
                    break;
                case this._STATE_ATTACK_PRE:
                    f.WorkinCloud.instance._getSound().playSound("zap");
                    this.animate("attackPre", 1);
                    break;
                case this._STATE_ATTACK_POST:
                    this.animate("attackPost", 1);
                    break;
                case this._STATE_HIT:
                    this.animate("hit", 1);
                    break;
                case this._STATE_DIE:
                    this.animate("die", 1);
                    break;
                case this._STATE_LEAD:
                    this.animate("lead", 2);
                    break;
                case this._STATE_SPAWN:
                    this.animate("spawn")
            }
        },
        _setBehavior: function(a) {
            if (this._behavior != a) switch (this._behavior = a, this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this._setState(this._STATE_IDLE_LOOP)
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 40);
            this.addAnimation("swim", 41, 80);
            this.addAnimation("lead", 81, 95);
            this.addAnimation("spawn", 96, 112);
            this.addAnimation("attackPre", 113, 121);
            this.addAnimation("attackPost", 122, 129);
            this.addAnimation("hit", 130, 140);
            this.addAnimation("die", 141, 151)
        },
        __class__: l.elements.enemies.EnemyQueenJelly
    });
    l.elements.enemies.EnemySeaBear = function(a) {
        this._STATE_DIE = 5;
        this._STATE_HIT = 4;
        this._STATE_ATTACK_POST = 3;
        this._STATE_ATTACK_PRE = 2;
        this._STATE_SWIM = 1;
        this._STATE_IDLE =
            0;
        a.movie = "_seabear";
        l.elements.enemies.EnemyBase.call(this, a);
        this._setCollision(new g.WorkinPoint(450, 400), new g.WorkinPoint(-225, -400));
        this._setFps(f.WorkinUtils.getRandom(20, 30, !0));
        this._velocity.x = this._getMoveSpeed();
        this._attackCooldown = 0;
        a.active ? this._setBehavior(this._BEHAVIOR_WANDER) : this._setBehavior(this._BEHAVIOR_ENTER)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.enemies.EnemySeaBear"] = l.elements.enemies.EnemySeaBear;
    l.elements.enemies.EnemySeaBear.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,enemies,EnemySeaBear".split(",");
    l.elements.enemies.EnemySeaBear.__super__ = l.elements.enemies.EnemyBase;
    l.elements.enemies.EnemySeaBear.prototype = t(l.elements.enemies.EnemyBase.prototype, {
        get_enemyType: function() {
            return c.ConstantsApp.ENEMY_SEA_BEAR
        },
        get_hitScore: function() {
            return 5
        },
        get_score: function() {
            return 50
        },
        get_damage: function() {
            return 4
        },
        _getDefaultHealth: function() {
            return 5 * c.ConstantsApp.getDifficulty()
        },
        _getParticleScale: function() {
            return 4
        },
        _getParticleOffset: function() {
            return -200
        },
        _getMoveSpeed: function() {
            return 50
        },
        dispose: function() {
            l.elements.enemies.EnemyBase.prototype.dispose.call(this)
        },
        _doDead: function() {
            this._setState(this._STATE_DIE)
        },
        _doHit: function() {
            this._setState(this._STATE_HIT)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_ATTACK_PRE:
                    this._attackHitBox.x = this._getPos().x + (this._directionFace == this._FACING_RIGHT ? 250 * this._directionFace - this._attackHitBox.width : 250 * this._directionFace);
                    this._attackHitBox.y = this._getPos().y + -240;
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_ATTACK_SB, {
                        box: this._attackHitBox,
                        direction: this._directionFace,
                        damage: this.get_damage()
                    }));
                    this._setState(this._STATE_ATTACK_POST);
                    break;
                case this._STATE_ATTACK_POST:
                    this._attackCooldown = 2 == f.WorkinUtils.getRandom(0, 2, !0) ? 0 : 3;
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_HIT:
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_DIE:
                    this._castParticles(), l.elements.enemies.EnemyBase.prototype._doDead.call(this), this._setDoDelete(!0)
            }
        },
        _onTweensComplete: function() {},
        updatePositionFromVelocity: function(a) {
            this._pos.x +=
                this._velocity.x * this._moveVelocity.x * a;
            this._pos.y += this._velocity.y * this._moveVelocity.y * a
        },
        _runAnimation: function(a) {
            l.elements.enemies.EnemyBase.prototype._runAnimation.call(this, a);
            this._velocity.x = "swim" == this._currentAnimDef._getId() && 60 <= this._currentFrame && 70 >= this._currentFrame ? 6 * this._getMoveSpeed() : this._getMoveSpeed()
        },
        update: function(a) {
            switch (this._behavior) {
                case this._BEHAVIOR_WANDER:
                    this._getTargetRange() <= 800 + this._getoffSet() && this._setBehavior(this._BEHAVIOR_PERSUIT);
                    break;
                case this._BEHAVIOR_PERSUIT:
                    this._state !=
                        this._STATE_ATTACK_PRE && this._state != this._STATE_ATTACK_POST && this._state != this._STATE_HIT && this._state != this._STATE_DIE && (0 < this._attackCooldown && (this._attackCooldown -= a, 0 >= this._attackCooldown && (this._attackCooldown = 0)), this._getTargetRange() > 900 + this._getoffSet() ? (this._moveVelocity.x = 0, this._setBehavior(this._BEHAVIOR_WANDER)) : this._getTargetRange() <= 900 + this._getoffSet() && this._getTargetRange() >= 200 + this._getoffSet() && 0 == this._attackCooldown ? (this._target._getPos().x < this._getPos().x ? (this._setDirectionFace(this._FACING_LEFT),
                            this._moveVelocity.x = -1) : (this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x = 1), this.updatePositionFromVelocity(a), this._setState(this._STATE_SWIM)) : this._getTargetRange() <= 150 + this._getoffSet() || 0 < this._attackCooldown ? (0 >= this._getPos().x || this._getPos().x >= 1.3 * c.ConstantsApp.STAGE_WIDTH ? this._moveVelocity.x = 0 : this._target._getPos().x > this._getPos().x ? (this._setDirectionFace(this._FACING_LEFT), this._moveVelocity.x = -1) : (this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x =
                            1), this.updatePositionFromVelocity(a), this._setState(this._STATE_SWIM)) : (this._target._getPos().x < this._getPos().x ? this._setDirectionFace(this._FACING_LEFT) : this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x = 0, this._setState(this._STATE_ATTACK_PRE)))
            }
            l.elements.enemies.EnemyBase.prototype.update.call(this, a)
        },
        _setState: function(a) {
            if (this._state != a) switch (this._state = a, this._state) {
                case this._STATE_IDLE:
                    this.animate("idle");
                    break;
                case this._STATE_SWIM:
                    this.animate("swim");
                    break;
                case this._STATE_ATTACK_PRE:
                    this.animate("attackPre",
                        1);
                    break;
                case this._STATE_ATTACK_POST:
                    this.animate("attackPost", 1);
                    break;
                case this._STATE_HIT:
                    this.animate("hit", 1);
                    break;
                case this._STATE_DIE:
                    this.animate("die", 1)
            }
        },
        _setBehavior: function(a) {
            if (this._behavior != a) switch (this._behavior = a, this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this.animate("idle");
                    break;
                case this._BEHAVIOR_WANDER:
                    this._setState(this._STATE_IDLE)
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 40);
            this.addAnimation("swim", 41, 76);
            this.addAnimation("attackPre", 77, 94);
            this.addAnimation("attackPost",
                95, 116);
            this.addAnimation("hit", 117, 134);
            this.addAnimation("die", 135, 148)
        },
        __class__: l.elements.enemies.EnemySeaBear
    });
    l.elements.enemies.EnemySeaRhino = function(a) {
        this._STATE_DIE = 5;
        this._STATE_HIT = 4;
        this._STATE_ATTACK_POST = 3;
        this._STATE_ATTACK_PRE = 2;
        this._STATE_SWIM = 1;
        this._STATE_IDLE = 0;
        a.movie = "_sea_rhino";
        l.elements.enemies.EnemyBase.call(this, a);
        this._setCollision(new g.WorkinPoint(450, 400), new g.WorkinPoint(-225, -400));
        this._setFps(f.WorkinUtils.getRandom(20, 30, !0));
        this._velocity.x = this._getMoveSpeed();
        this._attackCooldown = 0;
        a.active ? this._setBehavior(this._BEHAVIOR_WANDER) : this._setBehavior(this._BEHAVIOR_ENTER)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.enemies.EnemySeaRhino"] = l.elements.enemies.EnemySeaRhino;
    l.elements.enemies.EnemySeaRhino.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,enemies,EnemySeaRhino".split(",");
    l.elements.enemies.EnemySeaRhino.__super__ = l.elements.enemies.EnemyBase;
    l.elements.enemies.EnemySeaRhino.prototype = t(l.elements.enemies.EnemyBase.prototype, {
        get_enemyType: function() {
            return c.ConstantsApp.ENEMY_SEA_RHINO
        },
        get_hitScore: function() {
            return 6
        },
        get_score: function() {
            return 60
        },
        get_damage: function() {
            return 5
        },
        _getDefaultHealth: function() {
            return 6 * c.ConstantsApp.getDifficulty()
        },
        _getParticleScale: function() {
            return 4
        },
        _getParticleOffset: function() {
            return -200
        },
        dispose: function() {
            l.elements.enemies.EnemyBase.prototype.dispose.call(this)
        },
        _doDead: function() {
            this._setState(this._STATE_DIE)
        },
        _doHit: function() {
            this._setState(this._STATE_HIT)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_ATTACK_PRE:
                    this._attackHitBox.x =
                        this._getPos().x + (this._directionFace == this._FACING_RIGHT ? 280 * this._directionFace - this._attackHitBox.width : 280 * this._directionFace);
                    this._attackHitBox.y = this._getPos().y + -250;
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_ATTACK_SB, {
                        box: this._attackHitBox,
                        direction: this._directionFace,
                        damage: this.get_damage()
                    }));
                    this._setState(this._STATE_ATTACK_POST);
                    break;
                case this._STATE_ATTACK_POST:
                    this._attackCooldown = 2 == f.WorkinUtils.getRandom(0, 2, !0) ? 0 : 1.2;
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_HIT:
                    this._setState(this._STATE_IDLE);
                    break;
                case this._STATE_DIE:
                    this._castParticles(), l.elements.enemies.EnemyBase.prototype._doDead.call(this), this._setDoDelete(!0)
            }
        },
        _onTweensComplete: function() {},
        update: function(a) {
            switch (this._behavior) {
                case this._BEHAVIOR_WANDER:
                    this._getTargetRange() <= 800 + this._getoffSet() && this._setBehavior(this._BEHAVIOR_PERSUIT);
                    break;
                case this._BEHAVIOR_PERSUIT:
                    this._state != this._STATE_ATTACK_PRE && this._state != this._STATE_ATTACK_POST && this._state !=
                        this._STATE_HIT && this._state != this._STATE_DIE && (0 < this._attackCooldown && (this._attackCooldown -= a, 0 >= this._attackCooldown && (this._attackCooldown = 0)), this._getTargetRange() > 900 + this._getoffSet() ? (this._moveVelocity.x = 0, this._setBehavior(this._BEHAVIOR_WANDER)) : this._getTargetRange() <= 900 + this._getoffSet() && this._getTargetRange() >= 250 + this._getoffSet() && 0 == this._attackCooldown ? (this._target._getPos().x < this._getPos().x ? (this._setDirectionFace(this._FACING_LEFT), this._moveVelocity.x = -1) : (this._setDirectionFace(this._FACING_RIGHT),
                                this._moveVelocity.x = 1), this.updatePositionFromVelocity(a), this._setState(this._STATE_SWIM)) : this._getTargetRange() <= 150 + this._getoffSet() || 0 < this._attackCooldown ? (0 >= this._getPos().x || this._getPos().x >= 1.3 * c.ConstantsApp.STAGE_WIDTH ? this._moveVelocity.x = 0 : this._target._getPos().x > this._getPos().x ? (this._setDirectionFace(this._FACING_LEFT), this._moveVelocity.x = -1) : (this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x = 1), this.updatePositionFromVelocity(a), this._setState(this._STATE_SWIM)) :
                            (this._target._getPos().x < this._getPos().x ? this._setDirectionFace(this._FACING_LEFT) : this._setDirectionFace(this._FACING_RIGHT), this._moveVelocity.x = 0, this._setState(this._STATE_ATTACK_PRE)))
            }
            l.elements.enemies.EnemyBase.prototype.update.call(this, a)
        },
        _setState: function(a) {
            if (this._state != a) switch (this._state = a, this._state) {
                case this._STATE_IDLE:
                    this.animate("idle");
                    break;
                case this._STATE_SWIM:
                    this.animate("swim");
                    break;
                case this._STATE_ATTACK_PRE:
                    this.animate("attackPre", 1);
                    break;
                case this._STATE_ATTACK_POST:
                    this.animate("attackPost",
                        1);
                    break;
                case this._STATE_HIT:
                    this.animate("hit", 1);
                    break;
                case this._STATE_DIE:
                    this.animate("die", 1)
            }
        },
        _setBehavior: function(a) {
            if (this._behavior != a) switch (this._behavior = a, this._behavior) {
                case this._BEHAVIOR_ENTER:
                    this.animate("idle");
                    break;
                case this._BEHAVIOR_WANDER:
                    this._setState(this._STATE_IDLE)
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 40);
            this.addAnimation("swim", 41, 90);
            this.addAnimation("attackPre", 91, 103);
            this.addAnimation("attackPost", 104, 115);
            this.addAnimation("hit", 116, 129);
            this.addAnimation("die", 130, 143)
        },
        __class__: l.elements.enemies.EnemySeaRhino
    });
    l.elements.other = {};
    l.elements.other.CongratsText = function(a) {
        this._STATE_OUT = 3;
        this._STATE_WAIT = 2;
        this._STATE_IN = 1;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        i.Element.call(this, a);
        this._addElement(new i.Element({
            x: 0,
            y: 20,
            asset: "top_header_backing",
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._text1 = this._addElement(new i.TextLocalized(0, 0, "congrats_text_1", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }));
        this._text2 = this._addElement(new i.TextLocalized(0,
            0, "congrats_text_2", "", {
                origin: new g.WorkinPoint(0.5, 0.5),
                center: !0
            }));
        this._firstText = !0;
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.CongratsText"] = l.elements.other.CongratsText;
    l.elements.other.CongratsText.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,CongratsText".split(",");
    l.elements.other.CongratsText.__super__ = i.Element;
    l.elements.other.CongratsText.prototype = t(i.Element.prototype, {
        dispose: function() {
            i.Element.prototype.dispose.call(this)
        },
        _onTweensComplete: function() {
            switch (this._state) {
                case this._STATE_IN:
                    this._setState(this._STATE_WAIT);
                    break;
                case this._STATE_WAIT:
                    this._setState(this._STATE_OUT);
                    break;
                case this._STATE_OUT:
                    this._setState(this._STATE_IN)
            }
        },
        update: function(a) {
            switch (this._state) {
                case this._STATE_IN:
                case this._STATE_WAIT:
                case this._STATE_OUT:
                    this.updatePosFromTweener(a)
            }
            i.Element.prototype.update.call(this, a)
        },
        _updateTextVisible: function() {
            this._firstText ? (this._text1._getRenderable().alpha = 1, this._text2._getRenderable().alpha =
                0, this._firstText = !1) : (this._text1._getRenderable().alpha = 0, this._text2._getRenderable().alpha = 1, this._firstText = !0)
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IN:
                    this._updateTextVisible();
                    this._getPos().x = this._getInitPos().x + c.ConstantsApp.STAGE_WIDTH;
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(this._getInitPos(), 0.5, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._STATE_WAIT:
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(this._getPos(), 1, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._STATE_OUT:
                    this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(new g.WorkinPoint(this._getInitPos().x - c.ConstantsApp.STAGE_WIDTH, this._getPos().y), 0.5, g.tween.PennerManager.EASE_LINEAR), this._tweener.start()
            }
        },
        __class__: l.elements.other.CongratsText
    });
    l.elements.other.EasterEggBush = function(a) {
        this.MAGNITUDE =
            2;
        this._STATE_DEAD = 1;
        this._STATE_IDLE = 0;
        a.type = c.ConstantsApp.TYPE_EASTER_EGG_BUSH;
        a.layer = c.ConstantsApp.LAYER_BG;
        a.asset = "jungle_midg_plant_02";
        a.origin = new g.WorkinPoint(0.5, 1);
        i.Element.call(this, a);
        this._health = 4;
        this._shakeTimer = 0;
        this._setCollision(new g.WorkinPoint(200, 200), new g.WorkinPoint(-100, -200));
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.EasterEggBush"] = l.elements.other.EasterEggBush;
    l.elements.other.EasterEggBush.__name__ =
        "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,EasterEggBush".split(",");
    l.elements.other.EasterEggBush.__super__ = i.Element;
    l.elements.other.EasterEggBush.prototype = t(i.Element.prototype, {
        _getParticleOffset: function() {
            return -50
        },
        dispose: function() {
            i.Element.prototype.dispose.call(this)
        },
        doDamage: function(a) {
            this._health -= a;
            this._shakeTimer = 0.2;
            if (0 >= this._health) {
                f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_EASTER_EGG, {
                    pos: this._getPos()
                }));
                for (a = 6; 0 < a--;) {
                    var b = {
                        x: this._getPos().x,
                        y: this._getPos().y + this._getParticleOffset(),
                        particle: c.ConstantsApp.PARTICLE_POOF
                    };
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_SPAWN_PARTICLE, b))
                }
                this._setDoDelete(!0)
            }
        },
        update: function(a) {
            switch (this._state) {
                case this._STATE_IDLE:
                    0 < this._shakeTimer && (this._shakeTimer -= a, 0 >= this._shakeTimer ? (this._shakeTimer = 0, this._renderOffset.to(0, 0)) : this._renderOffset.to(this.MAGNITUDE * p.random(4) * (1 >= p.random(2) ? -1 : 1),
                        this.MAGNITUDE * p.random(4) * (1 >= p.random(2) ? -1 : 1)))
            }
            i.Element.prototype.update.call(this, a)
        },
        _setState: function(a) {
            this._state = a
        },
        __class__: l.elements.other.EasterEggBush,
        __properties__: t(i.Element.prototype.__properties__, {
            get_particleOffset: "_getParticleOffset"
        })
    });
    l.elements.other.EasterEggCrayon = function(a) {
        this._STATE_CONSUME = 1;
        this._STATE_IDLE = 0;
        a.type = c.ConstantsApp.TYPE_EASTER_EGG_CRAYON;
        a.movie = "easter_egg";
        a.library = "gameplay_asset";
        a.layer = c.ConstantsApp.LAYER_BG;
        a.origin = new g.WorkinPoint(0.5,
            1);
        i.AnimatedElement.call(this, a);
        this._setCollision(new g.WorkinPoint(200, 200), new g.WorkinPoint(-100, -200));
        this._addAnimation();
        this._getRenderable().scaleX = this._getRenderable().scaleY = 0.2;
        this._getRenderable().alpha = 0;
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.EasterEggCrayon"] = l.elements.other.EasterEggCrayon;
    l.elements.other.EasterEggCrayon.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,EasterEggCrayon".split(",");
    l.elements.other.EasterEggCrayon.__super__ = i.AnimatedElement;
    l.elements.other.EasterEggCrayon.prototype = t(i.AnimatedElement.prototype, {
        _getParticleOffset: function() {
            return -50
        },
        dispose: function() {
            i.AnimatedElement.prototype.dispose.call(this)
        },
        doConsume: function() {
            this._setState(this._STATE_CONSUME)
        },
        _onAnimationComplete: function() {
            switch (this._state) {
                case this._STATE_CONSUME:
                    f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG)), this._setDoDelete(!0)
            }
        },
        update: function(a) {
            switch (this._state) {
                case this._STATE_IDLE:
                    1 > this._getRenderable().alpha && (this._getRenderable().alpha += 2 * a, 1 <= this._getRenderable().alpha && (this._getRenderable().alpha = 1)), 1 > this._getRenderable().scaleX && (this._getRenderable().scaleX = this._getRenderable().scaleY += 2 * a, 1 <= this._getRenderable().scaleX && (this._getRenderable().scaleX = this._getRenderable().scaleY = 1))
            }
            i.AnimatedElement.prototype.update.call(this, a)
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this.animate("idle");
                    break;
                case this._STATE_CONSUME:
                    this.animate("consume", 1)
            }
        },
        _addAnimation: function() {
            this.addAnimation("idle", 1, 30);
            this.addAnimation("consume", 31, 39)
        },
        __class__: l.elements.other.EasterEggCrayon
    });
    l.elements.other.EasterEggPopUp = function(a) {
        this._STATE_OUT = 3;
        this._STATE_WAIT = 2;
        this._STATE_IN = 1;
        this._STATE_IDLE = 0;
        a.asset = "popup_backing_red";
        a.origin = new g.WorkinPoint(0.5, 0.5);
        i.Element.call(this, a);
        this._addElement(new i.TextLocalized(0, 0, "ultraEnergy", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._setState(this._STATE_IDLE);
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG, s(this, this._onActivateEasterEgg))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.EasterEggPopUp"] = l.elements.other.EasterEggPopUp;
    l.elements.other.EasterEggPopUp.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,EasterEggPopUp".split(",");
    l.elements.other.EasterEggPopUp.__super__ = i.Element;
    l.elements.other.EasterEggPopUp.prototype = t(i.Element.prototype, {
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG, s(this, this._onActivateEasterEgg));
            i.Element.prototype.dispose.call(this)
        },
        _onActivateEasterEgg: function() {
            this._setState(this._STATE_IN)
        },
        _onTweensComplete: function() {
            switch (this._state) {
                case this._STATE_IN:
                    this._setState(this._STATE_WAIT);
                    break;
                case this._STATE_WAIT:
                    this._setState(this._STATE_OUT)
            }
        },
        update: function(a) {
            if (!f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED)) {
                switch (this._state) {
                    case this._STATE_IN:
                    case this._STATE_WAIT:
                        this.updatePosFromTweener(a);
                        break;
                    case this._STATE_OUT:
                        0 < this._getRenderable().alpha && (this._getRenderable().alpha -= 2 * a, this._getRenderable().scaleX = this._getRenderable().scaleY += 2 * a, 0 >= this._getRenderable().alpha && (this._getRenderable().alpha = 0, this._setState(this._STATE_IDLE)))
                }
                i.Element.prototype.update.call(this, a)
            }
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this._getRenderable().alpha = 1;
                    this._getRenderable().scaleX = this._getRenderable().scaleY = 1;
                    this._getPos().y = this._getInitPos().y -
                        c.ConstantsApp.STAGE_HEIGHT;
                    break;
                case this._STATE_IN:
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(new g.WorkinPoint(this._getPos().x, this._getPos().y + c.ConstantsApp.STAGE_HEIGHT), 0.5, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._STATE_WAIT:
                    this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(this._getPos(), 0.5, g.tween.PennerManager.EASE_LINEAR), this._tweener.start()
            }
        },
        __class__: l.elements.other.EasterEggPopUp
    });
    l.elements.other.EnemyDef = function(a, b, e, c) {
        null == c && (c = !0);
        this.classType = a;
        this.layer = b;
        this.wait = e;
        this.active = c
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.EnemyDef"] = l.elements.other.EnemyDef;
    l.elements.other.EnemyDef.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,EnemyDef".split(",");
    l.elements.other.EnemyDef.prototype = {
        __class__: l.elements.other.EnemyDef
    };
    l.elements.other.Go = function(a) {
        this._STATE_OUT = 3;
        this._STATE_WAIT = 2;
        this._STATE_IN =
            1;
        this._STATE_IDLE = 0;
        i.Element.call(this, a);
        a = this._addElement(new i.Element({
            asset: "intro_backing",
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        a._getRenderable().scaleX = -0.7;
        a._getRenderable().scaleY = 0.7;
        this._addElement(new i.TextLocalized(0, 0, "go", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._setState(this._STATE_IDLE);
        f.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_DISPLAY_GO, s(this, this._onDisplayGo))
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.Go"] =
        l.elements.other.Go;
    l.elements.other.Go.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,Go".split(",");
    l.elements.other.Go.__super__ = i.Element;
    l.elements.other.Go.prototype = t(i.Element.prototype, {
        dispose: function() {
            f.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_DISPLAY_GO, s(this, this._onDisplayGo));
            i.Element.prototype.dispose.call(this)
        },
        _onDisplayGo: function() {
            this._setState(this._STATE_IN)
        },
        _onTweensComplete: function() {
            switch (this._state) {
                case this._STATE_IN:
                    this._setState(this._STATE_WAIT);
                    break;
                case this._STATE_WAIT:
                    this._setState(this._STATE_OUT)
            }
        },
        update: function(a) {
            if (!f.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED)) {
                switch (this._state) {
                    case this._STATE_IN:
                    case this._STATE_WAIT:
                        this.updatePosFromTweener(a);
                        break;
                    case this._STATE_OUT:
                        0 < this._getRenderable().alpha && (this._getRenderable().alpha -= 2 * a, this._getRenderable().scaleX = this._getRenderable().scaleY += 2 * a, 0 >= this._getRenderable().alpha && (f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(c.ConstantsApp.EVENT_BATTLE_COMMENCE, {})), this._getRenderable().alpha = 0, this._setState(this._STATE_IDLE)))
                }
                i.Element.prototype.update.call(this, a)
            }
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this._getRenderable().alpha = 1;
                    this._getRenderable().scaleX = this._getRenderable().scaleY = 1;
                    this._getPos().y = this._getInitPos().y - c.ConstantsApp.STAGE_HEIGHT;
                    break;
                case this._STATE_IN:
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(new g.WorkinPoint(this._getPos().x,
                        this._getPos().y + c.ConstantsApp.STAGE_HEIGHT), 0.5, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._STATE_WAIT:
                    this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(this._getPos(), 0.2, g.tween.PennerManager.EASE_LINEAR), this._tweener.start()
            }
        },
        __class__: l.elements.other.Go
    });
    l.elements.other.PopUp = function(a) {
        this._STATE_OUT = 3;
        this._STATE_WAIT = 2;
        this._STATE_IN = 1;
        this._STATE_IDLE = 0;
        var b = "";
        switch (f.WorkinUtils.getRandom(1, 3, !0)) {
            case 1:
                b =
                    "blue";
                break;
            case 2:
                b = "green";
                break;
            case 3:
                b = "red"
        }
        this._currentBacking = a.asset = "popup_backing_" + b;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        i.Element.call(this, a);
        this._text = this._addElement(new i.TextLocalized(0, 0, "jelly_pop_1", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._direction = a.direction ? a.direction : 0;
        switch (this._direction) {
            case 0:
                this._yDir = this._xDir = -1;
                break;
            case 1:
                this._xDir = -1;
                this._yDir = 1;
                break;
            case 2:
                this._yDir = this._xDir = 1;
                break;
            case 3:
                this._xDir = 1, this._yDir = -1
        }
        this._setState(this._STATE_IDLE)
    };
    k["com.nick.spongeBob.capri_sun_adventure_jungle.world.elements.other.PopUp"] = l.elements.other.PopUp;
    l.elements.other.PopUp.__name__ = "com,nick,spongeBob,capri_sun_adventure_jungle,world,elements,other,PopUp".split(",");
    l.elements.other.PopUp.__super__ = i.Element;
    l.elements.other.PopUp.prototype = t(i.Element.prototype, {
        dispose: function() {
            this._text = null;
            i.Element.prototype.dispose.call(this)
        },
        showPopUp: function(a, b) {
            var e = f.WorkinUtils.getRandom(1, 3, !0),
                d = "";
            switch (e) {
                case 1:
                    d = "blue";
                    break;
                case 2:
                    d =
                        "green";
                    break;
                case 3:
                    d = "red"
            }
            this._currentBacking != "popup_backing_" + d && (this._assetId = this._currentBacking = "popup_backing_" + d, this.setTexture(this._assetId));
            e = f.WorkinUtils.getRandom(1, 3, !0);
            a == c.ConstantsApp.ENEMY_QUEEN_JELLY && 5 != f.WorkinUtils.getRandom(1, 5, !0) ? a = c.ConstantsApp.ENEMY_JELLY : a == c.ConstantsApp.ENEMY_QUEEN_JELLY && (e = 1);
            d = a + "_pop_" + p.string(e);
            2 < b && 3 == f.WorkinUtils.getRandom(1, 3, !0) && (d = "any_pop_1");
            this._text._setText(d);
            this._setState(this._STATE_IN)
        },
        _onTweensComplete: function() {
            switch (this._state) {
                case this._STATE_IN:
                    this._setState(this._STATE_WAIT);
                    break;
                case this._STATE_WAIT:
                    this._setState(this._STATE_OUT)
            }
        },
        update: function(a) {
            switch (this._state) {
                case this._STATE_IN:
                    1 > this._getRenderable().alpha && (this._getRenderable().alpha += 2 * a, 1 <= this._getRenderable().alpha && (this._getRenderable().alpha = 1));
                    0.75 > this._getRenderable().scaleX && (this._getRenderable().scaleX = this._getRenderable().scaleY += 2 * a, 0.75 <= this._getRenderable().scaleX && (this._getRenderable().scaleX = 0.75));
                    this.updatePosFromTweener(a);
                    break;
                case this._STATE_WAIT:
                    this.updatePosFromTweener(a);
                    break;
                case this._STATE_OUT:
                    0 < this._getRenderable().alpha && (this._getRenderable().alpha -= 2 * a, 0 >= this._getRenderable().alpha && (this._getRenderable().alpha = 0, this._setState(this._STATE_IDLE)))
            }
            i.Element.prototype.update.call(this, a)
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case this._STATE_IDLE:
                    this._getRenderable().alpha = 0;
                    this._getRenderable().scaleX = this._getRenderable().scaleY = 0.25;
                    this._getPos().x = this._getInitPos().x;
                    this._getPos().y = this._getInitPos().y;
                    break;
                case this._STATE_IN:
                    this._tweener.clearTweens();
                    this._tweener.setStartFromPoint(this._getPos());
                    this._tweener.addTween(new g.WorkinPoint(this._getPos().x + c.ConstantsApp.STAGE_CENTER_X / 1.8 * this._xDir, this._getPos().y + c.ConstantsApp.STAGE_CENTER_Y / 2 * this._yDir), 0.5, g.tween.PennerManager.EASE_LINEAR);
                    this._tweener.start();
                    break;
                case this._STATE_WAIT:
                    this._tweener.clearTweens(), this._tweener.setStartFromPoint(this._getPos()), this._tweener.addTween(this._getPos(), 0.2, g.tween.PennerManager.EASE_LINEAR), this._tweener.start()
            }
        },
        __class__: l.elements.other.PopUp
    });
    $ = {
        ComponentUpdater: function() {
            this._paused = !1
        }
    };
    k["com.workinman.components.ComponentUpdater"] = $.ComponentUpdater;
    $.ComponentUpdater.__name__ = ["com", "workinman", "components", "ComponentUpdater"];
    $.ComponentUpdater.__super__ = P;
    $.ComponentUpdater.prototype = t(P.prototype, {
        setPaused: function(a) {
            return this._paused = a
        },
        getPaused: function() {
            return this._paused
        },
        onUpdate: function(a) {
            this._paused || f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventUpdate(a))
        },
        get_name: function() {
            return "ComponentUpdater_3"
        },
        __class__: $.ComponentUpdater
    });
    C = {
        ConstantsCloud: function() {}
    };
    k["com.workinman.data.ConstantsCloud"] = C.ConstantsCloud;
    C.ConstantsCloud.__name__ = ["com", "workinman", "data", "ConstantsCloud"];
    C.ConstantsCloud.getUniqueId = function() {
        return p.string(C.ConstantsCloud._uniqueId++)
    };
    C.ConstantsCloud.getIsAndroid = function() {
        return 0 <= v.window.navigator.userAgent.indexOf("Linux; U; Android 4")
    };
    i.QueuedAnimation = function() {};
    k["com.workinman.display.QueuedAnimation"] = i.QueuedAnimation;
    i.QueuedAnimation.__name__ = ["com", "workinman", "display", "QueuedAnimation"];
    i.QueuedAnimation.prototype = {
        _getForce: function() {
            return this._force
        },
        _getLoops: function() {
            return this._loops
        },
        _getName: function() {
            return this._name
        },
        __class__: i.QueuedAnimation,
        __properties__: {
            get_name: "_getName",
            get_loops: "_getLoops",
            get_force: "_getForce"
        }
    };
    i.AnimationDef = function(a, b, e) {
        this._id = a;
        this._startFrame = b;
        this._endFrame = e;
        this._playReverse = !1;
        b > e && (this._playReverse = !0, this._startFrame = e, this._endFrame = b)
    };
    k["com.workinman.display.AnimationDef"] =
        i.AnimationDef;
    i.AnimationDef.__name__ = ["com", "workinman", "display", "AnimationDef"];
    i.AnimationDef.prototype = {
        _getId: function() {
            return this._id
        },
        _getReverse: function() {
            return this._playReverse
        },
        _getEnd: function() {
            return this._endFrame
        },
        _getStart: function() {
            return this._startFrame
        },
        __class__: i.AnimationDef,
        __properties__: {
            get_start: "_getStart",
            get_end: "_getEnd",
            get_reverse: "_getReverse",
            get_id: "_getId"
        }
    };
    i.ElementManager = function(a, b, e) {
        this._timeline = a;
        this._layers = new F;
        this._elements = [];
        this._camera =
            new g.WorkinCamera(b, e);
        this._zSortLayers = new F
    };
    k["com.workinman.display.ElementManager"] = i.ElementManager;
    i.ElementManager.__name__ = ["com", "workinman", "display", "ElementManager"];
    i.ElementManager.prototype = {
        renderElements: function() {
            for (var a = 0, b = this._elements; a < b.length;) {
                var e = b[a];
                ++a;
                e.renderPosition(this._camera)
            }
        },
        updateElements: function(a) {
            for (this._i = this._elements.length; 0 < this._i;) this._i--, this._elements[this._i].update(a), this._elements[this._i]._getDoDelete() && this.removeElementAtIndex(this._i)
        },
        removeElementAtIndex: function(a) {
            this._elements[a]._getEntity().parent.removeChild(this._elements[a]._getEntity());
            this._elements[a]._setDoDelete(!0);
            this._elements[a].dispose();
            this._elements.splice(a, 1)
        },
        addElement: function(a) {
            if (!1 == this._layers.exists(a._getLayer())) return f.WorkinCloud.instance.log("[ElementManager](addElement) Trying to add element to non-existant layer '" + a._getLayer() + "'!"), a;
            for (this._i = 0; this._i < this._elements.length;) {
                if (this._elements[this._i]._getUniqueId() == a._getUniqueId()) return this._layers.get(a._getLayer()).addChild(a._getEntity()),
                    a;
                this._i++
            }
            this._elements.push(a);
            this._layers.get(a._getLayer()).addChild(a._getEntity());
            this._zSortLayers.exists(a._getLayer()) && this._zSortLayers.get(a._getLayer()).push(a);
            return a
        },
        addLayer: function(a, b) {
            null == b && (b = !1);
            if (this._layers.exists(a)) this._timeline.removeChild(this._layers.get(a)), this._timeline.addChild(this._layers.get(a));
            else {
                var e = new M;
                this._timeline.addChild(e);
                this._layers.set(a, e);
                b && this._zSortLayers.set(a, [])
            }
        },
        _getElements: function() {
            return this._elements
        },
        _getCamera: function() {
            return this._camera
        },
        dispose: function() {
            for (; 0 < this._elements.length;) this.removeElementAtIndex(this._elements.length - 1);
            this._elements = null;
            this._camera.dispose();
            this._camera = null;
            for (var a = this._layers.iterator(); a.hasNext();) a.next().dispose();
            this._timeline = this._layers = null
        },
        __class__: i.ElementManager,
        __properties__: {
            get_camera: "_getCamera",
            get_elements: "_getElements"
        }
    };
    i.PoolManager = function() {
        this._pools = new F;
        this._flagAllPoolsFull = !1;
        this._numPools = 0
    };
    k["com.workinman.display.PoolManager"] = i.PoolManager;
    i.PoolManager.__name__ = ["com", "workinman", "display", "PoolManager"];
    i.PoolManager.prototype = {
        createElement: function(a, b) {
            if (!1 == this._pools.exists(a)) return f.WorkinCloud.instance.log("[PoolManager](createElement) Can't create element from pool '" + a + "' it doesn't exist!"), null;
            var e = this._pools.get(a).getElement();
            e.renew(b);
            return e
        },
        addPool: function(a, b, e, c) {
            null == c && (c = !1);
            null == e && (e = 8);
            this._pools.exists(a) ? this._pools.get(a).changeCount(e, c) : (this._flagAllPoolsFull = !1, b = new i.PoolData(b, e, c, this._numPools), this._pools.set(a,
                b), this._numPools++)
        },
        update: function(a) {
            if (!this._flagAllPoolsFull) {
                this._flagAllPoolsFull = !0;
                for (var b = this._pools.iterator(); b.hasNext();) {
                    var e = b.next();
                    e._getIsPoolFull() || (this._flagAllPoolsFull = !1, e.update(a))
                }
                this._flagAllPoolsFull && f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(i.PoolManager.ALL_POOLS_FULL))
            }
        },
        dispose: function() {
            for (var a = this._pools.iterator(); a.hasNext();) a.next().dispose();
            this._pools = null
        },
        __class__: i.PoolManager
    };
    i.PoolData = function(a, b, e, c) {
        null ==
            c && (c = 0);
        null == e && (e = !1);
        this._AVERAGE_DELAY_BETWEEN_CREATE_ELEMENTS = 0.8;
        this._MAX_ELEMENTS_TO_CREATE_AT_ONCE = 8;
        this._elements = [];
        this._class = a;
        this._poolProgress = 0;
        this._flagPoolFull = !0;
        this._timerUpdateCreateElements = 0;
        this._timerOffset = c;
        this.changeCount(b, e)
    };
    k["com.workinman.display.PoolData"] = i.PoolData;
    i.PoolData.__name__ = ["com", "workinman", "display", "PoolData"];
    i.PoolData.prototype = {
        dispose: function() {
            for (var a = 0; a < this._elements.length;) this._elements[a]._setIsPooled(!1), this._elements[a].dispose(),
                a++;
            this._class = this._elements = null
        },
        _addPoolElements: function(a) {
            null == a && (a = !0);
            for (var b = 0; this._poolProgress < this._poolElementsToAdd && (!a || b < this._MAX_ELEMENTS_TO_CREATE_AT_ONCE);) b++, this._poolProgress++, this._elements.push(N.createInstance(this._class, [{
                pooled: !0
            }]));
            this._poolProgress < this._poolElementsToAdd ? this._timerUpdateCreateElements = this._AVERAGE_DELAY_BETWEEN_CREATE_ELEMENTS + 0.2 * this._timerOffset : (this._timerUpdateCreateElements = 0, this._flagPoolFull = !0)
        },
        update: function(a) {
            this._flagPoolFull ||
                (this._timerUpdateCreateElements -= a, 0 >= this._timerUpdateCreateElements && this._addPoolElements())
        },
        changeCount: function(a, b) {
            null == b && (b = !0);
            a != this._elements.length && (this._poolElementsToAdd = this._poolProgress = 0, this._timerUpdateCreateElements = this._AVERAGE_DELAY_BETWEEN_CREATE_ELEMENTS + 0.2 * this._timerOffset, this._elements.length < a ? (this._flagPoolFull = !1, this._poolElementsToAdd = a - this._elements.length, b && this._addPoolElements(!1)) : this._flagPoolFull = !0)
        },
        getElement: function(a) {
            null == a && (a = !1);
            for (var b =
                    0; b < this._elements.length;) {
                if (!this._elements[b]._getIsActive()) return a = this._elements[b], this._elements.splice(b, 1), this._elements.push(a), a;
                b++
            }
            if (a) return this.changeCount(this._elements.length + 1, !0), this._elements[this._elements.length - 1];
            a = this._elements[0];
            this._elements.splice(0, 1);
            a.release();
            this._elements.push(a);
            return a
        },
        _getIsPoolFull: function() {
            return this._flagPoolFull
        },
        __class__: i.PoolData,
        __properties__: {
            get_isPoolFull: "_getIsPoolFull"
        }
    };
    i.Renderable = function(a, b) {
        null == b && (b = 1);
        null == a && (a = 1);
        this.rotation = this.y = this.x = 0;
        this.scaleY = this.scaleX = 1;
        this.width = a;
        this.height = b;
        this.alpha = 1;
        this.visible = !0
    };
    k["com.workinman.display.Renderable"] = i.Renderable;
    i.Renderable.__name__ = ["com", "workinman", "display", "Renderable"];
    i.Renderable.prototype = {
        __class__: i.Renderable
    };
    i.TextBase = function(a, b, e, c, d) {
        null == c && (c = "");
        null == d && (d = {});
        d.x = a;
        d.y = b;
        i.Element.call(this, d);
        "" == c && (c = C.ConstantsCloud.FONT_DEFAULT);
        this._textString = e;
        this._fontName = c;
        this._spacing = d.spacing ? d.spacing :
            0;
        this._width = d.width ? d.width : Math.POSITIVE_INFINITY;
        this._flagCenter = d.center ? d.center : !1;
        this._textDisplay = [];
        this._textDisplay.push(new o.TextSprite(f.WorkinCloud.instance._getAssets().getFont(this._fontName), ""));
        this.swapTexture(this._textDisplay[0]);
        this._textDisplay[0].set_pointerEnabled(!1);
        this.renderPositionWithoutCamera()
    };
    k["com.workinman.display.TextBase"] = i.TextBase;
    i.TextBase.__name__ = ["com", "workinman", "display", "TextBase"];
    i.TextBase.__super__ = i.Element;
    i.TextBase.prototype = t(i.Element.prototype, {
        _cleanUp: function() {
            for (; 1 < this._textDisplay.length;) this._textureEntity.removeChild(this._textDisplay.pop()._getEntity())
        },
        dispose: function() {
            this._textDisplay = null;
            i.Element.prototype.dispose.call(this)
        },
        _renderTextToDisplay: function() {
            this._textDisplay[0].set_text(this._textString);
            this.setOrigin(this._renderOrigin)
        },
        _renderFontToDisplay: function() {
            for (var a = 0, b = this._textDisplay; a < b.length;) {
                var e = b[a];
                ++a;
                e.set_font(f.WorkinCloud.instance._getAssets().getFont(this._fontName))
            }
        },
        _setText: function(a) {
            this._textString =
                a;
            this._renderTextToDisplay();
            return this._textString
        },
        _getText: function() {
            return this._textString
        },
        _setFont: function(a) {
            if ("" == a) return "";
            this._fontName = a;
            this._renderFontToDisplay();
            return this._fontName
        },
        _getFont: function() {
            return this._fontName
        },
        _updateTextDisplay: function(a, b) {
            null == b && (b = 1);
            this._cleanUp();
            if ("" == a) this._textDisplay[0].set_text(a);
            else {
                for (var a = R.replace(a, "<br>", "\\r\\n"), e = [], c = this._textDisplay[0]._font.getGlyphs(a), d = 0, g = 0, h = 0; g < c.length;) {
                    var i = c[g];
                    g++;
                    if (g == c.length) d +=
                        i.width * b;
                    else if (d += i.xAdvance * b + i.getKerning(c[g].charCode) * b, g < c.length - 1 && (92 == c[g - 1].charCode || 47 == c[g - 1].charCode) && 114 == c[g].charCode && (92 == c[g + 1].charCode || 47 == c[g + 1].charCode) && 110 == c[g + 2].charCode) d = g - 1, e.push(a.substring(h, d)), h = d + 4, d = 0;
                    d >= this._width / this._render.scaleX && (i = !0, d = a.lastIndexOf(" ", g), -1 == d ? (i = !1, d = g - 1) : d++, e.push(a.substring(h, d) + (i ? "" : "-")), h = d, d = 0);
                    g == c.length && e.push(a.substring(h, g))
                }
                this._textDisplay[0].set_text(e.shift());
                this._texture.x.set__(-(this._renderOrigin.x *
                    this._textDisplay[0].getNaturalWidth()));
                this._texture.y.set__(-(this._renderOrigin.y * this._textDisplay[0].getNaturalHeight()));
                for (c = 0; c < e.length;) g = e[c], ++c, this._textDisplay.push(new o.TextSprite(f.WorkinCloud.instance._getAssets().getFont(this._fontName), g)), this.addTextDisplay(this._textDisplay[this._textDisplay.length - 1])
            }
        },
        addTextDisplay: function(a) {
            this._flagCenter && a.x.set__(this._renderOrigin.x * (this._texture.getNaturalWidth() - a.getNaturalWidth()));
            a.y.set__(this._render.height + a.getNaturalHeight() +
                this._spacing);
            this._render.height += a.getNaturalHeight() + this._spacing;
            this._render.width = Math.max(this._render.width, a.getNaturalWidth());
            this._textureEntity.addChild((new M).add(a))
        },
        _getTextDisplay: function() {
            return this._textDisplay
        },
        __class__: i.TextBase,
        __properties__: t(i.Element.prototype.__properties__, {
            set_font: "_setFont",
            get_font: "_getFont",
            set_text: "_setText",
            get_text: "_getText"
        })
    });
    i.TextLocalized = function(a, b, e, c, d) {
        null == c && (c = "");
        i.TextBase.call(this, a, b, e, c, d);
        this._renderTextToDisplay()
    };
    k["com.workinman.display.TextLocalized"] = i.TextLocalized;
    i.TextLocalized.__name__ = ["com", "workinman", "display", "TextLocalized"];
    i.TextLocalized.__super__ = i.TextBase;
    i.TextLocalized.prototype = t(i.TextBase.prototype, {
        setOrigin: function(a) {
            this._renderOrigin.toPoint(a);
            this._texture.x.set__(-(this._renderOrigin.x * this._render.width));
            this._texture.y.set__(-(this._renderOrigin.y * this._render.height))
        },
        _renderTextToDisplay: function() {
            var a = f.WorkinCloud.instance._getLocalize().getData(this._textString);
            this._renderOffset.x = a._getOffsetX();
            this._renderOffset.y = a._getOffsetY();
            this._render.scaleX = a._getScale();
            this._render.scaleY = a._getScale();
            this._getRenderable().rotation = a.get_rotation();
            a._getFontName() != this._fontName && this._setFont(a._getFontName());
            this._updateTextDisplay(f.WorkinCloud.instance._getLocalize().getData(this._textString)._getString());
            1 == this._textDisplay.length && (this._render.width = this._textDisplay[0].getNaturalWidth(), this._render.height = this._textDisplay[0].getNaturalHeight());
            this._flagCenter || this.setOrigin(this._renderOrigin);
            this.renderPositionWithoutCamera()
        },
        __class__: i.TextLocalized
    });
    m.WMEvent = function(a) {
        this._eventId = a
    };
    k["com.workinman.events.WMEvent"] = m.WMEvent;
    m.WMEvent.__name__ = ["com", "workinman", "events", "WMEvent"];
    m.WMEvent.prototype = {
        getEventId: function() {
            return this._eventId
        },
        __class__: m.WMEvent,
        __properties__: {
            get_eventId: "getEventId"
        }
    };
    m.WMEventData = function(a, b) {
        m.WMEvent.call(this, a);
        this._data = b
    };
    k["com.workinman.events.WMEventData"] = m.WMEventData;
    m.WMEventData.__name__ = ["com", "workinman", "events", "WMEventData"];
    m.WMEventData.__super__ = m.WMEvent;
    m.WMEventData.prototype = t(m.WMEvent.prototype, {
        _getData: function() {
            return this._data
        },
        __class__: m.WMEventData,
        __properties__: t(m.WMEvent.prototype.__properties__, {
            get_data: "_getData"
        })
    });
    m._WMEventDispatcher = {};
    m._WMEventDispatcher.WMEventTracker = function() {
        this._signalConnection = [];
        this._signal = new n.Signal1
    };
    k["com.workinman.events._WMEventDispatcher.WMEventTracker"] = m._WMEventDispatcher.WMEventTracker;
    m._WMEventDispatcher.WMEventTracker.__name__ = ["com", "workinman", "events", "_WMEventDispatcher", "WMEventTracker"];
    m._WMEventDispatcher.WMEventTracker.prototype = {
        dispose: function() {
            this._signal = null;
            for (var a = 0, b = this._signalConnection; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
            this._signalConnection = null
        },
        isEmtpy: function() {
            return null == this._signal._head
        },
        dispatchEvent: function(a) {
            this._signal.emit1(a)
        },
        removeEventListener: function(a) {
            for (var b = this._signalConnection.length; 0 < b;) b--, L.compareMethods(this._signalConnection[b]._getListener(),
                a) && (this._signalConnection[b].dispose(), this._signalConnection.splice(b, 1))
        },
        addEventListener: function(a) {
            this._signalConnection.push(new m._WMEventDispatcher.SignalTracker(a, this._signal.connect(a)))
        },
        __class__: m._WMEventDispatcher.WMEventTracker
    };
    m._WMEventDispatcher.SignalTracker = function(a, b) {
        this._function = a;
        this._connection = b
    };
    k["com.workinman.events._WMEventDispatcher.SignalTracker"] = m._WMEventDispatcher.SignalTracker;
    m._WMEventDispatcher.SignalTracker.__name__ = ["com", "workinman", "events",
        "_WMEventDispatcher", "SignalTracker"
    ];
    m._WMEventDispatcher.SignalTracker.prototype = {
        _getListener: function() {
            return this._function
        },
        dispose: function() {
            this._function = null;
            this._connection.dispose();
            this._connection = null
        },
        __class__: m._WMEventDispatcher.SignalTracker,
        __properties__: {
            get_listener: "_getListener"
        }
    };
    m.WMEventFlow = function(a, b) {
        null == b && (b = !1);
        this.flowId = a;
        this.targetScreen = b;
        m.WMEvent.call(this, m.WMEventFlow.EVENT_FLOW)
    };
    k["com.workinman.events.WMEventFlow"] = m.WMEventFlow;
    m.WMEventFlow.__name__ = ["com", "workinman", "events", "WMEventFlow"];
    m.WMEventFlow.__super__ = m.WMEvent;
    m.WMEventFlow.prototype = t(m.WMEvent.prototype, {
        __class__: m.WMEventFlow
    });
    m.WMEventInput = function(a, b, e, c, d) {
        null == d && (d = -1);
        m.WMEvent.call(this, m.WMEventInput.EVENT_INPUT);
        this.phase = a;
        this.input = b;
        this.x = e;
        this.y = c;
        this.swipe = d
    };
    k["com.workinman.events.WMEventInput"] = m.WMEventInput;
    m.WMEventInput.__name__ = ["com", "workinman", "events", "WMEventInput"];
    m.WMEventInput.__super__ = m.WMEvent;
    m.WMEventInput.prototype = t(m.WMEvent.prototype, {
        __class__: m.WMEventInput
    });
    m.WMEventInterfaceChange = function(a, b, e) {
        null == b && (b = "");
        this.flowId = a;
        this.screenId = b;
        null == e && (e = new F);
        this.customData = e;
        m.WMEvent.call(this, m.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT)
    };
    k["com.workinman.events.WMEventInterfaceChange"] = m.WMEventInterfaceChange;
    m.WMEventInterfaceChange.__name__ = ["com", "workinman", "events", "WMEventInterfaceChange"];
    m.WMEventInterfaceChange.__super__ = m.WMEvent;
    m.WMEventInterfaceChange.prototype = t(m.WMEvent.prototype, {
        __class__: m.WMEventInterfaceChange
    });
    m.WMEventScreenOut = function(a, b) {
        this.flowId = a;
        this.screenId = b;
        m.WMEvent.call(this, m.WMEventScreenOut.EVENT_SCREEN_OUTPUT)
    };
    k["com.workinman.events.WMEventScreenOut"] = m.WMEventScreenOut;
    m.WMEventScreenOut.__name__ = ["com", "workinman", "events", "WMEventScreenOut"];
    m.WMEventScreenOut.__super__ = m.WMEvent;
    m.WMEventScreenOut.prototype = t(m.WMEvent.prototype, {
        __class__: m.WMEventScreenOut
    });
    m.WMEventUpdate = function(a) {
        m.WMEvent.call(this, m.WMEventUpdate.EVENT_UPDATE);
        this._dt = a
    };
    k["com.workinman.events.WMEventUpdate"] =
        m.WMEventUpdate;
    m.WMEventUpdate.__name__ = ["com", "workinman", "events", "WMEventUpdate"];
    m.WMEventUpdate.__super__ = m.WMEvent;
    m.WMEventUpdate.prototype = t(m.WMEvent.prototype, {
        getDt: function() {
            return this._dt
        },
        __class__: m.WMEventUpdate,
        __properties__: t(m.WMEvent.prototype.__properties__, {
            get_dt: "getDt"
        })
    });
    g = {
        InterceptResult: function() {}
    };
    k["com.workinman.math.InterceptResult"] = g.InterceptResult;
    g.InterceptResult.__name__ = ["com", "workinman", "math", "InterceptResult"];
    g.InterceptResult.prototype = {
        _setLine2: function(a) {
            return this._line2 =
                a
        },
        _getLine2: function() {
            return this._line2
        },
        _setLine1: function(a) {
            return this._line1 = a
        },
        _getLine1: function() {
            return this._line1
        },
        _setResult: function(a) {
            return this._result = a
        },
        _getResult: function() {
            return this._result
        },
        _setSuccess: function(a) {
            return this._success = a
        },
        _getSuccess: function() {
            return this._success
        },
        __class__: g.InterceptResult
    };
    g.WorkinCamera = function(a, b) {
        this._screenCenterX = a;
        this._screenCenterY = b;
        this._pos = new g.WorkinPoint(a, b)
    };
    k["com.workinman.math.WorkinCamera"] = g.WorkinCamera;
    g.WorkinCamera.__name__ = ["com", "workinman", "math", "WorkinCamera"];
    g.WorkinCamera.prototype = {
        _getScreenCenterY: function() {
            return this._screenCenterY
        },
        _getScreenCenterX: function() {
            return this._screenCenterX
        },
        _getPos: function() {
            return this._pos
        },
        dispose: function() {
            this._pos = null
        },
        __class__: g.WorkinCamera,
        __properties__: {
            get_pos: "_getPos",
            get_screenCenterX: "_getScreenCenterX",
            get_screenCenterY: "_getScreenCenterY"
        }
    };
    g.WorkinLine = function(a, b) {
        this._p0 = null == a ? new g.WorkinPoint : a.copy();
        this._p1 = null == b ? new g.WorkinPoint : b.copy();
        this._normal = new g.WorkinPoint;
        this._calcProperties()
    };
    k["com.workinman.math.WorkinLine"] = g.WorkinLine;
    g.WorkinLine.__name__ = ["com", "workinman", "math", "WorkinLine"];
    g.WorkinLine.prototype = {
        _calcProperties: function() {
            this._length = Math.round(1E3 * Math.sqrt((this._p0.x - this._p1.x) * (this._p0.x - this._p1.x) + (this._p0.y - this._p1.y) * (this._p0.y - this._p1.y))) / 1E3;
            this._vector = new g.WorkinPoint(this._getP1().x - this._getP0().x, this._getP1().y - this._getP0().y);
            this._slope = this._vector.y / this._vector.x;
            0 == this._getVector().x &&
                (this._slope = 1E5);
            this._yIntercept = this._getP0().y - this._slope * this._getP0().x;
            this._parametricDenom = new g.WorkinPoint(this._getP1().x - this._getP0().x, this._getP1().y - this._getP0().y);
            this._vector.pseudoCross(this._normal);
            this._normal.normalize()
        },
        endToPoint: function(a) {
            this._p1.toPoint(a);
            this._calcProperties()
        },
        endTo: function(a, b, e) {
            null == e && (e = 0);
            this._p1.to(a, b, e);
            this._calcProperties()
        },
        originToPoint: function(a) {
            this._p0.toPoint(a);
            this._calcProperties()
        },
        originTo: function(a, b, e) {
            null == e && (e =
                0);
            this._p0.to(a, b, e);
            this._calcProperties()
        },
        to: function(a, b) {
            this._p0.toPoint(a);
            this._p1.toPoint(b);
            this._calcProperties()
        },
        copy: function() {
            return new g.WorkinLine(this._p0, this._p1)
        },
        _setLength: function(a) {
            if (0 == this._getLength()) return this._length;
            this._p1 = new g.WorkinPoint(this._p0.x + this._vector.x * (a / this._getLength()), this._p0.y + this._vector.y * (a / this._getLength()));
            this._calcProperties();
            return this._length
        },
        _getLength: function() {
            return this._length
        },
        _getParametricDenom: function() {
            return this._parametricDenom
        },
        _getCenterY: function() {
            return this._p0.y + this._vector.y / 2
        },
        _getCenterX: function() {
            return this._p0.x + this._vector.x / 2
        },
        _getCenter: function() {
            return new g.WorkinPoint(this._p0.x + this._vector.x / 2, this._p0.y + this._vector.y / 2)
        },
        _getVector: function() {
            return this._vector
        },
        _getNormal: function() {
            return this._normal
        },
        _getYIntercept: function() {
            return this._yIntercept
        },
        _getSlope: function() {
            return this._slope
        },
        _getP1: function() {
            return this._p1
        },
        _getP0: function() {
            return this._p0
        },
        dispose: function() {
            this._parametricDenom =
                this._vector = this._normal = this._p1 = this._p0 = null
        },
        __class__: g.WorkinLine,
        __properties__: {
            get_p0: "_getP0",
            get_p1: "_getP1",
            get_vector: "_getVector",
            set_length: "_setLength",
            get_length: "_getLength"
        }
    };
    g.WorkinMath = function() {};
    k["com.workinman.math.WorkinMath"] = g.WorkinMath;
    g.WorkinMath.__name__ = ["com", "workinman", "math", "WorkinMath"];
    g.WorkinMath.diffBetweenPoints = function(a, b) {
        return new g.WorkinPoint(b.x - a.x, b.y - a.y)
    };
    g.WorkinMath.distBetweenPoints = function(a, b) {
        return Math.abs(Math.sqrt((a.x - b.x) * (a.x -
            b.x) + (a.y - b.y) * (a.y - b.y)))
    };
    g.WorkinMath.radToDeg = function(a) {
        return 180 * a / Math.PI
    };
    g.WorkinMath.getAngleFromTwoPoints = function(a, b) {
        return g.WorkinMath.radToDeg(Math.atan2(a.y - b.y, a.x - b.x))
    };
    g.WorkinPoint = function(a, b, e) {
        null == e && (e = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = Math.round(1E3 * a) / 1E3;
        this.y = Math.round(1E3 * b) / 1E3;
        this.z = Math.round(1E3 * e) / 1E3;
        this.calculateLength()
    };
    k["com.workinman.math.WorkinPoint"] = g.WorkinPoint;
    g.WorkinPoint.__name__ = ["com", "workinman", "math", "WorkinPoint"];
    g.WorkinPoint.prototype = {
        _getNormalizedMagnitude: function() {
            var a = this.normalizeCopy();
            return Math.sqrt(a.x * a.x + a.y * a.y)
        },
        calculateLength: function() {
            this._length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        },
        pseudoCross: function(a) {
            a.to(this.y, -this.x, this.z)
        },
        normalizeCopy: function() {
            return 0 == this._length ? new g.WorkinPoint(0, 0, 0) : new g.WorkinPoint(this.x / this._length, this.y / this._length, this.z / this._length)
        },
        normalize: function() {
            0 != this._length && (this.x /= this._length, this.y /= this._length, this.z /= this._length, this.calculateLength())
        },
        _setLength: function(a) {
            if (0 == this._length || 0 >= a) return this.to(0, 0), this._length;
            this.multiply(a / this._length);
            return this._length
        },
        _getLength: function() {
            return this._length
        },
        copy: function() {
            return new g.WorkinPoint(this.x, this.y, this.z)
        },
        multiply: function(a) {
            this.x *= a;
            this.y *= a;
            this.z *= a;
            this.clean();
            this.calculateLength()
        },
        subtractPoint: function(a) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            this.calculateLength()
        },
        toPoint: function(a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            this.calculateLength()
        },
        to: function(a,
            b, e) {
            null == e && (e = 0);
            this.x = a;
            this.y = b;
            this.z = e;
            this.calculateLength()
        },
        clean: function() {
            this.x = Math.round(1E3 * this.x) / 1E3;
            this.y = Math.round(1E3 * this.y) / 1E3;
            this.z = Math.round(1E3 * this.z) / 1E3
        },
        _getAngle: function() {
            return 180 * Math.atan2(this.y, this.x) / Math.PI
        },
        __class__: g.WorkinPoint
    };
    g.tween = {};
    g.tween.PennerEasing = function() {};
    k["com.workinman.math.tween.PennerEasing"] = g.tween.PennerEasing;
    g.tween.PennerEasing.__name__ = ["com", "workinman", "math", "tween", "PennerEasing"];
    g.tween.PennerEasing.easeInQuad =
        function(a, b, e, c) {
            return e * (a /= c) * a + b
        };
    g.tween.PennerEasing.easeOutQuad = function(a, b, e, c) {
        return -e * (a /= c) * (a - 2) + b
    };
    g.tween.PennerEasing.easeInOutQuad = function(a, b, e, c) {
        return 1 > (a /= c / 2) ? e / 2 * a * a + b : -e / 2 * (--a * (a - 2) - 1) + b
    };
    g.tween.PennerEasing.easeInExpo = function(a, b, e, c) {
        return 0 == a ? b : e * Math.pow(2, 10 * (a / c - 1)) + b
    };
    g.tween.PennerEasing.easeOutExpo = function(a, b, e, c) {
        return a == c ? b + e : e * (-Math.pow(2, -10 * a / c) + 1) + b
    };
    g.tween.PennerEasing.easeInOutExpo = function(a, b, e, c) {
        return 0 == a ? b : a == c ? b + e : 1 > (a /= c / 2) ? e / 2 * Math.pow(2,
            10 * (a - 1)) + b : e / 2 * (-Math.pow(2, -10 * --a) + 2) + b
    };
    g.tween.PennerEasing.easeInElastic = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInElasticL(a, b, e, c)
    };
    g.tween.PennerEasing.easeInElasticL = function(a, b, e, c, d, f) {
        null == f && (f = -0.123456);
        null == d && (d = -0.123456);
        if (0 == a) return b;
        if (1 == (a /= c)) return b + e; - 0.123456 == f && (f = 0.3 * c); - 0.123456 == d || d < Math.abs(e) ? (d = e, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(e / d);
        return -(d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * c - e) * 2 * Math.PI / f)) + b
    };
    g.tween.PennerEasing.easeOutElastic = function(a,
        b, e, c) {
        return g.tween.PennerEasing.easeOutElasticL(a, b, e, c)
    };
    g.tween.PennerEasing.easeOutElasticL = function(a, b, e, c, d, f) {
        null == f && (f = -0.123456);
        null == d && (d = -0.123456);
        var g;
        if (0 == a) return b;
        if (1 == (a /= c)) return b + e; - 0.123456 == f && (f = 0.3 * c); - 0.123456 == d || d < Math.abs(e) ? (d = e, g = f / 4) : g = f / (2 * Math.PI) * Math.asin(e / d);
        return d * Math.pow(2, -10 * a) * Math.sin((a * c - g) * 2 * Math.PI / f) + e + b
    };
    g.tween.PennerEasing.easeInOutElastic = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutElasticL(a, b, e, c)
    };
    g.tween.PennerEasing.easeInOutElasticL =
        function(a, b, e, c, d, f) {
            null == f && (f = -0.123456);
            null == d && (d = -0.123456);
            var g;
            if (0 == a) return b;
            if (2 == (a /= c / 2)) return b + e; - 0.123456 == f && (f = c * 0.3 * 1.5); - 0.123456 == d || d < Math.abs(e) ? (d = e, g = f / 4) : g = f / (2 * Math.PI) * Math.asin(e / d);
            return 1 > a ? -0.5 * d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * c - g) * 2 * Math.PI / f) + b : 0.5 * d * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * c - g) * 2 * Math.PI / f) + e + b
        };
    g.tween.PennerEasing.easeInBack = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInBackL(a, b, e, c)
    };
    g.tween.PennerEasing.easeInBackL = function(a, b, e, c,
        d) {
        null == d && (d = -0.123456); - 0.123456 == d && (d = 1.70158);
        return e * (a /= c) * a * ((d + 1) * a - d) + b
    };
    g.tween.PennerEasing.easeInOutBack = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutBackL(a, b, e, c)
    };
    g.tween.PennerEasing.easeInOutBackL = function(a, b, e, c, d) {
        null == d && (d = -0.123456); - 0.123456 == d && (d = 1.70158);
        return 1 > (a /= c / 2) ? e / 2 * a * a * (((d *= 1.525) + 1) * a - d) + b : e / 2 * ((a -= 2) * a * (((d *= 1.525) + 1) * a + d) + 2) + b
    };
    g.tween.PennerEasing.easeOutBounce = function(a, b, e, c) {
        return (a /= c) < 1 / 2.75 ? e * 7.5625 * a * a + b : a < 2 / 2.75 ? e * (7.5625 * (a -= 1.5 /
            2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? e * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : e * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
    };
    g.tween.PennerEasing.easeInBounce = function(a, b, e, c) {
        return e - g.tween.PennerEasing.easeOutBounce(c - a, 0, e, c) + b
    };
    g.tween.PennerEasing.easeInOutBounce = function(a, b, e, c) {
        return a < c / 2 ? 0.5 * g.tween.PennerEasing.easeInBounce(2 * a, 0, e, c) + b : 0.5 * g.tween.PennerEasing.easeOutBounce(2 * a - c, 0, e, c) + 0.5 * e + b
    };
    g.tween.PennerEasing.easeInCubic = function(a, b, e, c) {
        return e * (a /= c) * a * a + b
    };
    g.tween.PennerEasing.easeOutCubic =
        function(a, b, e, c) {
            return e * ((a = a / c - 1) * a * a + 1) + b
        };
    g.tween.PennerEasing.easeInOutCubic = function(a, b, e, c) {
        return 1 > (a /= c / 2) ? e / 2 * a * a * a + b : e / 2 * ((a -= 2) * a * a + 2) + b
    };
    g.tween.PennerEasing.easeInQuart = function(a, b, e, c) {
        return e * (a /= c) * a * a * a + b
    };
    g.tween.PennerEasing.easeOutQuart = function(a, b, e, c) {
        return -e * ((a = a / c - 1) * a * a * a - 1) + b
    };
    g.tween.PennerEasing.easeInOutQuart = function(a, b, e, c) {
        return 1 > (a /= c / 2) ? e / 2 * a * a * a * a + b : -e / 2 * ((a -= 2) * a * a * a - 2) + b
    };
    g.tween.PennerEasing.easeInQuint = function(a, b, e, c) {
        return e * (a /= c) * a * a * a * a + b
    };
    g.tween.PennerEasing.easeOutQuint = function(a, b, e, c) {
        return e * ((a = a / c - 1) * a * a * a * a + 1) + b
    };
    g.tween.PennerEasing.easeInOutQuint = function(a, b, e, c) {
        return 1 > (a /= c / 2) ? e / 2 * a * a * a * a * a + b : e / 2 * ((a -= 2) * a * a * a * a + 2) + b
    };
    g.tween.PennerEasing.easeInSine = function(a, b, e, c) {
        return -e * Math.cos(a / c * (Math.PI / 2)) + e + b
    };
    g.tween.PennerEasing.easeOutSine = function(a, b, e, c) {
        return e * Math.sin(a / c * (Math.PI / 2)) + b
    };
    g.tween.PennerEasing.easeInOutSine = function(a, b, e, c) {
        return -e / 2 * (Math.cos(Math.PI * a / c) - 1) + b
    };
    g.tween.PennerEasing.easeInCirc =
        function(a, b, e, c) {
            return -e * (Math.sqrt(1 - (a /= c) * a) - 1) + b
        };
    g.tween.PennerEasing.easeOutCirc = function(a, b, e, c) {
        return e * Math.sqrt(1 - (a = a / c - 1) * a) + b
    };
    g.tween.PennerEasing.easeInOutCirc = function(a, b, e, c) {
        return 1 > (a /= c / 2) ? -e / 2 * (Math.sqrt(1 - a * a) - 1) + b : e / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
    };
    g.tween.PennerManager = function() {};
    k["com.workinman.math.tween.PennerManager"] = g.tween.PennerManager;
    g.tween.PennerManager.__name__ = ["com", "workinman", "math", "tween", "PennerManager"];
    g.tween.PennerManager.getEaseFunction = function(a) {
        switch (a) {
            case g.tween.PennerManager.EASE_IN:
            case g.tween.PennerManager.EASE_QUAD_IN:
                return g.tween.PennerManager._tweenEaseIn;
            case g.tween.PennerManager.EASE_OUT:
            case g.tween.PennerManager.EASE_QUAD_OUT:
                return g.tween.PennerManager._tweenEaseOut;
            case g.tween.PennerManager.EASE:
            case g.tween.PennerManager.EASE_QUAD:
                return g.tween.PennerManager._tweenEaseBoth;
            case g.tween.PennerManager.EASE_EXPO:
                return g.tween.PennerManager._tweenExpoBoth;
            case g.tween.PennerManager.EASE_EXPO_IN:
                return g.tween.PennerManager._tweenExpoIn;
            case g.tween.PennerManager.EASE_EXPO_OUT:
                return g.tween.PennerManager._tweenExpoOut;
            case g.tween.PennerManager.EASE_ELASTIC:
                return g.tween.PennerManager._tweenElasticBoth;
            case g.tween.PennerManager.EASE_ELASTIC_IN:
                return g.tween.PennerManager._tweenElasticIn;
            case g.tween.PennerManager.EASE_ELASTIC_OUT:
                return g.tween.PennerManager._tweenElasticOut;
            case g.tween.PennerManager.EASE_BUMP:
                return g.tween.PennerManager._tweenBumpBoth;
            case g.tween.PennerManager.EASE_BUMP_IN:
                return g.tween.PennerManager._tweenBumpIn;
            case g.tween.PennerManager.EASE_BUMP_OUT:
                return g.tween.PennerManager._tweenBumpBoth;
            case g.tween.PennerManager.EASE_BOUNCE:
                return g.tween.PennerManager._tweenBounceBoth;
            case g.tween.PennerManager.EASE_BOUNCE_IN:
                return g.tween.PennerManager._tweenBounceIn;
            case g.tween.PennerManager.EASE_BOUNCE_OUT:
                return g.tween.PennerManager._tweenBounceOut;
            case g.tween.PennerManager.EASE_CUBIC:
                return g.tween.PennerManager._tweenCubicBoth;
            case g.tween.PennerManager.EASE_CUBIC_IN:
                return g.tween.PennerManager._tweenCubicIn;
            case g.tween.PennerManager.EASE_CUBIC_OUT:
                return g.tween.PennerManager._tweenCubicOut;
            case g.tween.PennerManager.EASE_SPACE:
                return g.tween.PennerManager._tweenSpaceBoth;
            case g.tween.PennerManager.EASE_SPACE_IN:
                return g.tween.PennerManager._tweenSpaceIn;
            case g.tween.PennerManager.EASE_SPACE_OUT:
                return g.tween.PennerManager._tweenSpaceOut;
            case g.tween.PennerManager.EASE_BLAST:
                return g.tween.PennerManager._tweenBlastBoth;
            case g.tween.PennerManager.EASE_BLAST_IN:
                return g.tween.PennerManager._tweenBlastIn;
            case g.tween.PennerManager.EASE_BLAST_OUT:
                return g.tween.PennerManager._tweenBlastOut;
            case g.tween.PennerManager.EASE_WAVE:
                return g.tween.PennerManager._tweenWaveBoth;
            case g.tween.PennerManager.EASE_WAVE_IN:
                return g.tween.PennerManager._tweenWaveIn;
            case g.tween.PennerManager.EASE_WAVE_OUT:
                return g.tween.PennerManager._tweenWaveOut;
            case g.tween.PennerManager.EASE_CIRCLE:
                return g.tween.PennerManager._tweenCircleBoth;
            case g.tween.PennerManager.EASE_CIRCLE_IN:
                return g.tween.PennerManager._tweenCircleIn;
            case g.tween.PennerManager.EASE_CIRCLE_OUT:
                return g.tween.PennerManager._tweenCircleOut;
            case g.tween.PennerManager.EASE_LINEAR:
                return g.tween.PennerManager._tweenLinear;
            default:
                return g.tween.PennerManager._tweenLinear
        }
    };
    g.tween.PennerManager._tweenLinear = function(a, b, e, c) {
        return a + e / c * b
    };
    g.tween.PennerManager._tweenEaseBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutQuad(e, a, b, c)
    };
    g.tween.PennerManager._tweenEaseIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInQuad(e, a, b, c)
    };
    g.tween.PennerManager._tweenEaseOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutQuad(e, a, b, c)
    };
    g.tween.PennerManager._tweenExpoBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutExpo(e,
            a, b, c)
    };
    g.tween.PennerManager._tweenExpoIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInExpo(e, a, b, c)
    };
    g.tween.PennerManager._tweenExpoOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutExpo(e, a, b, c)
    };
    g.tween.PennerManager._tweenElasticBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutElastic(e, a, b, c)
    };
    g.tween.PennerManager._tweenElasticIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInElastic(e, a, b, c)
    };
    g.tween.PennerManager._tweenElasticOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutElastic(e,
            a, b, c)
    };
    g.tween.PennerManager._tweenBumpBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutBack(e, a, b, c)
    };
    g.tween.PennerManager._tweenBumpIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInBack(e, a, b, c)
    };
    g.tween.PennerManager._tweenBounceBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutBounce(e, a, b, c)
    };
    g.tween.PennerManager._tweenBounceIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInBounce(e, a, b, c)
    };
    g.tween.PennerManager._tweenBounceOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutBounce(e,
            a, b, c)
    };
    g.tween.PennerManager._tweenCubicBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutCubic(e, a, b, c)
    };
    g.tween.PennerManager._tweenCubicIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInCubic(e, a, b, c)
    };
    g.tween.PennerManager._tweenCubicOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutCubic(e, a, b, c)
    };
    g.tween.PennerManager._tweenSpaceBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutQuart(e, a, b, c)
    };
    g.tween.PennerManager._tweenSpaceIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInQuart(e,
            a, b, c)
    };
    g.tween.PennerManager._tweenSpaceOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutQuart(e, a, b, c)
    };
    g.tween.PennerManager._tweenBlastBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutQuint(e, a, b, c)
    };
    g.tween.PennerManager._tweenBlastIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInQuint(e, a, b, c)
    };
    g.tween.PennerManager._tweenBlastOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutQuint(e, a, b, c)
    };
    g.tween.PennerManager._tweenWaveBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutSine(e,
            a, b, c)
    };
    g.tween.PennerManager._tweenWaveIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInSine(e, a, b, c)
    };
    g.tween.PennerManager._tweenWaveOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutSine(e, a, b, c)
    };
    g.tween.PennerManager._tweenCircleBoth = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInOutCirc(e, a, b, c)
    };
    g.tween.PennerManager._tweenCircleIn = function(a, b, e, c) {
        return g.tween.PennerEasing.easeInCirc(e, a, b, c)
    };
    g.tween.PennerManager._tweenCircleOut = function(a, b, e, c) {
        return g.tween.PennerEasing.easeOutCirc(e,
            a, b, c)
    };
    g.tween.WorkinTween = function() {
        m.WMEventDispatcher.call(this);
        this._isRunning = !1;
        this._progress = 0;
        this._tweens = []
    };
    k["com.workinman.math.tween.WorkinTween"] = g.tween.WorkinTween;
    g.tween.WorkinTween.__name__ = ["com", "workinman", "math", "tween", "WorkinTween"];
    g.tween.WorkinTween.__super__ = m.WMEventDispatcher;
    g.tween.WorkinTween.prototype = t(m.WMEventDispatcher.prototype, {
        dispose: function() {
            this.clearTweens();
            this._easingY = this._easingX = this._vector = this._goal = this._start = this._tweens = null;
            m.WMEventDispatcher.prototype.dispose.call(this)
        },
        _tweenComplete: function() {
            this._current.toPoint(this._tweens[0]._getGoal());
            this._tweens.splice(0, 1);
            this._getBoolAllTweensComplete() ? (this.dispatchEvent(new m.WMEvent(g.tween.WorkinTween.EVENT_TWEENS_ALL_COMPLETE)), this.stop()) : (this.dispatchEvent(new m.WMEvent(g.tween.WorkinTween.EVENT_TWEEN_CURRENT_COMPLETE)), this._tweenNew())
        },
        _tweenNew: function() {
            this._start = this._current.copy();
            this._goal = this._tweens[0]._getGoal();
            this._vector = g.WorkinMath.diffBetweenPoints(this._start, this._goal);
            this._easingX =
                g.tween.PennerManager.getEaseFunction(this._tweens[0]._getEaseIdX());
            this._easingY = g.tween.PennerManager.getEaseFunction(this._tweens[0]._getEaseIdY());
            this._dur = this._tweens[0]._getDur();
            this._progress = 0
        },
        update: function(a) {
            this._isRunning && (this._progress += a, this._progress > this._dur && (this._progress = this._dur), this._current.to(this._easingX(this._start.x, this._vector.x, this._progress, this._dur), this._easingY(this._start.y, this._vector.y, this._progress, this._dur)), this._progress == this._dur && this._tweenComplete())
        },
        stop: function() {
            this._isRunning = !1
        },
        start: function() {
            null == this._current || 0 == this._tweens.length || (this._isRunning = !0, 0 == this._progress && this._tweenNew())
        },
        clearTweens: function() {
            this._tweens = [];
            this._progress = 0;
            this._isRunning = !1
        },
        addTween: function(a, b, e, c) {
            null == c && (c = "");
            "" == c && (c = e);
            this._tweens.push(new g.tween.WorkinTweenStep(a.copy(), b, e, c))
        },
        setStartFromPoint: function(a) {
            this.setStart(a.x, a.y)
        },
        setStart: function(a, b) {
            this._current = new g.WorkinPoint(a, b);
            this._isRunning ? this._tweenNew() : this._progress =
                0
        },
        _getBoolCurrentTweenComplete: function() {
            return 1 == this._getProgressRatio()
        },
        _getBoolAllTweensComplete: function() {
            return 0 == this._tweens.length
        },
        _getPrevPos: function() {
            return 0 == this._tweens.length ? new g.WorkinPoint(0, 0) : this._tweens[this._tweens.length - 1]._getGoal()
        },
        _getProgressRatio: function() {
            return this._progress / this._dur
        },
        _getCurrentVector: function() {
            return this._vector
        },
        _getCurrent: function() {
            return this._current
        },
        __class__: g.tween.WorkinTween,
        __properties__: {
            get_current: "_getCurrent",
            get_progressRatio: "_getProgressRatio",
            get_boolAllTweensComplete: "_getBoolAllTweensComplete"
        }
    });
    g.tween.WorkinTweenStep = function(a, b, e, c) {
        this._goal = a;
        this._easeIdX = e;
        this._easeIdY = c;
        this._dur = b
    };
    k["com.workinman.math.tween.WorkinTweenStep"] = g.tween.WorkinTweenStep;
    g.tween.WorkinTweenStep.__name__ = ["com", "workinman", "math", "tween", "WorkinTweenStep"];
    g.tween.WorkinTweenStep.prototype = {
        _getDur: function() {
            return this._dur
        },
        _getEaseIdY: function() {
            return this._easeIdY
        },
        _getEaseIdX: function() {
            return this._easeIdX
        },
        _getGoal: function() {
            return this._goal
        },
        __class__: g.tween.WorkinTweenStep,
        __properties__: {
            get_goal: "_getGoal",
            get_easeIdX: "_getEaseIdX",
            get_easeIdY: "_getEaseIdY",
            get_dur: "_getDur"
        }
    };
    g.tween.WorkinTweener = function() {
        this._targets = []
    };
    k["com.workinman.math.tween.WorkinTweener"] = g.tween.WorkinTweener;
    g.tween.WorkinTweener.__name__ = ["com", "workinman", "math", "tween", "WorkinTweener"];
    g.tween.WorkinTweener.__properties__ = {
        get_instance: "_getInstance"
    };
    g.tween.WorkinTweener._getInstance = function() {
        null == g.tween.WorkinTweener._instance && (g.tween.WorkinTweener._instance =
            new g.tween.WorkinTweener);
        return g.tween.WorkinTweener._instance
    };
    g.tween.WorkinTweener.prototype = {
        stop: function(a) {
            for (var b = this._targets.length; 0 < b;)
                if (b--, this._targets[b]._getTarget() == a) {
                    this._targets[b].clearTweens();
                    this._targets[b]._setIsComplete(!0);
                    break
                }
        },
        tween: function(a, b, e, c, d, f, h, i, j) {
            null == j && (j = !1);
            null == i && (i = "");
            null == h && (h = 0);
            null == f && (f = !1);
            null == d && (d = 0);
            null == c && (c = "linear");
            b = new g.tween._WorkinTweener.WorkinTweenDef(a, b, e, c, d, h, i);
            e = !1;
            c = 0;
            for (d = this._targets; c < d.length;) i =
                d[c], ++c, i._getTarget() == a && (e = !0, f && i.clearTweens(), i.addTween(b, h));
            !1 == e && (a = new g.tween._WorkinTweener.WorkinTweenTracker(a, j), this._targets.push(a), a.addTween(b, h));
            return b
        },
        update: function(a) {
            for (var b = this._targets.length; 0 < b;) b--, this._targets[b].update(a), this._targets[b]._getIsComplete() && (this._targets[b].dispose(), this._targets.splice(b, 1))
        },
        __class__: g.tween.WorkinTweener
    };
    g.tween._WorkinTweener = {};
    g.tween._WorkinTweener.WorkinTweenTracker = function(a, b) {
        this._gameplayPause = b;
        this._target =
            a;
        this._tweens = [];
        this._isComplete = !1
    };
    k["com.workinman.math.tween._WorkinTweener.WorkinTweenTracker"] = g.tween._WorkinTweener.WorkinTweenTracker;
    g.tween._WorkinTweener.WorkinTweenTracker.__name__ = "com,workinman,math,tween,_WorkinTweener,WorkinTweenTracker".split(",");
    g.tween._WorkinTweener.WorkinTweenTracker.prototype = {
        _decrementQueueIndeces: function() {
            for (var a = 0, b = this._tweens; a < b.length;) {
                var e = b[a];
                ++a;
                if (0 == e._getQueueIndex()) return
            }
            a = 0;
            for (b = this._tweens; a < b.length;) {
                e = b[a];
                ++a;
                var c = e,
                    d = c._getQueueIndex();
                c._setQueueIndex(d - 1);
                d;
                0 == e._getQueueIndex() && e.start()
            }
        },
        addTween: function(a) {
            this._tweens.push(a)
        },
        clearTweens: function() {
            for (var a = 0, b = this._tweens; a < b.length;) {
                var e = b[a];
                ++a;
                e._setIsComplete(!0)
            }
        },
        _setGameplayPause: function(a) {
            return this._gameplayPause = a
        },
        _getGameplayPause: function() {
            return this._gameplayPause
        },
        _setIsComplete: function(a) {
            return this._isComplete = a
        },
        _getIsComplete: function() {
            return this._isComplete
        },
        _getTarget: function() {
            return this._target
        },
        _dispatchTweensAllComplete: function(a) {
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(C.ConstantsCloud.EVENT_TWEENS_COMPLETE, {
                target: a
            }))
        },
        update: function(a) {
            if (!this._gameplayPause || !f.WorkinCloud.instance.getBool("bool_paused")) {
                for (var b = this._tweens.length; 0 < b;) b--, 0 == this._tweens[b]._getQueueIndex() && (this._tweens[b].update(a), this._tweens[b]._getIsComplete() && (this._tweens[b].dispose(), this._tweens.splice(b, 1), this._decrementQueueIndeces()));
                1 > this._tweens.length && (this._isComplete = !0, this._dispatchTweensAllComplete(this._target))
            }
        },
        dispose: function() {
            this._target = null;
            for (var a = 0, b = this._tweens; a < b.length;) {
                var e =
                    b[a];
                ++a;
                e.dispose()
            }
            this._tweens = null
        },
        __class__: g.tween._WorkinTweener.WorkinTweenTracker,
        __properties__: {
            get_target: "_getTarget",
            set_isComplete: "_setIsComplete",
            get_isComplete: "_getIsComplete"
        }
    };
    g.tween._WorkinTweener.WorkinTweenDef = function(a, b, e, c, d, f, h) {
        null == h && (h = "");
        null == f && (f = 0);
        null == d && (d = 0);
        null == c && (c = "linear");
        this._id = h;
        this._target = a;
        this._duration = b;
        this._delay = d;
        this._dest = e;
        this._queueIndex = f;
        this._easeFunction = g.tween.PennerManager.getEaseFunction(c);
        this._isComplete = !1;
        this._completionArgs =
            this._completionHandler = null;
        this._progress = 0;
        this._origin = {};
        0 == f && this.start()
    };
    k["com.workinman.math.tween._WorkinTweener.WorkinTweenDef"] = g.tween._WorkinTweener.WorkinTweenDef;
    g.tween._WorkinTweener.WorkinTweenDef.__name__ = "com,workinman,math,tween,_WorkinTweener,WorkinTweenDef".split(",");
    g.tween._WorkinTweener.WorkinTweenDef.prototype = {
        onComplete: function(a, b) {
            null == b && (b = []);
            this._completionHandler = a;
            this._completionArgs = b;
            return this
        },
        ease: function(a) {
            this._easeFunction = g.tween.PennerManager.getEaseFunction(a);
            return this
        },
        delay: function(a) {
            this._delay = a;
            return this
        },
        _getId: function() {
            return this._id
        },
        _setQueueIndex: function(a) {
            return this._queueIndex = a
        },
        _getQueueIndex: function() {
            return this._queueIndex
        },
        _setIsComplete: function(a) {
            return this._isComplete = a
        },
        _getIsComplete: function() {
            return this._isComplete
        },
        update: function(a) {
            if (0 < this._delay && (this._delay -= a, 0 < this._delay)) return;
            this._progress += a;
            this._progress > this._duration && (this._progress = this._duration);
            this.ratio = this._progress / this._duration;
            for (var b =
                    0, e = L.fields(this._dest); b < e.length;) {
                var c = e[b];
                ++b;
                a = L.field(this._dest, c) - L.field(this._origin, c);
                this._target[c] = this._easeFunction(L.field(this._origin, c), a, this._progress, this._duration)
            }
            this._progress >= this._duration && (null != this._completionHandler && this._completionHandler.apply(this._completionHandler, this._completionArgs), this._isComplete = !0)
        },
        dispose: function() {
            this._dest = this._target = this._origin = null
        },
        start: function() {
            this._isComplete = !1;
            for (var a = 0, b = L.fields(this._dest); a < b.length;) {
                var e =
                    b[a];
                ++a;
                null != L.field(this._target, e) && (this._origin[e] = L.field(this._target, e))
            }
        },
        __class__: g.tween._WorkinTweener.WorkinTweenDef,
        __properties__: {
            set_isComplete: "_setIsComplete",
            get_isComplete: "_getIsComplete",
            set_queueIndex: "_setQueueIndex",
            get_queueIndex: "_getQueueIndex"
        }
    };
    S = {
        WMSharedObject: function() {
            m.WMEventDispatcher.call(this);
            this._data = {};
            this.sharedKey = ""
        }
    };
    k["com.workinman.net.WMSharedObject"] = S.WMSharedObject;
    S.WMSharedObject.__name__ = ["com", "workinman", "net", "WMSharedObject"];
    S.WMSharedObject.getLocalStorage =
        function() {
            return v.window.localStorage
        };
    S.WMSharedObject.getLocal = function(a, b) {
        var e = v.window.location.href;
        null == b && (b = e);
        e = new S.WMSharedObject;
        e.sharedKey = b + ":" + a;
        var c = S.WMSharedObject.getLocalStorage().getItem(e.sharedKey);
        e._setData("" == c || null == c ? {} : Q.run(c));
        return e
    };
    S.WMSharedObject.__super__ = m.WMEventDispatcher;
    S.WMSharedObject.prototype = t(m.WMEventDispatcher.prototype, {
        flush: function() {
            var a = T.run(this._getData());
            S.WMSharedObject.getLocalStorage().setItem(this.sharedKey, a);
            return S.SharedObjectFlushedStatus.FLUSHED
        },
        _setData: function(a) {
            return this._data = a
        },
        _getData: function() {
            return this._data
        },
        dispose: function() {
            this._data = null;
            m.WMEventDispatcher.prototype.dispose.call(this)
        },
        __class__: S.WMSharedObject,
        __properties__: {
            set_data: "_setData",
            get_data: "_getData"
        }
    });
    S.SharedObjectFlushedStatus = function() {};
    k["com.workinman.net.SharedObjectFlushedStatus"] = S.SharedObjectFlushedStatus;
    S.SharedObjectFlushedStatus.__name__ = ["com", "workinman", "net", "SharedObjectFlushedStatus"];
    q = {
        ServiceAnalytics: function() {}
    };
    k["com.workinman.services.ServiceAnalytics"] =
        q.ServiceAnalytics;
    q.ServiceAnalytics.__name__ = ["com", "workinman", "services", "ServiceAnalytics"];
    q.ServiceAnalytics.onAnalyticsLoad = function() {
        q.ServiceAnalytics._flagLoaded || (f.WorkinCloud.instance.log("[ServiceAnalytics](onAnalyticsLoad) Load complete"), q.ServiceAnalytics._flagLoaded = !0, U.delay(q.ServiceAnalytics._runQueuedCommands, 1E3))
    };
    q.ServiceAnalytics.init = function(a, b) {
        null == b && (b = "");
        q.ServiceAnalytics._flagInitted = !0;
        q.ServiceAnalytics._queuedCommands = [];
        "x" == a.toLowerCase() && (q.ServiceAnalytics.OPTION_ENABLE_TRACKING = !1);
        q.ServiceAnalytics.OPTION_ENABLE_TRACKING && ("" == b && (b = q.ServiceAnalytics._DEFAULT_SHARED_OBJECT_ID), q.ServiceAnalytics._flagStarted = !1, f.WorkinCloud.instance.log("[ServiceAnalytics](initAnalytics)"), q.ServiceAnalytics._appId = a, q.ServiceAnalytics._sharedObjectId = b, q.ServiceAnalytics._sharedObjectData = f.WorkinCloud.instance.sharedObjectGetData(q.ServiceAnalytics._sharedObjectId), q.ServiceAnalytics._generateSessionID(), null == q.ServiceAnalytics._sharedObjectData.userID || 14 > p.string(q.ServiceAnalytics._sharedObjectData.userID).length ?
            (q.ServiceAnalytics._generateOfflineIDs(), q.ServiceAnalytics._sharedObjectData.userID = q.ServiceAnalytics._offlineUserId, q.ServiceAnalytics._sharedObjectData.trackingID = q.ServiceAnalytics._offlineTrackingId, f.WorkinCloud.instance.sharedObjectSetData(q.ServiceAnalytics._sharedObjectId, q.ServiceAnalytics._sharedObjectData)) : (q.ServiceAnalytics._offlineUserId = q.ServiceAnalytics._sharedObjectData.userID, q.ServiceAnalytics._offlineTrackingId = q.ServiceAnalytics._sharedObjectData.trackingID), eval("\t\t\t\t\n\t\t\t\twindow._pnConfig = new Array();\n\t\t\t\twindow._pnConfig['userId'] = '" +
                q.ServiceAnalytics._offlineUserId + "';\n\t\t\t\t\n\t\t\t\tvar _pnAPIURL = document.location.protocol + '//js.a.playnomics.net/v1/api?a=" + q.ServiceAnalytics._appId + "';\n\t\t\t\tvar _pnAPI = document.createElement('script');\t\t\t\t\n\t\t\t\t_pnAPI.type = 'text/javascript'; \n\t\t\t\t_pnAPI.async = false; \n\t\t\t\t_pnAPI.src = _pnAPIURL;\n\t\t\t\twindow.pnCallbackReference = _pnAPI;\t\t\t\t\n\t\t\t"), eval("window.pnCallbackReference").addEventListener("load", q.ServiceAnalytics.onAnalyticsLoad, !1), eval("document.body.appendChild(window.pnCallbackReference);"),
            q.ServiceAnalytics.sendUserInfo(), q.ServiceAnalytics.sendMilestone("custom1"))
    };
    q.ServiceAnalytics._runQueuedCommands = function() {
        for (; 0 < q.ServiceAnalytics._queuedCommands.length;) q.ServiceAnalytics.sendPlaynomicsEvent(q.ServiceAnalytics._queuedCommands[0].method, q.ServiceAnalytics._queuedCommands[0].params), q.ServiceAnalytics._queuedCommands.shift()
    };
    q.ServiceAnalytics.sendUserInfo = function() {
        var pnUserInfo=0;
    };
    q.ServiceAnalytics.sendMilestone =
        function(a) {
            var pnMilestone=0;
        };
    q.ServiceAnalytics.sendPlaynomicsEvent = function(a, b) {
        if (q.ServiceAnalytics.OPTION_ENABLE_TRACKING && q.ServiceAnalytics._flagInitted)
            if (q.ServiceAnalytics._flagLoaded) {
                f.WorkinCloud.instance.log("[ServiceAnalytics](sendPlaynomicsEvent) " + a);
                var e, c = "";
                for (e = 0; e < b.length;) c += "'" + b[e] + "'", e++, e < b.length && (c += ",");
                eval(a + "(" + c + ")")
            } else q.ServiceAnalytics._queuedCommands.push({
                method: a,
                params: b
            })
    };
    q.ServiceAnalytics.enableCanadaTracking = function(a) {
        q.ServiceAnalytics._flagCanadaTrackingEnabled = !0;
        q.ServiceAnalytics._canadaShowGameTitle = a
    };
    q.ServiceAnalytics.sendCanadaTrackingCall = function(a) {
        if (q.ServiceAnalytics._flagCanadaTrackingEnabled) try {
            eval("trackFlashEvent('" + q.ServiceAnalytics._canadaShowGameTitle + "', '" + a + "', 'true');")
        } catch (b) {}
    };
    q.ServiceAnalytics._generateSessionID = function() {
        for (var a = "", b = 11; - 1 < b;) a += Math.floor(10 * Math.random()), b--;
        q.ServiceAnalytics._sessionId =
            a
    };
    q.ServiceAnalytics._generateOfflineIDs = function() {
        q.ServiceAnalytics._offlineUserId = "";
        q.ServiceAnalytics._offlineTrackingId = "";
        for (var a = 15; - 1 < a;) {
            if (0.66 > Math.random()) q.ServiceAnalytics._offlineUserId += p.string(Math.floor(10 * Math.random()));
            else switch (Math.floor(10 * Math.random())) {
                case 0:
                    q.ServiceAnalytics._offlineUserId += "a";
                    break;
                case 1:
                    q.ServiceAnalytics._offlineUserId += "b";
                    break;
                case 2:
                    q.ServiceAnalytics._offlineUserId += "c";
                    break;
                case 3:
                    q.ServiceAnalytics._offlineUserId += "d";
                    break;
                case 4:
                    q.ServiceAnalytics._offlineUserId +=
                        "e";
                    break;
                case 5:
                    q.ServiceAnalytics._offlineUserId += "f";
                    break;
                case 6:
                    q.ServiceAnalytics._offlineUserId += "g";
                    break;
                case 7:
                    q.ServiceAnalytics._offlineUserId += "h";
                    break;
                case 8:
                    q.ServiceAnalytics._offlineUserId += "i";
                    break;
                case 9:
                    q.ServiceAnalytics._offlineUserId += "j";
                    break;
                default:
                    q.ServiceAnalytics._offlineUserId += "z"
            }
            a--
        }
        q.ServiceAnalytics._offlineTrackingId = "";
        for (a = 15; - 1 < a;) q.ServiceAnalytics._offlineTrackingId += Math.floor(10 * Math.random()), a--
    };
    q.ServiceAnalytics.prototype = {
        __class__: q.ServiceAnalytics
    };
    q.ServiceNickAvatar = function() {
        this._url = "";
        this._flagEnabled = !1;
        this._avatarsLoaded = [];
        this._avatarsToLoad = [];
        this._flagLoadListeners = !1
    };
    k["com.workinman.services.ServiceNickAvatar"] = q.ServiceNickAvatar;
    q.ServiceNickAvatar.__name__ = ["com", "workinman", "services", "ServiceNickAvatar"];
    q.ServiceNickAvatar.__properties__ = {
        get_instance: "_getInstance"
    };
    q.ServiceNickAvatar._getInstance = function() {
        null == q.ServiceNickAvatar._instance && (q.ServiceNickAvatar._instance = new q.ServiceNickAvatar);
        return q.ServiceNickAvatar._instance
    };
    q.ServiceNickAvatar.prototype = {
        disable: function() {
            this._flagEnabled = !1
        },
        enable: function(a) {
            "" != a && (this._flagEnabled = !0, this._url = a)
        },
        _getIsEnabled: function() {
            return this._flagEnabled
        },
        __class__: q.ServiceNickAvatar
    };
    q.ServiceNickLeaderboard = function() {
        this._flagEnabled = !1;
        this._scoreArray = [];
        this._gameKeyword = ""
    };
    k["com.workinman.services.ServiceNickLeaderboard"] = q.ServiceNickLeaderboard;
    q.ServiceNickLeaderboard.__name__ = ["com", "workinman", "services", "ServiceNickLeaderboard"];
    q.ServiceNickLeaderboard.__properties__ = {
        get_instance: "_getInstance"
    };
    q.ServiceNickLeaderboard._getInstance = function() {
        null == q.ServiceNickLeaderboard._instance && (q.ServiceNickLeaderboard._instance = new q.ServiceNickLeaderboard);
        return q.ServiceNickLeaderboard._instance
    };
    q.ServiceNickLeaderboard.prototype = {
        disable: function() {
            this._flagEnabled = !1
        },
        enable: function(a, b) {
            "" != a && (this._flagEnabled = !0, this.setKeyword(b), this._url = a)
        },
        setKeyword: function(a) {
            "" != this._gameKeyword && this._gameKeyword != a && (this._scoreArray = []);
            this._gameKeyword = a
        },
        _getIsEnabled: function() {
            return this._flagEnabled
        },
        __class__: q.ServiceNickLeaderboard
    };
    f = {
        JSEmbedProxy: function() {}
    };
    k["com.workinman.utils.JSEmbedProxy"] = f.JSEmbedProxy;
    f.JSEmbedProxy.__name__ = ["com", "workinman", "utils", "JSEmbedProxy"];
    f.JSEmbedProxy.__properties__ = {
        get_isPaused: "getIsPaused",
        get_canvasHeight: "getCanvasHeight",
        get_canvasWidth: "getCanvasWidth",
        get_canvasScale: "getCanvasScale",
        get_isCrossdomain: "getIsCrossdomain",
        get_base: "getBase",
        get_exists: "getExists"
    };
    f.JSEmbedProxy.alertOn = function(a) {
        f.JSEmbedProxy.callJSEmbedMethod("addAlert('" +
            a + "', '')")
    };
    f.JSEmbedProxy.alertOff = function() {
        f.JSEmbedProxy.callJSEmbedMethod("removeAlert('')")
    };
    f.JSEmbedProxy.getExists = function() {
        return f.JSEmbedProxy.callJSEmbedMethod("exists()")
    };
    f.JSEmbedProxy.getParameters = function() {
        return f.JSEmbedProxy.callJSEmbedMethod("params()")
    };
    f.JSEmbedProxy.getAttributes = function() {
        return f.JSEmbedProxy.callJSEmbedMethod("attr()")
    };
    f.JSEmbedProxy.getBase = function() {
        return f.JSEmbedProxy.callJSEmbedMethod("baseUrl()")
    };
    f.JSEmbedProxy.getIsCrossdomain = function() {
        return f.JSEmbedProxy.callJSEmbedMethod("isBaseCrossdomain()")
    };
    f.JSEmbedProxy.getCanvasScale = function() {
        return p.parseFloat(f.JSEmbedProxy.callJSEmbedMethod("canvasScale()"))
    };
    f.JSEmbedProxy.getCanvasWidth = function() {
        return p.parseFloat(f.JSEmbedProxy.callJSEmbedMethod("canvasWidth()"))
    };
    f.JSEmbedProxy.getCanvasHeight = function() {
        return p.parseFloat(f.JSEmbedProxy.callJSEmbedMethod("canvasHeight()"))
    };
    f.JSEmbedProxy.getIsPaused = function() {
        return f.JSEmbedProxy.callJSEmbedMethod("isPaused()")
    };
    f.JSEmbedProxy.pause = function() {
        f.JSEmbedProxy.callJSEmbedMethod("pause()")
    };
    f.JSEmbedProxy.unpause = function() {
        f.JSEmbedProxy.callJSEmbedMethod("unpause()")
    };
    f.JSEmbedProxy.callJSEmbedMethod = function(a) {
        try {
            var b = eval("jsembed." + a);
            return null == b ? "" : b
        } catch (e) {}
        return ""
    };
    f.JSEmbedProxy.prototype = {
        __class__: f.JSEmbedProxy
    };
    f.WMAssetManager = function() {
        this._LOADING_CHANCES = 3;
        this._baseUrl = "";
        this._assets = new F;
        this._defs = new F;
        this._flump = new F;
        this._packs = new F;
        this._chunks = new F;
        this._manifests = new F;
        this._flagBaseIsCrossdomain = !1;
        this._loadingProgress = this._loadingTotal =
            this._packsLoaded = this._packsMax = this._loadingChances = 0;
        this._loadingPackProgress = new F
    };
    k["com.workinman.utils.WMAssetManager"] = f.WMAssetManager;
    f.WMAssetManager.__name__ = ["com", "workinman", "utils", "WMAssetManager"];
    f.WMAssetManager.prototype = {
        getFont: function(a) {
            return !1 == this._assets.exists(a) ? (f.WorkinCloud.instance.log("[WMAssetManager](getFont) no asset named " + a + " exists! Returning null."), null) : new o.Font(this._assets.get(a)._getPack(), a)
        },
        getLibrary: function(a) {
            return !1 == this._flump.exists(a) ?
                (f.WorkinCloud.instance.log("[WMAssetManager](getLibrary) no library named " + a + " exists! Is it defined in config.xml?"), null) : this._flump.get(a)
        },
        getSound: function(a) {
            return !1 == this._assets.exists(a) ? (f.WorkinCloud.instance.log("[AssetManager](getSound) no asset named " + a + " exists! Returning null."), null) : this._assets.get(a)._getConstructed() ? this._assets.get(a)._getData() : this._assets.get(a)._getPack().getSound(this._assets.get(a)._getPath(), !0)
        },
        getXML: function(a) {
            if (!1 == this._assets.exists(a)) return f.WorkinCloud.instance.log("[WMAssetManager](getXML) no asset named " +
                a + " exists! Returning null."), null;
            a = u.parse(this.getFile(a));
            return new B.Fast(a.firstElement())
        },
        getFile: function(a) {
            return !1 == this._assets.exists(a) ? (f.WorkinCloud.instance.log("[WMAssetManager](getFile) no asset named " + a + " exists! Returning empty string."), "") : this._assets.get(a)._getConstructed() ? this._assets.get(a)._getData() : this._assets.get(a)._getPack().getFile(this._assets.get(a)._getPath(), !0)
        },
        getTexture: function(a) {
            a = a.split(".")[0];
            return !1 == this._assets.exists(a) ? (f.WorkinCloud.instance.log("[WMAssetManager](getTexture) no asset named " +
                a + " exists! Returning null."), null) : !0 == this._assets.get(a)._getConstructed() ? this._assets.get(a)._getData() : this._assets.get(a)._getPack().getTexture(this._assets.get(a)._getPath(), !0)
        },
        hasAsset: function(a) {
            return this._assets.exists(a)
        },
        _parseSpritesheet: function(a) {
            for (var b = this.getXML(a + ".xml"), a = this.getTexture(a), e = "", c = new I.Rectangle(0, 0, 0, 0), d, b = b.nodes.resolve("SubTexture").iterator(); b.hasNext();) d = b.next(), e = d.att.resolve("name").toString(), c.x = p.parseFloat(d.att.resolve("x").toString()),
                c.y = p.parseFloat(d.att.resolve("y").toString()), c.width = p.parseFloat(d.att.resolve("width").toString()), c.height = p.parseFloat(d.att.resolve("height").toString()), d = y.createTexture(c.width | 0, c.height | 0), d.get_graphics().drawSubImage(a, 0, 0, c.x | 0, c.y | 0, c.width | 0, c.height | 0), this.addConstructedAsset(e, d)
        },
        _onAllLoadComplete: function() {
            f.WorkinCloud.instance.log("[WMAssetManager](_onAllLoadComplete) all packs loaded!");
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(C.ConstantsCloud.EVENT_FILES_LOADED))
        },
        isLoading: function() {
            return this._packsLoaded < this._packsMax
        },
        addConstructedAsset: function(a, b) {
            new f._WMAssetManager.AssetDef(a, this._assets, b)
        },
        addPack: function(a) {
            for (var b = A.iter(a.get_manifest()._entries); b.hasNext();) {
                var e = b.next();
                new f._WMAssetManager.AssetDef(e.name, this._assets, a)
            }
        },
        isPackLoaded: function(a) {
            return this._packs.exists(a)
        },
        _loadManifest: function(a, b, e, c) {
            null == c && (c = !0);
            null == e && (e = "");
            var d = this,
                g = y._platform.loadAssetPack(a);
            this._loadingTotal += g._total;
            this._loadingPackProgress.set(b,
                0);
            g.error.connect(function(a) {
                f.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading failed with error: " + a);
                f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEvent(C.ConstantsCloud.EVENT_FILES_ERROR));
                d._loadingChances--;
                !0 == c ? 0 <= d._loadingChances ? U.delay(function() {
                        f.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Retrying. With " + d._loadingChances + " more chances.");
                        d.loadPack(b, e, !1)
                    }, 500) : f.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading attempts timed out.") :
                    f.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading failed, not attempting to retry.")
            });
            g.progressChanged.connect(function() {
                var a = g._progress - d._loadingPackProgress.get(b);
                d._loadingPackProgress.set(b, g._progress);
                d._loadingProgress += a;
                a = Math.round(100 * (d._loadingProgress / d._loadingTotal));
                f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(C.ConstantsCloud.EVENT_FILES_LOADING, {
                    value: a
                }))
            });
            g.get(function(a) {
                d.addPack(a);
                d._packsLoaded++;
                for (var e = 0, c = d._defs.get(b)._getFlump(); e <
                    c.length;) {
                    var f = c[e];
                    ++e;
                    d._flump.set(f, new w.Library(a, f))
                }
                e = 0;
                for (c = d._defs.get(b)._getTiles(); e < c.length;) f = c[e], ++e, d._parseSpritesheet(f);
                d._packs.set(b, a);
                d._packsLoaded >= d._packsMax && d._onAllLoadComplete()
            })
        },
        loadPack: function(a, b, e) {
            null == e && (e = !0);
            null == b && (b = "");
            !1 == this._defs.exists(a) && f.WorkinCloud.instance.log("[WMAssetManager](loadPack) Can't load pack " + a + " , define the pack in config.xml.");
            f.WorkinCloud.instance.log("[WMAssetManager](loadPack) " + a);
            e && (this._loadingChances = this._LOADING_CHANCES,
                this._packsMax++);
            e = z.Manifest.build(a);
            "" != this._baseUrl && (this._flagBaseIsCrossdomain ? e.set_externalBasePath(this._baseUrl) : e.set_relativeBasePath(this._baseUrl));
            this._loadManifest(e, a, b)
        },
        addPackDef: function(a, b, e) {
            null == b && (b = []);
            null == e && (e = []);
            this._defs.set(a, new f._WMAssetManager.PackDef(a, b, e))
        },
        _parseChunk: function(a, b) {
            for (var e = [], c = [], d = b.nodes.resolve("chunk").iterator(); d.hasNext();) {
                var g = d.next();
                e.push(g.getInnerData().toString())
            }
            for (d = b.nodes.resolve("pack").iterator(); d.hasNext();) g =
                d.next(), c.push(g.getInnerData().toString());
            return new f._WMAssetManager.ChunkDef(a, c, e)
        },
        loadFolder: function(a) {
            f.WorkinCloud.instance.log("[WMAssetManager](loadFolder) " + a);
            this.isPackLoaded(a) || (this.addPackDef(a), this.loadPack(a))
        },
        loadChunk: function(a) {
            !1 == this._chunks.exists(a) && f.WorkinCloud.instance.log("[WMAssetManager](loadChunk) No chunk named " + a + " defined.");
            for (var b = 0, e = this._chunks.get(a)._getChunks(); b < e.length;) {
                var c = e[b];
                ++b;
                this.loadChunk(c)
            }
            this._packsLoaded >= this._packsMax &&
                (this._loadingProgress = this._loadingTotal = 0, f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(C.ConstantsCloud.EVENT_FILES_LOADING, {
                    value: 0
                })));
            b = 0;
            for (e = this._chunks.get(a)._getPacks(); b < e.length;) c = e[b], ++b, !1 == this.isPackLoaded(c) && this.loadPack(c)
        },
        isChunkLoaded: function(a) {
            if (!1 == this._chunks.exists(a)) return f.WorkinCloud.instance.log("[WMAssetManager](isChunkLoaded) No chunk named " + a + " defined."), !1;
            for (var b = 0, a = this._chunks.get(a)._getPacks(); b < a.length;) {
                var e = a[b];
                ++b;
                if (!1 == this.isPackLoaded(e)) return !1
            }
            return !0
        },
        addChunk: function(a, b) {
            var e = this._parseChunk(a, b);
            this._chunks.set(a, e)
        },
        setCrossdomainBaseUrl: function(a) {
            this._flagBaseIsCrossdomain = !0;
            this._setBaseUrl(a)
        },
        _setBaseUrl: function(a) {
            this._baseUrl = a;
            f.WorkinCloud.instance.log("[WMAssetManager](setBaseUrl) Base Url set to '" + a + "'");
            return this._baseUrl
        },
        _getBaseUrl: function() {
            return this._baseUrl
        },
        __class__: f.WMAssetManager,
        __properties__: {
            set_baseUrl: "_setBaseUrl",
            get_baseUrl: "_getBaseUrl"
        }
    };
    f._WMAssetManager = {};
    f._WMAssetManager.AssetDef = function(a, b, e) {
        this._path = a;
        a = a.split("/");
        this._id = a[a.length - 1].split(".")[0];
        this._constructed = !1;
        this._data = this._pack = null;
        G.__instanceof(e, z.AssetPack) ? this._pack = e : (this._constructed = !0, this._data = e);
        this._hash = b;
        this._hash.set(this._path, this);
        this._path != this._path.split(".")[0] && this._hash.set(this._path.split(".")[0], this);
        this._path != this._id && this._hash.set(this._id, this)
    };
    k["com.workinman.utils._WMAssetManager.AssetDef"] = f._WMAssetManager.AssetDef;
    f._WMAssetManager.AssetDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "AssetDef"];
    f._WMAssetManager.AssetDef.prototype = {
        _getPack: function() {
            return this._pack
        },
        _getPath: function() {
            return this._path
        },
        _getData: function() {
            return this._data
        },
        _getConstructed: function() {
            return this._constructed
        },
        __class__: f._WMAssetManager.AssetDef,
        __properties__: {
            get_constructed: "_getConstructed",
            get_data: "_getData",
            get_path: "_getPath",
            get_pack: "_getPack"
        }
    };
    f._WMAssetManager.PackDef = function(a, b, e) {
        this._id = a;
        this._flump = b;
        this._tiles = e
    };
    k["com.workinman.utils._WMAssetManager.PackDef"] =
        f._WMAssetManager.PackDef;
    f._WMAssetManager.PackDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "PackDef"];
    f._WMAssetManager.PackDef.prototype = {
        _getTiles: function() {
            return this._tiles
        },
        _getFlump: function() {
            return this._flump
        },
        __class__: f._WMAssetManager.PackDef,
        __properties__: {
            get_flump: "_getFlump",
            get_tiles: "_getTiles"
        }
    };
    f._WMAssetManager.ChunkDef = function(a, b, e) {
        this._id = a;
        this._packs = b;
        this._chunks = e
    };
    k["com.workinman.utils._WMAssetManager.ChunkDef"] = f._WMAssetManager.ChunkDef;
    f._WMAssetManager.ChunkDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "ChunkDef"];
    f._WMAssetManager.ChunkDef.prototype = {
        _getChunks: function() {
            return this._chunks
        },
        _getPacks: function() {
            return this._packs
        },
        __class__: f._WMAssetManager.ChunkDef,
        __properties__: {
            get_packIds: "_getPacks",
            get_chunkIds: "_getChunks"
        }
    };
    f.WMInput = function() {
        this._multiTouchAvail = !1;
        this._inputDown = new F;
        this._keyCodes = new F;
        this._virtualCodes = new F;
        this._keyDown = new F;
        this._virtualDown = new F;
        this._touchList = new F;
        this._touchRemoval = [];
        this.registerInput("input_click");
        this._scale = 1;
        this._offset = new g.WorkinPoint;
        this._pointer = new f.WMPointer("", 0)
    };
    k["com.workinman.utils.WMInput"] = f.WMInput;
    f.WMInput.__name__ = ["com", "workinman", "utils", "WMInput"];
    f.WMInput.prototype = {
        _onPointerUp: function(a) {
            this._inputDown.set("input_click", !1);
            var b = a.viewX / this._scale,
                a = a.viewY / this._scale,
                b = b + this._offset.x,
                a = a + this._offset.y;
            this._pointer.end(b, a);
            !1 == this._multiTouchAvail && this._touchList.exists("const") && this._touchList.get("const").end(b, a);
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(0,
                "input_click", b, a, this._pointer._getSwipe()))
        },
        _onPointerMove: function(a) {
            var b = a.viewX / this._scale,
                a = a.viewY / this._scale,
                b = b + this._offset.x,
                a = a + this._offset.y;
            this._pointer.move(b, a);
            !1 == this._multiTouchAvail && this._touchList.exists("const") && this._touchList.get("const").move(b, a);
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(2, "input_click", b, a, this._pointer._getSwipe()))
        },
        _onPointerDown: function(a) {
            this._inputDown.set("input_click", !0);
            var b = a.viewX / this._scale,
                a = a.viewY /
                this._scale,
                b = b + this._offset.x,
                a = a + this._offset.y;
            this._pointer.begin(b, a);
            if (!1 == this._multiTouchAvail) {
                var e = new f.WMPointer("const", 0);
                e.begin(b, a);
                this._touchList.set("const", e)
            }
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(1, "input_click", b, a, this._pointer._getSwipe()))
        },
        _onTouchUp: function(a) {
            var b = a.viewX / this._scale,
                e = a.viewY / this._scale,
                b = b + this._offset.x,
                e = e + this._offset.y;
            this._touchList.get(p.string(a.id)).end(b, e);
            0 < this._touchList.get(p.string(a.id))._getIndex() &&
                f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(0, "input_click", b, e, this._touchList.get(p.string(a.id))._getSwipe()))
        },
        _onTouchMove: function(a) {
            var b = a.viewX / this._scale,
                e = a.viewY / this._scale,
                b = b + this._offset.x,
                e = e + this._offset.y;
            this._touchList.get(p.string(a.id)).move(b, e);
            0 < this._touchList.get(p.string(a.id))._getIndex() && f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(2, "input_click", b, e, this._touchList.get(p.string(a.id))._getSwipe()))
        },
        _onTouchDown: function(a) {
            var b =
                0,
                e = !1;
            do
                for (var e = !0, c = this._touchList.iterator(); c.hasNext();) {
                    var d = c.next();
                    if (b == d._getIndex()) {
                        b++;
                        e = !1;
                        break
                    }
                }
            while (!1 == e);
            e = new f.WMPointer(p.string(a.id), b);
            this._touchList.set(e._getId(), e);
            c = a.viewX / this._scale;
            a = a.viewY / this._scale;
            c += this._offset.x;
            a += this._offset.y;
            e.begin(c, a);
            0 < b && f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(1, "input_click", c, a, e._getSwipe()))
        },
        _isInputDown: function(a) {
            for (var b = 0, e = this._keyCodes.get(a); b < e.length;) {
                var c = e[b];
                ++b;
                if (!0 ==
                    this._keyDown.get(c)) return !0
            }
            b = 0;
            for (e = this._virtualCodes.get(a); b < e.length;)
                if (a = e[b], ++b, !0 == this._virtualDown.get(a)) return !0;
            return !1
        },
        _onKeyUp: function(a) {
            var b = p.string(a.key);
            this._keyDown.exists(b) && this._keyDown.set(b, !1);
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(C.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY, {
                key: a.key,
                state: 0
            }))
        },
        _onKeyDown: function(a) {
            var b = p.string(a.key);
            this._keyDown.exists(b) && this._keyDown.set(b, !0);
            f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventData(C.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY, {
                key: a.key,
                state: 1
            }))
        },
        getInput: function(a) {
            return this._inputDown.get(a)
        },
        registerInput: function(a, b, e) {
            !1 == this._inputDown.exists(a) && (this._inputDown.set(a, !1), this._keyCodes.set(a, []), this._virtualCodes.set(a, []));
            if (null != b)
                for (var c = 0; c < b.length;) {
                    var d = b[c];
                    ++c;
                    this._keyCodes.get(a).push(p.string(d));
                    this._keyDown.set(p.string(d), !1)
                }
            if (null != e)
                for (c = 0; c < e.length;) b = e[c], ++c, this._virtualCodes.get(a).push(b), this._virtualDown.set(b, !1)
        },
        prime: function() {
            this._multiTouchAvail = y._platform.getTouch().get_supported();
            y._platform.getKeyboard().down.connect(s(this, this._onKeyDown));
            y._platform.getKeyboard().up.connect(s(this, this._onKeyUp));
            this._multiTouchAvail && (y._platform.getTouch().down.connect(s(this, this._onTouchDown)), y._platform.getTouch().move.connect(s(this, this._onTouchMove)), y._platform.getTouch().up.connect(s(this, this._onTouchUp)));
            y._platform.getPointer().down.connect(s(this, this._onPointerDown));
            y._platform.getPointer().move.connect(s(this, this._onPointerMove));
            y._platform.getPointer().up.connect(s(this,
                this._onPointerUp))
        },
        _getMultiTouch: function() {
            return this._touchList
        },
        _getPointer: function() {
            return this._pointer
        },
        _setOffset: function(a) {
            return this._offset = a
        },
        _getOffset: function() {
            return this._offset
        },
        _setScale: function(a) {
            this._scale = a;
            0 == this._scale && (this._scale = 0.01);
            return this._scale
        },
        _getScale: function() {
            return this._scale
        },
        update: function(a) {
            for (var b = this._inputDown.keys(); b.hasNext();) {
                var e = b.next();
                "input_click" != e && (!0 == this._inputDown.get(e) ? !1 == this._isInputDown(e) && (this._inputDown.set(e, !1), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(0, e, 0, 0))) : !0 == this._isInputDown(e) && (this._inputDown.set(e, !0), f.WorkinCloud.instance._getDispatcher().dispatchEvent(new m.WMEventInput(1, e, 0, 0))))
            }
            this._pointer.update(a);
            for (b = this._touchList.iterator(); b.hasNext();) e = b.next(), e._getPhase() == m.WMEventInput.PHASE_UP ? this._touchRemoval.push(e._getId()) : e.update(a);
            a = 0;
            for (b = this._touchRemoval; a < b.length;) e = b[a], ++a, this._touchList.get(e).dispose(), this._touchList.remove(e);
            for (; 0 < this._touchRemoval.length;) this._touchRemoval.pop()
        },
        __class__: f.WMInput,
        __properties__: {
            set_scale: "_setScale",
            get_scale: "_getScale",
            get_pointer: "_getPointer",
            get_multiTouch: "_getMultiTouch"
        }
    };
    f.WMPointer = function(a, b) {
        this.SWIPE_DOWN = 4;
        this.SWIPE_UP = 3;
        this.SWIPE_RIGHT = 2;
        this.SWIPE_LEFT = 1;
        this.SWIPE_NONE = 0;
        this._resetDeltaLine = !0;
        this._timer = f.WMPointer._DELTA_TIMEOUT;
        this._id = a;
        this._index = b;
        this._origin = new g.WorkinPoint(0, 0);
        this._current = new g.WorkinPoint(0, 0);
        this._last = new g.WorkinPoint(0,
            0);
        this._delta = new g.WorkinPoint(0, 0);
        this._motionDelta = new g.WorkinLine;
        this._line = new g.WorkinLine(new g.WorkinPoint(0, 0), new g.WorkinPoint(0, 0));
        this._deltaLine = this._line.copy();
        this._camera = new g.WorkinCamera(0, 0);
        this._phase = m.WMEventInput.PHASE_UP;
        this._swipe = this.SWIPE_NONE;
        this._consumed = !1
    };
    k["com.workinman.utils.WMPointer"] = f.WMPointer;
    f.WMPointer.__name__ = ["com", "workinman", "utils", "WMPointer"];
    f.WMPointer.prototype = {
        update: function(a) {
            this._resetDeltaLine = !0;
            this._timer -= a;
            0 > this._timer &&
                (this._timer = f.WMPointer._DELTA_TIMEOUT, this._deltaLine.originToPoint(this._current))
        },
        _updateInfo: function(a, b) {
            this._last.toPoint(this._current);
            this._current.to(a, b);
            this._current.x += this._camera._getPos().x - this._camera._getScreenCenterX();
            this._current.y += this._camera._getPos().y - this._camera._getScreenCenterY();
            this._delta.toPoint(this._current);
            this._delta.subtractPoint(this._last);
            this._deltaLine.to(this._origin, this._current);
            this._motionDelta.to(this._motionDelta._getP1(), this._current)
        },
        _testSwipe: function() {
            if (!1 == this._consumed) {
                var a = this._origin.x - this._current.x,
                    b = this._origin.y - this._current.y;
                this._swipe = Math.abs(a) >= f.WMPointer._DELTA_ALLOWANCE && Math.abs(b) < f.WMPointer._DELTA_ALLOWANCE ? 0 < a ? this.SWIPE_LEFT : this.SWIPE_RIGHT : Math.abs(b) >= f.WMPointer._DELTA_ALLOWANCE && Math.abs(a) < f.WMPointer._DELTA_ALLOWANCE ? 0 < b ? this.SWIPE_UP : this.SWIPE_DOWN : this.SWIPE_NONE
            } else this._swipe = this.SWIPE_NONE
        },
        end: function(a, b) {
            this._phase = m.WMEventInput.PHASE_UP;
            this._updateInfo(a, b);
            this._testSwipe();
            this._line.endToPoint(this._current)
        },
        move: function(a, b) {
            this._updateInfo(a, b);
            !1 != f.WorkinCloud.instance._getInput().getInput("input_click") && (this._phase = m.WMEventInput.PHASE_MOVE, this._testSwipe(), this._line.endToPoint(this._current))
        },
        begin: function(a, b) {
            this._origin.to(a, b);
            this._origin.x += this._camera._getPos().x - this._camera._getScreenCenterX();
            this._origin.y += this._camera._getPos().y - this._camera._getScreenCenterY();
            this._current.toPoint(this._origin);
            this._last.toPoint(this._origin);
            this._delta.to(0,
                0);
            this._line.to(this._origin, this._current);
            this._deltaLine.to(this._origin, this._current);
            this._motionDelta.to(this._origin, this._current);
            this._consumed = !1;
            this._phase = m.WMEventInput.PHASE_DOWN;
            this._swipe = this.SWIPE_NONE
        },
        _getDeltaLine: function() {
            if (!1 == this._resetDeltaLine) return this._deltaLine;
            this._deltaLine.endToPoint(this._current);
            this._resetDeltaLine = !1;
            return this._deltaLine
        },
        _getMotionDelta: function() {
            return this._motionDelta
        },
        _setIndex: function(a) {
            return this._index = a
        },
        _getIndex: function() {
            return this._index
        },
        _getId: function() {
            return this._id
        },
        _setConsumed: function(a) {
            return this._consumed = a
        },
        _getConsumed: function() {
            return this._consumed
        },
        _getSwipe: function() {
            return this._swipe
        },
        _getLine: function() {
            return this._line
        },
        _getDeltaPos: function() {
            return this._delta
        },
        _getLastPos: function() {
            return this._last
        },
        _getCurrentPos: function() {
            return this._current
        },
        _getOriginPos: function() {
            return this._origin
        },
        _getPhase: function() {
            return this._phase
        },
        dispose: function() {
            this._motionDelta.dispose();
            this._delta = this._last =
                this._current = this._origin = this._motionDelta = null;
            this._line.dispose();
            this._line = null;
            this._deltaLine.dispose();
            this._camera = this._deltaLine = null
        },
        __class__: f.WMPointer,
        __properties__: {
            get_phase: "_getPhase",
            get_currentPos: "_getCurrentPos",
            get_line: "_getLine",
            get_swipe: "_getSwipe",
            set_consumed: "_setConsumed",
            get_consumed: "_getConsumed",
            get_id: "_getId",
            set_index: "_setIndex",
            get_index: "_getIndex"
        }
    };
    f.WMLocalize = function() {};
    k["com.workinman.utils.WMLocalize"] = f.WMLocalize;
    f.WMLocalize.__name__ = ["com",
        "workinman", "utils", "WMLocalize"
    ];
    f.WMLocalize.prototype = {
        getData: function(a, b) {
            null == b && (b = "");
            "" == b && (b = C.ConstantsCloud.LOCALIZATION_XML_PATH + "translation_" + f.WorkinCloud.instance.getString(C.ConstantsCloud.STRING_REGION_ID) + ".xml");
            for (var e = f.WorkinCloud.instance._getAssets().getXML(b).nodes.resolve("string").iterator(); e.hasNext();) {
                var c = e.next();
                if (c.att.resolve("id") == a) return new f.WMLocalizedData(c.att.resolve("id"), c.getInnerData(), c.att.resolve("fontName"), p.parseFloat(c.att.resolve("fontScale")),
                    p.parseFloat(c.att.resolve("offsetX")), p.parseFloat(c.att.resolve("offsetY")), p.parseFloat(c.att.resolve("rotation")))
            }
            f.WorkinCloud.instance.log("[WMLocalize] ERROR: No localization data for : " + a);
            return new f.WMLocalizedData(a, "", "", 1, 0, 0, 0)
        },
        __class__: f.WMLocalize
    };
    f.WMLocalizedData = function(a, b, e, c, d, f, g) {
        this._id = a;
        this._string = b;
        this._fontName = e;
        this._scale = c;
        this._offsetX = d;
        this._offsetY = f;
        this._rotation = g
    };
    k["com.workinman.utils.WMLocalizedData"] = f.WMLocalizedData;
    f.WMLocalizedData.__name__ = ["com", "workinman", "utils", "WMLocalizedData"];
    f.WMLocalizedData.prototype = {
        get_rotation: function() {
            return this._rotation
        },
        _getOffsetY: function() {
            return this._offsetY
        },
        _getOffsetX: function() {
            return this._offsetX
        },
        _getScale: function() {
            return this._scale
        },
        _getFontName: function() {
            return this._fontName
        },
        _getString: function() {
            return this._string
        },
        _getId: function() {
            return this._id
        },
        __class__: f.WMLocalizedData,
        __properties__: {
            get_string: "_getString",
            get_fontName: "_getFontName",
            get_scale: "_getScale",
            get_offsetX: "_getOffsetX",
            get_offsetY: "_getOffsetY",
            get_rotation: "get_rotation"
        }
    };
    f.WMSound = function() {
        this._musicId = "";
        this._musicGain = 1;
        this._musicPlaying = null;
        this._flagSystemMute = this._flagMuted = !1;
        this._mixer = new H.Mixer;
        this._sounds = []
    };
    k["com.workinman.utils.WMSound"] = f.WMSound;
    f.WMSound.__name__ = ["com", "workinman", "utils", "WMSound"];
    f.WMSound.prototype = {
        _getMusicPlaying: function() {
            return this._musicPlaying
        },
        update: function(a) {
            C.ConstantsCloud.getIsAndroid() && null != this._musicPlaying && 0.95 <= this._musicPlaying._getPlayback().get_position() /
                this._musicPlaying._getSound().get_duration() && L.setProperty(this._musicPlaying._getPlayback(), "position", 0);
            for (var b = 0; b < this._sounds.length;) {
                if (this._sounds[b]._getFade() == f.WMSound.FADE_OUT) {
                    if (0 < this._sounds[b]._getPlayback().volume._value) {
                        var e = this._sounds[b]._getPlayback().volume;
                        e.set__(e._value - a * this._sounds[b]._getFadeSpeed());
                        0 >= this._sounds[b]._getPlayback().volume._value && (this._sounds[b].setFade(f.WMSound.FADE_NONE), this._sounds[b]._getPlayback().volume.set__(0))
                    }
                } else this._sounds[b]._getFade() ==
                    f.WMSound.FADE_IN && this._sounds[b]._getPlayback().volume._value < this._sounds[b].volume && (e = this._sounds[b]._getPlayback().volume, e.set__(e._value + a * this._sounds[b]._getFadeSpeed()), this._sounds[b]._getPlayback().volume._value >= this._sounds[b].volume && (this._sounds[b].setFade(f.WMSound.FADE_NONE), this._sounds[b]._getPlayback().volume.set__(this._sounds[b].volume)));
                b++
            }
            null != this._getMusicPlaying() && (this._getMusicPlaying()._getFade() == f.WMSound.FADE_OUT ? 0 < this._getMusicPlaying()._getPlayback().volume._value &&
                (e = this._getMusicPlaying()._getPlayback().volume, e.set__(e._value - a * this._getMusicPlaying()._getFadeSpeed()), 0 >= this._getMusicPlaying()._getPlayback().volume._value && (this._getMusicPlaying().setFade(f.WMSound.FADE_NONE), this._getMusicPlaying()._getPlayback().volume.set__(0))) : this._getMusicPlaying()._getFade() == f.WMSound.FADE_IN && this._getMusicPlaying()._getPlayback().volume._value < this._getMusicPlaying().volume && (e = this._getMusicPlaying()._getPlayback().volume, e.set__(e._value + a * this._getMusicPlaying()._getFadeSpeed()),
                    this._getMusicPlaying()._getPlayback().volume._value >= this._getMusicPlaying().volume && (this._getMusicPlaying().setFade(f.WMSound.FADE_NONE), this._getMusicPlaying()._getPlayback().volume.set__(this._getMusicPlaying().volume))))
        },
        _muteMusic: function(a) {
            "" != this._musicId && (a ? this._musicPlaying = null : (this._musicPlaying = a = new f._WMSound.SoundDef(this._musicId, this._mixer.newSound(f.WorkinCloud.instance._getAssets().getSound(this._musicId), 1), !0), a.playSound(this._musicGain)))
        },
        playMusic: function(a, b) {
            null ==
                b && (b = 1);
            if (!(C.ConstantsCloud.getIsAndroid() && null != this._musicPlaying || this._musicId == a))
                if (this._musicId = a, this._musicGain = b, !(this.getMute() || "" == a)) {
                    null != this._musicPlaying && this._musicPlaying.dispose();
                    var e = new f._WMSound.SoundDef(a, this._mixer.newSound(f.WorkinCloud.instance._getAssets().getSound(this._musicId), 1), !0);
                    this._musicPlaying = e;
                    e.playSound(b)
                }
        },
        _muteAllToggle: function(a) {
            if (a) {
                for (this._mixer.stopAll(); 0 < this._sounds.length;) this._sounds.splice(0, 1);
                this._muteMusic(!0)
            } else a ||
                this._muteMusic(!1)
        },
        playSound: function(a, b) {
            null == b && (b = 1);
            if (!C.ConstantsCloud.getIsAndroid() && !this.getMute()) {
                for (var e = 0; e < this._sounds.length;) {
                    if (this._sounds[e].id == a) {
                        this._sounds[e].playSound(b);
                        return
                    }
                    e++
                }
                e = new f._WMSound.SoundDef(a, this._mixer.newSound(f.WorkinCloud.instance._getAssets().getSound(a), 4), !1);
                this._sounds.push(e);
                e.playSound(b)
            }
        },
        setMute: function(a) {
            this._flagMuted = a;
            this._flagSystemMute || this._muteAllToggle(this._flagMuted)
        },
        getMute: function() {
            return this._flagSystemMute ||
                this._flagMuted
        },
        __class__: f.WMSound,
        __properties__: {
            get_musicPlaying: "_getMusicPlaying"
        }
    };
    f._WMSound = {};
    f._WMSound.SoundDef = function(a, b, e) {
        null == e && (e = !1);
        this.id = a;
        this.isMusic = e;
        this.volume = 1;
        this._flagPlayed = this._flagHasSound = !1;
        this._sound = b;
        this._fade = f.WMSound.FADE_NONE;
        this._fadeSpeed = 1
    };
    k["com.workinman.utils._WMSound.SoundDef"] = f._WMSound.SoundDef;
    f._WMSound.SoundDef.__name__ = ["com", "workinman", "utils", "_WMSound", "SoundDef"];
    f._WMSound.SoundDef.prototype = {
        playSound: function(a) {
            null == a &&
                (a = 1);
            this.volume = a;
            this._playback = C.ConstantsCloud.getIsAndroid() ? this._sound.play(a) : this.isMusic ? this._sound.loop(a) : this._sound.play(a)
        },
        setFade: function(a, b) {
            null == b && (b = 1);
            this._fade = a;
            this._fadeSpeed = b
        },
        _getFadeSpeed: function() {
            return this._fadeSpeed
        },
        _getFade: function() {
            return this._fade
        },
        _setPlayback: function(a) {
            return this._playback = a
        },
        _getPlayback: function() {
            return this._playback
        },
        _getSound: function() {
            return this._sound
        },
        dispose: function() {
            this._playback.dispose();
            this._playback = null
        },
        __class__: f._WMSound.SoundDef,
        __properties__: {
            get_sound: "_getSound",
            set_playback: "_setPlayback",
            get_playback: "_getPlayback",
            get_fade: "_getFade",
            get_fadeSpeed: "_getFadeSpeed"
        }
    };
    H = {
        Mixer: function() {
            this._sounds = []
        }
    };
    k["flambe.sound.Mixer"] = H.Mixer;
    H.Mixer.__name__ = ["flambe", "sound", "Mixer"];
    H.Mixer.__super__ = P;
    H.Mixer.prototype = t(P.prototype, {
        onRemoved: function() {
            this.stopAll();
            this._sounds = []
        },
        stopAll: function() {
            for (var a = 0, b = this._sounds; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
        },
        newSound: function(a,
            b) {
            null == b && (b = 2147483647);
            var e = new H._Mixer.MixerSound(a, b);
            this._sounds.push(e);
            return e
        },
        get_name: function() {
            return "Mixer_2"
        },
        __class__: H.Mixer
    });
    f.WorkinCloud = function() {
        this._TIMER_STACK = 0.1;
        this._values = new F;
        this._defaults = new F;
        this._dispatcher = new m.WMEventDispatcher;
        this._input = new f.WMInput;
        this._assets = new f.WMAssetManager;
        this._sound = new f.WMSound;
        this._localize = new f.WMLocalize;
        this._stack = [];
        this._timerStack = -1;
        this._flagStackPaused = !1;
        this.setString(C.ConstantsCloud.STRING_REGION_ID,
            "en")
    };
    k["com.workinman.utils.WorkinCloud"] = f.WorkinCloud;
    f.WorkinCloud.__name__ = ["com", "workinman", "utils", "WorkinCloud"];
    f.WorkinCloud.prototype = {
        _updateStack: function(a) {
            1 > this._stack.length || this._flagStackPaused || (this._timerStack -= a, 0 > this._timerStack && (this._stack[0](), this._stack.shift(), this._timerStack = this._TIMER_STACK))
        },
        unpauseStack: function() {
            this._flagStackPaused = !1
        },
        pauseStack: function() {
            this._flagStackPaused = !0
        },
        update: function(a) {
            this._updateStack(a);
            this._input.update(a)
        },
        stack: function(a) {
            this._timerStack =
                this._TIMER_STACK;
            for (var b = 0; b < a.length;) {
                var e = a[b];
                ++b;
                this._stack.push(e)
            }
        },
        _updateDisplays: function(a) {
            this._dispatcher.dispatchEvent(new m.WMEventData(i.Display.EVENT_UPDATE_DISPLAY, {
                valueID: a
            }))
        },
        sharedObjectSetData: function(a, b) {
            var e = S.WMSharedObject.getLocal(a);
            e._setData(b);
            e.flush();
            e.dispose()
        },
        sharedObjectGetData: function(a) {
            var a = S.WMSharedObject.getLocal(a),
                b = a._getData();
            a.dispose();
            return b
        },
        resetValue: function(a) {
            this._values.set(a, this._defaults.get(a));
            this._updateDisplays(a)
        },
        modifyValue: function(a, b) {
            null == b && (b = 1);
            this._values.set(a, this.getFloat(a) + b);
            this._updateDisplays(a);
            return this.getFloat(a)
        },
        setValue: function(a, b) {
            this._values.set(a, b);
            !1 == this._defaults.exists(a) && this.setDefault(a, b);
            this._updateDisplays(a)
        },
        getValue: function(a) {
            return this._values.get(a)
        },
        setDefault: function(a, b) {
            this._defaults.set(a, b);
            this.resetValue(a)
        },
        getString: function(a) {
            return this._values.get(a)
        },
        setString: function(a, b) {
            this.setValue(a, b)
        },
        getInt: function(a) {
            return this._values.get(a)
        },
        modifyInt: function(a, b) {
            return Math.floor(this.modifyValue(a, b))
        },
        setInt: function(a, b) {
            this.setValue(a, b)
        },
        getFloat: function(a) {
            return this._values.get(a)
        },
        setFloat: function(a, b) {
            this.setValue(a, b)
        },
        getBool: function(a) {
            return this._values.get(a)
        },
        setBool: function(a, b) {
            this.setValue(a, b)
        },
        _getStackLength: function() {
            return this._stack.length
        },
        _getLocalize: function() {
            return this._localize
        },
        _getSound: function() {
            return this._sound
        },
        _getAssets: function() {
            return this._assets
        },
        _getInput: function() {
            return this._input
        },
        _getDispatcher: function() {
            return this._dispatcher
        },
        log: function() {
            null
        },
        __class__: f.WorkinCloud,
        __properties__: {
            get_dispatcher: "_getDispatcher",
            get_input: "_getInput",
            get_assets: "_getAssets",
            get_sound: "_getSound",
            get_localize: "_getLocalize"
        }
    };
    f.WorkinUtils = function() {};
    k["com.workinman.utils.WorkinUtils"] = f.WorkinUtils;
    f.WorkinUtils.__name__ = ["com", "workinman", "utils", "WorkinUtils"];
    f.WorkinUtils.getRandom = function(a, b, e) {
        null == e && (e = !0);
        var c = Math.random();
        1 == c && (c = 0.99);
        return e ? a + Math.floor(c * (b +
            1 - a)) : a + c * (b - a)
    };
    M = function() {
        this.parent = this.firstChild = this.next = this.firstComponent = null;
        this._compMap = {}
    };
    k["flambe.Entity"] = M;
    M.__name__ = ["flambe", "Entity"];
    M.__interfaces__ = [n.Disposable];
    M.prototype = {
        dispose: function() {
            for (null != this.parent && this.parent.removeChild(this); null != this.firstComponent;) this.firstComponent.dispose();
            this.disposeChildren()
        },
        disposeChildren: function() {
            for (; null != this.firstChild;) this.firstChild.dispose()
        },
        removeChild: function(a) {
            for (var b = null, e = this.firstChild; null !=
                e;) {
                var c = e.next;
                if (e == a) {
                    null == b ? this.firstChild = c : b.next = c;
                    e.parent = null;
                    e.next = null;
                    break
                }
                b = e;
                e = c
            }
        },
        addChild: function(a, b) {
            null == b && (b = !0);
            null != a.parent && a.parent.removeChild(a);
            a.parent = this;
            if (b) {
                for (var e = null, c = this.firstChild; null != c;) e = c, c = c.next;
                null != e ? e.next = a : this.firstChild = a
            } else a.next = this.firstChild, this.firstChild = a;
            return this
        },
        remove: function(a) {
            for (var b = null, e = this.firstComponent; null != e;) {
                var c = e.next;
                if (e == a) {
                    null == b ? this.firstComponent = c : b._internal_init(this, c);
                    delete this._compMap[e.get_name()];
                    e.onRemoved();
                    e._internal_init(null, null);
                    break
                }
                b = e;
                e = c
            }
        },
        add: function(a) {
            a.dispose();
            var b = a.get_name(),
                e = this._compMap[b];
            null != e && this.remove(e);
            this._compMap[b] = a;
            b = null;
            for (e = this.firstComponent; null != e;) b = e, e = e.next;
            null != b ? b.next = a : this.firstComponent = a;
            a._internal_init(this, null);
            a.onAdded();
            return this
        },
        __class__: M
    };
    n.PackageLog = function() {};
    k["flambe.util.PackageLog"] = n.PackageLog;
    n.PackageLog.__name__ = ["flambe", "util", "PackageLog"];
    h = {
        Platform: function() {}
    };
    k["flambe.platform.Platform"] =
        h.Platform;
    h.Platform.__name__ = ["flambe", "platform", "Platform"];
    h.Platform.prototype = {
        __class__: h.Platform
    };
    h.html = {};
    h.html.HtmlPlatform = function() {};
    k["flambe.platform.html.HtmlPlatform"] = h.html.HtmlPlatform;
    h.html.HtmlPlatform.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
    h.html.HtmlPlatform.__interfaces__ = [h.Platform];
    h.html.HtmlPlatform.prototype = {
        createRenderer: function(a) {
            return new h.html.CanvasRenderer(a)
        },
        getY: function(a, b) {
            return this._stage.scaleFactor * (a.clientY - b.top)
        },
        getX: function(a,
            b) {
            return this._stage.scaleFactor * (a.clientX - b.left)
        },
        getRenderer: function() {
            return this._renderer
        },
        getExternal: function() {
            null == this._external && (this._external = new h.html.HtmlExternal);
            return this._external
        },
        getWeb: function() {
            null == this._web && (this._web = new h.html.HtmlWeb(this._container));
            return this._web
        },
        getKeyboard: function() {
            return this._keyboard
        },
        getTouch: function() {
            return this._touch
        },
        getMouse: function() {
            return this._mouse
        },
        getPointer: function() {
            return this._pointer
        },
        update: function(a) {
            var b =
                (a - this._lastUpdate) / 1E3;
            this._lastUpdate = a;
            this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b), this.mainLoop.render(this._renderer))
        },
        getTime: function() {
            return Date.now() / 1E3
        },
        createLogHandler: function(a) {
            return h.html.HtmlLogHandler.isSupported() ? new h.html.HtmlLogHandler(a) : null
        },
        getLocale: function() {
            var a = v.window.navigator.language;
            null == a && (a = v.window.navigator.userLanguage);
            return a
        },
        getStorage: function() {
            if (null == this._storage) {
                var a = null;
                try {
                    a = v.window.localStorage
                } catch (b) {}
                null !=
                    a ? this._storage = new h.html.HtmlStorage(a) : (K.logger.warn("localStorage is unavailable, falling back to unpersisted storage", null), this._storage = new h.DummyStorage)
            }
            return this._storage
        },
        getStage: function() {
            return this._stage
        },
        loadAssetPack: function(a) {
            return (new h.html.HtmlAssetPackLoader(this, a)).promise
        },
        init: function() {
            var a = this;
            K.logger.info("Initializing HTML platform", null);
            h.html.HtmlUtil.fixAndroidMath();
            var b = null;
            try {
                b = v.window.flambe.canvas
            } catch (e) {}
            b.setAttribute("tabindex", "0");
            b.style.outlineStyle =
                "none";
            b.setAttribute("moz-opaque", "true");
            this._stage = new h.html.HtmlStage(b);
            this._pointer = new h.BasicPointer;
            this._mouse = new h.html.HtmlMouse(this._pointer, b);
            this._keyboard = new h.BasicKeyboard;
            this._renderer = this.createRenderer(b);
            y.hasGPU.set__(!0);
            this.mainLoop = new h.MainLoop;
            this._container = b.parentNode;
            this._container.style.overflow = "hidden";
            this._container.style.position = "relative";
            this._container.style.msTouchAction = "none";
            var c = 0,
                d = function(e) {
                    if (!(1E3 > e.timeStamp - c)) {
                        var d = b.getBoundingClientRect(),
                            f = a.getX(e, d),
                            d = a.getY(e, d);
                        switch (e.type) {
                            case "mousedown":
                                e.target == b && (e.preventDefault(), a._mouse.submitDown(f, d, e.button), e.target.focus());
                                break;
                            case "mousemove":
                                a._mouse.submitMove(f, d);
                                break;
                            case "mouseup":
                                a._mouse.submitUp(f, d, e.button);
                                break;
                            case "mousewheel":
                            case "DOMMouseScroll":
                                a._mouse.submitScroll(f, d, "mousewheel" == e.type ? e.wheelDelta / 40 : -e.detail) && e.preventDefault()
                        }
                    }
                };
            window.addEventListener("mousedown", d, !1);
            window.addEventListener("mousemove", d, !1);
            window.addEventListener("mouseup",
                d, !1);
            b.addEventListener("mousewheel", d, !1);
            b.addEventListener("DOMMouseScroll", d, !1);
            var f = "undefined" != typeof v.window.ontouchstart,
                d = "msMaxTouchPoints" in window.navigator && 1 < window.navigator.msMaxTouchPoints;
            if (f || d) {
                var g = new h.BasicTouch(this._pointer, d ? window.navigator.msMaxTouchPoints : 4);
                this._touch = g;
                d = function(b) {
                    var e = f ? b.changedTouches : [b],
                        d = b.target.getBoundingClientRect();
                    c = b.timeStamp;
                    switch (b.type) {
                        case "touchstart":
                        case "MSPointerDown":
                            b.preventDefault();
                            h.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER &&
                                h.html.HtmlUtil.hideMobileBrowser();
                            for (b = 0; b < e.length;) {
                                var i = e[b];
                                ++b;
                                var j = a.getX(i, d),
                                    l = a.getY(i, d),
                                    i = (f ? i.identifier : i.pointerId) | 0;
                                g.submitDown(i, j, l)
                            }
                            break;
                        case "touchmove":
                        case "MSPointerMove":
                            b.preventDefault();
                            for (b = 0; b < e.length;) i = e[b], ++b, j = a.getX(i, d), l = a.getY(i, d), i = (f ? i.identifier : i.pointerId) | 0, g.submitMove(i, j, l);
                            break;
                        case "touchend":
                        case "touchcancel":
                        case "MSPointerUp":
                            for (b = 0; b < e.length;) i = e[b], ++b, j = a.getX(i, d), l = a.getY(i, d), i = (f ? i.identifier : i.pointerId) | 0, g.submitUp(i, j, l)
                    }
                };
                f ? (b.addEventListener("touchstart", d, !1), b.addEventListener("touchmove", d, !1), b.addEventListener("touchend", d, !1), b.addEventListener("touchcancel", d, !1)) : (b.addEventListener("MSPointerDown", d, !1), b.addEventListener("MSPointerMove", d, !1), b.addEventListener("MSPointerUp", d, !1))
            } else this._touch = new h.DummyTouch;
            d = function(b) {
                switch (b.type) {
                    case "keydown":
                        a._keyboard.submitDown(b.keyCode) && b.preventDefault();
                        break;
                    case "keyup":
                        a._keyboard.submitUp(b.keyCode)
                }
            };
            b.addEventListener("keydown", d, !1);
            b.addEventListener("keyup",
                d, !1);
            var i = v.window.onerror;
            v.window.onerror = function(a, b, e) {
                y.uncaughtError.emit1(a);
                return null != i ? i(a, b, e) : !1
            };
            var j = h.html.HtmlUtil.loadExtension("hidden", v.document);
            null != j.value && (d = function() {
                y.hidden.set__(L.field(v.document, j.field))
            }, d(), v.document.addEventListener(j.prefix + "visibilitychange", d, !1), y.hidden.get_changed().connect(function(b) {
                b || (a._skipFrame = !0)
            }));
            this._lastUpdate = Date.now();
            this._skipFrame = !1;
            var l = h.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
            if (null !=
                l) {
                var k = v.window.performance,
                    m = null != k && h.html.HtmlUtil.polyfill("now", k);
                m ? this._lastUpdate = k.now() : K.logger.warn("No monotonic timer support, falling back to the system date", null);
                var n = null,
                    n = function(e) {
                        a.update(m ? k.now() : e);
                        l(n, b)
                    };
                l(n, b)
            } else K.logger.warn("No requestAnimationFrame support, falling back to setInterval", null), v.window.setInterval(function() {
                a.update(Date.now())
            }, 1E3 / 60)
        },
        __class__: h.html.HtmlPlatform
    };
    n.Value = function(a, b) {
        this._value = a;
        null != b && (this._changed = new n.Signal2(b))
    };
    k["flambe.util.Value"] = n.Value;
    n.Value.__name__ = ["flambe", "util", "Value"];
    n.Value.prototype = {
        get_changed: function() {
            null == this._changed && (this._changed = new n.Signal2);
            return this._changed
        },
        set__: function(a) {
            var b = this._value;
            a != b && (this._value = a, null != this._changed && this._changed.emit2(a, b));
            return a
        },
        watch: function(a) {
            a(this._value, this._value);
            return this.get_changed().connect(a)
        },
        __class__: n.Value,
        __properties__: {
            set__: "set__",
            get__: "get__",
            get_changed: "get_changed"
        }
    };
    n.SignalConnection = function(a,
        b) {
        this._internal_next = null;
        this._signal = a;
        this._internal_listener = b;
        this.stayInList = !0
    };
    k["flambe.util.SignalConnection"] = n.SignalConnection;
    n.SignalConnection.__name__ = ["flambe", "util", "SignalConnection"];
    n.SignalConnection.__interfaces__ = [n.Disposable];
    n.SignalConnection.prototype = {
        dispose: function() {
            null != this._signal && (this._signal._internal_disconnect(this), this._signal = null)
        },
        once: function() {
            this.stayInList = !1;
            return this
        },
        __class__: n.SignalConnection
    };
    n.SignalBase = function(a) {
        this._head = null !=
            a ? new n.SignalConnection(this, a) : null;
        this._deferredTasks = null
    };
    k["flambe.util.SignalBase"] = n.SignalBase;
    n.SignalBase.__name__ = ["flambe", "util", "SignalBase"];
    n.SignalBase.prototype = {
        listRemove: function(a) {
            for (var b = null, e = this._head; null != e;) {
                if (e == a) {
                    a = e._internal_next;
                    null == b ? this._head = a : b._internal_next = a;
                    break
                }
                b = e;
                e = e._internal_next
            }
        },
        listAdd: function(a, b) {
            if (b) a._internal_next = this._head, this._head = a;
            else {
                for (var e = null, c = this._head; null != c;) e = c, c = c._internal_next;
                null != e ? e._internal_next = a :
                    this._head = a
            }
        },
        didEmit: function(a) {
            for (this._head = a; null != this._deferredTasks;) this._deferredTasks.fn(), this._deferredTasks = this._deferredTasks.next
        },
        willEmit: function() {
            var a = this._head;
            this._head = n.SignalBase.DISPATCHING_SENTINEL;
            return a
        },
        defer: function(a) {
            for (var b = null, e = this._deferredTasks; null != e;) b = e, e = e.next;
            a = new n._SignalBase.Task(a);
            null != b ? b.next = a : this._deferredTasks = a
        },
        emit2: function(a, b) {
            for (var e = this.willEmit(), c = e; null != c;) c._internal_listener(a, b), c.stayInList || c.dispose(), c = c._internal_next;
            this.didEmit(e)
        },
        emit1: function(a) {
            for (var b = this.willEmit(), e = b; null != e;) e._internal_listener(a), e.stayInList || e.dispose(), e = e._internal_next;
            this.didEmit(b)
        },
        emit0: function() {
            for (var a = this.willEmit(), b = a; null != b;) b._internal_listener(), b.stayInList || b.dispose(), b = b._internal_next;
            this.didEmit(a)
        },
        _internal_disconnect: function(a) {
            var b = this;
            this._head == n.SignalBase.DISPATCHING_SENTINEL ? this.defer(function() {
                b.listRemove(a)
            }) : this.listRemove(a)
        },
        connectImpl: function(a, b) {
            var e = this,
                c = new n.SignalConnection(this,
                    a);
            this._head == n.SignalBase.DISPATCHING_SENTINEL ? this.defer(function() {
                e.listAdd(c, b)
            }) : this.listAdd(c, b);
            return c
        },
        __class__: n.SignalBase
    };
    n.Signal2 = function(a) {
        n.SignalBase.call(this, a)
    };
    k["flambe.util.Signal2"] = n.Signal2;
    n.Signal2.__name__ = ["flambe", "util", "Signal2"];
    n.Signal2.__super__ = n.SignalBase;
    n.Signal2.prototype = t(n.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: n.Signal2
    });
    n.Signal1 = function(a) {
        n.SignalBase.call(this, a)
    };
    k["flambe.util.Signal1"] =
        n.Signal1;
    n.Signal1.__name__ = ["flambe", "util", "Signal1"];
    n.Signal1.__super__ = n.SignalBase;
    n.Signal1.prototype = t(n.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: n.Signal1
    });
    E = {
        AnimatedFloat: function(a, b) {
            n.Value.call(this, a, b)
        }
    };
    k["flambe.animation.AnimatedFloat"] = E.AnimatedFloat;
    E.AnimatedFloat.__name__ = ["flambe", "animation", "AnimatedFloat"];
    E.AnimatedFloat.__super__ = n.Value;
    E.AnimatedFloat.prototype = t(n.Value.prototype, {
        set_behavior: function(a) {
            this._behavior =
                a;
            this.update(0);
            return a
        },
        update: function(a) {
            null != this._behavior && (n.Value.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
        },
        set__: function(a) {
            this._behavior = null;
            return n.Value.prototype.set__.call(this, a)
        },
        __class__: E.AnimatedFloat
    });
    y = function() {};
    k["flambe.System"] = y;
    y.__name__ = ["flambe", "System"];
    y.__properties__ = {
        get_keyboard: "get_keyboard",
        get_touch: "get_touch",
        get_pointer: "get_pointer",
        get_stage: "get_stage"
    };
    y.init = function() {
        y._calledInit ||
            (y._platform.init(), y._calledInit = !0)
    };
    y.createTexture = function(a, b) {
        return y._platform.getRenderer().createEmptyTexture(a, b)
    };
    n.Logger = function(a) {
        this._handler = a
    };
    k["flambe.util.Logger"] = n.Logger;
    n.Logger.__name__ = ["flambe", "util", "Logger"];
    n.Logger.prototype = {
        log: function(a, b, e) {
            null != this._handler && (null == b && (b = ""), null != e && (b = n.Strings.withFields(b, e)), this._handler.log(a, b))
        },
        warn: function(a, b) {
            this.log(n.LogLevel.Warn, a, b)
        },
        info: function(a, b) {
            this.log(n.LogLevel.Info, a, b)
        },
        __class__: n.Logger
    };
    K = function() {};
    k["flambe.Log"] = K;
    K.__name__ = ["flambe", "Log"];
    K.__super__ = n.PackageLog;
    K.prototype = t(n.PackageLog.prototype, {
        __class__: K
    });
    x = function(a) {
        null == a && (a = 1);
        this._internal_realDt = 0;
        this.scale = new E.AnimatedFloat(a)
    };
    k["flambe.SpeedAdjuster"] = x;
    x.__name__ = ["flambe", "SpeedAdjuster"];
    x.__super__ = P;
    x.prototype = t(P.prototype, {
        onUpdate: function(a) {
            0 < this._internal_realDt && (a = this._internal_realDt, this._internal_realDt = 0);
            this.scale.update(a)
        },
        get_name: function() {
            return "SpeedAdjuster_5"
        },
        __class__: x
    });
    E.Behavior = function() {};
    k["flambe.animation.Behavior"] = E.Behavior;
    E.Behavior.__name__ = ["flambe", "animation", "Behavior"];
    E.Behavior.prototype = {
        __class__: E.Behavior
    };
    E.Binding = function() {};
    k["flambe.animation.Binding"] = E.Binding;
    E.Binding.__name__ = ["flambe", "animation", "Binding"];
    E.Binding.__interfaces__ = [E.Behavior];
    E.Binding.prototype = {
        isComplete: function() {
            return !1
        },
        update: function() {
            var a = this._target._value;
            return null != this._fn ? this._fn(a) : a
        },
        __class__: E.Binding
    };
    z = {};
    z.AssetType = k["flambe.asset.AssetType"] = {
        __ename__: ["flambe", "asset", "AssetType"],
        __constructs__: ["Image", "Audio", "Data"]
    };
    z.AssetType.Image = ["Image", 0];
    z.AssetType.Image.toString = r;
    z.AssetType.Image.__enum__ = z.AssetType;
    z.AssetType.Audio = ["Audio", 1];
    z.AssetType.Audio.toString = r;
    z.AssetType.Audio.__enum__ = z.AssetType;
    z.AssetType.Data = ["Data", 2];
    z.AssetType.Data.toString = r;
    z.AssetType.Data.__enum__ = z.AssetType;
    z.AssetEntry = function(a, b, e, c) {
        this.name = a;
        this.url = b;
        this.type = e;
        this.bytes = c
    };
    k["flambe.asset.AssetEntry"] = z.AssetEntry;
    z.AssetEntry.__name__ = ["flambe", "asset", "AssetEntry"];
    z.AssetEntry.prototype = {
        getUrlExtension: function() {
            return n.Strings.getFileExtension(this.url.split("?")[0]).toLowerCase()
        },
        __class__: z.AssetEntry
    };
    z.AssetPack = function() {};
    k["flambe.asset.AssetPack"] = z.AssetPack;
    z.AssetPack.__name__ = ["flambe", "asset", "AssetPack"];
    z.AssetPack.prototype = {
        __class__: z.AssetPack,
        __properties__: {
            get_manifest: "get_manifest"
        }
    };
    G = void 0;
    v = void 0;
    G = function() {};
    k["js.Boot"] = G;
    G.__name__ = ["js", "Boot"];
    G.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var e = typeof a;
        if ("function" == e && (a.__name__ || a.__ename__)) e = "object";
        switch (e) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        for (var e = a[0] + "(", b = b + "\t", c = 2, d = a.length; c < d;) var f = c++,
                            e = 2 != f ? e + ("," + G.__string_rec(a[f], b)) : e + G.__string_rec(a[f], b);
                        return e + ")"
                    }
                    c = a.length;
                    e = "[";
                    b += "\t";
                    for (d = 0; d < c;) f = d++, e += (0 < f ? "," : "") + G.__string_rec(a[f], b);
                    return e + "]"
                }
                try {
                    d = a.toString
                } catch (g) {
                    return "???"
                }
                if (null != d && d != Object.toString && (e = a.toString(),
                        "[object Object]" != e)) return e;
                d = null;
                e = "{\n";
                b += "\t";
                c = null != a.hasOwnProperty;
                for (d in a)
                    if (!c || a.hasOwnProperty(d)) "prototype" == d || "__class__" == d || "__super__" == d || "__interfaces__" == d || "__properties__" == d || (2 != e.length && (e += ", \n"), e += b + d + " : " + G.__string_rec(a[d], b));
                b = b.substring(1);
                return e + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return "" + a
        }
    };
    G.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var e = a.__interfaces__;
        if (null != e)
            for (var c = 0, d =
                    e.length; c < d;) {
                var f = c++,
                    f = e[f];
                if (f == b || G.__interfLoop(f, b)) return !0
            }
        return G.__interfLoop(a.__super__, b)
    };
    G.__instanceof = function(a, b) {
        try {
            if (a instanceof b) return b == Array ? null == a.__enum__ : !0;
            if (G.__interfLoop(a.__class__, b)) return !0
        } catch (e) {
            if (null == b) return !1
        }
        switch (b) {
            case ha:
                return Math.ceil(a % 2147483648) === a;
            case fa:
                return "number" == typeof a;
            case ga:
                return !0 === a || !1 === a;
            case String:
                return "string" == typeof a;
            case ia:
                return !0;
            default:
                if (null == a) return !1;
                if (b == ja && null != a.__name__) return !0;
                null;
                if (b == ka && null != a.__ename__) return !0;
                null;
                return a.__enum__ == b
        }
    };
    G.__cast = function(a, b) {
        if (G.__instanceof(a, b)) return a;
        throw "Cannot cast " + p.string(a) + " to " + p.string(b);
    };
    n.Strings = function() {};
    k["flambe.util.Strings"] = n.Strings;
    n.Strings.__name__ = ["flambe", "util", "Strings"];
    n.Strings.getFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? A.substr(a, b + 1, null) : null
    };
    n.Strings.removeFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? A.substr(a, 0, b) : a
    };
    n.Strings.joinPath = function(a,
        b) {
        47 != a.charCodeAt(a.length - 1) && (a += "/");
        return a + b
    };
    n.Strings.withFields = function(a, b) {
        var e = b.length;
        if (0 < e) {
            for (var a = a + (0 < a.length ? " [" : "["), c = 0; c < e;) {
                0 < c && (a += ", ");
                var d = b[c],
                    f = b[c + 1];
                if (G.__instanceof(f, Error)) {
                    var g = f.stack;
                    null != g && (f = g)
                }
                a += d + "=" + p.string(f);
                c += 2
            }
            a += "]"
        }
        return a
    };
    v = function() {};
    k["js.Lib"] = v;
    v.__name__ = ["js", "Lib"];
    z.Manifest = function() {
        this._entries = []
    };
    k["flambe.asset.Manifest"] = z.Manifest;
    z.Manifest.__name__ = ["flambe", "asset", "Manifest"];
    z.Manifest.build = function(a, b) {
        null ==
            b && (b = !0);
        var e = z.Manifest._buildManifest.get(a);
        if (null == e) {
            if (b) throw n.Strings.withFields("Missing asset pack", ["name", a]);
            return null
        }
        return e.clone()
    };
    z.Manifest.inferType = function(a) {
        a = n.Strings.getFileExtension(a.split("?")[0]);
        if (null != a) switch (a.toLowerCase()) {
            case "png":
            case "jpg":
            case "gif":
                return z.AssetType.Image;
            case "ogg":
            case "m4a":
            case "mp3":
            case "wav":
                return z.AssetType.Audio
        }
        return z.AssetType.Data
    };
    z.Manifest.createBuildManifests = function() {
        var a = new F;
        a.set("initial_load", [{
                name: "ui/splash/splash_title_plain_backing.png",
                md5: "a7dfce8cd8af150c9c7b4aa7517b988c",
                bytes: 341570
            }, {
                name: "ui/splash/splash_title.png",
                md5: "ba3e8185ea2af6eb88393dd7a4a65462",
                bytes: 525359
            }, {
                name: "ui/splash/splash_monsters.png",
                md5: "e3e67527a2d938e0d6fcd894af01bee1",
                bytes: 216770
            }, {
                name: "ui/splash/splash_bg.jpg",
                md5: "25e497fdb5761bf84572ed410cc235ab",
                bytes: 466878
            }, {
                name: "ui/splash/sb_card_bored_splash_txt.png",
                md5: "1a05e436d6ec5ee274d5f4b09682d99d",
                bytes: 21187
            }, {
                name: "ui/splash/sb_and_pat.png",
                md5: "fe1d6bcb4f22c53773a2a6160501c755",
                bytes: 271546
            },
            {
                name: "ui/splash/nick_logo.png",
                md5: "d38fd32fc990945052ebaf0f99751b3b",
                bytes: 15684
            }, {
                name: "ui/splash/menu_sound_on_up.png",
                md5: "6893f98a08fa28dc4f4bdb882833bbe8",
                bytes: 32853
            }, {
                name: "ui/splash/menu_sound_on_down.png",
                md5: "d76c3e38d01fbdbdf29ca490fd044b71",
                bytes: 30722
            }, {
                name: "ui/splash/menu_sound_off_up.png",
                md5: "9612e5baf5864ec377e6aa483b8bc97f",
                bytes: 33621
            }, {
                name: "ui/splash/menu_sound_off_down.png",
                md5: "5ae726324f532a940d8854723b3c25fd",
                bytes: 31598
            }, {
                name: "audio/spongebobsquarepants_cardboardjungle.ogg",
                md5: "49b6df262c8453431d2023864e425a4a",
                bytes: 526701
            }, {
                name: "audio/spongebobsquarepants_cardboardjungle.mp3",
                md5: "44a8969d5001c8628734437625aaadf7",
                bytes: 716628
            }, {
                name: "audio/button_click.ogg",
                md5: "ae333f53466d71e183f228042fc18b59",
                bytes: 15649
            }, {
                name: "audio/button_click.mp3",
                md5: "0f1c4a59e05427e17a52bbba7762bb6e",
                bytes: 12981
            }
        ]);
        a.set("gameplay_universal", [{
                name: "ui/top_header_backing.png",
                md5: "672d443d5ae2059f2c9e2ab9bd82b781",
                bytes: 291935
            }, {
                name: "ui/quit/qc_btn_blank_up.png",
                md5: "00ad60d16a74120c5249a718a60ed5a2",
                bytes: 37837
            }, {
                name: "ui/quit/qc_btn_blank_down.png",
                md5: "0d82782a7155728cb0bd2d840a03439b",
                bytes: 34550
            }, {
                name: "ui/quit/qc_backing.png",
                md5: "3af52d3bf9c40e00d46b55c2dcab49e6",
                bytes: 312810
            }, {
                name: "ui/popups/popup_backing_red.png",
                md5: "0611f2320c11caf5c6f42dc0741a436e",
                bytes: 155747
            }, {
                name: "ui/popups/popup_backing_green.png",
                md5: "e71931bd12d058a73be2d1857086de70",
                bytes: 152016
            }, {
                name: "ui/popups/popup_backing_blue.png",
                md5: "46aeb8c8d97d238484aab96178fce4fb",
                bytes: 171815
            }, {
                name: "ui/menu/menu_play_up.png",
                md5: "2c2165c4afd7d299b5a200c878c8a407",
                bytes: 38882
            }, {
                name: "ui/menu/menu_play_down.png",
                md5: "356e81a2a1498435c9eced59fb498c9c",
                bytes: 32328
            }, {
                name: "ui/menu/menu_help_up.png",
                md5: "88d98d004fab2a793ad95d05723cedf0",
                bytes: 31353
            }, {
                name: "ui/menu/menu_help_down.png",
                md5: "5c3421b9cd9d7c42654147d607b34e98",
                bytes: 29363
            }, {
                name: "ui/menu/menu_close_up.png",
                md5: "7566cffc63042b17dc706aff0b4a22a4",
                bytes: 33846
            }, {
                name: "ui/menu/menu_close_down.png",
                md5: "fbe3e126252f28768e04289e7b061ac6",
                bytes: 32036
            }, {
                name: "ui/menu/menu_backing.png",
                md5: "35b7e29b8e68d14967bc079d4c2d9835",
                bytes: 511461
            }, {
                name: "ui/intro_backing.png",
                md5: "5d05ec034f8e5d304d93c1619d70c323",
                bytes: 160142
            }, {
                name: "ui/intro/intro_story_sb_happy.png",
                md5: "82d79755aa123f0dc69983eb41811fbb",
                bytes: 87042
            }, {
                name: "ui/intro/intro_story_sb_bored.png",
                md5: "afd24235b9c0079dbd09f92c2faa5c39",
                bytes: 75835
            }, {
                name: "ui/intro/intro_story_pat.png",
                md5: "a84a6e3d42c8067dd92041e955f163a9",
                bytes: 64401
            }, {
                name: "ui/intro/intro_story_backing.png",
                md5: "9384c892188520c80e08178b61f5ec17",
                bytes: 770517
            },
            {
                name: "ui/help/help_btn_back.png",
                md5: "9611755dabeff47d6106dc7e9bafd9d4",
                bytes: 12856
            }, {
                name: "ui/help/help_backing.png",
                md5: "f809d30be45f40a549962a5772c7d4e1",
                bytes: 900828
            }, {
                name: "ui/gameplay_hud/hud_score_backing.png",
                md5: "0895720f1ad6d70589ab91703f423174",
                bytes: 28830
            }, {
                name: "ui/gameplay_hud/hud_pause_up.png",
                md5: "9d9757adf6da9a343d226782ed34f20c",
                bytes: 10005
            }, {
                name: "ui/gameplay_hud/hud_pause_down.png",
                md5: "fd912ee880ea721005090ef424fedae2",
                bytes: 9277
            }, {
                name: "ui/gameplay_hud/hud_health_slider_02.png",
                md5: "7cb9000e7818d1f0da395c4de8178145",
                bytes: 4290
            }, {
                name: "ui/gameplay_hud/hud_health_slider.png",
                md5: "e63fef2a9345cdf7c18e4a2148729d27",
                bytes: 2438
            }, {
                name: "ui/gameplay_hud/hud_health_backing.png",
                md5: "985a13abba2b7c973358d2c5d37ae0c5",
                bytes: 38943
            }, {
                name: "ui/gameplay_hud/hud_attack_slider.png",
                md5: "045aed65074364e712470b8d15df2195",
                bytes: 2481
            }, {
                name: "ui/gameplay_hud/hud_attack_backing.png",
                md5: "b4bac42999f8926b757578669686069f",
                bytes: 42590
            }, {
                name: "ui/gameplay_hud/energy_glow_02.png",
                md5: "58bcca016130b1b49a7e00baa31a759b",
                bytes: 8086
            }, {
                name: "ui/gameplay_hud/energy_glow_01.png",
                md5: "7ad2f60fc48413e61c0234836958cb9c",
                bytes: 7319
            }, {
                name: "ui/end_screen/sb_endscreen_small_backing_01.png",
                md5: "db4bc6d0037233d984253bd50d12fdc1",
                bytes: 300117
            }, {
                name: "ui/end_screen/sb_endscreen_backing.png",
                md5: "b0ec7dfcd5c30f5564790c821e2362cc",
                bytes: 263511
            }, {
                name: "ui/end_screen/endscreen_nobacking_bg.jpg",
                md5: "41f06056fbca9b16e7ca0f8daa3fd69c",
                bytes: 171074
            }, {
                name: "shadow.png",
                md5: "f882417e49c2971e95a08abbfa91ba02",
                bytes: 428
            }, {
                name: "particles/poof.png",
                md5: "535c83ec46db471b4fae4160b4dc5c3c",
                bytes: 4442
            }, {
                name: "particles/particle_glow.png",
                md5: "90b4bb6dbed71c7c4bd89f1dea8d7481",
                bytes: 4920
            }, {
                name: "particles/particle_cardboard_03.png",
                md5: "156c746e01459229891aa5271a34452c",
                bytes: 2189
            }, {
                name: "particles/particle_cardboard_02.png",
                md5: "a019d087fc60c9872fa01b0f549cb6e8",
                bytes: 1236
            }, {
                name: "particles/particle_cardboard_01.png",
                md5: "c80065bd18cc888dea98184e8a8327b2",
                bytes: 2394
            }, {
                name: "mark.png",
                md5: "0de99ef272c1558ac2ed535839b2517e",
                bytes: 359
            }, {
                name: "jungle_midg_plant_02.png",
                md5: "8a2fe929e3165b30ddfa5b2b8a0dce07",
                bytes: 50952
            }, {
                name: "jungle_midg_plant_01.png",
                md5: "131b67526eedb6fff6fbd3c6deb23f93",
                bytes: 14443
            }, {
                name: "jungle_bg_sky.jpg",
                md5: "4df33a7792bd712648545bcbe9bbcd6c",
                bytes: 357079
            }, {
                name: "jungle_bg_mid1.png",
                md5: "0442a67ccfeada4b635ceef68072ccbb",
                bytes: 1065259
            }, {
                name: "jungle_bg_fog_overlay.png",
                md5: "b23ce3644d8f1509aad8701fa29b6e44",
                bytes: 219666
            }, {
                name: "jungle_bg_fg1.png",
                md5: "788eb4d27d05136e3bb302eca1bb331f",
                bytes: 366746
            }, {
                name: "gameplay_asset/library.json",
                md5: "e16e4fe0f1dd435def63b07726493fb7",
                bytes: 238027
            }, {
                name: "gameplay_asset/atlas1.png",
                md5: "19281a06d9fca9d226e7e44bb66b216f",
                bytes: 429913
            }, {
                name: "gameplay_asset/atlas0.png",
                md5: "ac846669a0ff8f5333a7718170d87f78",
                bytes: 1110584
            }, {
                name: "audio/zap.ogg",
                md5: "4b4b52c9ccb6bd30084a32255785a3ae",
                bytes: 16898
            }, {
                name: "audio/zap.mp3",
                md5: "53e5f03ee012a11dee740ed4ab53cc61",
                bytes: 13164
            }, {
                name: "audio/sword_swing.ogg",
                md5: "7e406641da9fb05df6099621d81823ae",
                bytes: 13689
            }, {
                name: "audio/sword_swing.mp3",
                md5: "33be6c60b82e0a0f069def3c76717ed8",
                bytes: 13994
            },
            {
                name: "audio/sword_shing.ogg",
                md5: "742bc395f76a293646c76d94c96066b4",
                bytes: 13132
            }, {
                name: "audio/sword_shing.mp3",
                md5: "aaabd1cefe3822cc0e3a390b0b7aa13c",
                bytes: 24616
            }, {
                name: "audio/hit.ogg",
                md5: "64018d7aee89c7ff77e34d9a1c0cb463",
                bytes: 10063
            }, {
                name: "audio/hit.mp3",
                md5: "d3de30a9fdf0c7a29cbfbe58fbb696b5",
                bytes: 13164
            }
        ]);
        a.set("fonts_ru", [{
            name: "Basic.png",
            md5: "5c0bcb3adedf0e5176eec45bb9478614",
            bytes: 856864
        }, {
            name: "Basic.fnt",
            md5: "f9dc0f8dd72ff2a6bce8de2e22379918",
            bytes: 41267
        }]);
        a.set("fonts_la", [{
            name: "sb_jungle_stencil.png",
            md5: "40884c88513ce39d7017cbd35e6cac14",
            bytes: 225391
        }, {
            name: "sb_jungle_stencil.fnt",
            md5: "99227be5ffd78c80db3ced504c7d8ca1",
            bytes: 29782
        }, {
            name: "popup_font_teal.png",
            md5: "d0074b4fc43052d88b5108877eafff0b",
            bytes: 436512
        }, {
            name: "popup_font_teal.fnt",
            md5: "0ff02b375bc097e4951029882a8d431a",
            bytes: 29543
        }, {
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("fonts_kr", [{
            name: "sb_jungle_stencil.png",
            md5: "40884c88513ce39d7017cbd35e6cac14",
            bytes: 225391
        }, {
            name: "sb_jungle_stencil.fnt",
            md5: "99227be5ffd78c80db3ced504c7d8ca1",
            bytes: 29782
        }, {
            name: "popup_font_teal.png",
            md5: "d0074b4fc43052d88b5108877eafff0b",
            bytes: 436512
        }, {
            name: "popup_font_teal.fnt",
            md5: "0ff02b375bc097e4951029882a8d431a",
            bytes: 29543
        }, {
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("fonts_jp", [{
                name: "sb_jungle_stencil.png",
                md5: "40884c88513ce39d7017cbd35e6cac14",
                bytes: 225391
            },
            {
                name: "sb_jungle_stencil.fnt",
                md5: "99227be5ffd78c80db3ced504c7d8ca1",
                bytes: 29782
            }, {
                name: "popup_font_teal.png",
                md5: "d0074b4fc43052d88b5108877eafff0b",
                bytes: 436512
            }, {
                name: "popup_font_teal.fnt",
                md5: "0ff02b375bc097e4951029882a8d431a",
                bytes: 29543
            }, {
                name: "Basic.png",
                md5: "6a36225f74ea1a7793667cffcb1047ce",
                bytes: 622185
            }, {
                name: "Basic.fnt",
                md5: "a0e96df3ee1859e9a082bb8b061791c5",
                bytes: 25155
            }
        ]);
        a.set("fonts_en", [{
            name: "sb_jungle_stencil.png",
            md5: "e68beda5adb567d10e82106e46308430",
            bytes: 87346
        }, {
            name: "sb_jungle_stencil.fnt",
            md5: "acc6014d235af2fe8bdb8a0582d4f3fd",
            bytes: 12029
        }, {
            name: "popup_font_teal.png",
            md5: "b4f096e13c58f58fc9db3ff47066239e",
            bytes: 218494
        }, {
            name: "popup_font_teal.fnt",
            md5: "696540ecbea9f845b80033aa39f41698",
            bytes: 11791
        }, {
            name: "Basic.png",
            md5: "cf7a6a09922da8eff284000b0de322e7",
            bytes: 275327
        }, {
            name: "Basic.fnt",
            md5: "b8544d3108a0eb3b425441d6598fd234",
            bytes: 12012
        }]);
        a.set("fonts_cn", [{
            name: "sb_jungle_stencil.png",
            md5: "40884c88513ce39d7017cbd35e6cac14",
            bytes: 225391
        }, {
            name: "sb_jungle_stencil.fnt",
            md5: "99227be5ffd78c80db3ced504c7d8ca1",
            bytes: 29782
        }, {
            name: "popup_font_teal.png",
            md5: "d0074b4fc43052d88b5108877eafff0b",
            bytes: 436512
        }, {
            name: "popup_font_teal.fnt",
            md5: "0ff02b375bc097e4951029882a8d431a",
            bytes: 29543
        }, {
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("bootstrap", [{
                name: "ui/loading_spinner_top.png",
                md5: "1db493b23564bd8f593fc41cd631b9da",
                bytes: 61200
            }, {
                name: "ui/loading_spinner_bottom.png",
                md5: "87676ca80b29ce0fa9e362dc496e1600",
                bytes: 73318
            },
            {
                name: "ui/loading_panel.jpg",
                md5: "1ac4cb363cc3de137ae2288b4a703845",
                bytes: 588796
            }, {
                name: "ui/loading_bar_slider.png",
                md5: "27b3f235b9bf8acf324005bf54c5347e",
                bytes: 8187
            }, {
                name: "ui/loading_bar_backing.png",
                md5: "fab524f462740be896cae54b21ebbcfd",
                bytes: 183827
            }, {
                name: "config/translation_ru.xml",
                md5: "de33f607f7de6dc9f71a6cbd8898d822",
                bytes: 11694
            }, {
                name: "config/translation_la.xml",
                md5: "253e2cc312b836b389411d779817b964",
                bytes: 12222
            }, {
                name: "config/translation_kr.xml",
                md5: "253e2cc312b836b389411d779817b964",
                bytes: 12222
            },
            {
                name: "config/translation_jp.xml",
                md5: "253e2cc312b836b389411d779817b964",
                bytes: 12222
            }, {
                name: "config/translation_en.xml",
                md5: "ce6170b5519d7a1a99369c9cb5a27e0d",
                bytes: 12222
            }, {
                name: "config/translation_cn.xml",
                md5: "253e2cc312b836b389411d779817b964",
                bytes: 12222
            }, {
                name: "config/config.xml",
                md5: "fcdb63cafef15f74ff84444a5a51adb1",
                bytes: 1221
            }, {
                name: "audio/silent.ogg",
                md5: "3526550092a0e091f382852de5ef2315",
                bytes: 5514
            }, {
                name: "audio/silent.mp3",
                md5: "ba9e6829ba32e427142251a85cbd4fbb",
                bytes: 2114
            }
        ]);
        a.set("air", [{
            name: "icons/icon48.png",
            md5: "e310873f7870789ec2ddffb01e3b9c23",
            bytes: 9187
        }, {
            name: "icons/icon32.png",
            md5: "db4c0e02b46c24bfabbcf33c6807fbb8",
            bytes: 6111
        }, {
            name: "icons/icon16.png",
            md5: "9160a9857f1d99d4d1a5722de41941ba",
            bytes: 3411
        }, {
            name: "icons/icon128.png",
            md5: "0c8d573ff622474a53b7e4c76b75cda7",
            bytes: 34016
        }, {
            name: "Default.png",
            md5: "6617a9132c7566551711a15f42584d38",
            bytes: 4588
        }, {
            name: "Default-568h@2x.png",
            md5: "dc1b6528f2e9312e068aad2f53366b7e",
            bytes: 4912
        }]);
        for (var b = new F, e = a.keys(); e.hasNext();) {
            var c =
                e.next(),
                d = new z.Manifest;
            d.set_relativeBasePath("assets");
            for (var f = 0, g = a.get(c); f < g.length;) {
                var h = g[f];
                ++f;
                var i = h.name,
                    j = c + "/" + i + "?v=" + p.string(h.md5),
                    l = z.Manifest.inferType(i);
                if (l == z.AssetType.Image || l == z.AssetType.Audio) i = n.Strings.removeFileExtension(i);
                d.add(i, j, h.bytes, l)
            }
            b.set(c, d)
        }
        return b
    };
    z.Manifest.prototype = {
        set_externalBasePath: function(a) {
            this._externalBasePath = a;
            null != a && null;
            return a
        },
        get_externalBasePath: function() {
            return this._externalBasePath
        },
        set_relativeBasePath: function(a) {
            this._relativeBasePath =
                a;
            null != a && null;
            return a
        },
        get_relativeBasePath: function() {
            return this._relativeBasePath
        },
        getFullURL: function(a) {
            var b = null != this.get_externalBasePath() && z.Manifest._supportsCrossOrigin ? this.get_externalBasePath() : this.get_relativeBasePath(),
                e = null != this.get_externalBasePath() ? this.get_externalBasePath() : this.get_relativeBasePath();
            a.type == z.AssetType.Data && (e = b);
            return null != e ? n.Strings.joinPath(e, a.url) : a.url
        },
        clone: function() {
            var a = new z.Manifest;
            a.set_relativeBasePath(this.get_relativeBasePath());
            a.set_externalBasePath(this.get_externalBasePath());
            a._entries = this._entries.slice();
            return a
        },
        iterator: function() {
            return A.iter(this._entries)
        },
        add: function(a, b, e, c) {
            null == e && (e = 0);
            null == c && (c = z.Manifest.inferType(b));
            a = new z.AssetEntry(a, b, c, e);
            this._entries.push(a);
            return a
        },
        __class__: z.Manifest,
        __properties__: {
            set_relativeBasePath: "set_relativeBasePath",
            get_relativeBasePath: "get_relativeBasePath",
            set_externalBasePath: "set_externalBasePath",
            get_externalBasePath: "get_externalBasePath"
        }
    };
    o.BlendMode =
        k["flambe.display.BlendMode"] = {
            __ename__: ["flambe", "display", "BlendMode"],
            __constructs__: ["Normal", "Add", "CopyExperimental"]
        };
    o.BlendMode.Normal = ["Normal", 0];
    o.BlendMode.Normal.toString = r;
    o.BlendMode.Normal.__enum__ = o.BlendMode;
    o.BlendMode.Add = ["Add", 1];
    o.BlendMode.Add.toString = r;
    o.BlendMode.Add.__enum__ = o.BlendMode;
    o.BlendMode.CopyExperimental = ["CopyExperimental", 2];
    o.BlendMode.CopyExperimental.toString = r;
    o.BlendMode.CopyExperimental.__enum__ = o.BlendMode;
    o.FillSprite = function(a, b, e) {
        o.Sprite.call(this);
        this.color = a;
        this.width = new E.AnimatedFloat(b);
        this.height = new E.AnimatedFloat(e)
    };
    k["flambe.display.FillSprite"] = o.FillSprite;
    o.FillSprite.__name__ = ["flambe", "display", "FillSprite"];
    o.FillSprite.__super__ = o.Sprite;
    o.FillSprite.prototype = t(o.Sprite.prototype, {
        onUpdate: function(a) {
            o.Sprite.prototype.onUpdate.call(this, a);
            this.width.update(a);
            this.height.update(a)
        },
        getNaturalHeight: function() {
            return this.height._value
        },
        getNaturalWidth: function() {
            return this.width._value
        },
        draw: function(a) {
            a.fillRect(this.color,
                0, 0, this.width._value, this.height._value)
        },
        __class__: o.FillSprite
    });
    o.Font = function(a, b) {
        this.name = b;
        this._glyphs = new W;
        for (var e = new o._Font.ConfigParser(a.getFile(b + ".fnt")), c = new W, d = b.lastIndexOf("/"), d = 0 <= d ? A.substr(b, 0, d + 1) : "", f = e.keywords(); f.hasNext();) switch (f.next()) {
            case "info":
                for (var g = e.pairs(); g.hasNext();) {
                    var h = g.next();
                    switch (h.key) {
                        case "size":
                            this.size = h.getInt()
                    }
                }
                break;
            case "page":
                for (var g = 0, i = null, j = e.pairs(); j.hasNext();) switch (h = j.next(), h.key) {
                    case "id":
                        g = h.getInt();
                        break;
                    case "file":
                        i = h.getString()
                }
                c.set(g, a.getTexture(d + n.Strings.removeFileExtension(i)));
                break;
            case "char":
                g = null;
                for (i = e.pairs(); i.hasNext();) switch (h = i.next(), h.key) {
                    case "id":
                        g = new o.Glyph(h.getInt());
                        break;
                    case "x":
                        g.x = h.getInt();
                        break;
                    case "y":
                        g.y = h.getInt();
                        break;
                    case "width":
                        g.width = h.getInt();
                        break;
                    case "height":
                        g.height = h.getInt();
                        break;
                    case "page":
                        g.page = c.get(h.getInt());
                        break;
                    case "xoffset":
                        g.xOffset = h.getInt();
                        break;
                    case "yoffset":
                        g.yOffset = h.getInt();
                        break;
                    case "xadvance":
                        g.xAdvance = h.getInt()
                }
                this._glyphs.set(g.charCode,
                    g);
                break;
            case "kerning":
                g = null;
                i = -1;
                for (j = e.pairs(); j.hasNext();) switch (h = j.next(), h.key) {
                    case "first":
                        g = this._glyphs.get(h.getInt());
                        break;
                    case "second":
                        i = h.getInt();
                        break;
                    case "amount":
                        g._internal_setKerning(i, h.getInt())
                }
        }
    };
    k["flambe.display.Font"] = o.Font;
    o.Font.__name__ = ["flambe", "display", "Font"];
    o.Font.prototype = {
        getGlyphs: function(a) {
            for (var b = [], e = 0, c = a.length; e < c;) {
                var d = e++,
                    d = a.charCodeAt(d),
                    f = this._glyphs.get(d);
                null != f ? b.push(f) : K.logger.warn("Requested a missing character from font", ["font", this.name, "charCode", d])
            }
            return b
        },
        __class__: o.Font
    };
    o.Glyph = function(a) {
        this.charCode = a
    };
    k["flambe.display.Glyph"] = o.Glyph;
    o.Glyph.__name__ = ["flambe", "display", "Glyph"];
    o.Glyph.prototype = {
        _internal_setKerning: function(a, b) {
            null == this._kernings && (this._kernings = new W);
            this._kernings.set(a, b)
        },
        getKerning: function(a) {
            return null != this._kernings ? this._kernings.get(a) | 0 : 0
        },
        draw: function(a, b, e) {
            0 < this.width && a.drawSubImage(this.page, b + this.xOffset, e + this.yOffset, this.x, this.y, this.width, this.height)
        },
        __class__: o.Glyph
    };
    o._Font = {};
    o._Font.ConfigParser = function(a) {
        this._configText = a;
        this._keywordPattern = new X("([a-z]+)(.*)", "");
        this._pairPattern = new X('([a-z]+)=("[^"]*"|[^\\s]+)', "")
    };
    k["flambe.display._Font.ConfigParser"] = o._Font.ConfigParser;
    o._Font.ConfigParser.__name__ = ["flambe", "display", "_Font", "ConfigParser"];
    o._Font.ConfigParser.advance = function(a, b) {
        var e = b.matchedPos();
        return A.substr(a, e.pos + e.len, a.length)
    };
    o._Font.ConfigParser.prototype = {
        pairs: function() {
            var a = this,
                b = this._pairText;
            return {
                next: function() {
                    b = o._Font.ConfigParser.advance(b, a._pairPattern);
                    return new o._Font.ConfigPair(a._pairPattern.matched(1), a._pairPattern.matched(2))
                },
                hasNext: function() {
                    return a._pairPattern.match(b)
                }
            }
        },
        keywords: function() {
            var a = this,
                b = this._configText;
            return {
                next: function() {
                    b = o._Font.ConfigParser.advance(b, a._keywordPattern);
                    a._pairText = a._keywordPattern.matched(2);
                    return a._keywordPattern.matched(1)
                },
                hasNext: function() {
                    return a._keywordPattern.match(b)
                }
            }
        },
        __class__: o._Font.ConfigParser
    };
    o._Font.ConfigPair =
        function(a, b) {
            this.key = a;
            this._value = b
        };
    k["flambe.display._Font.ConfigPair"] = o._Font.ConfigPair;
    o._Font.ConfigPair.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
    o._Font.ConfigPair.prototype = {
        getString: function() {
            return 34 != this._value.charCodeAt(0) ? null : A.substr(this._value, 1, this._value.length - 2)
        },
        getInt: function() {
            return p.parseInt(this._value)
        },
        __class__: o._Font.ConfigPair
    };
    o.Graphics = function() {};
    k["flambe.display.Graphics"] = o.Graphics;
    o.Graphics.__name__ = ["flambe", "display", "Graphics"];
    o.Graphics.prototype = {
        __class__: o.Graphics
    };
    o.Orientation = k["flambe.display.Orientation"] = {
        __ename__: ["flambe", "display", "Orientation"],
        __constructs__: ["Portrait", "Landscape"]
    };
    o.Orientation.Portrait = ["Portrait", 0];
    o.Orientation.Portrait.toString = r;
    o.Orientation.Portrait.__enum__ = o.Orientation;
    o.Orientation.Landscape = ["Landscape", 1];
    o.Orientation.Landscape.toString = r;
    o.Orientation.Landscape.__enum__ = o.Orientation;
    o.Stage = function() {};
    k["flambe.display.Stage"] = o.Stage;
    o.Stage.__name__ = ["flambe", "display",
        "Stage"
    ];
    o.Stage.prototype = {
        __class__: o.Stage,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_fullscreenSupported: "get_fullscreenSupported"
        }
    };
    o.TextSprite = function(a, b) {
        null == b && (b = "");
        this._width = this._height = 0;
        this._glyphs = this._offsets = this._font = this._text = null;
        o.Sprite.call(this);
        this._font = a;
        this._text = b;
        this._flags |= 32
    };
    k["flambe.display.TextSprite"] = o.TextSprite;
    o.TextSprite.__name__ = ["flambe", "display", "TextSprite"];
    o.TextSprite.__super__ = o.Sprite;
    o.TextSprite.prototype =
        t(o.Sprite.prototype, {
            updateGlyphs: function() {
                if (0 != (this._flags & 32)) {
                    this._flags &= -33;
                    this._glyphs = this._font.getGlyphs(this._text);
                    this._offsets = [0];
                    for (var a = this._height = this._width = 0, b = this._glyphs.length; a < b;) {
                        var e = this._glyphs[a];
                        ++a;
                        a == b ? this._width += e.width : (this._width += e.xAdvance + e.getKerning(this._glyphs[a].charCode), this._offsets.push(this._width));
                        this._height = I.FMath.max(this._height, e.height + e.yOffset)
                    }
                }
            },
            set_font: function(a) {
                this._font = a;
                this._flags |= 32;
                return a
            },
            set_text: function(a) {
                this._text =
                    a;
                this._flags |= 32;
                return a
            },
            getNaturalHeight: function() {
                this.updateGlyphs();
                return this._height
            },
            getNaturalWidth: function() {
                this.updateGlyphs();
                return this._width
            },
            draw: function(a) {
                this.updateGlyphs();
                for (var b = 0, e = this._glyphs.length; b < e;) this._glyphs[b].draw(a, this._offsets[b], 0), ++b
            },
            __class__: o.TextSprite,
            __properties__: t(o.Sprite.prototype.__properties__, {
                set_text: "set_text",
                get_text: "get_text",
                set_font: "set_font",
                get_font: "get_font"
            })
        });
    o.Texture = function() {};
    k["flambe.display.Texture"] = o.Texture;
    o.Texture.__name__ = ["flambe", "display", "Texture"];
    o.Texture.prototype = {
        __class__: o.Texture,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_graphics: "get_graphics"
        }
    };
    x = {
        External: function() {}
    };
    k["flambe.external.External"] = x.External;
    x.External.__name__ = ["flambe", "external", "External"];
    x.External.prototype = {
        __class__: x.External,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    d = {};
    d.Key = k["flambe.input.Key"] = {
        __ename__: ["flambe", "input", "Key"],
        __constructs__: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Number0,Number1,Number2,Number3,Number4,Number5,Number6,Number7,Number8,Number9,Numpad0,Numpad1,Numpad2,Numpad3,Numpad4,Numpad5,Numpad6,Numpad7,Numpad8,Numpad9,NumpadAdd,NumpadDecimal,NumpadDivide,NumpadEnter,NumpadMultiply,NumpadSubtract,F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,Left,Up,Right,Down,Alt,Backquote,Backslash,Backspace,CapsLock,Comma,Command,Control,Delete,End,Enter,Equals,Escape,Home,Insert,LeftBracket,Minus,PageDown,PageUp,Period,Quote,RightBracket,Semicolon,Shift,Slash,Space,Tab,Menu,Search,Unknown".split(",")
    };
    d.Key.A = ["A", 0];
    d.Key.A.toString = r;
    d.Key.A.__enum__ = d.Key;
    d.Key.B = ["B", 1];
    d.Key.B.toString = r;
    d.Key.B.__enum__ = d.Key;
    d.Key.C = ["C", 2];
    d.Key.C.toString = r;
    d.Key.C.__enum__ = d.Key;
    d.Key.D = ["D", 3];
    d.Key.D.toString = r;
    d.Key.D.__enum__ = d.Key;
    d.Key.E = ["E", 4];
    d.Key.E.toString = r;
    d.Key.E.__enum__ = d.Key;
    d.Key.F = ["F", 5];
    d.Key.F.toString = r;
    d.Key.F.__enum__ = d.Key;
    d.Key.G = ["G", 6];
    d.Key.G.toString = r;
    d.Key.G.__enum__ = d.Key;
    d.Key.H = ["H", 7];
    d.Key.H.toString = r;
    d.Key.H.__enum__ = d.Key;
    d.Key.I = ["I", 8];
    d.Key.I.toString = r;
    d.Key.I.__enum__ =
        d.Key;
    d.Key.J = ["J", 9];
    d.Key.J.toString = r;
    d.Key.J.__enum__ = d.Key;
    d.Key.K = ["K", 10];
    d.Key.K.toString = r;
    d.Key.K.__enum__ = d.Key;
    d.Key.L = ["L", 11];
    d.Key.L.toString = r;
    d.Key.L.__enum__ = d.Key;
    d.Key.M = ["M", 12];
    d.Key.M.toString = r;
    d.Key.M.__enum__ = d.Key;
    d.Key.N = ["N", 13];
    d.Key.N.toString = r;
    d.Key.N.__enum__ = d.Key;
    d.Key.O = ["O", 14];
    d.Key.O.toString = r;
    d.Key.O.__enum__ = d.Key;
    d.Key.P = ["P", 15];
    d.Key.P.toString = r;
    d.Key.P.__enum__ = d.Key;
    d.Key.Q = ["Q", 16];
    d.Key.Q.toString = r;
    d.Key.Q.__enum__ = d.Key;
    d.Key.R = ["R", 17];
    d.Key.R.toString =
        r;
    d.Key.R.__enum__ = d.Key;
    d.Key.S = ["S", 18];
    d.Key.S.toString = r;
    d.Key.S.__enum__ = d.Key;
    d.Key.T = ["T", 19];
    d.Key.T.toString = r;
    d.Key.T.__enum__ = d.Key;
    d.Key.U = ["U", 20];
    d.Key.U.toString = r;
    d.Key.U.__enum__ = d.Key;
    d.Key.V = ["V", 21];
    d.Key.V.toString = r;
    d.Key.V.__enum__ = d.Key;
    d.Key.W = ["W", 22];
    d.Key.W.toString = r;
    d.Key.W.__enum__ = d.Key;
    d.Key.X = ["X", 23];
    d.Key.X.toString = r;
    d.Key.X.__enum__ = d.Key;
    d.Key.Y = ["Y", 24];
    d.Key.Y.toString = r;
    d.Key.Y.__enum__ = d.Key;
    d.Key.Z = ["Z", 25];
    d.Key.Z.toString = r;
    d.Key.Z.__enum__ = d.Key;
    d.Key.Number0 = ["Number0", 26];
    d.Key.Number0.toString = r;
    d.Key.Number0.__enum__ = d.Key;
    d.Key.Number1 = ["Number1", 27];
    d.Key.Number1.toString = r;
    d.Key.Number1.__enum__ = d.Key;
    d.Key.Number2 = ["Number2", 28];
    d.Key.Number2.toString = r;
    d.Key.Number2.__enum__ = d.Key;
    d.Key.Number3 = ["Number3", 29];
    d.Key.Number3.toString = r;
    d.Key.Number3.__enum__ = d.Key;
    d.Key.Number4 = ["Number4", 30];
    d.Key.Number4.toString = r;
    d.Key.Number4.__enum__ = d.Key;
    d.Key.Number5 = ["Number5", 31];
    d.Key.Number5.toString = r;
    d.Key.Number5.__enum__ = d.Key;
    d.Key.Number6 = ["Number6",
        32
    ];
    d.Key.Number6.toString = r;
    d.Key.Number6.__enum__ = d.Key;
    d.Key.Number7 = ["Number7", 33];
    d.Key.Number7.toString = r;
    d.Key.Number7.__enum__ = d.Key;
    d.Key.Number8 = ["Number8", 34];
    d.Key.Number8.toString = r;
    d.Key.Number8.__enum__ = d.Key;
    d.Key.Number9 = ["Number9", 35];
    d.Key.Number9.toString = r;
    d.Key.Number9.__enum__ = d.Key;
    d.Key.Numpad0 = ["Numpad0", 36];
    d.Key.Numpad0.toString = r;
    d.Key.Numpad0.__enum__ = d.Key;
    d.Key.Numpad1 = ["Numpad1", 37];
    d.Key.Numpad1.toString = r;
    d.Key.Numpad1.__enum__ = d.Key;
    d.Key.Numpad2 = ["Numpad2", 38];
    d.Key.Numpad2.toString = r;
    d.Key.Numpad2.__enum__ = d.Key;
    d.Key.Numpad3 = ["Numpad3", 39];
    d.Key.Numpad3.toString = r;
    d.Key.Numpad3.__enum__ = d.Key;
    d.Key.Numpad4 = ["Numpad4", 40];
    d.Key.Numpad4.toString = r;
    d.Key.Numpad4.__enum__ = d.Key;
    d.Key.Numpad5 = ["Numpad5", 41];
    d.Key.Numpad5.toString = r;
    d.Key.Numpad5.__enum__ = d.Key;
    d.Key.Numpad6 = ["Numpad6", 42];
    d.Key.Numpad6.toString = r;
    d.Key.Numpad6.__enum__ = d.Key;
    d.Key.Numpad7 = ["Numpad7", 43];
    d.Key.Numpad7.toString = r;
    d.Key.Numpad7.__enum__ = d.Key;
    d.Key.Numpad8 = ["Numpad8", 44];
    d.Key.Numpad8.toString =
        r;
    d.Key.Numpad8.__enum__ = d.Key;
    d.Key.Numpad9 = ["Numpad9", 45];
    d.Key.Numpad9.toString = r;
    d.Key.Numpad9.__enum__ = d.Key;
    d.Key.NumpadAdd = ["NumpadAdd", 46];
    d.Key.NumpadAdd.toString = r;
    d.Key.NumpadAdd.__enum__ = d.Key;
    d.Key.NumpadDecimal = ["NumpadDecimal", 47];
    d.Key.NumpadDecimal.toString = r;
    d.Key.NumpadDecimal.__enum__ = d.Key;
    d.Key.NumpadDivide = ["NumpadDivide", 48];
    d.Key.NumpadDivide.toString = r;
    d.Key.NumpadDivide.__enum__ = d.Key;
    d.Key.NumpadEnter = ["NumpadEnter", 49];
    d.Key.NumpadEnter.toString = r;
    d.Key.NumpadEnter.__enum__ =
        d.Key;
    d.Key.NumpadMultiply = ["NumpadMultiply", 50];
    d.Key.NumpadMultiply.toString = r;
    d.Key.NumpadMultiply.__enum__ = d.Key;
    d.Key.NumpadSubtract = ["NumpadSubtract", 51];
    d.Key.NumpadSubtract.toString = r;
    d.Key.NumpadSubtract.__enum__ = d.Key;
    d.Key.F1 = ["F1", 52];
    d.Key.F1.toString = r;
    d.Key.F1.__enum__ = d.Key;
    d.Key.F2 = ["F2", 53];
    d.Key.F2.toString = r;
    d.Key.F2.__enum__ = d.Key;
    d.Key.F3 = ["F3", 54];
    d.Key.F3.toString = r;
    d.Key.F3.__enum__ = d.Key;
    d.Key.F4 = ["F4", 55];
    d.Key.F4.toString = r;
    d.Key.F4.__enum__ = d.Key;
    d.Key.F5 = ["F5", 56];
    d.Key.F5.toString =
        r;
    d.Key.F5.__enum__ = d.Key;
    d.Key.F6 = ["F6", 57];
    d.Key.F6.toString = r;
    d.Key.F6.__enum__ = d.Key;
    d.Key.F7 = ["F7", 58];
    d.Key.F7.toString = r;
    d.Key.F7.__enum__ = d.Key;
    d.Key.F8 = ["F8", 59];
    d.Key.F8.toString = r;
    d.Key.F8.__enum__ = d.Key;
    d.Key.F9 = ["F9", 60];
    d.Key.F9.toString = r;
    d.Key.F9.__enum__ = d.Key;
    d.Key.F10 = ["F10", 61];
    d.Key.F10.toString = r;
    d.Key.F10.__enum__ = d.Key;
    d.Key.F11 = ["F11", 62];
    d.Key.F11.toString = r;
    d.Key.F11.__enum__ = d.Key;
    d.Key.F12 = ["F12", 63];
    d.Key.F12.toString = r;
    d.Key.F12.__enum__ = d.Key;
    d.Key.F13 = ["F13", 64];
    d.Key.F13.toString =
        r;
    d.Key.F13.__enum__ = d.Key;
    d.Key.F14 = ["F14", 65];
    d.Key.F14.toString = r;
    d.Key.F14.__enum__ = d.Key;
    d.Key.F15 = ["F15", 66];
    d.Key.F15.toString = r;
    d.Key.F15.__enum__ = d.Key;
    d.Key.Left = ["Left", 67];
    d.Key.Left.toString = r;
    d.Key.Left.__enum__ = d.Key;
    d.Key.Up = ["Up", 68];
    d.Key.Up.toString = r;
    d.Key.Up.__enum__ = d.Key;
    d.Key.Right = ["Right", 69];
    d.Key.Right.toString = r;
    d.Key.Right.__enum__ = d.Key;
    d.Key.Down = ["Down", 70];
    d.Key.Down.toString = r;
    d.Key.Down.__enum__ = d.Key;
    d.Key.Alt = ["Alt", 71];
    d.Key.Alt.toString = r;
    d.Key.Alt.__enum__ =
        d.Key;
    d.Key.Backquote = ["Backquote", 72];
    d.Key.Backquote.toString = r;
    d.Key.Backquote.__enum__ = d.Key;
    d.Key.Backslash = ["Backslash", 73];
    d.Key.Backslash.toString = r;
    d.Key.Backslash.__enum__ = d.Key;
    d.Key.Backspace = ["Backspace", 74];
    d.Key.Backspace.toString = r;
    d.Key.Backspace.__enum__ = d.Key;
    d.Key.CapsLock = ["CapsLock", 75];
    d.Key.CapsLock.toString = r;
    d.Key.CapsLock.__enum__ = d.Key;
    d.Key.Comma = ["Comma", 76];
    d.Key.Comma.toString = r;
    d.Key.Comma.__enum__ = d.Key;
    d.Key.Command = ["Command", 77];
    d.Key.Command.toString = r;
    d.Key.Command.__enum__ =
        d.Key;
    d.Key.Control = ["Control", 78];
    d.Key.Control.toString = r;
    d.Key.Control.__enum__ = d.Key;
    d.Key.Delete = ["Delete", 79];
    d.Key.Delete.toString = r;
    d.Key.Delete.__enum__ = d.Key;
    d.Key.End = ["End", 80];
    d.Key.End.toString = r;
    d.Key.End.__enum__ = d.Key;
    d.Key.Enter = ["Enter", 81];
    d.Key.Enter.toString = r;
    d.Key.Enter.__enum__ = d.Key;
    d.Key.Equals = ["Equals", 82];
    d.Key.Equals.toString = r;
    d.Key.Equals.__enum__ = d.Key;
    d.Key.Escape = ["Escape", 83];
    d.Key.Escape.toString = r;
    d.Key.Escape.__enum__ = d.Key;
    d.Key.Home = ["Home", 84];
    d.Key.Home.toString =
        r;
    d.Key.Home.__enum__ = d.Key;
    d.Key.Insert = ["Insert", 85];
    d.Key.Insert.toString = r;
    d.Key.Insert.__enum__ = d.Key;
    d.Key.LeftBracket = ["LeftBracket", 86];
    d.Key.LeftBracket.toString = r;
    d.Key.LeftBracket.__enum__ = d.Key;
    d.Key.Minus = ["Minus", 87];
    d.Key.Minus.toString = r;
    d.Key.Minus.__enum__ = d.Key;
    d.Key.PageDown = ["PageDown", 88];
    d.Key.PageDown.toString = r;
    d.Key.PageDown.__enum__ = d.Key;
    d.Key.PageUp = ["PageUp", 89];
    d.Key.PageUp.toString = r;
    d.Key.PageUp.__enum__ = d.Key;
    d.Key.Period = ["Period", 90];
    d.Key.Period.toString = r;
    d.Key.Period.__enum__ =
        d.Key;
    d.Key.Quote = ["Quote", 91];
    d.Key.Quote.toString = r;
    d.Key.Quote.__enum__ = d.Key;
    d.Key.RightBracket = ["RightBracket", 92];
    d.Key.RightBracket.toString = r;
    d.Key.RightBracket.__enum__ = d.Key;
    d.Key.Semicolon = ["Semicolon", 93];
    d.Key.Semicolon.toString = r;
    d.Key.Semicolon.__enum__ = d.Key;
    d.Key.Shift = ["Shift", 94];
    d.Key.Shift.toString = r;
    d.Key.Shift.__enum__ = d.Key;
    d.Key.Slash = ["Slash", 95];
    d.Key.Slash.toString = r;
    d.Key.Slash.__enum__ = d.Key;
    d.Key.Space = ["Space", 96];
    d.Key.Space.toString = r;
    d.Key.Space.__enum__ = d.Key;
    d.Key.Tab = ["Tab", 97];
    d.Key.Tab.toString = r;
    d.Key.Tab.__enum__ = d.Key;
    d.Key.Menu = ["Menu", 98];
    d.Key.Menu.toString = r;
    d.Key.Menu.__enum__ = d.Key;
    d.Key.Search = ["Search", 99];
    d.Key.Search.toString = r;
    d.Key.Search.__enum__ = d.Key;
    d.Key.Unknown = function(a) {
        a = ["Unknown", 100, a];
        a.__enum__ = d.Key;
        a.toString = r;
        return a
    };
    d.Keyboard = function() {};
    k["flambe.input.Keyboard"] = d.Keyboard;
    d.Keyboard.__name__ = ["flambe", "input", "Keyboard"];
    d.Keyboard.prototype = {
        __class__: d.Keyboard,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    d.KeyboardEvent =
        function() {
            this._internal_init(0, null)
        };
    k["flambe.input.KeyboardEvent"] = d.KeyboardEvent;
    d.KeyboardEvent.__name__ = ["flambe", "input", "KeyboardEvent"];
    d.KeyboardEvent.prototype = {
        _internal_init: function(a, b) {
            this.id = a;
            this.key = b
        },
        __class__: d.KeyboardEvent
    };
    d.Mouse = function() {};
    k["flambe.input.Mouse"] = d.Mouse;
    d.Mouse.__name__ = ["flambe", "input", "Mouse"];
    d.Mouse.prototype = {
        __class__: d.Mouse,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y",
            set_cursor: "set_cursor",
            get_cursor: "get_cursor"
        }
    };
    d.MouseButton = k["flambe.input.MouseButton"] = {
        __ename__: ["flambe", "input", "MouseButton"],
        __constructs__: ["Left", "Middle", "Right", "Unknown"]
    };
    d.MouseButton.Left = ["Left", 0];
    d.MouseButton.Left.toString = r;
    d.MouseButton.Left.__enum__ = d.MouseButton;
    d.MouseButton.Middle = ["Middle", 1];
    d.MouseButton.Middle.toString = r;
    d.MouseButton.Middle.__enum__ = d.MouseButton;
    d.MouseButton.Right = ["Right", 2];
    d.MouseButton.Right.toString = r;
    d.MouseButton.Right.__enum__ = d.MouseButton;
    d.MouseButton.Unknown = function(a) {
        a = ["Unknown",
            3, a
        ];
        a.__enum__ = d.MouseButton;
        a.toString = r;
        return a
    };
    d.MouseCursor = k["flambe.input.MouseCursor"] = {
        __ename__: ["flambe", "input", "MouseCursor"],
        __constructs__: ["Default", "Button", "None"]
    };
    d.MouseCursor.Default = ["Default", 0];
    d.MouseCursor.Default.toString = r;
    d.MouseCursor.Default.__enum__ = d.MouseCursor;
    d.MouseCursor.Button = ["Button", 1];
    d.MouseCursor.Button.toString = r;
    d.MouseCursor.Button.__enum__ = d.MouseCursor;
    d.MouseCursor.None = ["None", 2];
    d.MouseCursor.None.toString = r;
    d.MouseCursor.None.__enum__ = d.MouseCursor;
    d.MouseEvent = function() {
        this._internal_init(0, 0, 0, null)
    };
    k["flambe.input.MouseEvent"] = d.MouseEvent;
    d.MouseEvent.__name__ = ["flambe", "input", "MouseEvent"];
    d.MouseEvent.prototype = {
        _internal_init: function(a, b, e, c) {
            this.id = a;
            this.viewX = b;
            this.viewY = e;
            this.button = c
        },
        __class__: d.MouseEvent
    };
    d.Pointer = function() {};
    k["flambe.input.Pointer"] = d.Pointer;
    d.Pointer.__name__ = ["flambe", "input", "Pointer"];
    d.Pointer.prototype = {
        __class__: d.Pointer,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y"
        }
    };
    d.EventSource = k["flambe.input.EventSource"] = {
        __ename__: ["flambe", "input", "EventSource"],
        __constructs__: ["Mouse", "Touch"]
    };
    d.EventSource.Mouse = function(a) {
        a = ["Mouse", 0, a];
        a.__enum__ = d.EventSource;
        a.toString = r;
        return a
    };
    d.EventSource.Touch = function(a) {
        a = ["Touch", 1, a];
        a.__enum__ = d.EventSource;
        a.toString = r;
        return a
    };
    d.PointerEvent = function() {
        this._internal_init(0, 0, 0, null, null)
    };
    k["flambe.input.PointerEvent"] = d.PointerEvent;
    d.PointerEvent.__name__ = ["flambe", "input", "PointerEvent"];
    d.PointerEvent.prototype = {
        _internal_init: function(a, b, e, c, d) {
            this.id = a;
            this.viewX = b;
            this.viewY = e;
            this.hit = c;
            this.source = d;
            this._internal_stopped = !1
        },
        __class__: d.PointerEvent
    };
    d.Touch = function() {};
    k["flambe.input.Touch"] = d.Touch;
    d.Touch.__name__ = ["flambe", "input", "Touch"];
    d.Touch.prototype = {
        __class__: d.Touch,
        __properties__: {
            get_supported: "get_supported",
            get_maxPoints: "get_maxPoints",
            get_points: "get_points"
        }
    };
    d.TouchPoint = function(a) {
        this.id = a;
        this._internal_source = d.EventSource.Touch(this)
    };
    k["flambe.input.TouchPoint"] = d.TouchPoint;
    d.TouchPoint.__name__ = ["flambe", "input", "TouchPoint"];
    d.TouchPoint.prototype = {
        _internal_init: function(a, b) {
            this.viewX = a;
            this.viewY = b
        },
        __class__: d.TouchPoint
    };
    I.FMath = function() {};
    k["flambe.math.FMath"] = I.FMath;
    I.FMath.__name__ = ["flambe", "math", "FMath"];
    I.FMath.max = function(a, b) {
        return a > b ? a : b
    };
    I.FMath.clamp = function(a, b, e) {
        return a < b ? b : a > e ? e : a
    };
    I.Matrix = function() {
        this.identity()
    };
    k["flambe.math.Matrix"] = I.Matrix;
    I.Matrix.__name__ = ["flambe", "math", "Matrix"];
    I.Matrix.prototype = {
        inverseTransform: function(a,
            b, e) {
            var c = this.determinant();
            if (0 == c) return !1;
            a -= this.m02;
            b -= this.m12;
            e.x = (a * this.m11 - b * this.m01) / c;
            e.y = (b * this.m00 - a * this.m10) / c;
            return !0
        },
        determinant: function() {
            return this.m00 * this.m11 - this.m01 * this.m10
        },
        translate: function(a, b) {
            this.m02 += this.m00 * a + this.m01 * b;
            this.m12 += this.m11 * b + this.m10 * a
        },
        compose: function(a, b, e, c, d) {
            var f = Math.sin(d),
                d = Math.cos(d);
            this.set(d * e, f * e, -f * c, d * c, a, b)
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        set: function(a, b, e, c, d, f) {
            this.m00 = a;
            this.m01 = e;
            this.m02 = d;
            this.m10 = b;
            this.m11 = c;
            this.m12 = f
        },
        __class__: I.Matrix
    };
    I.Rectangle = function(a, b, e, c) {
        null == c && (c = 0);
        null == e && (e = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.set(a, b, e, c)
    };
    k["flambe.math.Rectangle"] = I.Rectangle;
    I.Rectangle.__name__ = ["flambe", "math", "Rectangle"];
    I.Rectangle.prototype = {
        contains: function(a, b) {
            a -= this.x;
            b -= this.y;
            return 0 <= a && 0 <= b && a <= this.width && b <= this.height
        },
        set: function(a, b, e, c) {
            this.x = a;
            this.y = b;
            this.width = e;
            this.height = c
        },
        __class__: I.Rectangle
    };
    h.BasicAssetPackLoader = function(a, b) {
        this._platform =
            a;
        this.promise = new n.Promise;
        this._bytesLoaded = new F;
        this._pack = new h._BasicAssetPackLoader.BasicAssetPack(b);
        var e = ba.array(b);
        if (0 == e.length) this.handleSuccess();
        else {
            for (var c = 0, d = new F, f = 0; f < e.length;) {
                var g = e[f];
                ++f;
                var i = d.get(g.name);
                null == i && (i = [], d.set(g.name, i));
                i.push(g)
            }
            this._assetsRemaining = ba.count(d);
            for (e = d.iterator(); e.hasNext();)
                if (i = e.next(), i = 1 < i.length ? this.pickBestEntry(i) : i[0], d = this.createPlaceholder(i), null != d) K.logger.warn("Using an asset placeholder", ["name", i.name, "type",
                    i.type
                ]), this.handleLoad(i, d);
                else {
                    c += i.bytes;
                    d = b.getFullURL(i);
                    try {
                        this.loadEntry(d, i)
                    } catch (j) {
                        this.handleError(i, "Unexpected error: " + p.string(j))
                    }
                }
            this.promise.set_total(c)
        }
    };
    k["flambe.platform.BasicAssetPackLoader"] = h.BasicAssetPackLoader;
    h.BasicAssetPackLoader.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
    h.BasicAssetPackLoader.prototype = {
        handleTextureError: function(a) {
            this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
        },
        handleError: function(a, b) {
            K.logger.warn("Error loading asset pack", ["error", b, "url", a.url]);
            this.promise.error.emit1(n.Strings.withFields(b, ["url", a.url]))
        },
        handleSuccess: function() {
            this.promise.set_result(this._pack)
        },
        handleProgress: function(a, b) {
            this._bytesLoaded.set(a.name, b);
            for (var e = 0, c = this._bytesLoaded.iterator(); c.hasNext();) var d = c.next(),
                e = e + d;
            this.promise.set_progress(e)
        },
        handleLoad: function(a, b) {
            this.handleProgress(a, a.bytes);
            var e = a.name;
            switch (a.type[1]) {
                case 0:
                    this._pack.textures.set(e, b);
                    break;
                case 1:
                    this._pack.sounds.set(e, b);
                    break;
                case 2:
                    this._pack.files.set(e,
                        b)
            }
            this._assetsRemaining -= 1;
            0 >= this._assetsRemaining && this.handleSuccess()
        },
        getAudioFormats: function() {
            return []
        },
        loadEntry: function() {},
        createPlaceholder: function(a) {
            switch (a.type[1]) {
                case 1:
                    if (!ba.has(this.getAudioFormats(), a.getUrlExtension())) return h.DummySound.getInstance()
            }
            return null
        },
        pickBestEntry: function(a) {
            switch (a[0].type[1]) {
                case 1:
                    for (var b = this.getAudioFormats(), e = 0; e < b.length;) {
                        var c = b[e];
                        ++e;
                        for (var d = 0; d < a.length;) {
                            var f = a[d];
                            ++d;
                            if (f.getUrlExtension() == c) return f
                        }
                    }
            }
            return a[0]
        },
        __class__: h.BasicAssetPackLoader
    };
    h._BasicAssetPackLoader = {};
    h._BasicAssetPackLoader.BasicAssetPack = function(a) {
        this.disposed = !1;
        this._manifest = a;
        this.textures = new F;
        this.sounds = new F;
        this.files = new F
    };
    k["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = h._BasicAssetPackLoader.BasicAssetPack;
    h._BasicAssetPackLoader.BasicAssetPack.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
    h._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [z.AssetPack];
    h._BasicAssetPackLoader.BasicAssetPack.prototype = {
        get_manifest: function() {
            return this._manifest
        },
        dispose: function() {
            if (!this.disposed) {
                this.disposed = !0;
                for (var a = this.textures.iterator(); a.hasNext();) a.next().dispose();
                this.textures = null;
                for (a = this.sounds.iterator(); a.hasNext();) a.next().dispose();
                this.sounds = null
            }
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            var e = this.files.get(a);
            if (null == e && b) throw n.Strings.withFields("Missing file", ["name", a]);
            return e
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            var e = this.sounds.get(a);
            if (null == e && b) throw n.Strings.withFields("Missing sound", ["name", a]);
            return e
        },
        getTexture: function(a, b) {
            null == b && (b = !0);
            var e = this.textures.get(a);
            if (null == e && b) throw n.Strings.withFields("Missing texture", ["name", a]);
            return e
        },
        __class__: h._BasicAssetPackLoader.BasicAssetPack,
        __properties__: {
            get_manifest: "get_manifest"
        }
    };
    h.BasicKeyboard = function() {
        this.down = new n.Signal1;
        this.up = new n.Signal1;
        this.backButton = new n.Signal0;
        this._keyStates = new W
    };
    k["flambe.platform.BasicKeyboard"] = h.BasicKeyboard;
    h.BasicKeyboard.__name__ = ["flambe", "platform", "BasicKeyboard"];
    h.BasicKeyboard.__interfaces__ = [d.Keyboard];
    h.BasicKeyboard.prototype = {
        submitUp: function(a) {
            this._keyStates.exists(a) && (this._keyStates.remove(a), h.BasicKeyboard._sharedEvent._internal_init(h.BasicKeyboard._sharedEvent.id + 1, h.KeyCodes.toKey(a)), this.up.emit1(h.BasicKeyboard._sharedEvent))
        },
        submitDown: function(a) {
            if (16777238 == a) return null != this.backButton._head ? (this.backButton.emit0(), !0) : !1;
            this._keyStates.exists(a) || (this._keyStates.set(a, !0), h.BasicKeyboard._sharedEvent._internal_init(h.BasicKeyboard._sharedEvent.id +
                1, h.KeyCodes.toKey(a)), this.down.emit1(h.BasicKeyboard._sharedEvent));
            return !0
        },
        isDown: function(a) {
            return this._keyStates.exists(h.KeyCodes.toKeyCode(a))
        },
        get_supported: function() {
            return !0
        },
        __class__: h.BasicKeyboard,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    h.BasicMouse = function(a) {
        this._pointer = a;
        this._source = d.EventSource.Mouse(h.BasicMouse._sharedEvent);
        this.down = new n.Signal1;
        this.move = new n.Signal1;
        this.up = new n.Signal1;
        this.scroll = new n.Signal1;
        this._y = this._x = 0;
        this._cursor = d.MouseCursor.Default;
        this._buttonStates = new W
    };
    k["flambe.platform.BasicMouse"] = h.BasicMouse;
    h.BasicMouse.__name__ = ["flambe", "platform", "BasicMouse"];
    h.BasicMouse.__interfaces__ = [d.Mouse];
    h.BasicMouse.prototype = {
        prepare: function(a, b, e) {
            this._x = a;
            this._y = b;
            h.BasicMouse._sharedEvent._internal_init(h.BasicMouse._sharedEvent.id + 1, a, b, e)
        },
        submitScroll: function(a, b, e) {
            this._x = a;
            this._y = b;
            if (null == this.scroll._head) return !1;
            this.scroll.emit1(e);
            return !0
        },
        submitUp: function(a, b, e) {
            this._buttonStates.exists(e) && (this._buttonStates.remove(e),
                this.prepare(a, b, h.MouseCodes.toButton(e)), this._pointer.submitUp(a, b, this._source), this.up.emit1(h.BasicMouse._sharedEvent))
        },
        submitMove: function(a, b) {
            this.prepare(a, b, null);
            this._pointer.submitMove(a, b, this._source);
            this.move.emit1(h.BasicMouse._sharedEvent)
        },
        submitDown: function(a, b, e) {
            this._buttonStates.exists(e) || (this._buttonStates.set(e, !0), this.prepare(a, b, h.MouseCodes.toButton(e)), this._pointer.submitDown(a, b, this._source), this.down.emit1(h.BasicMouse._sharedEvent))
        },
        isDown: function(a) {
            return this._buttonStates.exists(h.MouseCodes.toButtonCode(a))
        },
        set_cursor: function(a) {
            return this._cursor = a
        },
        get_cursor: function() {
            return this._cursor
        },
        get_y: function() {
            return this._y
        },
        get_x: function() {
            return this._x
        },
        get_supported: function() {
            return !0
        },
        __class__: h.BasicMouse,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y",
            set_cursor: "set_cursor",
            get_cursor: "get_cursor"
        }
    };
    h.BasicPointer = function(a, b, e) {
        null == e && (e = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        this.down = new n.Signal1;
        this.move = new n.Signal1;
        this.up = new n.Signal1;
        this._x = a;
        this._y =
            b;
        this._isDown = e
    };
    k["flambe.platform.BasicPointer"] = h.BasicPointer;
    h.BasicPointer.__name__ = ["flambe", "platform", "BasicPointer"];
    h.BasicPointer.__interfaces__ = [d.Pointer];
    h.BasicPointer.prototype = {
        prepare: function(a, b, e, c) {
            this._x = a;
            this._y = b;
            h.BasicPointer._sharedEvent._internal_init(h.BasicPointer._sharedEvent.id + 1, a, b, e, c)
        },
        submitUp: function(a, b, e) {
            if (this._isDown) {
                this._isDown = !1;
                var c = [],
                    d = o.Sprite.hitTest(y.root, a, b);
                if (null != d) {
                    var f = d.owner;
                    do {
                        var g = f._compMap.Sprite_1;
                        null != g && c.push(g);
                        f =
                            f.parent
                    } while (null != f)
                }
                this.prepare(a, b, d, e);
                for (a = 0; a < c.length;)
                    if (g = c[a], ++a, g = g._internal_pointerUp, null != g && (g.emit1(h.BasicPointer._sharedEvent), h.BasicPointer._sharedEvent._internal_stopped)) return;
                this.up.emit1(h.BasicPointer._sharedEvent)
            }
        },
        submitMove: function(a, b, e) {
            var c = [],
                d = o.Sprite.hitTest(y.root, a, b);
            if (null != d) {
                var f = d.owner;
                do {
                    var g = f._compMap.Sprite_1;
                    null != g && c.push(g);
                    f = f.parent
                } while (null != f)
            }
            this.prepare(a, b, d, e);
            for (a = 0; a < c.length;)
                if (g = c[a], ++a, g = g._internal_pointerMove, null !=
                    g && (g.emit1(h.BasicPointer._sharedEvent), h.BasicPointer._sharedEvent._internal_stopped)) return;
            this.move.emit1(h.BasicPointer._sharedEvent)
        },
        submitDown: function(a, b, e) {
            if (!this._isDown) {
                this._isDown = !0;
                var c = [],
                    d = o.Sprite.hitTest(y.root, a, b);
                if (null != d) {
                    var f = d.owner;
                    do {
                        var g = f._compMap.Sprite_1;
                        null != g && c.push(g);
                        f = f.parent
                    } while (null != f)
                }
                this.prepare(a, b, d, e);
                for (a = 0; a < c.length;)
                    if (g = c[a], ++a, g = g._internal_pointerDown, null != g && (g.emit1(h.BasicPointer._sharedEvent), h.BasicPointer._sharedEvent._internal_stopped)) return;
                this.down.emit1(h.BasicPointer._sharedEvent)
            }
        },
        isDown: function() {
            return this._isDown
        },
        get_y: function() {
            return this._y
        },
        get_x: function() {
            return this._x
        },
        get_supported: function() {
            return !0
        },
        __class__: h.BasicPointer,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y"
        }
    };
    h.BasicTouch = function(a, b) {
        null == b && (b = 4);
        this._pointer = a;
        this._maxPoints = b;
        this._pointMap = new W;
        this._points = [];
        this.down = new n.Signal1;
        this.move = new n.Signal1;
        this.up = new n.Signal1
    };
    k["flambe.platform.BasicTouch"] =
        h.BasicTouch;
    h.BasicTouch.__name__ = ["flambe", "platform", "BasicTouch"];
    h.BasicTouch.__interfaces__ = [d.Touch];
    h.BasicTouch.prototype = {
        submitUp: function(a, b, e) {
            var c = this._pointMap.get(a);
            null != c && (c._internal_init(b, e), this._pointMap.remove(a), A.remove(this._points, c), this._pointerTouch == c && (this._pointerTouch = null, this._pointer.submitUp(b, e, c._internal_source)), this.up.emit1(c))
        },
        submitMove: function(a, b, e) {
            a = this._pointMap.get(a);
            null != a && (a._internal_init(b, e), this._pointerTouch == a && this._pointer.submitMove(b,
                e, a._internal_source), this.move.emit1(a))
        },
        submitDown: function(a, b, e) {
            if (!this._pointMap.exists(a)) {
                var c = new d.TouchPoint(a);
                c._internal_init(b, e);
                this._pointMap.set(a, c);
                this._points.push(c);
                null == this._pointerTouch && (this._pointerTouch = c, this._pointer.submitDown(b, e, c._internal_source));
                this.down.emit1(c)
            }
        },
        get_points: function() {
            return this._points.slice()
        },
        get_maxPoints: function() {
            return this._maxPoints
        },
        get_supported: function() {
            return !0
        },
        __class__: h.BasicTouch,
        __properties__: {
            get_supported: "get_supported",
            get_maxPoints: "get_maxPoints",
            get_points: "get_points"
        }
    };
    H.Sound = function() {};
    k["flambe.sound.Sound"] = H.Sound;
    H.Sound.__name__ = ["flambe", "sound", "Sound"];
    H.Sound.prototype = {
        __class__: H.Sound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    h.DummySound = function() {
        this._playback = new h.DummyPlayback(this)
    };
    k["flambe.platform.DummySound"] = h.DummySound;
    h.DummySound.__name__ = ["flambe", "platform", "DummySound"];
    h.DummySound.__interfaces__ = [H.Sound];
    h.DummySound.getInstance = function() {
        null == h.DummySound._instance &&
            (h.DummySound._instance = new h.DummySound);
        return h.DummySound._instance
    };
    h.DummySound.prototype = {
        dispose: function() {},
        get_duration: function() {
            return 0
        },
        loop: function() {
            return this._playback
        },
        play: function() {
            return this._playback
        },
        __class__: h.DummySound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    H.Playback = function() {};
    k["flambe.sound.Playback"] = H.Playback;
    H.Playback.__name__ = ["flambe", "sound", "Playback"];
    H.Playback.__interfaces__ = [n.Disposable];
    H.Playback.prototype = {
        __class__: H.Playback,
        __properties__: {
            set_paused: "set_paused",
            get_paused: "get_paused",
            get_ended: "get_ended",
            set_position: "set_position",
            get_position: "get_position",
            get_sound: "get_sound"
        }
    };
    h.DummyPlayback = function(a) {
        this._sound = a;
        this.volume = new E.AnimatedFloat(0)
    };
    k["flambe.platform.DummyPlayback"] = h.DummyPlayback;
    h.DummyPlayback.__name__ = ["flambe", "platform", "DummyPlayback"];
    h.DummyPlayback.__interfaces__ = [H.Playback];
    h.DummyPlayback.prototype = {
        dispose: function() {},
        set_position: function(a) {
            return a
        },
        get_position: function() {
            return 0
        },
        get_ended: function() {
            return !0
        },
        set_paused: function() {
            return !0
        },
        get_paused: function() {
            return !0
        },
        get_sound: function() {
            return this._sound
        },
        __class__: h.DummyPlayback,
        __properties__: {
            set_paused: "set_paused",
            get_paused: "get_paused",
            get_ended: "get_ended",
            set_position: "set_position",
            get_position: "get_position",
            get_sound: "get_sound"
        }
    };
    aa = {
        Storage: function() {}
    };
    k["flambe.storage.Storage"] = aa.Storage;
    aa.Storage.__name__ = ["flambe", "storage", "Storage"];
    aa.Storage.prototype = {
        __class__: aa.Storage,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    h.DummyStorage = function() {
        this.clear()
    };
    k["flambe.platform.DummyStorage"] = h.DummyStorage;
    h.DummyStorage.__name__ = ["flambe", "platform", "DummyStorage"];
    h.DummyStorage.__interfaces__ = [aa.Storage];
    h.DummyStorage.prototype = {
        clear: function() {
            this._hash = new F
        },
        remove: function(a) {
            this._hash.remove(a)
        },
        get: function(a, b) {
            return this._hash.exists(a) ? this._hash.get(a) : b
        },
        set: function(a, b) {
            this._hash.set(a, b);
            return !0
        },
        get_supported: function() {
            return !1
        },
        __class__: h.DummyStorage,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    h.DummyTouch = function() {
        this.down = new n.Signal1;
        this.move = new n.Signal1;
        this.up = new n.Signal1
    };
    k["flambe.platform.DummyTouch"] = h.DummyTouch;
    h.DummyTouch.__name__ = ["flambe", "platform", "DummyTouch"];
    h.DummyTouch.__interfaces__ = [d.Touch];
    h.DummyTouch.prototype = {
        get_points: function() {
            return []
        },
        get_maxPoints: function() {
            return 0
        },
        get_supported: function() {
            return !1
        },
        __class__: h.DummyTouch,
        __properties__: {
            get_supported: "get_supported",
            get_maxPoints: "get_maxPoints",
            get_points: "get_points"
        }
    };
    h.EventGroup = function() {
        this._entries = []
    };
    k["flambe.platform.EventGroup"] = h.EventGroup;
    h.EventGroup.__name__ = ["flambe", "platform", "EventGroup"];
    h.EventGroup.__interfaces__ = [n.Disposable];
    h.EventGroup.prototype = {
        dispose: function() {
            for (var a = 0, b = this._entries; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispatcher.removeEventListener(c.type, c.listener, !1)
            }
            this._entries = []
        },
        addDisposingListener: function(a, b, c) {
            var d = this;
            this.addListener(a, b, function(a) {
                d.dispose();
                c(a)
            })
        },
        addListener: function(a, b, c) {
            a.addEventListener(b, c, !1);
            this._entries.push(new h._EventGroup.Entry(a,
                b, c))
        },
        __class__: h.EventGroup
    };
    h._EventGroup = {};
    h._EventGroup.Entry = function(a, b, c) {
        this.dispatcher = a;
        this.type = b;
        this.listener = c
    };
    k["flambe.platform._EventGroup.Entry"] = h._EventGroup.Entry;
    h._EventGroup.Entry.__name__ = ["flambe", "platform", "_EventGroup", "Entry"];
    h._EventGroup.Entry.prototype = {
        __class__: h._EventGroup.Entry
    };
    h.KeyCodes = function() {};
    k["flambe.platform.KeyCodes"] = h.KeyCodes;
    h.KeyCodes.__name__ = ["flambe", "platform", "KeyCodes"];
    h.KeyCodes.toKey = function(a) {
        switch (a) {
            case 65:
                return d.Key.A;
            case 66:
                return d.Key.B;
            case 67:
                return d.Key.C;
            case 68:
                return d.Key.D;
            case 69:
                return d.Key.E;
            case 70:
                return d.Key.F;
            case 71:
                return d.Key.G;
            case 72:
                return d.Key.H;
            case 73:
                return d.Key.I;
            case 74:
                return d.Key.J;
            case 75:
                return d.Key.K;
            case 76:
                return d.Key.L;
            case 77:
                return d.Key.M;
            case 78:
                return d.Key.N;
            case 79:
                return d.Key.O;
            case 80:
                return d.Key.P;
            case 81:
                return d.Key.Q;
            case 82:
                return d.Key.R;
            case 83:
                return d.Key.S;
            case 84:
                return d.Key.T;
            case 85:
                return d.Key.U;
            case 86:
                return d.Key.V;
            case 87:
                return d.Key.W;
            case 88:
                return d.Key.X;
            case 89:
                return d.Key.Y;
            case 90:
                return d.Key.Z;
            case 48:
                return d.Key.Number0;
            case 49:
                return d.Key.Number1;
            case 50:
                return d.Key.Number2;
            case 51:
                return d.Key.Number3;
            case 52:
                return d.Key.Number4;
            case 53:
                return d.Key.Number5;
            case 54:
                return d.Key.Number6;
            case 55:
                return d.Key.Number7;
            case 56:
                return d.Key.Number8;
            case 57:
                return d.Key.Number9;
            case 96:
                return d.Key.Numpad0;
            case 97:
                return d.Key.Numpad1;
            case 98:
                return d.Key.Numpad2;
            case 99:
                return d.Key.Numpad3;
            case 100:
                return d.Key.Numpad4;
            case 101:
                return d.Key.Numpad5;
            case 102:
                return d.Key.Numpad6;
            case 103:
                return d.Key.Numpad7;
            case 104:
                return d.Key.Numpad8;
            case 105:
                return d.Key.Numpad9;
            case 107:
                return d.Key.NumpadAdd;
            case 110:
                return d.Key.NumpadDecimal;
            case 111:
                return d.Key.NumpadDivide;
            case 108:
                return d.Key.NumpadEnter;
            case 106:
                return d.Key.NumpadMultiply;
            case 109:
                return d.Key.NumpadSubtract;
            case 112:
                return d.Key.F1;
            case 113:
                return d.Key.F2;
            case 114:
                return d.Key.F3;
            case 115:
                return d.Key.F4;
            case 116:
                return d.Key.F5;
            case 117:
                return d.Key.F6;
            case 118:
                return d.Key.F7;
            case 119:
                return d.Key.F8;
            case 120:
                return d.Key.F9;
            case 121:
                return d.Key.F10;
            case 122:
                return d.Key.F11;
            case 123:
                return d.Key.F12;
            case 37:
                return d.Key.Left;
            case 38:
                return d.Key.Up;
            case 39:
                return d.Key.Right;
            case 40:
                return d.Key.Down;
            case 18:
                return d.Key.Alt;
            case 192:
                return d.Key.Backquote;
            case 220:
                return d.Key.Backslash;
            case 8:
                return d.Key.Backspace;
            case 20:
                return d.Key.CapsLock;
            case 188:
                return d.Key.Comma;
            case 15:
                return d.Key.Command;
            case 17:
                return d.Key.Control;
            case 46:
                return d.Key.Delete;
            case 35:
                return d.Key.End;
            case 13:
                return d.Key.Enter;
            case 187:
                return d.Key.Equals;
            case 27:
                return d.Key.Escape;
            case 36:
                return d.Key.Home;
            case 45:
                return d.Key.Insert;
            case 219:
                return d.Key.LeftBracket;
            case 189:
                return d.Key.Minus;
            case 34:
                return d.Key.PageDown;
            case 33:
                return d.Key.PageUp;
            case 190:
                return d.Key.Period;
            case 222:
                return d.Key.Quote;
            case 221:
                return d.Key.RightBracket;
            case 186:
                return d.Key.Semicolon;
            case 16:
                return d.Key.Shift;
            case 191:
                return d.Key.Slash;
            case 32:
                return d.Key.Space;
            case 9:
                return d.Key.Tab;
            case 16777234:
                return d.Key.Menu;
            case 16777247:
                return d.Key.Search
        }
        return d.Key.Unknown(a)
    };
    h.KeyCodes.toKeyCode = function(a) {
        switch (a[1]) {
            case 0:
                return 65;
            case 1:
                return 66;
            case 2:
                return 67;
            case 3:
                return 68;
            case 4:
                return 69;
            case 5:
                return 70;
            case 6:
                return 71;
            case 7:
                return 72;
            case 8:
                return 73;
            case 9:
                return 74;
            case 10:
                return 75;
            case 11:
                return 76;
            case 12:
                return 77;
            case 13:
                return 78;
            case 14:
                return 79;
            case 15:
                return 80;
            case 16:
                return 81;
            case 17:
                return 82;
            case 18:
                return 83;
            case 19:
                return 84;
            case 20:
                return 85;
            case 21:
                return 86;
            case 22:
                return 87;
            case 23:
                return 88;
            case 24:
                return 89;
            case 25:
                return 90;
            case 26:
                return 48;
            case 27:
                return 49;
            case 28:
                return 50;
            case 29:
                return 51;
            case 30:
                return 52;
            case 31:
                return 53;
            case 32:
                return 54;
            case 33:
                return 55;
            case 34:
                return 56;
            case 35:
                return 57;
            case 36:
                return 96;
            case 37:
                return 97;
            case 38:
                return 98;
            case 39:
                return 99;
            case 40:
                return 100;
            case 41:
                return 101;
            case 42:
                return 102;
            case 43:
                return 103;
            case 44:
                return 104;
            case 45:
                return 105;
            case 46:
                return 107;
            case 47:
                return 110;
            case 48:
                return 111;
            case 49:
                return 108;
            case 50:
                return 106;
            case 51:
                return 109;
            case 52:
                return 112;
            case 53:
                return 113;
            case 54:
                return 114;
            case 55:
                return 115;
            case 56:
                return 116;
            case 57:
                return 117;
            case 58:
                return 118;
            case 59:
                return 119;
            case 60:
                return 120;
            case 61:
                return 121;
            case 62:
                return 122;
            case 63:
                return 123;
            case 64:
                return 124;
            case 65:
                return 125;
            case 66:
                return 126;
            case 67:
                return 37;
            case 68:
                return 38;
            case 69:
                return 39;
            case 70:
                return 40;
            case 71:
                return 18;
            case 72:
                return 192;
            case 73:
                return 220;
            case 74:
                return 8;
            case 75:
                return 20;
            case 76:
                return 188;
            case 77:
                return 15;
            case 78:
                return 17;
            case 79:
                return 46;
            case 80:
                return 35;
            case 81:
                return 13;
            case 82:
                return 187;
            case 83:
                return 27;
            case 84:
                return 36;
            case 85:
                return 45;
            case 86:
                return 219;
            case 87:
                return 189;
            case 88:
                return 34;
            case 89:
                return 33;
            case 90:
                return 190;
            case 91:
                return 222;
            case 92:
                return 221;
            case 93:
                return 186;
            case 94:
                return 16;
            case 95:
                return 191;
            case 96:
                return 32;
            case 97:
                return 9;
            case 98:
                return 16777234;
            case 99:
                return 16777247;
            case 100:
                return a[2]
        }
    };
    h.MainLoop = function() {
        this._tickables = []
    };
    k["flambe.platform.MainLoop"] = h.MainLoop;
    h.MainLoop.__name__ = ["flambe", "platform", "MainLoop"];
    h.MainLoop.updateEntity = function(a, b) {
        var c = a._compMap.SpeedAdjuster_5;
        if (null != c && (c._internal_realDt = b, b *= c.scale._value, 0 >= b)) {
            c.onUpdate(b);
            return
        }
        for (var d = a.firstComponent; null != d;) c = d.next, d.onUpdate(b), d = c;
        for (d = a.firstChild; null != d;) c = d.next, h.MainLoop.updateEntity(d, b), d = c
    };
    h.MainLoop.prototype = {
        addTickable: function(a) {
            this._tickables.push(a)
        },
        render: function(a) {
            var b = a.willRender();
            null != b &&
                (o.Sprite.render(y.root, b), a.didRender())
        },
        update: function(a) {
            if (0 >= a) K.logger.warn("Zero or negative time elapsed since the last frame!", ["dt", a]);
            else {
                1 < a && (a = 1);
                for (var b = 0; b < this._tickables.length;) {
                    var c = this._tickables[b];
                    null == c || c.update(a) ? this._tickables.splice(b, 1) : ++b
                }
                y.volume.update(a);
                h.MainLoop.updateEntity(y.root, a)
            }
        },
        __class__: h.MainLoop
    };
    h.ManifestBuilder = function() {};
    k["flambe.platform.ManifestBuilder"] = h.ManifestBuilder;
    h.ManifestBuilder.__name__ = ["flambe", "platform", "ManifestBuilder"];
    h.MouseCodes = function() {};
    k["flambe.platform.MouseCodes"] = h.MouseCodes;
    h.MouseCodes.__name__ = ["flambe", "platform", "MouseCodes"];
    h.MouseCodes.toButton = function(a) {
        switch (a) {
            case 0:
                return d.MouseButton.Left;
            case 1:
                return d.MouseButton.Middle;
            case 2:
                return d.MouseButton.Right
        }
        return d.MouseButton.Unknown(a)
    };
    h.MouseCodes.toButtonCode = function(a) {
        switch (a[1]) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return a[2]
        }
    };
    h.Renderer = function() {};
    k["flambe.platform.Renderer"] = h.Renderer;
    h.Renderer.__name__ = ["flambe", "platform", "Renderer"];
    h.Renderer.prototype = {
        __class__: h.Renderer
    };
    h.Tickable = function() {};
    k["flambe.platform.Tickable"] = h.Tickable;
    h.Tickable.__name__ = ["flambe", "platform", "Tickable"];
    h.Tickable.prototype = {
        __class__: h.Tickable
    };
    h.html.CanvasGraphics = function(a) {
        this._firstDraw = !1;
        this._canvasCtx = a.getContext("2d");
        this.clear()
    };
    k["flambe.platform.html.CanvasGraphics"] = h.html.CanvasGraphics;
    h.html.CanvasGraphics.__name__ = ["flambe", "platform", "html", "CanvasGraphics"];
    h.html.CanvasGraphics.__interfaces__ = [o.Graphics];
    h.html.CanvasGraphics.prototype = {
        willRender: function() {
            this._firstDraw = !0
        },
        applyScissor: function(a, b, c, d) {
            this._canvasCtx.beginPath();
            this._canvasCtx.rect(a | 0, b | 0, c | 0, d | 0);
            this._canvasCtx.clip()
        },
        setBlendMode: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "source-over";
                    break;
                case 1:
                    b = "lighter";
                    break;
                case 2:
                    b = "source-over"
            }
            this._canvasCtx.globalCompositeOperation = b
        },
        setAlpha: function(a) {
            this._canvasCtx.globalAlpha = a
        },
        multiplyAlpha: function(a) {
            this._canvasCtx.globalAlpha *= a
        },
        fillRect: function(a,
            b, c, d, f) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.fillRect(a, b, c, d, f), this._canvasCtx.globalCompositeOperation = "source-over") : (this._canvasCtx.fillStyle = "#" + ("00000" + a.toString(16)).slice(-6), this._canvasCtx.fillRect(b | 0, c | 0, d | 0, f | 0))
        },
        drawPattern: function(a, b, c, d, f) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawPattern(a, b, c, d, f), this._canvasCtx.globalCompositeOperation = "source-over") : (null == a.pattern &&
                (a.pattern = this._canvasCtx.createPattern(a.image, "repeat")), this._canvasCtx.fillStyle = a.pattern, this._canvasCtx.fillRect(b | 0, c | 0, d | 0, f | 0))
        },
        drawSubImage: function(a, b, c, d, f, g, h) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubImage(a, b, c, d, f, g, h), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.image, d | 0, f | 0, g | 0, h | 0, b | 0, c | 0, g | 0, h | 0)
        },
        drawImage: function(a, b, c) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation =
                "copy", this.drawImage(a, b, c), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.image, b | 0, c | 0)
        },
        restore: function() {
            this._canvasCtx.restore()
        },
        transform: function(a, b, c, d, f, g) {
            this._canvasCtx.transform(a, b, c, d, f | 0, g | 0)
        },
        rotate: function(a) {
            this._canvasCtx.rotate(3.141592653589793 * a / 180)
        },
        scale: function(a, b) {
            this._canvasCtx.scale(a, b)
        },
        translate: function(a, b) {
            this._canvasCtx.translate(a | 0, b | 0)
        },
        save: function() {
            this._canvasCtx.save()
        },
        clear: function() {
            this._canvasCtx.fillStyle =
                "rgba(0,0,0,0)";
            this._canvasCtx.fillRect(0, 0, this._canvasCtx.canvas.width, this._canvasCtx.canvas.height)
        },
        __class__: h.html.CanvasGraphics
    };
    h.html.CanvasRenderer = function(a) {
        this._graphics = new h.html.CanvasGraphics(a);
        this._graphics.clear()
    };
    k["flambe.platform.html.CanvasRenderer"] = h.html.CanvasRenderer;
    h.html.CanvasRenderer.__name__ = ["flambe", "platform", "html", "CanvasRenderer"];
    h.html.CanvasRenderer.__interfaces__ = [h.Renderer];
    h.html.CanvasRenderer.prototype = {
        didRender: function() {},
        willRender: function() {
            this._graphics.willRender();
            return this._graphics
        },
        createEmptyTexture: function(a, b) {
            return new h.html.CanvasTexture(h.html.HtmlUtil.createEmptyCanvas(a, b))
        },
        createTexture: function(a) {
            return new h.html.CanvasTexture(h.html.CanvasRenderer.CANVAS_TEXTURES ? h.html.HtmlUtil.createCanvas(a) : a)
        },
        __class__: h.html.CanvasRenderer
    };
    h.html.CanvasTexture = function(a) {
        this._graphics = null;
        this.image = a
    };
    k["flambe.platform.html.CanvasTexture"] = h.html.CanvasTexture;
    h.html.CanvasTexture.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
    h.html.CanvasTexture.__interfaces__ = [o.Texture];
    h.html.CanvasTexture.prototype = {
        getContext2d: function() {
            G.__instanceof(this.image, HTMLCanvasElement) || (this.image = h.html.HtmlUtil.createCanvas(this.image));
            return this.image.getContext("2d")
        },
        dispose: function() {
            this._graphics = this.pattern = this.image = null
        },
        get_graphics: function() {
            null == this._graphics && (this.getContext2d(), this._graphics = new h.html._CanvasTexture.InternalGraphics(this));
            return this._graphics
        },
        get_height: function() {
            return this.image.height
        },
        get_width: function() {
            return this.image.width
        },
        writePixels: function(a, b, c, d, f) {
            var g = this.getContext2d(),
                h = g.createImageData(d, f),
                i = h.data;
            if (null != i.set) i.set(a.b);
            else {
                d = 4 * d * f;
                for (f = 0; f < d;) {
                    var j = f++;
                    i[j] = a.b[j]
                }
            }
            g.putImageData(h, b, c);
            this.pattern = null
        },
        readPixels: function(a, b, c, d) {
            return V.Bytes.ofData(this.getContext2d().getImageData(a, b, c, d).data)
        },
        __class__: h.html.CanvasTexture,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_graphics: "get_graphics"
        }
    };
    h.html._CanvasTexture = {};
    h.html._CanvasTexture.InternalGraphics = function(a) {
        h.html.CanvasGraphics.call(this,
            a.image);
        this._renderTarget = a
    };
    k["flambe.platform.html._CanvasTexture.InternalGraphics"] = h.html._CanvasTexture.InternalGraphics;
    h.html._CanvasTexture.InternalGraphics.__name__ = ["flambe", "platform", "html", "_CanvasTexture", "InternalGraphics"];
    h.html._CanvasTexture.InternalGraphics.__super__ = h.html.CanvasGraphics;
    h.html._CanvasTexture.InternalGraphics.prototype = t(h.html.CanvasGraphics.prototype, {
        fillRect: function(a, b, c, d, f) {
            h.html.CanvasGraphics.prototype.fillRect.call(this, a, b, c, d, f);
            this._renderTarget.pattern =
                null
        },
        drawPattern: function(a, b, c, d, f) {
            h.html.CanvasGraphics.prototype.drawPattern.call(this, a, b, c, d, f);
            this._renderTarget.pattern = null
        },
        drawSubImage: function(a, b, c, d, f, g, i) {
            h.html.CanvasGraphics.prototype.drawSubImage.call(this, a, b, c, d, f, g, i);
            this._renderTarget.pattern = null
        },
        drawImage: function(a, b, c) {
            h.html.CanvasGraphics.prototype.drawImage.call(this, a, b, c);
            this._renderTarget.pattern = null
        },
        __class__: h.html._CanvasTexture.InternalGraphics
    });
    h.html.HtmlAssetPackLoader = function(a, b) {
        h.BasicAssetPackLoader.call(this,
            a, b)
    };
    k["flambe.platform.html.HtmlAssetPackLoader"] = h.html.HtmlAssetPackLoader;
    h.html.HtmlAssetPackLoader.__name__ = ["flambe", "platform", "html", "HtmlAssetPackLoader"];
    h.html.HtmlAssetPackLoader.detectAudioFormats = function() {
        var a = v.document.createElement("audio");
        if (null == a || null == a.canPlayType) return [];
        var b = new X("\\b(iPhone|iPod|iPad)\\b", "");
        if (!h.html.WebAudioSound.get_supported() && b.match(v.window.navigator.userAgent)) return [];
        for (var b = [{
                extension: "m4a",
                type: "audio/mp4; codecs=mp4a"
            }, {
                extension: "mp3",
                type: "audio/mpeg"
            }, {
                extension: "ogg",
                type: "audio/ogg; codecs=vorbis"
            }, {
                extension: "wav",
                type: "audio/wav"
            }], c = [], d = 0; d < b.length;) {
            var f = b[d];
            ++d;
            var g = "";
            try {
                g = a.canPlayType(f.type)
            } catch (i) {}
            "" != g && c.push(f.extension)
        }
        return c
    };
    h.html.HtmlAssetPackLoader.supportsBlob = function() {
        if (h.html.HtmlAssetPackLoader._detectBlobSupport) {
            if (!h.html.HtmlAssetPackLoader.verifyBlobBrowserCompatibility()) return h.html.HtmlAssetPackLoader._URL = null, h.html.HtmlAssetPackLoader._detectBlobSupport = !1;
            h.html.HtmlAssetPackLoader._detectBlobSupport = !1;
            try {
                (new XMLHttpRequest).responseType = "blob"
            } catch (a) {
                return !1
            }
            h.html.HtmlAssetPackLoader._URL = h.html.HtmlUtil.loadExtension("URL").value
        }
        return null != h.html.HtmlAssetPackLoader._URL && null != h.html.HtmlAssetPackLoader._URL.createObjectURL
    };
    h.html.HtmlAssetPackLoader.verifyBlobBrowserCompatibility = function() {
        return -1 != v.window.navigator.userAgent.toLowerCase().indexOf("silk") || -1 != v.window.navigator.userAgent.toLowerCase().indexOf("applewebkit/534.30") || -1 != v.window.navigator.userAgent.toLowerCase().indexOf("applewebkit/535.19") ||
            -1 != v.window.navigator.userAgent.toLowerCase().indexOf("IEMobile/10.0") || -1 != v.window.navigator.userAgent.toLowerCase().indexOf("IEMobile/9.0") ? !1 : !0
    };
    h.html.HtmlAssetPackLoader.__super__ = h.BasicAssetPackLoader;
    h.html.HtmlAssetPackLoader.prototype = t(h.BasicAssetPackLoader.prototype, {
        sendRequest: function(a, b, c, d) {
            var f = this,
                g = new XMLHttpRequest,
                h = 0,
                i = function() {
                    h = Date.now();
                    g.open("GET", a, !0);
                    g.responseType = c;
                    "" == g.responseType && (g.responseType = "arraybuffer");
                    g.send()
                },
                j = 0;
            if ("undefined" != typeof g.onprogress) {
                var l =
                    4;
                g.onprogress = function(a) {
                    h = Date.now();
                    f.handleProgress(b, a.loaded)
                };
                j = v.window.setInterval(function() {
                    5E3 < Date.now() - h && (g.abort(), --l, 0 < l ? i() : (v.window.clearInterval(j), f.handleError(b, "Failed to load asset: timeout")))
                }, 1E3)
            }
            g.onload = function() {
                v.window.clearInterval(j);
                var a = g.response;
                null == a ? a = g.responseText : "blob" == c && "arraybuffer" == g.responseType && (a = new Blob([g.response]));
                d(a)
            };
            g.onerror = function() {
                v.window.clearInterval(j);
                f.handleError(b, "Failed to load asset: error #" + p.string(g.status))
            };
            i();
            return g
        },
        getAudioFormats: function() {
            null == h.html.HtmlAssetPackLoader._audioFormats && (h.html.HtmlAssetPackLoader._audioFormats = h.html.HtmlAssetPackLoader.detectAudioFormats());
            return h.html.HtmlAssetPackLoader._audioFormats
        },
        loadEntry: function(a, b) {
            var c = this;
            switch (b.type[1]) {
                case 0:
                    var d = new Image,
                        f = new h.EventGroup;
                    f.addDisposingListener(d, "load", function() {
                        h.html.HtmlAssetPackLoader.supportsBlob() && h.html.HtmlAssetPackLoader._URL.revokeObjectURL(d.src);
                        var a = c._platform.getRenderer().createTexture(d);
                        null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    });
                    f.addDisposingListener(d, "error", function() {
                        c.handleError(b, "Failed to load image")
                    });
                    h.html.HtmlAssetPackLoader.supportsBlob() ? this.sendRequest(a, b, "blob", function(a) {
                        d.src = h.html.HtmlAssetPackLoader._URL.createObjectURL(a)
                    }) : d.src = a;
                    break;
                case 1:
                    if (h.html.WebAudioSound.get_supported()) this.sendRequest(a, b, "arraybuffer", function(d) {
                        h.html.WebAudioSound.ctx.decodeAudioData(d, function(a) {
                            c.handleLoad(b, new h.html.WebAudioSound(a))
                        }, function() {
                            K.logger.warn("Couldn't decode Web Audio, ignoring this asset", ["url", a]);
                            c.handleLoad(b, h.DummySound.getInstance())
                        })
                    });
                    else {
                        var g = v.document.createElement("audio");
                        g.preload = "auto";
                        var i = ++h.html.HtmlAssetPackLoader._mediaRefCount;
                        null == h.html.HtmlAssetPackLoader._mediaElements && (h.html.HtmlAssetPackLoader._mediaElements = new W);
                        h.html.HtmlAssetPackLoader._mediaElements.set(i, g);
                        f = new h.EventGroup;
                        f.addDisposingListener(g, "canplaythrough", function() {
                            h.html.HtmlAssetPackLoader._mediaElements.remove(i);
                            c.handleLoad(b, new h.html.HtmlSound(g))
                        });
                        f.addDisposingListener(g,
                            "error",
                            function() {
                                h.html.HtmlAssetPackLoader._mediaElements.remove(i);
                                var d = g.error.code;
                                3 == d || 4 == d ? (K.logger.warn("Couldn't decode HTML5 audio, ignoring this asset", ["url", a, "code", d]), c.handleLoad(b, h.DummySound.getInstance())) : c.handleError(b, "Failed to load audio: " + p.string(g.error.code))
                            });
                        f.addListener(g, "progress", function() {
                            if (0 < g.buffered.length && 0 < g.duration) {
                                var a = g.buffered.end(0) / g.duration;
                                c.handleProgress(b, a * b.bytes | 0)
                            }
                        });
                        g.src = a;
                        g.load()
                    }
                    break;
                case 2:
                    this.sendRequest(a, b, "text",
                        function(a) {
                            c.handleLoad(b, a)
                        })
            }
        },
        __class__: h.html.HtmlAssetPackLoader
    });
    h.html.HtmlExternal = function() {};
    k["flambe.platform.html.HtmlExternal"] = h.html.HtmlExternal;
    h.html.HtmlExternal.__name__ = ["flambe", "platform", "html", "HtmlExternal"];
    h.html.HtmlExternal.__interfaces__ = [x.External];
    h.html.HtmlExternal.prototype = {
        bind: function(a, b) {
            v.window[a] = b
        },
        call: function(a, b) {
            null == b && (b = []);
            return L.field(v.window, a).apply(null, b)
        },
        get_supported: function() {
            return !0
        },
        __class__: h.html.HtmlExternal,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    n.LogHandler = function() {};
    k["flambe.util.LogHandler"] = n.LogHandler;
    n.LogHandler.__name__ = ["flambe", "util", "LogHandler"];
    n.LogHandler.prototype = {
        __class__: n.LogHandler
    };
    h.html.HtmlLogHandler = function(a) {
        this._tagPrefix = a + ": "
    };
    k["flambe.platform.html.HtmlLogHandler"] = h.html.HtmlLogHandler;
    h.html.HtmlLogHandler.__name__ = ["flambe", "platform", "html", "HtmlLogHandler"];
    h.html.HtmlLogHandler.__interfaces__ = [n.LogHandler];
    h.html.HtmlLogHandler.isSupported = function() {
        return "object" == typeof console && null !=
            console.info
    };
    h.html.HtmlLogHandler.prototype = {
        log: function(a, b) {
            b = this._tagPrefix + b;
            switch (a[1]) {
                case 0:
                    console.info(b);
                    break;
                case 1:
                    console.warn(b);
                    break;
                case 2:
                    console.error(b)
            }
        },
        __class__: h.html.HtmlLogHandler
    };
    h.html.HtmlMouse = function(a, b) {
        h.BasicMouse.call(this, a);
        this._canvas = b
    };
    k["flambe.platform.html.HtmlMouse"] = h.html.HtmlMouse;
    h.html.HtmlMouse.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
    h.html.HtmlMouse.__super__ = h.BasicMouse;
    h.html.HtmlMouse.prototype = t(h.BasicMouse.prototype, {
        set_cursor: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "";
                    break;
                case 1:
                    b = "pointer";
                    break;
                case 2:
                    b = "none"
            }
            this._canvas.style.cursor = b;
            return h.BasicMouse.prototype.set_cursor.call(this, a)
        },
        __class__: h.html.HtmlMouse
    });
    h.html.HtmlSound = function(a) {
        this.audioElement = a
    };
    k["flambe.platform.html.HtmlSound"] = h.html.HtmlSound;
    h.html.HtmlSound.__name__ = ["flambe", "platform", "html", "HtmlSound"];
    h.html.HtmlSound.__interfaces__ = [H.Sound];
    h.html.HtmlSound.prototype = {
        dispose: function() {
            this.audioElement = null
        },
        get_duration: function() {
            return this.audioElement.duration
        },
        loop: function(a) {
            null == a && (a = 1);
            return new h.html._HtmlSound.HtmlPlayback(this, a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return new h.html._HtmlSound.HtmlPlayback(this, a, !1)
        },
        __class__: h.html.HtmlSound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    h.html._HtmlSound = {};
    h.html._HtmlSound.HtmlPlayback = function(a, b, c) {
        var d = this;
        this._sound = a;
        this._tickableAdded = !1;
        this._clonedElement = v.document.createElement("audio");
        this._clonedElement.loop = c;
        this._clonedElement.src = a.audioElement.src;
        this.volume = new E.AnimatedFloat(b,
            function() {
                d.updateVolume()
            });
        this.updateVolume();
        this.playAudio()
    };
    k["flambe.platform.html._HtmlSound.HtmlPlayback"] = h.html._HtmlSound.HtmlPlayback;
    h.html._HtmlSound.HtmlPlayback.__name__ = ["flambe", "platform", "html", "_HtmlSound", "HtmlPlayback"];
    h.html._HtmlSound.HtmlPlayback.__interfaces__ = [h.Tickable, H.Playback];
    h.html._HtmlSound.HtmlPlayback.prototype = {
        updateVolume: function() {
            this._clonedElement.volume = y.volume._value * this.volume._value
        },
        playAudio: function() {
            var a = this;
            this._clonedElement.play();
            this._tickableAdded || (h.html.HtmlPlatform.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._volumeBinding = y.volume.get_changed().connect(function() {
                a.updateVolume()
            }))
        },
        dispose: function() {
            this.set_paused(!0)
        },
        update: function(a) {
            this.volume.update(a);
            return this._clonedElement.ended || this._clonedElement.paused ? (this._tickableAdded = !1, this._volumeBinding.dispose(), !0) : !1
        },
        set_position: function(a) {
            return this._clonedElement.currentTime = a
        },
        get_position: function() {
            return this._clonedElement.currentTime
        },
        get_ended: function() {
            return this._clonedElement.ended
        },
        set_paused: function(a) {
            this._clonedElement.paused != a && (a ? this._clonedElement.pause() : this.playAudio());
            return a
        },
        get_paused: function() {
            return this._clonedElement.paused
        },
        get_sound: function() {
            return this._sound
        },
        __class__: h.html._HtmlSound.HtmlPlayback,
        __properties__: {
            set_paused: "set_paused",
            get_paused: "get_paused",
            get_ended: "get_ended",
            set_position: "set_position",
            get_position: "get_position",
            get_sound: "get_sound"
        }
    };
    h.html.HtmlStage = function(a) {
        var b =
            this;
        this._canvas = a;
        this.resize = new n.Signal0;
        this.scaleFactor = h.html.HtmlStage.computeScaleFactor();
        1 != this.scaleFactor && (K.logger.info("Reversing device DPI scaling", ["scaleFactor", this.scaleFactor]), h.html.HtmlUtil.setVendorStyle(this._canvas, "transform-origin", "top left"), h.html.HtmlUtil.setVendorStyle(this._canvas, "transform", "scale(" + 1 / this.scaleFactor + ")"));
        h.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange", function() {
            h.html.HtmlUtil.callLater(s(b, b.hideMobileBrowser),
                200)
        }, !1), this.hideMobileBrowser());
        window.addEventListener("resize", s(this, this.onWindowResize), !1);
        this.onWindowResize();
        this.orientation = new n.Value(null);
        null != window.orientation && (window.addEventListener("orientationchange", s(this, this.onOrientationChange), !1), this.onOrientationChange());
        this.fullscreen = new n.Value(!1);
        h.html.HtmlUtil.addVendorListener(v.document, "fullscreenchange", function() {
            b.updateFullscreen()
        }, !1);
        this.updateFullscreen()
    };
    k["flambe.platform.html.HtmlStage"] = h.html.HtmlStage;
    h.html.HtmlStage.__name__ = ["flambe", "platform", "html", "HtmlStage"];
    h.html.HtmlStage.__interfaces__ = [o.Stage];
    h.html.HtmlStage.computeScaleFactor = function() {
        var a = window.devicePixelRatio;
        null == a && (a = 1);
        var b = v.document.createElement("canvas").getContext("2d"),
            b = h.html.HtmlUtil.loadExtension("backingStorePixelRatio", b).value;
        null == b && (b = 1);
        a /= b;
        b = screen.height;
        return 1136 < a * screen.width || 1136 < a * b ? 1 : a
    };
    h.html.HtmlStage.prototype = {
        updateFullscreen: function() {
            this.fullscreen.set__(!0 == h.html.HtmlUtil.loadFirstExtension(["fullscreen",
                "fullScreen", "isFullScreen"
            ], v.document).value)
        },
        onOrientationChange: function() {
            this.orientation.set__(h.html.HtmlUtil.orientation(window.orientation))
        },
        hideMobileBrowser: function() {
            var a = this,
                b = v.document.documentElement.style;
            b.height = v.window.innerHeight + 100 + "px";
            b.width = v.window.innerWidth + "px";
            b.overflow = "visible";
            h.html.HtmlUtil.callLater(function() {
                h.html.HtmlUtil.hideMobileBrowser();
                h.html.HtmlUtil.callLater(function() {
                    b.height = v.window.innerHeight + "px";
                    a.onWindowResize()
                }, 100)
            })
        },
        resizeCanvas: function(a,
            b) {
            var c = this.scaleFactor * a,
                d = this.scaleFactor * b;
            if (this._canvas.width == c && this._canvas.height == d) return !1;
            this._canvas.width = c;
            this._canvas.height = d;
            this.resize.emit0();
            return !0
        },
        onWindowResize: function() {
            var a = this._canvas.parentNode.getBoundingClientRect();
            this.resizeCanvas(a.width, a.height)
        },
        requestFullscreen: function(a) {
            null == a && (a = !0);
            if (a) {
                var a = v.document.documentElement,
                    b = h.html.HtmlUtil.loadFirstExtension(["requestFullscreen", "requestFullScreen"], a).value;
                null != b && b.apply(a, [])
            } else a = h.html.HtmlUtil.loadFirstExtension(["cancelFullscreen",
                "cancelFullScreen"
            ], v.document).value, null != a && a.apply(v.document, [])
        },
        requestResize: function(a, b) {
            if (this.resizeCanvas(a, b)) {
                var c = this._canvas.parentNode;
                c.style.width = a + "px";
                c.style.height = b + "px"
            }
        },
        unlockOrientation: function() {},
        lockOrientation: function() {},
        get_fullscreenSupported: function() {
            return !0 == h.html.HtmlUtil.loadFirstExtension(["fullscreenEnabled", "fullScreenEnabled"], v.document).value
        },
        get_height: function() {
            return this._canvas.height
        },
        get_width: function() {
            return this._canvas.width
        },
        __class__: h.html.HtmlStage,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_fullscreenSupported: "get_fullscreenSupported"
        }
    };
    h.html.HtmlStorage = function(a) {
        this._storage = a
    };
    k["flambe.platform.html.HtmlStorage"] = h.html.HtmlStorage;
    h.html.HtmlStorage.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
    h.html.HtmlStorage.__interfaces__ = [aa.Storage];
    h.html.HtmlStorage.prototype = {
        clear: function() {
            try {
                this._storage.clear()
            } catch (a) {
                K.logger.warn("localStorage.clear failed", ["message", a.message])
            }
        },
        remove: function(a) {
            try {
                this._storage.removeItem("flambe:" +
                    a)
            } catch (b) {
                K.logger.warn("localStorage.removeItem failed", ["message", b.message])
            }
        },
        get: function(a, b) {
            var c = null;
            try {
                c = this._storage.getItem("flambe:" + a)
            } catch (d) {
                K.logger.warn("localStorage.getItem failed", ["message", d.message])
            }
            if (null != c) try {
                return Q.run(c)
            } catch (f) {
                K.logger.warn("Storage unserialization failed", ["message", f])
            }
            return b
        },
        set: function(a, b) {
            var c;
            try {
                var d = new T;
                d.useCache = !0;
                d.useEnumIndex = !1;
                d.serialize(b);
                c = d.toString()
            } catch (f) {
                return K.logger.warn("Storage serialization failed", ["message", f]), !1
            }
            try {
                this._storage.setItem("flambe:" + a, c)
            } catch (g) {
                return K.logger.warn("localStorage.setItem failed", ["message", g.message]), !1
            }
            return !0
        },
        get_supported: function() {
            return !0
        },
        __class__: h.html.HtmlStorage,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    h.html.HtmlUtil = function() {};
    k["flambe.platform.html.HtmlUtil"] = h.html.HtmlUtil;
    h.html.HtmlUtil.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
    h.html.HtmlUtil.callLater = function(a, b) {
        null == b && (b = 0);
        v.window.setTimeout(a, b)
    };
    h.html.HtmlUtil.hideMobileBrowser =
        function() {
            v.window.scrollTo(1, 0)
        };
    h.html.HtmlUtil.loadExtension = function(a, b) {
        null == b && (b = v.window);
        var c = L.field(b, a);
        if (null != c) return {
            prefix: null,
            field: a,
            value: c
        };
        for (var c = a.charAt(0).toUpperCase() + A.substr(a, 1, null), d = 0, f = h.html.HtmlUtil.VENDOR_PREFIXES; d < f.length;) {
            var g = f[d];
            ++d;
            var i = g + c,
                j = L.field(b, i);
            if (null != j) return {
                prefix: g,
                field: i,
                value: j
            }
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    h.html.HtmlUtil.loadFirstExtension = function(a, b) {
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            d = h.html.HtmlUtil.loadExtension(d,
                b);
            if (null != d.field) return d
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    h.html.HtmlUtil.polyfill = function(a, b) {
        null == b && (b = v.window);
        var c = h.html.HtmlUtil.loadExtension(a, b).value;
        if (null == c) return !1;
        b[a] = c;
        return !0
    };
    h.html.HtmlUtil.setVendorStyle = function(a, b, c) {
        for (var a = a.style, d = 0, f = h.html.HtmlUtil.VENDOR_PREFIXES; d < f.length;) {
            var g = f[d];
            ++d;
            a.setProperty("-" + g + "-" + b, c)
        }
        a.setProperty(b, c)
    };
    h.html.HtmlUtil.addVendorListener = function(a, b, c, d) {
        for (var f = 0, g = h.html.HtmlUtil.VENDOR_PREFIXES; f < g.length;) {
            var i =
                g[f];
            ++f;
            a.addEventListener(i + b, c, d)
        }
        a.addEventListener(b, c, d)
    };
    h.html.HtmlUtil.orientation = function(a) {
        switch (a) {
            case -90:
            case 90:
                return o.Orientation.Landscape;
            default:
                return o.Orientation.Portrait
        }
    };
    h.html.HtmlUtil.createEmptyCanvas = function(a, b) {
        var c = v.document.createElement("canvas");
        c.width = a;
        c.height = b;
        return c
    };
    h.html.HtmlUtil.createCanvas = function(a) {
        var b = h.html.HtmlUtil.createEmptyCanvas(a.width, a.height),
            c = b.getContext("2d");
        c.save();
        c.globalCompositeOperation = "copy";
        c.drawImage(a, 0,
            0);
        c.restore();
        return b
    };
    h.html.HtmlUtil.fixAndroidMath = function() {
        if (0 <= v.window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
            K.logger.warn("Monkey patching around Android sin/cos bug", null);
            var a = Math.sin,
                b = Math.cos;
            Math.sin = function(b) {
                return 0 == b ? 0 : a(b)
            };
            Math.cos = function(a) {
                return 0 == a ? 1 : b(a)
            }
        }
    };
    x = {
        Web: function() {}
    };
    k["flambe.web.Web"] = x.Web;
    x.Web.__name__ = ["flambe", "web", "Web"];
    x.Web.prototype = {
        __class__: x.Web,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    h.html.HtmlWeb = function(a) {
        this._container =
            a
    };
    k["flambe.platform.html.HtmlWeb"] = h.html.HtmlWeb;
    h.html.HtmlWeb.__name__ = ["flambe", "platform", "html", "HtmlWeb"];
    h.html.HtmlWeb.__interfaces__ = [x.Web];
    h.html.HtmlWeb.prototype = {
        openBrowser: function(a) {
            v.window.open(a, "_blank")
        },
        createView: function(a, b, c, d) {
            var f = v.document.createElement("iframe");
            f.style.position = "absolute";
            f.style.border = "0";
            f.scrolling = "no";
            this._container.appendChild(f);
            a = new h.html.HtmlWebView(f, a, b, c, d);
            h.html.HtmlPlatform.instance.mainLoop.addTickable(a);
            return a
        },
        get_supported: function() {
            return !0
        },
        __class__: h.html.HtmlWeb,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    x.WebView = function() {};
    k["flambe.web.WebView"] = x.WebView;
    x.WebView.__name__ = ["flambe", "web", "WebView"];
    x.WebView.__interfaces__ = [n.Disposable];
    x.WebView.prototype = {
        __class__: x.WebView
    };
    h.html.HtmlWebView = function(a, b, c, d, f) {
        var g = this;
        this.iframe = a;
        a = function() {
            g.updateBounds()
        };
        this.x = new E.AnimatedFloat(b, a);
        this.y = new E.AnimatedFloat(c, a);
        this.width = new E.AnimatedFloat(d, a);
        this.height = new E.AnimatedFloat(f, a);
        this.updateBounds();
        this.url = new n.Value(null, function(a) {
            g.loadUrl(a)
        });
        this.error = new n.Signal1
    };
    k["flambe.platform.html.HtmlWebView"] = h.html.HtmlWebView;
    h.html.HtmlWebView.__name__ = ["flambe", "platform", "html", "HtmlWebView"];
    h.html.HtmlWebView.__interfaces__ = [h.Tickable, x.WebView];
    h.html.HtmlWebView.prototype = {
        loadUrl: function(a) {
            null != this.iframe && (this.iframe.src = a)
        },
        updateBounds: function() {
            null != this.iframe && (this.iframe.style.left = this.x._value + "px", this.iframe.style.top = this.y._value + "px", this.iframe.width = this.width._value,
                this.iframe.height = this.height._value)
        },
        update: function(a) {
            this.x.update(a);
            this.y.update(a);
            this.width.update(a);
            this.height.update(a);
            return null == this.iframe
        },
        dispose: function() {
            null != this.iframe && (this.iframe.parentNode.removeChild(this.iframe), this.iframe = null)
        },
        __class__: h.html.HtmlWebView
    };
    h.html.WebAudioSound = function(a) {
        this.buffer = a
    };
    k["flambe.platform.html.WebAudioSound"] = h.html.WebAudioSound;
    h.html.WebAudioSound.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
    h.html.WebAudioSound.__interfaces__ = [H.Sound];
    h.html.WebAudioSound.__properties__ = {
        get_supported: "get_supported"
    };
    h.html.WebAudioSound.get_supported = function() {
        if (h.html.WebAudioSound._detectSupport) {
            h.html.WebAudioSound._detectSupport = !1;
            var a = h.html.HtmlUtil.loadExtension("AudioContext").value;
            null != a && (h.html.WebAudioSound.ctx = new a, h.html.WebAudioSound.gain = null != h.html.WebAudioSound.ctx.createGainNode ? h.html.WebAudioSound.ctx.createGainNode() : h.html.WebAudioSound.ctx.createGain(), h.html.WebAudioSound.gain.connect(h.html.WebAudioSound.ctx.destination),
                y.volume.watch(function(a) {
                    h.html.WebAudioSound.gain.gain.value = a
                }))
        }
        return null != h.html.WebAudioSound.ctx
    };
    h.html.WebAudioSound.prototype = {
        get_duration: function() {
            return this.buffer.duration
        },
        loop: function(a) {
            null == a && (a = 1);
            return new h.html._WebAudioSound.WebAudioPlayback(this, a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return new h.html._WebAudioSound.WebAudioPlayback(this, a, !1)
        },
        dispose: function() {
            this.buffer = null
        },
        __class__: h.html.WebAudioSound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    h.html._WebAudioSound = {};
    h.html._WebAudioSound.WebAudioPlayback = function(a, b, c) {
        var d = this;
        this._sound = a;
        this._ended = !1;
        this._head = h.html.WebAudioSound.gain;
        this._sourceNode = h.html.WebAudioSound.ctx.createBufferSource();
        this._sourceNode.buffer = a.buffer;
        this._sourceNode.loop = c;
        this._sourceNode.onended = s(this, this._endedEvent);
        null != this._sourceNode.noteOn ? this._sourceNode.noteOn(0) : this._sourceNode.start(0);
        this.playAudio();
        this.volume = new E.AnimatedFloat(b, function(a) {
            d.setVolume(a)
        });
        1 != b && this.setVolume(b)
    };
    k["flambe.platform.html._WebAudioSound.WebAudioPlayback"] =
        h.html._WebAudioSound.WebAudioPlayback;
    h.html._WebAudioSound.WebAudioPlayback.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
    h.html._WebAudioSound.WebAudioPlayback.__interfaces__ = [h.Tickable, H.Playback];
    h.html._WebAudioSound.WebAudioPlayback.prototype = {
        playAudio: function() {
            this._sourceNode.connect(this._head);
            this._startedAt = h.html.WebAudioSound.ctx.currentTime;
            this._pausedAt = -1;
            this._tickableAdded || (this._tickableAdded = !0, h.html.HtmlPlatform.instance.mainLoop.addTickable(this))
        },
        insertNode: function(a) {
            0 <= this._pausedAt || (this._sourceNode.disconnect(), this._sourceNode.connect(a));
            a.connect(this._head);
            this._head = a
        },
        setVolume: function(a) {
            null == this._gainNode && (this._gainNode = null != h.html.WebAudioSound.ctx.createGainNode ? h.html.WebAudioSound.ctx.createGainNode() : h.html.WebAudioSound.ctx.createGain(), this.insertNode(this._gainNode));
            this._gainNode.gain.value = a
        },
        dispose: function() {
            this.set_paused(!0);
            null != this._sourceNode && (this._sourceNode = null);
            null != this._gainNode && (this._gainNode.disconnect(),
                this._gainNode = null)
        },
        update: function(a) {
            this.volume.update(a);
            return 0 <= this._pausedAt || this.get_ended() ? (this._tickableAdded = !1, !0) : !1
        },
        set_position: function(a) {
            return a
        },
        get_position: function() {
            return this.get_ended() ? this._sound.get_duration() : 0 <= this._pausedAt ? this._pausedAt : (h.html.WebAudioSound.ctx.currentTime - this._startedAt) % this._sound.get_duration()
        },
        get_ended: function() {
            return null == this._sourceNode || null != this._sourceNode.playbackState && 3 == this._sourceNode.playbackState ? !0 : this._ended
        },
        set_paused: function(a) {
            a != 0 <= this._pausedAt && (a ? (this._sourceNode.disconnect(), this._pausedAt = this.get_position()) : this.playAudio());
            return a
        },
        get_paused: function() {
            return 0 <= this._pausedAt
        },
        get_sound: function() {
            return this._sound
        },
        _endedEvent: function() {
            this._ended = !0
        },
        __class__: h.html._WebAudioSound.WebAudioPlayback,
        __properties__: {
            set_paused: "set_paused",
            get_paused: "get_paused",
            get_ended: "get_ended",
            set_position: "set_position",
            get_position: "get_position",
            get_sound: "get_sound"
        }
    };
    x = {
        Director: function() {
            this._width =
                this._height = -1;
            this._transitor = null;
            this.scenes = [];
            this.occludedScenes = [];
            this._root = new M
        }
    };
    k["flambe.scene.Director"] = x.Director;
    x.Director.__name__ = ["flambe", "scene", "Director"];
    x.Director.__super__ = P;
    x.Director.prototype = t(P.prototype, {
        get_height: function() {
            return 0 > this._height ? y._platform.getStage().get_height() : this._height
        },
        get_width: function() {
            return 0 > this._width ? y._platform.getStage().get_width() : this._width
        },
        completeTransition: function() {
            null != this._transitor && (this._transitor.complete(),
                this._transitor = null, this.invalidateVisibility())
        },
        invalidateVisibility: function() {
            for (var a = this.scenes.length; 0 < a;) {
                var b = this.scenes[--a],
                    b = b._compMap.Scene_4;
                if (null == b || b.opaque) break
            }
            this.occludedScenes = 0 < this.scenes.length ? this.scenes.slice(a, this.scenes.length - 1) : [];
            b = this.get_topScene();
            null != b && this.show(b)
        },
        show: function(a) {
            a = a._compMap.Scene_4;
            null != a && a.shown.emit0()
        },
        get_topScene: function() {
            var a = this.scenes.length;
            return 0 < a ? this.scenes[a - 1] : null
        },
        onUpdate: function(a) {
            null != this._transitor &&
                this._transitor.update(a) && this.completeTransition()
        },
        onRemoved: function() {
            this.completeTransition();
            for (var a = 0, b = this.scenes; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispose()
            }
            this.scenes = [];
            this.occludedScenes = [];
            this._root.dispose()
        },
        onAdded: function() {
            this.owner.addChild(this._root)
        },
        get_name: function() {
            return "Director_0"
        },
        __class__: x.Director
    });
    x._Director = {};
    x._Director.Transitor = function() {};
    k["flambe.scene._Director.Transitor"] = x._Director.Transitor;
    x._Director.Transitor.__name__ = ["flambe", "scene",
        "_Director", "Transitor"
    ];
    x._Director.Transitor.prototype = {
        complete: function() {
            this._transition.complete();
            this._onComplete()
        },
        update: function(a) {
            return this._transition.update(a)
        },
        __class__: x._Director.Transitor
    };
    x.Scene = function(a) {
        null == a && (a = !0);
        this.opaque = a;
        this.shown = new n.Signal0;
        this.hidden = new n.Signal0
    };
    k["flambe.scene.Scene"] = x.Scene;
    x.Scene.__name__ = ["flambe", "scene", "Scene"];
    x.Scene.__super__ = P;
    x.Scene.prototype = t(P.prototype, {
        get_name: function() {
            return "Scene_4"
        },
        __class__: x.Scene
    });
    x.Transition = function() {};
    k["flambe.scene.Transition"] = x.Transition;
    x.Transition.__name__ = ["flambe", "scene", "Transition"];
    x.Transition.prototype = {
        complete: function() {},
        update: function() {
            return !0
        },
        __class__: x.Transition
    };
    H._Mixer = {};
    H._Mixer.MixerSound = function(a, b) {
        this._source = a;
        this._channels = b;
        this._playbacks = []
    };
    k["flambe.sound._Mixer.MixerSound"] = H._Mixer.MixerSound;
    H._Mixer.MixerSound.__name__ = ["flambe", "sound", "_Mixer", "MixerSound"];
    H._Mixer.MixerSound.__interfaces__ = [n.Disposable, H.Sound];
    H._Mixer.MixerSound.prototype = {
        dispose: function() {
            for (var a = 0, b = this._playbacks; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispose()
            }
            this._playbacks = [];
            this._source = null
        },
        get_duration: function() {
            return this._source.get_duration()
        },
        findOpenChannel: function() {
            for (var a = 0, b = this._channels; a < b;) {
                var c = a++,
                    d = this._playbacks[c];
                if (null == d || d.get_ended()) return c
            }
            return -1
        },
        playOrLoop: function(a, b) {
            var c = this.findOpenChannel();
            if (0 > c) return new h.DummyPlayback(this);
            var d = b ? this._source.loop(a) : this._source.play(a);
            return this._playbacks[c] =
                d
        },
        loop: function(a) {
            null == a && (a = 1);
            return this.playOrLoop(a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return this.playOrLoop(a, !1)
        },
        __class__: H._Mixer.MixerSound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    w = {
        BitmapSprite: function(a) {
            o.Sprite.call(this);
            this.symbol = a;
            this.anchorX.set__(a.anchorX);
            this.anchorY.set__(a.anchorY)
        }
    };
    k["flambe.swf.BitmapSprite"] = w.BitmapSprite;
    w.BitmapSprite.__name__ = ["flambe", "swf", "BitmapSprite"];
    w.BitmapSprite.__super__ = o.Sprite;
    w.BitmapSprite.prototype = t(o.Sprite.prototype, {
        getNaturalHeight: function() {
            return this.symbol.height
        },
        getNaturalWidth: function() {
            return this.symbol.width
        },
        draw: function(a) {
            a.drawSubImage(this.symbol.atlas, 0, 0, this.symbol.x, this.symbol.y, this.symbol.width, this.symbol.height)
        },
        __class__: w.BitmapSprite
    });
    w.Symbol = function() {};
    k["flambe.swf.Symbol"] = w.Symbol;
    w.Symbol.__name__ = ["flambe", "swf", "Symbol"];
    w.Symbol.prototype = {
        __class__: w.Symbol,
        __properties__: {
            get_name: "get_name"
        }
    };
    w.BitmapSymbol = function(a, b) {
        this._name = a.symbol;
        this.atlas = b;
        var c = a.rect;
        this.x = c[0];
        this.y = c[1];
        this.width = c[2];
        this.height = c[3];
        c = a.origin;
        null != c ? (this.anchorX = c[0], this.anchorY = c[1]) : this.anchorY = this.anchorX = 0
    };
    k["flambe.swf.BitmapSymbol"] = w.BitmapSymbol;
    w.BitmapSymbol.__name__ = ["flambe", "swf", "BitmapSymbol"];
    w.BitmapSymbol.__interfaces__ = [w.Symbol];
    w.BitmapSymbol.prototype = {
        get_name: function() {
            return this._name
        },
        createSprite: function() {
            return new w.BitmapSprite(this)
        },
        __class__: w.BitmapSymbol,
        __properties__: {
            get_name: "get_name"
        }
    };
    w.Library = function(a, b) {
        this._symbols =
            new F;
        var c = Y.parse(a.getFile(b + "/library.json"));
        this.frameRate = c.frameRate;
        for (var d = [], f = 0, g = c.movies; f < g.length;) {
            var h = g[f];
            ++f;
            h = new w.MovieSymbol(this, h);
            d.push(h);
            this._symbols.set(h.get_name(), h)
        }
        f = c.textureGroups;
        (1 != f[0].scaleFactor || 1 < f.length) && K.logger.warn("Flambe doesn't support Flump's Additional Scale Factors. Use Base Scales and load from different asset packs instead.", null);
        h = f[0].atlases;
        for (f = 0; f < h.length;) {
            c = h[f];
            ++f;
            for (var i = a.getTexture(b + "/" + n.Strings.removeFileExtension(c.file)),
                    g = 0, c = c.textures; g < c.length;) {
                var j = c[g];
                ++g;
                j = new w.BitmapSymbol(j, i);
                this._symbols.set(j.get_name(), j)
            }
        }
        for (f = 0; f < d.length;) {
            h = d[f];
            ++f;
            g = 0;
            for (c = h.layers; g < c.length;) {
                h = c[g];
                ++g;
                i = 0;
                for (j = h.keyframes; i < j.length;) {
                    var l = j[i];
                    ++i;
                    if (null != l.symbolName) {
                        var k = this._symbols.get(l.symbolName);
                        null == h.lastSymbol ? h.lastSymbol = k : h.lastSymbol != k && (h.multipleSymbols = !0);
                        l.symbol = k
                    }
                }
            }
        }
    };
    k["flambe.swf.Library"] = w.Library;
    w.Library.__name__ = ["flambe", "swf", "Library"];
    w.Library.prototype = {
        __class__: w.Library
    };
    w.MovieSprite = function(a) {
        this._looped = null;
        o.Sprite.call(this);
        this.symbol = a;
        this.speed = new E.AnimatedFloat(1);
        this._animators = Array(a.layers.length);
        for (var b = 0, c = this._animators.length; b < c;) {
            var d = b++;
            this._animators[d] = new w._MovieSprite.LayerAnimator(a.layers[d])
        }
        this._position = this._frame = 0;
        this["goto"](1)
    };
    k["flambe.swf.MovieSprite"] = w.MovieSprite;
    w.MovieSprite.__name__ = ["flambe", "swf", "MovieSprite"];
    w.MovieSprite.__super__ = o.Sprite;
    w.MovieSprite.prototype = t(o.Sprite.prototype, {
        get_looped: function() {
            null ==
                this._looped && (this._looped = new n.Signal0);
            return this._looped
        },
        set_paused: function(a) {
            this._flags = n.BitSets.set(this._flags, 16, a);
            return a
        },
        set_position: function(a) {
            return this._position = I.FMath.clamp(a, 0, this.symbol.duration)
        },
        "goto": function(a) {
            if (this._frame != a) {
                if (a < this._frame)
                    for (var b = 0, c = this._animators; b < c.length;) {
                        var d = c[b];
                        ++b;
                        d.changedKeyframe = !0;
                        d.keyframeIdx = 0
                    }
                b = 0;
                for (c = this._animators; b < c.length;) d = c[b], ++b, d.composeFrame(a);
                this._frame = a
            }
        },
        onUpdate: function(a) {
            o.Sprite.prototype.onUpdate.call(this,
                a);
            this.speed.update(a);
            var b = !1;
            0 == (this._flags & 16) && (this._position += this.speed._value * a, this._position > this.symbol.duration && (this._position %= this.symbol.duration, b = !0));
            this["goto"](this._position * this.symbol.frameRate);
            b && null != this._looped && this._looped.emit0()
        },
        onRemoved: function() {
            o.Sprite.prototype.onRemoved.call(this);
            for (var a = 0, b = this._animators; a < b.length;) {
                var c = b[a];
                ++a;
                this.owner.removeChild(c.content)
            }
        },
        onAdded: function() {
            o.Sprite.prototype.onAdded.call(this);
            for (var a = 0, b = this._animators; a <
                b.length;) {
                var c = b[a];
                ++a;
                this.owner.addChild(c.content)
            }
        },
        __class__: w.MovieSprite,
        __properties__: t(o.Sprite.prototype.__properties__, {
            set_position: "set_position",
            get_position: "get_position",
            set_paused: "set_paused",
            get_paused: "get_paused"
        })
    });
    w._MovieSprite = {};
    w._MovieSprite.LayerAnimator = function(a) {
        this._sprites = null;
        this.changedKeyframe = !1;
        this.keyframeIdx = 0;
        this.layer = a;
        if (a.multipleSymbols) {
            this._sprites = Array(a.keyframes.length);
            for (var b = 0, c = this._sprites.length; b < c;) {
                var d = b++,
                    f = a.keyframes[d];
                this._sprites[d] = null != f.symbol ? f.symbol.createSprite() : new o.Sprite
            }
            a = this._sprites[0]
        } else a = null != a.lastSymbol ? a.lastSymbol.createSprite() : new o.Sprite;
        this.content = (new M).add(a)
    };
    k["flambe.swf._MovieSprite.LayerAnimator"] = w._MovieSprite.LayerAnimator;
    w._MovieSprite.LayerAnimator.__name__ = ["flambe", "swf", "_MovieSprite", "LayerAnimator"];
    w._MovieSprite.LayerAnimator.prototype = {
        composeFrame: function(a) {
            for (var b = this.layer.keyframes, c = b.length - 1; this.keyframeIdx < c && b[this.keyframeIdx + 1].index <= a;) ++this.keyframeIdx,
                this.changedKeyframe = !0;
            var d;
            this.changedKeyframe && null != this._sprites ? (d = this._sprites[this.keyframeIdx], this.content.add(d)) : d = this.content._compMap.Sprite_1;
            this.changedKeyframe = !1;
            var f = b[this.keyframeIdx],
                g = f.visible && null != f.symbol;
            d.set_visible(g);
            if (g) {
                var g = f.x,
                    h = f.y,
                    i = f.scaleX,
                    j = f.scaleY,
                    l = f.skewX,
                    k = f.skewY,
                    m = f.alpha;
                if (f.tweened && this.keyframeIdx < c) {
                    a = (a - f.index) / f.duration;
                    c = f.ease;
                    if (0 != c) {
                        var n;
                        0 > c ? (n = 1 - a, n = 1 - n * n, c = -c) : n = a * a;
                        a = c * n + (1 - c) * a
                    }
                    b = b[this.keyframeIdx + 1];
                    g += (b.x - g) * a;
                    h += (b.y -
                        h) * a;
                    i += (b.scaleX - i) * a;
                    j += (b.scaleY - j) * a;
                    l += (b.skewX - l) * a;
                    k += (b.skewY - k) * a;
                    m += (b.alpha - m) * a
                }
                b = d.getLocalMatrix();
                a = Math.sin(l);
                l = Math.cos(l);
                c = Math.sin(k);
                k = Math.cos(k);
                b.set(k * i, c * i, -a * j, l * j, g, h);
                b.translate(-f.pivotX, -f.pivotY);
                d.alpha.set__(m)
            }
        },
        __class__: w._MovieSprite.LayerAnimator
    };
    w.MovieSymbol = function(a, b) {
        this._name = b.id;
        this.frameRate = a.frameRate;
        this.frames = 0;
        this.layers = Array(b.layers.length);
        for (var c = 0, d = this.layers.length; c < d;) {
            var f = c++,
                g = new w.MovieLayer(b.layers[f]);
            this.frames =
                Math.max(g.get_frames(), this.frames);
            this.layers[f] = g
        }
        this.duration = this.frames / this.frameRate
    };
    k["flambe.swf.MovieSymbol"] = w.MovieSymbol;
    w.MovieSymbol.__name__ = ["flambe", "swf", "MovieSymbol"];
    w.MovieSymbol.__interfaces__ = [w.Symbol];
    w.MovieSymbol.prototype = {
        createSprite: function() {
            return new w.MovieSprite(this)
        },
        get_name: function() {
            return this._name
        },
        __class__: w.MovieSymbol,
        __properties__: {
            get_name: "get_name"
        }
    };
    w.MovieLayer = function(a) {
        this.multipleSymbols = !1;
        this.lastSymbol = null;
        this.name = a.name;
        var b = null;
        this.keyframes = Array(a.keyframes.length);
        for (var c = 0, d = this.keyframes.length; c < d;) {
            var f = c++,
                b = new w.MovieKeyframe(a.keyframes[f], b);
            this.keyframes[f] = b
        }
    };
    k["flambe.swf.MovieLayer"] = w.MovieLayer;
    w.MovieLayer.__name__ = ["flambe", "swf", "MovieLayer"];
    w.MovieLayer.prototype = {
        get_frames: function() {
            var a = this.keyframes[this.keyframes.length - 1];
            return a.index + (a.duration | 0)
        },
        __class__: w.MovieLayer,
        __properties__: {
            get_frames: "get_frames"
        }
    };
    w.MovieKeyframe = function(a, b) {
        this.ease = 0;
        this.visible =
            this.tweened = !0;
        this.alpha = 1;
        this.skewX = this.skewY = this.pivotX = this.pivotY = 0;
        this.scaleX = this.scaleY = 1;
        this.x = this.y = 0;
        this.symbol = null;
        this.index = null != b ? b.index + b.duration : 0;
        this.duration = a.duration;
        this.label = a.label;
        this.symbolName = a.ref;
        var c = a.loc;
        null != c && (this.x = c[0], this.y = c[1]);
        c = a.scale;
        null != c && (this.scaleX = c[0], this.scaleY = c[1]);
        c = a.skew;
        null != c && (this.skewX = c[0], this.skewY = c[1]);
        c = a.pivot;
        null != c && (this.pivotX = c[0], this.pivotY = c[1]);
        null != a.alpha && (this.alpha = a.alpha);
        null != a.visible &&
            (this.visible = a.visible);
        null != a.tweened && (this.tweened = a.tweened);
        null != a.ease && (this.ease = a.ease)
    };
    k["flambe.swf.MovieKeyframe"] = w.MovieKeyframe;
    w.MovieKeyframe.__name__ = ["flambe", "swf", "MovieKeyframe"];
    w.MovieKeyframe.prototype = {
        __class__: w.MovieKeyframe
    };
    n.Arrays = function() {};
    k["flambe.util.Arrays"] = n.Arrays;
    n.Arrays.__name__ = ["flambe", "util", "Arrays"];
    n.Assert = function() {};
    k["flambe.util.Assert"] = n.Assert;
    n.Assert.__name__ = ["flambe", "util", "Assert"];
    n.BitSets = function() {};
    k["flambe.util.BitSets"] =
        n.BitSets;
    n.BitSets.__name__ = ["flambe", "util", "BitSets"];
    n.BitSets.set = function(a, b, c) {
        return c ? a | b : a & ~b
    };
    n.LogLevel = k["flambe.util.LogLevel"] = {
        __ename__: ["flambe", "util", "LogLevel"],
        __constructs__: ["Info", "Warn", "Error"]
    };
    n.LogLevel.Info = ["Info", 0];
    n.LogLevel.Info.toString = r;
    n.LogLevel.Info.__enum__ = n.LogLevel;
    n.LogLevel.Warn = ["Warn", 1];
    n.LogLevel.Warn.toString = r;
    n.LogLevel.Warn.__enum__ = n.LogLevel;
    n.LogLevel.Error = ["Error", 2];
    n.LogLevel.Error.toString = r;
    n.LogLevel.Error.__enum__ = n.LogLevel;
    n.Promise =
        function() {
            this.success = new n.Signal1;
            this.error = new n.Signal1;
            this.progressChanged = new n.Signal0;
            this.hasResult = !1;
            this._total = this._progress = 0
        };
    k["flambe.util.Promise"] = n.Promise;
    n.Promise.__name__ = ["flambe", "util", "Promise"];
    n.Promise.prototype = {
        set_total: function(a) {
            this._total != a && (this._total = a, this.progressChanged.emit0());
            return a
        },
        set_progress: function(a) {
            this._progress != a && (this._progress = a, this.progressChanged.emit0());
            return a
        },
        get: function(a) {
            return this.hasResult ? (a(this._result), null) :
                this.success.connect(a).once()
        },
        set_result: function(a) {
            if (this.hasResult) throw "Promise result already assigned";
            this._result = a;
            this.hasResult = !0;
            this.success.emit1(a);
            return a
        },
        get_result: function() {
            if (!this.hasResult) throw "Promise result not yet available";
            return this._result
        },
        __class__: n.Promise,
        __properties__: {
            set_result: "set_result",
            get_result: "get_result",
            set_progress: "set_progress",
            get_progress: "get_progress",
            set_total: "set_total",
            get_total: "get_total"
        }
    };
    n.Signal0 = function(a) {
        n.SignalBase.call(this,
            a)
    };
    k["flambe.util.Signal0"] = n.Signal0;
    n.Signal0.__name__ = ["flambe", "util", "Signal0"];
    n.Signal0.__super__ = n.SignalBase;
    n.Signal0.prototype = t(n.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: n.Signal0
    });
    n._SignalBase = {};
    n._SignalBase.Task = function(a) {
        this.next = null;
        this.fn = a
    };
    k["flambe.util._SignalBase.Task"] = n._SignalBase.Task;
    n._SignalBase.Task.__name__ = ["flambe", "util", "_SignalBase", "Task"];
    n._SignalBase.Task.prototype = {
        __class__: n._SignalBase.Task
    };
    B = void 0;
    U = void 0;
    Q = void 0;
    T = void 0;
    V = void 0;
    Y = void 0;
    Y = function() {};
    k["haxe.Json"] = Y;
    Y.__name__ = ["haxe", "Json"];
    Y.parse = function(a) {
        return (new Y).doParse(a)
    };
    Y.prototype = {
        parseString: function() {
            for (var a = this.pos, b = new Z;;) {
                var c = this.str.charCodeAt(this.pos++);
                if (34 == c) break;
                if (92 == c) {
                    b.b += A.substr(this.str, a, this.pos - a - 1);
                    c = this.str.charCodeAt(this.pos++);
                    switch (c) {
                        case 114:
                            b.b += String.fromCharCode(13);
                            break;
                        case 110:
                            b.b += String.fromCharCode(10);
                            break;
                        case 116:
                            b.b += String.fromCharCode(9);
                            break;
                        case 98:
                            b.b += String.fromCharCode(8);
                            break;
                        case 102:
                            b.b += String.fromCharCode(12);
                            break;
                        case 47:
                        case 92:
                        case 34:
                            b.b += String.fromCharCode(c);
                            break;
                        case 117:
                            a = p.parseInt("0x" + A.substr(this.str, this.pos, 4));
                            this.pos += 4;
                            b.b += String.fromCharCode(a);
                            break;
                        default:
                            throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
                    }
                    a = this.pos
                } else if (c != c) throw "Unclosed string";
            }
            b.b += A.substr(this.str, a, this.pos - a - 1);
            return b.b
        },
        parseRec: function() {
            for (;;) switch (this.str.charCodeAt(this.pos++)) {
                case 32:
                case 13:
                case 10:
                case 9:
                    break;
                case 123:
                    for (var a = {}, b = null, c = null;;) {
                        var d = this.str.charCodeAt(this.pos++);
                        switch (d) {
                            case 32:
                            case 13:
                            case 10:
                            case 9:
                                break;
                            case 125:
                                return (null != b || !1 == c) && this.invalidChar(), a;
                            case 58:
                                null == b && this.invalidChar();
                                a[b] = this.parseRec();
                                b = null;
                                c = !0;
                                break;
                            case 44:
                                c ? c = !1 : this.invalidChar();
                                break;
                            case 34:
                                c && this.invalidChar();
                                b = this.parseString();
                                break;
                            default:
                                this.invalidChar()
                        }
                    }
                    break;
                case 91:
                    a = [];
                    for (c = null;;) switch (d = this.str.charCodeAt(this.pos++), d) {
                        case 32:
                        case 13:
                        case 10:
                        case 9:
                            break;
                        case 93:
                            return !1 ==
                                c && this.invalidChar(), a;
                        case 44:
                            c ? c = !1 : this.invalidChar();
                            break;
                        default:
                            c && this.invalidChar(), this.pos--, a.push(this.parseRec()), c = !0
                    }
                    break;
                case 116:
                    c = this.pos;
                    if (114 != this.str.charCodeAt(this.pos++) || 117 != this.str.charCodeAt(this.pos++) || 101 != this.str.charCodeAt(this.pos++)) this.pos = c, this.invalidChar();
                    return !0;
                case 102:
                    c = this.pos;
                    if (97 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++) || 115 != this.str.charCodeAt(this.pos++) || 101 != this.str.charCodeAt(this.pos++)) this.pos = c, this.invalidChar();
                    return !1;
                case 110:
                    c = this.pos;
                    if (117 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++)) this.pos = c, this.invalidChar();
                    return null;
                case 34:
                    return this.parseString();
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 45:
                    this.pos--;
                    if (!this.reg_float.match(A.substr(this.str, this.pos, null))) throw "Invalid float at position " + this.pos;
                    c = this.reg_float.matched(0);
                    this.pos += c.length;
                    c = p.parseFloat(c);
                    d = c | 0;
                    return d ==
                        c ? d : c;
                default:
                    this.invalidChar()
            }
        },
        invalidChar: function() {
            this.pos--;
            throw "Invalid char " + this.str.charCodeAt(this.pos) + " at position " + this.pos;
        },
        doParse: function(a) {
            this.reg_float = new X("^-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?", "");
            this.str = a;
            this.pos = 0;
            return this.parseRec()
        },
        __class__: Y
    };
    T = function() {
        this.buf = new Z;
        this.cache = [];
        this.useCache = T.USE_CACHE;
        this.useEnumIndex = T.USE_ENUM_INDEX;
        this.shash = new F;
        this.scount = 0
    };
    k["haxe.Serializer"] = T;
    T.__name__ = ["haxe", "Serializer"];
    T.run = function(a) {
        var b =
            new T;
        b.serialize(a);
        return b.toString()
    };
    T.prototype = {
        serialize: function(a) {
            var b = N["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b += p.string("n");
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += p.string("z");
                        break
                    }
                    this.buf.b += p.string("i");
                    this.buf.b += p.string(a);
                    break;
                case 2:
                    Math.isNaN(a) ? this.buf.b += p.string("k") : Math.isFinite(a) ? (this.buf.b += p.string("d"), this.buf.b += p.string(a)) : this.buf.b += p.string(0 > a ? "m" : "p");
                    break;
                case 3:
                    this.buf.b += p.string(a ? "t" : "f");
                    break;
                case 6:
                    b = b[2];
                    if (b == String) {
                        this.serializeString(a);
                        break
                    }
                    if (this.useCache && this.serializeRef(a)) break;
                    switch (b) {
                        case Array:
                            var c = 0;
                            this.buf.b += p.string("a");
                            for (var d = a.length, f = 0; f < d;) b = f++, null == a[b] ? c++ : (0 < c && (1 == c ? this.buf.b += p.string("n") : (this.buf.b += p.string("u"), this.buf.b += p.string(c)), c = 0), this.serialize(a[b]));
                            0 < c && (1 == c ? this.buf.b += p.string("n") : (this.buf.b += p.string("u"), this.buf.b += p.string(c)));
                            this.buf.b += p.string("h");
                            break;
                        case da:
                            this.buf.b += p.string("l");
                            for (a = a.iterator(); a.hasNext();) b = a.next(), this.serialize(b);
                            this.buf.b +=
                                p.string("h");
                            break;
                        case Date:
                            this.buf.b += p.string("v");
                            this.buf.b += p.string(A.dateStr(a));
                            break;
                        case F:
                            this.buf.b += p.string("b");
                            for (c = a.keys(); c.hasNext();) b = c.next(), this.serializeString(b), this.serialize(a.get(b));
                            this.buf.b += p.string("h");
                            break;
                        case W:
                            this.buf.b += p.string("q");
                            for (c = a.keys(); c.hasNext();) b = c.next(), this.buf.b += p.string(":"), this.buf.b += p.string(b), this.serialize(a.get(b));
                            this.buf.b += p.string("h");
                            break;
                        case V.Bytes:
                            b = 0;
                            c = a.length - 2;
                            d = new Z;
                            for (f = T.BASE64; b < c;) {
                                var g = a.b[b++],
                                    h = a.b[b++],
                                    i = a.b[b++];
                                d.b += p.string(f.charAt(g >> 2));
                                d.b += p.string(f.charAt((g << 4 | h >> 4) & 63));
                                d.b += p.string(f.charAt((h << 2 | i >> 6) & 63));
                                d.b += p.string(f.charAt(i & 63))
                            }
                            b == c ? (g = a.b[b++], h = a.b[b++], d.b += p.string(f.charAt(g >> 2)), d.b += p.string(f.charAt((g << 4 | h >> 4) & 63)), d.b += p.string(f.charAt(h << 2 & 63))) : b == c + 1 && (g = a.b[b++], d.b += p.string(f.charAt(g >> 2)), d.b += p.string(f.charAt(g << 4 & 63)));
                            b = d.b;
                            this.buf.b += p.string("s");
                            this.buf.b += p.string(b.length);
                            this.buf.b += p.string(":");
                            this.buf.b += p.string(b);
                            break;
                        default:
                            this.cache.pop(),
                                null != a.hxSerialize ? (this.buf.b += p.string("C"), this.serializeString(N.getClassName(b)), this.cache.push(a), a.hxSerialize(this), this.buf.b += p.string("g")) : (this.buf.b += p.string("c"), this.serializeString(N.getClassName(b)), this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (this.useCache && this.serializeRef(a)) break;
                    this.buf.b += p.string("o");
                    this.serializeFields(a);
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache && this.serializeRef(a)) break;
                    this.cache.pop();
                    this.buf.b += p.string(this.useEnumIndex ? "j" : "w");
                    this.serializeString(N.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += p.string(":"), this.buf.b += p.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += p.string(":");
                    d = a.length;
                    this.buf.b += p.string(d - 2);
                    for (f = 2; f < d;) b = f++, this.serialize(a[b]);
                    this.cache.push(a);
                    break;
                case 5:
                    throw "Cannot serialize function";
                default:
                    throw "Cannot serialize " + p.string(a);
            }
        },
        serializeFields: function(a) {
            for (var b = 0, c = L.fields(a); b < c.length;) {
                var d = c[b];
                ++b;
                this.serializeString(d);
                this.serialize(L.field(a, d))
            }
            this.buf.b +=
                p.string("g")
        },
        serializeRef: function(a) {
            for (var b = typeof a, c = 0, d = this.cache.length; c < d;) {
                var f = c++,
                    g = this.cache[f];
                if (typeof g == b && g == a) return this.buf.b += p.string("r"), this.buf.b += p.string(f), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += p.string("R"), this.buf.b += p.string(b)) : (this.shash.set(a, this.scount++), this.buf.b += p.string("y"), a = R.urlEncode(a), this.buf.b += p.string(a.length), this.buf.b += p.string(":"), this.buf.b += p.string(a))
        },
        toString: function() {
            return this.buf.b
        },
        __class__: T
    };
    U = function(a) {
        var b = this;
        this.id = window.setInterval(function() {
            b.run()
        }, a)
    };
    k["haxe.Timer"] = U;
    U.__name__ = ["haxe", "Timer"];
    U.delay = function(a, b) {
        var c = new U(b);
        c.run = function() {
            c.stop();
            a()
        };
        return c
    };
    U.prototype = {
        run: function() {},
        stop: function() {
            null != this.id && (window.clearInterval(this.id), this.id = null)
        },
        __class__: U
    };
    Q = function(a) {
        this.buf = a;
        this.length = a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = Q.DEFAULT_RESOLVER;
        null == a && (a = N, Q.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    k["haxe.Unserializer"] =
        Q;
    Q.__name__ = ["haxe", "Unserializer"];
    Q.initCodes = function() {
        for (var a = [], b = 0, c = Q.BASE64.length; b < c;) {
            var d = b++;
            a[Q.BASE64.charCodeAt(d)] = d
        }
        return a
    };
    Q.run = function(a) {
        return (new Q(a)).unserialize()
    };
    Q.prototype = {
        unserialize: function() {
            switch (this.buf.charCodeAt(this.pos++)) {
                case 110:
                    return null;
                case 116:
                    return !0;
                case 102:
                    return !1;
                case 122:
                    return 0;
                case 105:
                    return this.readDigits();
                case 100:
                    for (var a = this.pos;;) {
                        var b = this.buf.charCodeAt(this.pos);
                        if (43 <= b && 58 > b || 101 == b || 69 == b) this.pos++;
                        else break
                    }
                    return p.parseFloat(A.substr(this.buf,
                        a, this.pos - a));
                case 121:
                    b = this.readDigits();
                    if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < b) throw "Invalid string length";
                    a = A.substr(this.buf, this.pos, b);
                    this.pos += b;
                    a = R.urlDecode(a);
                    this.scache.push(a);
                    return a;
                case 107:
                    return Math.NaN;
                case 109:
                    return Math.NEGATIVE_INFINITY;
                case 112:
                    return Math.POSITIVE_INFINITY;
                case 97:
                    var c = this.buf,
                        a = [];
                    for (this.cache.push(a);;) {
                        b = this.buf.charCodeAt(this.pos);
                        if (104 == b) {
                            this.pos++;
                            break
                        }
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) :
                            a.push(this.unserialize())
                    }
                    return a;
                case 111:
                    return b = {}, this.cache.push(b), this.unserializeObject(b), b;
                case 114:
                    b = this.readDigits();
                    if (0 > b || b >= this.cache.length) throw "Invalid reference";
                    return this.cache[b];
                case 82:
                    b = this.readDigits();
                    if (0 > b || b >= this.scache.length) throw "Invalid string reference";
                    return this.scache[b];
                case 120:
                    throw this.unserialize();
                case 99:
                    b = this.unserialize();
                    a = this.resolver.resolveClass(b);
                    if (null == a) throw "Class not found " + b;
                    b = N.createEmptyInstance(a);
                    this.cache.push(b);
                    this.unserializeObject(b);
                    return b;
                case 119:
                    b = this.unserialize();
                    a = this.resolver.resolveEnum(b);
                    if (null == a) throw "Enum not found " + b;
                    b = this.unserializeEnum(a, this.unserialize());
                    this.cache.push(b);
                    return b;
                case 106:
                    b = this.unserialize();
                    a = this.resolver.resolveEnum(b);
                    if (null == a) throw "Enum not found " + b;
                    this.pos++;
                    var c = this.readDigits(),
                        d = N.getEnumConstructs(a)[c];
                    if (null == d) throw "Unknown enum index " + b + "@" + c;
                    b = this.unserializeEnum(a, d);
                    this.cache.push(b);
                    return b;
                case 108:
                    b = new da;
                    for (this.cache.push(b); 104 != this.buf.charCodeAt(this.pos);) b.add(this.unserialize());
                    this.pos++;
                    return b;
                case 98:
                    c = new F;
                    for (this.cache.push(c); 104 != this.buf.charCodeAt(this.pos);) a = this.unserialize(), c.set(a, this.unserialize());
                    this.pos++;
                    return c;
                case 113:
                    c = new W;
                    this.cache.push(c);
                    for (b = this.buf.charCodeAt(this.pos++); 58 == b;) a = this.readDigits(), c.set(a, this.unserialize()), b = this.buf.charCodeAt(this.pos++);
                    if (104 != b) throw "Invalid IntHash format";
                    return c;
                case 118:
                    return b = A.strDate(A.substr(this.buf, this.pos, 19)), this.cache.push(b), this.pos += 19, b;
                case 115:
                    b = this.readDigits();
                    c =
                        this.buf;
                    if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < b) throw "Invalid bytes length";
                    d = Q.CODES;
                    null == d && (d = Q.initCodes(), Q.CODES = d);
                    for (var a = this.pos, f = b & 3, g = a + (b - f), h = V.Bytes.alloc(3 * (b >> 2) + (2 <= f ? f - 1 : 0)), i = 0; a < g;) {
                        var j = d[c.charCodeAt(a++)],
                            l = d[c.charCodeAt(a++)];
                        h.b[i++] = (j << 2 | l >> 4) & 255;
                        j = d[c.charCodeAt(a++)];
                        h.b[i++] = (l << 4 | j >> 2) & 255;
                        l = d[c.charCodeAt(a++)];
                        h.b[i++] = (j << 6 | l) & 255
                    }
                    2 <= f && (j = d[c.charCodeAt(a++)], l = d[c.charCodeAt(a++)], h.b[i++] = (j << 2 | l >> 4) & 255, 3 == f && (j = d[c.charCodeAt(a++)],
                        h.b[i++] = (l << 4 | j >> 2) & 255));
                    this.pos += b;
                    this.cache.push(h);
                    return h;
                case 67:
                    b = this.unserialize();
                    a = this.resolver.resolveClass(b);
                    if (null == a) throw "Class not found " + b;
                    b = N.createEmptyInstance(a);
                    this.cache.push(b);
                    b.hxUnserialize(this);
                    if (103 != this.buf.charCodeAt(this.pos++)) throw "Invalid custom data";
                    return b
            }
            this.pos--;
            throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
        },
        unserializeEnum: function(a, b) {
            if (58 != this.buf.charCodeAt(this.pos++)) throw "Invalid enum format";
            var c = this.readDigits();
            if (0 == c) return N.createEnum(a, b);
            for (var d = []; 0 < c--;) d.push(this.unserialize());
            return N.createEnum(a, b, d)
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >= this.length) throw "Invalid object";
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if (!G.__instanceof(b, String)) throw "Invalid object key";
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var d = this.buf.charCodeAt(this.pos);
                if (d != d) break;
                if (45 == d) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 >
                        d || 57 < d) break;
                    a = 10 * a + (d - 48)
                }
                this.pos++
            }
            b && (a *= -1);
            return a
        },
        setResolver: function(a) {
            this.resolver = null == a ? {
                resolveClass: function() {
                    return null
                },
                resolveEnum: function() {
                    return null
                }
            } : a
        },
        __class__: Q
    };
    V = {
        Bytes: function(a, b) {
            this.length = a;
            this.b = b
        }
    };
    k["haxe.io.Bytes"] = V.Bytes;
    V.Bytes.__name__ = ["haxe", "io", "Bytes"];
    V.Bytes.alloc = function(a) {
        for (var b = [], c = 0; c < a;) c++, b.push(0);
        return new V.Bytes(a, b)
    };
    V.Bytes.ofData = function(a) {
        return new V.Bytes(a.length, a)
    };
    V.Bytes.prototype = {
        __class__: V.Bytes
    };
    B = {
        _Fast: {}
    };
    B._Fast.NodeAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.NodeAccess"] = B._Fast.NodeAccess;
    B._Fast.NodeAccess.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
    B._Fast.NodeAccess.prototype = {
        resolve: function(a) {
            var b = this.__x.elementsNamed(a).next();
            if (null == b) throw (this.__x.nodeType == u.Document ? "Document" : this.__x.getNodeName()) + " is missing element " + a;
            return new B.Fast(b)
        },
        __class__: B._Fast.NodeAccess
    };
    B._Fast.AttribAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.AttribAccess"] = B._Fast.AttribAccess;
    B._Fast.AttribAccess.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
    B._Fast.AttribAccess.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == u.Document) throw "Cannot access document attribute " + a;
            var b = this.__x.get(a);
            if (null == b) throw this.__x.getNodeName() + " is missing attribute " + a;
            return b
        },
        __class__: B._Fast.AttribAccess
    };
    B._Fast.HasAttribAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.HasAttribAccess"] = B._Fast.HasAttribAccess;
    B._Fast.HasAttribAccess.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
    B._Fast.HasAttribAccess.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == u.Document) throw "Cannot access document attribute " + a;
            return this.__x.exists(a)
        },
        __class__: B._Fast.HasAttribAccess
    };
    B._Fast.HasNodeAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.HasNodeAccess"] = B._Fast.HasNodeAccess;
    B._Fast.HasNodeAccess.__name__ = ["haxe", "xml", "_Fast", "HasNodeAccess"];
    B._Fast.HasNodeAccess.prototype = {
        resolve: function(a) {
            return this.__x.elementsNamed(a).hasNext()
        },
        __class__: B._Fast.HasNodeAccess
    };
    B._Fast.NodeListAccess =
        function(a) {
            this.__x = a
        };
    k["haxe.xml._Fast.NodeListAccess"] = B._Fast.NodeListAccess;
    B._Fast.NodeListAccess.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
    B._Fast.NodeListAccess.prototype = {
        resolve: function(a) {
            for (var b = new da, a = this.__x.elementsNamed(a); a.hasNext();) {
                var c = a.next();
                b.add(new B.Fast(c))
            }
            return b
        },
        __class__: B._Fast.NodeListAccess
    };
    B.Fast = function(a) {
        if (a.nodeType != u.Document && a.nodeType != u.Element) throw "Invalid nodeType " + p.string(a.nodeType);
        this.x = a;
        this.node = new B._Fast.NodeAccess(a);
        this.nodes = new B._Fast.NodeListAccess(a);
        this.att = new B._Fast.AttribAccess(a);
        this.has = new B._Fast.HasAttribAccess(a);
        this.hasNode = new B._Fast.HasNodeAccess(a)
    };
    k["haxe.xml.Fast"] = B.Fast;
    B.Fast.__name__ = ["haxe", "xml", "Fast"];
    B.Fast.prototype = {
        getElements: function() {
            var a = this.x.elements();
            return {
                hasNext: s(a, a.hasNext),
                next: function() {
                    var b = a.next();
                    return null == b ? null : new B.Fast(b)
                }
            }
        },
        getInnerHTML: function() {
            for (var a = new Z, b = this.x.iterator(); b.hasNext();) {
                var c = b.next();
                a.b += p.string(c.toString())
            }
            return a.b
        },
        getInnerData: function() {
            var a = this.x.iterator();
            if (!a.hasNext()) throw this.getName() + " does not have data";
            var b = a.next(),
                c = a.next();
            if (null != c) {
                if (b.nodeType == u.PCData && c.nodeType == u.CData && "" == R.trim(b.getNodeValue()) && (b = a.next(), null == b || b.nodeType == u.PCData && "" == R.trim(b.getNodeValue()) && null == a.next())) return c.getNodeValue();
                throw this.getName() + " does not only have data";
            }
            if (b.nodeType != u.PCData && b.nodeType != u.CData) throw this.getName() + " does not have data";
            return b.getNodeValue()
        },
        getName: function() {
            return this.x.nodeType ==
                u.Document ? "Document" : this.x.getNodeName()
        },
        __class__: B.Fast,
        __properties__: {
            get_name: "getName",
            get_innerData: "getInnerData"
        }
    };
    B.Parser = function() {};
    k["haxe.xml.Parser"] = B.Parser;
    B.Parser.__name__ = ["haxe", "xml", "Parser"];
    B.Parser.parse = function(a) {
        var b = u.createDocument();
        B.Parser.doParse(a, 0, b);
        return b
    };
    B.Parser.doParse = function(a, b, c) {
        null == b && (b = 0);
        for (var d = null, f = 1, g = 1, h = null, i = 0, j = 0, l = 0, k = a.charCodeAt(b); k == k;) {
            switch (f) {
                case 0:
                    switch (k) {
                        case 10:
                        case 13:
                        case 9:
                        case 32:
                            break;
                        default:
                            f = g;
                            continue
                    }
                    break;
                case 1:
                    switch (k) {
                        case 60:
                            f = 0;
                            g = 2;
                            break;
                        default:
                            i = b;
                            f = 13;
                            continue
                    }
                    break;
                case 13:
                    60 == k && (f = u.createPCData(A.substr(a, i, b - i)), c.addChild(f), j++, f = 0, g = 2);
                    break;
                case 17:
                    93 == k && 93 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (f = u.createCData(A.substr(a, i, b - i)), c.addChild(f), j++, b += 2, f = 1);
                    break;
                case 2:
                    switch (k) {
                        case 33:
                            if (91 == a.charCodeAt(b + 1)) {
                                b += 2;
                                if ("CDATA[" != A.substr(a, b, 6).toUpperCase()) throw "Expected <![CDATA[";
                                b += 5;
                                f = 17
                            } else if (68 == a.charCodeAt(b + 1) || 100 == a.charCodeAt(b + 1)) {
                                if ("OCTYPE" != A.substr(a,
                                        b + 2, 6).toUpperCase()) throw "Expected <!DOCTYPE";
                                b += 8;
                                f = 16
                            } else {
                                if (45 != a.charCodeAt(b + 1) || 45 != a.charCodeAt(b + 2)) throw "Expected <\!--";
                                b += 2;
                                f = 15
                            }
                            i = b + 1;
                            break;
                        case 63:
                            f = 14;
                            i = b;
                            break;
                        case 47:
                            if (null == c) throw "Expected node name";
                            i = b + 1;
                            f = 0;
                            g = 10;
                            break;
                        default:
                            f = 3;
                            i = b;
                            continue
                    }
                    break;
                case 3:
                    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
                        if (b == i) throw "Expected node name";
                        d = u.createElement(A.substr(a, i, b - i));
                        c.addChild(d);
                        f = 0;
                        g = 4;
                        continue
                    }
                    break;
                case 4:
                    switch (k) {
                        case 47:
                            f = 11;
                            j++;
                            break;
                        case 62:
                            f = 9;
                            j++;
                            break;
                        default:
                            f = 5;
                            i = b;
                            continue
                    }
                    break;
                case 5:
                    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
                        if (i == b) throw "Expected attribute name";
                        h = A.substr(a, i, b - i);
                        if (d.exists(h)) throw "Duplicate attribute";
                        f = 0;
                        g = 6;
                        continue
                    }
                    break;
                case 6:
                    switch (k) {
                        case 61:
                            f = 0;
                            g = 7;
                            break;
                        default:
                            throw "Expected =";
                    }
                    break;
                case 7:
                    switch (k) {
                        case 34:
                        case 39:
                            f = 8;
                            i = b;
                            break;
                        default:
                            throw 'Expected "';
                    }
                    break;
                case 8:
                    k == a.charCodeAt(i) && (g = A.substr(a, i + 1, b - i - 1), d.set(h, g), f = 0, g = 4);
                    break;
                case 9:
                    i = b =
                        B.Parser.doParse(a, b, d);
                    f = 1;
                    break;
                case 11:
                    switch (k) {
                        case 62:
                            f = 1;
                            break;
                        default:
                            throw "Expected >";
                    }
                    break;
                case 12:
                    switch (k) {
                        case 62:
                            return 0 == j && c.addChild(u.createPCData("")), b;
                        default:
                            throw "Expected >";
                    }
                case 10:
                    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
                        if (i == b) throw "Expected node name";
                        if (A.substr(a, i, b - i) != c.getNodeName()) throw "Expected </" + c.getNodeName() + ">";
                        f = 0;
                        g = 12;
                        continue
                    }
                    break;
                case 15:
                    45 == k && 45 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (c.addChild(u.createComment(A.substr(a,
                        i, b - i))), b += 2, f = 1);
                    break;
                case 16:
                    91 == k ? l++ : 93 == k ? l-- : 62 == k && 0 == l && (c.addChild(u.createDocType(A.substr(a, i, b - i))), f = 1);
                    break;
                case 14:
                    63 == k && 62 == a.charCodeAt(b + 1) && (b++, f = A.substr(a, i + 1, b - i - 2), c.addChild(u.createProlog(f)), f = 1)
            }
            k = a.charCodeAt(++b)
        }
        1 == f && (i = b, f = 13);
        if (13 == f) return (b != i || 0 == j) && c.addChild(u.createPCData(A.substr(a, i, b - i))), b;
        throw "Unexpected end";
    };
    Array.prototype.indexOf ? A.remove = function(a, b) {
        var c = a.indexOf(b);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    } : null;
    Math.__name__ = ["Math"];
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    k.Math = Math;
    Math.isFinite = function(a) {
        return isFinite(a)
    };
    Math.isNaN = function(a) {
        return isNaN(a)
    };
    String.prototype.__class__ = k.String = String;
    String.__name__ = ["String"];
    Array.prototype.__class__ = k.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = k.Date = Date;
    Date.__name__ = ["Date"];
    var ha = k.Int = {
            __name__: ["Int"]
        },
        ia = k.Dynamic = {
            __name__: ["Dynamic"]
        },
        fa = k.Float = Number;
    fa.__name__ = ["Float"];
    var ga = k.Bool = Boolean;
    ga.__ename__ = ["Bool"];
    var ja = k.Class = {
            __name__: ["Class"]
        },
        ka = {};
    u.Element = "element";
    u.PCData = "pcdata";
    u.CData = "cdata";
    u.Comment = "comment";
    u.DocType = "doctype";
    u.Prolog = "prolog";
    u.Document = "document";
    "undefined" != typeof document && (v.document = document);
    "undefined" != typeof window && (v.window = window, v.window.onerror = function(a, b, c) {
        var d = v.onerror;
        return null == d ? !1 : d(a, [b + ":" + c])
    });
    "undefined" != typeof JSON && (Y = JSON);
    c.ConstantsApp.OPTION_SILENCE_AUDIO = !1;
    c.ConstantsApp.OPTION_SHOW_COLLISION_BOX = !1;
    c.ConstantsApp.LOAD_FONT_EARLY = !0;
    c.ConstantsApp.STAGE_WIDTH = 960;
    c.ConstantsApp.STAGE_HEIGHT = 560;
    c.ConstantsApp.STAGE_CENTER_X = 480;
    c.ConstantsApp.STAGE_CENTER_Y = 280;
    c.ConstantsApp.CAMERA_TETHER_X = 300;
    c.ConstantsApp.PLAYER_MAX_HEALTH = 40;
    c.ConstantsApp.PLAYER_MAX_STAMINA = 100;
    c.ConstantsApp.PLAYER_NUMBER_OF_MAX_ATTACKS = 4;
    c.ConstantsApp.PLAYER_ATTACK_CHARGER_SPEED = 20;
    c.ConstantsApp.GROUND_LEVEL = 500;
    c.ConstantsApp._DEFAULT_DIFFICULTY = 2;
    c.ConstantsApp.LAYER_BG = "layer_bg";
    c.ConstantsApp.LAYER_ENEMY_BACK =
        "layer_enemy_back";
    c.ConstantsApp.LAYER_PLAYER = "layer_player";
    c.ConstantsApp.LAYER_ENEMY_FRONT = "layer_enemy_front";
    c.ConstantsApp.LAYER_FG = "layer_fg";
    c.ConstantsApp.TYPE_PLAYER = "type_player";
    c.ConstantsApp.TYPE_ENEMY = "type_enemy";
    c.ConstantsApp.TYPE_PARTICLE = "type_particle";
    c.ConstantsApp.TYPE_EASTER_EGG_BUSH = "type_easter_egg_bush";
    c.ConstantsApp.TYPE_EASTER_EGG_CRAYON = "type_easter_egg_crayon";
    c.ConstantsApp.ENEMY_JELLY = "jelly";
    c.ConstantsApp.ENEMY_SEA_BEAR = "sea_bear";
    c.ConstantsApp.ENEMY_SEA_RHINO =
        "sea_rhino";
    c.ConstantsApp.ENEMY_QUEEN_JELLY = "queen_jelly";
    c.ConstantsApp.PARTICLE_POOF = "poof";
    c.ConstantsApp.PARTICLE_TRAIL = "particle_slash";
    c.ConstantsApp.PARTICLE_CARDBOARD = "particle_cardboard_0";
    c.ConstantsApp.EVENT_PAUSE = "eventPause";
    c.ConstantsApp.EVENT_UNPAUSE = "eventUnpause";
    c.ConstantsApp.EVENT_MUTE_TOGGLE = "EVENT_MUTE_TOGGLE";
    c.ConstantsApp.EVENT_WORLD_GENERATION_COMPLETE = "EVENT_WORLD_GENERATION_COMPLETE";
    c.ConstantsApp.EVENT_MARK_ENDED = "EVENT_MARK_ENDED";
    c.ConstantsApp.EVENT_CHECK_COLLISIONS =
        "EVENT_CHECK_COLLISIONS";
    c.ConstantsApp.EVENT_ATTACK_SB = "EVENT_ATTACK_SB";
    c.ConstantsApp.EVENT_SPAWN_SWOOSH_EFFECT = "EVENT_SPAWN_SWOOSH_EFFECT";
    c.ConstantsApp.EVENT_SPAWN_HIT_EFFECT = "EVENT_SPAWN_HIT_EFFECT";
    c.ConstantsApp.EVENT_BATTLE_COMMENCE = "EVENT_BATTLE_COMMENCE";
    c.ConstantsApp.EVENT_DISPLAY_GO = "EVENT_DISPLAY_GO";
    c.ConstantsApp.EVENT_SPAWN_PARTICLE = "EVENT_SPAWN_PARTICLE";
    c.ConstantsApp.EVENT_SPAWN_ENEMY = "EVENT_SPAWN_ENEMY";
    c.ConstantsApp.EVENT_EARLY_DEATH = "EVENT_EARLY_DEATH";
    c.ConstantsApp.EVENT_SPAWN_BABY_JELLY =
        "EVENT_SPAWN_BABY_JELLY";
    c.ConstantsApp.EVENT_BABY_JELLY_DIED = "EVENT_BABY_JELLY_DIED";
    c.ConstantsApp.EVENT_BOSS_DEAD = "EVENT_BOSS_DEAD";
    c.ConstantsApp.EVENT_SCREEN_TRANSITION_COMPLETED = "EVENT_SCREEN_TRANSITION_COMPLETED";
    c.ConstantsApp.EVENT_SPAWN_POP_UP = "EVENT_SPAWN_POP_UP";
    c.ConstantsApp.EVENT_SPAWN_EASTER_EGG = "EVENT_SPAWN_EASTER_EGG";
    c.ConstantsApp.EVENT_ACTIVATE_EASTER_EGG = "EVENT_ACTIVATE_EASTER_EGG";
    c.ConstantsApp.EVENT_SHOW_QUEEN_HEALTH = "EVENT_SHOW_QUEEN_HEALTH";
    c.ConstantsApp.EVENT_HIDE_QUEEN_HEALTH =
        "EVENT_HIDE_QUEEN_HEALTH";
    c.ConstantsApp.BOOL_WIN = "bool_win";
    c.ConstantsApp.BOOL_GAME_LOSE = "bool_game_lose";
    c.ConstantsApp.BOOL_GAME_WIN = "bool_game_win";
    c.ConstantsApp.BOOL_LEVEL_LOSE = "bool_level_lose";
    c.ConstantsApp.BOOL_LEVEL_WIN = "bool_level_win";
    c.ConstantsApp.BOOL_GAMEOVER = "bool_gameover";
    c.ConstantsApp.BOOL_PAUSED = "bool_paused";
    c.ConstantsApp.BOOL_INPUT_LOCK = "bool_inputlock";
    c.ConstantsApp.BOOL_TOUCH_DEVICE = "bool_touch_device";
    c.ConstantsApp.BOOL_ORIENTATION_ALERT = "bool_orientation_alert";
    c.ConstantsApp.BOOL_FIRST_LOAD =
        "bool_first_load";
    c.ConstantsApp.BOOL_HELP_FIRST_TIME = "bool_help_first_time";
    c.ConstantsApp.INT_HEALTH = "int_health";
    c.ConstantsApp.FLOAT_STAMINA = "float_stamina";
    c.ConstantsApp.INT_COMBO = "int_combo";
    c.ConstantsApp.INT_LEVEL = "int_level";
    c.ConstantsApp.INT_LIVES = "int_lives";
    c.ConstantsApp.INT_SCORE = "int_score";
    c.ConstantsApp.INT_LOADING_PROGRESS = "int_loading_progress";
    c.ConstantsApp.INPUT_CLICK = "input_click";
    c.ConstantsApp.INPUT_SPACE = "input_space";
    c.ConstantsApp.INPUT_Z = "input_z";
    c.ConstantsApp.INPUT_X =
        "input_x";
    c.ConstantsApp.INPUT_C = "input_c";
    c.ConstantsApp.INPUT_P = "input_p";
    c.ConstantsApp.INPUT_UP = "input_up";
    c.ConstantsApp.INPUT_DOWN = "input_down";
    c.ConstantsApp.INPUT_LEFT = "input_left";
    c.ConstantsApp.INPUT_RIGHT = "input_right";
    c.ConstantsApp.CONFIG_XML_PATH = "config/config.xml";
    c.ConstantsApp.scaleFactor = 1;
    c.ConstantsApp.INT_QUEEN_HEALTH = "int_queen_health";
    c.ConstantsApp.QUEEN_MAX_HEALTH = "QUEEN_MAX_HEALTH";
    c.ConstantsApp._difficulty = c.ConstantsApp._DEFAULT_DIFFICULTY;
    c.ConstantsScreen.SCREEN_LOADING =
        "loadpanel";
    c.ConstantsScreen.SCREEN_LOADING_OVERLAY = "loadoverlay";
    c.ConstantsScreen.SCREEN_SPLASH = "splash";
    c.ConstantsScreen.SCREEN_HELP = "help";
    c.ConstantsScreen.SCREEN_GAMEPLAY_HUD = "gameplayhud";
    c.ConstantsScreen.SCREEN_GAMEPLAY_MENU = "gameplaymenu";
    c.ConstantsScreen.SCREEN_QUIT_CONFIRM = "quitconfirm";
    c.ConstantsScreen.SCREEN_END_GAME = "endgame";
    c.ConstantsScreen.SCREEN_CUTSCENE_BORDERS = "cutsceneborders";
    c.ConstantsScreen.SCREEN_PAUSE_ALERT = "pause";
    c.ConstantsScreen.SCREEN_TUTORIAL = "tutorial";
    c.ConstantsScreen.TRANSITION_FADE =
        0;
    c.ConstantsScreen.TRANSITION_SCROLL = 1;
    c.ConstantsScreen.TRANSITION_SCROLL_DOWN = 2;
    c.ConstantsScreen.TRANSITION_SCROLL_UP = 3;
    c.ConstantsScreen.TRANSITION_STAGED = 4;
    c.ConstantsScreen.TRANSITION_SCREENSHOT = 5;
    c.ConstantsScreen.CHANGE_OPEN_BEGIN = 0;
    c.ConstantsScreen.CHANGE_OPEN_COMPLETE = 1;
    c.ConstantsScreen.CHANGE_CLOSE_BEGIN = 2;
    c.ConstantsScreen.CHANGE_CLOSE_COMPLETE = 3;
    c.ConstantsScreen.OUTPUT_OPENED = 0;
    c.ConstantsScreen.OUTPUT_CLOSED = 1;
    c.ConstantsScreen.CONDITION_CLOSED_ALL = 0;
    c.ConstantsScreen.CONDITION_CLOSED_SPECIFIC =
        1;
    c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY = 2;
    c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE = 3;
    c.ConstantsScreen.CONDITION_IMMEDIATE = 4;
    c.ConstantsScreen.FLOW_SPLASH_PLAY = "FLOW_SPLASH_PLAY";
    c.ConstantsScreen.FLOW_HELP_CLOSE = "FLOW_HELP_CLOSE";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU = "FLOW_GAMEPLAY_MENU";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE = "FLOW_GAMEPLAY_MENU_CLOSE";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP = "FLOW_GAMEPLAY_MENU_HELP";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT = "FLOW_GAMEPLAY_MENU_QUIT";
    c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES = "FLOW_GAMEPLAY_QUIT_YES";
    c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO = "FLOW_GAMEPLAY_QUIT_NO";
    c.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN = "FLOW_END_GAME_PLAY_AGAIN";
    c.ConstantsScreen.FLOW_BRANCH_GAME_WIN = "FLOW_BRANCH_GAME_WIN";
    c.ConstantsScreen.FLOW_BRANCH_GAME_LOSE = "FLOW_BRANCH_GAME_LOSE";
    c.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN = "FLOW_BRANCH_LEVEL_WIN";
    c.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE = "FLOW_BRANCH_LEVEL_LOSE";
    c.ConstantsScreen.FLOW_START_OVER = "FLOW_START_OVER";
    c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_OPEN = "FLOW_GAMEPLAY_TUTORIAL_OPEN";
    c.ConstantsScreen.FLOW_GAMEPLAY_TUTORIAL_CLOSE = "FLOW_GAMEPLAY_TUTORIAL_CLOSE";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME = "FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME_CLOSE = "FLOW_GAMEPLAY_MENU_HELP_FIRST_TIME_CLOSE";
    j.buttons.ButtonBase.UP = "workinBtnUp";
    j.buttons.ButtonBase.DOWN = "workinBtnDown";
    j.buttons.ButtonBase.CLICK = "workinBtnClick";
    j.buttons.ButtonBase.CANCEL_DRAG =
        "workinBtnCancelDrag";
    i.Display.EVENT_UPDATE_DISPLAY = "event_update_display";
    j.screens.data.ScreenStateData.ACTION_STOP = 0;
    j.screens.data.ScreenStateData.ACTION_OPENED = 1;
    j.screens.data.ScreenStateData.ACTION_EVENT = 2;
    j.screens.data.ScreenStateData.ACTION_NEW_STATE = 3;
    j.screens.data.ScreenStateData.ACTION_CLOSED = 4;
    j.screens.data.ScreenStateData.ACTION_FLOW = 5;
    o.Sprite._scratchPoint = new I.Point;
    C.ConstantsCloud.FONT_DEFAULT = "Basic";
    C.ConstantsCloud.STRING_REGION_ID = "cloudregionid";
    C.ConstantsCloud.LOCALIZATION_XML_PATH =
        "config/";
    C.ConstantsCloud.EVENT_FILES_LOADED = "EVENT_WORKINCLOUD_FILES_LOADED";
    C.ConstantsCloud.EVENT_FILES_LOADING = "EVENT_FILES_LOADING";
    C.ConstantsCloud.EVENT_FILES_ERROR = "EVENT_FILES_ERROR";
    C.ConstantsCloud.EVENT_TWEENS_COMPLETE = "EVENT_TWEENS_COMPLETE";
    C.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY = "EVENT_INPUT_ARBITRARY_KEY";
    C.ConstantsCloud._uniqueId = 0;
    i.PoolManager.ALL_POOLS_FULL = "PoolManager_ALL_POOLS_FULL";
    m.WMEventFlow.EVENT_FLOW = "Nflow";
    m.WMEventInput.EVENT_INPUT = "eventinput";
    m.WMEventInput.PHASE_DOWN =
        1;
    m.WMEventInput.PHASE_UP = 0;
    m.WMEventInput.PHASE_MOVE = 2;
    m.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT = "Neio";
    m.WMEventScreenOut.EVENT_SCREEN_OUTPUT = "Neso";
    m.WMEventUpdate.EVENT_UPDATE = "eventupdate";
    g.tween.PennerManager.EASE_LINEAR = "linear";
    g.tween.PennerManager.EASE = "ease";
    g.tween.PennerManager.EASE_QUAD = "quad";
    g.tween.PennerManager.EASE_IN = "easeIn";
    g.tween.PennerManager.EASE_QUAD_IN = "quadIn";
    g.tween.PennerManager.EASE_OUT = "easeOut";
    g.tween.PennerManager.EASE_QUAD_OUT = "quadOut";
    g.tween.PennerManager.EASE_EXPO =
        "expo";
    g.tween.PennerManager.EASE_EXPO_IN = "expoIn";
    g.tween.PennerManager.EASE_EXPO_OUT = "expoOut";
    g.tween.PennerManager.EASE_ELASTIC = "elastic";
    g.tween.PennerManager.EASE_ELASTIC_IN = "elasticIn";
    g.tween.PennerManager.EASE_ELASTIC_OUT = "elasticOut";
    g.tween.PennerManager.EASE_BUMP = "bump";
    g.tween.PennerManager.EASE_BUMP_IN = "bumpIn";
    g.tween.PennerManager.EASE_BUMP_OUT = "bumpOut";
    g.tween.PennerManager.EASE_BOUNCE = "bounce";
    g.tween.PennerManager.EASE_BOUNCE_IN = "bounceIn";
    g.tween.PennerManager.EASE_BOUNCE_OUT =
        "bounceOut";
    g.tween.PennerManager.EASE_CUBIC = "cubic";
    g.tween.PennerManager.EASE_CUBIC_IN = "cubicIn";
    g.tween.PennerManager.EASE_CUBIC_OUT = "cubicOut";
    g.tween.PennerManager.EASE_SPACE = "space";
    g.tween.PennerManager.EASE_SPACE_IN = "spaceIn";
    g.tween.PennerManager.EASE_SPACE_OUT = "spaceOut";
    g.tween.PennerManager.EASE_BLAST = "blast";
    g.tween.PennerManager.EASE_BLAST_IN = "blastIn";
    g.tween.PennerManager.EASE_BLAST_OUT = "blastOut";
    g.tween.PennerManager.EASE_WAVE = "wave";
    g.tween.PennerManager.EASE_WAVE_IN = "waveIn";
    g.tween.PennerManager.EASE_WAVE_OUT =
        "waveOut";
    g.tween.PennerManager.EASE_CIRCLE = "circle";
    g.tween.PennerManager.EASE_CIRCLE_IN = "circleIn";
    g.tween.PennerManager.EASE_CIRCLE_OUT = "circleOut";
    g.tween.WorkinTween.EVENT_TWEEN_CURRENT_COMPLETE = "wtETCC";
    g.tween.WorkinTween.EVENT_TWEENS_ALL_COMPLETE = "wtETAC";
    q.ServiceAnalytics._offlineUserId = "";
    q.ServiceAnalytics._offlineTrackingId = "";
    q.ServiceAnalytics._appId = "";
    q.ServiceAnalytics._sessionId = "";
    q.ServiceAnalytics._canadaShowGameTitle = "";
    q.ServiceAnalytics._flagInitted = !1;
    q.ServiceAnalytics._flagStarted = !1;
    q.ServiceAnalytics._flagLoaded = !1;
    q.ServiceAnalytics._flagCanadaTrackingEnabled = !1;
    q.ServiceAnalytics._DEFAULT_SHARED_OBJECT_ID = "nkcimocuresid";
    q.ServiceAnalytics.OPTION_ENABLE_TRACKING = !0;
    f.WMPointer._DELTA_ALLOWANCE = 30;
    f.WMPointer._DELTA_TIMEOUT = 0.2;
    f.WMSound.FADE_NONE = 0;
    f.WMSound.FADE_IN = 1;
    f.WMSound.FADE_OUT = -1;
    f.WorkinCloud.instance = new f.WorkinCloud;
    h.html.HtmlPlatform.instance = new h.html.HtmlPlatform;
    n.SignalBase.DISPATCHING_SENTINEL = new n.SignalConnection(null, null);
    y.root = new M;
    y.uncaughtError =
        new n.Signal1;
    y.hidden = new n.Value(!1);
    y.hasGPU = new n.Value(!1);
    y.volume = new E.AnimatedFloat(1);
    y._platform = h.html.HtmlPlatform.instance;
    y._calledInit = !1;
    K.logger = new n.Logger(y._platform.createLogHandler("flambe"));
    z.Manifest._buildManifest = z.Manifest.createBuildManifests();
    P = z.Manifest;
    x = (new X("\\b(Android)\\b", "")).match(v.window.navigator.userAgent) ? !1 : null != (new XMLHttpRequest).withCredentials;
    P._supportsCrossOrigin = x;
    h.BasicKeyboard._sharedEvent = new d.KeyboardEvent;
    h.BasicMouse._sharedEvent =
        new d.MouseEvent;
    h.BasicPointer._sharedEvent = new d.PointerEvent;
    h.html.CanvasRenderer.CANVAS_TEXTURES = (new X("(iPhone|iPod|iPad)", "")).match(v.window.navigator.userAgent);
    h.html.HtmlAssetPackLoader._mediaRefCount = 0;
    h.html.HtmlAssetPackLoader._detectBlobSupport = !0;
    h.html.HtmlUtil.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
    h.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = v.window.top == v.window && (new X("Mobile(/.*)? Safari", "")).match(v.window.navigator.userAgent);
    h.html.WebAudioSound._detectSupport = !0;
    T.USE_CACHE = !1;
    T.USE_ENUM_INDEX = !1;
    T.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    Q.DEFAULT_RESOLVER = N;
    Q.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    J.main()
})();