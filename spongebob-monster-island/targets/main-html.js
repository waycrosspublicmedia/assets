/**
 * Cooked with Flambe
 * https://github.com/aduros/flambe
 */
'use strict';
(function() {
    var I, c, ca, h, j, e, y, r, n, g, $, l, S, D, T, Q, U, V, Y, M, x, A, N, p, i, f, J, o, P, w, C, H, K, F, z, aa;

    function t(a, b) {
        function d() {}
        d.prototype = a;
        var m = new d,
            c;
        for (c in b) m[c] = b[c];
        return m
    }

    function ea(a) {
        return a instanceof Array ? function() {
            return B.iter(a)
        } : "function" == typeof a.iterator ? u(a, a.iterator) : a.iterator
    }

    function u(a, b) {
        var d = function() {
            return d.method.apply(d.scope, arguments)
        };
        d.scope = a;
        d.method = b;
        return d
    }
    var k = {},
        q = function() {
            return M.__string_rec(this, "")
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
    var G = function() {
        this.h = {}
    };
    k.Hash = G;
    G.__name__ = ["Hash"];
    G.prototype = {
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
            return B.iter(a)
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
        __class__: G
    };
    var B = function() {};
    k.HxOverrides = B;
    B.__name__ = ["HxOverrides"];
    B.dateStr = function(a) {
        var b = a.getMonth() + 1,
            d = a.getDate(),
            m = a.getHours(),
            c = a.getMinutes(),
            e = a.getSeconds();
        return a.getFullYear() + "-" + (10 > b ? "0" + b : "" + b) + "-" + (10 > d ? "0" + d : "" + d) + " " + (10 > m ? "0" + m : "" + m) + ":" + (10 > c ? "0" + c : "" + c) + ":" + (10 > e ? "0" + e : "" + e)
    };
    B.strDate = function(a) {
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
    B.cca = function(a, b) {
        var d = a.charCodeAt(b);
        return d != d ? void 0 : d
    };
    B.substr = function(a, b, d) {
        if (null != b && 0 != b && null != d && 0 > d) return "";
        null == d && (d = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > d && (d = a.length + d - b);
        return a.substr(b, d)
    };
    B.remove = function(a, b) {
        for (var d = 0, m = a.length; d < m;) {
            if (a[d] == b) return a.splice(d, 1), !0;
            d++
        }
        return !1
    };
    B.iter = function(a) {
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
            return B.iter(a)
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
            var d = a.next();
            b.push(d)
        }
        return b
    };
    ba.has = function(a, b, d) {
        if (null == d)
            for (d = ea(a)(); d.hasNext();) {
                if (a = d.next(), a == b) return !0
            } else
                for (var m = ea(a)(); m.hasNext();)
                    if (a = m.next(), d(a, b)) return !0;
        return !1
    };
    ba.count = function(a, b) {
        var d = 0;
        if (null == b)
            for (var m = ea(a)(); m.hasNext();) m.next(), d++;
        else
            for (m = ea(a)(); m.hasNext();) {
                var c = m.next();
                b(c) && d++
            }
        return d
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
        var d = null;
        try {
            d = a[b]
        } catch (m) {}
        return d
    };
    L.setProperty = function(a, b, d) {
        var m;
        if (a.__properties__ && (m = a.__properties__["set_" + b])) a[m](d);
        else a[b] = d
    };
    L.fields = function(a) {
        var b = [];
        if (null != a) {
            var d = Object.prototype.hasOwnProperty,
                m;
            for (m in a) d.call(a, m) && b.push(m)
        }
        return b
    };
    L.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    L.compareMethods = function(a, b) {
        return a == b ? !0 : !L.isFunction(a) || !L.isFunction(b) ? !1 : a.scope == b.scope && a.method == b.method && null != a.method
    };
    var s = function() {};
    k.Std = s;
    s.__name__ = ["Std"];
    s.string = function(a) {
        return M.__string_rec(a, "")
    };
    s.parseInt = function(a) {
        var b = parseInt(a, 10);
        if (0 == b && (120 == B.cca(a, 1) || 88 == B.cca(a, 1))) b = parseInt(a);
        return isNaN(b) ? null : b
    };
    s.parseFloat = function(a) {
        return parseFloat(a)
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
        return a.length >= b.length && B.substr(a, 0, b.length) == b
    };
    R.isSpace = function(a, b) {
        var d = B.cca(a, b);
        return 9 <= d && 13 >= d || 32 == d
    };
    R.ltrim = function(a) {
        for (var b = a.length, d = 0; d < b && R.isSpace(a, d);) d++;
        return 0 < d ? B.substr(a, d, b - d) : a
    };
    R.rtrim = function(a) {
        for (var b = a.length, d = 0; d < b && R.isSpace(a, b - d - 1);) d++;
        return 0 < d ? B.substr(a, 0, b - d) : a
    };
    R.trim = function(a) {
        return R.ltrim(R.rtrim(a))
    };
    R.replace = function(a, b, d) {
        return a.split(b).join(d)
    };
    var E = k.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
    };
    E.TNull = ["TNull", 0];
    E.TNull.toString = q;
    E.TNull.__enum__ = E;
    E.TInt = ["TInt", 1];
    E.TInt.toString = q;
    E.TInt.__enum__ = E;
    E.TFloat = ["TFloat",
        2
    ];
    E.TFloat.toString = q;
    E.TFloat.__enum__ = E;
    E.TBool = ["TBool", 3];
    E.TBool.toString = q;
    E.TBool.__enum__ = E;
    E.TObject = ["TObject", 4];
    E.TObject.toString = q;
    E.TObject.__enum__ = E;
    E.TFunction = ["TFunction", 5];
    E.TFunction.toString = q;
    E.TFunction.__enum__ = E;
    E.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = E;
        a.toString = q;
        return a
    };
    E.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = E;
        a.toString = q;
        return a
    };
    E.TUnknown = ["TUnknown", 8];
    E.TUnknown.toString = q;
    E.TUnknown.__enum__ = E;
    var O = function() {};
    k.Type = O;
    O.__name__ = ["Type"];
    O.getClassName = function(a) {
        return a.__name__.join(".")
    };
    O.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    O.resolveClass = function(a) {
        a = k[a];
        return null == a || !a.__name__ ? null : a
    };
    O.resolveEnum = function(a) {
        a = k[a];
        return null == a || !a.__ename__ ? null : a
    };
    O.createInstance = function(a, b) {
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
                return new a(b[0], b[1], b[2], b[3], b[4]);
            case 6:
                return new a(b[0],
                    b[1], b[2], b[3], b[4], b[5]);
            case 7:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
            case 8:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
            default:
                throw "Too many arguments";
        }
    };
    O.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    O.createEnum = function(a, b, d) {
        var m = L.field(a, b);
        if (null == m) throw "No such constructor " + b;
        if (L.isFunction(m)) {
            if (null == d) throw "Constructor " + b + " need parameters";
            return m.apply(a, d)
        }
        if (null != d && 0 != d.length) throw "Constructor " + b + " does not need parameters";
        return m
    };
    O.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    O["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return E.TBool;
            case "string":
                return E.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? E.TInt : E.TFloat;
            case "object":
                if (null == a) return E.TNull;
                var b = a.__enum__;
                if (null != b) return E.TEnum(b);
                a = a.__class__;
                return null != a ? E.TClass(a) : E.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? E.TObject : E.TFunction;
            case "undefined":
                return E.TNull;
            default:
                return E.TUnknown
        }
    };
    var v = function() {};
    k.Xml = v;
    v.__name__ = ["Xml"];
    v.parse = function(a) {
        return D.Parser.parse(a)
    };
    v.createElement = function(a) {
        var b = new v;
        b.nodeType = v.Element;
        b._children = [];
        b._attributes = new G;
        b.setNodeName(a);
        return b
    };
    v.createPCData = function(a) {
        var b = new v;
        b.nodeType = v.PCData;
        b.setNodeValue(a);
        return b
    };
    v.createCData = function(a) {
        var b = new v;
        b.nodeType = v.CData;
        b.setNodeValue(a);
        return b
    };
    v.createComment = function(a) {
        var b = new v;
        b.nodeType = v.Comment;
        b.setNodeValue(a);
        return b
    };
    v.createDocType = function(a) {
        var b =
            new v;
        b.nodeType = v.DocType;
        b.setNodeValue(a);
        return b
    };
    v.createProlog = function(a) {
        var b = new v;
        b.nodeType = v.Prolog;
        b.setNodeValue(a);
        return b
    };
    v.createDocument = function() {
        var a = new v;
        a.nodeType = v.Document;
        a._children = [];
        return a
    };
    v.prototype = {
        toString: function() {
            if (this.nodeType == v.PCData) return this._nodeValue;
            if (this.nodeType == v.CData) return "<![CDATA[" + this._nodeValue + "]]\>";
            if (this.nodeType == v.Comment) return "<\!--" + this._nodeValue + "--\>";
            if (this.nodeType == v.DocType) return "<!DOCTYPE " + this._nodeValue +
                ">";
            if (this.nodeType == v.Prolog) return "<?" + this._nodeValue + "?>";
            var a = new Z;
            if (this.nodeType == v.Element) {
                a.b += s.string("<");
                a.b += s.string(this._nodeName);
                for (var b = this._attributes.keys(); b.hasNext();) {
                    var d = b.next();
                    a.b += s.string(" ");
                    a.b += s.string(d);
                    a.b += s.string('="');
                    a.b += s.string(this._attributes.get(d));
                    a.b += s.string('"')
                }
                if (0 == this._children.length) return a.b += s.string("/>"), a.b;
                a.b += s.string(">")
            }
            for (b = this.iterator(); b.hasNext();) d = b.next(), a.b += s.string(d.toString());
            this.nodeType == v.Element &&
                (a.b += s.string("</"), a.b += s.string(this._nodeName), a.b += s.string(">"));
            return a.b
        },
        addChild: function(a) {
            if (null == this._children) throw "bad nodetype";
            null != a._parent && B.remove(a._parent._children, a);
            a._parent = this;
            this._children.push(a)
        },
        firstElement: function() {
            if (null == this._children) throw "bad nodetype";
            for (var a = 0, b = this._children.length; a < b;) {
                var d = this._children[a];
                if (d.nodeType == v.Element) return d;
                a++
            }
            return null
        },
        elementsNamed: function(a) {
            if (null == this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    for (var b = this.cur, d = this.x.length; b < d;) {
                        var m = this.x[b];
                        if (m.nodeType == v.Element && m._nodeName == a) break;
                        b++
                    }
                    this.cur = b;
                    return b < d
                },
                next: function() {
                    for (var b = this.cur, d = this.x.length; b < d;) {
                        var m = this.x[b];
                        b++;
                        if (m.nodeType == v.Element && m._nodeName == a) return this.cur = b, m
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
                    for (var a = this.cur, b = this.x.length; a < b && !(this.x[a].nodeType == v.Element);) a +=
                        1;
                    this.cur = a;
                    return a < b
                },
                next: function() {
                    for (var a = this.cur, b = this.x.length; a < b;) {
                        var d = this.x[a],
                            a = a + 1;
                        if (d.nodeType == v.Element) return this.cur = a, d
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
            if (this.nodeType != v.Element) throw "bad nodeType";
            return this._attributes.exists(a)
        },
        set: function(a, b) {
            if (this.nodeType != v.Element) throw "bad nodeType";
            this._attributes.set(a, b)
        },
        get: function(a) {
            if (this.nodeType != v.Element) throw "bad nodeType";
            return this._attributes.get(a)
        },
        getParent: function() {
            return this._parent
        },
        setNodeValue: function(a) {
            if (this.nodeType == v.Element || this.nodeType == v.Document) throw "bad nodeType";
            return this._nodeValue = a
        },
        getNodeValue: function() {
            if (this.nodeType == v.Element || this.nodeType == v.Document) throw "bad nodeType";
            return this._nodeValue
        },
        setNodeName: function(a) {
            if (this.nodeType != v.Element) throw "bad nodeType";
            return this._nodeName =
                a
        },
        getNodeName: function() {
            if (this.nodeType != v.Element) throw "bad nodeType";
            return this._nodeName
        },
        __class__: v,
        __properties__: {
            set_nodeName: "setNodeName",
            get_nodeName: "getNodeName",
            set_nodeValue: "setNodeValue",
            get_nodeValue: "getNodeValue"
        }
    };
    I = function() {};
    c = void 0;
    ca = void 0;
    h = void 0;
    j = void 0;
    k["com.nick.spongebob.monster_island.DocumentApp"] = I;
    I.__name__ = ["com", "nick", "spongebob", "monster_island", "DocumentApp"];
    I.main = function() {
        A.init();
        I._fillEntity = new N;
        I._fillSprite = new p.FillSprite(0, 960, 560);
        I._fillEntity.add(I._fillSprite);
        A.root.addChild(I._fillEntity);
        e.JSEmbedProxy.getIsCrossdomain() ? e.WorkinCloud.instance._getAssets().setCrossdomainBaseUrl(I.appendAssetsToUrl(e.JSEmbedProxy.getBase())) : e.WorkinCloud.instance._getAssets()._setBaseUrl(I.trimUrl(e.JSEmbedProxy.getBase()));
        e.WorkinCloud.instance._getDispatcher().addEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, I._onBootstrapLoad);
        e.WorkinCloud.instance._getAssets().addPackDef("bootstrap");
        e.WorkinCloud.instance._getAssets().loadPack("bootstrap")
    };
    I._onBootstrapLoad = function() {
        e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, I._onBootstrapLoad);
        if (c.ConstantsApp.LOAD_FONT_EARLY) {
            e.WorkinCloud.instance._getDispatcher().addEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, I._onFontLoad);
            var a = e.WorkinCloud.instance._getAssets().getXML(c.ConstantsApp.CONFIG_XML_PATH);
            e.WorkinCloud.instance.setString(y.ConstantsCloud.STRING_REGION_ID, s.string(a.node.resolve("localization").node.resolve("region").getInnerData()));
            e.WorkinCloud.instance._getAssets().addPackDef("fonts_" + e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID));
            e.WorkinCloud.instance._getAssets().loadPack("fonts_" + e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID))
        } else I._initServices(), T.delay(I._initMain, 800)
    };
    I._onFontLoad = function() {
        e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, I._onFontLoad);
        I._initServices();
        T.delay(I._initMain, 800)
    };
    I._initMain = function() {
        I._main =
            new ca
    };
    I._initServices = function() {
        for (var a = e.WorkinCloud.instance._getAssets().getXML(c.ConstantsApp.CONFIG_XML_PATH).node.resolve("services").nodes.resolve("service").iterator(); a.hasNext();) {
            var b = a.next();
            switch (b.att.resolve("type").toString()) {
                case "analytics":
                    "true" == b.att.resolve("enabled").toString() && (e.WorkinCloud.instance.log("[DocumentApp](_initServices) initAnalytics"), r.ServiceAnalytics.init(b.att.resolve("id").toString()));
                    break;
                case "canadaTracking":
                    "true" == b.att.resolve("enabled").toString() &&
                        (e.WorkinCloud.instance.log("[DocumentApp](_initServices) initCanadaTracking"), r.ServiceAnalytics.enableCanadaTracking(b.att.resolve("showGameTitle").toString()));
                    break;
                case "nickavatar":
                    "true" == b.att.resolve("enabled").toString() ? (e.WorkinCloud.instance.log("[DocumentApp](_initServices) initNickAvatar"), r.ServiceNickAvatar._getInstance().enable(b.att.resolve("url").toString())) : r.ServiceNickAvatar._getInstance().disable();
                    break;
                case "leaderboard":
                    "true" == b.att.resolve("enabled").toString() ? (e.WorkinCloud.instance.log("[DocumentApp](_initServices) initLeaderboard"),
                        r.ServiceNickLeaderboard._getInstance().enable(b.att.resolve("url").toString(), b.att.resolve("keyword").toString())) : r.ServiceNickLeaderboard._getInstance().disable()
            }
        }
    };
    I.trimUrl = function(a) {
        if ("" == a) return "";
        if (0 > a.indexOf("http")) return "/" == a.charAt(0) && (a = B.substr(a, 1, a.length - 1)), a;
        var b = a.indexOf("http://");
        0 > b ? (b = a.indexOf("https://"), b = 0 > b ? 0 : b + 8) : b += 7;
        b = a.indexOf("/", b);
        a = B.substr(a, b, a.length - b);
        return a = I.appendAssetsToUrl(a)
    };
    I.appendAssetsToUrl = function(a) {
        if (0 == a.length) return a;
        "/" !=
        a.charAt(a.length - 1) && (a += "/");
        a.indexOf("/assets") < a.length - 9 && (a += "assets/");
        return a
    };
    ca = function() {
        this._RATE_REFRESH_SCALE = 0.4;
        e.WorkinCloud.instance.log("[Main] Constructed");
        this._root = A.root;
        this._timeline = new N;
        this._root.addChild(this._timeline);
        A.uncaughtError.connect(u(this, this.errorHandler));
        e.WorkinCloud.instance._getInput().prime();
        this._scaleSprite = new p.Sprite;
        this._timeline.add(this._scaleSprite);
        this._layerWorld = new N;
        this._layerUI = new N;
        this._timeline.addChild(this._layerWorld);
        this._timeline.addChild(this._layerUI);
        this._dt = 0;
        this._timerRefreshScale = 0.0010;
        this._isUIActive = this._isWorldActive = !1;
        this._flagFirstPlay = !0;
        this._flagInitialLoadComplete = this._flagWebAudioUnlocked = !1;
        this._flagGameplayPaused = !0;
        this._flagJSEmbedExists = this._flagJSEmbedPauseState = !1;
        M.__instanceof(A._platform.getStage(), i.html.HtmlStage) && (c.ConstantsApp.scaleFactor = M.__cast(A._platform.getStage(), i.html.HtmlStage).scaleFactor);
        this._flagJSEmbedExists = e.JSEmbedProxy.getExists();
        e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LOCAL_TEXT_LOADED, !1);
        this._changeActions = [];
        this._flowstack = [];
        this._addEventListeners();
        this._beginEngine()
    };
    k["com.nick.spongebob.monster_island.Main"] = ca;
    ca.__name__ = ["com", "nick", "spongebob", "monster_island", "Main"];
    ca.prototype = {
        _disposeWorld: function() {
            this._isWorldActive && (this._isWorldActive = !1, this._world.dispose(), this._world = null)
        },
        _onEventInterfaceChange: function(a) {
            this._executeInterfaceChange(a.flowId, a.screenId)
        },
        _handleWebAudioUnlock: function() {
            this._flagWebAudioUnlocked || (this._flagWebAudioUnlocked = !0, e.WorkinCloud.instance._getSound().playSound("audio/silent"))
        },
        _onEventFilesLoading: function(a) {
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, a._getData().value)
        },
        _onEventInput: function(a) {
            this._handleWebAudioUnlock();
            e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) || this._ui.handleInput(a) && this._isWorldActive && this._world.handleInput(a)
        },
        _onFlowEvent: function(a) {
            this._addFlowEvent(a.flowId)
        },
        _onMuteToggle: function() {
            e.WorkinCloud.instance._getSound().setMute(!e.WorkinCloud.instance._getSound().getMute())
        },
        _enableInput: function() {
            e.WorkinCloud.instance._getDispatcher().addEventListener(n.WMEventInput.EVENT_INPUT, u(this, this._onEventInput))
        },
        _addEventListeners: function() {
            e.WorkinCloud.instance._getDispatcher().addEventListener(n.WMEventUpdate.EVENT_UPDATE, u(this, this._onEventUpdate));
            e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_MUTE_TOGGLE, u(this, this._onMuteToggle));
            e.WorkinCloud.instance._getDispatcher().addEventListener(n.WMEventFlow.EVENT_FLOW, u(this, this._onFlowEvent));
            e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_WORLD_GENERATION_COMPLETE, u(this, this._onWorldGenerationComplete));
            e.WorkinCloud.instance._getDispatcher().addEventListener(y.ConstantsCloud.EVENT_FILES_LOADING, u(this, this._onEventFilesLoading))
        },
        _executeInterfaceChange: function(a, b) {
            for (var d = this._changeActions.length; 0 < d;) d--, this._changeActions[d]._getScreenId() == b && this._changeActions[d]._getChangeEvent() == a && (this._changeActions[d]._getAction()(), this._changeActions.splice(d,
                1))
        },
        _unpauseGameplay: function(a) {
            null == a && (a = !0);
            a && (this._flagGameplayPaused = !1);
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(c.ConstantsApp.EVENT_UNPAUSE))
        },
        _pauseGameplay: function(a) {
            null == a && (a = !0);
            a && (this._flagGameplayPaused = !0);
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(c.ConstantsApp.EVENT_PAUSE))
        },
        _executeFlowStack: function(a) {
            if (!this._ui._getHasTransition()) switch (e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1), a) {
                case c.ConstantsScreen.FLOW_SPLASH_PLAY:
                    e.WorkinCloud.instance._getAssets().disposeChunk("allStages");
                    this._gotoIntro();
                    break;
                case c.ConstantsScreen.FLOW_INTRO_CONTINUE:
                    e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1);
                    this._gotoAndPlayGame();
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP:
                    this._ui.openScreen(c.ConstantsScreen.SCREEN_HELP, !1);
                    break;
                case c.ConstantsScreen.FLOW_HELP_CLOSE:
                    this._ui.closeScreen(c.ConstantsScreen.SCREEN_HELP);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_MENU:
                    e.WorkinCloud.instance.log("[Main] Main Menu Flow Click");
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
                    this._disposeWorld();
                    this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_SPLASH, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN);
                    e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1);
                    break;
                case c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO:
                    this._ui.closeScreen(c.ConstantsScreen.SCREEN_QUIT_CONFIRM);
                    break;
                case c.ConstantsScreen.FLOW_BRANCH_GAME_LOSE:
                    this._pauseGameplay();
                    this._gotoEndGame(!1);
                    this._resetFlagsResults();
                    break;
                case c.ConstantsScreen.FLOW_BRANCH_GAME_WIN:
                    this._pauseGameplay();
                    this._disposeWorld();
                    this._resetFlagsResults();
                    this._gotoOutro();
                    break;
                case c.ConstantsScreen.FLOW_OUTRO_CONTINUE:
                    this._gotoEndGame(!0);
                    break;
                case c.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN:
                    this._disposeWorld();
                    this._onGameNew();
                    this._gotoAndPlayGame();
                    e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1);
                    break;
                case c.ConstantsScreen.FLOW_END_GAME_RETURN:
                    this._resetFlagsResults(), this._disposeWorld(), this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_SPLASH, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN), e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1)
            }
        },
        _runFlowStack: function() {
            if (0 != this._flowstack.length)
                for (; 0 < this._flowstack.length;) this._executeFlowStack(this._flowstack[0]), this._flowstack.shift()
        },
        _addFlowEvent: function(a) {
            this._flowstack.push(a)
        },
        _hideOrientationAlert: function() {
            e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) && (e.WorkinCloud.instance.log("[Main](_showOrientationAlert) Back to landscape."), e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT, !1), e.JSEmbedProxy.unpause(), e.JSEmbedProxy.alertOff())
        },
        _showOrientationAlert: function() {
            e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) || (e.WorkinCloud.instance.log("[Main](_showOrientationAlert) Portrait mode!"),
                e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT, !0), e.JSEmbedProxy.pause(), e.JSEmbedProxy.alertOn(e.WorkinCloud.instance._getLocalize().getData("orientation_landscape")._getString()))
        },
        _onEventUpdate: function(a) {
            this._dt = a.getDt();
            0.12 < this._dt && (this._dt = 0.12);
            if (this._flagJSEmbedExists && (e.JSEmbedProxy.getIsPaused() != this._flagJSEmbedPauseState && ((this._flagJSEmbedPauseState = e.JSEmbedProxy.getIsPaused()) ? this._pauseGameplay(!1) : this._flagGameplayPaused || this._unpauseGameplay()),
                    this._timerRefreshScale -= this._dt, 0 >= this._timerRefreshScale)) {
                this._timerRefreshScale = this._RATE_REFRESH_SCALE;
                if (this._flagInitialLoadComplete && e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE)) {
                    if (e.JSEmbedProxy.getCanvasHeight() > e.JSEmbedProxy.getCanvasWidth()) {
                        this._showOrientationAlert();
                        return
                    }
                    if (e.WorkinCloud.instance.getValue(c.ConstantsApp.BOOL_ORIENTATION_ALERT)) {
                        this._hideOrientationAlert();
                        return
                    }
                }
                this._flagJSEmbedExists && (a = e.JSEmbedProxy.getCanvasScale() * c.ConstantsApp.scaleFactor,
                    a != this._scaleSprite.scaleX._value && (this._scaleSprite.scaleX.set__(this._scaleSprite.scaleY.set__(a)), e.WorkinCloud.instance._getInput()._setScale(a)))
            }
            g.tween.WorkinTweener._getInstance().update(this._dt);
            e.WorkinCloud.instance.update(this._dt);
            this._isUIActive && this._ui.update(this._dt);
            this._isWorldActive && (this._world.update(this._dt), this._world.render());
            e.WorkinCloud.instance._getSound().update(this._dt);
            e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_GAME_LOSE) ? (e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LAST_GAME_WON, !1), this._onFlowEvent(new n.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_GAME_LOSE))) : e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_GAME_WIN) ? (e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LAST_GAME_WON, !0), this._onFlowEvent(new n.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_GAME_WIN))) : e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LEVEL_LOSE) ? this._onFlowEvent(new n.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE)) : e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LEVEL_WIN) && this._onFlowEvent(new n.WMEventFlow(c.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN));
            this._runFlowStack()
        },
        _generateWorld: function() {
            this._isWorldActive && this._disposeWorld();
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0);
            this._isWorldActive = !0;
            this._world = new h.World(this._layerWorld);
            c.ConstantsApp.OPTION_SHOW_LOADING_ON_PLAY_AGAIN && this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP)
        },
        _resetFlagsResults: function() {
            e.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_GAME_WIN);
            e.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_GAME_LOSE);
            e.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_LEVEL_WIN);
            e.WorkinCloud.instance.resetValue(c.ConstantsApp.BOOL_LEVEL_LOSE);
            e.WorkinCloud.instance.resetValue(c.ConstantsApp.INT_HEALTH)
        },
        _onGameNew: function() {
            this._resetFlagsResults()
        },
        _gotoEndGame: function(a) {
            this._flagWonPreviousGame = a;
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_END_GAME, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN);
            this._disposeWorld()
        },
        _gotoSplash: function() {
            this._enableInput();
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_SPLASH, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN)
        },
        _onWorldGenerationCompleteDelay: function() {
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            this._world.start();
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_GAMEPLAY_HUD, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN);
            this._unpauseGameplay()
        },
        _onWorldGenerationComplete: function() {
            T.delay(u(this, this._onWorldGenerationCompleteDelay), 300)
        },
        _gotoOutro: function() {
            this._loadChunks(["stage" +
                e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)
            ], u(this, this._eventLoadCompleteCutsceneB), 1200) && (e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1), this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_OUTRO, !1))
        },
        _gotoIntro: function() {
            this._loadChunks(["stage" + e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE), "cutscenes"], u(this, this._eventLoadCompleteCutscene), 1200) && (e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1), this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_INTRO, !1, c.ConstantsScreen.TRANSITION_SCROLL_DOWN))
        },
        _gotoAndPlayGame: function() {
            this._loadChunks(["stage" + e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE), "gameplay"], u(this, this._eventLoadCompleteGameplay), 1200) && (this._isWorldActive ? e.WorkinCloud.instance.log("[Main](_gotoAndPlayGame) World already exists. Using existing world instead of creating new one.") : this._generateWorld())
        },
        _generateUI: function() {
            this._isUIActive = !0;
            "en" == e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID) ?
                this._ui.addScreen(c.ConstantsScreen.SCREEN_LOADING, j.screens.ScreenLoading, "ui/loading_panel") : this._ui.addScreen(c.ConstantsScreen.SCREEN_LOADING, j.screens.ScreenLoading, "ui/loading_panel_international");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_LOADING_OVERLAY, j.screens.ScreenGeneric, "ui/loading_2/loading_overlay");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_CUTSCENE_BORDERS, j.screens.ScreenGeneric, "ui/cutscene/cutscene_border");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_INTRO, j.screens.ScreenIntro);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_OUTRO, j.screens.ScreenOutro);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_SPLASH, j.screens.ScreenSplash, "ui/splash/splash_with_grass");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_HELP, j.screens.ScreenHelp);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_GAMEPLAY_MENU, j.screens.ScreenGameplayMenu);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_QUIT_CONFIRM, j.screens.ScreenQuitConfirm);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_GAMEPLAY_HUD, j.screens.ScreenGameplayHUD);
            this._ui.addScreen(c.ConstantsScreen.SCREEN_END_GAME, j.screens.ScreenEndGame, "ui/end_screen/end_screen");
            this._ui.addScreen(c.ConstantsScreen.SCREEN_PAUSE_ALERT, j.screens.ScreenPauseAlert);
            this._ui.addEventListener(n.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT, u(this, this._onEventInterfaceChange))
        },
        _registerInput: function() {
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_SPACE, [f.Key.Space]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_LEFT, [f.Key.Left,
                f.Key.A
            ]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_RIGHT, [f.Key.Right, f.Key.D]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_UP, [f.Key.Up, f.Key.W]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_DOWN, [f.Key.Down, f.Key.S]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_Z, [f.Key.Z]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_X, [f.Key.X]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_C, [f.Key.C]);
            e.WorkinCloud.instance._getInput().registerInput(c.ConstantsApp.INPUT_P, [f.Key.P])
        },
        _setDefaults: function() {
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAMEOVER, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_WIN, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_LOSE, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LEVEL_WIN, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LEVEL_LOSE, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT, !1);
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_TOUCH_DEVICE, A._platform.getTouch().get_supported());
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_HEALTH, 3);
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LIVES, 3);
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_SCORE, 0);
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, 0);
            e.WorkinCloud.instance._getSound().setMute(c.ConstantsApp.OPTION_SILENCE_AUDIO);
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_EPISODE, c.ConstantsApp.episodeToTest)
        },
        _beginEngine: function() {
            e.WorkinCloud.instance.log("[Main](_beginEngine)");
            this._timeline.add(new $.ComponentUpdater);
            this._parseConfigXML();
            this._ui = new j.ScreenManager(this._layerUI);
            this._setDefaults();
            this._generateUI();
            this._registerInput();
            this._loadInLocalizedFonts()
        },
        _eventLoadCompleteCutsceneB: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            T.delay(u(this, this._gotoOutro), 1200)
        },
        _eventLoadCompleteCutscene: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            T.delay(u(this, this._gotoIntro), 1200)
        },
        _eventLoadCompleteInitial: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            this._flagInitialLoadComplete = !0;
            T.delay(u(this, this._gotoSplash), 1200)
        },
        _eventLoadCompleteGameplay: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED,
                this._loadCallbackMethod);
            T.delay(u(this, this._gotoAndPlayGame), 1200)
        },
        _loadChunksDelayCallback: function() {
            this._loadChunks(this._loadChunksCurrent, this._loadCallbackMethod, 0)
        },
        _loadChunks: function(a, b, d) {
            null == d && (d = 0);
            for (var m = 0, f = !0; m < a.length;) e.WorkinCloud.instance._getAssets().isChunkLoaded(a[m]) || (f = !1), m++;
            if (f) return !0;
            e.WorkinCloud.instance._getAssets().isLoading() || e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, 0);
            this._loadChunksCurrent = a;
            this._loadCallbackMethod = b;
            if (0 < d) return T.delay(u(this, this._loadChunksDelayCallback), d), this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP), !1;
            e.WorkinCloud.instance._getDispatcher().addEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, this._loadCallbackMethod);
            for (m = 0; m < a.length;) e.WorkinCloud.instance._getAssets().isChunkLoaded(a[m]) || e.WorkinCloud.instance._getAssets().loadChunk(a[m]), m++;
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0);
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP);
            return !1
        },
        _beginInitialLoad: function() {
            this._loadChunks(["initial"], u(this, this._eventLoadCompleteInitial), 1200)
        },
        _onFontLoad: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_FILES_LOADED, u(this, this._onFontLoad));
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LOCAL_TEXT_LOADED, !0);
            this._beginInitialLoad();
            null
        },
        _loadInLocalizedFonts: function() {
            e.WorkinCloud.instance._getDispatcher().addEventListener(y.ConstantsCloud.EVENT_FILES_LOADED,
                u(this, this._onFontLoad));
            this._ui.changeScreenTo(c.ConstantsScreen.SCREEN_LOADING, !1, c.ConstantsScreen.TRANSITION_SCROLL_UP);
            e.WorkinCloud.instance._getAssets().addPackDef("fonts_" + e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID));
            e.WorkinCloud.instance._getAssets().loadPack("fonts_" + e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID))
        },
        _parseConfigXML: function() {
            e.WorkinCloud.instance.log("[Main](_parseConfigXML) Parse Config XML: " + c.ConstantsApp.CONFIG_XML_PATH);
            for (var a = e.WorkinCloud.instance._getAssets().getXML(c.ConstantsApp.CONFIG_XML_PATH), b = a.node.resolve("packs").nodes.resolve("pack").iterator(); b.hasNext();) {
                for (var d = b.next(), m = [], f = d.nodes.resolve("flump").iterator(); f.hasNext();) {
                    var g = f.next();
                    m.push(g.att.resolve("id").toString())
                }
                f = [];
                for (g = d.nodes.resolve("tiles").iterator(); g.hasNext();) {
                    var h = g.next();
                    f.push(h.att.resolve("id").toString())
                }
                e.WorkinCloud.instance._getAssets().addPackDef(d.att.resolve("id").toString(), m, f)
            }
            for (b = a.node.resolve("chunks").nodes.resolve("chunk").iterator(); b.hasNext();) d =
                b.next(), e.WorkinCloud.instance._getAssets().addChunk(d.att.resolve("id").toString(), d);
            c.ConstantsApp.LOAD_FONT_EARLY || (e.WorkinCloud.instance.setString(y.ConstantsCloud.STRING_REGION_ID, s.string(a.node.resolve("localization").node.resolve("region").getInnerData())), e.WorkinCloud.instance.log("[Main] Localization : Set Region: " + e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID)))
        },
        errorHandler: function(a) {
            e.WorkinCloud.instance.log("Error:" + a)
        },
        __class__: ca
    };
    c = {
        ConstantsApp: function() {}
    };
    k["com.nick.spongebob.monster_island.data.ConstantsApp"] = c.ConstantsApp;
    c.ConstantsApp.__name__ = "com,nick,spongebob,monster_island,data,ConstantsApp".split(",");
    c.ConstantsApp.correctGround4 = function(a) {
        return e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) - c.ConstantsApp._E4SLOPE * (a / c.ConstantsApp.STAGE_WIDTH)
    };
    c.ConstantsScreen = function() {};
    k["com.nick.spongebob.monster_island.data.ConstantsScreen"] = c.ConstantsScreen;
    c.ConstantsScreen.__name__ = "com,nick,spongebob,monster_island,data,ConstantsScreen".split(",");
    n = {};
    e = void 0;
    y = void 0;
    r = void 0;
    g = void 0;
    $ = void 0;
    l = void 0;
    S = void 0;
    n.WMEventDispatcher = function() {
        this._signals = new G
    };
    k["com.workinman.events.WMEventDispatcher"] = n.WMEventDispatcher;
    n.WMEventDispatcher.__name__ = ["com", "workinman", "events", "WMEventDispatcher"];
    n.WMEventDispatcher.prototype = {
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
        addEventListener: function(a, b) {
            this._signals.exists(a) || this._signals.set(a, new n._WMEventDispatcher.WMEventTracker);
            this._signals.get(a).addEventListener(b)
        },
        __class__: n.WMEventDispatcher
    };
    j = {
        ScreenManager: function(a) {
            n.WMEventDispatcher.call(this);
            this._container = a;
            this._layerScreen = new N;
            this._layerTransition =
                new N;
            this._container.addChild(this._layerScreen);
            this._container.addChild(this._layerTransition);
            this._isPaused = !1;
            this._screens = [];
            this._screensOpen = [];
            this._screensQueue = [];
            this._transitionType = -1;
            this._flagCloseAllScreensWhenBottomCloses = this._flagHasScreenshot = this._flagOpenScreenAfterTransition = this._flagCloseScreenAfterTransition = this._flagHasTransition = !1;
            this._camera = new g.WorkinCamera(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y)
        }
    };
    k["com.nick.spongebob.monster_island.ui.ScreenManager"] =
        j.ScreenManager;
    j.ScreenManager.__name__ = "com,nick,spongebob,monster_island,ui,ScreenManager".split(",");
    j.ScreenManager.__super__ = n.WMEventDispatcher;
    j.ScreenManager.prototype = t(n.WMEventDispatcher.prototype, {
        _transitionPlay: function() {
            this._transition.show();
            this._transition.start()
        },
        _removeTransition: function() {
            this._flagHasTransition && (this._layerTransition.removeChild(this._transition._getEntity()), this._transition._getDispatcher().removeEventListener(n.WMEventScreenOut.EVENT_SCREEN_OUTPUT, u(this,
                this._onEventTransitionOutput)), this._transition.dispose(), this._transition = null, this._flagHasTransition = !1)
        },
        _addTransition: function(a, b) {
            null == b && (b = !0);
            if (this._flagHasTransition) {
                if (!b) return;
                this._removeTransition()
            }
            this._transition = new j.transitions.TransitionBase(a);
            this._transition.hide();
            this._transition._getDispatcher().addEventListener(n.WMEventScreenOut.EVENT_SCREEN_OUTPUT, u(this, this._onEventTransitionOutput));
            this._layerTransition.addChild(this._transition._getEntity());
            this._flagHasTransition = !0
        },
        _updateTransition: function(a) {
            switch (this._transitionType) {
                case c.ConstantsScreen.TRANSITION_SCROLL:
                    this._transitionScreenHeadedOut._getPos().x -= 3E3 * a;
                    this._transitionScreenHeadedIn._getPos().x -= 3E3 * a;
                    0 >= this._transitionScreenHeadedIn._getPos().x && (this._transitionScreenHeadedIn._getPos().x = 0, this._flagHasTransition = !1, this._onTransitionCloseScreen(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE));
                    break;
                case c.ConstantsScreen.TRANSITION_SCROLL_UP:
                    this._transitionScreenHeadedOut._getPos().y -=
                        2E3 * a;
                    this._transitionScreenHeadedIn._getPos().y -= 2E3 * a;
                    0 >= this._transitionScreenHeadedIn._getPos().y && (this._transitionScreenHeadedIn._getPos().y = 0, this._flagHasTransition = !1, this._onTransitionCloseScreen(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE));
                    break;
                case c.ConstantsScreen.TRANSITION_SCROLL_DOWN:
                    this._transitionScreenHeadedOut._getPos().y += 2E3 * a;
                    this._transitionScreenHeadedIn._getPos().y += 2E3 * a;
                    0 <= this._transitionScreenHeadedIn._getPos().y && (this._transitionScreenHeadedIn._getPos().y =
                        0, this._flagHasTransition = !1, this._onTransitionCloseScreen(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE));
                    break;
                case c.ConstantsScreen.TRANSITION_FADE:
                    this._transition.update(a), this._transition.flagDispose && this._removeTransition()
            }
        },
        _removeScreenDisplay: function(a) {
            this._layerScreen.removeChild(a)
        },
        _addScreenDisplay: function(a) {
            this._layerScreen.addChild(a)
        },
        _dispatchEventChange: function(a, b) {
            this.dispatchEvent(new n.WMEventInterfaceChange(a, b))
        },
        _onQueueConditionMet: function(a,
            b) {
            null == b && (b = "");
            for (var d = 0; d < this._screensQueue.length;) this._screensQueue[d].validateCondition(a, b) && (this._generateScreen(this._screensQueue[d].screenData), this._screensQueue.splice(d, 1)), d++
        },
        dispose: function() {
            for (var a = 0; a < this._screensOpen.length;) this._disposeScreen(this._screensOpen[a].id), a++;
            this._screens = this._screensQueue = null;
            this._removeTransition();
            this._container.removeChild(this._layerScreen);
            this._container.removeChild(this._layerTransition);
            this._layerTransition = this._layerScreen =
                null;
            n.WMEventDispatcher.prototype.dispose.call(this)
        },
        _getScreenData: function(a) {
            for (var b = this._screens.length - 1; 0 <= b;) {
                if (this._screens[b].id == a) return this._screens[b];
                b--
            }
            e.WorkinCloud.instance.log("[ScreenManager](_getScreenData) ERROR: Screen >" + a + "< idoes not exist. getScreenData() returning NULL.");
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
            this._flagHasScreenshot && (this._layerScreen.removeChild(this._screenshot._getEntity()),
                this._screenshot.dispose(), this._screenshot = null, this._flagHasScreenshot = !1)
        },
        _addScreenshot: function() {
            e.WorkinCloud.instance.log("[ScreenManager](_addScreenshot) ERROR: Screenshots not supported in HTML5 yet.")
        },
        _onTransitionCloseScreen: function() {
            this._flagCloseScreenAfterTransition && (this.closeScreen(this._screenIdToCloseAfterTransition, !1), this._flagCloseScreenAfterTransition = !1);
            this._flagOpenScreenAfterTransition && (this.openScreen(this._screenIdToOpenDuringTransition, !1), this._flagOpenScreenAfterTransition = !1)
        },
        _onEventTransitionOutput: function(a) {
            a.flowId == c.ConstantsScreen.OUTPUT_OPENED ? (e.WorkinCloud.instance.log("[ScreenManager] Transition Midway..."), this._onTransitionCloseScreen(), this._removeScreenshot(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY)) : a.flowId == c.ConstantsScreen.OUTPUT_CLOSED && (e.WorkinCloud.instance.log("[ScreenManager] Transition Complete."), this._removeScreenshot(), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE))
        },
        _onEventScreenOutput: function(a) {
            a.flowId ==
                c.ConstantsScreen.OUTPUT_OPENED ? this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_COMPLETE, a.screenId) : a.flowId == c.ConstantsScreen.OUTPUT_CLOSED && (this._dispatchEventChange(c.ConstantsScreen.CHANGE_CLOSE_COMPLETE, a.screenId), this._onQueueConditionMet(c.ConstantsScreen.CONDITION_CLOSED_SPECIFIC, a.screenId), this._flagHasTransition && this._transitionType == c.ConstantsScreen.TRANSITION_STAGED && this._transitionPlay())
        },
        _disposeScreen: function(a) {
            for (var b = 0; b < this._screensOpen.length;) {
                if (this._screensOpen[b].id ==
                    a) {
                    this._screensOpen[b]._getDispatcher().removeEventListener(n.WMEventScreenOut.EVENT_SCREEN_OUTPUT, u(this, this._onEventScreenOutput));
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
                var b = O.createInstance(a.screenClass, [a.id, a.assetClassName, a.data]);
                if (null ==
                    b) e.WorkinCloud.instance.log("[ScreenManager](_generateScreen) ERROR: Screen Class for >" + a.id + "< not found.");
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
                    b._getDispatcher().addEventListener(n.WMEventScreenOut.EVENT_SCREEN_OUTPUT, u(this, this._onEventScreenOutput));
                    b.open(!0);
                    this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_BEGIN, a.id)
                }
            }
        },
        _addScreenToQueue: function(a, b, d) {
            null == d && (d = "");
            this.hasQueuedScreen(a.id) || this._screensQueue.push(new j.screens.data.ScreenQueueData(a, b, d))
        },
        removeAllQueuedScreens: function() {
            for (var a = this._screensQueue.length - 1; 0 <= a;) this._screensQueue.splice(a, 1), a--
        },
        removeQueuedScreen: function(a) {
            for (var b =
                    this._screensQueue.length - 1; 0 <= b;) {
                if (this._screensQueue[b].screenData.id == a) {
                    this._screensQueue.splice(b, 1);
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
            if (0 == this._screensOpen.length) return e.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: no screens are open. Unable to getScreen()"),
                null;
            if ("" == a) return this._screensOpen[this._screensOpen.length - 1];
            for (var b = this._screensOpen.length - 1; 0 <= b;) {
                if (this._screensOpen[b].id == a) return this._screensOpen[b];
                b--
            }
            e.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: Screen >" + a + "< is not open or does not exist. getScreen() returning NULL.");
            return null
        },
        update: function(a) {
            if (!this._isPaused) {
                0.15 < a && (a = 0.15);
                this._flagHasTransition && this._updateTransition(a);
                for (this._loop = this._screensOpen.length - 1; 0 <= this._loop;) this._screensOpen[this._loop].update(a),
                    this._screensOpen[this._loop].renderPosition(this._camera), this._screensOpen[this._loop].flagDispose && (this._disposeScreen(this._screensOpen[this._loop].id), 0 == this._screensOpen.length && this._onQueueConditionMet(c.ConstantsScreen.CONDITION_CLOSED_ALL)), this._loop--
            }
        },
        _getHasTransition: function() {
            return this._flagHasTransition
        },
        changeScreenTo: function(a, b, d, m) {
            null == m && (m = "");
            null == d && (d = -1);
            null == b && (b = !1);
            e.WorkinCloud.instance.log("[ScreenManager](changeTo) " + a);
            this.removeAllQueuedScreens();
            if (this.isScreenOpen(a)) {
                e.WorkinCloud.instance.log("[ScreenManager](changeTo) Screen is already open.");
                for (b = this._screensOpen.length - 1; 0 <= b;) this._screensOpen[b].id != a && this.closeScreen(this._screensOpen[b].id, !1, b), b--;
                this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_BEGIN, a);
                this._dispatchEventChange(c.ConstantsScreen.CHANGE_OPEN_COMPLETE, a)
            } else if (this._flagOpenScreenAfterTransition = this._flagCloseScreenAfterTransition = !1, 0 < this._screensOpen.length) {
                e.WorkinCloud.instance.log("[ScreenManager](changeFrom) " + this._screensOpen[0].id);
                this._screensOpen[0].suspend();
                var f = c.ConstantsScreen.CONDITION_CLOSED_ALL;
                if (-1 < d) switch (this._transitionType = d, this._transitionType) {
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
                        f = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL_UP:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        f = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL_DOWN:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        f = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_SCROLL:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        f = c.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case c.ConstantsScreen.TRANSITION_FADE:
                        this._addTransition(m, this._flagHasTransition ? this._transition._getIsOutro() ? !0 : !1 : !1), this._flagCloseScreenAfterTransition = !0, b = !1, this._transitionPlay(), f = c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY
                }
                if (0 < this._screensOpen.length && (this._flagCloseScreenAfterTransition ? this._screenIdToCloseAfterTransition =
                        this._screensOpen[0].id : this.closeScreen(this._screensOpen[0].id, b, 0), 1 < this._screensOpen.length))
                    for (b = 1; b < this._screensOpen.length;) this.closeScreen(this._screensOpen[b].id, !1, this._screensOpen.length), b++;
                this._flagOpenScreenAfterTransition ? (e.WorkinCloud.instance.log("[ScreenManager] Store Screen to open at transition midway: " + a), this._screenIdToOpenDuringTransition = a) : this.openScreen(a, !0, f)
            } else this.openScreen(a, !1)
        },
        _moveScreenToTop: function(a) {
            var b = this.getScreen(a);
            if (null == b) e.WorkinCloud.instance.log("[ScreenManager](_moveScreenToTop) ERROR: Screen >" +
                a + "< is not open or does not exist. Cancelling move.");
            else {
                b.isClosing() && b.open(!1);
                for (var d = this._screensOpen.length - 1; 0 <= d && !(this._screensOpen[d].id == a);) d--;
                this._screensOpen.splice(d, 1);
                b.reset();
                this._removeScreenDisplay(b._getEntity());
                this._addScreenDisplay(b._getEntity());
                this._screensOpen.push(b)
            }
        },
        openScreen: function(a, b, d, m) {
            null == m && (m = "");
            null == d && (d = 0);
            null == b && (b = !0);
            e.WorkinCloud.instance.log("[ScreenManager](openScreen) " + a);
            if (this._hasScreenData(a))
                if (this.isScreenOpen(a)) this._moveScreenToTop(a);
                else {
                    if (d != c.ConstantsScreen.CONDITION_IMMEDIATE && b) {
                        if (0 < this._screensOpen.length) {
                            this._addScreenToQueue(this._getScreenData(a), d, m);
                            return
                        }
                        if ((d == c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE || d == c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY) && this._flagHasTransition) {
                            this._addScreenToQueue(this._getScreenData(a), d, m);
                            return
                        }
                    }
                    this._generateScreen(this._getScreenData(a))
                }
            else e.WorkinCloud.instance.log("[ScreenManager](closeScreen) ERROR: Screen >" + a + "< does not exist. Cancelling open().")
        },
        closeScreen: function(a,
            b, d) {
            null == d && (d = -1);
            null == b && (b = !0);
            null == a && (a = "");
            if (0 == this._screensOpen.length) this.removeQueuedScreen(a);
            else {
                if ("" == a) d = this._screensOpen[this._screensOpen.length - 1];
                else if (0 <= d && d < this._screensOpen.length) d = this._screensOpen[d];
                else if (d = this.getScreen(a), null == d) {
                    this.removeQueuedScreen(a);
                    return
                }
                d.close(b);
                this._dispatchEventChange(c.ConstantsScreen.CHANGE_CLOSE_BEGIN, a)
            }
        },
        handleInput: function(a) {
            for (var b = !0, d = this._screensOpen.length - 1; 0 <= d && b;) this._screensOpen[d].handleInput(a, d == this._screensOpen.length -
                1) || (b = !1), d--;
            return b
        },
        addScreen: function(a, b, d, m, c) {
            null == m && (m = 0);
            null == d && (d = "");
            this._screens.push(new j.screens.data.ScreenData(a, b, d, m, c))
        },
        __class__: j.ScreenManager,
        __properties__: {
            get_isTransition: "_getHasTransition"
        }
    });
    l = {
        IPoolable: function() {}
    };
    k["com.workinman.display.IPoolable"] = l.IPoolable;
    l.IPoolable.__name__ = ["com", "workinman", "display", "IPoolable"];
    l.IPoolable.prototype = {
        __class__: l.IPoolable,
        __properties__: {
            set_isPooled: "_setIsPooled",
            get_isPooled: "_getIsPooled",
            set_isActive: "_setIsActive",
            get_isActive: "_getIsActive"
        }
    };
    l.Poolable = function() {
        this._flagPooled = !0;
        this._flagActive = !1
    };
    k["com.workinman.display.Poolable"] = l.Poolable;
    l.Poolable.__name__ = ["com", "workinman", "display", "Poolable"];
    l.Poolable.__interfaces__ = [l.IPoolable];
    l.Poolable.prototype = {
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
        __class__: l.Poolable,
        __properties__: {
            set_isPooled: "_setIsPooled",
            get_isPooled: "_getIsPooled",
            set_isActive: "_setIsActive",
            get_isActive: "_getIsActive"
        }
    };
    l.Element = function(a) {
        l.Poolable.call(this, a);
        this._entity = new N;
        this._display = new p.Sprite;
        this._entity.add(this._display);
        this._elements = [];
        this._textureEntity = new N;
        this._entity.addChild(this._textureEntity);
        this._texture = new p.Sprite;
        this._textureEntity.add(this._texture);
        this._dispatcher = new n.WMEventDispatcher;
        this._pos = new g.WorkinPoint;
        this._velocity = new g.WorkinPoint;
        this._renderOffset = new g.WorkinPoint;
        this._renderOrigin = new g.WorkinPoint;
        this._render = new l.Renderable;
        this._tweener = new g.tween.WorkinTween;
        this._uniqueId = y.ConstantsCloud.getUniqueId();
        this._layer = this._assetId = "";
        this._useCamera = !0;
        this._doDelete = !1;
        !0 == a.pooled ? this._setIsPooled(!0) : (this._setIsPooled(!1), this.renew(a));
        this._addEventListeners()
    };
    k["com.workinman.display.Element"] = l.Element;
    l.Element.__name__ = ["com", "workinman", "display",
        "Element"
    ];
    l.Element.__super__ = l.Poolable;
    l.Element.prototype = t(l.Poolable.prototype, {
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
            for (var b = 0, d = this._elements; b < d.length;) {
                var m = d[b];
                ++b;
                m.renderPosition(a)
            }
            this.applyRenderable()
        },
        _addElement: function(a) {
            this._elements.push(a);
            this._entity.addChild(a._getEntity());
            return a
        },
        updatePositionFromVelocity: function(a) {
            this._pos.x += this._velocity.x *
                a;
            this._pos.y += this._velocity.y * a
        },
        update: function(a) {
            for (var b = 0, d = this._elements; b < d.length;) {
                var m = d[b];
                ++b;
                m.update(a)
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
            "" != a && (!1 == e.WorkinCloud.instance._getAssets().hasAsset(a) ? e.WorkinCloud.instance.log("[Element](setTexture) No asset named " + a + " exists!") : this.swapTexture(new p.ImageSprite(e.WorkinCloud.instance._getAssets().getTexture(a))))
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
        dispose: function() {
            if (this._getIsPooled()) this.release();
            else {
                for (var a = 0, b = this._elements; a < b.length;) {
                    var d = b[a];
                    ++a;
                    d.dispose()
                }
                this._elements = null;
                this._removeEventListeners();
                this._dispatcher.dispose();
                this._dispatcher = null;
                this._entity.dispose();
                this._velocity =
                    this._pos = this._entity = null;
                this._texture.dispose();
                this._display = this._texture = null;
                this._textureEntity.dispose();
                this._renderOrigin = this._renderOffset = this._render = this._textureEntity = null;
                this._tweener.dispose();
                this._tweener = null
            }
        },
        release: function() {
            this._getIsPooled() && l.Poolable.prototype.release.call(this)
        },
        renew: function(a) {
            a.asset && (this._assetId = a.asset, this.setTexture(this._assetId));
            this._doDelete = !1;
            a.layer && (this._layer = a.layer);
            a.x && (this._pos.x = a.x);
            a.y && (this._pos.y = a.y);
            a.rot &&
                (this._render.rotation = a.rot);
            a.scale && (this._render.scaleX = this._render.scaleY = a.scale);
            null != a.useCamera && (this._useCamera = a.useCamera);
            a.origin ? this.setOrigin(a.origin) : this.setOrigin(new g.WorkinPoint(0, 0))
        },
        __class__: l.Element,
        __properties__: t(l.Poolable.prototype.__properties__, {
            set_pos: "_setPos",
            get_pos: "_getPos",
            set_doDelete: "_setDoDelete",
            get_doDelete: "_getDoDelete",
            get_renderable: "_getRenderable",
            get_entity: "_getEntity",
            get_dispatcher: "_getDispatcher",
            get_depth: "_getDepth",
            set_layer: "_setLayer",
            get_layer: "_getLayer"
        })
    });
    j.buttons = {};
    j.buttons.ButtonBase = function(a, b, d, m, c, f, h) {
        null == h && (h = "");
        null == f && (f = "");
        null == c && (c = "");
        null == m && (m = "");
        this._DEBUG_SHOW_HITBOX = !1;
        null == d && (d = new g.WorkinPoint(0.5, 0.5));
        l.Element.call(this, {
            x: a,
            y: b,
            asset: this._assetUp,
            origin: d
        });
        this._assetUp = "" == m ? this._getDefaultAssetUp() : m;
        this._assetOver = "" == c ? this._getDefaultAssetOver() : c;
        this._assetDown = "" == f ? this._getDefaultAssetDown() : f;
        this._assetDisabled = "" == h ? this._getDefaultAssetDisabled() : h;
        this._flagDragged =
            this._flagClickTransition = this._flagDown = !1;
        this.enable();
        this._buildHitBox();
        e.WorkinCloud.instance._getDispatcher().addEventListener(n.WMEventInput.EVENT_INPUT, u(this, this._onEventInput));
        this._buttonScaleBase = new g.WorkinPoint(1, 1)
    };
    k["com.nick.spongebob.monster_island.ui.buttons.ButtonBase"] = j.buttons.ButtonBase;
    j.buttons.ButtonBase.__name__ = "com,nick,spongebob,monster_island,ui,buttons,ButtonBase".split(",");
    j.buttons.ButtonBase.__super__ = l.Element;
    j.buttons.ButtonBase.prototype = t(l.Element.prototype, {
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
            this._flagClickTransition || (g.tween.WorkinTweener._getInstance().tween(this._render, 0.15, {
                    scaleX: 1.04 * this._buttonScaleBase.x,
                    scaleY: 1.04 * this._buttonScaleBase.y
                }).ease(g.tween.PennerManager.EASE_QUAD_OUT),
                "" != this._assetDown && this.setTexture(this._assetDown))
        },
        _renderUp: function() {
            "" != this._assetUp && this.setTexture(this._assetUp)
        },
        _playSoundClick: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioClick")
        },
        update: function(a) {
            l.Element.prototype.update.call(this, a)
        },
        _onCancelDrag: function() {
            this._flagDragged = !1;
            this._dispatch(j.buttons.ButtonBase.CANCEL_DRAG)
        },
        _onUp: function() {
            !e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) && this._flagDown && (this._flagDown = !1, this._renderReturnUp(),
                this._click(), this._flagDragged && this._onCancelDrag(), this._dispatch(j.buttons.ButtonBase.UP))
        },
        _onDown: function() {
            e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) || (this._flagDown = !0, this._renderDown(), this._dispatch(j.buttons.ButtonBase.DOWN))
        },
        _onClickTransitionComplete: function() {
            this._flagClickTransition = !1;
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !1);
            this._dispatch(j.buttons.ButtonBase.CLICK);
            "" != this._getClickFlow() && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventFlow(this._getClickFlow()));
            "" != this._getClickEvent() && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(this._getClickEvent()));
            g.tween.WorkinTweener._getInstance().stop(this._render);
            this._render.scaleX = this._buttonScaleBase.x;
            this._render.scaleY = this._buttonScaleBase.y
        },
        _click: function() {
            !e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_INPUT_LOCK) && !e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) && (this._flagClickTransition = !0, this._playSoundClick(), g.tween.WorkinTweener._getInstance().tween(this._render,
                0.25, {
                    scaleX: 0.96 * this._buttonScaleBase.x,
                    scaleY: 0.96 * this._buttonScaleBase.y
                }).ease(g.tween.PennerManager.EASE_QUAD_OUT), g.tween.WorkinTweener._getInstance().tween(this._render, 0.25, {
                scaleX: 0.99 * this._buttonScaleBase.x,
                scaleY: 0.99 * this._buttonScaleBase.y
            }, !1).ease(g.tween.PennerManager.EASE_ELASTIC_OUT).delay(0.25).onComplete(u(this, this._onClickTransitionComplete)), e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0))
        },
        _dispatch: function(a) {
            this._GET_DO_DISPATCH() && this._dispatcher.dispatchEvent(new n.WMEvent(a))
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
            return new J.Point(0, 0)
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
        depthTest: function(a, b) {
            var d = e.WorkinCloud.instance._getInput().doDepthTestOnWorldCoordinates(a, b),
                m = !1;
            d == this._texture && (m = !0);
            !1 == m && null != this._hitBox && d == this._hitBox && (m = !0);
            return m
        },
        _onEventInput: function(a) {
            switch (a.input) {
                case c.ConstantsApp.INPUT_CLICK:
                    var b = !1;
                    this._hitRect.toXY(this._pos.x - this._render.width * this._renderOrigin.x, this._pos.y - this._render.height * this._renderOrigin.y);
                    this._hitRect.contains(a.x, a.y) && (b = !0);
                    switch (a.phase) {
                        case n.WMEventInput.PHASE_DOWN:
                            this.depthTest(a.x, a.y) && !1 == this._flagDown && b && this._onDown(a.x, a.y);
                            break;
                        case n.WMEventInput.PHASE_UP:
                            this._flagDown && (b ? this._onUp(a.x, a.x) :
                                this._renderReturnUp(), this._flagDown = !1)
                    }
            }
        },
        dispose: function() {
            this.disable();
            e.WorkinCloud.instance._getDispatcher().removeEventListener(n.WMEventInput.EVENT_INPUT, u(this, this._onEventInput));
            null != this._hitBox && (this._hitBox.dispose(), this._hitBox = null);
            this._hitRect.dispose();
            this._buttonScaleBase = this._hitRect = null;
            l.Element.prototype.dispose.call(this)
        },
        _buildHitBox: function() {
            this._hitRect = new g.WMRectangle(0, 0, this._render.width, this._render.height);
            if (this._DEBUG_SHOW_HITBOX) {
                this._hitBox =
                    new p.FillSprite(16711680, this._render.width | 0, this._render.height | 0);
                var a = new N;
                a.add(this._hitBox);
                this._textureEntity.addChild(a)
            }
        },
        disable: function() {
            this._flagEnabled = !1;
            this._renderDisabled()
        },
        enable: function() {
            this._flagEnabled = !0;
            this._renderUp()
        },
        changeText: function(a) {
            null != this._text && this._text._setText(a)
        },
        addText: function(a) {
            this._addElement(this._text = a)
        },
        __class__: j.buttons.ButtonBase,
        __properties__: t(l.Element.prototype.__properties__, {
            get__DO_DISPATCH: "_GET_DO_DISPATCH",
            get__clickEvent: "_getClickEvent",
            get__clickFlow: "_getClickFlow"
        })
    });
    j.buttons.ButtonSoundToggle = function(a, b, d, m, c) {
        this._onAssets = m;
        this._offAssets = c;
        this._refreshMuteState();
        j.buttons.ButtonBase.call(this, a, b, d, this._currentAssets[0], this._currentAssets[1], this._currentAssets[3 == this._currentAssets.length ? 2 : 1])
    };
    k["com.nick.spongebob.monster_island.ui.buttons.ButtonSoundToggle"] = j.buttons.ButtonSoundToggle;
    j.buttons.ButtonSoundToggle.__name__ = "com,nick,spongebob,monster_island,ui,buttons,ButtonSoundToggle".split(",");
    j.buttons.ButtonSoundToggle.__super__ =
        j.buttons.ButtonBase;
    j.buttons.ButtonSoundToggle.prototype = t(j.buttons.ButtonBase.prototype, {
        _getClickEvent: function() {
            return ""
        },
        _refreshMuteState: function() {
            this._currentAssets = e.WorkinCloud.instance._getSound().getMute() ? this._offAssets : this._onAssets;
            this._assetUp = this._currentAssets[0];
            this._assetOver = this._currentAssets[1];
            this._assetDown = this._currentAssets[3 == this._currentAssets.length ? 2 : 1]
        },
        _click: function() {
            this._flagEnabled && !e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_ORIENTATION_ALERT) &&
                (e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(c.ConstantsApp.EVENT_MUTE_TOGGLE)), this._refreshMuteState(), this._renderReturnUp())
        },
        __class__: j.buttons.ButtonSoundToggle
    });
    l.Display = function(a, b, d, m) {
        null == d && (d = "");
        this._flagLocked = !1;
        l.Element.call(this, {
            x: a,
            y: b,
            asset: d,
            origin: m
        });
        this._addEventListeners()
    };
    k["com.workinman.display.Display"] = l.Display;
    l.Display.__name__ = ["com", "workinman", "display", "Display"];
    l.Display.__super__ = l.Element;
    l.Display.prototype = t(l.Element.prototype, {
        lock: function() {
            this._flagLocked = !0
        },
        dispose: function() {
            l.Element.prototype.dispose.call(this);
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
            l.Element.prototype._removeEventListeners.call(this);
            e.WorkinCloud.instance._getDispatcher().removeEventListener(l.Display.EVENT_UPDATE_DISPLAY, u(this, this._onUpdateDisplay))
        },
        _addEventListeners: function() {
            l.Element.prototype._addEventListeners.call(this);
            e.WorkinCloud.instance._getDispatcher().addEventListener(l.Display.EVENT_UPDATE_DISPLAY, u(this, this._onUpdateDisplay))
        },
        __class__: l.Display
    });
    j.display = {};
    j.display.DisplayCharge = function(a, b) {
        l.Display.call(this, a, b);
        e.WorkinCloud.instance.getInt(this._updateValue());
        this._addElement(this._flashing = new l.Element({
            origin: new g.WorkinPoint(0.5, 0.5),
            asset: "hud_power_eye_glow",
            x: -73,
            y: 48
        }));
        this._addElement(new l.Element({
            origin: new g.WorkinPoint(0.5, 1),
            asset: "hud_power_eye_ball",
            y: 70,
            x: -73
        }));
        this._addElement(this._fill =
            new l.Element({
                origin: new g.WorkinPoint(0.5, 1),
                asset: "hud_power_eye_greenfill",
                y: 70,
                x: -73
            }));
        this._addElement(new l.Element({
            origin: new g.WorkinPoint(1),
            asset: "hud_power_eye_stalk"
        }));
        this._flashit = !1;
        this._flashSin = 0;
        this._refresh()
    };
    k["com.nick.spongebob.monster_island.ui.display.DisplayCharge"] = j.display.DisplayCharge;
    j.display.DisplayCharge.__name__ = "com,nick,spongebob,monster_island,ui,display,DisplayCharge".split(",");
    j.display.DisplayCharge.__super__ = l.Display;
    j.display.DisplayCharge.prototype =
        t(l.Display.prototype, {
            dispose: function() {
                l.Display.prototype.dispose.call(this)
            },
            update: function(a) {
                l.Display.prototype.update.call(this, a);
                this._flashit && (this._flashSin += 5 * a, this._flashing._getRenderable().alpha = (Math.sin(this._flashSin) + 1) / 2)
            },
            _updateValue: function() {
                return c.ConstantsApp.FLOAT_CHARGE
            },
            _refresh: function() {
                var a = e.WorkinCloud.instance.getFloat(this._updateValue());
                this._fill._getRenderable().scaleY = a / 100;
                this._flashit = 1 <= this._fill._getRenderable().scaleY;
                this._flashit || (this._flashSin =
                    this._flashing._getRenderable().alpha = 0)
            },
            __class__: j.display.DisplayCharge
        });
    j.display.DisplayHealth = function(a, b) {
        l.Display.call(this, a, b);
        e.WorkinCloud.instance.getInt(this._updateValue());
        this._addElement(this._eye1 = new l.Element({
            x: 0,
            y: 0,
            asset: "life_eye1"
        }));
        this._addElement(this._eye2 = new l.Element({
            x: 60,
            y: 10,
            asset: "life_eye2"
        }));
        this._addElement(this._eye3 = new l.Element({
            x: 105,
            y: 3,
            asset: "life_eye3"
        }));
        this._refresh()
    };
    k["com.nick.spongebob.monster_island.ui.display.DisplayHealth"] = j.display.DisplayHealth;
    j.display.DisplayHealth.__name__ = "com,nick,spongebob,monster_island,ui,display,DisplayHealth".split(",");
    j.display.DisplayHealth.__super__ = l.Display;
    j.display.DisplayHealth.prototype = t(l.Display.prototype, {
        dispose: function() {
            l.Display.prototype.dispose.call(this);
            this._eye1 = this._eye2 = this._eye3 = null
        },
        _updateValue: function() {
            return c.ConstantsApp.INT_HEALTH
        },
        _refresh: function() {
            var a = e.WorkinCloud.instance.getInt(this._updateValue());
            1 == this._eye3._getRenderable().alpha && 3 > a ? this._eye3._getRenderable().alpha =
                0.2 : 3 <= a && (this._eye3._getRenderable().alpha = 1);
            1 == this._eye2._getRenderable().alpha && 2 > a ? this._eye2._getRenderable().alpha = 0.2 : 2 <= a && (this._eye2._getRenderable().alpha = 1);
            1 == this._eye1._getRenderable().alpha && 1 > a ? this._eye1._getRenderable().alpha = 0.2 : 1 <= a && (this._eye1._getRenderable().alpha = 1)
        },
        __class__: j.display.DisplayHealth
    });
    j.display.DisplayLoadingProgress = function(a, b) {
        l.Display.call(this, a, b, "", new g.WorkinPoint(0, 0.5));
        this._bar = this._addElement(new l.Element({
            asset: "loading_bar"
        }));
        this._addElement(new l.Element({
            asset: "loading_bar_outline",
            x: -2,
            y: -2
        }));
        this._bar._getRenderable().scaleX = 0
    };
    k["com.nick.spongebob.monster_island.ui.display.DisplayLoadingProgress"] = j.display.DisplayLoadingProgress;
    j.display.DisplayLoadingProgress.__name__ = "com,nick,spongebob,monster_island,ui,display,DisplayLoadingProgress".split(",");
    j.display.DisplayLoadingProgress.__super__ = l.Display;
    j.display.DisplayLoadingProgress.prototype = t(l.Display.prototype, {
        dispose: function() {
            l.Display.prototype.dispose.call(this)
        },
        _updateValue: function() {
            return c.ConstantsApp.INT_LOADING_PROGRESS
        },
        _refresh: function() {
            var a = e.WorkinCloud.instance.getInt(this._updateValue());
            this._bar._getRenderable().scaleX = a / 100
        },
        __class__: j.display.DisplayLoadingProgress
    });
    j.display.DisplayScore = function(a, b) {
        l.Display.call(this, a, b);
        var d = e.WorkinCloud.instance.getInt(this._updateValue());
        this._textNum = this._addElement(new l.TextBase(0, 0, s.string(d), e.WorkinCloud.instance._getLocalize().getData("score")._getFontName(), {
            origin: new g.WorkinPoint(0, 0.5),
            scale: 0.5
        }));
        this._refresh()
    };
    k["com.nick.spongebob.monster_island.ui.display.DisplayScore"] =
        j.display.DisplayScore;
    j.display.DisplayScore.__name__ = "com,nick,spongebob,monster_island,ui,display,DisplayScore".split(",");
    j.display.DisplayScore.__super__ = l.Display;
    j.display.DisplayScore.prototype = t(l.Display.prototype, {
        dispose: function() {
            l.Display.prototype.dispose.call(this);
            this._textNum = null
        },
        _updateValue: function() {
            return c.ConstantsApp.INT_SCORE
        },
        _refresh: function() {
            var a = e.WorkinCloud.instance.getInt(this._updateValue());
            this._textNum._setText(s.string(a))
        },
        __class__: j.display.DisplayScore
    });
    j.screens = {};
    j.screens.ScreenBase = function(a, b) {
        this._STATE_SUSPENDED = "suspend";
        this._STATE_OPENED = "opened";
        this._STATE_OUT = "out";
        this._STATE_IN = "in";
        this.id = a;
        l.Element.call(this, {
            asset: b
        });
        this._clickWall = new N;
        var d = new p.FillSprite(16711680, c.ConstantsApp.STAGE_WIDTH, c.ConstantsApp.STAGE_HEIGHT);
        d.alpha.set__(0);
        this._clickWall.add(d);
        this._entity.addChild(this._clickWall);
        this._entity.addChild(this._textureEntity);
        this._buildButtons();
        this._flagStateAnimationComplete = this._flagStateCompleteTemp =
            this.flagDispose = !1;
        this._states = [];
        this._generateStates();
        this._stateIndex = this._states.length + 2;
        this._setFirstState()
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenBase"] = j.screens.ScreenBase;
    j.screens.ScreenBase.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenBase".split(",");
    j.screens.ScreenBase.__super__ = l.Element;
    j.screens.ScreenBase.prototype = t(l.Element.prototype, {
        _onStateComplete: function() {
            this._flagStateCompleteTemp = !1;
            "" != this._states[this._stateIndex].outFunc && e.WorkinCloud.instance.log("[ScreenBase](_onStateComplete) Out Func not supported in HTML5 yet");
            switch (this._states[this._stateIndex].actionOnComplete) {
                case j.screens.data.ScreenStateData.ACTION_OPENED:
                    this._setOpenedState();
                    this._dispatcher.dispatchEvent(new n.WMEventScreenOut(c.ConstantsScreen.OUTPUT_OPENED, this.id));
                    break;
                case j.screens.data.ScreenStateData.ACTION_CLOSED:
                    this.setFlagDispose();
                    this._dispatcher.dispatchEvent(new n.WMEventScreenOut(c.ConstantsScreen.OUTPUT_CLOSED, this.id));
                    break;
                case j.screens.data.ScreenStateData.ACTION_NEW_STATE:
                    this._setState(this._states[this._stateIndex].actionData);
                    break;
                case j.screens.data.ScreenStateData.ACTION_EVENT:
                    this._dispatcher.dispatchEvent(new n.WMEvent(this._states[this._stateIndex].actionData));
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
            var d = this._findStateIndex(a);
            if (0 > d) e.WorkinCloud.instance.log("[ScreenBase](_setState) ERROR : State >" + a + "< not found."), e.WorkinCloud.instance.log("[ScreenBase](_setState) cancelling setState().");
            else if (b || d != this._stateIndex) this._flagStateAnimationComplete = this._flagStateCompleteTemp = !1, this._stateIndex = d
        },
        _addState: function(a, b, d, m, c, e) {
            null == e && (e = "");
            null == c && (c = "");
            null == m && (m = "");
            null == d && (d = 0);
            this._states.push(new j.screens.data.ScreenStateData(a, b, d, m, c, e))
        },
        isClosing: function() {
            return this.getState() == this._STATE_OUT
        },
        close: function() {
            this.setFlagDispose();
            this._dispatcher.dispatchEvent(new n.WMEventScreenOut(c.ConstantsScreen.OUTPUT_CLOSED, this.id))
        },
        suspend: function() {
            this._setState(this._STATE_SUSPENDED)
        },
        open: function() {
            this._setOpenedState();
            this._dispatcher.dispatchEvent(new n.WMEventScreenOut(c.ConstantsScreen.OUTPUT_OPENED, this.id))
        },
        dispose: function() {
            this._states = null;
            l.Element.prototype.dispose.call(this)
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
            l.Element.prototype.update.call(this, a);
            this._flagStateCompleteTemp && this._onStateComplete()
        },
        _doFlowEvent: function(a) {
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventFlow(a))
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
        __class__: j.screens.ScreenBase,
        __properties__: t(l.Element.prototype.__properties__, {
            get_state: "getState"
        })
    });
    j.screens.ScreenEndGame = function(a, b, d) {
        null == b && (b = "");
        this._BLINK_TIME = 1;
        j.screens.ScreenBase.call(this, a, b, d);
        this._blinkTimer = this._BLINK_TIME;
        a = e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LAST_GAME_WON) ? "level_up" : "game_over";
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X,
            50, a, "", {
                origin: new g.WorkinPoint(0.5, 0.5)
            }));
        a = this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X - 80, 160, "score", "", {
            origin: new g.WorkinPoint(0, 0.5)
        }));
        this._score = new j.display.DisplayScore(a._getPos().x + a._getRenderable().width / 2 + 30, a._getPos().y);
        this._score.lock();
        this._addElement(this._score);
        this._addElement(a = new j.buttons.ButtonBase(839, 330, new g.WorkinPoint(0.5, 0.5), "ui/end_screen/button1"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onPlayAgainClick));
        a.addText(new l.TextLocalized(0, -10, "tryagain", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        5 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) && (this._addElement(a = new j.buttons.ButtonBase(839, 410, new g.WorkinPoint(0.5, 0.5), "ui/end_screen/button2"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onNextEpisodeClick)), a.addText(new l.TextLocalized(0, -10, "nextepisode", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        })));
        this._addElement(a = new j.buttons.ButtonBase(839, 490, new g.WorkinPoint(0.5,
            0.5), "ui/end_screen/button3"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEpisodeSelectClick));
        a.addText(new l.TextLocalized(0, -30, "goback", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }))
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenEndGame"] = j.screens.ScreenEndGame;
    j.screens.ScreenEndGame.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenEndGame".split(",");
    j.screens.ScreenEndGame.__super__ = j.screens.ScreenBase;
    j.screens.ScreenEndGame.prototype =
        t(j.screens.ScreenBase.prototype, {
            dispose: function() {
                j.screens.ScreenBase.prototype.dispose.call(this)
            },
            _onEpisodeSelectClick: function() {
                e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_INPUT_LOCK) || (this._doFlowEvent(c.ConstantsScreen.FLOW_END_GAME_RETURN), e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0))
            },
            _onNextEpisodeClick: function() {
                e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_INPUT_LOCK) || (e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_EPISODE, 1), this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY),
                    e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0))
            },
            _onPlayAgainClick: function() {
                e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_INPUT_LOCK) || (this._doFlowEvent(c.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN), e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_INPUT_LOCK, !0))
            },
            __class__: j.screens.ScreenEndGame
        });
    j.screens.ScreenGameplayHUD = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) || this._addElement(new j.display.DisplayCharge(880,
            38));
        this._addElement(new l.Element({
            asset: "hud"
        }));
        a = this._addElement(new l.TextLocalized(20, 25, "score", "", {
            origin: new g.WorkinPoint(0, 0.5)
        }));
        this._addElement(new j.display.DisplayScore(a._getPos().x + a._getRenderable().width / 2 + 30, a._getPos().y));
        this._addElement(new j.display.DisplayHealth(520, 20));
        this._addElement(new j.buttons.ButtonBase(958, 2, new g.WorkinPoint(1, 0), "ui/gameplay_hud/hud_pause_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventPauseClick));
        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (this._addElement(a = new j.display.DisplayCharge(858, 563)), a._getRenderable().rotation = 180, this._addElement(this._specialButton = new j.buttons.ButtonBase(958, 558, new g.WorkinPoint(1, 1), "ui/gameplay_hud/button_action_rod_up"))._getDispatcher().addEventListener(j.buttons.ButtonBase.DOWN, u(this, this._onEventClickSpecial)), this._specialButton._getDispatcher().addEventListener(j.buttons.ButtonBase.UP, u(this, this._onEventUnclickSpecial)), this._specialButton._getRenderable().alpha =
            0)
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenGameplayHUD"] = j.screens.ScreenGameplayHUD;
    j.screens.ScreenGameplayHUD.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenGameplayHUD".split(",");
    j.screens.ScreenGameplayHUD.__super__ = j.screens.ScreenBase;
    j.screens.ScreenGameplayHUD.prototype = t(j.screens.ScreenBase.prototype, {
        _onEventUnclickSpecial: function() {
            this.getState() == this._STATE_OPENED && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(c.ConstantsApp.EVENT_SPECIAL_UP))
        },
        _onEventClickSpecial: function() {
            this.getState() == this._STATE_OPENED && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(c.ConstantsApp.EVENT_SPECIAL_DOWN))
        },
        _onEventPauseClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_MENU)
        },
        __class__: j.screens.ScreenGameplayHUD
    });
    j.screens.ScreenGameplayMenu = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._addElement(new l.Element({
            asset: "ui/menu/pause_menu",
            x: c.ConstantsApp.STAGE_WIDTH /
                2,
            y: c.ConstantsApp.STAGE_HEIGHT / 2,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X, 120, "paused", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_WIDTH / 2 + 65, 230, new g.WorkinPoint(0.5, 0.5), "ui/menu/pause_help_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventHelpClick));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_WIDTH / 2 - 65, 230, new g.WorkinPoint(0.5,
            0.5), "ui/menu/pause_play_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventResumeClick));
        this._addElement(new j.buttons.ButtonSoundToggle(c.ConstantsApp.STAGE_WIDTH / 2 - 60, 370, new g.WorkinPoint(0.5, 0.5), ["ui/menu/pause_soundon_button", "ui/menu/pause_soundon_button", "ui/menu/pause_soundon_button"], ["ui/menu/pause_soundoff_button", "ui/menu/pause_soundoff_button", "ui/menu/pause_soundoff_button"]))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this,
            this._onEventSoundToggleClick));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_WIDTH / 2 + 60, 370, new g.WorkinPoint(0.5, 0.5), "ui/menu/pause_quit_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventQuitClick))
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenGameplayMenu"] = j.screens.ScreenGameplayMenu;
    j.screens.ScreenGameplayMenu.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenGameplayMenu".split(",");
    j.screens.ScreenGameplayMenu.__super__ =
        j.screens.ScreenBase;
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
    j.screens.ScreenGeneric = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._flagHasSpaceAction = !1
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenGeneric"] = j.screens.ScreenGeneric;
    j.screens.ScreenGeneric.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenGeneric".split(",");
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
    j.screens.ScreenHelp = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._addElement(new l.Element({
            x: c.ConstantsApp.STAGE_CENTER_X,
            y: c.ConstantsApp.STAGE_CENTER_Y,
            origin: new g.WorkinPoint(0.5, 0.5),
            asset: "ui/help/help_menu"
        }));
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X, 155, "help", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        a = e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) ? "_t" : "";
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X, 220, "helpText" + a, "", {
            origin: new g.WorkinPoint(0.5),
            spacing: 12
        }));
        this._addElement(a = new j.buttons.ButtonBase(c.ConstantsApp.STAGE_CENTER_X, 380, new g.WorkinPoint(0.5, 0.5), "ui/help/help_play_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            u(this, this._onEventPlayClick));
        a.addText(new l.TextLocalized(0, 0, "back", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }))
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenHelp"] = j.screens.ScreenHelp;
    j.screens.ScreenHelp.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenHelp".split(",");
    j.screens.ScreenHelp.__super__ = j.screens.ScreenBase;
    j.screens.ScreenHelp.prototype = t(j.screens.ScreenBase.prototype, {
        _onEventPlayClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_HELP_CLOSE)
        },
        __class__: j.screens.ScreenHelp
    });
    j.screens.ScreenIntro = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._episode = e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE);
        this._scene = 1;
        this._interSceneState = 0;
        this._addElement(this._screenA = new l.Element({}));
        this._addElement(this._screenB = new l.Element({}));
        this._addElement(this._manipulatedObject = new l.Element({}));
        this._addElement(this._secondaryObject = new l.Element({}));
        this._firstScreen = !0;
        this._done = !1;
        this._fading = !0;
        this._addElement(this._portrait = new h.elements.Portrait(0, 0, ""));
        this._addElement(this._text = new l.TextLocalized(0, 0, "", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(this._skipButton = new j.buttons.ButtonBase(838, 520, new g.WorkinPoint(0.5, 0.5), "buttonSkip"))._dispatcher.addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventProceed));
        this._skipButton.addText(new l.TextLocalized(0, -10, "skip_scene", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        e.WorkinCloud.instance._getSound().playMusic("AssetAudioIntroMusic");
        this._setupScenes()
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenIntro"] = j.screens.ScreenIntro;
    j.screens.ScreenIntro.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenIntro".split(",");
    j.screens.ScreenIntro.__super__ = j.screens.ScreenBase;
    j.screens.ScreenIntro.prototype = t(j.screens.ScreenBase.prototype, {
        _doEpisode1: function(a) {
            switch (this._scene) {
                case 2:
                    0 >= this._interSceneState && 4.5 > this._sceneTimer && (this._portrait.appear(170, 170, "spongebob_squarepants", "intro_1_1"), this._interSceneState++);
                    1 >= this._interSceneState && 1.5 > this._sceneTimer && (this._portrait.disappear(), this._interSceneState++);
                    break;
                case 3:
                    0 >= this._interSceneState && 0.3 > this._sceneTimer && (this._text._getPos().to(500, 58), this._text._getRenderable().alpha = 0, this._text._setText("intro_1_2"), this._interSceneState++);
                    1 == this._interSceneState && (this._text._getRenderable().alpha += a);
                    break;
                case 4:
                    this._text._getRenderable().alpha += a;
                    break;
                case 5:
                    0 >= this._interSceneState && (this._text._getRenderable().alpha -= a, 7 > this._sceneTimer &&
                        (this._portrait.appear(140, 130, "patrick_star", "intro_1_3"), this._interSceneState++));
                    1 >= this._interSceneState && 6.5 > this._sceneTimer && (this._text._getPos().to(700, 30), this._text._setText("intro_1_4"), this._text._getRenderable().alpha = 1, this._interSceneState++);
                    2 >= this._interSceneState && 3.5 > this._sceneTimer && (this._portrait.disappear(), this._text._getRenderable().alpha = 0, this._interSceneState++);
                    3 >= this._interSceneState && 3.2 > this._sceneTimer && (this._text._setText("intro_1_5"), this._text._getPos().to(272,
                        235), this._text._getRenderable().alpha = 1, this._interSceneState++);
                    4 >= this._interSceneState && 0.5 > this._sceneTimer && (this._text._getRenderable().alpha = 0, this._interSceneState++);
                    break;
                case 6:
                    0 >= this._interSceneState && 4.66 > this._sceneTimer && (this._addElement(this._manipulatedObject = new l.Element({
                        x: 590,
                        y: 210,
                        origin: new g.WorkinPoint(0.5, 1),
                        asset: "exclamation"
                    })), this._manipulatedObject._getRenderable().scaleX = this._manipulatedObject._getRenderable().scaleY = 0, this._text._setText("intro_1_6"), this._text._getPos().to(160,
                        720), this._text._getRenderable().alpha = 1, this._tweener.setStartFromPoint(this._text._getPos()), this._tweener.addTween(new g.WorkinPoint(this._text._getPos().x, 520), 1, g.tween.PennerManager.EASE_OUT), this._tweener.start(), this._interSceneState++);
                    1 == this._interSceneState && (this._text._getPos().to(157 + 6 * Math.random(), this._tweener._getCurrent().y), 1 > this._manipulatedObject._getRenderable().scaleX && (this._manipulatedObject._getRenderable().scaleX = this._manipulatedObject._getRenderable().scaleY += 2.5 * a,
                        1 < this._manipulatedObject._getRenderable().scaleX && (this._manipulatedObject._getRenderable().scaleX = this._manipulatedObject._getRenderable().scaleY = 1)), 1 == this._manipulatedObject._getRenderable().scaleX && (this._manipulatedObject._getRenderable().alpha -= 2 * a), this._tweener._getBoolAllTweensComplete() && this._interSceneState++);
                    2 >= this._interSceneState && 3.5 > this._sceneTimer && (this._portrait.appear(140, 130, "monster_x", "intro_1_7"), this._interSceneState++);
                    3 == this._interSceneState && (this._text._getRenderable().alpha -=
                        a, this._manipulatedObject._getRenderable().alpha -= 2 * a, 0 >= this._text._getRenderable().alpha && this._interSceneState++);
                    4 >= this._interSceneState && 1 > this._sceneTimer && (this._portrait.disappear(), this._interSceneState++);
                    break;
                case 7:
                    0 >= this._interSceneState && (this._skipButton.changeText("play_scene"), this._interSceneState++)
            }
        },
        _doEpisode2: function(a) {
            switch (this._scene) {
                case 1:
                    this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x;
                    this._tweener._getBoolAllTweensComplete() &&
                        0 < this._sceneTimer && (this._sceneTimer = 0);
                    break;
                case 2:
                    this._text._getRenderable().alpha -= a;
                    this._screenA._getPos().y = this._tweener._getCurrent().y + 666;
                    this._screenB._getPos().y = this._tweener._getCurrent().y;
                    this._tweener._getBoolAllTweensComplete() && 4 < this._sceneTimer && (this._sceneTimer = 4);
                    0 >= this._interSceneState && 3.5 > this._sceneTimer && (this._interSceneState++, this._portrait.appear(760, 130, "island_sandy", "intro_2_1"));
                    1 >= this._interSceneState && 0.5 > this._sceneTimer && (this._portrait.disappear(), this._interSceneState++);
                    break;
                case 3:
                    0 >= this._interSceneState && 1.5 > this._sceneTimer && (this._interSceneState++, this._text._setText("intro_2_2"), this._text._getPos().to(180, 90), this._text._getRenderable().alpha = 1);
                    break;
                case 4:
                    this._text._getRenderable().alpha -= a;
                    this._screenA._getPos().y = this._tweener._getCurrent().y + 666;
                    this._screenB._getPos().y = this._tweener._getCurrent().y;
                    this._manipulatedObject._getRenderable().rotation -= 360 * a;
                    this._tweener._getBoolAllTweensComplete() && (this._sceneTimer = 0);
                    break;
                case 5:
                    0 >= this._interSceneState &&
                        7.5 > this._sceneTimer && (this._text._setText("intro_2_3"), this._text._getPos().to(310, 50), this._text._getRenderable().alpha = 1, this._interSceneState++), 1 >= this._interSceneState && 5 > this._sceneTimer && (this._text._getRenderable().alpha = 0, this._interSceneState++), 2 >= this._interSceneState && 4 > this._sceneTimer && (this._interSceneState++, this._portrait.appear(170, 170, "spongebob_squarepants", "intro_1_1")), 3 >= this._interSceneState && 1 > this._sceneTimer && (this._interSceneState++, this._portrait.disappear(), this._skipButton.changeText("play_scene"))
            }
        },
        _doEpisode3: function(a) {
            switch (this._scene) {
                case 1:
                    this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x;
                    break;
                case 2:
                case 3:
                    this._text._getRenderable().alpha -= a;
                    this._manipulatedObject._setPos(this._tweener._getCurrent());
                    this._manipulatedObject._getRenderable().rotation += 45 * a;
                    this._tweener._getBoolAllTweensComplete() && (this._sceneTimer = 0);
                    break;
                case 4:
                    this._manipulatedObject._setPos(this._tweener._getCurrent());
                    1 != this._interSceneState && (this._manipulatedObject._getRenderable().rotation +=
                        45 * a);
                    0 == this._interSceneState && 4 >= this._sceneTimer && (this._tweener.stop(), g.tween.WorkinTweener._getInstance().stopAllTweens(), this._portrait.appear(170, 170, "spongebob_squarepants", "intro_1_1"), this._interSceneState++);
                    1 == this._interSceneState && 1 >= this._sceneTimer && (this._portrait.disappear(), this._tweener.start(), g.tween.WorkinTweener._getInstance().tween(this._screenB._getPos(), 1, {
                        x: 0,
                        y: -464
                    }, null, g.tween.PennerManager.EASE_LINEAR), this._interSceneState++);
                    break;
                case 5:
                    0 == this._interSceneState &&
                        (this._screenB._getRenderable().alpha += a, 1.5 <= this._screenB._getRenderable().alpha && this._interSceneState++);
                    1 == this._interSceneState && (this._text._getRenderable().alpha = 1, this._text._getPos().to(480, 280), this._text._setText("intro_3_1"), this._interSceneState++);
                    2 == this._interSceneState && 0.5 >= this._sceneTimer && (this._text._getRenderable().alpha = 0, this._interSceneState++, this._fading = !0);
                    break;
                case 6:
                    0 == this._interSceneState && 5.5 > this._sceneTimer && (this._text._setText("intro_3_2"), this._text._getRenderable().alpha =
                        1, this._interSceneState++), 1 == this._interSceneState && 3 > this._sceneTimer && (this._interSceneState++, this._portrait.appear(150, 160, "monster_y", "intro_3_3")), 2 == this._interSceneState && 2.5 > this._sceneTimer && (this._text._getRenderable().alpha = 0, this._interSceneState++), 3 == this._interSceneState && 0.5 > this._sceneTimer && (this._interSceneState++, this._portrait.disappear())
            }
        },
        _doEpisode4: function(a) {
            switch (this._scene) {
                case 1:
                    this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x;
                    break;
                case 2:
                    this._text._getRenderable().alpha -= a;
                    break;
                case 3:
                    this._text._getRenderable().alpha -= a;
                    0 == this._interSceneState && 4 > this._sceneTimer && (this._portrait.appear(170, 170, "spongebob_squarepants", "intro_1_1"), this._interSceneState++);
                    1 == this._interSceneState && 1 > this._sceneTimer && (this._portrait.disappear(), this._interSceneState++);
                    break;
                case 5:
                    this._text._getRenderable().alpha -= a;
                    break;
                case 8:
                    0 == this._interSceneState && (this._text._getRenderable().alpha += a);
                    0 == this._interSceneState && 0.5 > this._sceneTimer &&
                        (this._text._getRenderable().alpha = 0, this._interSceneState++);
                    break;
                case 9:
                    0 == this._interSceneState && 3.5 > this._sceneTimer && (this._interSceneState++, this._text._setText("intro_4_3"), this._text._getRenderable().alpha = 1);
                    1 == this._interSceneState && 0.5 > this._sceneTimer && (this._interSceneState++, this._text._getRenderable().alpha = 0);
                    break;
                case 11:
                    0 == this._interSceneState && 3.5 > this._sceneTimer && (this._interSceneState++, this._portrait.appear(800, 170, "monster_z", "intro_4_4")), 1 == this._interSceneState && 0.5 >
                        this._sceneTimer && (this._interSceneState++, this._portrait.disappear(), this._skipButton.changeText("play_scene"))
            }
        },
        _doEpisode5: function(a) {
            switch (this._scene) {
                case 1:
                    this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x;
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                    this._text._getRenderable().alpha -= a;
                    break;
                case 6:
                    0 == this._interSceneState && 4 > this._sceneTimer && (this._portrait.appear(170, 170, "spongebob_squarepants", "intro_1_1"), this._interSceneState++);
                    1 == this._interSceneState &&
                        1 > this._sceneTimer && (this._portrait.disappear(), this._interSceneState++);
                    break;
                case 7:
                    this._manipulatedObject._getPos().x = this._tweener._getCurrent().x;
                    0 == this._interSceneState && 2 > this._sceneTimer && (this._text._setText("intro_5_1"), this._text._getPos().to(210, 180), this._text._getRenderable().alpha = 1, this._interSceneState++);
                    1 == this._interSceneState && 0.5 > this._sceneTimer && (this._interSceneState++, this._text._getRenderable().alpha = 0);
                    break;
                case 8:
                    this._secondaryObject._getPos().x = this._tweener._getCurrent().x,
                        this._secondaryObject._renderOffset.y = 16 * Math.random() - 8, 0 == this._interSceneState && 7 > this._sceneTimer && (this._text._setText("intro_5_2"), this._text._getRenderable().alpha = 1, this._interSceneState++), 1 == this._interSceneState && 4 > this._sceneTimer && (this._interSceneState++, this._text._getRenderable().alpha = 0), 2 == this._interSceneState && 3.5 > this._sceneTimer && (this._portrait.appear(170, 170, "monster_questionmark", "intro_5_3"), this._interSceneState++), 3 == this._interSceneState && 0.5 > this._sceneTimer && (this._portrait.disappear(),
                            this._interSceneState++, this._skipButton.changeText("play_scene"))
            }
        },
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a);
            this._tweener._getBoolAllTweensComplete() || this._tweener.update(a);
            this._fading && (this._firstScreen ? this._screenB._getRenderable().alpha += 3 * a : this._screenB._getRenderable().alpha -= 3 * a);
            this._sceneTimer -= a;
            0 >= this._sceneTimer && (this._scene++, this._setupScenes());
            switch (this._episode) {
                case 1:
                    this._doEpisode1(a);
                    break;
                case 2:
                    this._doEpisode2(a);
                    break;
                case 3:
                    this._doEpisode3(a);
                    break;
                case 4:
                    this._doEpisode4(a);
                    break;
                case 5:
                    this._doEpisode5(a)
            }
        },
        _setupScenes: function() {
            this._interSceneState = 0;
            if (this._done) this._sceneTimer = 9999;
            else switch (this._episode) {
                case 1:
                    this._firstScreen ? (this._screenA.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 1) : (this._screenB.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                            this._sceneTimer = 2;
                            break;
                        case 2:
                            this._sceneTimer = 5;
                            break;
                        case 3:
                            this._sceneTimer = 1;
                            break;
                        case 4:
                            this._sceneTimer = 1;
                            break;
                        case 5:
                            this._text._getRenderable().alpha = 1;
                            this._sceneTimer = 8;
                            break;
                        case 6:
                            this._sceneTimer = 5, this._done = !0
                    }
                    break;
                case 2:
                    switch (this._scene) {
                        case 1:
                            this._fading = !1;
                            this._screenA._getPos().y = -106;
                            this._screenA.setTexture("scroll_bottom");
                            this._screenB._getPos().y = -772;
                            this._screenB.setTexture("scroll_top");
                            this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y);
                            this._text._setText("dragonballz");
                            this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 4;
                            this._tweener.setStart(0, 0);
                            this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            this._sceneTimer = 9999;
                            break;
                        case 2:
                            this._text._getRenderable().alpha = 2;
                            this._tweener.setStartFromPoint(this._screenB._getPos());
                            this._tweener.addTween(new g.WorkinPoint(0, 0), 3, g.tween.PennerManager.EASE);
                            this._tweener.start();
                            this._sceneTimer = 9999;
                            break;
                        case 3:
                            this._fading = !0;
                            this._firstScreen = !1;
                            this._screenA.setTexture("between_scrolls");
                            this._screenA._getPos().y = 0;
                            this._sceneTimer = 2;
                            break;
                        case 4:
                            this._fading = !1;
                            this._text._getRenderable().alpha = 2;
                            this._screenB._getRenderable().alpha = 1;
                            this._screenB.setTexture("scroll2_top");
                            this._screenA._getPos().y = 666;
                            this._screenA.setTexture("scroll2_bottom");
                            this._manipulatedObject.setTexture("staff");
                            this._manipulatedObject._getPos().to(600, 272);
                            this._manipulatedObject.setOrigin(new g.WorkinPoint(0.5, 0.5));
                            this._manipulatedObject._getRenderable().rotation = -90;
                            g.tween.WorkinTweener._getInstance().tween(this._manipulatedObject._getPos(),
                                3, {
                                    x: 480,
                                    y: 349
                                }, null, g.tween.PennerManager.EASE_IN);
                            this._tweener.setStartFromPoint(this._screenB._getPos());
                            this._tweener.addTween(new g.WorkinPoint(0, -772), 3, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            this._sceneTimer = 9999;
                            break;
                        case 5:
                            this._manipulatedObject._getRenderable().visible = !1, this._screenA._getPos().y = 0, this._screenA.setTexture("after_scrolls"), this._sceneTimer = 8, this._done = !0
                    }
                    break;
                case 3:
                    this._fading && (this._firstScreen ? (this._screenA.setTexture("intro/i" + this._episode + "_" +
                        this._scene), this._screenB._getRenderable().alpha = 1) : (this._screenB.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0));
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                            this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y);
                            this._text._setText("dragonballz");
                            this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 4;
                            this._tweener.setStart(0, 0);
                            this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            this._sceneTimer = 1.5;
                            break;
                        case 2:
                            this._sceneTimer = 0.2;
                            this._manipulatedObject._getPos().to(282, 118);
                            this._manipulatedObject.setTexture("falling_sb_small");
                            this._manipulatedObject.setOrigin(new g.WorkinPoint(0.5, 0.5));
                            this._tweener.setStartFromPoint(this._manipulatedObject._getPos());
                            this._tweener.addTween(new g.WorkinPoint(920, 700), 2, g.tween.PennerManager.EASE_LINEAR, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            break;
                        case 3:
                            this._sceneTimer = 9999;
                            break;
                        case 4:
                            this._sceneTimer =
                                5;
                            this._manipulatedObject.setTexture("falling_sb");
                            this._manipulatedObject._getPos().to(480, -120);
                            this._tweener.setStartFromPoint(this._manipulatedObject._getPos());
                            this._tweener.addTween(new g.WorkinPoint(480, 700), 2, g.tween.PennerManager.EASE_LINEAR);
                            this._tweener.start();
                            g.tween.WorkinTweener._getInstance().tween(this._screenB._getPos(), 2, {
                                x: 0,
                                y: -464
                            }, null, g.tween.PennerManager.EASE_IN);
                            break;
                        case 5:
                            this._fading = !1;
                            this._screenB._getRenderable().alpha = 0;
                            this._sceneTimer = 4;
                            break;
                        case 6:
                            this._sceneTimer =
                                6;
                            this._screenB._getPos().y = 0;
                            break;
                        case 7:
                            this._skipButton.changeText("play_scene"), this._text._setText("intro_3_4"), this._text._getRenderable().alpha = 1, this._sceneTimer = 9999, this._done = !0
                    }
                    break;
                case 4:
                    this._firstScreen ? (this._screenA.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 1) : (this._screenB.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                            this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X,
                                c.ConstantsApp.STAGE_CENTER_Y);
                            this._text._setText("dragonballz");
                            this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 4;
                            this._tweener.setStart(0, 0);
                            this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            this._sceneTimer = 1;
                            break;
                        case 2:
                            this._sceneTimer = 0.6;
                            break;
                        case 3:
                            this._sceneTimer = 5;
                            break;
                        case 4:
                        case 6:
                        case 7:
                            this._sceneTimer = 1;
                            break;
                        case 5:
                            this._sceneTimer = 2;
                            this._text._getPos().to(550, 290);
                            this._text._setText("intro_4_1");
                            this._text._getRenderable().alpha =
                                1;
                            break;
                        case 8:
                            this._sceneTimer = 4;
                            this._text._getPos().to(480, 145);
                            this._text._setText("intro_4_2");
                            this._text._getRenderable().alpha = 0;
                            break;
                        case 9:
                            this._sceneTimer = 4;
                            break;
                        case 10:
                            this._sceneTimer = 1;
                            break;
                        case 11:
                            this._sceneTimer = 4, this._done = !0
                    }
                    break;
                case 5:
                    this._firstScreen ? (this._screenA.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 1) : (this._screenB.setTexture("intro/i" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                            this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y);
                            this._text._setText("dragonballz");
                            this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 4;
                            this._tweener.setStart(0, 0);
                            this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            this._sceneTimer = 1;
                            break;
                        case 2:
                            this._sceneTimer = 1;
                            break;
                        case 3:
                        case 4:
                        case 5:
                            this._sceneTimer = 0.5;
                            break;
                        case 6:
                            this._sceneTimer = 4;
                            break;
                        case 7:
                            this._sceneTimer = 2;
                            this._manipulatedObject._getPos().to(960, 280);
                            this._manipulatedObject.setOrigin(new g.WorkinPoint(0, 0.5));
                            this._manipulatedObject.setTexture("intro/monster");
                            this._tweener.setStartFromPoint(this._manipulatedObject._getPos());
                            this._tweener.addTween(new g.WorkinPoint(625), 1, g.tween.PennerManager.EASE_OUT);
                            this._tweener.start();
                            break;
                        case 8:
                            this._secondaryObject._getPos().to(0, 280), this._secondaryObject.setOrigin(new g.WorkinPoint(1, 0.5)), this._secondaryObject.setTexture("intro/rock"),
                                this._tweener.setStartFromPoint(this._secondaryObject._getPos()), this._tweener.addTween(new g.WorkinPoint(416), 4, g.tween.PennerManager.EASE_LINEAR), this._tweener.start(), this._sceneTimer = 8, this._done = !0
                    }
                    break;
                default:
                    null
            }
        },
        _onEventProceed: function() {
            this._doFlowEvent(c.ConstantsScreen.FLOW_INTRO_CONTINUE)
        },
        __class__: j.screens.ScreenIntro
    });
    j.screens.ScreenLoading = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._timerSpin = 0.25;
        this._textAdded = !1;
        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LOCAL_TEXT_LOADED) &&
            (this._addElement(new j.display.DisplayLoadingProgress(130, c.ConstantsApp.STAGE_CENTER_Y + 175)), this._textAdded = !0)
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenLoading"] = j.screens.ScreenLoading;
    j.screens.ScreenLoading.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenLoading".split(",");
    j.screens.ScreenLoading.__super__ = j.screens.ScreenBase;
    j.screens.ScreenLoading.prototype = t(j.screens.ScreenBase.prototype, {
        dispose: function() {
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a);
            !this._textAdded && e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_LOCAL_TEXT_LOADED) && (this._addElement(new j.display.DisplayLoadingProgress(130, c.ConstantsApp.STAGE_CENTER_Y + 175)), "en" != e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID) && this._addElement(this._localText = new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X, 200, "loading", "", {
                origin: new g.WorkinPoint(0.5, 0.5)
            })), this._textAdded = !0)
        },
        __class__: j.screens.ScreenLoading
    });
    j.screens.ScreenOutro = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._episode = e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE);
        this._scene = 1;
        this._interSceneState = 0;
        this._addElement(this._screenA = new l.Element({}));
        this._addElement(this._screenB = new l.Element({}));
        this._addElement(this._manipulatedObject = new l.Element({}));
        this._fading = this._firstScreen = !0;
        this._done = !1;
        this._addElement(this._portrait = new h.elements.Portrait(0, 0, ""));
        this._addElement(this._text =
            new l.TextLocalized(0, 0, "", "", {
                origin: new g.WorkinPoint(0.5, 0.5)
            }));
        this._addElement(this._skipButton = new j.buttons.ButtonBase(838, 520, new g.WorkinPoint(0.5, 0.5), "buttonSkip"))._dispatcher.addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventProceed));
        this._skipButton.addText(new l.TextLocalized(0, -10, "skip_scene", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._setupScenes()
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenOutro"] = j.screens.ScreenOutro;
    j.screens.ScreenOutro.__name__ =
        "com,nick,spongebob,monster_island,ui,screens,ScreenOutro".split(",");
    j.screens.ScreenOutro.__super__ = j.screens.ScreenBase;
    j.screens.ScreenOutro.prototype = t(j.screens.ScreenBase.prototype, {
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this, a);
            this._tweener._getBoolAllTweensComplete() || this._tweener.update(a);
            this._fading && (this._firstScreen ? this._screenB._getRenderable().alpha += 3 * a : this._screenB._getRenderable().alpha -= 3 * a);
            this._sceneTimer -= a;
            0 >= this._sceneTimer && (this._scene++, this._setupScenes());
            switch (this._episode) {
                case 1:
                    switch (this._scene) {
                        case 2:
                            this._screenA._getPos().y = this._tweener._getCurrent().y + 666;
                            this._screenB._getPos().y = this._tweener._getCurrent().y;
                            this._tweener._getBoolAllTweensComplete() && 2 < this._sceneTimer && (this._sceneTimer = 2);
                            break;
                        case 3:
                            this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x
                    }
                    break;
                case 2:
                    switch (this._scene) {
                        case 2:
                        case 3:
                            0 >= this._interSceneState && (this._manipulatedObject._setPos(this._tweener._getCurrent()),
                                this._manipulatedObject._getRenderable().rotation += 45 * a), this._tweener._getBoolAllTweensComplete() && 0 >= this._interSceneState && (this._interSceneState++, e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y), this._text._setText("cliffhangur"), this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 0, this._text._getRenderable().rotation = 15, this._tweener.setStart(0, 0), this._tweener.addTween(new g.WorkinPoint(1.5),
                                1, g.tween.PennerManager.EASE_BOUNCE_OUT), this._tweener.start(), this._skipButton.changeText("play_scene")), 1 == this._interSceneState && (this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x)
                    }
                    break;
                case 3:
                    5 <= this._scene && (0 == this._interSceneState && (this._interSceneState++, this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y), e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._text._setText("cliffhangur"),
                        this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 0, this._text._getRenderable().rotation = 15, this._tweener.setStart(0, 0), this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_BOUNCE_OUT), this._tweener.start(), this._skipButton.changeText("play_scene")), 1 == this._interSceneState && (this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x));
                    break;
                case 4:
                    7 <= this._scene && (0 == this._interSceneState && (this._interSceneState++,
                            this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y), e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._text._setText("cliffhangur"), this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 0, this._text._getRenderable().rotation = 15, this._tweener.setStart(0, 0), this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_BOUNCE_OUT), this._tweener.start(), this._skipButton.changeText("play_scene")), 1 == this._interSceneState &&
                        (this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = this._tweener._getCurrent().x));
                    break;
                case 5:
                    switch (this._scene) {
                        case 2:
                        case 4:
                        case 6:
                            this._screenB._renderOffset.x = 96 * -Math.random();
                            this._screenB._renderOffset.y = 56 * -Math.random();
                            break;
                        case 8:
                            this._text._getRenderable().alpha -= a;
                            break;
                        case 16:
                            this._manipulatedObject._getPos().toPoint(this._tweener._getCurrent());
                            this._manipulatedObject._getRenderable().scaleX = this._manipulatedObject._getRenderable().scaleY = 1 - this._tweener._getProgressRatio();
                            this._manipulatedObject._getRenderable().rotation -= 145 * a;
                            break;
                        case 17:
                            this._tweener._getBoolAllTweensComplete() || (this._manipulatedObject._getPos().toPoint(this._tweener._getCurrent()), this._manipulatedObject._getRenderable().scaleX = this._manipulatedObject._getRenderable().scaleY = 1 - this._tweener._getProgressRatio(), this._manipulatedObject._getRenderable().rotation -= 145 * a), this._tweener._getBoolAllTweensComplete() && 0 == this._interSceneState && (this._manipulatedObject._getRenderable().scaleX = this._manipulatedObject._getRenderable().scaleY =
                                1, this._manipulatedObject.setTexture("glitter"), this._interSceneState++), 1 == this._interSceneState && (this._manipulatedObject._getRenderable().alpha -= a, this._manipulatedObject._getRenderable().rotation += 45 * a, 0 > this._manipulatedObject._getRenderable().alpha && (this._interSceneState++, this._sceneTimer = 2)), 2 == this._interSceneState && 1 > this._sceneTimer && (e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._text._getPos().to(480, 280), this._text._getRenderable().alpha = 1, this._text._setText("fin"),
                                this._skipButton.changeText("play_scene"), this._interSceneState++)
                    }
            }
        },
        _setupScenes: function() {
            this._interSceneState = 0;
            if (this._done) this._sceneTimer = 9999;
            else switch (this._episode) {
                case 1:
                    switch (this._scene) {
                        case 1:
                            this._fading = !1;
                            this._screenA._getPos().y = -106;
                            this._screenA.setTexture("scroll0_bottom");
                            this._screenB._getPos().y = -772;
                            this._screenB.setTexture("scroll0_top");
                            this._sceneTimer = 1.5;
                            break;
                        case 2:
                            this._tweener.setStartFromPoint(this._screenB._getPos());
                            this._tweener.addTween(new g.WorkinPoint(0,
                                0), 3, g.tween.PennerManager.EASE);
                            this._tweener.start();
                            this._sceneTimer = 9999;
                            break;
                        case 3:
                            e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._text._getPos().to(c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y), this._text._setText("cliffhangur"), this._text._getRenderable().scaleX = this._text._getRenderable().scaleY = 0, this._text._getRenderable().rotation = 15, this._tweener.setStart(0, 0), this._tweener.addTween(new g.WorkinPoint(1.5), 1, g.tween.PennerManager.EASE_BOUNCE_OUT),
                                this._tweener.start(), this._sceneTimer = 9999, this._skipButton.changeText("play_scene"), this._done = !0
                    }
                    break;
                case 2:
                    this._firstScreen ? (this._screenA.setTexture("outro/o" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 1) : (this._screenB.setTexture("outro/o" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                            this._sceneTimer = 0.5;
                            break;
                        case 2:
                            this._sceneTimer = 0.2;
                            this._manipulatedObject._getPos().to(282,
                                118);
                            this._manipulatedObject.setTexture("falling_sb_small");
                            this._manipulatedObject.setOrigin(new g.WorkinPoint(0.5, 0.5));
                            this._tweener.setStartFromPoint(this._manipulatedObject._getPos());
                            this._tweener.addTween(new g.WorkinPoint(920, 666), 2, g.tween.PennerManager.EASE_LINEAR, g.tween.PennerManager.EASE_IN);
                            this._tweener.start();
                            break;
                        case 3:
                            this._sceneTimer = 9999, this._done = !0
                    }
                    break;
                case 3:
                    this._firstScreen ? (this._screenA.setTexture("outro/o" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha =
                        1) : (this._screenB.setTexture("outro/o" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                        case 2:
                        case 3:
                            this._sceneTimer = 0.6;
                            break;
                        case 4:
                            this._sceneTimer = 0.6, this._done = !0
                    }
                    break;
                case 4:
                    this._firstScreen ? (this._screenA.setTexture("outro/o" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 1) : (this._screenB.setTexture("outro/o" + this._episode + "_" + this._scene), this._screenB._getRenderable().alpha = 0);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                        case 2:
                            this._sceneTimer = 1;
                            break;
                        case 3:
                        case 4:
                        case 5:
                            this._sceneTimer = 0.5;
                            break;
                        case 6:
                            this._sceneTimer = 1, this._done = !0
                    }
                    break;
                case 5:
                    this._firstScreen ? (this._screenA.setTexture("outro/o" + this._episode + "_" + this._scene), this._fading ? this._screenB._getRenderable().alpha = 1 : this._screenB._getRenderable().alpha = 0) : (this._screenB.setTexture("outro/o" + this._episode + "_" + this._scene), this._fading ? this._screenB._getRenderable().alpha = 0 : this._screenB._getRenderable().alpha =
                        1);
                    this._firstScreen = !this._firstScreen;
                    switch (this._scene) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_LAST_GAME_WON, !1);
                            this._screenB._getRenderable().scaleX = this._screenB._getRenderable().scaleY = 1;
                            this._screenB._renderOffset.to(0, 0);
                            this._fading = !1;
                            this._sceneTimer = 1.2;
                            this._text._getRenderable().alpha = 0;
                            break;
                        case 2:
                            this._screenB._getRenderable().scaleX = this._screenB._getRenderable().scaleY = 1.1;
                            this._sceneTimer = 1.5;
                            this._text._getPos().to(480, 120);
                            this._text._setText("outro_5_1");
                            this._text._getRenderable().alpha = 1;
                            break;
                        case 4:
                            this._screenB._getRenderable().scaleX = this._screenB._getRenderable().scaleY = 1.1;
                            this._sceneTimer = 1.5;
                            this._text._setText("outro_5_2");
                            this._text._getRenderable().alpha = 1;
                            break;
                        case 6:
                            this._screenB._getRenderable().scaleX = this._screenB._getRenderable().scaleY = 1.1;
                            this._sceneTimer = 1.5;
                            this._text._setText("outro_5_3");
                            this._text._getRenderable().alpha = 1;
                            break;
                        case 8:
                            this._sceneTimer = 2;
                            this._text._setText("questionmark");
                            this._text._getPos().to(450, 145);
                            this._text._getRenderable().alpha = 1;
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            this._fading = !0;
                            this._sceneTimer = 0.75;
                            break;
                        case 13:
                        case 14:
                            this._sceneTimer = 1;
                            break;
                        case 15:
                            this._sceneTimer = 0.5;
                            break;
                        case 16:
                            this._sceneTimer = 0.75;
                            this._manipulatedObject._getPos().to(576, 280);
                            this._manipulatedObject.setOrigin(new g.WorkinPoint(0.5, 0.5));
                            this._manipulatedObject.setTexture("outro/characters");
                            this._tweener.setStartFromPoint(this._manipulatedObject._getPos());
                            this._tweener.addTween(new g.WorkinPoint(178, 108),
                                2, g.tween.PennerManager.EASE_OUT);
                            this._tweener.start();
                            break;
                        case 17:
                            this._sceneTimer = 9999, this._done = !0
                    }
                    break;
                default:
                    null
            }
        },
        _onEventProceed: function() {
            this._doFlowEvent(c.ConstantsScreen.FLOW_OUTRO_CONTINUE)
        },
        __class__: j.screens.ScreenOutro
    });
    j.screens.ScreenPauseAlert = function(a, b, d) {
        null == b && (b = "");
        j.screens.ScreenBase.call(this, a, b, d);
        this._alertBox = new p.FillSprite(0, c.ConstantsApp.STAGE_WIDTH | 0, c.ConstantsApp.STAGE_HEIGHT | 0);
        a = new N;
        a.add(this._alertBox);
        this._textureEntity.addChild(a);
        this._textAlert =
            this._addElement(new l.TextLocalized(50, 50, "orientation_portrait", "", {
                origin: new g.WorkinPoint(0, 0.5)
            }))
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenPauseAlert"] = j.screens.ScreenPauseAlert;
    j.screens.ScreenPauseAlert.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenPauseAlert".split(",");
    j.screens.ScreenPauseAlert.__super__ = j.screens.ScreenBase;
    j.screens.ScreenPauseAlert.prototype = t(j.screens.ScreenBase.prototype, {
        update: function(a) {
            j.screens.ScreenBase.prototype.update.call(this,
                a)
        },
        __class__: j.screens.ScreenPauseAlert
    });
    j.screens.ScreenQuitConfirm = function(a, b, d) {
        j.screens.ScreenBase.call(this, a, b, d);
        this._addElement(new l.Element({
            asset: "ui/quit_confirm/quit_prompt",
            x: c.ConstantsApp.STAGE_WIDTH / 2,
            y: c.ConstantsApp.STAGE_HEIGHT / 2,
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X, 150, "quit_confirm_header", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_CENTER_X - 90,
            220, new g.WorkinPoint(0.5, 0.5), "ui/quit_confirm/quit_yes", "ui/quit_confirm/quit_yes_hover", "ui/quit_confirm/quit_yes_hover"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onYesClick));
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X - 90, 260, "yes", "", {
            origin: new g.WorkinPoint(0.5)
        }));
        this._addElement(new j.buttons.ButtonBase(c.ConstantsApp.STAGE_CENTER_X + 90, 220, new g.WorkinPoint(0.5, 0.5), "ui/quit_confirm/quit_no", "ui/quit_confirm/quit_no_hover", "ui/quit_confirm/quit_no_hover"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            u(this, this._onNoClick));
        this._addElement(new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X + 90, 260, "no", "", {
            origin: new g.WorkinPoint(0.5)
        }))
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenQuitConfirm"] = j.screens.ScreenQuitConfirm;
    j.screens.ScreenQuitConfirm.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenQuitConfirm".split(",");
    j.screens.ScreenQuitConfirm.__super__ = j.screens.ScreenBase;
    j.screens.ScreenQuitConfirm.prototype = t(j.screens.ScreenBase.prototype, {
        _onNoClick: function() {
            this.getState() ==
                this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO)
        },
        _onYesClick: function() {
            this.getState() == this._STATE_OPENED && this._doFlowEvent(c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES)
        },
        dispose: function() {
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        __class__: j.screens.ScreenQuitConfirm
    });
    j.screens.ScreenScreenshot = function() {};
    k["com.nick.spongebob.monster_island.ui.screens.ScreenScreenshot"] = j.screens.ScreenScreenshot;
    j.screens.ScreenScreenshot.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenScreenshot".split(",");
    j.screens.ScreenScreenshot.__super__ = j.screens.ScreenBase;
    j.screens.ScreenScreenshot.prototype = t(j.screens.ScreenBase.prototype, {
        dispose: function() {
            j.screens.ScreenBase.prototype.dispose.call(this)
        },
        __class__: j.screens.ScreenScreenshot
    });
    j.screens.ScreenSplash = function(a, b, d) {
        null == b && (b = "");
        this._BLINK_TIME = 1;
        j.screens.ScreenBase.call(this, a, b, d);
        this._blinkTimer = this._BLINK_TIME;
        "en" != e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID) ? this._addElement(this._title = new l.TextLocalized(c.ConstantsApp.STAGE_CENTER_X,
            100, "title", "", {
                origin: new g.WorkinPoint(0.5, 0.5),
                center: !0
            })) : (this._addElement(this._title = new l.Element({
            x: c.ConstantsApp.STAGE_CENTER_X,
            y: -280,
            origin: new g.WorkinPoint(0.5),
            asset: "game_title"
        })), g.tween.WorkinTweener._getInstance().tween(this._title._getPos(), 2.2, {
            y: 20
        }, !0, "bounceOut", 0, null, null, !1), null);
        this._addElement(new l.Element({
            x: 0,
            y: 0,
            asset: "sb_logo"
        }));
        this._addElement(a = new j.buttons.ButtonBase(130, 450, new g.WorkinPoint(0.5, 0.5), "ui/splash/episode1_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            u(this, this._onEventEpisode1Selected));
        a.addText(new l.TextLocalized(0, 20, "play1", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(a = new j.buttons.ButtonBase(305, 470, new g.WorkinPoint(0.5, 0.5), "ui/splash/episode2_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventEpisode2Selected));
        a.addText(new l.TextLocalized(0, 25, "play2", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(a = new j.buttons.ButtonBase(480, 450, new g.WorkinPoint(0.5, 0.5), "ui/splash/episode3_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            u(this, this._onEventEpisode3Selected));
        a.addText(new l.TextLocalized(0, 20, "play3", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(a = new j.buttons.ButtonBase(655, 470, new g.WorkinPoint(0.5, 0.5), "ui/splash/episode4_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK, u(this, this._onEventEpisode4Selected));
        a.addText(new l.TextLocalized(0, 20, "play4", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        this._addElement(a = new j.buttons.ButtonBase(830, 450, new g.WorkinPoint(0.5, 0.5), "ui/splash/episode5_button"))._getDispatcher().addEventListener(j.buttons.ButtonBase.CLICK,
            u(this, this._onEventEpisode5Selected));
        a.addText(new l.TextLocalized(0, 40, "play5", "", {
            origin: new g.WorkinPoint(0.5, 0.5)
        }));
        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE);
        e.WorkinCloud.instance._getSound().playMusic("AssetAudioMenuMusic")
    };
    k["com.nick.spongebob.monster_island.ui.screens.ScreenSplash"] = j.screens.ScreenSplash;
    j.screens.ScreenSplash.__name__ = "com,nick,spongebob,monster_island,ui,screens,ScreenSplash".split(",");
    j.screens.ScreenSplash.__super__ = j.screens.ScreenBase;
    j.screens.ScreenSplash.prototype =
        t(j.screens.ScreenBase.prototype, {
            _onEventEpisode5Selected: function() {
                e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_EPISODE, 5);
                this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY)
            },
            _onEventEpisode4Selected: function() {
                e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_EPISODE, 4);
                this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY)
            },
            _onEventEpisode3Selected: function() {
                e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_EPISODE, 3);
                this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY)
            },
            _onEventEpisode2Selected: function() {
                e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_EPISODE,
                    2);
                this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY)
            },
            _onEventEpisode1Selected: function() {
                e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_EPISODE, 1);
                this._doFlowEvent(c.ConstantsScreen.FLOW_SPLASH_PLAY)
            },
            __class__: j.screens.ScreenSplash
        });
    j.screens.data = {};
    j.screens.data.ChangeActionData = function() {};
    k["com.nick.spongebob.monster_island.ui.screens.data.ChangeActionData"] = j.screens.data.ChangeActionData;
    j.screens.data.ChangeActionData.__name__ = "com,nick,spongebob,monster_island,ui,screens,data,ChangeActionData".split(",");
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
    j.screens.data.ScreenData = function(a, b, d, m, c) {
        null == m && (m = 0);
        null == d && (d = "");
        this.id = a;
        this.screenClass = b;
        this.assetClassName = d;
        this.layer = m;
        this.data = null == c ? new G : c
    };
    k["com.nick.spongebob.monster_island.ui.screens.data.ScreenData"] =
        j.screens.data.ScreenData;
    j.screens.data.ScreenData.__name__ = "com,nick,spongebob,monster_island,ui,screens,data,ScreenData".split(",");
    j.screens.data.ScreenData.prototype = {
        __class__: j.screens.data.ScreenData
    };
    j.screens.data.ScreenQueueData = function(a, b, d) {
        null == d && (d = "");
        this.screenData = a;
        this.openCondition = b;
        this.openTestString = d
    };
    k["com.nick.spongebob.monster_island.ui.screens.data.ScreenQueueData"] = j.screens.data.ScreenQueueData;
    j.screens.data.ScreenQueueData.__name__ = "com,nick,spongebob,monster_island,ui,screens,data,ScreenQueueData".split(",");
    j.screens.data.ScreenQueueData.prototype = {
        validateCondition: function(a, b) {
            null == b && (b = "");
            return this.openCondition == a ? "" == this.openTestString || this.openTestString == b : !1
        },
        __class__: j.screens.data.ScreenQueueData
    };
    j.screens.data.ScreenStateData = function(a, b, d, m, c, e) {
        this.id = a;
        this.animation = b;
        this.actionOnComplete = d;
        this.actionData = m;
        this.inFunc = c;
        this.outFunc = e
    };
    k["com.nick.spongebob.monster_island.ui.screens.data.ScreenStateData"] = j.screens.data.ScreenStateData;
    j.screens.data.ScreenStateData.__name__ =
        "com,nick,spongebob,monster_island,ui,screens,data,ScreenStateData".split(",");
    j.screens.data.ScreenStateData.prototype = {
        __class__: j.screens.data.ScreenStateData
    };
    j.transitions = {};
    j.transitions.TransitionBase = function(a, b, d, m) {
        null == m && (m = "");
        null == d && (d = !1);
        null == b && (b = !0);
        this._STATE_OUT = 3;
        this._STATE_IDLE = 2;
        this._STATE_IN = 1;
        this._STATE_HIDDEN = 0;
        this._transitionId = m;
        this._flagOutOnly = d;
        this.flagDispose = !1;
        l.Element.call(this, {
            asset: a
        });
        b ? this._setState(this._STATE_HIDDEN) : this._flagOutOnly ? this._setState(this._STATE_OUT) :
            this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.ui.transitions.TransitionBase"] = j.transitions.TransitionBase;
    j.transitions.TransitionBase.__name__ = "com,nick,spongebob,monster_island,ui,transitions,TransitionBase".split(",");
    j.transitions.TransitionBase.__super__ = l.Element;
    j.transitions.TransitionBase.prototype = t(l.Element.prototype, {
        dispose: function() {
            l.Element.prototype.dispose.call(this);
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
            l.Element.prototype.update.call(this, a)
        },
        _getIsOutro: function() {
            return this._state == this._STATE_OUT
        },
        __class__: j.transitions.TransitionBase,
        __properties__: t(l.Element.prototype.__properties__, {
            get_isOutro: "_getIsOutro"
        })
    });
    h = {
        World: function(a) {
            this._POOL_SPONGS = "_POOL_SPONGS";
            this._STATE_GAMEPLAY = 1;
            this._STATE_INITIALIZING = 0;
            n.WMEventDispatcher.call(this);
            this._timeline = a;
            this._timerCrystal = 0.2;
            this._scoreUp = this._spawnTimer = 0;
            this._helping = !0;
            this._helpinc = 0;
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_SCORE, 0);
            this._elementManager = new l.ElementManager(this._timeline, c.ConstantsApp.STAGE_CENTER_X, c.ConstantsApp.STAGE_CENTER_Y);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_BG_BACK);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_MIDBACK);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_BG_MID);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_BG);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_PLAYER, !0);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_FG);
            this._elementManager.addLayer(c.ConstantsApp.LAYER_BG_FRONT);
            e.WorkinCloud.instance.stack([u(this, this._initPools), u(this, this._initParticles), u(this, this._initPlayer), u(this, this._onGenerationComplete)]);
            c.ConstantsApp.HELP_WATCHED[e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) - 1] && (this._helping = !1);
            c.ConstantsApp.HELP_WATCHED[e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) -
                1] = !0;
            this._setState(this._STATE_INITIALIZING)
        }
    };
    k["com.nick.spongebob.monster_island.world.World"] = h.World;
    h.World.__name__ = "com,nick,spongebob,monster_island,world,World".split(",");
    h.World.__super__ = n.WMEventDispatcher;
    h.World.prototype = t(n.WMEventDispatcher.prototype, {
        _onGenerationComplete: function() {
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(c.ConstantsApp.EVENT_WORLD_GENERATION_COMPLETE))
        },
        _initPlayer: function() {
            switch (e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) {
                case 1:
                    e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_GROUND_LEVEL,
                        425);
                    this._gameTimer = 60;
                    this._backScroll = 500;
                    this._endTimer = 2;
                    this._player = this._elementManager.addElement(new h.elements.entities.episode1.E1Player);
                    this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._player)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll / 8, ["level1_sky"], c.ConstantsApp.LAYER_BG_BACK)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll /
                        1.2, ["level1_shore"], c.ConstantsApp.LAYER_MIDBACK, 2, null, 192)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll, ["level1_sand_first", "level1_sand_second"], c.ConstantsApp.LAYER_BG_MID, 3, null, 296)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 * this._backScroll, ["level1_grass2", "level1_sanddune", "level1_grass1"], c.ConstantsApp.LAYER_BG_FRONT, 5, null, 560, 1)));
                    break;
                case 2:
                    e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_GROUND_LEVEL,
                        450);
                    this._gameTimer = 90;
                    this._backScroll = 300;
                    this._endTimer = 3;
                    this._player = this._elementManager.addElement(new h.elements.entities.episode2.E2Player);
                    this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._player)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll / 8, ["level2_sky"], c.ConstantsApp.LAYER_BG_BACK)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll /
                        1.2, ["level2_bushes_first", "level2_bushes_second"], c.ConstantsApp.LAYER_BG_MID, 4, null, 93)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll, ["level2_sand"], c.ConstantsApp.LAYER_MIDBACK, 2, null, 300)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 * this._backScroll, ["level2_foreground_bottom"], c.ConstantsApp.LAYER_BG_FRONT, 3, null, 560, 1)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 *
                        this._backScroll, ["level2_foreground_top"], c.ConstantsApp.LAYER_BG_FRONT, 3)));
                    break;
                case 3:
                    e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_GROUND_LEVEL, 300);
                    this._gameTimer = 90;
                    this._backScroll = 300;
                    this._endTimer = 3;
                    this._player = this._elementManager.addElement(new h.elements.entities.episode3.E3Player);
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll, ["level3_background_first", "level3_background_second"], c.ConstantsApp.LAYER_MIDBACK, 4)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 *
                        this._backScroll, ["level3_tree", "level3_vines"], c.ConstantsApp.LAYER_BG_FRONT, 4)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 * this._backScroll, ["level3_plants_first", "level3_plants_second"], c.ConstantsApp.LAYER_BG_FRONT, 4, null, 560, 1)));
                    break;
                case 4:
                    e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_GROUND_LEVEL, 425);
                    this._gameTimer = 90;
                    this._backScroll = 200;
                    this._endTimer = 3;
                    this._player = this._elementManager.addElement(new h.elements.entities.episode4.E4Player);
                    this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._player)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(3, ["level4_sky"], c.ConstantsApp.LAYER_BG_BACK, 2, !0)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll, ["level4_ground_flat_first", "level4_ground_flat_second"], c.ConstantsApp.LAYER_MIDBACK, 4, null, 360)));
                    this._background[this._background.length - 1]._getRenderable().rotation = -10;
                    this._background[this._background.length - 1]._getPos().x = -91;
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 * this._backScroll, ["level4_foreground_flat_first", "level4_foreground_flat_second"], c.ConstantsApp.LAYER_BG_FRONT, 4, null, 470)));
                    this._background[this._background.length - 1]._getRenderable().rotation = -10;
                    this._background[this._background.length - 1]._getPos().x = -91;
                    break;
                case 5:
                    e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_GROUND_LEVEL, 560);
                    this._gameTimer =
                        90;
                    this._backScroll = 175;
                    this._endTimer = 3;
                    this._player = this._elementManager.addElement(new h.elements.entities.episode5.E5Player);
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(this._backScroll / 2, ["level5_background_first", "level5_background_second"], c.ConstantsApp.LAYER_MIDBACK, 4, null, 280, 0.5)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 * this._backScroll, ["level5_foreground_top_first", "level5_foreground_top_first"],
                        c.ConstantsApp.LAYER_BG_FRONT, 4)));
                    this._background.push(this._elementManager.addElement(new h.elements.BackgroundWrapper(2 * this._backScroll, ["level5_foreground_bottom_first", "level5_foreground_bottom_first"], c.ConstantsApp.LAYER_BG_FRONT, 4, null, 560, 1)));
                    break;
                default:
                    null
            }
        },
        _initParticles: function() {
            this._spongs = [];
            this._entities = [];
            this._background = [];
            this._shadowArray = []
        },
        _onEventInitPoolComplete: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(l.PoolManager.ALL_POOLS_FULL,
                u(this, this._onEventInitPoolComplete));
            e.WorkinCloud.instance.unpauseStack()
        },
        _initPools: function() {
            e.WorkinCloud.instance.setInt(c.ConstantsApp.INT_LOADING_PROGRESS, 100);
            e.WorkinCloud.instance.pauseStack();
            e.WorkinCloud.instance._getDispatcher().addEventListener(l.PoolManager.ALL_POOLS_FULL, u(this, this._onEventInitPoolComplete));
            this._poolManager = new l.PoolManager;
            this._poolManager.addPool(this._POOL_SPONGS, h.elements.TestElement, 3)
        },
        handleInput: function(a) {
            if (!(e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED) ||
                    this._state == this._STATE_INITIALIZING)) switch (a.input) {
                case c.ConstantsApp.INPUT_CLICK:
                    switch (a.phase) {
                        case n.WMEventInput.PHASE_DOWN:
                            if (900 < a.x && 120 > a.y || e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE)) return;
                            5 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) ? this._player.doSpecial({
                                pStart: !0
                            }) : this._player.doSpecial({});
                            break;
                        case n.WMEventInput.PHASE_UP:
                            5 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) && this._player.doSpecial({
                                pEnd: !0
                            })
                    }
                    break;
                case c.ConstantsApp.INPUT_SPACE:
                    switch (a.phase) {
                        case n.WMEventInput.PHASE_DOWN:
                            5 ==
                                e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) ? this._player.doSpecial({
                                    pStart: !0
                                }) : this._player.doSpecial({});
                            break;
                        case n.WMEventInput.PHASE_UP:
                            5 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) && this._player.doSpecial({
                                pEnd: !0
                            })
                    }
            }
        },
        _unpause: function() {
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !1)
        },
        _pause: function() {
            e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_PAUSED, !0)
        },
        _onUnpause: function() {
            this._unpause()
        },
        _onPause: function() {
            this._pause()
        },
        _e4SpawnShard: function(a) {
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Shard({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e3SplashEvent: function(a) {
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Splash({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e3SpawnShard: function(a) {
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Shard({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e3ShockEvent: function(a) {
            for (var b = 1, d = 0, m = this._entities; d < m.length;) {
                var f = m[d];
                ++d;
                f.getHostile() && b++;
                f.timeToGo()
            }
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Shock({
                x: a._getData().x,
                y: a._getData().y
            })));
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 100 * b)
        },
        _e3SpawnDustObject: function(a) {
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Dust({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e2ZapEnemies: function(a) {
            for (var b = 1, d = 0, m = this._entities; d < m.length;) {
                var f = m[d];
                ++d;
                f.getHostile() && b++;
                f.timeToGo()
            }
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Shard({
                x: a._getData().x,
                y: a._getData().y
            })));
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Shock({
                x: a._getData().x,
                y: a._getData().y
            })));
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 100 * b)
        },
        _e2SpawnDustObject: function(a) {
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Dust({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e1SpawnShard: function(a) {
            1 < this._entities.length && this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Shard({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e1SpawnDustObject: function(a) {
            1 < this._entities.length && this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Dust({
                x: a._getData().x,
                y: a._getData().y
            })))
        },
        _e1SpawnThrownObject: function(a) {
            this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1PlayerProjectile({
                x: a._getData().x,
                y: a._getData().y - this._player._getRenderable().height,
                shadow: this._player.shadowPoint()
            })));
            this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length -
                1])))
        },
        _onSpecialUp: function() {
            5 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) && this._player.doSpecial({
                pEnd: !0
            })
        },
        _onSpecialDown: function() {
            5 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) ? this._player.doSpecial({
                pStart: !0
            }) : this._player.doSpecial({})
        },
        _removeEventListeners: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_PAUSE, u(this, this._onPause));
            e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_UNPAUSE,
                u(this, this._onUnpause));
            e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPECIAL_DOWN, u(this, this._onSpecialDown));
            e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_SPECIAL_UP, u(this, this._onSpecialUp));
            switch (e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) {
                case 1:
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E1_SPAWN_THROW, u(this, this._e1SpawnThrownObject));
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E1_SPAWN_SHARD,
                        u(this, this._e1SpawnShard));
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST, u(this, this._e1SpawnDustObject));
                    break;
                case 2:
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST, u(this, this._e2SpawnDustObject));
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E2_ZAP_ENEMIES, u(this, this._e2ZapEnemies));
                    break;
                case 3:
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST,
                        u(this, this._e3SpawnDustObject));
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E3_SHOCK, u(this, this._e3ShockEvent));
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E3_SPAWN_SHARD, u(this, this._e3SpawnShard));
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E3_SPAWN_SPLASH, u(this, this._e3SplashEvent));
                    break;
                case 4:
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E4_SPAWN_SHARD,
                        u(this, this._e4SpawnShard));
                    break;
                case 5:
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E4_SPAWN_SHARD, u(this, this._e4SpawnShard));
                    break;
                default:
                    e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST, u(this, this._e2SpawnDustObject)), e.WorkinCloud.instance._getDispatcher().removeEventListener(c.ConstantsApp.EVENT_E2_ZAP_ENEMIES, u(this, this._e2ZapEnemies))
            }
        },
        _addEventListeners: function() {
            e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_PAUSE,
                u(this, this._onPause));
            e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_UNPAUSE, u(this, this._onUnpause));
            e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPECIAL_DOWN, u(this, this._onSpecialDown));
            e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_SPECIAL_UP, u(this, this._onSpecialUp));
            switch (e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) {
                case 1:
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E1_SPAWN_THROW,
                        u(this, this._e1SpawnThrownObject));
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E1_SPAWN_SHARD, u(this, this._e1SpawnShard));
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST, u(this, this._e1SpawnDustObject));
                    break;
                case 2:
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST, u(this, this._e2SpawnDustObject));
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E2_ZAP_ENEMIES,
                        u(this, this._e2ZapEnemies));
                    break;
                case 3:
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E1_SPAWN_DUST, u(this, this._e3SpawnDustObject));
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E3_SHOCK, u(this, this._e3ShockEvent));
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E3_SPAWN_SHARD, u(this, this._e3SpawnShard));
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E3_SPAWN_SPLASH, u(this,
                        this._e3SplashEvent));
                    break;
                case 4:
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E4_SPAWN_SHARD, u(this, this._e4SpawnShard));
                    break;
                case 5:
                    e.WorkinCloud.instance._getDispatcher().addEventListener(c.ConstantsApp.EVENT_E4_SPAWN_SHARD, u(this, this._e4SpawnShard));
                    break;
                default:
                    null
            }
        },
        _testGameOver: function() {
            0 >= this._endTimer && (e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE), this._player.getIsLosing() ? e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_LOSE, !0) : e.WorkinCloud.instance.setBool(c.ConstantsApp.BOOL_GAME_WIN, !0))
        },
        render: function() {
            this._elementManager.renderElements()
        },
        _spawnEpisode5: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 > this._spawnTimer))
                if (0 == this._entities.length) this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5KillWall({})));
                else switch (Math.round(e.WorkinUtils.getRandom(0, 5, !0))) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5Stala({
                            setSpeed: this._backScroll
                        })));
                        this._spawnTimer = 0.5 * e.WorkinUtils.getRandom(2, 3);
                        break;
                    case 1:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5Stala2({
                            setSpeed: this._backScroll
                        })));
                        this._spawnTimer = 0.5 * e.WorkinUtils.getRandom(2, 3);
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5Pickup({
                            setSpeed: this._backScroll
                        })));
                        this._spawnTimer = 0.5 * e.WorkinUtils.getRandom(1, 2);
                        break;
                    case 3:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5Pickup({
                            setSpeed: this._backScroll
                        })));
                        this._spawnTimer = 0.5 * e.WorkinUtils.getRandom(1, 2);
                        break;
                    default:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5BrickWall({
                            setSpeed: this._backScroll
                        }))), this._spawnTimer = 0.5 * e.WorkinUtils.getRandom(3, 4)
                }
        },
        _spawnEpisode5help: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 >= this._spawnTimer)) {
                switch (this._helpinc) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(this._helpMe = new h.elements.entities.HelpBox({})));
                        a = "help_ep_5_1";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) &&
                            (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 1:
                        a = "help_ep_5_2";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 2;
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode5.E5Stala({
                            setSpeed: this._backScroll
                        })));
                        this._spawnTimer = 2;
                        break;
                    case 3:
                        this._helpMe.activate("help_ep_5_3");
                        this._spawnTimer = 4;
                        break;
                    case 4:
                        this._helpMe.activate("help_ep_5_4");
                        this._spawnTimer = 4;
                        break;
                    case 5:
                        this._helpMe.activate("help_ep_5_5");
                        this._spawnTimer = 4;
                        break;
                    case 6:
                        this._helpMe.activate("help_ep_5_6", !0);
                        this._spawnTimer = 4;
                        break;
                    default:
                        0 == this._entities.length && (this._helping = !1)
                }
                this._helpinc++
            }
        },
        _spawnEpisode4: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 > this._spawnTimer)) {
                switch (Math.round(e.WorkinUtils.getRandom(0, 5, !0))) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Bounce({})));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length -
                            1])));
                        break;
                    case 1:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Bounce({})));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Bounce({})));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        break;
                    case 3:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Turtle({
                            setSpeed: this._backScroll
                        })));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        break;
                    default:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Pickup({}))), this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])))
                }
                this._spawnTimer = 0.4 * e.WorkinUtils.getRandom(2, 6)
            }
        },
        _spawnEpisode4help: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -=
                    a, 0 >= this._spawnTimer)) {
                switch (this._helpinc) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(this._helpMe = new h.elements.entities.HelpBox({})));
                        a = "help_ep_4_1";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 1:
                        this._helpMe.activate("help_ep_4_2");
                        this._spawnTimer = 2;
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode4.E4Pickup({})));
                        this._spawnTimer = 2;
                        break;
                    case 3:
                        a =
                            "help_ep_4_3";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 4:
                        this._helpMe.activate("help_ep_4_4");
                        this._spawnTimer = 4;
                        break;
                    case 5:
                        this._helpMe.activate("help_ep_4_5", !0);
                        this._spawnTimer = 4;
                        break;
                    default:
                        this._helping = !1
                }
                this._helpinc++
            }
        },
        _spawnEpisode3: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 > this._spawnTimer)) {
                switch (Math.round(e.WorkinUtils.getRandom(0, 2, !0))) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Pickup({
                            pSpeed: this._backScroll
                        })));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        break;
                    case 1:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Urchin({
                            pSpeed: this._backScroll
                        })));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        break;
                    default:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Rock({
                            pSpeed: this._backScroll,
                            origin: new g.WorkinPoint(0.5, 1)
                        })))
                }
                this._spawnTimer = 0.5 * e.WorkinUtils.getRandom(1, 2)
            }
        },
        _spawnEpisode3help: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 >= this._spawnTimer)) {
                switch (this._helpinc) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(this._helpMe = new h.elements.entities.HelpBox({})));
                        a = "help_ep_3_1";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 1:
                        this._helpMe.activate("help_ep_3_2");
                        this._spawnTimer = 2;
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Rock({
                            pSpeed: this._backScroll
                        })));
                        this._spawnTimer = 2;
                        break;
                    case 3:
                        this._helpMe.activate("help_ep_3_3");
                        this._spawnTimer = 2;
                        break;
                    case 4:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode3.E3Pickup({
                            pSpeed: this._backScroll
                        })));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        this._spawnTimer = 2;
                        break;
                    case 5:
                        a = "help_ep_3_4";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a, !0);
                        this._spawnTimer = 4;
                        break;
                    default:
                        this._helping = !1
                }
                this._helpinc++
            }
        },
        _spawnEpisode2: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 > this._spawnTimer)) {
                switch (Math.round(e.WorkinUtils.getRandom(0, 5, !0))) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2DiveBird({})));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length -
                            1])));
                        break;
                    case 1:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Turtle({
                            setSpeed: this._backScroll
                        })));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Pickup({})));
                        this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length -
                            1])));
                        break;
                    default:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Rock({
                            pSpeed: this._backScroll,
                            origin: new g.WorkinPoint(0.5, 1)
                        })))
                }
                this._spawnTimer = 0.25 * e.WorkinUtils.getRandom(2, 5)
            }
        },
        _spawnEpisode2help: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 >= this._spawnTimer)) {
                switch (this._helpinc) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(this._helpMe = new h.elements.entities.HelpBox({})));
                        a = "help_ep_2_1";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) &&
                            (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 1:
                        a = "help_ep_2_2";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 2:
                        this._helpMe.activate("help_ep_2_3");
                        this._spawnTimer = 4;
                        break;
                    case 3:
                        this._helpMe.activate("help_ep_2_4");
                        this._spawnTimer = 2;
                        break;
                    case 4:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Rock({
                            pSpeed: this._backScroll
                        })));
                        this._spawnTimer = 2;
                        break;
                    case 5:
                        this._helpMe.activate("help_ep_2_5");
                        this._spawnTimer = 4;
                        break;
                    case 6:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode2.E2Pickup({})));
                        this._spawnTimer = 2;
                        break;
                    case 7:
                        this._helpMe.activate("help_ep_2_6", !0);
                        this._spawnTimer = 4;
                        break;
                    default:
                        this._helping = !1
                }
                this._helpinc++
            }
        },
        _spawnEpisode1: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 > this._spawnTimer)) {
                if (0 == this._entities.length) this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Monster({
                    layer: c.ConstantsApp.LAYER_PLAYER,
                    movie: "_E1Monster",
                    library: "flump_monsters",
                    origin: new g.WorkinPoint(0.5, 1)
                }))), this._shadowArray.push(this._elementManager.addElement(new h.elements.entities.Shadow(this._entities[this._entities.length - 1])));
                else switch (Math.round(e.WorkinUtils.getRandom(0, 2, !0))) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Pickup({
                            pSpeed: this._backScroll,
                            origin: new g.WorkinPoint(0.5, 0.5)
                        })));
                        break;
                    default:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Rock({
                            pSpeed: this._backScroll,
                            origin: new g.WorkinPoint(0.5, 0.5)
                        })))
                }
                this._spawnTimer = 0.25 * e.WorkinUtils.getRandom(1, 4)
            }
        },
        _spawnEpisode1help: function(a) {
            if (this._player.getIsReady() && (this._spawnTimer -= a, 0 >= this._spawnTimer)) {
                switch (this._helpinc) {
                    case 0:
                        this._entities.push(this._elementManager.addElement(this._helpMe = new h.elements.entities.HelpBox({})));
                        a = "help_ep_1_1";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 1:
                        this._helpMe.activate("help_ep_1_2");
                        this._spawnTimer = 2;
                        break;
                    case 2:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Rock({
                            pSpeed: this._backScroll
                        })));
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Rock({
                            pSpeed: this._backScroll
                        })));
                        this._spawnTimer = 2;
                        break;
                    case 3:
                        this._helpMe.activate("help_ep_1_3");
                        this._spawnTimer = 2;
                        break;
                    case 4:
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Pickup({
                            pSpeed: this._backScroll
                        })));
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Pickup({
                            pSpeed: this._backScroll
                        })));
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Pickup({
                            pSpeed: this._backScroll
                        })));
                        this._entities.push(this._elementManager.addElement(new h.elements.entities.episode1.E1Pickup({
                            pSpeed: this._backScroll
                        })));
                        this._spawnTimer = 2;
                        break;
                    case 5:
                        a = "help_ep_1_4";
                        e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_TOUCH_DEVICE) && (a += "_t");
                        this._helpMe.activate(a);
                        this._spawnTimer = 4;
                        break;
                    case 6:
                        this._helpMe.activate("help_ep_1_5", !0);
                        this._spawnTimer = 4;
                        break;
                    default:
                        0 ==
                            this._entities.length && (this._helping = !1)
                }
                this._helpinc++
            }
        },
        _countScore: function(a) {
            this._scoreUp += 50 * a;
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, Math.floor(this._scoreUp));
            this._scoreUp -= Math.floor(this._scoreUp)
        },
        update: function(a) {
            if (!0 != e.WorkinCloud.instance.getBool(c.ConstantsApp.BOOL_PAUSED)) switch (a = Math.round(1E3 * a) / 1E3, this._state) {
                case this._STATE_INITIALIZING:
                    null != this._poolManager && this._poolManager.update(a);
                    break;
                case this._STATE_GAMEPLAY:
                    0 < this._gameTimer && !this._player.getIsLosing() &&
                        !this._helping ? this._gameTimer -= a : 0 < this._gameTimer && this._player.getIsLosing() && (this._gameTimer = 0);
                    0 >= this._gameTimer && (this._endTimer -= a, !this._player.getIsLosing() && !this._player.isLeaving() && this._player.timeToGo());
                    this._doubleClick && (this._doubleTimer -= a, 0 >= this._doubleTimer && (this._doubleClick = !1));
                    switch (e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) {
                        case 1:
                            this._helping ? this._spawnEpisode1help(a) : (this._countScore(a), this._spawnEpisode1(a));
                            break;
                        case 2:
                            this._helping ? this._spawnEpisode2help(a) :
                                (this._countScore(a), this._spawnEpisode2(a));
                            break;
                        case 3:
                            this._helping ? this._spawnEpisode3help(a) : (this._countScore(a), this._spawnEpisode3(a));
                            break;
                        case 4:
                            this._helping ? this._spawnEpisode4help(a) : (this._countScore(a), this._spawnEpisode4(a));
                            break;
                        case 5:
                            this._helping ? this._spawnEpisode5help(a) : (this._countScore(a), this._spawnEpisode5(a))
                    }
                    this._player.update(a);
                    for (this._i = this._entities.length; 0 < this._i;) {
                        this._i--;
                        this._entities[this._i].update(a);
                        if (this._entities[this._i].get_rectangle().intersects(this._player.getCollisionRect())) this._entities[this._i].onCollision(this._player);
                        if (!this._helping && 1 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) {
                            if (this._entities[this._i].get_rectangle().intersects(this._entities[0].get_rectangle())) this._entities[this._i].onSecondCollision(this._entities[0]);
                            0 >= this._gameTimer && this._entities[this._i].timeToGo()
                        }
                        if (!this._helping && 5 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) {
                            0 == this._i && this._player.doBump({
                                rockPoint: !0,
                                pRight: this._entities[0].get_rectangle()._getRight()
                            });
                            if (this._entities[this._i].get_rectangle().intersects(this._entities[0].get_rectangle())) this._entities[this._i].onSecondCollision(this._entities[0]);
                            0 >= this._gameTimer && this._entities[0].timeToGo()
                        }
                        this._entities[this._i]._getDoDelete() && (this._elementManager.removeElement(this._entities[this._i]), this._entities.splice(this._i, 1))
                    }
                    for (this._i = this._shadowArray.length; 0 < this._i;) this._i--, this._shadowArray[this._i].update(a), this._shadowArray[this._i]._getDoDelete() && (this._elementManager.removeElement(this._shadowArray[this._i]), this._shadowArray.splice(this._i, 1));
                    for (this._i = this._background.length; 0 < this._i;) this._i--, this._background[this._i].update(a);
                    (1 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE) || 3 == e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_EPISODE)) && this._elementManager.updateZSort(c.ConstantsApp.LAYER_PLAYER);
                    this._testGameOver();
                    for (a = e.WorkinCloud.instance._getInput()._getMultiTouch().iterator(); a.hasNext();) {
                        var b = a.next();
                        if (!1 == b._getConsumed()) switch (b._getSwipe()) {
                            case b.SWIPE_UP:
                                b._setConsumed(!0);
                                break;
                            case b.SWIPE_DOWN:
                                b._setConsumed(!0);
                                break;
                            case b.SWIPE_LEFT:
                                b._setConsumed(!0);
                                break;
                            case b.SWIPE_RIGHT:
                                b._setConsumed(!0)
                        }
                    }
            }
        },
        _setState: function(a) {
            this._state = a
        },
        dispose: function() {
            this._elementManager.dispose();
            this._elementManager = null;
            this._poolManager.dispose();
            this._timeline = this._poolManager = null;
            this._removeEventListeners();
            this._shadowArray = this._entities = this._player = this._spongs = null;
            n.WMEventDispatcher.prototype.dispose.call(this)
        },
        start: function() {
            this._addEventListeners();
            this._setState(this._STATE_GAMEPLAY)
        },
        __class__: h.World
    });
    h.elements = {};
    h.elements.BackgroundWrapper = function(a, b, d, m, c, e, f) {
        null == f && (f =
            0);
        null == e && (e = 0);
        null == c && (c = !1);
        null == m && (m = 2);
        l.Element.call(this, {
            layer: d
        });
        this._bgArray = [];
        this._vertical = c;
        this._parts = m;
        d = this._i = 0;
        for (this._vertical && (d = 560); this._i < this._parts;) this._vertical ? (this._bgArray.push(this._addElement(new l.Element({
            asset: b[this._i % b.length],
            x: e,
            y: d,
            origin: new g.WorkinPoint(f, 1)
        }))), this._bgArray[this._i]._velocity.x = 0, this._bgArray[this._i]._velocity.y = a, d -= this._bgArray[this._i]._getRenderable().height) : (this._bgArray.push(this._addElement(new l.Element({
            asset: b[this._i %
                b.length],
            y: e,
            x: d,
            origin: new g.WorkinPoint(0, f)
        }))), this._bgArray[this._i]._velocity.x = -a, d += this._bgArray[this._i]._getRenderable().width), this._i++
    };
    k["com.nick.spongebob.monster_island.world.elements.BackgroundWrapper"] = h.elements.BackgroundWrapper;
    h.elements.BackgroundWrapper.__name__ = "com,nick,spongebob,monster_island,world,elements,BackgroundWrapper".split(",");
    h.elements.BackgroundWrapper.__super__ = l.Element;
    h.elements.BackgroundWrapper.prototype = t(l.Element.prototype, {
        update: function(a) {
            l.Element.prototype.update.call(this,
                a);
            for (this._i = this._bgArray.length; 0 < this._i;) this._i--, this._bgArray[this._i].updatePositionFromVelocity(a), 0 >= this._bgArray[this._i]._getPos().x + this._bgArray[this._i]._getRenderable().width ? (this._bgArray[this._i]._getPos().x = this._bgArray[this._bgArray.length - 1]._getPos().x + this._bgArray[this._bgArray.length - 1]._getRenderable().width, this._bgArray.push(this._bgArray[this._i]), this._bgArray.splice(0, 1)) : this._bgArray[this._i]._getPos().y >= c.ConstantsApp.STAGE_HEIGHT + this._bgArray[this._i]._getRenderable().height &&
                this._vertical && (this._bgArray[this._i]._getPos().y = this._bgArray[this._bgArray.length - 1]._getPos().y - this._bgArray[this._bgArray.length - 1]._getRenderable().height, this._bgArray.push(this._bgArray[this._i]), this._bgArray.splice(0, 1))
        },
        __class__: h.elements.BackgroundWrapper
    });
    h.elements.Crystal = function() {};
    k["com.nick.spongebob.monster_island.world.elements.Crystal"] = h.elements.Crystal;
    h.elements.Crystal.__name__ = "com,nick,spongebob,monster_island,world,elements,Crystal".split(",");
    h.elements.Crystal.__super__ =
        l.Element;
    h.elements.Crystal.prototype = t(l.Element.prototype, {
        update: function(a) {
            l.Element.prototype.update.call(this, a);
            this._pos.x -= this._speed * a; - 100 > this._pos.x && this._setDoDelete(!0);
            this._render.rotation += this._rot * a
        },
        __class__: h.elements.Crystal
    });
    l.AnimatedElement = function(a) {
        if (null != a.movie && "" != a.movie && (null == a.library || "" == a.library) && (null == a.asset || "" == a.asset)) a.asset = a.movie;
        this._animations = new G;
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
        l.Element.call(this, a)
    };
    k["com.workinman.display.AnimatedElement"] = l.AnimatedElement;
    l.AnimatedElement.__name__ = ["com", "workinman", "display", "AnimatedElement"];
    l.AnimatedElement.__super__ = l.Element;
    l.AnimatedElement.prototype = t(l.Element.prototype, {
        _onAnimationComplete: function() {},
        _setFrame: function(a) {
            this._movie.set_position(Math.floor(a) / this._frames * this._duration)
        },
        _runAnimation: function(a) {
            "" != this._currentAnimation && !0 == this._doLoop() && !1 == this._animationStopped && (this._currentFrame = !1 == this._currentAnimDef._getReverse() ? this._currentFrame + this._fps * a : this._currentFrame - this._fps * a, !1 == this._currentAnimDef._getReverse() ? Math.floor(this._currentFrame) > this._currentAnimDef._getEnd() && (this._currentFrame = this._currentAnimDef._getStart() + (this._currentFrame - Math.floor(this._currentFrame)), this._loopComplete = !0) : Math.ceil(this._currentFrame) < this._currentAnimDef._getStart() &&
                (this._currentFrame = this._currentAnimDef._getEnd() + (this._currentFrame - Math.ceil(this._currentFrame)), this._loopComplete = !0), !0 == this._loopComplete && (this._loopComplete = !1, this._currentLoop--, !1 == this._doLoop() && (this._animationStopped = !0, this._currentFrame = !1 == this._currentAnimDef._getReverse() ? this._currentAnimDef._getEnd() : this._currentAnimDef._getStart(), 0 < this._queuedAnimations.length ? (this._doAnimate(this._queuedAnimations[0]._getName(), this._queuedAnimations[0]._getLoops(), this._queuedAnimations[0]._getForce()),
                    this._queuedAnimations.splice(0, 1)) : this._onAnimationComplete())), this._workFrame = !1 == this._currentAnimDef._getReverse() ? Math.floor(this._currentFrame) : Math.ceil(this._currentFrame), null != this._movie && this._workFrame != this._lastFrame && (this._setFrame(this._workFrame), this._lastFrame = this._workFrame))
        },
        _doLoop: function() {
            return 0 < this._currentLoop || this._flagLoop
        },
        update: function(a) {
            l.Element.prototype.update.call(this, a);
            this._runAnimation(a)
        },
        clearQueue: function() {
            for (; 0 < this._queuedAnimations.length;) this._queuedAnimations.splice(0,
                1)
        },
        stopAnimation: function() {
            this._animationStopped = !0
        },
        setLoop: function(a) {
            this._currentLoop = a;
            this._flagLoop = 0 == a;
            return this
        },
        _doAnimate: function(a, b, d) {
            null == d && (d = !1);
            null == b && (b = 0);
            this._currentAnimation == a && !1 == d || (null != this._animations && this._animations.exists(a) ? (this._currentAnimDef = null, this._currentAnimDef = this._animations.get(a), this._currentFrame = !1 == this._currentAnimDef._getReverse() ? this._currentAnimDef._getStart() : this._currentAnimDef._getEnd(), this._currentAnimation = a, this.setLoop(b),
                this._animationStopped = !1, this._setFrame(this._currentFrame)) : e.WorkinCloud.instance.log("Animation not found: " + a))
        },
        animate: function(a, b, d) {
            null == d && (d = !1);
            null == b && (b = 0);
            this.clearQueue();
            this._doAnimate(a, b, d);
            return this
        },
        addAnimation: function(a, b, d) {
            this._animations.set(a, new l.AnimationDef(a, b - 1, d - 1));
            return this
        },
        setLibraryAndSymbol: function(a, b) {
            this._library = a;
            this._symbol = b;
            this._texture.dispose();
            var d = e.WorkinCloud.instance._getAssets().getLibrary(this._library)._symbols.get(this._symbol);
            this._duration = d.duration;
            this._frames = d.frames;
            this._movie = d.createSprite();
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
            l.Element.prototype.renew.call(this, a);
            a.library && a.movie && this.setLibraryAndSymbol(a.library, a.movie);
            a.fps && (this._fps = a.fps)
        },
        dispose: function() {
            this._queuedAnimations = this._currentAnimDef = this._animations = this._movie = null;
            l.Element.prototype.dispose.call(this)
        },
        __class__: l.AnimatedElement,
        __properties__: t(l.Element.prototype.__properties__, {
            set_animationFrame: "_setAnimationFrame",
            get_animationFrame: "_getAnimationFrame"
        })
    });
    h.elements.GameElement = function(a) {
        l.AnimatedElement.call(this, a)
    };
    k["com.nick.spongebob.monster_island.world.elements.GameElement"] = h.elements.GameElement;
    h.elements.GameElement.__name__ = "com,nick,spongebob,monster_island,world,elements,GameElement".split(",");
    h.elements.GameElement.__super__ = l.AnimatedElement;
    h.elements.GameElement.prototype = t(l.AnimatedElement.prototype, {
        shadowPoint: function() {
            return this._pos.y
        },
        getShadowScale: function() {
            return 1
        },
        getYPos: function() {
            return this._pos.y
        },
        __class__: h.elements.GameElement
    });
    h.elements.Portrait = function(a, b, d) {
        l.Element.call(this, {
            x: a,
            y: b,
            asset: "portraits/" + d,
            origin: new g.WorkinPoint(0.5, 0.43)
        });
        this._sparkleStore = [];
        a = 0;
        for (b = h.elements.Portrait._sparkles; a < b;) a++, this._addElement(d = new l.Element({
            asset: "portraits/portrait_sparkles",
            origin: new g.WorkinPoint(0.5, 0.5)
        })), this._sparkleStore.push(d);
        this._addElement(this._tagline = new l.TextLocalized(0, 120, "", "", {
            origin: new g.WorkinPoint(0.5, 0.5),
            center: !0
        }));
        this._render.scaleX = this._render.scaleY =
            0;
        this._isUp = !1
    };
    k["com.nick.spongebob.monster_island.world.elements.Portrait"] = h.elements.Portrait;
    h.elements.Portrait.__name__ = "com,nick,spongebob,monster_island,world,elements,Portrait".split(",");
    h.elements.Portrait.__super__ = l.Element;
    h.elements.Portrait.prototype = t(l.Element.prototype, {
        disappear: function() {
            this._tweener.clearTweens();
            this._tweener.setStart(this._render.scaleX, this._render.scaleY);
            this._tweener.addTween(new g.WorkinPoint(0, 0), 0.5, g.tween.PennerManager.EASE_IN);
            this._tweener.start();
            this._isUp = !1
        },
        appear: function(a, b, d, m) {
            null == m && (m = "");
            null == d && (d = "");
            null == b && (b = -1);
            null == a && (a = -1);
            e.WorkinCloud.instance._getSound().playSound("dun_dun"); - 1 != a && (this._getPos().x = a); - 1 != b && (this._getPos().y = b);
            "" != d && this.setTexture("portraits/" + d);
            "" != m && this._tagline._setText(m);
            this._tweener.setStart(this._render.scaleX, this._render.scaleY);
            this._tweener.addTween(new g.WorkinPoint(1, 1), 0.5, g.tween.PennerManager.EASE_OUT);
            this._tweener.start();
            this._isUp = !0
        },
        update: function(a) {
            l.Element.prototype.update.call(this,
                a);
            this._tweener._getBoolAllTweensComplete() || (this._tweener.update(a), this._render.scaleX = this._render.scaleY = this._tweener._getCurrent().x);
            if (this._isUp)
                for (var b = 0, d = this._sparkleStore; b < d.length;) {
                    var m = d[b];
                    ++b;
                    m._getRenderable().alpha -= 5 * Math.random() * a;
                    m._getRenderable().rotation += 125 * a;
                    if (0 >= m._getRenderable().alpha) {
                        m._getRenderable().scaleX = m._getRenderable().scaleY = 0.3 * Math.random() + 0.3;
                        m._getRenderable().rotation = 360 * Math.random();
                        var c = new g.WorkinPoint(Math.random() * h.elements.Portrait._sparkleRadius);
                        c.rotateTo(360 * Math.random());
                        m._getPos().toPoint(c);
                        m._getRenderable().alpha = 1
                    }
                } else {
                    b = 0;
                    for (d = this._sparkleStore; b < d.length;) m = d[b], ++b, m._getRenderable().alpha = 0
                }
        },
        __class__: h.elements.Portrait
    });
    h.elements.TestElement = function(a) {
        l.Element.call(this, a);
        this._velocity.to(200 + 100 * Math.random(), 0);
        this._velocity.rotateTo(360 * Math.random());
        this._rotation = 100 - 200 * Math.random()
    };
    k["com.nick.spongebob.monster_island.world.elements.TestElement"] = h.elements.TestElement;
    h.elements.TestElement.__name__ =
        "com,nick,spongebob,monster_island,world,elements,TestElement".split(",");
    h.elements.TestElement.__super__ = l.Element;
    h.elements.TestElement.prototype = t(l.Element.prototype, {
        update: function(a) {
            l.Element.prototype.update.call(this, a);
            this.updatePositionFromVelocity(a);
            if (0 < this._velocity.x && this._pos.x > c.ConstantsApp.STAGE_WIDTH - this._render.width / 2 || 0 > this._velocity.x && this._pos.x < this._render.width / 2) this._velocity.x *= -1;
            if (0 < this._velocity.y && this._pos.y > c.ConstantsApp.STAGE_HEIGHT - this._render.height /
                2 || 0 > this._velocity.y && this._pos.y < this._render.height / 2) this._velocity.y *= -1;
            this.rect.x = this._pos.x - this._render.width / 2;
            this.rect.y = this._pos.y - this._render.height / 2;
            this._render.rotation += this._rotation * a
        },
        dispose: function() {
            this.rect = null;
            l.Element.prototype.dispose.call(this)
        },
        renew: function(a) {
            l.Element.prototype.renew.call(this, a);
            this.rect = new J.Rectangle(this._render.x, this._render.y, this._render.width, this._render.height)
        },
        __class__: h.elements.TestElement
    });
    h.elements.entities = {};
    h.elements.entities.BaseEntity =
        function(a) {
            this._STATE_IDLE = 12;
            this._STATE_OUT = 11;
            this._STATE_IN = 10;
            h.elements.GameElement.call(this, a);
            this._collisionRect = this._setCollision();
            this._collisionOffset = this._setCollisionOffset();
            this._speed = this._setSpeed();
            if (c.ConstantsApp.OPTION_SHOW_HITBOXES) {
                a = new p.FillSprite(16711680, this._collisionRect._getWidth(), this._collisionRect._getHeight());
                a.alpha.set__(0.5);
                a.setXY(this._setCollisionOffset().x, this._setCollisionOffset().y);
                var b = new N;
                b.add(a);
                this._getEntity().addChild(b)
            }
            this._destination =
                new g.WorkinPoint;
            this._addAnims()
        };
    k["com.nick.spongebob.monster_island.world.elements.entities.BaseEntity"] = h.elements.entities.BaseEntity;
    h.elements.entities.BaseEntity.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,BaseEntity".split(",");
    h.elements.entities.BaseEntity.__super__ = h.elements.GameElement;
    h.elements.entities.BaseEntity.prototype = t(h.elements.GameElement.prototype, {
        set_rectangle: function(a) {
            return this._collisionRect = a
        },
        get_rectangle: function() {
            return this._collisionRect
        },
        timeToGo: function() {
            this._setState(this._STATE_OUT)
        },
        doHurt: function() {},
        onSecondCollision: function() {},
        onCollision: function() {},
        _movement: function(a) {
            this._velocity = this._destination.subtractPointCopy(this._pos);
            this._velocity.normalize();
            this._destination.subtractPointCopy(this._pos)._getLength() < this._speed * a ? this._velocity.multiply(this._destination.subtractPointCopy(this._pos)._getLength() / a) : this._velocity.multiply(this._speed)
        },
        _onUpdateIdle: function() {},
        _onUpdateOut: function() {},
        _onUpdateIn: function() {},
        update: function(a) {
            h.elements.GameElement.prototype.update.call(this, a);
            switch (this._state) {
                case this._STATE_IN:
                    this._onUpdateIn(a);
                    break;
                case this._STATE_OUT:
                    this._onUpdateOut(a);
                    break;
                case this._STATE_IDLE:
                    this._onUpdateIdle(a)
            }
            this.updatePositionFromVelocity(a);
            this._collisionRect._setX(this._pos.x + this._collisionOffset.x);
            this._collisionRect._setY(this._pos.y + this._collisionOffset.y)
        },
        _setStateIdle: function() {},
        _setStateOut: function() {
            this._state = this._STATE_IN
        },
        _setStateIn: function() {},
        _setState: function(a) {
            this._state =
                a;
            switch (this._state) {
                case this._STATE_IN:
                    this._setStateIn();
                    break;
                case this._STATE_OUT:
                    this._setStateOut();
                    break;
                case this._STATE_IDLE:
                    this._setStateIdle()
            }
        },
        _setScale: function(a) {
            this._render.scaleX = a;
            this._render.scaleY = a;
            var b = this._collisionRect;
            b._setWidth(b._getWidth() * a);
            b = this._collisionRect;
            b._setHeight(b._getHeight() * a);
            this._collisionOffset = this._setCollisionOffset()
        },
        getHostile: function() {
            return !1
        },
        _setSpeed: function() {
            return 0
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._collisionRect._getWidth() /
                2, -this._collisionRect._getHeight() / 2)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 10, 10)
        },
        _addAnims: function() {},
        __class__: h.elements.entities.BaseEntity,
        __properties__: t(h.elements.GameElement.prototype.__properties__, {
            set_rectangle: "set_rectangle",
            get_rectangle: "get_rectangle"
        })
    });
    h.elements.entities.BasePlayer = function(a) {
        this._STATE_BUMP = 6;
        this._STATE_HURT = 5;
        this._STATE_LOSE = 4;
        this._STATE_IDLE = 3;
        this._STATE_OUT = 2;
        this._STATE_IN = 1;
        h.elements.GameElement.call(this, a);
        this._invincibility =
            0;
        this._blinkTimer = 0.2;
        this._blinkFlag = !1;
        this._bumpTimer = 0;
        this._collisionRect = this._setCollision();
        this._collisionOffset = this._setCollisionOffset();
        this._movementBounds = this._setMovementBounds();
        this._coolDownMax = this._setCoolDownMax();
        if (c.ConstantsApp.OPTION_SHOW_HITBOXES) {
            a = new p.FillSprite(16711680, this._collisionRect._getWidth(), this._collisionRect._getHeight());
            a.alpha.set__(0.5);
            a.setXY(this._setCollisionOffset().x, this._setCollisionOffset().y);
            var b = new N;
            b.add(a);
            this._getEntity().addChild(b)
        }
        this._addAnims();
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.BasePlayer"] = h.elements.entities.BasePlayer;
    h.elements.entities.BasePlayer.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,BasePlayer".split(",");
    h.elements.entities.BasePlayer.__super__ = h.elements.GameElement;
    h.elements.entities.BasePlayer.prototype = t(h.elements.GameElement.prototype, {
        chargePercent: function() {
            return 0
        },
        isLeaving: function() {
            return this._state == this._STATE_OUT
        },
        getIsLosing: function() {
            return this._state ==
                this._STATE_LOSE
        },
        getIsReady: function() {
            return this._state != this._STATE_IN
        },
        getCollisionRect: function() {
            return this._collisionRect
        },
        timeToGo: function() {
            this._state == this._STATE_IDLE && this._setState(this._STATE_OUT)
        },
        doHurt: function() {},
        doBump: function() {},
        doPickup: function() {},
        doSpecial: function() {},
        _onAnimationComplete: function() {
            this.animate("run")
        },
        _constrainMovement: function() {
            this._destination.y < this._movementBounds._getY() && (this._destination.y = this._movementBounds._getY());
            this._destination.y >
                this._movementBounds._getBottom() && (this._destination.y = this._movementBounds._getBottom());
            this._destination.x < this._movementBounds._getX() && (this._destination.x = this._movementBounds._getX());
            this._destination.x > this._movementBounds._getRight() && (this._destination.x = this._movementBounds._getRight())
        },
        _testMovement2d: function(a, b) {
            this._destination = new g.WorkinPoint(b.x, this._pos.y);
            this._constrainMovement()
        },
        _testMouseMovement: function(a, b) {
            this._destination = b;
            this._constrainMovement()
        },
        _movementToDestination: function(a) {
            this._velocity =
                this._destination.subtractPointCopy(this._pos);
            this._velocity.normalize();
            this._destination.subtractPointCopy(this._pos)._getLength() < this._speed * a ? this._velocity.multiply(this._destination.subtractPointCopy(this._pos)._getLength() / a) : this._velocity.multiply(this._speed)
        },
        _updateStateBump: function() {},
        _updateStateHurt: function() {},
        _updateStateLose: function() {},
        _updateStateIdle: function() {},
        _updateStateOut: function() {},
        _updateStateIn: function() {},
        update: function(a) {
            var b = e.WorkinCloud.instance._getInput()._getPointer()._getCurrentPos();
            h.elements.GameElement.prototype.update.call(this, a);
            e.WorkinCloud.instance.setFloat(c.ConstantsApp.FLOAT_CHARGE, this.chargePercent());
            0 < this._invincibility && (this._getBlinkInvincible() && (this._blinkTimer -= a, 0 >= this._blinkTimer && (this._blinkTimer = 0.2, this._blinkFlag = this._blinkFlag ? !1 : !0)), this._invincibility -= a, 0 >= this._invincibility && (this._blinkFlag = !1));
            this._render.alpha = this._blinkFlag ? 0.5 : 1;
            switch (this._state) {
                case this._STATE_IN:
                    this._updateStateIn(a, b);
                    break;
                case this._STATE_OUT:
                    this._updateStateOut(a,
                        b);
                    break;
                case this._STATE_IDLE:
                    this._updateStateIdle(a, b);
                    break;
                case this._STATE_LOSE:
                    this._updateStateLose(a, b);
                    break;
                case this._STATE_HURT:
                    this._updateStateHurt(a, b);
                    break;
                case this._STATE_BUMP:
                    this._updateStateBump(a, b)
            }
            this.updatePositionFromVelocity(a);
            this._collisionRect._setX(this._pos.x + this._collisionOffset.x);
            this._collisionRect._setY(this._pos.y + this._collisionOffset.y)
        },
        _setStateBump: function() {},
        _setStateHurt: function() {},
        _setStateLose: function() {},
        _setStateIdle: function() {},
        _setStateOut: function() {},
        _setStateIn: function() {},
        _setState: function(a) {
            this._state = a;
            switch (a) {
                case this._STATE_IN:
                    this._setStateIn();
                    break;
                case this._STATE_OUT:
                    this._setStateOut();
                    break;
                case this._STATE_IDLE:
                    this._setStateIdle();
                    break;
                case this._STATE_LOSE:
                    this._setStateLose();
                    break;
                case this._STATE_HURT:
                    this._setStateHurt();
                    break;
                case this._STATE_BUMP:
                    this._setStateBump()
            }
        },
        _setScale: function(a) {
            this._render.scaleX = a;
            this._render.scaleY = a;
            var b = this._collisionRect;
            b._setWidth(b._getWidth() * a);
            b = this._collisionRect;
            b._setHeight(b._getHeight() *
                a);
            this._collisionOffset = this._setCollisionOffset()
        },
        _getBlinkInvincible: function() {
            return !0
        },
        _setCoolDownMax: function() {
            return 1
        },
        _setMovementBounds: function() {
            return new g.WMRectangle(0, 0, 30, 30)
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._collisionRect._getWidth() / 2, -this._collisionRect._getHeight() / 2)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 10, 10)
        },
        _addAnims: function() {},
        __class__: h.elements.entities.BasePlayer
    });
    h.elements.entities.HelpBox = function(a) {
        this._SCREENDIST =
            150;
        h.elements.entities.BaseEntity.call(this, {
            asset: this._getAssetId(),
            layer: c.ConstantsApp.LAYER_BG_FRONT,
            origin: new g.WorkinPoint(0.5, 0)
        });
        a.setString || (a.setString = "debugtext");
        a.setLife || (a.setLife = 3);
        this._addElement(this._textStorer = new l.TextLocalized(0, 0, a.setString, null, {
            origin: new g.WorkinPoint(0.5, 0),
            center: !0
        }));
        this._lifetime = a.setLife;
        this._pos.x = c.ConstantsApp.STAGE_CENTER_X;
        this._pos.y = c.ConstantsApp.STAGE_HEIGHT + this._render.height;
        this._final = !1;
        this._setState(h.elements.entities.HelpBox._STATE_INACTIVE)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.HelpBox"] = h.elements.entities.HelpBox;
    h.elements.entities.HelpBox.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,HelpBox".split(",");
    h.elements.entities.HelpBox.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.HelpBox.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onUpdateOut: function(a) {
            this._movement(a);
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && (this._final ? this._setDoDelete(!0) :
                (this._setState(h.elements.entities.HelpBox._STATE_INACTIVE), this._lifetime = 3))
        },
        _onUpdateIdle: function(a) {
            this._movement(a);
            this._lifetime -= a;
            0 >= this._lifetime && this._setState(this._STATE_OUT)
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE)
        },
        activate: function(a, b) {
            null == b && (b = !1);
            null == a && (a = "");
            "" != a && this._textStorer._setText(a);
            b && (this._final = !0);
            this._setState(this._STATE_IN)
        },
        _setStateOut: function() {
            this._destination =
                new g.WorkinPoint(this._pos.x, this._pos.y + this._render.height + this._SCREENDIST)
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(this._pos.x, this._pos.y - this._render.height - this._SCREENDIST)
        },
        _setSpeed: function() {
            return 400
        },
        _getAssetId: function() {
            return ""
        },
        __class__: h.elements.entities.HelpBox
    });
    h.elements.entities.Shadow = function(a) {
        h.elements.entities.BaseEntity.call(this, {
            layer: c.ConstantsApp.LAYER_BG,
            asset: this._getAssetId(),
            origin: new g.WorkinPoint(0.5, 0.5)
        });
        this._follower = a;
        this._render.scaleX =
            this._render.scaleY = this._follower.getShadowScale();
        this.applyRenderable()
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.Shadow"] = h.elements.entities.Shadow;
    h.elements.entities.Shadow.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,Shadow".split(",");
    h.elements.entities.Shadow.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.Shadow.prototype = t(h.elements.entities.BaseEntity.prototype, {
        update: function(a) {
            h.elements.entities.BaseEntity.prototype.update.call(this,
                a);
            null == this._follower || this._follower._doDelete ? this._doDelete = !0 : (this._pos.x = this._follower._pos.x, this._pos.y = this._follower.shadowPoint() - 1)
        },
        _getAssetId: function() {
            return "shadow"
        },
        __class__: h.elements.entities.Shadow
    });
    h.elements.entities.episode1 = {};
    h.elements.entities.episode1.E1Dust = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_dust";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._setState(this._STATE_IN);
        this.animate("idle", 1)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1Dust"] =
        h.elements.entities.episode1.E1Dust;
    h.elements.entities.episode1.E1Dust.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1Dust".split(",");
    h.elements.entities.episode1.E1Dust.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode1.E1Dust.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onAnimationComplete: function() {
            this._doDelete = !0
        },
        _onUpdateIn: function(a) {
            this._lifeTimer -= a
        },
        _setStateIn: function() {
            this._lifeTimer = 0.25;
            this._velocity.x = -500
        },
        _setCollision: function() {
            return new g.WMRectangle(0,
                0, 120, 30)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 12)
        },
        __class__: h.elements.entities.episode1.E1Dust
    });
    h.elements.entities.episode1.E1Monster = function(a) {
        h.elements.entities.BaseEntity.call(this, a);
        this.animate("idle_run");
        this._pos.y = e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL);
        this._pos.x = -this._render.width;
        this._sinCounter = 0;
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1Monster"] = h.elements.entities.episode1.E1Monster;
    h.elements.entities.episode1.E1Monster.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1Monster".split(",");
    h.elements.entities.episode1.E1Monster.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode1.E1Monster.prototype = t(h.elements.entities.BaseEntity.prototype, {
        getShadowScale: function() {
            return 2
        },
        doHurt: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioGrunt");
            100 < this._xBase && (this._xBase -= h.elements.entities.episode1.E1Monster._HURT_FALLBACK);
            this.animate("hit_chomp", 1)
        },
        onCollision: function(a) {
            a.doHurt({})
        },
        _onAnimationComplete: function() {
            this.animate("idle_run")
        },
        _onUpdateIdle: function(a) {
            this._xBase += h.elements.entities.episode1.E1Monster._FORWARD_MOVEMENT * a;
            this._destination.x = this._xBase + Math.sin(this._sinCounter) * h.elements.entities.episode1.E1Monster._SINAMP;
            this._sinCounter += a;
            this._movement(a)
        },
        _onUpdateIn: function(a) {
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE);
            this._movement(a)
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BaseEntity.prototype.update.call(this, a)
        },
        _setStateOut: function() {
            this._velocity.x = 200
        },
        _setStateIdle: function() {
            this._xBase = this._pos.x;
            this._speed = 50
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(250, e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL))
        },
        _addAnims: function() {
            this.addAnimation("idle_run", 1, 10);
            this.addAnimation("hit_chomp", 11, 19)
        },
        _setSpeed: function() {
            return 200
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._setCollision()._getWidth() /
                2, -275)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 200, 300)
        },
        __class__: h.elements.entities.episode1.E1Monster
    });
    h.elements.entities.episode1.E1Pickup = function(a) {
        a.asset = "red_crystal_ground";
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        h.elements.entities.BaseEntity.call(this, a);
        a.pSpeed || (a.pSpeed = 200);
        this._speed = a.pSpeed;
        this._pos.y = e.WorkinUtils.getRandom(300, 450);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width;
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1Pickup"] =
        h.elements.entities.episode1.E1Pickup;
    h.elements.entities.episode1.E1Pickup.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1Pickup".split(",");
    h.elements.entities.episode1.E1Pickup.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode1.E1Pickup.prototype = t(h.elements.entities.BaseEntity.prototype, {
        onSecondCollision: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1");
            this._doDelete = !0;
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_DUST, {
                x: this._pos.x,
                y: this._pos.y
            }))
        },
        onCollision: function(a) {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioPickup");
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 100);
            a.doPickup({});
            this._doDelete = !0
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && (this._doDelete = !0)
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BaseEntity.prototype.update.call(this, a)
        },
        _setStateIn: function() {
            this._destination =
                new g.WorkinPoint(-this._render.width, this._pos.y)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        __class__: h.elements.entities.episode1.E1Pickup
    });
    h.elements.entities.episode1.E1Player = function() {
        h.elements.entities.BasePlayer.call(this, {
            library: "flump_monsters",
            movie: "_E1Sponge",
            y: e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL),
            origin: new g.WorkinPoint(0.5, 1),
            layer: c.ConstantsApp.LAYER_PLAYER
        });
        this._pos.x = -100;
        this._destination = new g.WorkinPoint(450, e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL));
        this._coolDown = 0
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1Player"] = h.elements.entities.episode1.E1Player;
    h.elements.entities.episode1.E1Player.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1Player".split(",");
    h.elements.entities.episode1.E1Player.__super__ = h.elements.entities.BasePlayer;
    h.elements.entities.episode1.E1Player.prototype = t(h.elements.entities.BasePlayer.prototype, {
        getYPos: function() {
            return this._pos.y + 15
        },
        chargePercent: function() {
            return 0 ==
                this._coolDown ? 0 : 100
        },
        _onAnimationComplete: function() {
            "jump" == this._currentAnimation && this.animate("run")
        },
        doHurt: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioHit");
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_HEALTH, -1);
            1 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) && this._state != this._STATE_LOSE ? (e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._setState(this._STATE_LOSE)) : (this._state == this._STATE_IDLE && (this._floorPoint = this._pos.y),
                this._setState(this._STATE_HURT))
        },
        doBump: function() {
            this._state == this._STATE_IDLE && 0 >= this._invincibility && this._setState(this._STATE_BUMP)
        },
        doPickup: function() {
            this._coolDown++
        },
        doSpecial: function() {
            if ((this._state == this._STATE_IDLE || this._state == this._STATE_BUMP) && 0 < this._coolDown) e.WorkinCloud.instance._getSound().playSound("AssetAudioThrow"), this.animate("jump", 1, !0), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_THROW, {
                    x: this._pos.x,
                    y: this._pos.y
                })),
                this._coolDown--
        },
        _updateStateBump: function(a) {
            this._velocity.x = -400;
            this._velocity.y = 0;
            this._bumpTimer -= a;
            0 > this._bumpTimer && this._setState(this._STATE_IDLE);
            this._constrainMovement()
        },
        _updateStateHurt: function(a) {
            this._bumpTimer -= a;
            0 > this._bumpTimer && this._setState(this._STATE_IDLE);
            this._constrainMovement()
        },
        _updateStateIdle: function(a, b) {
            this._testMouseMovement(a, b);
            this._movementToDestination(a)
        },
        _updateStateIn: function(a) {
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE);
            this._movementToDestination(a)
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BasePlayer.prototype.update.call(this, a)
        },
        _setStateBump: function() {
            this._bumpTimer = 0.5;
            this._invincibility = 1.5
        },
        _setStateHurt: function() {
            this._velocity.x = 500;
            this._velocity.y = 0;
            this._bumpTimer = 0.75;
            this._invincibility = 1.5
        },
        _setStateLose: function() {
            this._velocity.y = 100
        },
        _setStateIdle: function() {
            this._speed = 200;
            this._destination = this._pos
        },
        _setStateOut: function() {
            this._velocity = new g.WorkinPoint(300,
                0);
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, Math.round(1E3 * this._coolDown))
        },
        _setStateIn: function() {
            this._speed = 500
        },
        _getBlinkInvincible: function() {
            return !1
        },
        _setMovementBounds: function() {
            return new g.WMRectangle(200, 300, 700, 150)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 100, 30)
        },
        _addAnims: function() {
            this._renderOffset = new g.WorkinPoint(0, -10);
            this.addAnimation("run", 1, 10);
            this.addAnimation("jump", 11, 21);
            this.animate("run")
        },
        __class__: h.elements.entities.episode1.E1Player
    });
    h.elements.entities.episode1.E1PlayerProjectile = function(a) {
        this._ROTATION_SPEED = 1E3;
        a.asset = "red_crystal";
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        h.elements.entities.BaseEntity.call(this, a);
        this._setState(this._STATE_IN);
        this._yPoint = this._pos.y;
        this._shadowPoint = a.shadow
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1PlayerProjectile"] = h.elements.entities.episode1.E1PlayerProjectile;
    h.elements.entities.episode1.E1PlayerProjectile.__name__ =
        "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1PlayerProjectile".split(",");
    h.elements.entities.episode1.E1PlayerProjectile.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode1.E1PlayerProjectile.prototype = t(h.elements.entities.BaseEntity.prototype, {
        shadowPoint: function() {
            return this._shadowPoint
        },
        getYPos: function() {
            return this._yPoint
        },
        onSecondCollision: function(a) {
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 150);
            a.doHurt({});
            this._doDelete = !0;
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_SHARD, {
                x: this._pos.x,
                y: this._pos.y
            }))
        },
        _onUpdateIn: function(a) {
            this._velocity.y += c.ConstantsApp.GRAVITY * a;
            this._render.rotation += a * this._ROTATION_SPEED;
            this._pos.y > this._shadowPoint && (this._doDelete = !0, e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_SHARD, {
                x: this._pos.x,
                y: this._pos.y
            })))
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BaseEntity.prototype.update.call(this, a)
        },
        _setStateIn: function() {
            this._velocity.x = -this._speed;
            this._velocity.y = -e.WorkinUtils.getRandom(400, 800)
        },
        _setSpeed: function() {
            return e.WorkinUtils.getRandom(400, 800)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        __class__: h.elements.entities.episode1.E1PlayerProjectile
    });
    h.elements.entities.episode1.E1Rock = function(a) {
        a.library = "flump_obstacles";
        a.movie = this._getAssetID();
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        h.elements.entities.BaseEntity.call(this,
            a);
        a.pSpeed || (a.pSpeed = 200);
        this._speed = a.pSpeed;
        this._pos.y = e.WorkinUtils.getRandom(300, 500);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + 120;
        this.animate("idle");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1Rock"] = h.elements.entities.episode1.E1Rock;
    h.elements.entities.episode1.E1Rock.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1Rock".split(",");
    h.elements.entities.episode1.E1Rock.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode1.E1Rock.prototype = t(h.elements.entities.BaseEntity.prototype, {
        onSecondCollision: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1");
            this._doDelete = !0;
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_DUST, {
                x: this._pos.x,
                y: this._pos.y
            }))
        },
        onCollision: function(a) {
            a.doBump({})
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && (this._doDelete = !0)
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BaseEntity.prototype.update.call(this, a)
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(-120, this._pos.y)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 51)
        },
        _getAssetID: function() {
            switch (Math.round(e.WorkinUtils.getRandom(0, 4, !0))) {
                case 0:
                    return "_coral1";
                case 1:
                    return "_coral2";
                case 2:
                    return "_coral3";
                case 3:
                    return "_coral4";
                default:
                    return "_rock_1"
            }
        },
        __class__: h.elements.entities.episode1.E1Rock
    });
    h.elements.entities.episode1.E1Shard = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_gem_hit_animation";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        e.WorkinCloud.instance._getSound().playSound("Shard");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode1.E1Shard"] = h.elements.entities.episode1.E1Shard;
    h.elements.entities.episode1.E1Shard.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode1,E1Shard".split(",");
    h.elements.entities.episode1.E1Shard.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode1.E1Shard.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onAnimationComplete: function() {
            this._doDelete = !0
        },
        _onUpdateIn: function() {},
        _setStateIn: function() {
            this._lifeTimer = 0.3;
            this.animate("idle", 1)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 4)
        },
        __class__: h.elements.entities.episode1.E1Shard
    });
    h.elements.entities.episode2 = {};
    h.elements.entities.episode2.E2DiveBird = function(a) {
        a.library =
            "flump_enemies";
        a.movie = "_gameplay_enemies_jelly";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = -this._render.height;
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width - e.WorkinUtils.getRandom(0, 500);
        this._sinCounter = 0;
        this._baseY = this._pos.y;
        this._sinAmp = e.WorkinUtils.getRandom(250, 400);
        this._setState(this._STATE_IN);
        this.animate("idle")
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2DiveBird"] = h.elements.entities.episode2.E2DiveBird;
    h.elements.entities.episode2.E2DiveBird.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2DiveBird".split(",");
    h.elements.entities.episode2.E2DiveBird.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode2.E2DiveBird.prototype = t(h.elements.entities.BaseEntity.prototype, {
        timeToGo: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioGrunt", 0.3);
            h.elements.entities.BaseEntity.prototype.timeToGo.call(this)
        },
        shadowPoint: function() {
            return this._pos.y <=
                e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) ? e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) : this._pos.y
        },
        onCollision: function(a) {
            this._state == this._STATE_IN && (a.doHurt({}), this.timeToGo())
        },
        _onUpdateOut: function(a) {
            this._velocity.y += c.ConstantsApp.GRAVITY * a;
            this._pos.y - this._render.height > c.ConstantsApp.STAGE_HEIGHT && (this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            this._destination = new g.WorkinPoint(this._pos.x - this._speed * a, this._baseY + Math.sin(this._sinCounter) * this._sinAmp);
            this._sinCounter += a;
            this._movement(a);
            0 > this._pos.x + this._render.width && (this._doDelete = !0)
        },
        _setStateOut: function() {
            this.animate("hit");
            this._velocity.y = -600
        },
        getHostile: function() {
            return !0
        },
        _setSpeed: function() {
            return 250
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._collisionRect._getWidth() / 2, -this._collisionRect._getHeight())
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        _addAnims: function() {
            this._render.scaleX = this._render.scaleY = 0.33;
            this.addAnimation("idle",
                1, 30);
            this.addAnimation("hit", 31, 31)
        },
        __class__: h.elements.entities.episode2.E2DiveBird
    });
    h.elements.entities.episode2.E2Pickup = function(a) {
        a.asset = "red_crystal";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = e.WorkinUtils.getRandom(150, e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) - 150);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width;
        this._sinCounter = 0;
        this._baseY = this._pos.y;
        this._sinAmp = e.WorkinUtils.getRandom(50, 150);
        this._speed =
            e.WorkinUtils.getRandom(150, 300);
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2Pickup"] = h.elements.entities.episode2.E2Pickup;
    h.elements.entities.episode2.E2Pickup.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2Pickup".split(",");
    h.elements.entities.episode2.E2Pickup.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode2.E2Pickup.prototype = t(h.elements.entities.BaseEntity.prototype, {
        shadowPoint: function() {
            return e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL)
        },
        onCollision: function(a) {
            this._doDelete || (e.WorkinCloud.instance._getSound().playSound("AssetAudioPickup"), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E2_ZAP_ENEMIES, {
                x: this._pos.x,
                y: this._pos.y
            })), a.doPickup({}), this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            this._pos.y = this._baseY + Math.sin(this._sinCounter) * this._sinAmp;
            this._sinCounter += a;
            0 > this._pos.x + this._render.width && (this._doDelete = !0)
        },
        _setStateIn: function() {
            this._destination =
                new g.WorkinPoint(-this._render.width, this._pos.y)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 90, 30)
        },
        __class__: h.elements.entities.episode2.E2Pickup
    });
    h.elements.entities.episode2.E2Player = function() {
        this._STEPTIME = 0.3;
        this._JUMP_POWER = 600;
        this._MAX_SPEED = 400;
        this._STATE_JUMP = 10;
        h.elements.entities.BasePlayer.call(this, {
            library: "flump_monsters",
            movie: "_E2Monster",
            y: e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL),
            origin: new g.WorkinPoint(0.5, 1),
            layer: c.ConstantsApp.LAYER_PLAYER
        });
        this._setScale(0.75);
        this._pos.x = -150;
        this._destination = new g.WorkinPoint(300, e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL));
        this._jumpStrength = this._coolDown = 0;
        this._steptimer = this._STEPTIME;
        this._stepcount = 0
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2Player"] = h.elements.entities.episode2.E2Player;
    h.elements.entities.episode2.E2Player.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2Player".split(",");
    h.elements.entities.episode2.E2Player.__super__ =
        h.elements.entities.BasePlayer;
    h.elements.entities.episode2.E2Player.prototype = t(h.elements.entities.BasePlayer.prototype, {
        shadowPoint: function() {
            return e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL)
        },
        chargePercent: function() {
            return 100 * (1 - this._coolDown / this._coolDownMax)
        },
        doPickup: function() {
            this.animate("hit_chomp", 1)
        },
        doBump: function() {
            0 >= this._bumpTimer && this._state != this._STATE_OUT && (this._bumpTimer = 1)
        },
        doHurt: function() {
            0 >= this._invincibility && this._state != this._STATE_OUT &&
                (e.WorkinCloud.instance._getSound().playSound("AssetAudioHit"), e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_HEALTH, -1), 1 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) ? (e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._setState(this._STATE_LOSE)) : (this._bumpTimer = 1, this._invincibility = 1.5))
        },
        doSpecial: function() {
            if (this._state == this._STATE_IDLE || this._state == this._STATE_JUMP && 0 >= this._coolDown) this._state == this._STATE_JUMP && (this._coolDown = this._coolDownMax),
                this._setState(this._STATE_JUMP)
        },
        _onAnimationComplete: function() {
            this._pos.y < e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) ? this.animate("jump") : this.animate("idle_run")
        },
        _doFall: function(a) {
            this._jumpStrength += c.ConstantsApp.GRAVITY * a;
            this._velocity.y = this._jumpStrength;
            this._pos.y + this._velocity.y * a > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) && (this._velocity.y = (e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) - this._pos.y) / a);
            0 < this._jumpStrength &&
                1 > Math.abs(this._pos.y - e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL)) && (this.animate("idle_run"), this._state == this._STATE_JUMP && this._setState(this._STATE_IDLE))
        },
        _updateStateLose: function(a) {
            this._doFall(a)
        },
        _updateStateIdle: function(a, b) {
            this._testMovement2d(a, b);
            this._movementToDestination(a)
        },
        _updateStateIn: function(a) {
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE);
            this._movementToDestination(a)
        },
        update: function(a) {
            0 < this._coolDown &&
                (this._coolDown -= a, 0 > this._coolDown && (this._coolDown = 0));
            0 < this._bumpTimer && (this._speed > this._MAX_SPEED / 2 && (this._speed /= 2), this._bumpTimer -= a, 0 >= this._bumpTimer && this._speed < this._MAX_SPEED && (this._speed *= 2));
            var b = e.WorkinCloud.instance._getInput()._getPointer()._getCurrentPos();
            switch (this._state) {
                case this._STATE_JUMP:
                    this._updateStateIdle(a, b), this._doFall(a)
            }
            this._pos.y >= e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) && (this._steptimer -= a, 0 >= this._steptimer && (this._steptimer =
                this._STEPTIME, 0 == this._stepcount ? (e.WorkinCloud.instance._getSound().playSound("AssetAudioStep1", 0.5), this._stepcount = 1) : (e.WorkinCloud.instance._getSound().playSound("AssetAudioStep2", 0.5), this._stepcount = 0)));
            h.elements.entities.BasePlayer.prototype.update.call(this, a)
        },
        _setStateLose: function() {
            this._jumpStrength = 3 * -this._JUMP_POWER;
            this._velocity.x = -500
        },
        _setStateIdle: function() {
            this._speed = this._MAX_SPEED;
            this._destination = this._pos;
            this._jumpStrength = 0
        },
        _setStateOut: function() {
            this._velocity =
                new g.WorkinPoint(300, 0)
        },
        _setStateIn: function() {
            this.animate("idle_run");
            this._speed = 500
        },
        _setState: function(a) {
            switch (a) {
                case this._STATE_JUMP:
                    e.WorkinCloud.instance._getSound().playSound("AssetAudioJump"), this._jumpStrength = -this._JUMP_POWER, this.animate("jump"), 0 < this._bumpTimer && (this._jumpStrength /= 2)
            }
            h.elements.entities.BasePlayer.prototype._setState.call(this, a)
        },
        _addAnims: function() {
            this.addAnimation("idle_run", 1, 10);
            this.addAnimation("hit_chomp", 11, 19);
            this.addAnimation("jump", 21, 24)
        },
        _setCoolDownMax: function() {
            return 0.9
        },
        _setMovementBounds: function() {
            return new g.WMRectangle(100, 100, 700, 500)
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._collisionRect._getWidth() / 2, -this._collisionRect._getHeight())
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 150, 200)
        },
        __class__: h.elements.entities.episode2.E2Player
    });
    h.elements.entities.episode2.E2Rock = function(a) {
        a.library = "flump_obstacles";
        a.movie = this._getAssetID();
        a.layer = c.ConstantsApp.LAYER_BG;
        h.elements.entities.BaseEntity.call(this, a);
        a.pSpeed ||
            (a.pSpeed = 200);
        this._speed = a.pSpeed;
        this._pos.y = e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + 120;
        this.animate("idle");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2Rock"] = h.elements.entities.episode2.E2Rock;
    h.elements.entities.episode2.E2Rock.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2Rock".split(",");
    h.elements.entities.episode2.E2Rock.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode2.E2Rock.prototype = t(h.elements.entities.BaseEntity.prototype, {
        onCollision: function(a) {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1");
            a.doBump({});
            this._doDelete = !0;
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_DUST, {
                x: this._pos.x,
                y: this._pos.y
            }))
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && (this._doDelete = !0)
        },
        _setStateIn: function() {
            this._destination =
                new g.WorkinPoint(-120, this._pos.y)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 51)
        },
        _getAssetID: function() {
            switch (Math.round(e.WorkinUtils.getRandom(0, 4, !0))) {
                case 0:
                    return "_coral1";
                case 1:
                    return "_coral2";
                case 2:
                    return "_coral3";
                case 3:
                    return "_coral4";
                default:
                    return "_rock_1"
            }
        },
        __class__: h.elements.entities.episode2.E2Rock
    });
    h.elements.entities.episode2.E2Shard = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_gem_hit_animation";
        a.layer =
            c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        e.WorkinCloud.instance._getSound().playSound("Shard");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2Shard"] = h.elements.entities.episode2.E2Shard;
    h.elements.entities.episode2.E2Shard.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2Shard".split(",");
    h.elements.entities.episode2.E2Shard.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode2.E2Shard.prototype =
        t(h.elements.entities.BaseEntity.prototype, {
            _onAnimationComplete: function() {
                this._doDelete = !0
            },
            _onUpdateIn: function() {},
            _setStateIn: function() {
                this._lifeTimer = 0.3;
                this.animate("idle", 1)
            },
            _addAnims: function() {
                this.addAnimation("idle", 1, 4)
            },
            __class__: h.elements.entities.episode2.E2Shard
        });
    h.elements.entities.episode2.E2Shock = function(a) {
        a.asset = "monster_attack_fx_lg";
        a.layer = c.ConstantsApp.LAYER_FG;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        h.elements.entities.BaseEntity.call(this, a);
        this._render.scaleX = this._render.scaleY =
            0;
        e.WorkinCloud.instance._getSound().playSound("AssetAudioRainbow");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2Shock"] = h.elements.entities.episode2.E2Shock;
    h.elements.entities.episode2.E2Shock.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2Shock".split(",");
    h.elements.entities.episode2.E2Shock.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode2.E2Shock.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onUpdateIn: function(a) {
            this._render.scaleX += 2 * a;
            this._render.scaleY = this._render.scaleX;
            this._render.rotation += 1E3 * a;
            2 < this._render.scaleX && (this._doDelete = !0)
        },
        __class__: h.elements.entities.episode2.E2Shock
    });
    h.elements.entities.episode2.E2Turtle = function(a) {
        a.library = "flump_enemies";
        a.movie = "_gameplay_enemies_turtle";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._setScale(0.5);
        this._pos.y = e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL);
        this._pos.x =
            c.ConstantsApp.STAGE_WIDTH + 90;
        a.pSpeed || (a.pSpeed = 200);
        this._speed = e.WorkinUtils.getRandom(a.setSpeed + 10, a.setSpeed + 50);
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode2.E2Turtle"] = h.elements.entities.episode2.E2Turtle;
    h.elements.entities.episode2.E2Turtle.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode2,E2Turtle".split(",");
    h.elements.entities.episode2.E2Turtle.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode2.E2Turtle.prototype =
        t(h.elements.entities.BaseEntity.prototype, {
            timeToGo: function() {
                e.WorkinCloud.instance._getSound().playSound("AssetAudioGrunt", 0.3);
                h.elements.entities.BaseEntity.prototype.timeToGo.call(this)
            },
            shadowPoint: function() {
                return this._pos.y <= e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) ? e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL) : this._pos.y
            },
            onCollision: function(a) {
                this._state == this._STATE_IN && (a.doHurt({}), this._setState(this._STATE_OUT))
            },
            _onUpdateOut: function(a) {
                this._velocity.y +=
                    c.ConstantsApp.GRAVITY * a;
                this._pos.y - this._render.height > c.ConstantsApp.STAGE_HEIGHT && (this._doDelete = !0)
            },
            _onUpdateIn: function(a) {
                this._movement(a);
                0 > this._pos.x + this._render.width && (this._doDelete = !0)
            },
            _setStateOut: function() {
                this.animate("hit", 1);
                this._velocity.y = -e.WorkinUtils.getRandom(600, 800)
            },
            _setStateIn: function() {
                this.animate("walk");
                this._destination = new g.WorkinPoint(-50, this._pos.y)
            },
            getHostile: function() {
                return !0
            },
            _setCollision: function() {
                return new g.WMRectangle(0, 0, 90, 30)
            },
            _addAnims: function() {
                this._renderOffset.y = -30;
                this.addAnimation("walk", 1, 43);
                this.addAnimation("hit", 44, 77)
            },
            __class__: h.elements.entities.episode2.E2Turtle
        });
    h.elements.entities.episode3 = {};
    h.elements.entities.episode3.E3Dust = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_dust";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._setState(this._STATE_IN);
        this.animate("idle", 1)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Dust"] = h.elements.entities.episode3.E3Dust;
    h.elements.entities.episode3.E3Dust.__name__ =
        "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Dust".split(",");
    h.elements.entities.episode3.E3Dust.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode3.E3Dust.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onAnimationComplete: function() {
            this._doDelete = !0
        },
        _onUpdateIn: function() {},
        _setStateIn: function() {
            this._lifeTimer = 0.25;
            this._velocity.x = -500
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        _addAnims: function() {
            this.addAnimation("idle",
                1, 12)
        },
        __class__: h.elements.entities.episode3.E3Dust
    });
    h.elements.entities.episode3.E3Pickup = function(a) {
        a.asset = "red_crystal";
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = e.WorkinUtils.getRandom(250, 400);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width;
        this._baseY = this._pos.y + 15;
        a.pSpeed || (a.pSpeed = 200);
        this._speed = a.pSpeed;
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Pickup"] =
        h.elements.entities.episode3.E3Pickup;
    h.elements.entities.episode3.E3Pickup.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Pickup".split(",");
    h.elements.entities.episode3.E3Pickup.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode3.E3Pickup.prototype = t(h.elements.entities.BaseEntity.prototype, {
        shadowPoint: function() {
            return this._baseY
        },
        getYPos: function() {
            return this._baseY
        },
        onCollision: function(a) {
            this._doDelete || (e.WorkinCloud.instance._getSound().playSound("AssetAudioPickup"),
                a.doPickup({}), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E3_SPAWN_SHARD, {
                    x: this._pos.x,
                    y: this._pos.y
                })), this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            0 > this._pos.x + this._render.width && (this._doDelete = !0)
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BaseEntity.prototype.update.call(this, a)
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(2 * -this._render.width, this._pos.y)
        },
        _setCollision: function() {
            return new g.WMRectangle(0,
                0, 90, 30)
        },
        __class__: h.elements.entities.episode3.E3Pickup
    });
    h.elements.entities.episode3.E3Player = function() {
        h.elements.entities.BasePlayer.call(this, {
            library: "flump_monsters",
            movie: "_E3Monster",
            y: e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL),
            origin: new g.WorkinPoint(0.5, 1),
            layer: c.ConstantsApp.LAYER_PLAYER
        });
        this._pos.x = -400;
        this._destination = new g.WorkinPoint(250, e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL));
        this._soundCooldown = this._coolDown = 0;
        this._setScale(0.5)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Player"] = h.elements.entities.episode3.E3Player;
    h.elements.entities.episode3.E3Player.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Player".split(",");
    h.elements.entities.episode3.E3Player.__super__ = h.elements.entities.BasePlayer;
    h.elements.entities.episode3.E3Player.prototype = t(h.elements.entities.BasePlayer.prototype, {
        getYPos: function() {
            return this._pos.y + 15
        },
        chargePercent: function() {
            return 0 ==
                this._coolDown ? 0 : 100
        },
        doHurt: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioHit");
            0 >= this._invincibility && this._state != this._STATE_OUT && (e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_HEALTH, -1), 1 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) && this._state != this._STATE_LOSE ? (e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._setState(this._STATE_LOSE)) : this._invincibility = 1.5)
        },
        doBump: function() {
            this._state != this._STATE_OUT && this._setState(this._STATE_BUMP)
        },
        doPickup: function() {
            this._coolDown++;
            this.animate("chomp", 1)
        },
        doSpecial: function() {
            if ((this._state == this._STATE_IDLE || this._state == this._STATE_BUMP) && 0 < this._coolDown) e.WorkinCloud.instance._getSound().playSound("AssetAudioRainbow"), this.animate("chomp", 1), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E3_SHOCK, {
                x: this._pos.x,
                y: this._pos.y
            })), this._coolDown = 0
        },
        _onAnimationComplete: function() {
            this.animate("run")
        },
        _updateStateBump: function(a, b) {
            this._testMouseMovement(a,
                b);
            this._movementToDestination(a);
            this._bumpTimer -= a;
            0 > this._bumpTimer && this._setState(this._STATE_IDLE)
        },
        _updateStateHurt: function(a) {
            this._bumpTimer -= a;
            0 > this._bumpTimer && this._setState(this._STATE_IDLE);
            this._constrainMovement()
        },
        _updateStateIdle: function(a, b) {
            this._testMouseMovement(a, b);
            this._movementToDestination(a)
        },
        _updateStateIn: function(a) {
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE);
            this._movementToDestination(a)
        },
        update: function(a) {
            e.WorkinCloud.instance._getSound().getMute();
            this._soundCooldown -= a;
            0 > this._soundCooldown && (this._soundCooldown += 9.247, e.WorkinCloud.instance._getSound().playSound("AssetAudioSwim"));
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BasePlayer.prototype.update.call(this, a)
        },
        _setStateBump: function() {
            this._bumpTimer = 1;
            this._speed = 50
        },
        _setStateHurt: function() {
            this._velocity.x = 500;
            this._velocity.y = 0;
            this._bumpTimer = 0.75;
            this._invincibility = 1.5
        },
        _setStateLose: function() {
            this._velocity.y = 100
        },
        _setStateIdle: function() {
            this._speed =
                200;
            this._destination = this._pos
        },
        _setStateOut: function() {
            this._velocity = new g.WorkinPoint(300, 0);
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, Math.round(1E3 * this._coolDown))
        },
        _setStateIn: function() {
            this._speed = 200
        },
        _addAnims: function() {
            this._renderOffset.x = 100;
            this.addAnimation("run", 1, 28);
            this.addAnimation("chomp", 29, 43);
            this.animate("run")
        },
        _setMovementBounds: function() {
            return new g.WMRectangle(100, 250, 700, 125)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 400, 50)
        },
        __class__: h.elements.entities.episode3.E3Player
    });
    h.elements.entities.episode3.E3Rock = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_rock_1_water";
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        h.elements.entities.BaseEntity.call(this, a);
        a.pSpeed || (a.pSpeed = 200);
        this._speed = a.pSpeed / 2;
        this._pos.y = e.WorkinUtils.getRandom(300, 400);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + 120;
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Rock"] = h.elements.entities.episode3.E3Rock;
    h.elements.entities.episode3.E3Rock.__name__ =
        "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Rock".split(",");
    h.elements.entities.episode3.E3Rock.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode3.E3Rock.prototype = t(h.elements.entities.BaseEntity.prototype, {
        onCollision: function(a) {
            a.doBump({});
            this._doDelete = !0;
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E1_SPAWN_DUST, {
                x: this._pos.x,
                y: this._pos.y
            }))
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            1 > this._pos.subtractPointCopy(this._destination)._getLength() &&
                (this._doDelete = !0)
        },
        update: function(a) {
            this._pos.z = this._destination.z = this.getYPos();
            h.elements.entities.BaseEntity.prototype.update.call(this, a)
        },
        _setStateIn: function() {
            this.animate("idle");
            this._destination = new g.WorkinPoint(-120, this._pos.y)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 51)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        __class__: h.elements.entities.episode3.E3Rock
    });
    h.elements.entities.episode3.E3Shard = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_gem_hit_animation";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        e.WorkinCloud.instance._getSound().playSound("Shard");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Shard"] = h.elements.entities.episode3.E3Shard;
    h.elements.entities.episode3.E3Shard.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Shard".split(",");
    h.elements.entities.episode3.E3Shard.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode3.E3Shard.prototype =
        t(h.elements.entities.BaseEntity.prototype, {
            _onAnimationComplete: function() {
                this._doDelete = !0
            },
            _onUpdateIn: function() {},
            _setStateIn: function() {
                this._lifeTimer = 0.3;
                this.animate("idle", 1)
            },
            _addAnims: function() {
                this.addAnimation("idle", 1, 4)
            },
            __class__: h.elements.entities.episode3.E3Shard
        });
    h.elements.entities.episode3.E3Splash = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_dust_water";
        a.layer = c.ConstantsApp.LAYER_FG;
        e.WorkinCloud.instance._getSound().playSound("AssetAudioSplash");
        h.elements.entities.BaseEntity.call(this,
            a);
        this._setState(this._STATE_IN);
        this.animate("idle", 1)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Splash"] = h.elements.entities.episode3.E3Splash;
    h.elements.entities.episode3.E3Splash.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Splash".split(",");
    h.elements.entities.episode3.E3Splash.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode3.E3Splash.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onAnimationComplete: function() {
            this._doDelete = !0
        },
        _onUpdateIn: function() {},
        _setStateIn: function() {
            this._lifeTimer = 0.25;
            this._velocity.x = -500
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 30)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 12)
        },
        __class__: h.elements.entities.episode3.E3Splash
    });
    h.elements.entities.episode3.E3Urchin = function(a) {
        a.library = "flump_enemies";
        a.movie = "_gameplay_enemies_urchin";
        a.layer = c.ConstantsApp.LAYER_PLAYER;
        h.elements.entities.BaseEntity.call(this, a);
        this._setScale(0.5);
        this._pos.y = e.WorkinUtils.getRandom(250,
            400);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + 90;
        this._baseY = this._pos.y;
        a.pSpeed || (a.pSpeed = 200);
        this._speed = a.pSpeed;
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode3.E3Urchin"] = h.elements.entities.episode3.E3Urchin;
    h.elements.entities.episode3.E3Urchin.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode3,E3Urchin".split(",");
    h.elements.entities.episode3.E3Urchin.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode3.E3Urchin.prototype =
        t(h.elements.entities.BaseEntity.prototype, {
            shadowPoint: function() {
                return this._baseY
            },
            getYPos: function() {
                return this._baseY
            },
            onCollision: function(a) {
                this._state == this._STATE_IN && (a.doHurt({}), this._setState(this._STATE_OUT))
            },
            _onUpdateOut: function(a) {
                this._velocity.y += c.ConstantsApp.GRAVITY * a;
                this._pos.y > this._baseY && (this._doDelete = !0, e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E3_SPAWN_SPLASH, {
                    x: this._pos.x,
                    y: this._pos.y
                })))
            },
            _onUpdateIn: function() {
                0 >
                    this._pos.x + 90 && (this._doDelete = !0)
            },
            update: function(a) {
                this._pos.z = this._destination.z = this.getYPos();
                h.elements.entities.BaseEntity.prototype.update.call(this, a)
            },
            _setStateOut: function() {
                this.animate("hit", 1);
                this._velocity.y = -e.WorkinUtils.getRandom(600, 800)
            },
            _setStateIn: function() {
                this.animate("idle");
                this._velocity.x = -this._speed
            },
            getHostile: function() {
                return !0
            },
            _setSpeed: function() {
                return 250
            },
            _setCollisionOffset: function() {
                return new g.WorkinPoint(-this._collisionRect._getWidth() / 2, -this._collisionRect._getHeight())
            },
            _setCollision: function() {
                return new g.WMRectangle(0, 0, 90, 30)
            },
            _addAnims: function() {
                this.addAnimation("idle", 1, 59);
                this.addAnimation("hit", 60, 84)
            },
            __class__: h.elements.entities.episode3.E3Urchin
        });
    h.elements.entities.episode4 = {};
    h.elements.entities.episode4.E4Bounce = function(a) {
        this._BOUNCE = 650;
        a.library = "flump_enemies";
        a.movie = "_gameplay_enemies_rock";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._setScale(0.5);
        this.animate("idle");
        this._pos.y = e.WorkinUtils.getRandom(0,
            100);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width;
        this._speed = e.WorkinUtils.getRandom(350, 400);
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode4.E4Bounce"] = h.elements.entities.episode4.E4Bounce;
    h.elements.entities.episode4.E4Bounce.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode4,E4Bounce".split(",");
    h.elements.entities.episode4.E4Bounce.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode4.E4Bounce.prototype =
        t(h.elements.entities.BaseEntity.prototype, {
            shadowPoint: function() {
                return c.ConstantsApp.correctGround4(this._pos.x)
            },
            onCollision: function(a) {
                this._state == this._STATE_IN && (a.doHurt({}), this._setState(this._STATE_OUT))
            },
            _onUpdateOut: function(a) {
                this._velocity.y += c.ConstantsApp.GRAVITY * a;
                this._pos.y - this._render.height > c.ConstantsApp.STAGE_HEIGHT && (this._doDelete = !0)
            },
            _onUpdateIn: function(a) {
                this._velocity.y += c.ConstantsApp.GRAVITY * a;
                this._pos.y >= c.ConstantsApp.correctGround4(this._pos.x) && (this.animate("bounce",
                    1, !0), this._velocity.y = -this._BOUNCE, e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1"));
                0 > this._pos.x + this._render.width && (this._doDelete = !0)
            },
            _onAnimationComplete: function() {
                this.animate("idle")
            },
            _setStateOut: function() {
                this._velocity.y = -this._BOUNCE;
                this._velocity.x *= -1
            },
            _setStateIn: function() {
                this._velocity.x = -this._speed
            },
            getHostile: function() {
                return !0
            },
            _setCollision: function() {
                return new g.WMRectangle(0, 0, 90, 30)
            },
            _addAnims: function() {
                this._renderOffset.y = -30;
                this.addAnimation("idle",
                    1, 20);
                this.addAnimation("bounce", 21, 45)
            },
            __class__: h.elements.entities.episode4.E4Bounce
        });
    h.elements.entities.episode4.E4Pickup = function(a) {
        a.asset = "green_crystal";
        a.layer = c.ConstantsApp.LAYER_FG;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = -this._render.height;
        this._pos.x = e.WorkinUtils.getRandom(300, 860);
        this._speed = e.WorkinUtils.getRandom(250, 400);
        this._rotationSpeed = e.WorkinUtils.getRandom(500, 1500);
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode4.E4Pickup"] =
        h.elements.entities.episode4.E4Pickup;
    h.elements.entities.episode4.E4Pickup.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode4,E4Pickup".split(",");
    h.elements.entities.episode4.E4Pickup.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode4.E4Pickup.prototype = t(h.elements.entities.BaseEntity.prototype, {
        shadowPoint: function() {
            return c.ConstantsApp.correctGround4(this._pos.x)
        },
        onCollision: function(a) {
            this._doDelete || (e.WorkinCloud.instance._getSound().playSound("AssetAudioPickup"),
                a.doPickup({}), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E4_SPAWN_SHARD, {
                    x: this._pos.x,
                    y: this._pos.y
                })), this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            this._movement(a);
            this._render.rotation += this._rotationSpeed * a;
            this._pos.y >= c.ConstantsApp.correctGround4(this._pos.x) && (this._doDelete = !0, e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E4_SPAWN_SHARD, {
                x: this._pos.x,
                y: this._pos.y
            })))
        },
        _setStateIn: function() {
            this._destination =
                new g.WorkinPoint(this._pos.x - e.WorkinUtils.getRandom(100, 400), c.ConstantsApp.STAGE_HEIGHT)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 90, 30)
        },
        __class__: h.elements.entities.episode4.E4Pickup
    });
    h.elements.entities.episode4.E4Player = function() {
        this._MAX_SPEED = 400;
        this._STATE_SPECIAL = 10;
        h.elements.entities.BasePlayer.call(this, {
            library: "flump_monsters",
            movie: "_E4Monster",
            y: e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL),
            origin: new g.WorkinPoint(0.5, 1),
            layer: c.ConstantsApp.LAYER_PLAYER
        });
        this._setScale(0.75);
        this._pos.x = -250;
        this._destination = new g.WorkinPoint(100, c.ConstantsApp.correctGround4(100));
        this._coolDown = 0
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode4.E4Player"] = h.elements.entities.episode4.E4Player;
    h.elements.entities.episode4.E4Player.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode4,E4Player".split(",");
    h.elements.entities.episode4.E4Player.__super__ = h.elements.entities.BasePlayer;
    h.elements.entities.episode4.E4Player.prototype =
        t(h.elements.entities.BasePlayer.prototype, {
            shadowPoint: function() {
                return this._pos.y + 15
            },
            chargePercent: function() {
                return 100 * (1 - this._coolDown / this._coolDownMax)
            },
            doHurt: function() {
                e.WorkinCloud.instance._getSound().playSound("AssetAudioHit");
                0 >= this._invincibility && this._state == this._STATE_IDLE ? (e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_HEALTH, -1), 1 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) ? (e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._setState(this._STATE_LOSE)) :
                    this._invincibility = 1.5) : e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 100)
            },
            doPickup: function() {
                this._state == this._STATE_IDLE && 3 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) && e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_HEALTH, 1);
                e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 100)
            },
            doSpecial: function() {
                this._state == this._STATE_IDLE && 0 >= this._coolDown && (e.WorkinCloud.instance._getSound().playSound("AssetAudioTurtlePower"), this._setState(this._STATE_SPECIAL),
                    this._coolDown = this._coolDownMax)
            },
            _onAnimationComplete: function() {
                switch (this._state) {
                    case this._STATE_SPECIAL:
                        this.animate("idle_run_red")
                }
            },
            _testMovement2d: function(a, b) {
                h.elements.entities.BasePlayer.prototype._testMovement2d.call(this, a, b);
                this._destination.y = c.ConstantsApp.correctGround4(this._destination.x)
            },
            _updateStateOut: function() {
                this._pos.y = c.ConstantsApp.correctGround4(this._pos.x)
            },
            _updateStateHurt: function(a) {
                this._bumpTimer -= a;
                0 > this._bumpTimer && this._setState(this._STATE_IDLE);
                this._constrainMovement()
            },
            _updateStateIdle: function(a, b) {
                this._testMovement2d(a, b);
                this._movementToDestination(a)
            },
            _updateStateIn: function(a) {
                1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE);
                this._movementToDestination(a)
            },
            update: function(a) {
                0 < this._coolDown && (this._coolDown -= a, 0 > this._coolDown && (this._coolDown = 0));
                h.elements.entities.BasePlayer.prototype.update.call(this, a);
                switch (this._state) {
                    case this._STATE_SPECIAL:
                        this._bumpTimer -= a, 0 < this._specialTimer ? (this._specialTimer -=
                            a, this._destination = new g.WorkinPoint(this._pos.x - 50, c.ConstantsApp.correctGround4(this._pos.x - 50)), 0 >= this._specialTimer && (this._speed = 600, this._destination = new g.WorkinPoint(this._pos.x + 350, c.ConstantsApp.correctGround4(this._pos.x + 350)), this._constrainMovement())) : (1 > this._pos.subtractPointCopy(this._destination)._getLength() || 0 >= this._bumpTimer) && this._setState(this._STATE_IDLE), this._movementToDestination(a), this._pos.y = c.ConstantsApp.correctGround4(this._pos.x)
                }
            },
            _setStateLose: function() {
                this._velocity.y =
                    100
            },
            _setStateIdle: function() {
                this.animate("idle_run");
                this._speed = this._MAX_SPEED;
                this._destination = this._pos
            },
            _setStateOut: function() {
                this._velocity = new g.WorkinPoint(300, 0);
                e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, Math.floor(1E3 * this._coolDown))
            },
            _setStateIn: function() {
                this.animate("idle_run");
                this._speed = 300
            },
            _setState: function(a) {
                switch (a) {
                    case this._STATE_SPECIAL:
                        this.animate("shield", 1), this._speed = 100, this._specialTimer = 1, this._bumpTimer = 2.5
                }
                h.elements.entities.BasePlayer.prototype._setState.call(this,
                    a)
            },
            _setCoolDownMax: function() {
                return 3.5
            },
            _setMovementBounds: function() {
                return new g.WMRectangle(100, 100, 700, 600)
            },
            _setCollisionOffset: function() {
                return new g.WorkinPoint(-this._collisionRect._getWidth() / 2, -this._collisionRect._getHeight())
            },
            _setCollision: function() {
                return new g.WMRectangle(0, 0, 250, 100)
            },
            _addAnims: function() {
                this._renderOffset.y = 10;
                this.addAnimation("idle_run", 1, 20);
                this.addAnimation("shield", 21, 44);
                this.addAnimation("idle_run_red", 45, 63)
            },
            __class__: h.elements.entities.episode4.E4Player
        });
    h.elements.entities.episode4.E4Shard = function(a) {
        a.library = "flump_obstacles";
        a.movie = "_gem_hit_animation_green";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        e.WorkinCloud.instance._getSound().playSound("Shard");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode4.E4Shard"] = h.elements.entities.episode4.E4Shard;
    h.elements.entities.episode4.E4Shard.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode4,E4Shard".split(",");
    h.elements.entities.episode4.E4Shard.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode4.E4Shard.prototype = t(h.elements.entities.BaseEntity.prototype, {
        _onAnimationComplete: function() {
            this._doDelete = !0
        },
        _onUpdateIn: function() {},
        _setStateIn: function() {
            this._lifeTimer = 0.3;
            this.animate("idle", 1)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 4)
        },
        __class__: h.elements.entities.episode4.E4Shard
    });
    h.elements.entities.episode4.E4Turtle = function(a) {
        a.library = "flump_enemies";
        a.movie = "_gameplay_enemies_turtle";
        a.layer = c.ConstantsApp.LAYER_FG;
        h.elements.entities.BaseEntity.call(this, a);
        this._setScale(0.5);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + 90;
        this._pos.y = c.ConstantsApp.correctGround4(this._pos.x);
        a.pSpeed || (a.pSpeed = 200);
        this._speed = e.WorkinUtils.getRandom(a.setSpeed + 10, a.setSpeed + 50);
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode4.E4Turtle"] = h.elements.entities.episode4.E4Turtle;
    h.elements.entities.episode4.E4Turtle.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode4,E4Turtle".split(",");
    h.elements.entities.episode4.E4Turtle.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode4.E4Turtle.prototype = t(h.elements.entities.BaseEntity.prototype, {
        timeToGo: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioGrunt", 0.4);
            h.elements.entities.BaseEntity.prototype.timeToGo.call(this)
        },
        shadowPoint: function() {
            return this._pos.y <= c.ConstantsApp.correctGround4(this._pos.x) ? c.ConstantsApp.correctGround4(this._pos.x) : this._pos.y
        },
        onCollision: function(a) {
            this._state == this._STATE_IN &&
                (a.doHurt({}), this._setState(this._STATE_OUT))
        },
        _onUpdateOut: function(a) {
            this._velocity.y += c.ConstantsApp.GRAVITY * a;
            this._pos.y - this._render.height > c.ConstantsApp.STAGE_HEIGHT && (this._doDelete = !0)
        },
        _onUpdateIn: function() {
            this._pos.y = c.ConstantsApp.correctGround4(this._pos.x);
            0 > this._pos.x + 90 && (this._doDelete = !0)
        },
        _setStateOut: function() {
            this.animate("hit", 1);
            this._velocity.y = -e.WorkinUtils.getRandom(600, 800)
        },
        _setStateIn: function() {
            this.animate("walk");
            this._velocity.x = -this._speed
        },
        getHostile: function() {
            return !0
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 90, 30)
        },
        _addAnims: function() {
            this._renderOffset.y = -30;
            this._render.rotation = -10;
            this.addAnimation("walk", 1, 43);
            this.addAnimation("hit", 44, 77)
        },
        __class__: h.elements.entities.episode4.E4Turtle
    });
    h.elements.entities.episode5 = {};
    h.elements.entities.episode5.E5BrickWall = function(a) {
        a.library = "flump_rocks";
        a.movie = "_pillar";
        a.layer = c.ConstantsApp.LAYER_BG;
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = 0;
        this._pos.x = c.ConstantsApp.STAGE_WIDTH;
        this._health = 10;
        a.setSpeed || (a.setSpeed = 20);
        this._speed = a.setSpeed;
        this.animate("new");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode5.E5BrickWall"] = h.elements.entities.episode5.E5BrickWall;
    h.elements.entities.episode5.E5BrickWall.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode5,E5BrickWall".split(",");
    h.elements.entities.episode5.E5BrickWall.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode5.E5BrickWall.prototype =
        t(h.elements.entities.BaseEntity.prototype, {
            timeToGo: function() {
                this._setState(this._STATE_IDLE)
            },
            doHurt: function(a) {
                this._health -= a.hurtAmount;
                0 >= this._health ? this._setState(this._STATE_IDLE) : 5 >= this._health && (e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1"), this.animate("crack", 1))
            },
            onSecondCollision: function() {
                this._state != this._STATE_IDLE && this.timeToGo()
            },
            onCollision: function(a) {
                this._state == this._STATE_IN && a.doBump({
                    hitRock: !0,
                    pLeftEdge: this.get_rectangle()._getX(),
                    pPassObject: this
                })
            },
            _onUpdateIdle: function() {
                0 > this._pos.x + 240 && (this._doDelete = !0)
            },
            _onUpdateIn: function(a) {
                0 > this._pos.x + 240 && (this._doDelete = !0);
                this._movement(a)
            },
            _setStateOut: function() {
                this._velocity.x = 200
            },
            _setStateIdle: function() {
                e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak2");
                this.animate("broken", 1)
            },
            _setStateIn: function() {
                this._destination = new g.WorkinPoint(-150, this._pos.y)
            },
            _setCollisionOffset: function() {
                return new g.WorkinPoint(this._collisionRect._getWidth() / 2 + 100, 0)
            },
            _setCollision: function() {
                return new g.WMRectangle(0,
                    0, 120, 560)
            },
            _addAnims: function() {
                this.addAnimation("new", 1, 1);
                this.addAnimation("crack", 2, 2);
                this.addAnimation("broken", 3, 15)
            },
            __class__: h.elements.entities.episode5.E5BrickWall
        });
    h.elements.entities.episode5.E5KillWall = function(a) {
        a.asset = "level5_rock";
        a.layer = c.ConstantsApp.LAYER_BG;
        a.origin = new g.WorkinPoint(1, 1);
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL);
        this._sinCounter = this._pos.x = 0;
        e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak2");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode5.E5KillWall"] = h.elements.entities.episode5.E5KillWall;
    h.elements.entities.episode5.E5KillWall.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode5,E5KillWall".split(",");
    h.elements.entities.episode5.E5KillWall.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode5.E5KillWall.prototype = t(h.elements.entities.BaseEntity.prototype, {
        timeToGo: function() {
            this._setState(this._STATE_OUT)
        },
        onCollision: function(a) {
            a.doBump({
                hitKill: !0
            })
        },
        _onUpdateOut: function(a) {
            this._movement(a)
        },
        _onUpdateIdle: function(a) {
            this._destination.x = this._baseX + Math.sin(this._sinCounter) * h.elements.entities.episode5.E5KillWall._SINAMP;
            this._sinCounter += a;
            this._movement(a)
        },
        _onUpdateIn: function(a) {
            1 > this._pos.subtractPointCopy(this._destination)._getLength() && this._setState(this._STATE_IDLE);
            this._movement(a)
        },
        _setStateOut: function() {
            this._destination = new g.WorkinPoint(c.ConstantsApp.STAGE_WIDTH, this._pos.y)
        },
        _setStateIdle: function() {
            this._baseX = this._pos.x
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(75, this._pos.y)
        },
        _setSpeed: function() {
            return 200
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._collisionRect._getWidth(), -this._render.height)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 100, this._render.height)
        },
        __class__: h.elements.entities.episode5.E5KillWall
    });
    h.elements.entities.episode5.E5Pickup = function(a) {
        this._SINAMP = 75;
        a.asset = "green_crystal";
        a.layer =
            c.ConstantsApp.LAYER_FG;
        a.origin = new g.WorkinPoint(0.5, 0.5);
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = e.WorkinUtils.getRandom(250, 400);
        this._pos.x = c.ConstantsApp.STAGE_WIDTH;
        this._sinCounter = 0;
        this._baseY = this._pos.y;
        a.pSpeed || (a.pSpeed = 100);
        this._speed = a.pSpeed + e.WorkinUtils.getRandom(10, 75);
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode5.E5Pickup"] = h.elements.entities.episode5.E5Pickup;
    h.elements.entities.episode5.E5Pickup.__name__ =
        "com,nick,spongebob,monster_island,world,elements,entities,episode5,E5Pickup".split(",");
    h.elements.entities.episode5.E5Pickup.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode5.E5Pickup.prototype = t(h.elements.entities.BaseEntity.prototype, {
        onCollision: function(a) {
            this._doDelete || (e.WorkinCloud.instance._getSound().playSound("AssetAudioPickup"), a.doPickup({}), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_E4_SPAWN_SHARD, {
                x: this._pos.x,
                y: this._pos.y
            })), this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            this._destination.y = this._baseY + Math.sin(this._sinCounter) * this._SINAMP;
            this._sinCounter += a;
            this._movement(a);
            0 > this._pos.y + this._render.width && (this._doDelete = !0)
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(2 * -this._render.width, this._pos.y)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 90, 30)
        },
        __class__: h.elements.entities.episode5.E5Pickup
    });
    h.elements.entities.episode5.E5Player = function() {
        h.elements.entities.BasePlayer.call(this, {
            library: "flump_monsters",
            movie: "_E5Monster",
            y: e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_GROUND_LEVEL),
            origin: new g.WorkinPoint(0.5, 1),
            layer: c.ConstantsApp.LAYER_PLAYER
        });
        this._renderOffset.y = 75;
        this._pos.x = -200;
        this._pos.y = 350;
        this._destination = new g.WorkinPoint(250, this._pos.y);
        this._coolDown = 0;
        this._touchedObject = null;
        this._coolDownMax = 2.5;
        this._rightPinch = this._leftPinch = this._charging = !1;
        this.animate("idle");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode5.E5Player"] =
        h.elements.entities.episode5.E5Player;
    h.elements.entities.episode5.E5Player.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode5,E5Player".split(",");
    h.elements.entities.episode5.E5Player.__super__ = h.elements.entities.BasePlayer;
    h.elements.entities.episode5.E5Player.prototype = t(h.elements.entities.BasePlayer.prototype, {
        getYPos: function() {
            return this._pos.y + 15
        },
        chargePercent: function() {
            return 100 * (1 - this._coolDown / this._coolDownMax)
        },
        timeToGo: function() {
            this._setState(this._STATE_OUT)
        },
        doHurt: function() {
            0 >= this._invincibility && this._state == this._STATE_IDLE && (e.WorkinCloud.instance._getSound().playSound("AssetAudioGrunt"), this._invincibility = 1.5, e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_HEALTH, -1), 1 > e.WorkinCloud.instance.getInt(c.ConstantsApp.INT_HEALTH) && (e.WorkinCloud.instance._getSound().playSound("AssetAudioGameOver"), this._setState(this._STATE_LOSE)))
        },
        doBump: function(a) {
            a.rockPoint && this._leftPoint == this._setMovementBounds()._getX() && (this._leftPoint = a.pRight);
            a.hitKill &&
                (this._leftPinch = !0);
            a.hitRock && (this._rightPoint = a.pLeftEdge, this._touchedObject = a.pPassObject, this._rightPinch = !0);
            this._state == this._STATE_OUT && null != this._touchedObject && this._touchedObject.doHurt({
                hurtAmmount: 100
            })
        },
        doPickup: function() {
            e.WorkinCloud.instance.modifyInt(c.ConstantsApp.INT_SCORE, 1500)
        },
        doSpecial: function(a) {
            a.pStart && (this._charging = !0);
            a.pEnd && (null != this._touchedObject ? (this._coolDown == this._coolDownMax ? (this._touchedObject.doHurt({
                    hurtAmount: 5
                }), e.WorkinCloud.instance._getSound().playSound("AssetAudioMetroidRoar"),
                this.animate("punch_big", 1)) : (this._touchedObject.doHurt({
                hurtAmount: 1
            }), e.WorkinCloud.instance._getSound().playSound("AssetAudioHit"), this.animate("punch_reg", 1)), this._touchedObject = null) : this._coolDown == this._coolDownMax ? (e.WorkinCloud.instance._getSound().playSound("AssetAudioMetroidRoar"), this.animate("punch_big", 1)) : (e.WorkinCloud.instance._getSound().playSound("AssetAudioJump"), this.animate("punch_reg", 1)), this._coolDown = 0, this._charging = !1)
        },
        _testMouseMovement: function(a, b) {
            b.x - this._collisionRect._getWidth() /
                2 <= this._leftPoint && (b.x = this._leftPoint + this._collisionRect._getWidth() / 2);
            b.x + this._collisionRect._getWidth() / 2 >= this._rightPoint && (b.x = this._rightPoint - this._collisionRect._getWidth() / 2);
            h.elements.entities.BasePlayer.prototype._testMouseMovement.call(this, a, b);
            this._leftPoint = this._setMovementBounds()._getX();
            this._rightPoint = this._setMovementBounds()._getRight()
        },
        _updateStateIdle: function(a, b) {
            this._testMouseMovement(a, b);
            this._movementToDestination(a)
        },
        _updateStateIn: function(a) {
            1 > this._pos.subtractPointCopy(this._destination)._getLength() &&
                this._setState(this._STATE_IDLE);
            this._movementToDestination(a)
        },
        update: function(a) {
            h.elements.entities.BasePlayer.prototype.update.call(this, a);
            this._charging && (this._coolDown += a, this._coolDown > this._coolDownMax && (this._coolDown = this._coolDownMax));
            !0 == this._leftPinch && !0 == this._rightPinch && null != this._touchedObject && (this._touchedObject.timeToGo(), this.doHurt({}));
            this._touchedObject = null;
            this._rightPinch = this._leftPinch = !1
        },
        _onAnimationComplete: function() {
            this.animate("idle")
        },
        _setStateBump: function() {
            this._bumpTimer =
                1;
            this._speed = 50
        },
        _setStateHurt: function() {
            this._velocity.x = 500;
            this._velocity.y = 0;
            this._bumpTimer = 0.75;
            this._invincibility = 1.5
        },
        _setStateLose: function() {
            this._velocity.y = 100
        },
        _setStateIdle: function() {
            this._speed = 300;
            this._destination = this._pos
        },
        _setStateOut: function() {
            this._velocity = new g.WorkinPoint(300, 0)
        },
        _setStateIn: function() {
            this._speed = 200
        },
        _setMovementBounds: function() {
            return new g.WMRectangle(10, 100, 930, 460)
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(-this._collisionRect._getWidth() /
                2, -this._collisionRect._getHeight())
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 170, 150)
        },
        _addAnims: function() {
            this.addAnimation("idle", 1, 30);
            this.addAnimation("punch_reg", 31, 39);
            this.addAnimation("punch_big", 40, 66)
        },
        __class__: h.elements.entities.episode5.E5Player
    });
    h.elements.entities.episode5.E5Stala = function(a) {
        a.library = "flump_rocks";
        a.movie = "_stalagtite";
        a.layer = c.ConstantsApp.LAYER_BG;
        a.origin = new g.WorkinPoint(0.5, 1);
        h.elements.entities.BaseEntity.call(this, a);
        this._pos.y = this._render.height;
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width;
        this._health = 6;
        a.setSpeed || (a.setSpeed = 20);
        this._speed = a.setSpeed;
        this.animate("new");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode5.E5Stala"] = h.elements.entities.episode5.E5Stala;
    h.elements.entities.episode5.E5Stala.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode5,E5Stala".split(",");
    h.elements.entities.episode5.E5Stala.__super__ = h.elements.entities.BaseEntity;
    h.elements.entities.episode5.E5Stala.prototype = t(h.elements.entities.BaseEntity.prototype, {
        timeToGo: function() {
            this._setState(this._STATE_IDLE)
        },
        doHurt: function(a) {
            this._health -= a.hurtAmount;
            0 >= this._health ? this._setState(this._STATE_IDLE) : 5 >= this._health && (e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1"), this.animate("crack", 1))
        },
        onSecondCollision: function() {
            this._state != this._STATE_IDLE && this.timeToGo()
        },
        onCollision: function(a) {
            this._state == this._STATE_IN && (a._getPos().x > this._pos.x ?
                a.doBump({
                    rockPoint: !0,
                    pRight: this.get_rectangle()._getX()
                }) : a.doBump({
                    hitRock: !0,
                    pLeftEdge: this.get_rectangle()._getX(),
                    pPassObject: this
                }))
        },
        _onUpdateIdle: function() {
            0 > this._pos.x + 240 && (this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            0 > this._pos.x + 240 && (this._doDelete = !0);
            this._movement(a)
        },
        _setStateOut: function() {
            this._velocity.x = 200
        },
        _setStateIdle: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak2");
            this.animate("broken")
        },
        _setStateIn: function() {
            this._destination = new g.WorkinPoint(-320,
                this._pos.y)
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(this._collisionRect._getWidth() / 2, 0)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 290)
        },
        _addAnims: function() {
            this.addAnimation("new", 1, 1);
            this.addAnimation("crack", 2, 2);
            this.addAnimation("broken", 3, 3)
        },
        __class__: h.elements.entities.episode5.E5Stala
    });
    h.elements.entities.episode5.E5Stala2 = function(a) {
        a.library = "flump_rocks";
        a.movie = "_stalagmite";
        a.layer = c.ConstantsApp.LAYER_BG;
        a.origin = new g.WorkinPoint(0.5, 1);
        h.elements.entities.BaseEntity.call(this,
            a);
        this._pos.y = c.ConstantsApp.STAGE_HEIGHT - 290;
        this._pos.x = c.ConstantsApp.STAGE_WIDTH + this._render.width;
        this._health = 6;
        a.setSpeed || (a.setSpeed = 20);
        this._speed = a.setSpeed;
        this.animate("new");
        this._setState(this._STATE_IN)
    };
    k["com.nick.spongebob.monster_island.world.elements.entities.episode5.E5Stala2"] = h.elements.entities.episode5.E5Stala2;
    h.elements.entities.episode5.E5Stala2.__name__ = "com,nick,spongebob,monster_island,world,elements,entities,episode5,E5Stala2".split(",");
    h.elements.entities.episode5.E5Stala2.__super__ =
        h.elements.entities.BaseEntity;
    h.elements.entities.episode5.E5Stala2.prototype = t(h.elements.entities.BaseEntity.prototype, {
        timeToGo: function() {
            this._setState(this._STATE_IDLE)
        },
        doHurt: function(a) {
            this._health -= a.hurtAmount;
            0 >= this._health ? this._setState(this._STATE_IDLE) : 5 >= this._health && (e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak1"), this.animate("crack", 1))
        },
        onSecondCollision: function() {
            this._state != this._STATE_IDLE && this.timeToGo()
        },
        onCollision: function(a) {
            this._state == this._STATE_IN &&
                (a._getPos().x > this._pos.x ? a.doBump({
                    rockPoint: !0,
                    pRight: this.get_rectangle()._getX()
                }) : a.doBump({
                    hitRock: !0,
                    pLeftEdge: this.get_rectangle()._getX(),
                    pPassObject: this
                }))
        },
        _onUpdateIdle: function() {
            0 > this._pos.x + 240 && (this._doDelete = !0)
        },
        _onUpdateIn: function(a) {
            0 > this._pos.x + 240 && (this._doDelete = !0);
            this._movement(a)
        },
        _setStateOut: function() {
            this._velocity.x = 200
        },
        _setStateIdle: function() {
            e.WorkinCloud.instance._getSound().playSound("AssetAudioRockBreak2");
            this.animate("broken")
        },
        _setStateIn: function() {
            this._destination =
                new g.WorkinPoint(-320, this._pos.y)
        },
        _setCollisionOffset: function() {
            return new g.WorkinPoint(this._collisionRect._getWidth() / 2, 0)
        },
        _setCollision: function() {
            return new g.WMRectangle(0, 0, 120, 290)
        },
        _addAnims: function() {
            this.addAnimation("new", 1, 1);
            this.addAnimation("crack", 2, 2);
            this.addAnimation("broken", 3, 3)
        },
        __class__: h.elements.entities.episode5.E5Stala2
    });
    A = void 0;
    N = void 0;
    p = void 0;
    i = void 0;
    f = void 0;
    J = void 0;
    o = void 0;
    P = void 0;
    w = void 0;
    C = void 0;
    H = void 0;
    K = void 0;
    F = void 0;
    z = void 0;
    z = void 0;
    aa = void 0;
    z = void 0;
    z = void 0;
    o = {
        Disposable: function() {}
    };
    k["flambe.util.Disposable"] = o.Disposable;
    o.Disposable.__name__ = ["flambe", "util", "Disposable"];
    o.Disposable.prototype = {
        __class__: o.Disposable
    };
    P = function() {};
    k["flambe.Component"] = P;
    P.__name__ = ["flambe", "Component"];
    P.__interfaces__ = [o.Disposable];
    P.prototype = {
        _internal_init: function(a, b) {
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
            this._paused || e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventUpdate(a))
        },
        get_name: function() {
            return "ComponentUpdater_3"
        },
        __class__: $.ComponentUpdater
    });
    y = {
        ConstantsCloud: function() {}
    };
    k["com.workinman.data.ConstantsCloud"] = y.ConstantsCloud;
    y.ConstantsCloud.__name__ = ["com", "workinman", "data", "ConstantsCloud"];
    y.ConstantsCloud.getUniqueId = function() {
        return s.string(y.ConstantsCloud._uniqueId++)
    };
    y.ConstantsCloud.getIsAndroid = function() {
        return 0 <= x.window.navigator.userAgent.indexOf("Linux; U; Android 4")
    };
    l.QueuedAnimation = function() {};
    k["com.workinman.display.QueuedAnimation"] =
        l.QueuedAnimation;
    l.QueuedAnimation.__name__ = ["com", "workinman", "display", "QueuedAnimation"];
    l.QueuedAnimation.prototype = {
        _getForce: function() {
            return this._force
        },
        _getLoops: function() {
            return this._loops
        },
        _getName: function() {
            return this._name
        },
        __class__: l.QueuedAnimation,
        __properties__: {
            get_name: "_getName",
            get_loops: "_getLoops",
            get_force: "_getForce"
        }
    };
    l.AnimationDef = function(a, b, d) {
        this._id = a;
        this._startFrame = b;
        this._endFrame = d;
        this._playReverse = !1;
        b > d && (this._playReverse = !0, this._startFrame = d, this._endFrame =
            b)
    };
    k["com.workinman.display.AnimationDef"] = l.AnimationDef;
    l.AnimationDef.__name__ = ["com", "workinman", "display", "AnimationDef"];
    l.AnimationDef.prototype = {
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
        __class__: l.AnimationDef,
        __properties__: {
            get_start: "_getStart",
            get_end: "_getEnd",
            get_reverse: "_getReverse"
        }
    };
    l.ElementManager = function(a, b, d) {
        this._timeline = a;
        this._layers = new G;
        this._elements = [];
        this._camera = new g.WorkinCamera(b, d);
        this._zSortLayers = new G
    };
    k["com.workinman.display.ElementManager"] = l.ElementManager;
    l.ElementManager.__name__ = ["com", "workinman", "display", "ElementManager"];
    l.ElementManager.prototype = {
        renderElements: function() {
            for (var a = 0, b = this._elements; a < b.length;) {
                var d = b[a];
                ++a;
                d.renderPosition(this._camera)
            }
        },
        updateZSort: function(a) {
            if (this._zSortLayers.exists(a)) {
                for (var a = this._zSortLayers.get(a), b = a.length; 0 < b--;) a[b]._getDoDelete() && a.splice(b, 1);
                a.sort(function(a,
                    b) {
                    return a._getDepth() > b._getDepth() ? 1 : a._getDepth() < b._getDepth() ? -1 : 0
                });
                for (var b = 0, d = a.length; b < d;) {
                    var m = b++;
                    a[m]._getDoDelete() || a[m]._getEntity().parent.addChild(a[m]._getEntity())
                }
            }
        },
        removeElement: function(a) {
            for (this._i = 0; this._i < this._elements.length;) {
                if (this._elements[this._i]._getUniqueId() == a._getUniqueId()) {
                    this.removeElementAtIndex(this._i);
                    break
                }
                this._i++
            }
        },
        removeElementAtIndex: function(a) {
            this._elements[a]._getEntity().parent.removeChild(this._elements[a]._getEntity());
            this._elements[a]._setDoDelete(!0);
            this._elements[a].dispose();
            this._elements.splice(a, 1)
        },
        addElement: function(a) {
            if (!1 == this._layers.exists(a._getLayer())) return e.WorkinCloud.instance.log("[ElementManager](addElement) Trying to add element to non-existant layer '" + a._getLayer() + "'!"), a;
            for (this._i = 0; this._i < this._elements.length;) {
                if (this._elements[this._i]._getUniqueId() == a._getUniqueId()) return this._layers.get(a._getLayer()).addChild(a._getEntity()), a;
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
                var d = new N;
                this._timeline.addChild(d);
                this._layers.set(a, d);
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
            for (; 0 < this._elements.length;) this.removeElementAtIndex(this._elements.length -
                1);
            this._elements = null;
            this._camera.dispose();
            this._camera = null;
            for (var a = this._layers.iterator(); a.hasNext();) a.next().dispose();
            this._timeline = this._layers = null
        },
        __class__: l.ElementManager
    };
    l.PoolManager = function() {
        this._pools = new G;
        this._flagAllPoolsFull = !1;
        this._numPools = 0
    };
    k["com.workinman.display.PoolManager"] = l.PoolManager;
    l.PoolManager.__name__ = ["com", "workinman", "display", "PoolManager"];
    l.PoolManager.prototype = {
        addPool: function(a, b, d, m) {
            null == m && (m = !1);
            null == d && (d = 8);
            this._pools.exists(a) ?
                this._pools.get(a).changeCount(d, m) : (this._flagAllPoolsFull = !1, b = new l.PoolData(b, d, m, this._numPools), this._pools.set(a, b), this._numPools++)
        },
        update: function(a) {
            if (!this._flagAllPoolsFull) {
                this._flagAllPoolsFull = !0;
                for (var b = this._pools.iterator(); b.hasNext();) {
                    var d = b.next();
                    d._getIsPoolFull() || (this._flagAllPoolsFull = !1, d.update(a))
                }
                this._flagAllPoolsFull && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(l.PoolManager.ALL_POOLS_FULL))
            }
        },
        dispose: function() {
            for (var a = this._pools.iterator(); a.hasNext();) a.next().dispose();
            this._pools = null
        },
        __class__: l.PoolManager
    };
    l.PoolData = function(a, b, d, m) {
        null == m && (m = 0);
        null == d && (d = !1);
        this._AVERAGE_DELAY_BETWEEN_CREATE_ELEMENTS = 0.8;
        this._MAX_ELEMENTS_TO_CREATE_AT_ONCE = 8;
        this._elements = [];
        this._class = a;
        this._poolProgress = 0;
        this._flagPoolFull = !0;
        this._timerUpdateCreateElements = 0;
        this._timerOffset = m;
        this.changeCount(b, d)
    };
    k["com.workinman.display.PoolData"] = l.PoolData;
    l.PoolData.__name__ = ["com", "workinman", "display", "PoolData"];
    l.PoolData.prototype = {
        dispose: function() {
            for (var a =
                    0; a < this._elements.length;) this._elements[a]._setIsPooled(!1), this._elements[a].dispose(), a++;
            this._class = this._elements = null
        },
        _addPoolElements: function(a) {
            null == a && (a = !0);
            for (var b = 0; this._poolProgress < this._poolElementsToAdd && (!a || b < this._MAX_ELEMENTS_TO_CREATE_AT_ONCE);) b++, this._poolProgress++, this._elements.push(O.createInstance(this._class, [{
                pooled: !0
            }]));
            this._poolProgress < this._poolElementsToAdd ? this._timerUpdateCreateElements = this._AVERAGE_DELAY_BETWEEN_CREATE_ELEMENTS + 0.2 * this._timerOffset :
                (this._timerUpdateCreateElements = 0, this._flagPoolFull = !0)
        },
        update: function(a) {
            this._flagPoolFull || (this._timerUpdateCreateElements -= a, 0 >= this._timerUpdateCreateElements && this._addPoolElements())
        },
        changeCount: function(a, b) {
            null == b && (b = !0);
            a != this._elements.length && (this._poolElementsToAdd = this._poolProgress = 0, this._timerUpdateCreateElements = this._AVERAGE_DELAY_BETWEEN_CREATE_ELEMENTS + 0.2 * this._timerOffset, this._elements.length < a ? (this._flagPoolFull = !1, this._poolElementsToAdd = a - this._elements.length,
                b && this._addPoolElements(!1)) : this._flagPoolFull = !0)
        },
        _getIsPoolFull: function() {
            return this._flagPoolFull
        },
        __class__: l.PoolData,
        __properties__: {
            get_isPoolFull: "_getIsPoolFull"
        }
    };
    l.Renderable = function(a, b) {
        null == b && (b = 1);
        null == a && (a = 1);
        this.rotation = this.y = this.x = 0;
        this.scaleY = this.scaleX = 1;
        this.width = a;
        this.height = b;
        this.alpha = 1;
        this.visible = !0
    };
    k["com.workinman.display.Renderable"] = l.Renderable;
    l.Renderable.__name__ = ["com", "workinman", "display", "Renderable"];
    l.Renderable.prototype = {
        __class__: l.Renderable
    };
    l.TextBase = function(a, b, d, m, c) {
        null == m && (m = "");
        null == c && (c = {});
        c.x = a;
        c.y = b;
        l.Element.call(this, c);
        "" == m && (m = y.ConstantsCloud.FONT_DEFAULT);
        this._textString = d;
        this._fontName = m;
        this._spacing = c.spacing ? c.spacing : 0;
        this._width = c.width ? c.width : Math.POSITIVE_INFINITY;
        this._flagCenter = c.center ? c.center : !1;
        this._textDisplay = [];
        this._textDisplay.push(new p.TextSprite(e.WorkinCloud.instance._getAssets().getFont(this._fontName), ""));
        this.swapTexture(this._textDisplay[0]);
        this._textDisplay[0].set_pointerEnabled(!1);
        this.renderPositionWithoutCamera()
    };
    k["com.workinman.display.TextBase"] = l.TextBase;
    l.TextBase.__name__ = ["com", "workinman", "display", "TextBase"];
    l.TextBase.__super__ = l.Element;
    l.TextBase.prototype = t(l.Element.prototype, {
        _cleanUp: function() {
            for (; 1 < this._textDisplay.length;) this._textDisplay.pop().dispose();
            this._render.height = 0
        },
        dispose: function() {
            this._textDisplay = null;
            l.Element.prototype.dispose.call(this)
        },
        _renderTextToDisplay: function() {
            this._textDisplay[0].set_text(this._textString);
            this.setOrigin(this._renderOrigin)
        },
        _renderFontToDisplay: function() {
            for (var a = 0, b = this._textDisplay; a < b.length;) {
                var d = b[a];
                ++a;
                d.set_font(e.WorkinCloud.instance._getAssets().getFont(this._fontName))
            }
        },
        _setText: function(a) {
            this._textString = a;
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
                for (var a = R.replace(a, "<br>", "\\r\\n"), d = [], m = this._textDisplay[0]._font.getGlyphs(a), c = 0, f = 0, g = 0; f < m.length;) {
                    var h = m[f];
                    f++;
                    if (f == m.length) c += h.width * b;
                    else if (c += h.xAdvance * b + h.getKerning(m[f].charCode) * b, f < m.length - 1 && (92 == m[f - 1].charCode || 47 == m[f - 1].charCode) && 114 == m[f].charCode && (92 == m[f + 1].charCode || 47 == m[f + 1].charCode) && 110 == m[f + 2].charCode) c = f - 1, d.push(a.substring(g, c)), g = c + 4, c = 0;
                    c >= this._width / this._render.scaleX && (h = !0, c = a.lastIndexOf(" ",
                        f), -1 == c ? (h = !1, c = f - 1) : c++, d.push(a.substring(g, c) + (h ? "" : "-")), g = c, c = 0);
                    f == m.length && d.push(a.substring(g, f))
                }
                this._textDisplay[0].set_text(d.shift());
                this._texture.x.set__(-(this._renderOrigin.x * this._textDisplay[0].getNaturalWidth()));
                this._texture.y.set__(-(this._renderOrigin.y * this._textDisplay[0].getNaturalHeight()));
                0 == this._render.height && (this._render.height = this._textDisplay[0].getNaturalHeight());
                for (m = 0; m < d.length;) f = d[m], ++m, this._textDisplay.push(new p.TextSprite(e.WorkinCloud.instance._getAssets().getFont(this._fontName),
                    f)), this.addTextDisplay(this._textDisplay[this._textDisplay.length - 1])
            }
        },
        addTextDisplay: function(a) {
            this._flagCenter && a.x.set__(this._renderOrigin.x * (this._texture.getNaturalWidth() - a.getNaturalWidth()));
            a.y.set__(this._render.height + this._spacing);
            this._render.height += a.getNaturalHeight() + this._spacing;
            this._render.width = Math.max(this._render.width, a.getNaturalWidth());
            this._textureEntity.addChild((new N).add(a))
        },
        _getTextDisplay: function() {
            return this._textDisplay
        },
        __class__: l.TextBase,
        __properties__: t(l.Element.prototype.__properties__, {
            set_font: "_setFont",
            get_font: "_getFont",
            set_text: "_setText",
            get_text: "_getText"
        })
    });
    l.TextInput = function() {};
    k["com.workinman.display.TextInput"] = l.TextInput;
    l.TextInput.__name__ = ["com", "workinman", "display", "TextInput"];
    l.TextInput.__super__ = l.TextBase;
    l.TextInput.prototype = t(l.TextBase.prototype, {
        dispose: function() {
            e.WorkinCloud.instance._getDispatcher().removeEventListener(y.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY, u(this, this._onEventInputArbitraryKey));
            l.TextBase.prototype.dispose.call(this)
        },
        setOrigin: function(a) {
            this._renderOrigin.toPoint(a);
            this._texture.x.set__(-(this._renderOrigin.x * this._render.width));
            this._texture.y.set__(-(this._renderOrigin.y * this._render.height))
        },
        addCharacter: function(a) {
            this._textString += a;
            this._updateTextDisplay(this._textString)
        },
        backspace: function() {
            this._textString = B.substr(this._textString, 0, this._textString.length - 1);
            this._updateTextDisplay(this._textString)
        },
        space: function() {
            this.addCharacter(" ")
        },
        _onEventInputArbitraryKey: function(a) {
            "backspace" ==
            a._getData().key.toString().toLowerCase() ? this.backspace() : "space" == a._getData().key.toString().toLowerCase() ? this.space() : 0 == a._getData().key.toString().toLowerCase().indexOf("number") ? this.addCharacter(a._getData().key.toString().charAt(6)) : "enter" == a._getData().key.toString().toLowerCase() ? e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(c.ConstantsApp.EVENT_INPUT_FIELD_ENTER, {
                string: this._textString
            })) : 1 == a._getData().key.toString().length && this.addCharacter(a._getData().key.toString())
        },
        __class__: l.TextInput
    });
    l.TextLocalized = function(a, b, d, m, c) {
        null == m && (m = "");
        l.TextBase.call(this, a, b, d, m, c);
        this._renderTextToDisplay()
    };
    k["com.workinman.display.TextLocalized"] = l.TextLocalized;
    l.TextLocalized.__name__ = ["com", "workinman", "display", "TextLocalized"];
    l.TextLocalized.__super__ = l.TextBase;
    l.TextLocalized.prototype = t(l.TextBase.prototype, {
        setOrigin: function(a) {
            this._renderOrigin.toPoint(a);
            this._texture.x.set__(-(this._renderOrigin.x * this._render.width));
            this._texture.y.set__(-(this._renderOrigin.y *
                this._render.height))
        },
        _renderTextToDisplay: function() {
            var a = e.WorkinCloud.instance._getLocalize().getData(this._textString);
            this._renderOffset.x = a._getOffsetX();
            this._renderOffset.y = a._getOffsetY();
            this._render.scaleX = a._getScale();
            this._render.scaleY = a._getScale();
            a._getFontName() != this._fontName && this._setFont(a._getFontName());
            this._updateTextDisplay(e.WorkinCloud.instance._getLocalize().getData(this._textString)._getString());
            1 == this._textDisplay.length && (this._render.width = this._textDisplay[0].getNaturalWidth(),
                this._render.height = this._textDisplay[0].getNaturalHeight());
            this._flagCenter || this.setOrigin(this._renderOrigin);
            this.renderPositionWithoutCamera()
        },
        __class__: l.TextLocalized
    });
    n.WMEvent = function(a) {
        this._eventId = a
    };
    k["com.workinman.events.WMEvent"] = n.WMEvent;
    n.WMEvent.__name__ = ["com", "workinman", "events", "WMEvent"];
    n.WMEvent.prototype = {
        getEventId: function() {
            return this._eventId
        },
        __class__: n.WMEvent,
        __properties__: {
            get_eventId: "getEventId"
        }
    };
    n.WMEventData = function(a, b) {
        n.WMEvent.call(this, a);
        this._data =
            b
    };
    k["com.workinman.events.WMEventData"] = n.WMEventData;
    n.WMEventData.__name__ = ["com", "workinman", "events", "WMEventData"];
    n.WMEventData.__super__ = n.WMEvent;
    n.WMEventData.prototype = t(n.WMEvent.prototype, {
        _getData: function() {
            return this._data
        },
        __class__: n.WMEventData,
        __properties__: t(n.WMEvent.prototype.__properties__, {
            get_data: "_getData"
        })
    });
    n._WMEventDispatcher = {};
    n._WMEventDispatcher.WMEventTracker = function() {
        this._signalConnection = [];
        this._signal = new o.Signal1
    };
    k["com.workinman.events._WMEventDispatcher.WMEventTracker"] =
        n._WMEventDispatcher.WMEventTracker;
    n._WMEventDispatcher.WMEventTracker.__name__ = ["com", "workinman", "events", "_WMEventDispatcher", "WMEventTracker"];
    n._WMEventDispatcher.WMEventTracker.prototype = {
        dispose: function() {
            this._signal = null;
            for (var a = 0, b = this._signalConnection; a < b.length;) {
                var d = b[a];
                ++a;
                d.dispose()
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
            for (var b = this._signalConnection.length; 0 <
                b;) b--, L.compareMethods(this._signalConnection[b]._getListener(), a) && (this._signalConnection[b].dispose(), this._signalConnection.splice(b, 1))
        },
        addEventListener: function(a) {
            this._signalConnection.push(new n._WMEventDispatcher.SignalTracker(a, this._signal.connect(a)))
        },
        __class__: n._WMEventDispatcher.WMEventTracker
    };
    n._WMEventDispatcher.SignalTracker = function(a, b) {
        this._function = a;
        this._connection = b
    };
    k["com.workinman.events._WMEventDispatcher.SignalTracker"] = n._WMEventDispatcher.SignalTracker;
    n._WMEventDispatcher.SignalTracker.__name__ = ["com", "workinman", "events", "_WMEventDispatcher", "SignalTracker"];
    n._WMEventDispatcher.SignalTracker.prototype = {
        _getListener: function() {
            return this._function
        },
        dispose: function() {
            this._function = null;
            this._connection.dispose();
            this._connection = null
        },
        __class__: n._WMEventDispatcher.SignalTracker,
        __properties__: {
            get_listener: "_getListener"
        }
    };
    n.WMEventFlow = function(a, b) {
        null == b && (b = !1);
        this.flowId = a;
        this.targetScreen = b;
        n.WMEvent.call(this, n.WMEventFlow.EVENT_FLOW)
    };
    k["com.workinman.events.WMEventFlow"] =
        n.WMEventFlow;
    n.WMEventFlow.__name__ = ["com", "workinman", "events", "WMEventFlow"];
    n.WMEventFlow.__super__ = n.WMEvent;
    n.WMEventFlow.prototype = t(n.WMEvent.prototype, {
        __class__: n.WMEventFlow
    });
    n.WMEventInput = function(a, b, d, m, c) {
        null == c && (c = 0);
        n.WMEvent.call(this, n.WMEventInput.EVENT_INPUT);
        this.phase = a;
        this.input = b;
        this.x = d;
        this.y = m;
        this.swipe = c
    };
    k["com.workinman.events.WMEventInput"] = n.WMEventInput;
    n.WMEventInput.__name__ = ["com", "workinman", "events", "WMEventInput"];
    n.WMEventInput.__super__ = n.WMEvent;
    n.WMEventInput.prototype =
        t(n.WMEvent.prototype, {
            __class__: n.WMEventInput
        });
    n.WMEventInterfaceChange = function(a, b, d) {
        null == b && (b = "");
        this.flowId = a;
        this.screenId = b;
        null == d && (d = new G);
        this.customData = d;
        n.WMEvent.call(this, n.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT)
    };
    k["com.workinman.events.WMEventInterfaceChange"] = n.WMEventInterfaceChange;
    n.WMEventInterfaceChange.__name__ = ["com", "workinman", "events", "WMEventInterfaceChange"];
    n.WMEventInterfaceChange.__super__ = n.WMEvent;
    n.WMEventInterfaceChange.prototype = t(n.WMEvent.prototype, {
        __class__: n.WMEventInterfaceChange
    });
    n.WMEventScreenOut = function(a, b) {
        this.flowId = a;
        this.screenId = b;
        n.WMEvent.call(this, n.WMEventScreenOut.EVENT_SCREEN_OUTPUT)
    };
    k["com.workinman.events.WMEventScreenOut"] = n.WMEventScreenOut;
    n.WMEventScreenOut.__name__ = ["com", "workinman", "events", "WMEventScreenOut"];
    n.WMEventScreenOut.__super__ = n.WMEvent;
    n.WMEventScreenOut.prototype = t(n.WMEvent.prototype, {
        __class__: n.WMEventScreenOut
    });
    n.WMEventUpdate = function(a) {
        n.WMEvent.call(this, n.WMEventUpdate.EVENT_UPDATE);
        this._dt =
            a
    };
    k["com.workinman.events.WMEventUpdate"] = n.WMEventUpdate;
    n.WMEventUpdate.__name__ = ["com", "workinman", "events", "WMEventUpdate"];
    n.WMEventUpdate.__super__ = n.WMEvent;
    n.WMEventUpdate.prototype = t(n.WMEvent.prototype, {
        getDt: function() {
            return this._dt
        },
        __class__: n.WMEventUpdate,
        __properties__: t(n.WMEvent.prototype.__properties__, {
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
            return this._line2 = a
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
    g.WMRectangle = function(a, b, d, m) {
        null == m && (m = 0);
        null == d && (d = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this._x = a;
        this._y = b;
        this._width = d;
        this._height = m;
        this._workLine = null
    };
    k["com.workinman.math.WMRectangle"] = g.WMRectangle;
    g.WMRectangle.__name__ = ["com", "workinman", "math", "WMRectangle"];
    g.WMRectangle.prototype = {
        intersects: function(a) {
            return this._getX() < a._getRight() && this._getRight() > a._getX() && this._getY() < a._getBottom() && this._getBottom() > a._getY()
        },
        toXY: function(a, b) {
            this._setX(a);
            this._setY(b)
        },
        contains: function(a, b) {
            return a < this._getX() || a > this._getRight() || b > this._getBottom() || b < this._getY() ?
                !1 : !0
        },
        _setCenterY: function(a) {
            this._y = a - this._height / 2;
            return this._getCenterY()
        },
        _getCenterY: function() {
            return this._y + this._height / 2
        },
        _setCenterX: function(a) {
            this._x = a - this._width / 2;
            return this._getCenterX()
        },
        _getCenterX: function() {
            return this._x + this._width / 2
        },
        _setRight: function(a) {
            this._x = a - this._width;
            return this._getRight()
        },
        _getRight: function() {
            return this._x + this._width
        },
        _setBottom: function(a) {
            this._y = a - this._height;
            return this._getBottom()
        },
        _getBottom: function() {
            return this._y + this._height
        },
        _setHeight: function(a) {
            return this._height = a
        },
        _getHeight: function() {
            return this._height
        },
        _setWidth: function(a) {
            return this._width = a
        },
        _getWidth: function() {
            return this._width
        },
        _setY: function(a) {
            return this._y = a
        },
        _getY: function() {
            return this._y
        },
        _setX: function(a) {
            return this._x = a
        },
        _getX: function() {
            return this._x
        },
        dispose: function() {
            this._workLine = null
        },
        __class__: g.WMRectangle,
        __properties__: {
            set_x: "_setX",
            get_x: "_getX",
            set_y: "_setY",
            get_y: "_getY",
            set_top: "_setY",
            get_top: "_getY",
            set_left: "_setX",
            get_left: "_getX",
            set_width: "_setWidth",
            get_width: "_getWidth",
            set_height: "_setHeight",
            get_height: "_getHeight",
            set_bottom: "_setBottom",
            get_bottom: "_getBottom",
            set_right: "_setRight",
            get_right: "_getRight"
        }
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
            0 == this._getVector().x && (this._slope = 1E5);
            this._yIntercept = this._getP0().y - this._slope * this._getP0().x;
            this._parametricDenom = new g.WorkinPoint(this._getP1().x - this._getP0().x, this._getP1().y - this._getP0().y);
            this._vector.pseudoCross(this._normal);
            this._normal.normalize()
        },
        endToPoint: function(a) {
            this._p1.toPoint(a);
            this._calcProperties()
        },
        originToPoint: function(a) {
            this._p0.toPoint(a);
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
            this._p1 = new g.WorkinPoint(this._p0.x + this._vector.x * (a / this._getLength()), this._p0.y + this._vector.y *
                (a / this._getLength()));
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
            this._parametricDenom = this._vector = this._normal = this._p1 = this._p0 = null
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
    g.WorkinMath.diffBetweenPoints =
        function(a, b) {
            return new g.WorkinPoint(b.x - a.x, b.y - a.y)
        };
    g.WorkinPoint = function(a, b, d) {
        null == d && (d = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = Math.round(1E3 * a) / 1E3;
        this.y = Math.round(1E3 * b) / 1E3;
        this.z = Math.round(1E3 * d) / 1E3;
        this.calculateLength()
    };
    k["com.workinman.math.WorkinPoint"] = g.WorkinPoint;
    g.WorkinPoint.__name__ = ["com", "workinman", "math", "WorkinPoint"];
    g.WorkinPoint.prototype = {
        _getNormalizedMagnitude: function() {
            var a = this.normalizeCopy();
            return Math.sqrt(a.x * a.x + a.y * a.y)
        },
        rotateTo: function(a) {
            this.rotate(a -
                this._getAngle())
        },
        rotate: function(a) {
            var a = a * (Math.PI / 180),
                b = this.x * Math.cos(a) - this.y * Math.sin(a),
                a = this.y * Math.cos(a) + this.x * Math.sin(a);
            this.x = b;
            this.y = a
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
            0 != this._length && (this.x /=
                this._length, this.y /= this._length, this.z /= this._length, this.calculateLength())
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
        subtractPointCopy: function(a) {
            return new g.WorkinPoint(this.x - a.x, this.y - a.y, this.z - a.z)
        },
        subtractPoint: function(a) {
            this.x -=
                a.x;
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
        to: function(a, b, d) {
            null == d && (d = 0);
            this.x = a;
            this.y = b;
            this.z = d;
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
        __class__: g.WorkinPoint,
        __properties__: {
            get_angle: "_getAngle",
            set_length: "_setLength",
            get_length: "_getLength"
        }
    };
    g.tween = {};
    g.tween.PennerEasing = function() {};
    k["com.workinman.math.tween.PennerEasing"] = g.tween.PennerEasing;
    g.tween.PennerEasing.__name__ = ["com", "workinman", "math", "tween", "PennerEasing"];
    g.tween.PennerEasing.easeInQuad = function(a, b, d, m) {
        return d * (a /= m) * a + b
    };
    g.tween.PennerEasing.easeOutQuad = function(a, b, d, m) {
        return -d * (a /= m) * (a - 2) + b
    };
    g.tween.PennerEasing.easeInOutQuad = function(a, b, d, m) {
        return 1 > (a /= m / 2) ? d / 2 * a * a + b : -d / 2 * (--a * (a - 2) - 1) + b
    };
    g.tween.PennerEasing.easeInExpo = function(a, b, d, m) {
        return 0 == a ?
            b : d * Math.pow(2, 10 * (a / m - 1)) + b
    };
    g.tween.PennerEasing.easeOutExpo = function(a, b, d, m) {
        return a == m ? b + d : d * (-Math.pow(2, -10 * a / m) + 1) + b
    };
    g.tween.PennerEasing.easeInOutExpo = function(a, b, d, m) {
        return 0 == a ? b : a == m ? b + d : 1 > (a /= m / 2) ? d / 2 * Math.pow(2, 10 * (a - 1)) + b : d / 2 * (-Math.pow(2, -10 * --a) + 2) + b
    };
    g.tween.PennerEasing.easeInElastic = function(a, b, d, m) {
        return g.tween.PennerEasing.easeInElasticL(a, b, d, m)
    };
    g.tween.PennerEasing.easeInElasticL = function(a, b, d, m, c, e) {
        null == e && (e = -0.123456);
        null == c && (c = -0.123456);
        if (0 == a) return b;
        if (1 ==
            (a /= m)) return b + d; - 0.123456 == e && (e = 0.3 * m); - 0.123456 == c || c < Math.abs(d) ? (c = d, d = e / 4) : d = e / (2 * Math.PI) * Math.asin(d / c);
        return -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * m - d) * 2 * Math.PI / e)) + b
    };
    g.tween.PennerEasing.easeOutElastic = function(a, b, d, m) {
        return g.tween.PennerEasing.easeOutElasticL(a, b, d, m)
    };
    g.tween.PennerEasing.easeOutElasticL = function(a, b, d, m, c, e) {
        null == e && (e = -0.123456);
        null == c && (c = -0.123456);
        var f;
        if (0 == a) return b;
        if (1 == (a /= m)) return b + d; - 0.123456 == e && (e = 0.3 * m); - 0.123456 == c || c < Math.abs(d) ? (c = d, f = e / 4) :
            f = e / (2 * Math.PI) * Math.asin(d / c);
        return c * Math.pow(2, -10 * a) * Math.sin((a * m - f) * 2 * Math.PI / e) + d + b
    };
    g.tween.PennerEasing.easeInOutElastic = function(a, b, d, m) {
        return g.tween.PennerEasing.easeInOutElasticL(a, b, d, m)
    };
    g.tween.PennerEasing.easeInOutElasticL = function(a, b, d, m, c, e) {
        null == e && (e = -0.123456);
        null == c && (c = -0.123456);
        var f;
        if (0 == a) return b;
        if (2 == (a /= m / 2)) return b + d; - 0.123456 == e && (e = m * 0.3 * 1.5); - 0.123456 == c || c < Math.abs(d) ? (c = d, f = e / 4) : f = e / (2 * Math.PI) * Math.asin(d / c);
        return 1 > a ? -0.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a *
            m - f) * 2 * Math.PI / e) + b : 0.5 * c * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * m - f) * 2 * Math.PI / e) + d + b
    };
    g.tween.PennerEasing.easeInBack = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInBackL(a, b, d, c)
    };
    g.tween.PennerEasing.easeInBackL = function(a, b, d, c, e) {
        null == e && (e = -0.123456); - 0.123456 == e && (e = 1.70158);
        return d * (a /= c) * a * ((e + 1) * a - e) + b
    };
    g.tween.PennerEasing.easeInOutBack = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutBackL(a, b, d, c)
    };
    g.tween.PennerEasing.easeInOutBackL = function(a, b, d, c, e) {
        null == e && (e = -0.123456); -
        0.123456 == e && (e = 1.70158);
        return 1 > (a /= c / 2) ? d / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : d / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
    };
    g.tween.PennerEasing.easeOutBounce = function(a, b, d, c) {
        return (a /= c) < 1 / 2.75 ? d * 7.5625 * a * a + b : a < 2 / 2.75 ? d * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? d * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : d * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
    };
    g.tween.PennerEasing.easeInBounce = function(a, b, d, c) {
        return d - g.tween.PennerEasing.easeOutBounce(c - a, 0, d, c) + b
    };
    g.tween.PennerEasing.easeInOutBounce = function(a, b, d, c) {
        return a <
            c / 2 ? 0.5 * g.tween.PennerEasing.easeInBounce(2 * a, 0, d, c) + b : 0.5 * g.tween.PennerEasing.easeOutBounce(2 * a - c, 0, d, c) + 0.5 * d + b
    };
    g.tween.PennerEasing.easeInCubic = function(a, b, d, c) {
        return d * (a /= c) * a * a + b
    };
    g.tween.PennerEasing.easeOutCubic = function(a, b, d, c) {
        return d * ((a = a / c - 1) * a * a + 1) + b
    };
    g.tween.PennerEasing.easeInOutCubic = function(a, b, d, c) {
        return 1 > (a /= c / 2) ? d / 2 * a * a * a + b : d / 2 * ((a -= 2) * a * a + 2) + b
    };
    g.tween.PennerEasing.easeInQuart = function(a, b, d, c) {
        return d * (a /= c) * a * a * a + b
    };
    g.tween.PennerEasing.easeOutQuart = function(a, b,
        d, c) {
        return -d * ((a = a / c - 1) * a * a * a - 1) + b
    };
    g.tween.PennerEasing.easeInOutQuart = function(a, b, d, c) {
        return 1 > (a /= c / 2) ? d / 2 * a * a * a * a + b : -d / 2 * ((a -= 2) * a * a * a - 2) + b
    };
    g.tween.PennerEasing.easeInQuint = function(a, b, d, c) {
        return d * (a /= c) * a * a * a * a + b
    };
    g.tween.PennerEasing.easeOutQuint = function(a, b, d, c) {
        return d * ((a = a / c - 1) * a * a * a * a + 1) + b
    };
    g.tween.PennerEasing.easeInOutQuint = function(a, b, d, c) {
        return 1 > (a /= c / 2) ? d / 2 * a * a * a * a * a + b : d / 2 * ((a -= 2) * a * a * a * a + 2) + b
    };
    g.tween.PennerEasing.easeInSine = function(a, b, d, c) {
        return -d * Math.cos(a / c * (Math.PI /
            2)) + d + b
    };
    g.tween.PennerEasing.easeOutSine = function(a, b, d, c) {
        return d * Math.sin(a / c * (Math.PI / 2)) + b
    };
    g.tween.PennerEasing.easeInOutSine = function(a, b, d, c) {
        return -d / 2 * (Math.cos(Math.PI * a / c) - 1) + b
    };
    g.tween.PennerEasing.easeInCirc = function(a, b, d, c) {
        return -d * (Math.sqrt(1 - (a /= c) * a) - 1) + b
    };
    g.tween.PennerEasing.easeOutCirc = function(a, b, d, c) {
        return d * Math.sqrt(1 - (a = a / c - 1) * a) + b
    };
    g.tween.PennerEasing.easeInOutCirc = function(a, b, d, c) {
        return 1 > (a /= c / 2) ? -d / 2 * (Math.sqrt(1 - a * a) - 1) + b : d / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
    };
    g.tween.PennerManager =
        function() {};
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
    g.tween.PennerManager._tweenLinear = function(a, b, d, c) {
        return a + d / c * b
    };
    g.tween.PennerManager._tweenEaseBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutQuad(d, a, b, c)
    };
    g.tween.PennerManager._tweenEaseIn =
        function(a, b, d, c) {
            return g.tween.PennerEasing.easeInQuad(d, a, b, c)
        };
    g.tween.PennerManager._tweenEaseOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutQuad(d, a, b, c)
    };
    g.tween.PennerManager._tweenExpoBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutExpo(d, a, b, c)
    };
    g.tween.PennerManager._tweenExpoIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInExpo(d, a, b, c)
    };
    g.tween.PennerManager._tweenExpoOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutExpo(d, a, b, c)
    };
    g.tween.PennerManager._tweenElasticBoth =
        function(a, b, d, c) {
            return g.tween.PennerEasing.easeInOutElastic(d, a, b, c)
        };
    g.tween.PennerManager._tweenElasticIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInElastic(d, a, b, c)
    };
    g.tween.PennerManager._tweenElasticOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutElastic(d, a, b, c)
    };
    g.tween.PennerManager._tweenBumpBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutBack(d, a, b, c)
    };
    g.tween.PennerManager._tweenBumpIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInBack(d, a, b, c)
    };
    g.tween.PennerManager._tweenBounceBoth =
        function(a, b, d, c) {
            return g.tween.PennerEasing.easeInOutBounce(d, a, b, c)
        };
    g.tween.PennerManager._tweenBounceIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInBounce(d, a, b, c)
    };
    g.tween.PennerManager._tweenBounceOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutBounce(d, a, b, c)
    };
    g.tween.PennerManager._tweenCubicBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutCubic(d, a, b, c)
    };
    g.tween.PennerManager._tweenCubicIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInCubic(d, a, b, c)
    };
    g.tween.PennerManager._tweenCubicOut =
        function(a, b, d, c) {
            return g.tween.PennerEasing.easeOutCubic(d, a, b, c)
        };
    g.tween.PennerManager._tweenSpaceBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutQuart(d, a, b, c)
    };
    g.tween.PennerManager._tweenSpaceIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInQuart(d, a, b, c)
    };
    g.tween.PennerManager._tweenSpaceOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutQuart(d, a, b, c)
    };
    g.tween.PennerManager._tweenBlastBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutQuint(d, a, b, c)
    };
    g.tween.PennerManager._tweenBlastIn =
        function(a, b, d, c) {
            return g.tween.PennerEasing.easeInQuint(d, a, b, c)
        };
    g.tween.PennerManager._tweenBlastOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutQuint(d, a, b, c)
    };
    g.tween.PennerManager._tweenWaveBoth = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInOutSine(d, a, b, c)
    };
    g.tween.PennerManager._tweenWaveIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInSine(d, a, b, c)
    };
    g.tween.PennerManager._tweenWaveOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutSine(d, a, b, c)
    };
    g.tween.PennerManager._tweenCircleBoth =
        function(a, b, d, c) {
            return g.tween.PennerEasing.easeInOutCirc(d, a, b, c)
        };
    g.tween.PennerManager._tweenCircleIn = function(a, b, d, c) {
        return g.tween.PennerEasing.easeInCirc(d, a, b, c)
    };
    g.tween.PennerManager._tweenCircleOut = function(a, b, d, c) {
        return g.tween.PennerEasing.easeOutCirc(d, a, b, c)
    };
    g.tween.WorkinTween = function() {
        n.WMEventDispatcher.call(this);
        this._isRunning = !1;
        this._progress = 0;
        this._tweens = []
    };
    k["com.workinman.math.tween.WorkinTween"] = g.tween.WorkinTween;
    g.tween.WorkinTween.__name__ = ["com", "workinman",
        "math", "tween", "WorkinTween"
    ];
    g.tween.WorkinTween.__super__ = n.WMEventDispatcher;
    g.tween.WorkinTween.prototype = t(n.WMEventDispatcher.prototype, {
        dispose: function() {
            this.clearTweens();
            this._easingY = this._easingX = this._vector = this._goal = this._start = this._tweens = null;
            n.WMEventDispatcher.prototype.dispose.call(this)
        },
        _tweenComplete: function() {
            this._current.toPoint(this._tweens[0]._getGoal());
            this._tweens.splice(0, 1);
            this._getBoolAllTweensComplete() ? (this.dispatchEvent(new n.WMEvent(g.tween.WorkinTween.EVENT_TWEENS_ALL_COMPLETE)),
                this.stop()) : (this.dispatchEvent(new n.WMEvent(g.tween.WorkinTween.EVENT_TWEEN_CURRENT_COMPLETE)), this._tweenNew())
        },
        _tweenNew: function() {
            this._start = this._current.copy();
            this._goal = this._tweens[0]._getGoal();
            this._vector = g.WorkinMath.diffBetweenPoints(this._start, this._goal);
            this._easingX = g.tween.PennerManager.getEaseFunction(this._tweens[0]._getEaseIdX());
            this._easingY = g.tween.PennerManager.getEaseFunction(this._tweens[0]._getEaseIdY());
            this._dur = this._tweens[0]._getDur();
            this._progress = 0
        },
        update: function(a) {
            this._isRunning &&
                (this._progress += a, this._progress > this._dur && (this._progress = this._dur), this._current.to(this._easingX(this._start.x, this._vector.x, this._progress, this._dur), this._easingY(this._start.y, this._vector.y, this._progress, this._dur)), this._progress == this._dur && this._tweenComplete())
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
        addTween: function(a, b, d, c) {
            null == c && (c = "");
            "" == c && (c = d);
            this._tweens.push(new g.tween.WorkinTweenStep(a.copy(), b, d, c))
        },
        setStartFromPoint: function(a) {
            this.setStart(a.x, a.y)
        },
        setStart: function(a, b) {
            this._current = new g.WorkinPoint(a, b);
            this._isRunning ? this._tweenNew() : this._progress = 0
        },
        _getBoolCurrentTweenComplete: function() {
            return 1 == this._getProgressRatio()
        },
        _getBoolAllTweensComplete: function() {
            return 0 == this._tweens.length
        },
        _getPrevPos: function() {
            return 0 == this._tweens.length ? new g.WorkinPoint(0,
                0) : this._tweens[this._tweens.length - 1]._getGoal()
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
    g.tween.WorkinTweenStep = function(a, b, d, c) {
        this._goal = a;
        this._easeIdX = d;
        this._easeIdY = c;
        this._dur = b
    };
    k["com.workinman.math.tween.WorkinTweenStep"] =
        g.tween.WorkinTweenStep;
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
        null == g.tween.WorkinTweener._instance && (g.tween.WorkinTweener._instance = new g.tween.WorkinTweener);
        return g.tween.WorkinTweener._instance
    };
    g.tween.WorkinTweener.prototype = {
        stopAllTweens: function() {
            for (var a = 0, b = this._targets; a < b.length;) {
                var d =
                    b[a];
                ++a;
                d.clearTweens();
                d._setIsComplete(!0)
            }
        },
        stop: function(a) {
            for (var b = this._targets.length; 0 < b;)
                if (b--, this._targets[b]._getTarget() == a) {
                    this._targets[b].clearTweens();
                    this._targets[b]._setIsComplete(!0);
                    break
                }
        },
        tween: function(a, b, d, c, e, f, h, i, j) {
            null == j && (j = !1);
            null == i && (i = "");
            null == h && (h = 0);
            null == f && (f = 0);
            null == e && (e = "linear");
            null == c && (c = !1);
            b = new g.tween._WorkinTweener.WorkinTweenDef(a, b, d, e, f, h, i);
            d = !1;
            e = 0;
            for (f = this._targets; e < f.length;) i = f[e], ++e, i._getTarget() == a && (d = !0, c && i.clearTweens(),
                i.addTween(b, h));
            !1 == d && (a = new g.tween._WorkinTweener.WorkinTweenTracker(a, j), this._targets.push(a), a.addTween(b, h));
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
        this._target = a;
        this._tweens = [];
        this._isComplete = !1
    };
    k["com.workinman.math.tween._WorkinTweener.WorkinTweenTracker"] =
        g.tween._WorkinTweener.WorkinTweenTracker;
    g.tween._WorkinTweener.WorkinTweenTracker.__name__ = "com,workinman,math,tween,_WorkinTweener,WorkinTweenTracker".split(",");
    g.tween._WorkinTweener.WorkinTweenTracker.prototype = {
        _decrementQueueIndeces: function() {
            for (var a = 0, b = this._tweens; a < b.length;) {
                var d = b[a];
                ++a;
                if (0 == d._getQueueIndex()) return
            }
            a = 0;
            for (b = this._tweens; a < b.length;) {
                d = b[a];
                ++a;
                var c = d,
                    e = c._getQueueIndex();
                c._setQueueIndex(e - 1);
                e;
                0 == d._getQueueIndex() && d.start()
            }
        },
        addTween: function(a) {
            this._tweens.push(a)
        },
        clearTweens: function() {
            for (var a = 0, b = this._tweens; a < b.length;) {
                var d = b[a];
                ++a;
                d._setIsComplete(!0)
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
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(y.ConstantsCloud.EVENT_TWEENS_COMPLETE, {
                target: a
            }))
        },
        update: function(a) {
            if (!this._gameplayPause || !e.WorkinCloud.instance.getBool("bool_paused")) {
                for (var b = this._tweens.length; 0 < b;) b--, 0 == this._tweens[b]._getQueueIndex() && (this._tweens[b].update(a), this._tweens[b]._getIsComplete() && (this._tweens[b].dispose(), this._tweens.splice(b, 1), this._decrementQueueIndeces()));
                1 > this._tweens.length && (this._isComplete = !0, this._dispatchTweensAllComplete(this._target))
            }
        },
        dispose: function() {
            this._target = null;
            for (var a = 0, b = this._tweens; a < b.length;) {
                var d =
                    b[a];
                ++a;
                d.dispose()
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
    g.tween._WorkinTweener.WorkinTweenDef = function(a, b, d, c, e, f, h) {
        null == h && (h = "");
        null == f && (f = 0);
        null == e && (e = 0);
        null == c && (c = "linear");
        this._id = h;
        this._target = a;
        this._duration = b;
        this._delay = e;
        this._dest = d;
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
                    0, d = L.fields(this._dest); b < d.length;) {
                var c = d[b];
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
                var d =
                    b[a];
                ++a;
                null != L.field(this._target, d) && (this._origin[d] = L.field(this._target, d))
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
            n.WMEventDispatcher.call(this);
            this._data = {};
            this.sharedKey = ""
        }
    };
    k["com.workinman.net.WMSharedObject"] = S.WMSharedObject;
    S.WMSharedObject.__name__ = ["com", "workinman", "net", "WMSharedObject"];
    S.WMSharedObject.getLocalStorage =
        function() {
            return x.window.localStorage
        };
    S.WMSharedObject.getLocal = function(a, b) {
        var d = x.window.location.href;
        null == b && (b = d);
        d = new S.WMSharedObject;
        d.sharedKey = b + ":" + a;
        var c = S.WMSharedObject.getLocalStorage().getItem(d.sharedKey);
        d._setData("" == c || null == c ? {} : Q.run(c));
        return d
    };
    S.WMSharedObject.__super__ = n.WMEventDispatcher;
    S.WMSharedObject.prototype = t(n.WMEventDispatcher.prototype, {
        flush: function() {
            var a = U.run(this._getData());
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
            n.WMEventDispatcher.prototype.dispose.call(this)
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
    r = {
        ServiceAnalytics: function() {}
    };
    k["com.workinman.services.ServiceAnalytics"] =
        r.ServiceAnalytics;
    r.ServiceAnalytics.__name__ = ["com", "workinman", "services", "ServiceAnalytics"];
    r.ServiceAnalytics.onAnalyticsLoad = function() {
        r.ServiceAnalytics._flagLoaded || (e.WorkinCloud.instance.log("[ServiceAnalytics](onAnalyticsLoad) Load complete"), r.ServiceAnalytics._flagLoaded = !0, T.delay(r.ServiceAnalytics._runQueuedCommands, 1E3))
    };
    r.ServiceAnalytics.init = function(a, b) {
        null == b && (b = "");
        r.ServiceAnalytics._flagInitted = !0;
        r.ServiceAnalytics._queuedCommands = [];
        "x" == a.toLowerCase() && (r.ServiceAnalytics.OPTION_ENABLE_TRACKING = !1);
        r.ServiceAnalytics.OPTION_ENABLE_TRACKING && ("" == b && (b = r.ServiceAnalytics._DEFAULT_SHARED_OBJECT_ID), r.ServiceAnalytics._flagStarted = !1, e.WorkinCloud.instance.log("[ServiceAnalytics](initAnalytics)"), r.ServiceAnalytics._appId = a, r.ServiceAnalytics._sharedObjectId = b, r.ServiceAnalytics._sharedObjectData = e.WorkinCloud.instance.sharedObjectGetData(r.ServiceAnalytics._sharedObjectId), r.ServiceAnalytics._generateSessionID(), null == r.ServiceAnalytics._sharedObjectData.userID || 14 > s.string(r.ServiceAnalytics._sharedObjectData.userID).length ?
            (r.ServiceAnalytics._generateOfflineIDs(), r.ServiceAnalytics._sharedObjectData.userID = r.ServiceAnalytics._offlineUserId, r.ServiceAnalytics._sharedObjectData.trackingID = r.ServiceAnalytics._offlineTrackingId, e.WorkinCloud.instance.sharedObjectSetData(r.ServiceAnalytics._sharedObjectId, r.ServiceAnalytics._sharedObjectData)) : (r.ServiceAnalytics._offlineUserId = r.ServiceAnalytics._sharedObjectData.userID, r.ServiceAnalytics._offlineTrackingId = r.ServiceAnalytics._sharedObjectData.trackingID), eval("\t\t\t\t\n\t\t\t\twindow._pnConfig = new Array();\n\t\t\t\twindow._pnConfig['userId'] = '" +
                r.ServiceAnalytics._offlineUserId + "';\n\t\t\t\t\n\t\t\t\tvar _pnAPIURL = document.location.protocol + '//js.a.playnomics.net/v1/api?a=" + r.ServiceAnalytics._appId + "';\n\t\t\t\tvar _pnAPI = document.createElement('script');\t\t\t\t\n\t\t\t\t_pnAPI.type = 'text/javascript'; \n\t\t\t\t_pnAPI.async = false; \n\t\t\t\t_pnAPI.src = _pnAPIURL;\n\t\t\t\twindow.pnCallbackReference = _pnAPI;\t\t\t\t\n\t\t\t"), eval("window.pnCallbackReference").addEventListener("load", r.ServiceAnalytics.onAnalyticsLoad, !1), eval("document.body.appendChild(window.pnCallbackReference);"),
            r.ServiceAnalytics.sendUserInfo(), r.ServiceAnalytics.sendMilestone("custom1"))
    };
    r.ServiceAnalytics._runQueuedCommands = function() {
        for (; 0 < r.ServiceAnalytics._queuedCommands.length;) r.ServiceAnalytics.sendPlaynomicsEvent(r.ServiceAnalytics._queuedCommands[0].method, r.ServiceAnalytics._queuedCommands[0].params), r.ServiceAnalytics._queuedCommands.shift()
    };
    r.ServiceAnalytics.sendUserInfo = function() {
        var a=0;
    };
    r.ServiceAnalytics.sendMilestone =
        function(a) {
            var b=0;
        };
    r.ServiceAnalytics.sendPlaynomicsEvent = function(a, b) {
        if (r.ServiceAnalytics.OPTION_ENABLE_TRACKING && r.ServiceAnalytics._flagInitted)
            if (r.ServiceAnalytics._flagLoaded) {
                e.WorkinCloud.instance.log("[ServiceAnalytics](sendPlaynomicsEvent) " + a);
                var d, c = "";
                for (d = 0; d < b.length;) c += "'" + b[d] + "'", d++, d < b.length && (c += ",");
                eval(a + "(" + c + ")")
            } else r.ServiceAnalytics._queuedCommands.push({
                method: a,
                params: b
            })
    };
    r.ServiceAnalytics.enableCanadaTracking = function(a) {
        r.ServiceAnalytics._flagCanadaTrackingEnabled = !0;
        r.ServiceAnalytics._canadaShowGameTitle = a
    };
    r.ServiceAnalytics._generateSessionID = function() {
        for (var a = "", b = 11; - 1 < b;) a += Math.floor(10 * Math.random()), b--;
        r.ServiceAnalytics._sessionId = a
    };
    r.ServiceAnalytics._generateOfflineIDs = function() {
        r.ServiceAnalytics._offlineUserId = "";
        r.ServiceAnalytics._offlineTrackingId = "";
        for (var a = 15; - 1 < a;) {
            if (0.66 > Math.random()) r.ServiceAnalytics._offlineUserId +=
                s.string(Math.floor(10 * Math.random()));
            else switch (Math.floor(10 * Math.random())) {
                case 0:
                    r.ServiceAnalytics._offlineUserId += "a";
                    break;
                case 1:
                    r.ServiceAnalytics._offlineUserId += "b";
                    break;
                case 2:
                    r.ServiceAnalytics._offlineUserId += "c";
                    break;
                case 3:
                    r.ServiceAnalytics._offlineUserId += "d";
                    break;
                case 4:
                    r.ServiceAnalytics._offlineUserId += "e";
                    break;
                case 5:
                    r.ServiceAnalytics._offlineUserId += "f";
                    break;
                case 6:
                    r.ServiceAnalytics._offlineUserId += "g";
                    break;
                case 7:
                    r.ServiceAnalytics._offlineUserId += "h";
                    break;
                case 8:
                    r.ServiceAnalytics._offlineUserId +=
                        "i";
                    break;
                case 9:
                    r.ServiceAnalytics._offlineUserId += "j";
                    break;
                default:
                    r.ServiceAnalytics._offlineUserId += "z"
            }
            a--
        }
        r.ServiceAnalytics._offlineTrackingId = "";
        for (a = 15; - 1 < a;) r.ServiceAnalytics._offlineTrackingId += Math.floor(10 * Math.random()), a--
    };
    r.ServiceAnalytics.prototype = {
        __class__: r.ServiceAnalytics
    };
    r.ServiceNickAvatar = function() {
        this._url = "";
        this._flagEnabled = !1;
        this._avatarsLoaded = [];
        this._avatarsToLoad = [];
        this._flagLoadListeners = !1
    };
    k["com.workinman.services.ServiceNickAvatar"] = r.ServiceNickAvatar;
    r.ServiceNickAvatar.__name__ = ["com", "workinman", "services", "ServiceNickAvatar"];
    r.ServiceNickAvatar.__properties__ = {
        get_instance: "_getInstance"
    };
    r.ServiceNickAvatar._getInstance = function() {
        null == r.ServiceNickAvatar._instance && (r.ServiceNickAvatar._instance = new r.ServiceNickAvatar);
        return r.ServiceNickAvatar._instance
    };
    r.ServiceNickAvatar.prototype = {
        disable: function() {
            this._flagEnabled = !1
        },
        enable: function(a) {
            "" != a && (this._flagEnabled = !0, this._url = a)
        },
        _getIsEnabled: function() {
            return this._flagEnabled
        },
        __class__: r.ServiceNickAvatar
    };
    r.ServiceNickLeaderboard = function() {
        this._flagEnabled = !1;
        this._scoreArray = [];
        this._gameKeyword = ""
    };
    k["com.workinman.services.ServiceNickLeaderboard"] = r.ServiceNickLeaderboard;
    r.ServiceNickLeaderboard.__name__ = ["com", "workinman", "services", "ServiceNickLeaderboard"];
    r.ServiceNickLeaderboard.__properties__ = {
        get_instance: "_getInstance"
    };
    r.ServiceNickLeaderboard._getInstance = function() {
        null == r.ServiceNickLeaderboard._instance && (r.ServiceNickLeaderboard._instance = new r.ServiceNickLeaderboard);
        return r.ServiceNickLeaderboard._instance
    };
    r.ServiceNickLeaderboard.prototype = {
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
        __class__: r.ServiceNickLeaderboard
    };
    e = {
        JSEmbedProxy: function() {}
    };
    k["com.workinman.utils.JSEmbedProxy"] = e.JSEmbedProxy;
    e.JSEmbedProxy.__name__ = ["com", "workinman", "utils", "JSEmbedProxy"];
    e.JSEmbedProxy.__properties__ = {
        get_isPaused: "getIsPaused",
        get_canvasHeight: "getCanvasHeight",
        get_canvasWidth: "getCanvasWidth",
        get_canvasScale: "getCanvasScale",
        get_isCrossdomain: "getIsCrossdomain",
        get_base: "getBase",
        get_exists: "getExists"
    };
    e.JSEmbedProxy.alertOn = function(a) {
        e.JSEmbedProxy.callJSEmbedMethod("addAlert('" + a + "', '')")
    };
    e.JSEmbedProxy.alertOff = function() {
        e.JSEmbedProxy.callJSEmbedMethod("removeAlert('')")
    };
    e.JSEmbedProxy.getExists = function() {
        return e.JSEmbedProxy.callJSEmbedMethod("exists()")
    };
    e.JSEmbedProxy.getParameters = function() {
        return e.JSEmbedProxy.callJSEmbedMethod("params()")
    };
    e.JSEmbedProxy.getAttributes = function() {
        return e.JSEmbedProxy.callJSEmbedMethod("attr()")
    };
    e.JSEmbedProxy.getBase = function() {
        return e.JSEmbedProxy.callJSEmbedMethod("baseUrl()")
    };
    e.JSEmbedProxy.getIsCrossdomain = function() {
        return e.JSEmbedProxy.callJSEmbedMethod("isBaseCrossdomain()")
    };
    e.JSEmbedProxy.getCanvasScale = function() {
        return s.parseFloat(e.JSEmbedProxy.callJSEmbedMethod("canvasScale()"))
    };
    e.JSEmbedProxy.getCanvasWidth =
        function() {
            return s.parseFloat(e.JSEmbedProxy.callJSEmbedMethod("canvasWidth()"))
        };
    e.JSEmbedProxy.getCanvasHeight = function() {
        return s.parseFloat(e.JSEmbedProxy.callJSEmbedMethod("canvasHeight()"))
    };
    e.JSEmbedProxy.getIsPaused = function() {
        return e.JSEmbedProxy.callJSEmbedMethod("isPaused()")
    };
    e.JSEmbedProxy.pause = function() {
        e.JSEmbedProxy.callJSEmbedMethod("pause()")
    };
    e.JSEmbedProxy.unpause = function() {
        e.JSEmbedProxy.callJSEmbedMethod("unpause()")
    };
    e.JSEmbedProxy.callJSEmbedMethod = function(a) {
        try {
            var b =
                eval("jsembed." + a);
            return null == b ? "" : b
        } catch (d) {}
        return ""
    };
    e.JSEmbedProxy.prototype = {
        __class__: e.JSEmbedProxy
    };
    e.WMAssetManager = function() {
        this._LOADING_CHANCES = 3;
        this._baseUrl = "";
        this._assets = new G;
        this._defs = new G;
        this._flump = new G;
        this._packs = new G;
        this._chunks = new G;
        this._manifests = new G;
        this._flagBaseIsCrossdomain = !1;
        this._loadingProgress = this._loadingTotal = this._packsLoaded = this._packsMax = this._loadingChances = 0;
        this._loadingPackProgress = new G
    };
    k["com.workinman.utils.WMAssetManager"] = e.WMAssetManager;
    e.WMAssetManager.__name__ = ["com", "workinman", "utils", "WMAssetManager"];
    e.WMAssetManager.prototype = {
        getFont: function(a) {
            return !1 == this._assets.exists(a) ? (e.WorkinCloud.instance.log("[WMAssetManager](getFont) no asset named " + a + " exists! Returning null."), null) : new p.Font(this._assets.get(a)._getPack(), a)
        },
        getLibrary: function(a) {
            return !1 == this._flump.exists(a) ? (e.WorkinCloud.instance.log("[WMAssetManager](getLibrary) no library named " + a + " exists! Is it defined in config.xml?"), null) : this._flump.get(a)
        },
        getSound: function(a) {
            return !1 == this._assets.exists(a) ? (e.WorkinCloud.instance.log("[AssetManager](getSound) no asset named " + a + " exists! Returning null."), null) : this._assets.get(a)._getConstructed() ? this._assets.get(a)._getData() : this._assets.get(a)._getPack().getSound(this._assets.get(a)._getPath(), !0)
        },
        getXML: function(a) {
            if (!1 == this._assets.exists(a)) return e.WorkinCloud.instance.log("[WMAssetManager](getXML) no asset named " + a + " exists! Returning null."), null;
            a = v.parse(this.getFile(a));
            return new D.Fast(a.firstElement())
        },
        getFile: function(a) {
            return !1 == this._assets.exists(a) ? (e.WorkinCloud.instance.log("[WMAssetManager](getFile) no asset named " + a + " exists! Returning empty string."), "") : this._assets.get(a)._getConstructed() ? this._assets.get(a)._getData() : this._assets.get(a)._getPack().getFile(this._assets.get(a)._getPath(), !0)
        },
        getTexture: function(a) {
            a = a.split(".")[0];
            return !1 == this._assets.exists(a) ? (e.WorkinCloud.instance.log("[WMAssetManager](getTexture) no asset named " + a + " exists! Returning null."), null) : !0 == this._assets.get(a)._getConstructed() ?
                this._assets.get(a)._getData() : this._assets.get(a)._getPack().getTexture(this._assets.get(a)._getPath(), !0)
        },
        hasAsset: function(a) {
            return this._assets.exists(a)
        },
        _parseSpritesheet: function(a) {
            for (var b = this.getXML(a + ".xml"), a = this.getTexture(a), d = "", c = new J.Rectangle(0, 0, 0, 0), e, b = b.nodes.resolve("SubTexture").iterator(); b.hasNext();) e = b.next(), d = e.att.resolve("name").toString(), c.x = s.parseFloat(e.att.resolve("x").toString()), c.y = s.parseFloat(e.att.resolve("y").toString()), c.width = s.parseFloat(e.att.resolve("width").toString()),
                c.height = s.parseFloat(e.att.resolve("height").toString()), e = A.createTexture(c.width | 0, c.height | 0), e.get_graphics().drawSubImage(a, 0, 0, c.x | 0, c.y | 0, c.width | 0, c.height | 0), this.addConstructedAsset(d, e)
        },
        _onAllLoadComplete: function() {
            e.WorkinCloud.instance.log("[WMAssetManager](_onAllLoadComplete) all packs loaded!");
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(y.ConstantsCloud.EVENT_FILES_LOADED))
        },
        isLoading: function() {
            return this._packsLoaded < this._packsMax
        },
        addConstructedAsset: function(a,
            b) {
            new e._WMAssetManager.AssetDef(a, this._assets, b)
        },
        addPack: function(a) {
            for (var b = B.iter(a.get_manifest()._entries); b.hasNext();) {
                var d = b.next();
                new e._WMAssetManager.AssetDef(d.name, this._assets, a)
            }
        },
        isPackLoaded: function(a) {
            return this._packs.exists(a)
        },
        disposePack: function(a) {
            for (var b = B.iter(this._packs.get(a).get_manifest()._entries); b.hasNext();) this._assets.get(b.next().name).dispose();
            this._packs.remove(a);
            b = 0;
            for (a = this._defs.get(a)._getFlump(); b < a.length;) {
                var d = a[b];
                ++b;
                this._flump.remove(d)
            }
            null
        },
        disposeChunk: function(a) {
            !1 == this._chunks.exists(a) && e.WorkinCloud.instance.log("[WMAssetManager](disposeChunk) No chunk named " + a + " defined.");
            for (var b = 0, d = this._chunks.get(a)._getChunks(); b < d.length;) {
                var c = d[b];
                ++b;
                this.disposeChunk(c)
            }
            b = 0;
            for (d = this._chunks.get(a)._getPacks(); b < d.length;) c = d[b], ++b, this.isPackLoaded(c) && this.disposePack(c)
        },
        _loadManifest: function(a, b, d, c) {
            null == c && (c = !0);
            null == d && (d = "");
            var f = this,
                g = A._platform.loadAssetPack(a);
            this._loadingTotal += g._total;
            this._loadingPackProgress.set(b,
                0);
            g.error.connect(function(a) {
                e.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading failed with error: " + a);
                e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEvent(y.ConstantsCloud.EVENT_FILES_ERROR));
                f._loadingChances--;
                !0 == c ? 0 <= f._loadingChances ? T.delay(function() {
                        e.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Retrying. With " + f._loadingChances + " more chances.");
                        f.loadPack(b, d, !1)
                    }, 500) : e.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading attempts timed out.") :
                    e.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading failed, not attempting to retry.")
            });
            g.progressChanged.connect(function() {
                var a = g._progress - f._loadingPackProgress.get(b);
                f._loadingPackProgress.set(b, g._progress);
                f._loadingProgress += a;
                a = Math.round(100 * (f._loadingProgress / f._loadingTotal));
                e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(y.ConstantsCloud.EVENT_FILES_LOADING, {
                    value: a
                }))
            });
            g.get(function(a) {
                f.addPack(a);
                f._packsLoaded++;
                for (var d = 0, c = f._defs.get(b)._getFlump(); d <
                    c.length;) {
                    var e = c[d];
                    ++d;
                    f._flump.set(e, new w.Library(a, e))
                }
                d = 0;
                for (c = f._defs.get(b)._getTiles(); d < c.length;) e = c[d], ++d, f._parseSpritesheet(e);
                f._packs.set(b, a);
                f._packsLoaded >= f._packsMax && f._onAllLoadComplete()
            })
        },
        loadPack: function(a, b, d) {
            null == d && (d = !0);
            null == b && (b = "");
            !1 == this._defs.exists(a) && e.WorkinCloud.instance.log("[WMAssetManager](loadPack) Can't load pack " + a + " , define the pack in config.xml.");
            e.WorkinCloud.instance.log("[WMAssetManager](loadPack) " + a);
            d && (this._loadingChances = this._LOADING_CHANCES,
                this._packsMax++);
            d = C.Manifest.build(a);
            "" != this._baseUrl && (this._flagBaseIsCrossdomain ? d.set_externalBasePath(this._baseUrl) : d.set_relativeBasePath(this._baseUrl));
            this._loadManifest(d, a, b)
        },
        addPackDef: function(a, b, d) {
            null == b && (b = []);
            null == d && (d = []);
            this._defs.set(a, new e._WMAssetManager.PackDef(a, b, d))
        },
        _parseChunk: function(a, b) {
            for (var d = [], c = [], f = b.nodes.resolve("chunk").iterator(); f.hasNext();) {
                var g = f.next();
                d.push(g.getInnerData().toString())
            }
            for (f = b.nodes.resolve("pack").iterator(); f.hasNext();) g =
                f.next(), c.push(g.getInnerData().toString());
            return new e._WMAssetManager.ChunkDef(a, c, d)
        },
        loadChunk: function(a) {
            !1 == this._chunks.exists(a) && e.WorkinCloud.instance.log("[WMAssetManager](loadChunk) No chunk named " + a + " defined.");
            for (var b = 0, d = this._chunks.get(a)._getChunks(); b < d.length;) {
                var c = d[b];
                ++b;
                this.loadChunk(c)
            }
            this._packsLoaded >= this._packsMax && (this._loadingProgress = this._loadingTotal = 0, e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(y.ConstantsCloud.EVENT_FILES_LOADING, {
                value: 0
            })));
            b = 0;
            for (d = this._chunks.get(a)._getPacks(); b < d.length;) c = d[b], ++b, !1 == this.isPackLoaded(c) && this.loadPack(c)
        },
        isChunkLoaded: function(a) {
            if (!1 == this._chunks.exists(a)) return e.WorkinCloud.instance.log("[WMAssetManager](isChunkLoaded) No chunk named " + a + " defined."), !1;
            for (var b = 0, a = this._chunks.get(a)._getPacks(); b < a.length;) {
                var d = a[b];
                ++b;
                if (!1 == this.isPackLoaded(d)) return !1
            }
            return !0
        },
        addChunk: function(a, b) {
            var d = this._parseChunk(a, b);
            this._chunks.set(a, d)
        },
        setCrossdomainBaseUrl: function(a) {
            this._flagBaseIsCrossdomain = !0;
            this._setBaseUrl(a)
        },
        _setBaseUrl: function(a) {
            this._baseUrl = a;
            e.WorkinCloud.instance.log("[WMAssetManager](setBaseUrl) Base Url set to '" + a + "'");
            return this._baseUrl
        },
        _getBaseUrl: function() {
            return this._baseUrl
        },
        __class__: e.WMAssetManager,
        __properties__: {
            set_baseUrl: "_setBaseUrl",
            get_baseUrl: "_getBaseUrl"
        }
    };
    e._WMAssetManager = {};
    e._WMAssetManager.AssetDef = function(a, b, d) {
        this._path = a;
        a = a.split("/");
        this._id = a[a.length - 1].split(".")[0];
        this._constructed = !1;
        this._data = this._pack = null;
        M.__instanceof(d,
            C.AssetPack) ? this._pack = d : (this._constructed = !0, this._data = d);
        this._hash = b;
        this._hash.set(this._path, this);
        this._path != this._path.split(".")[0] && this._hash.set(this._path.split(".")[0], this);
        this._path != this._id && this._hash.set(this._id, this)
    };
    k["com.workinman.utils._WMAssetManager.AssetDef"] = e._WMAssetManager.AssetDef;
    e._WMAssetManager.AssetDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "AssetDef"];
    e._WMAssetManager.AssetDef.prototype = {
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
        dispose: function() {
            var a = this._pack.getTexture(this._path, !1);
            null != a && M.__instanceof(a, i.html.CanvasTexture) && null != a.image && null != a.image.dispose && a.image.dispose();
            this._hash.remove(this._path);
            this._path != this._path.split(".")[0] && this._hash.remove(this._path.split(".")[0]);
            this._hash.exists(this._id) && this._hash.remove(this._id);
            this._data = this._pack = this._hash = this._id = this._path = null
        },
        __class__: e._WMAssetManager.AssetDef,
        __properties__: {
            get_constructed: "_getConstructed",
            get_data: "_getData",
            get_path: "_getPath",
            get_pack: "_getPack"
        }
    };
    e._WMAssetManager.PackDef = function(a, b, d) {
        this._id = a;
        this._flump = b;
        this._tiles = d
    };
    k["com.workinman.utils._WMAssetManager.PackDef"] = e._WMAssetManager.PackDef;
    e._WMAssetManager.PackDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "PackDef"];
    e._WMAssetManager.PackDef.prototype = {
        _getTiles: function() {
            return this._tiles
        },
        _getFlump: function() {
            return this._flump
        },
        __class__: e._WMAssetManager.PackDef,
        __properties__: {
            get_flump: "_getFlump",
            get_tiles: "_getTiles"
        }
    };
    e._WMAssetManager.ChunkDef = function(a, b, d) {
        this._id = a;
        this._packs = b;
        this._chunks = d
    };
    k["com.workinman.utils._WMAssetManager.ChunkDef"] = e._WMAssetManager.ChunkDef;
    e._WMAssetManager.ChunkDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "ChunkDef"];
    e._WMAssetManager.ChunkDef.prototype = {
        _getChunks: function() {
            return this._chunks
        },
        _getPacks: function() {
            return this._packs
        },
        __class__: e._WMAssetManager.ChunkDef,
        __properties__: {
            get_packIds: "_getPacks",
            get_chunkIds: "_getChunks"
        }
    };
    e.WMInput = function() {
        this._multiTouchAvail = !1;
        this._inputDown = new G;
        this._keyCodes = new G;
        this._virtualCodes = new G;
        this._keyDown = new G;
        this._virtualDown = new G;
        this._touchList = new G;
        this._touchRemoval = [];
        this.registerInput("input_click");
        this._scale = 1;
        this._offset = new g.WorkinPoint;
        this._pointer = new e.WMPointer("", 0)
    };
    k["com.workinman.utils.WMInput"] = e.WMInput;
    e.WMInput.__name__ = ["com", "workinman", "utils", "WMInput"];
    e.WMInput.prototype = {
        _onPointerUp: function(a) {
            this._inputDown.set("input_click", !1);
            var b = a.viewX / this._scale,
                a = a.viewY / this._scale,
                b = b + this._offset.x,
                a = a + this._offset.y;
            this._pointer.end(b, a);
            !1 == this._multiTouchAvail && this._touchList.exists("const") && this._touchList.get("const").end(b, a);
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(0, "input_click", b, a, this._pointer._getSwipe()))
        },
        _onPointerMove: function(a) {
            var b = a.viewX / this._scale,
                a = a.viewY / this._scale,
                b = b + this._offset.x,
                a = a + this._offset.y;
            this._pointer.move(b, a);
            !1 == this._multiTouchAvail && this._touchList.exists("const") &&
                this._touchList.get("const").move(b, a);
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(2, "input_click", b, a, this._pointer._getSwipe()))
        },
        _onPointerDown: function(a) {
            this._inputDown.set("input_click", !0);
            var b = a.viewX / this._scale,
                a = a.viewY / this._scale,
                b = b + this._offset.x,
                a = a + this._offset.y;
            this._pointer.begin(b, a);
            if (!1 == this._multiTouchAvail) {
                var d = new e.WMPointer("const", 0);
                d.begin(b, a);
                this._touchList.set("const", d)
            }
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(1,
                "input_click", b, a, this._pointer._getSwipe()))
        },
        _onTouchUp: function(a) {
            var b = a.viewX / this._scale,
                d = a.viewY / this._scale,
                b = b + this._offset.x,
                d = d + this._offset.y;
            this._touchList.get(s.string(a.id)).end(b, d);
            0 < this._touchList.get(s.string(a.id))._getIndex() && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(0, "input_click", b, d, this._touchList.get(s.string(a.id))._getSwipe()))
        },
        _onTouchMove: function(a) {
            var b = a.viewX / this._scale,
                d = a.viewY / this._scale,
                b = b + this._offset.x,
                d = d + this._offset.y;
            this._touchList.get(s.string(a.id)).move(b, d);
            0 < this._touchList.get(s.string(a.id))._getIndex() && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(2, "input_click", b, d, this._touchList.get(s.string(a.id))._getSwipe()))
        },
        _onTouchDown: function(a) {
            var b = 0,
                d = !1;
            do
                for (var d = !0, c = this._touchList.iterator(); c.hasNext();) {
                    var f = c.next();
                    if (b == f._getIndex()) {
                        b++;
                        d = !1;
                        break
                    }
                }
            while (!1 == d);
            d = new e.WMPointer(s.string(a.id), b);
            this._touchList.set(d._getId(), d);
            c = a.viewX / this._scale;
            a = a.viewY /
                this._scale;
            c += this._offset.x;
            a += this._offset.y;
            d.begin(c, a);
            0 < b && e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(1, "input_click", c, a, d._getSwipe()))
        },
        _isInputDown: function(a) {
            for (var b = 0, d = this._keyCodes.get(a); b < d.length;) {
                var c = d[b];
                ++b;
                if (!0 == this._keyDown.get(c)) return !0
            }
            b = 0;
            for (d = this._virtualCodes.get(a); b < d.length;)
                if (a = d[b], ++b, !0 == this._virtualDown.get(a)) return !0;
            return !1
        },
        _onKeyUp: function(a) {
            var b = s.string(a.key);
            this._keyDown.exists(b) && this._keyDown.set(b, !1);
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(y.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY, {
                key: a.key,
                state: 0
            }))
        },
        _onKeyDown: function(a) {
            var b = s.string(a.key);
            this._keyDown.exists(b) && this._keyDown.set(b, !0);
            e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventData(y.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY, {
                key: a.key,
                state: 1
            }))
        },
        getInput: function(a) {
            return this._inputDown.get(a)
        },
        registerInput: function(a, b, d) {
            !1 == this._inputDown.exists(a) && (this._inputDown.set(a, !1), this._keyCodes.set(a, []), this._virtualCodes.set(a, []));
            if (null != b)
                for (var c = 0; c < b.length;) {
                    var e = b[c];
                    ++c;
                    this._keyCodes.get(a).push(s.string(e));
                    this._keyDown.set(s.string(e), !1)
                }
            if (null != d)
                for (c = 0; c < d.length;) b = d[c], ++c, this._virtualCodes.get(a).push(b), this._virtualDown.set(b, !1)
        },
        doDepthTestOnWorldCoordinates: function(a, b) {
            return p.Sprite.hitTest(A.root, (a - this._offset.x) * this._scale, (b - this._offset.y) * this._scale)
        },
        prime: function() {
            this._multiTouchAvail = A._platform.getTouch().get_supported();
            A._platform.getKeyboard().down.connect(u(this, this._onKeyDown));
            A._platform.getKeyboard().up.connect(u(this, this._onKeyUp));
            this._multiTouchAvail && (A._platform.getTouch().down.connect(u(this, this._onTouchDown)), A._platform.getTouch().move.connect(u(this, this._onTouchMove)), A._platform.getTouch().up.connect(u(this, this._onTouchUp)));
            A._platform.getPointer().down.connect(u(this, this._onPointerDown));
            A._platform.getPointer().move.connect(u(this, this._onPointerMove));
            A._platform.getPointer().up.connect(u(this,
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
                var d = b.next();
                "input_click" != d && (!0 == this._inputDown.get(d) ? !1 == this._isInputDown(d) && (this._inputDown.set(d, !1), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(0, d, 0, 0))) : !0 == this._isInputDown(d) && (this._inputDown.set(d, !0), e.WorkinCloud.instance._getDispatcher().dispatchEvent(new n.WMEventInput(1, d, 0, 0))))
            }
            this._pointer.update(a);
            for (b = this._touchList.iterator(); b.hasNext();) d = b.next(), d._getPhase() == n.WMEventInput.PHASE_UP ? this._touchRemoval.push(d._getId()) : d.update(a);
            a = 0;
            for (b = this._touchRemoval; a < b.length;) d = b[a], ++a, this._touchList.get(d).dispose(), this._touchList.remove(d);
            for (; 0 < this._touchRemoval.length;) this._touchRemoval.pop()
        },
        __class__: e.WMInput,
        __properties__: {
            set_scale: "_setScale",
            get_scale: "_getScale",
            get_pointer: "_getPointer",
            get_multiTouch: "_getMultiTouch"
        }
    };
    e.WMPointer = function(a, b) {
        this.SWIPE_DOWN = 4;
        this.SWIPE_UP = 3;
        this.SWIPE_RIGHT = 2;
        this.SWIPE_LEFT = 1;
        this.SWIPE_NONE = 0;
        this._resetDeltaLine = !0;
        this._timer = e.WMPointer._DELTA_TIMEOUT;
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
        this._phase = n.WMEventInput.PHASE_UP;
        this._swipe = this.SWIPE_NONE;
        this._consumed = !1
    };
    k["com.workinman.utils.WMPointer"] = e.WMPointer;
    e.WMPointer.__name__ = ["com", "workinman", "utils", "WMPointer"];
    e.WMPointer.prototype = {
        update: function(a) {
            this._resetDeltaLine = !0;
            this._timer -= a;
            0 > this._timer &&
                (this._timer = e.WMPointer._DELTA_TIMEOUT, this._deltaLine.originToPoint(this._current))
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
                this._swipe = Math.abs(a) >= e.WMPointer._DELTA_ALLOWANCE && Math.abs(b) < e.WMPointer._DELTA_ALLOWANCE ? 0 < a ? this.SWIPE_LEFT : this.SWIPE_RIGHT : Math.abs(b) >= e.WMPointer._DELTA_ALLOWANCE && Math.abs(a) < e.WMPointer._DELTA_ALLOWANCE ? 0 < b ? this.SWIPE_UP : this.SWIPE_DOWN : this.SWIPE_NONE
            } else this._swipe = this.SWIPE_NONE
        },
        end: function(a, b) {
            this._phase = n.WMEventInput.PHASE_UP;
            this._updateInfo(a, b);
            this._testSwipe();
            this._line.endToPoint(this._current)
        },
        move: function(a, b) {
            this._updateInfo(a, b);
            !1 != e.WorkinCloud.instance._getInput().getInput("input_click") && (this._phase = n.WMEventInput.PHASE_MOVE, this._testSwipe(), this._line.endToPoint(this._current))
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
            this._phase = n.WMEventInput.PHASE_DOWN;
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
        __class__: e.WMPointer,
        __properties__: {
            get_phase: "_getPhase",
            get_currentPos: "_getCurrentPos",
            get_swipe: "_getSwipe",
            set_consumed: "_setConsumed",
            get_consumed: "_getConsumed",
            get_id: "_getId",
            set_index: "_setIndex",
            get_index: "_getIndex"
        }
    };
    e.WMLocalize = function() {};
    k["com.workinman.utils.WMLocalize"] = e.WMLocalize;
    e.WMLocalize.__name__ = ["com", "workinman", "utils",
        "WMLocalize"
    ];
    e.WMLocalize.prototype = {
        getData: function(a, b) {
            null == b && (b = "");
            "" == b && (b = y.ConstantsCloud.LOCALIZATION_XML_PATH + "translation_" + e.WorkinCloud.instance.getString(y.ConstantsCloud.STRING_REGION_ID) + ".xml");
            for (var d = e.WorkinCloud.instance._getAssets().getXML(b).nodes.resolve("string").iterator(); d.hasNext();) {
                var c = d.next();
                if (c.att.resolve("id") == a) return new e.WMLocalizedData(c.att.resolve("id"), c.getInnerData(), c.att.resolve("fontName"), s.parseFloat(c.att.resolve("fontScale")), s.parseFloat(c.att.resolve("offsetX")),
                    s.parseFloat(c.att.resolve("offsetY")))
            }
            e.WorkinCloud.instance.log("[WMLocalize] ERROR: No localization data for : " + a);
            return new e.WMLocalizedData(a, "", "", 1, 0, 0)
        },
        __class__: e.WMLocalize
    };
    e.WMLocalizedData = function(a, b, d, c, e, f) {
        this._id = a;
        this._string = b;
        this._fontName = d;
        this._scale = c;
        this._offsetX = e;
        this._offsetY = f
    };
    k["com.workinman.utils.WMLocalizedData"] = e.WMLocalizedData;
    e.WMLocalizedData.__name__ = ["com", "workinman", "utils", "WMLocalizedData"];
    e.WMLocalizedData.prototype = {
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
        __class__: e.WMLocalizedData,
        __properties__: {
            get_string: "_getString",
            get_fontName: "_getFontName",
            get_scale: "_getScale",
            get_offsetX: "_getOffsetX",
            get_offsetY: "_getOffsetY"
        }
    };
    e.WMSound = function() {
        this._musicId = "";
        this._musicGain = 1;
        this._musicPlaying = null;
        this._flagSystemMute = this._flagMuted = !1;
        this._mixer = new H.Mixer;
        this._sounds = []
    };
    k["com.workinman.utils.WMSound"] = e.WMSound;
    e.WMSound.__name__ = ["com", "workinman", "utils", "WMSound"];
    e.WMSound.prototype = {
        _getMusicPlaying: function() {
            return this._musicPlaying
        },
        update: function(a) {
            y.ConstantsCloud.getIsAndroid() && null != this._musicPlaying && 0.95 <= this._musicPlaying._getPlayback().get_position() / this._musicPlaying._getSound().get_duration() && L.setProperty(this._musicPlaying._getPlayback(), "position", 0);
            for (var b = 0; b < this._sounds.length;) {
                if (this._sounds[b]._getFade() ==
                    e.WMSound.FADE_OUT) {
                    if (0 < this._sounds[b]._getPlayback().volume._value) {
                        var d = this._sounds[b]._getPlayback().volume;
                        d.set__(d._value - a * this._sounds[b]._getFadeSpeed());
                        0 >= this._sounds[b]._getPlayback().volume._value && (this._sounds[b].setFade(e.WMSound.FADE_NONE), this._sounds[b]._getPlayback().volume.set__(0))
                    }
                } else this._sounds[b]._getFade() == e.WMSound.FADE_IN && this._sounds[b]._getPlayback().volume._value < this._sounds[b].volume && (d = this._sounds[b]._getPlayback().volume, d.set__(d._value + a * this._sounds[b]._getFadeSpeed()),
                    this._sounds[b]._getPlayback().volume._value >= this._sounds[b].volume && (this._sounds[b].setFade(e.WMSound.FADE_NONE), this._sounds[b]._getPlayback().volume.set__(this._sounds[b].volume)));
                b++
            }
            null != this._getMusicPlaying() && (this._getMusicPlaying()._getFade() == e.WMSound.FADE_OUT ? 0 < this._getMusicPlaying()._getPlayback().volume._value && (d = this._getMusicPlaying()._getPlayback().volume, d.set__(d._value - a * this._getMusicPlaying()._getFadeSpeed()), 0 >= this._getMusicPlaying()._getPlayback().volume._value && (this._getMusicPlaying().setFade(e.WMSound.FADE_NONE),
                this._getMusicPlaying()._getPlayback().volume.set__(0))) : this._getMusicPlaying()._getFade() == e.WMSound.FADE_IN && this._getMusicPlaying()._getPlayback().volume._value < this._getMusicPlaying().volume && (d = this._getMusicPlaying()._getPlayback().volume, d.set__(d._value + a * this._getMusicPlaying()._getFadeSpeed()), this._getMusicPlaying()._getPlayback().volume._value >= this._getMusicPlaying().volume && (this._getMusicPlaying().setFade(e.WMSound.FADE_NONE), this._getMusicPlaying()._getPlayback().volume.set__(this._getMusicPlaying().volume))))
        },
        _muteMusic: function(a) {
            "" != this._musicId && (a ? this._musicPlaying = null : (this._musicPlaying = a = new e._WMSound.SoundDef(this._musicId, this._mixer.newSound(e.WorkinCloud.instance._getAssets().getSound(this._musicId), 1), !0), a.playSound(this._musicGain)))
        },
        playMusic: function(a, b) {
            null == b && (b = 1);
            if (!(y.ConstantsCloud.getIsAndroid() && null != this._musicPlaying || this._musicId == a))
                if (this._musicId = a, this._musicGain = b, !(this.getMute() || "" == a)) {
                    null != this._musicPlaying && this._musicPlaying.dispose();
                    var d = new e._WMSound.SoundDef(a,
                        this._mixer.newSound(e.WorkinCloud.instance._getAssets().getSound(this._musicId), 1), !0);
                    this._musicPlaying = d;
                    d.playSound(b)
                }
        },
        _muteAllToggle: function(a) {
            if (a) {
                for (this._mixer.stopAll(); 0 < this._sounds.length;) this._sounds.splice(0, 1);
                this._muteMusic(!0)
            } else a || this._muteMusic(!1)
        },
        playSound: function(a, b) {
            null == b && (b = 1);
            if (!y.ConstantsCloud.getIsAndroid() && !this.getMute()) {
                for (var d = 0; d < this._sounds.length;) {
                    if (this._sounds[d].id == a) {
                        this._sounds[d].playSound(b);
                        return
                    }
                    d++
                }
                d = new e._WMSound.SoundDef(a,
                    this._mixer.newSound(e.WorkinCloud.instance._getAssets().getSound(a), 4), !1);
                this._sounds.push(d);
                d.playSound(b)
            }
        },
        setMute: function(a) {
            this._flagMuted = a;
            this._flagSystemMute || this._muteAllToggle(this._flagMuted)
        },
        getMute: function() {
            return this._flagSystemMute || this._flagMuted
        },
        __class__: e.WMSound,
        __properties__: {
            get_musicPlaying: "_getMusicPlaying"
        }
    };
    e._WMSound = {};
    e._WMSound.SoundDef = function(a, b, d) {
        null == d && (d = !1);
        this.id = a;
        this.isMusic = d;
        this.volume = 1;
        this._flagPlayed = this._flagHasSound = !1;
        this._sound =
            b;
        this._fade = e.WMSound.FADE_NONE;
        this._fadeSpeed = 1
    };
    k["com.workinman.utils._WMSound.SoundDef"] = e._WMSound.SoundDef;
    e._WMSound.SoundDef.__name__ = ["com", "workinman", "utils", "_WMSound", "SoundDef"];
    e._WMSound.SoundDef.prototype = {
        playSound: function(a) {
            null == a && (a = 1);
            this.volume = a;
            this._playback = y.ConstantsCloud.getIsAndroid() ? this._sound.play(a) : this.isMusic ? this._sound.loop(a) : this._sound.play(a)
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
        __class__: e._WMSound.SoundDef,
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
                var d = b[a];
                ++a;
                d.dispose()
            }
        },
        newSound: function(a, b) {
            null == b && (b = 2147483647);
            var d = new H._Mixer.MixerSound(a, b);
            this._sounds.push(d);
            return d
        },
        get_name: function() {
            return "Mixer_2"
        },
        __class__: H.Mixer
    });
    e.WorkinCloud = function() {
        this._TIMER_STACK = 0.1;
        this._values = new G;
        this._defaults = new G;
        this._dispatcher = new n.WMEventDispatcher;
        this._input = new e.WMInput;
        this._assets = new e.WMAssetManager;
        this._sound = new e.WMSound;
        this._localize = new e.WMLocalize;
        this._stack = [];
        this._timerStack = -1;
        this._flagStackPaused = !1;
        this.setString(y.ConstantsCloud.STRING_REGION_ID, "en")
    };
    k["com.workinman.utils.WorkinCloud"] = e.WorkinCloud;
    e.WorkinCloud.__name__ = ["com", "workinman", "utils", "WorkinCloud"];
    e.WorkinCloud.prototype = {
        _updateStack: function(a) {
            1 > this._stack.length || this._flagStackPaused || (this._timerStack -= a, 0 > this._timerStack && (this._stack[0](),
                this._stack.shift(), this._timerStack = this._TIMER_STACK))
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
            this._timerStack = this._TIMER_STACK;
            for (var b = 0; b < a.length;) {
                var d = a[b];
                ++b;
                this._stack.push(d)
            }
        },
        _updateDisplays: function(a) {
            this._dispatcher.dispatchEvent(new n.WMEventData(l.Display.EVENT_UPDATE_DISPLAY, {
                valueID: a
            }))
        },
        sharedObjectSetData: function(a, b) {
            var d = S.WMSharedObject.getLocal(a);
            d._setData(b);
            d.flush();
            d.dispose()
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
        __class__: e.WorkinCloud,
        __properties__: {
            get_dispatcher: "_getDispatcher",
            get_input: "_getInput",
            get_assets: "_getAssets",
            get_sound: "_getSound",
            get_localize: "_getLocalize"
        }
    };
    e.WorkinUtils = function() {};
    k["com.workinman.utils.WorkinUtils"] = e.WorkinUtils;
    e.WorkinUtils.__name__ = ["com", "workinman", "utils", "WorkinUtils"];
    e.WorkinUtils.getRandom = function(a, b, d) {
        null == d && (d = !0);
        var c = Math.random();
        1 == c && (c = 0.99);
        return d ? a + Math.floor(c * (b + 1 - a)) : a + c * (b - a)
    };
    N = function() {
        this.parent = this.firstChild = this.next = this.firstComponent = null;
        this._compMap = {}
    };
    k["flambe.Entity"] = N;
    N.__name__ = ["flambe", "Entity"];
    N.__interfaces__ = [o.Disposable];
    N.prototype = {
        dispose: function() {
            for (null != this.parent && this.parent.removeChild(this); null != this.firstComponent;) this.firstComponent.dispose();
            this.disposeChildren()
        },
        disposeChildren: function() {
            for (; null != this.firstChild;) this.firstChild.dispose()
        },
        removeChild: function(a) {
            for (var b = null, d = this.firstChild; null != d;) {
                var c = d.next;
                if (d == a) {
                    null == b ? this.firstChild = c : b.next = c;
                    d.parent = null;
                    d.next = null;
                    break
                }
                b = d;
                d = c
            }
        },
        addChild: function(a, b) {
            null == b && (b = !0);
            null != a.parent && a.parent.removeChild(a);
            a.parent = this;
            if (b) {
                for (var d = null, c = this.firstChild; null != c;) d = c, c = c.next;
                null != d ? d.next = a : this.firstChild = a
            } else a.next = this.firstChild, this.firstChild = a;
            return this
        },
        remove: function(a) {
            for (var b =
                    null, d = this.firstComponent; null != d;) {
                var c = d.next;
                if (d == a) {
                    null == b ? this.firstComponent = c : b._internal_init(this, c);
                    delete this._compMap[d.get_name()];
                    d.onRemoved();
                    d._internal_init(null, null);
                    break
                }
                b = d;
                d = c
            }
        },
        add: function(a) {
            a.dispose();
            var b = a.get_name(),
                d = this._compMap[b];
            null != d && this.remove(d);
            this._compMap[b] = a;
            b = null;
            for (d = this.firstComponent; null != d;) b = d, d = d.next;
            null != b ? b.next = a : this.firstComponent = a;
            a._internal_init(this, null);
            a.onAdded();
            return this
        },
        __class__: N
    };
    o.PackageLog = function() {};
    k["flambe.util.PackageLog"] = o.PackageLog;
    o.PackageLog.__name__ = ["flambe", "util", "PackageLog"];
    i = {
        Platform: function() {}
    };
    k["flambe.platform.Platform"] = i.Platform;
    i.Platform.__name__ = ["flambe", "platform", "Platform"];
    i.Platform.prototype = {
        __class__: i.Platform
    };
    i.html = {};
    i.html.HtmlPlatform = function() {};
    k["flambe.platform.html.HtmlPlatform"] = i.html.HtmlPlatform;
    i.html.HtmlPlatform.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
    i.html.HtmlPlatform.__interfaces__ = [i.Platform];
    i.html.HtmlPlatform.prototype = {
        createRenderer: function(a) {
            return new i.html.CanvasRenderer(a)
        },
        getY: function(a, b) {
            return this._stage.scaleFactor * (a.clientY - b.top)
        },
        getX: function(a, b) {
            return this._stage.scaleFactor * (a.clientX - b.left)
        },
        getRenderer: function() {
            return this._renderer
        },
        getExternal: function() {
            null == this._external && (this._external = new i.html.HtmlExternal);
            return this._external
        },
        getWeb: function() {
            null == this._web && (this._web = new i.html.HtmlWeb(this._container));
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
            var b = (a - this._lastUpdate) / 1E3;
            this._lastUpdate = a;
            this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b), this.mainLoop.render(this._renderer))
        },
        getTime: function() {
            return Date.now() / 1E3
        },
        createLogHandler: function(a) {
            return i.html.HtmlLogHandler.isSupported() ? new i.html.HtmlLogHandler(a) : null
        },
        getLocale: function() {
            var a = x.window.navigator.language;
            null ==
                a && (a = x.window.navigator.userLanguage);
            return a
        },
        getStorage: function() {
            if (null == this._storage) {
                var a = null;
                try {
                    a = x.window.localStorage
                } catch (b) {}
                null != a ? this._storage = new i.html.HtmlStorage(a) : (K.logger.warn("localStorage is unavailable, falling back to unpersisted storage", null), this._storage = new i.DummyStorage)
            }
            return this._storage
        },
        getStage: function() {
            return this._stage
        },
        loadAssetPack: function(a) {
            return (new i.html.HtmlAssetPackLoader(this, a)).promise
        },
        init: function() {
            var a = this;
            K.logger.info("Initializing HTML platform",
                null);
            i.html.HtmlUtil.fixAndroidMath();
            var b = null;
            try {
                b = x.window.flambe.canvas
            } catch (d) {}
            b.setAttribute("tabindex", "0");
            b.style.outlineStyle = "none";
            b.setAttribute("moz-opaque", "true");
            this._stage = new i.html.HtmlStage(b);
            this._pointer = new i.BasicPointer;
            this._mouse = new i.html.HtmlMouse(this._pointer, b);
            this._keyboard = new i.BasicKeyboard;
            this._renderer = this.createRenderer(b);
            A.hasGPU.set__(!0);
            this.mainLoop = new i.MainLoop;
            this._container = b.parentNode;
            this._container.style.overflow = "hidden";
            this._container.style.position =
                "relative";
            this._container.style.msTouchAction = "none";
            var c = 0,
                e = function(d) {
                    if (!(1E3 > d.timeStamp - c)) {
                        var e = b.getBoundingClientRect(),
                            f = a.getX(d, e),
                            e = a.getY(d, e);
                        switch (d.type) {
                            case "mousedown":
                                d.target == b && (d.preventDefault(), a._mouse.submitDown(f, e, d.button), d.target.focus());
                                break;
                            case "mousemove":
                                a._mouse.submitMove(f, e);
                                break;
                            case "mouseup":
                                a._mouse.submitUp(f, e, d.button);
                                break;
                            case "mousewheel":
                            case "DOMMouseScroll":
                                a._mouse.submitScroll(f, e, "mousewheel" == d.type ? d.wheelDelta / 40 : -d.detail) && d.preventDefault()
                        }
                    }
                };
            window.addEventListener("mousedown", e, !1);
            window.addEventListener("mousemove", e, !1);
            window.addEventListener("mouseup", e, !1);
            b.addEventListener("mousewheel", e, !1);
            b.addEventListener("DOMMouseScroll", e, !1);
            var f = "undefined" != typeof x.window.ontouchstart,
                e = "msMaxTouchPoints" in window.navigator && 1 < window.navigator.msMaxTouchPoints;
            if (f || e) {
                var g = new i.BasicTouch(this._pointer, e ? window.navigator.msMaxTouchPoints : 4);
                this._touch = g;
                e = function(b) {
                    var d = f ? b.changedTouches : [b],
                        e = b.target.getBoundingClientRect();
                    c = b.timeStamp;
                    switch (b.type) {
                        case "touchstart":
                        case "MSPointerDown":
                            b.preventDefault();
                            i.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER && i.html.HtmlUtil.hideMobileBrowser();
                            for (b = 0; b < d.length;) {
                                var h = d[b];
                                ++b;
                                var j = a.getX(h, e),
                                    k = a.getY(h, e),
                                    h = (f ? h.identifier : h.pointerId) | 0;
                                g.submitDown(h, j, k)
                            }
                            break;
                        case "touchmove":
                        case "MSPointerMove":
                            b.preventDefault();
                            for (b = 0; b < d.length;) h = d[b], ++b, j = a.getX(h, e), k = a.getY(h, e), h = (f ? h.identifier : h.pointerId) | 0, g.submitMove(h, j, k);
                            break;
                        case "touchend":
                        case "touchcancel":
                        case "MSPointerUp":
                            for (b =
                                0; b < d.length;) h = d[b], ++b, j = a.getX(h, e), k = a.getY(h, e), h = (f ? h.identifier : h.pointerId) | 0, g.submitUp(h, j, k)
                    }
                };
                f ? (b.addEventListener("touchstart", e, !1), b.addEventListener("touchmove", e, !1), b.addEventListener("touchend", e, !1), b.addEventListener("touchcancel", e, !1)) : (b.addEventListener("MSPointerDown", e, !1), b.addEventListener("MSPointerMove", e, !1), b.addEventListener("MSPointerUp", e, !1))
            } else this._touch = new i.DummyTouch;
            e = function(b) {
                switch (b.type) {
                    case "keydown":
                        a._keyboard.submitDown(b.keyCode) && b.preventDefault();
                        break;
                    case "keyup":
                        a._keyboard.submitUp(b.keyCode)
                }
            };
            b.addEventListener("keydown", e, !1);
            b.addEventListener("keyup", e, !1);
            var h = x.window.onerror;
            x.window.onerror = function(a, b, d) {
                A.uncaughtError.emit1(a);
                return null != h ? h(a, b, d) : !1
            };
            var j = i.html.HtmlUtil.loadExtension("hidden", x.document);
            null != j.value && (e = function() {
                A.hidden.set__(L.field(x.document, j.field))
            }, e(), x.document.addEventListener(j.prefix + "visibilitychange", e, !1), A.hidden.get_changed().connect(function(b) {
                b || (a._skipFrame = !0)
            }));
            this._lastUpdate =
                Date.now();
            this._skipFrame = !1;
            var k = i.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
            if (null != k) {
                var l = x.window.performance,
                    n = null != l && i.html.HtmlUtil.polyfill("now", l);
                n ? this._lastUpdate = l.now() : K.logger.warn("No monotonic timer support, falling back to the system date", null);
                var o = null,
                    o = function(d) {
                        a.update(n ? l.now() : d);
                        k(o, b)
                    };
                k(o, b)
            } else K.logger.warn("No requestAnimationFrame support, falling back to setInterval", null), x.window.setInterval(function() {
                a.update(Date.now())
            }, 1E3 / 60)
        },
        __class__: i.html.HtmlPlatform
    };
    o.Value = function(a, b) {
        this._value = a;
        null != b && (this._changed = new o.Signal2(b))
    };
    k["flambe.util.Value"] = o.Value;
    o.Value.__name__ = ["flambe", "util", "Value"];
    o.Value.prototype = {
        get_changed: function() {
            null == this._changed && (this._changed = new o.Signal2);
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
        __class__: o.Value,
        __properties__: {
            set__: "set__",
            get__: "get__",
            get_changed: "get_changed"
        }
    };
    o.SignalConnection = function(a, b) {
        this._internal_next = null;
        this._signal = a;
        this._internal_listener = b;
        this.stayInList = !0
    };
    k["flambe.util.SignalConnection"] = o.SignalConnection;
    o.SignalConnection.__name__ = ["flambe", "util", "SignalConnection"];
    o.SignalConnection.__interfaces__ = [o.Disposable];
    o.SignalConnection.prototype = {
        dispose: function() {
            null != this._signal && (this._signal._internal_disconnect(this), this._signal = null)
        },
        once: function() {
            this.stayInList = !1;
            return this
        },
        __class__: o.SignalConnection
    };
    o.SignalBase = function(a) {
        this._head = null != a ? new o.SignalConnection(this, a) : null;
        this._deferredTasks = null
    };
    k["flambe.util.SignalBase"] = o.SignalBase;
    o.SignalBase.__name__ = ["flambe", "util", "SignalBase"];
    o.SignalBase.prototype = {
        listRemove: function(a) {
            for (var b = null, d = this._head; null != d;) {
                if (d == a) {
                    a = d._internal_next;
                    null == b ? this._head = a : b._internal_next = a;
                    break
                }
                b = d;
                d = d._internal_next
            }
        },
        listAdd: function(a, b) {
            if (b) a._internal_next = this._head, this._head = a;
            else {
                for (var d =
                        null, c = this._head; null != c;) d = c, c = c._internal_next;
                null != d ? d._internal_next = a : this._head = a
            }
        },
        didEmit: function(a) {
            for (this._head = a; null != this._deferredTasks;) this._deferredTasks.fn(), this._deferredTasks = this._deferredTasks.next
        },
        willEmit: function() {
            var a = this._head;
            this._head = o.SignalBase.DISPATCHING_SENTINEL;
            return a
        },
        defer: function(a) {
            for (var b = null, d = this._deferredTasks; null != d;) b = d, d = d.next;
            a = new o._SignalBase.Task(a);
            null != b ? b.next = a : this._deferredTasks = a
        },
        emit2: function(a, b) {
            for (var d = this.willEmit(),
                    c = d; null != c;) c._internal_listener(a, b), c.stayInList || c.dispose(), c = c._internal_next;
            this.didEmit(d)
        },
        emit1: function(a) {
            for (var b = this.willEmit(), d = b; null != d;) d._internal_listener(a), d.stayInList || d.dispose(), d = d._internal_next;
            this.didEmit(b)
        },
        emit0: function() {
            for (var a = this.willEmit(), b = a; null != b;) b._internal_listener(), b.stayInList || b.dispose(), b = b._internal_next;
            this.didEmit(a)
        },
        _internal_disconnect: function(a) {
            var b = this;
            this._head == o.SignalBase.DISPATCHING_SENTINEL ? this.defer(function() {
                    b.listRemove(a)
                }) :
                this.listRemove(a)
        },
        connectImpl: function(a, b) {
            var d = this,
                c = new o.SignalConnection(this, a);
            this._head == o.SignalBase.DISPATCHING_SENTINEL ? this.defer(function() {
                d.listAdd(c, b)
            }) : this.listAdd(c, b);
            return c
        },
        __class__: o.SignalBase
    };
    o.Signal2 = function(a) {
        o.SignalBase.call(this, a)
    };
    k["flambe.util.Signal2"] = o.Signal2;
    o.Signal2.__name__ = ["flambe", "util", "Signal2"];
    o.Signal2.__super__ = o.SignalBase;
    o.Signal2.prototype = t(o.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a,
                b)
        },
        __class__: o.Signal2
    });
    o.Signal1 = function(a) {
        o.SignalBase.call(this, a)
    };
    k["flambe.util.Signal1"] = o.Signal1;
    o.Signal1.__name__ = ["flambe", "util", "Signal1"];
    o.Signal1.__super__ = o.SignalBase;
    o.Signal1.prototype = t(o.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: o.Signal1
    });
    F = {
        AnimatedFloat: function(a, b) {
            o.Value.call(this, a, b)
        }
    };
    k["flambe.animation.AnimatedFloat"] = F.AnimatedFloat;
    F.AnimatedFloat.__name__ = ["flambe", "animation", "AnimatedFloat"];
    F.AnimatedFloat.__super__ =
        o.Value;
    F.AnimatedFloat.prototype = t(o.Value.prototype, {
        set_behavior: function(a) {
            this._behavior = a;
            this.update(0);
            return a
        },
        update: function(a) {
            null != this._behavior && (o.Value.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
        },
        set__: function(a) {
            this._behavior = null;
            return o.Value.prototype.set__.call(this, a)
        },
        __class__: F.AnimatedFloat
    });
    A = function() {};
    k["flambe.System"] = A;
    A.__name__ = ["flambe", "System"];
    A.__properties__ = {
        get_keyboard: "get_keyboard",
        get_touch: "get_touch",
        get_pointer: "get_pointer",
        get_stage: "get_stage"
    };
    A.init = function() {
        A._calledInit || (A._platform.init(), A._calledInit = !0)
    };
    A.createTexture = function(a, b) {
        return A._platform.getRenderer().createEmptyTexture(a, b)
    };
    o.Logger = function(a) {
        this._handler = a
    };
    k["flambe.util.Logger"] = o.Logger;
    o.Logger.__name__ = ["flambe", "util", "Logger"];
    o.Logger.prototype = {
        log: function(a, b, d) {
            null != this._handler && (null == b && (b = ""), null != d && (b = o.Strings.withFields(b, d)), this._handler.log(a, b))
        },
        warn: function(a,
            b) {
            this.log(o.LogLevel.Warn, a, b)
        },
        info: function(a, b) {
            this.log(o.LogLevel.Info, a, b)
        },
        __class__: o.Logger
    };
    K = function() {};
    k["flambe.Log"] = K;
    K.__name__ = ["flambe", "Log"];
    K.__super__ = o.PackageLog;
    K.prototype = t(o.PackageLog.prototype, {
        __class__: K
    });
    z = function(a) {
        null == a && (a = 1);
        this._internal_realDt = 0;
        this.scale = new F.AnimatedFloat(a)
    };
    k["flambe.SpeedAdjuster"] = z;
    z.__name__ = ["flambe", "SpeedAdjuster"];
    z.__super__ = P;
    z.prototype = t(P.prototype, {
        onUpdate: function(a) {
            0 < this._internal_realDt && (a = this._internal_realDt,
                this._internal_realDt = 0);
            this.scale.update(a)
        },
        get_name: function() {
            return "SpeedAdjuster_5"
        },
        __class__: z
    });
    F.Behavior = function() {};
    k["flambe.animation.Behavior"] = F.Behavior;
    F.Behavior.__name__ = ["flambe", "animation", "Behavior"];
    F.Behavior.prototype = {
        __class__: F.Behavior
    };
    F.Binding = function() {};
    k["flambe.animation.Binding"] = F.Binding;
    F.Binding.__name__ = ["flambe", "animation", "Binding"];
    F.Binding.__interfaces__ = [F.Behavior];
    F.Binding.prototype = {
        isComplete: function() {
            return !1
        },
        update: function() {
            var a = this._target._value;
            return null != this._fn ? this._fn(a) : a
        },
        __class__: F.Binding
    };
    C = {};
    C.AssetType = k["flambe.asset.AssetType"] = {
        __ename__: ["flambe", "asset", "AssetType"],
        __constructs__: ["Image", "Audio", "Data"]
    };
    C.AssetType.Image = ["Image", 0];
    C.AssetType.Image.toString = q;
    C.AssetType.Image.__enum__ = C.AssetType;
    C.AssetType.Audio = ["Audio", 1];
    C.AssetType.Audio.toString = q;
    C.AssetType.Audio.__enum__ = C.AssetType;
    C.AssetType.Data = ["Data", 2];
    C.AssetType.Data.toString = q;
    C.AssetType.Data.__enum__ = C.AssetType;
    C.AssetEntry = function(a, b,
        d, c) {
        this.name = a;
        this.url = b;
        this.type = d;
        this.bytes = c
    };
    k["flambe.asset.AssetEntry"] = C.AssetEntry;
    C.AssetEntry.__name__ = ["flambe", "asset", "AssetEntry"];
    C.AssetEntry.prototype = {
        getUrlExtension: function() {
            return o.Strings.getFileExtension(this.url.split("?")[0]).toLowerCase()
        },
        __class__: C.AssetEntry
    };
    C.AssetPack = function() {};
    k["flambe.asset.AssetPack"] = C.AssetPack;
    C.AssetPack.__name__ = ["flambe", "asset", "AssetPack"];
    C.AssetPack.prototype = {
        __class__: C.AssetPack,
        __properties__: {
            get_manifest: "get_manifest"
        }
    };
    M = void 0;
    x = void 0;
    M = function() {};
    k["js.Boot"] = M;
    M.__name__ = ["js", "Boot"];
    M.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var d = typeof a;
        if ("function" == d && (a.__name__ || a.__ename__)) d = "object";
        switch (d) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        for (var d = a[0] + "(", b = b + "\t", c = 2, e = a.length; c < e;) var f = c++,
                            d = 2 != f ? d + ("," + M.__string_rec(a[f], b)) : d + M.__string_rec(a[f], b);
                        return d + ")"
                    }
                    c = a.length;
                    d = "[";
                    b += "\t";
                    for (e = 0; e < c;) f = e++, d += (0 < f ? "," :
                        "") + M.__string_rec(a[f], b);
                    return d + "]"
                }
                try {
                    e = a.toString
                } catch (g) {
                    return "???"
                }
                if (null != e && e != Object.toString && (d = a.toString(), "[object Object]" != d)) return d;
                e = null;
                d = "{\n";
                b += "\t";
                c = null != a.hasOwnProperty;
                for (e in a)
                    if (!c || a.hasOwnProperty(e)) "prototype" == e || "__class__" == e || "__super__" == e || "__interfaces__" == e || "__properties__" == e || (2 != d.length && (d += ", \n"), d += b + e + " : " + M.__string_rec(a[e], b));
                b = b.substring(1);
                return d + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return "" +
                    a
        }
    };
    M.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var d = a.__interfaces__;
        if (null != d)
            for (var c = 0, e = d.length; c < e;) {
                var f = c++,
                    f = d[f];
                if (f == b || M.__interfLoop(f, b)) return !0
            }
        return M.__interfLoop(a.__super__, b)
    };
    M.__instanceof = function(a, b) {
        try {
            if (a instanceof b) return b == Array ? null == a.__enum__ : !0;
            if (M.__interfLoop(a.__class__, b)) return !0
        } catch (d) {
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
                return "string" ==
                    typeof a;
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
    M.__cast = function(a, b) {
        if (M.__instanceof(a, b)) return a;
        throw "Cannot cast " + s.string(a) + " to " + s.string(b);
    };
    o.Strings = function() {};
    k["flambe.util.Strings"] = o.Strings;
    o.Strings.__name__ = ["flambe", "util", "Strings"];
    o.Strings.getFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? B.substr(a, b + 1, null) : null
    };
    o.Strings.removeFileExtension =
        function(a) {
            var b = a.lastIndexOf(".");
            return 0 < b ? B.substr(a, 0, b) : a
        };
    o.Strings.joinPath = function(a, b) {
        47 != a.charCodeAt(a.length - 1) && (a += "/");
        return a + b
    };
    o.Strings.withFields = function(a, b) {
        var d = b.length;
        if (0 < d) {
            for (var a = a + (0 < a.length ? " [" : "["), c = 0; c < d;) {
                0 < c && (a += ", ");
                var e = b[c],
                    f = b[c + 1];
                if (M.__instanceof(f, Error)) {
                    var g = f.stack;
                    null != g && (f = g)
                }
                a += e + "=" + s.string(f);
                c += 2
            }
            a += "]"
        }
        return a
    };
    x = function() {};
    k["js.Lib"] = x;
    x.__name__ = ["js", "Lib"];
    C.Manifest = function() {
        this._entries = []
    };
    k["flambe.asset.Manifest"] =
        C.Manifest;
    C.Manifest.__name__ = ["flambe", "asset", "Manifest"];
    C.Manifest.build = function(a, b) {
        null == b && (b = !0);
        var d = C.Manifest._buildManifest.get(a);
        if (null == d) {
            if (b) throw o.Strings.withFields("Missing asset pack", ["name", a]);
            return null
        }
        return d.clone()
    };
    C.Manifest.inferType = function(a) {
        a = o.Strings.getFileExtension(a.split("?")[0]);
        if (null != a) switch (a.toLowerCase()) {
            case "png":
            case "jpg":
            case "gif":
                return C.AssetType.Image;
            case "ogg":
            case "m4a":
            case "mp3":
            case "wav":
                return C.AssetType.Audio
        }
        return C.AssetType.Data
    };
    C.Manifest.createBuildManifests = function() {
        var a = new G;
        a.set("initial_load", [{
            name: "ui/splash/splash_with_grass.jpg",
            md5: "3fbe039f4b4681bfee8c01402554aeaf",
            bytes: 144544
        }, {
            name: "ui/splash/splash_sound_on.png",
            md5: "971f35050078b765f05885dc165b7f8e",
            bytes: 9750
        }, {
            name: "ui/splash/splash_sound_off.png",
            md5: "4eb654b9831b8ee49d6dffd1fa8a8b78",
            bytes: 8890
        }, {
            name: "ui/splash/splash_btn_sound_on.png",
            md5: "df9561172983d115db1dddc1dbb47703",
            bytes: 8146
        }, {
            name: "ui/splash/splash_btn_sound_off.png",
            md5: "eaba59efb1e39e1f7dcfffc4952b88f9",
            bytes: 5821
        }, {
            name: "ui/splash/splash_btn_episode_temp.png",
            md5: "9d8d044788ba43d9173104dc66869644",
            bytes: 5183
        }, {
            name: "ui/splash/splash_bg.jpg",
            md5: "aa08d46d1e6b885d9052b3344c36aaec",
            bytes: 55649
        }, {
            name: "ui/splash/splash.jpg",
            md5: "6c6aa52615a7f3b50d240b0c5baf679c",
            bytes: 138200
        }, {
            name: "ui/splash/sb_logo.png",
            md5: "4e34ca5287d38a3e08a9c181f13ba4fb",
            bytes: 33155
        }, {
            name: "ui/splash/game_title.png",
            md5: "fbaecd81a865e2f79ba7d9c5a0f02f67",
            bytes: 194453
        }, {
            name: "ui/splash/episode5_button.png",
            md5: "6b31245825d79a44a41a1f6d593a849a",
            bytes: 38386
        }, {
            name: "ui/splash/episode4_button.png",
            md5: "359d6e2f9c3b8edf94e6f16cf80436e8",
            bytes: 34177
        }, {
            name: "ui/splash/episode3_button.png",
            md5: "8d8f0d52b18ccb7b2b137f5572f823c2",
            bytes: 38020
        }, {
            name: "ui/splash/episode2_button.png",
            md5: "7bb7f404bc7005d83341cd23c3323ff8",
            bytes: 32159
        }, {
            name: "ui/splash/episode1_button.png",
            md5: "92f8ea13345e6377ad4d422a80729729",
            bytes: 26644
        }, {
            name: "ui/splash/bottom_grass.png",
            md5: "f32dfd13ed3acacb0eafaf4695643b63",
            bytes: 25753
        }, {
            name: "audio/AssetAudioMenuMusic.ogg",
            md5: "60c29e2800584ea3388683be60c8102f",
            bytes: 459598
        }, {
            name: "audio/AssetAudioMenuMusic.mp3",
            md5: "dc061204a6850b2ac5b54ebe8e6fe9b8",
            bytes: 682787
        }, {
            name: "audio/AssetAudioClick.ogg",
            md5: "22d44c4ab6163b649e13d17fd73dd38d",
            bytes: 5988
        }, {
            name: "audio/AssetAudioClick.mp3",
            md5: "95e4b772500ee4ae689bfa1e9c2cd67d",
            bytes: 3808
        }]);
        a.set("gameplay_universal", [{
                name: "ui/quit_confirm/quit_yes_hover.png",
                md5: "e05a7c106f22c49b651fa77a0e49fad3",
                bytes: 4431
            }, {
                name: "ui/quit_confirm/quit_yes.png",
                md5: "ce919ae93831e10bef975af30047bb0a",
                bytes: 4057
            }, {
                name: "ui/quit_confirm/quit_prompt.png",
                md5: "e8d6a81183f45c70af4336b97c077272",
                bytes: 60938
            }, {
                name: "ui/quit_confirm/quit_no_hover.png",
                md5: "b61b049367cec505ab5a93bbb6ef475f",
                bytes: 4458
            }, {
                name: "ui/quit_confirm/quit_no.png",
                md5: "6dbabf9b4bbb41e75c54437634aeabee",
                bytes: 4080
            }, {
                name: "ui/menu/pause_soundon_button.png",
                md5: "ebd055d1e42b609ba981c73e29612509",
                bytes: 10803
            }, {
                name: "ui/menu/pause_soundoff_button.png",
                md5: "e02db2a46d89873541f697d4d550d52e",
                bytes: 8682
            }, {
                name: "ui/menu/pause_quit_button.png",
                md5: "1a0c46bb95e1806e9646fae2dad0df1b",
                bytes: 10612
            },
            {
                name: "ui/menu/pause_play_button.png",
                md5: "690b867320184381a60fdaaefcc27b40",
                bytes: 8584
            }, {
                name: "ui/menu/pause_menu.png",
                md5: "8cbe57c08912b7396cbae1f5be2d7721",
                bytes: 63711
            }, {
                name: "ui/menu/pause_help_button.png",
                md5: "cb35bb074d499157ba2369797ec4a101",
                bytes: 9375
            }, {
                name: "ui/help/help_play_button.png",
                md5: "7db86f3d352ea5884f5251c167074876",
                bytes: 9224
            }, {
                name: "ui/help/help_menu.png",
                md5: "c5aab5472a34c87eb94d1c5cb961d1dd",
                bytes: 114734
            }, {
                name: "ui/gameplay_hud/life_eye3.png",
                md5: "8fed706c822f8fe361633b92c02bb694",
                bytes: 3111
            }, {
                name: "ui/gameplay_hud/life_eye2.png",
                md5: "33d7d7a9534b5a7480bd1a5d443e1a06",
                bytes: 2811
            }, {
                name: "ui/gameplay_hud/life_eye1.png",
                md5: "aac95474d397e42c3956fa06a3c5a995",
                bytes: 2798
            }, {
                name: "ui/gameplay_hud/joystick.png",
                md5: "8a979283bcfc08094c7e6efa7853f6bb",
                bytes: 2499
            }, {
                name: "ui/gameplay_hud/hud_power_eye_stalk.png",
                md5: "5b63db7e9fb21bd10febe53209f9bca0",
                bytes: 4745
            }, {
                name: "ui/gameplay_hud/hud_power_eye_greenfill.png",
                md5: "a1a3e57ca08a7311bd11b8ffbb895e10",
                bytes: 328
            }, {
                name: "ui/gameplay_hud/hud_power_eye_glow.png",
                md5: "b051cd1c18eeb74be3801dd63905ab52",
                bytes: 4384
            }, {
                name: "ui/gameplay_hud/hud_power_eye_full.png",
                md5: "3cbff407561dfa5bde8c9d8773afb41f",
                bytes: 5305
            }, {
                name: "ui/gameplay_hud/hud_power_eye_ball.png",
                md5: "dd6c2c729b37002df5fea4e18d693183",
                bytes: 2436
            }, {
                name: "ui/gameplay_hud/hud_pause_button.png",
                md5: "cf8402405aaacd5fe3bf4756fc563737",
                bytes: 3722
            }, {
                name: "ui/gameplay_hud/hud.png",
                md5: "c71e61db9ad83d4ff8ce1d6b9d17b4ea",
                bytes: 32699
            }, {
                name: "ui/gameplay_hud/button_action_rod_up.png",
                md5: "b1816b91478a26842a3daff35dc9fbe6",
                bytes: 5129
            }, {
                name: "ui/gameplay_hud/button_action_attack_up.png",
                md5: "2853f6a44cd9983a71b62b3c786ca980",
                bytes: 4952
            }, {
                name: "ui/end_screen/end_screen.jpg",
                md5: "966cf0408a092a8257466ea3a8e69e49",
                bytes: 184402
            }, {
                name: "ui/end_screen/button_black.png",
                md5: "aa76367c5ed6a360fa7872a45db02669",
                bytes: 4226
            }, {
                name: "ui/end_screen/button3.png",
                md5: "7a834016119baf73b3c61ccbaff87e80",
                bytes: 18305
            }, {
                name: "ui/end_screen/button2.png",
                md5: "c0df4a228e660ad7903102566ab3609d",
                bytes: 12820
            }, {
                name: "ui/end_screen/button1.png",
                md5: "ec50b21b7ace63e4af6d27988aacc5bd",
                bytes: 12686
            }, {
                name: "flump_obstacles/version",
                md5: "094c64a7fe18dfa1a09b2633dff12006",
                bytes: 1
            }, {
                name: "flump_obstacles/md5",
                md5: "32aa4986bbb36f6c66e515c799ac4882",
                bytes: 32
            }, {
                name: "flump_obstacles/library.json",
                md5: "6f22ce79200e43a687c510a0a6565cb5",
                bytes: 24025
            }, {
                name: "flump_obstacles/atlas0.png",
                md5: "3b0a34636437a72b79fb7cad74ab7716",
                bytes: 133551
            }, {
                name: "flump_monsters/version",
                md5: "094c64a7fe18dfa1a09b2633dff12006",
                bytes: 1
            }, {
                name: "flump_monsters/md5",
                md5: "0cee289787150882de314d1d421919e3",
                bytes: 32
            }, {
                name: "flump_monsters/library.json",
                md5: "6ef83b068ff334ba2abd8bc5c5c68765",
                bytes: 215048
            }, {
                name: "flump_monsters/atlas0.png",
                md5: "75c38bc41ae64b5b040b76cd13d26607",
                bytes: 238787
            }, {
                name: "flump_enemies/version",
                md5: "094c64a7fe18dfa1a09b2633dff12006",
                bytes: 1
            }, {
                name: "flump_enemies/md5",
                md5: "71945d54f53780d8bac53430ae7a6f1e",
                bytes: 32
            }, {
                name: "flump_enemies/library.json",
                md5: "9fcd486bdac51269fc58eee597bed645",
                bytes: 76598
            }, {
                name: "flump_enemies/atlas0.png",
                md5: "751bbdd9fcc9e4fbd5736c638e419693",
                bytes: 99683
            },
            {
                name: "elements/shadow.png",
                md5: "bc42a38b55601820b040c1d6d4f2b848",
                bytes: 1330
            }, {
                name: "elements/red_crystal_ground.png",
                md5: "0cc0f92f272d0ab07e41264f45f7e9df",
                bytes: 4925
            }, {
                name: "elements/red_crystal.png",
                md5: "26fbe5bac01eee5e872e1d89924dac73",
                bytes: 4768
            }, {
                name: "elements/monster_attack_fx_lg.png",
                md5: "7bd712c265baab5dcdbe0927abcf88b6",
                bytes: 88988
            }, {
                name: "elements/green_crystal.png",
                md5: "f621f6447b32d0ecb2cec26f1d5d52be",
                bytes: 4436
            }, {
                name: "audio/Shard.ogg",
                md5: "691d94e953c59963857b0d7ede322ffd",
                bytes: 15578
            },
            {
                name: "audio/Shard.mp3",
                md5: "d9767b561d146b991c51fc8e7ef927cc",
                bytes: 27044
            }, {
                name: "audio/AssetAudioTurtlePower.ogg",
                md5: "2b077fba202b812e75e78fb2ef5bd925",
                bytes: 32256
            }, {
                name: "audio/AssetAudioTurtlePower.mp3",
                md5: "83d9267b82c95d3f26e02128d751dda9",
                bytes: 47701
            }, {
                name: "audio/AssetAudioThrow.ogg",
                md5: "c2a3c83b601b5e92f1a90ad6509cdc48",
                bytes: 9231
            }, {
                name: "audio/AssetAudioThrow.mp3",
                md5: "5a421471e573e2dc1c7571269d49b170",
                bytes: 8198
            }, {
                name: "audio/AssetAudioSwim.ogg",
                md5: "4fffeab1492be32669f5a1e8e06b5bc1",
                bytes: 184261
            }, {
                name: "audio/AssetAudioSwim.mp3",
                md5: "ce135a17ab3a35f29af1beb1b4cdce91",
                bytes: 222610
            }, {
                name: "audio/AssetAudioStep2.ogg",
                md5: "974adf678ffd60bae663e08fd4393ebd",
                bytes: 14392
            }, {
                name: "audio/AssetAudioStep2.mp3",
                md5: "cb817ba4f02e9bd7102ed196a295659b",
                bytes: 15094
            }, {
                name: "audio/AssetAudioStep1.ogg",
                md5: "8af60b32425d66807105037c2e8f6fbe",
                bytes: 13200
            }, {
                name: "audio/AssetAudioStep1.mp3",
                md5: "29cb1b202eab207378c86b5afa9cc9ff",
                bytes: 13840
            }, {
                name: "audio/AssetAudioSplash.ogg",
                md5: "adfa4ebf5c80ff6e6089a680bd16f751",
                bytes: 60568
            }, {
                name: "audio/AssetAudioSplash.mp3",
                md5: "7c7ab3498f9ba2f9a4bbbac886bab73a",
                bytes: 49577
            }, {
                name: "audio/AssetAudioRockBreak2.ogg",
                md5: "27511f180dd859c540c7ff85fb3b720a",
                bytes: 45395
            }, {
                name: "audio/AssetAudioRockBreak2.mp3",
                md5: "ea5f59921a539ad52021dc6732d0f6b7",
                bytes: 57104
            }, {
                name: "audio/AssetAudioRockBreak1.ogg",
                md5: "1254bc4856754e0f60df3b2b4c5af63f",
                bytes: 18489
            }, {
                name: "audio/AssetAudioRockBreak1.mp3",
                md5: "d16d6f3e81ac69aa92aed4c7dc5ffec3",
                bytes: 27638
            }, {
                name: "audio/AssetAudioRainbow.ogg",
                md5: "ef6c261e4f6511d48294117d2633d25a",
                bytes: 17459
            }, {
                name: "audio/AssetAudioRainbow.mp3",
                md5: "5094d3d62150fde203346eabc6dc8f15",
                bytes: 21992
            }, {
                name: "audio/AssetAudioPickup.ogg",
                md5: "5f0617984aed1bc198403238e406d72f",
                bytes: 6117
            }, {
                name: "audio/AssetAudioPickup.mp3",
                md5: "664ee56d7760c9ce60766260061fdaca",
                bytes: 3809
            }, {
                name: "audio/AssetAudioMetroidRoar.ogg",
                md5: "99d5401e3067697048f0046e493c8c71",
                bytes: 20296
            }, {
                name: "audio/AssetAudioMetroidRoar.mp3",
                md5: "597c1f13a1125d643d1a912febda5600",
                bytes: 35161
            }, {
                name: "audio/AssetAudioJump.ogg",
                md5: "8a12dd99efaab524e56b4621a40921a6",
                bytes: 13585
            }, {
                name: "audio/AssetAudioJump.mp3",
                md5: "4fad45edc4b35aa2c3aa7740f29096d7",
                bytes: 13838
            }, {
                name: "audio/AssetAudioHit.ogg",
                md5: "933b70447322e4108d729585ce1bdcef",
                bytes: 7631
            }, {
                name: "audio/AssetAudioHit.mp3",
                md5: "ea886f56d6a3f23a878b0baa7775eace",
                bytes: 7568
            }, {
                name: "audio/AssetAudioGrunt.ogg",
                md5: "df785be61c0d605d261dc9b15b519194",
                bytes: 15856
            }, {
                name: "audio/AssetAudioGrunt.mp3",
                md5: "0117b4b43e6277488dbd5aa9ef2720ea",
                bytes: 16974
            }, {
                name: "audio/AssetAudioGameOver.ogg",
                md5: "e72e63ccd23731511f372cacaf6e9dd0",
                bytes: 101775
            }, {
                name: "audio/AssetAudioGameOver.mp3",
                md5: "d2ee6842a1d5d2baad70d0e557b60fb4",
                bytes: 110391
            }
        ]);
        a.set("fonts_la", [{
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("fonts_kr", [{
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("fonts_jp", [{
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("fonts_en", [{
            name: "button_font.png",
            md5: "17d72e250bc212d312d4ecd6fee5bfac",
            bytes: 227144
        }, {
            name: "button_font.fnt",
            md5: "07edc2b0fd0f3e6b0b3a7a80eadb89f3",
            bytes: 25032
        }, {
            name: "Basic.png",
            md5: "1ad9a6295d7e71dfaa08af2694c87eab",
            bytes: 674967
        }, {
            name: "Basic.fnt",
            md5: "7e982a109b7a746280313f04ae9d9cde",
            bytes: 25030
        }]);
        a.set("fonts_cn", [{
            name: "Basic.png",
            md5: "6a36225f74ea1a7793667cffcb1047ce",
            bytes: 622185
        }, {
            name: "Basic.fnt",
            md5: "a0e96df3ee1859e9a082bb8b061791c5",
            bytes: 25155
        }]);
        a.set("cutscene", [{
                name: "portraits/spongebob_squarepants.png",
                md5: "6077cc606f57b027dda4c209d3725f9f",
                bytes: 46426
            }, {
                name: "portraits/portrait_sparkles.png",
                md5: "eb11953924901d9c4e2e69207ef7d5e9",
                bytes: 1450
            }, {
                name: "portraits/patrick_star.png",
                md5: "d23a2fe9fed10ec557800fd8ff9c8a3c",
                bytes: 38178
            }, {
                name: "portraits/monster_z.png",
                md5: "654dd83b14f184e96637c841bde4a853",
                bytes: 27578
            }, {
                name: "portraits/monster_y.png",
                md5: "cd9186ab3b2b9d3aedfbcc57c8021a1b",
                bytes: 31017
            }, {
                name: "portraits/monster_x.png",
                md5: "dd8fcc4c12bd6201663671a6b04dd6dc",
                bytes: 25428
            }, {
                name: "portraits/monster_questionmark.png",
                md5: "7a68e27311a5b12a1ffbaf1304254e1d",
                bytes: 29759
            }, {
                name: "portraits/island_sandy.png",
                md5: "52bf62187095898d9fddb26eb24c57cb",
                bytes: 40270
            }, {
                name: "buttonSkip.png",
                md5: "c0df4a228e660ad7903102566ab3609d",
                bytes: 12820
            }, {
                name: "audio/dun_dun.ogg",
                md5: "d809ed8b175361ae4aecfaef73d0a30a",
                bytes: 43143
            }, {
                name: "audio/dun_dun.mp3",
                md5: "ee9cc9238b1ac6221e8ee7bfad05cf80",
                bytes: 54542
            },
            {
                name: "audio/AssetAudioIntroMusic.ogg",
                md5: "d767fcee517029568fb17c720bfee88b",
                bytes: 423125
            }, {
                name: "audio/AssetAudioIntroMusic.mp3",
                md5: "2952e1a29f116438d07474d6a47cf024",
                bytes: 604421
            }
        ]);
        a.set("bootstrap", [{
            name: "ui/loading_tentacle.png",
            md5: "0cd420aadf611ca010ddbd7cf32a8a47",
            bytes: 34571
        }, {
            name: "ui/loading_spinner.png",
            md5: "4d3d00e1e4ec16e9b3cbb531f6c59dcd",
            bytes: 12504
        }, {
            name: "ui/loading_panel_international.jpg",
            md5: "d4b9fbb679d1cfee918ea429da144725",
            bytes: 328817
        }, {
            name: "ui/loading_panel.jpg",
            md5: "12a1fff0444c2e8c43f8f7edcd467661",
            bytes: 137182
        }, {
            name: "ui/loading_bar_outline.png",
            md5: "655869802b6f3a1c36edf7cfb18bca4b",
            bytes: 342
        }, {
            name: "ui/loading_bar.png",
            md5: "35f0e3103ecfdb81e04812d7a20d83c0",
            bytes: 249
        }, {
            name: "config/translation_la.xml",
            md5: "70f340fcfcafb95e818cbb99cf5c3bca",
            bytes: 6262
        }, {
            name: "config/translation_kr.xml",
            md5: "70f340fcfcafb95e818cbb99cf5c3bca",
            bytes: 6262
        }, {
            name: "config/translation_jp.xml",
            md5: "70f340fcfcafb95e818cbb99cf5c3bca",
            bytes: 6262
        }, {
            name: "config/translation_en.xml",
            md5: "5bac561aa00148d164b24a43a2b0988d",
            bytes: 16959
        }, {
            name: "config/translation_cn.xml",
            md5: "70f340fcfcafb95e818cbb99cf5c3bca",
            bytes: 6262
        }, {
            name: "config/config.xml",
            md5: "aee5ee8124a04394755e20474d8d6932",
            bytes: 2381
        }, {
            name: "audio/silent.ogg",
            md5: "3526550092a0e091f382852de5ef2315",
            bytes: 5514
        }, {
            name: "audio/silent.mp3",
            md5: "ba9e6829ba32e427142251a85cbd4fbb",
            bytes: 2114
        }]);
        a.set("bgs_level5", [{
                name: "outro/o5_9.jpg",
                md5: "3494079396f018d49f5e9dd33843b90a",
                bytes: 161740
            }, {
                name: "outro/o5_8.jpg",
                md5: "e523504523e13a81febda5a72b3de6e7",
                bytes: 149837
            },
            {
                name: "outro/o5_7.jpg",
                md5: "cc2fab8d11175832aacbf1f3d5811c8c",
                bytes: 154673
            }, {
                name: "outro/o5_6.jpg",
                md5: "1abae27dd6722bc047163a647a4b0558",
                bytes: 215021
            }, {
                name: "outro/o5_5.jpg",
                md5: "d8a412378ba59f0b042a346c75769929",
                bytes: 158811
            }, {
                name: "outro/o5_4.jpg",
                md5: "1c39876ccaeb6450b4d05dac93b2a71b",
                bytes: 179498
            }, {
                name: "outro/o5_3.jpg",
                md5: "bcb7a08b3b1cc7ef212d143dbb1552fe",
                bytes: 159576
            }, {
                name: "outro/o5_2.jpg",
                md5: "c4a78a6d628c61b35fb6c9999a1b9c17",
                bytes: 159259
            }, {
                name: "outro/o5_17.jpg",
                md5: "3376c925ef74f826b0ca6f615876fe42",
                bytes: 110862
            }, {
                name: "outro/o5_16.jpg",
                md5: "3b0ce973f997b6f0741bcc992c8011cb",
                bytes: 112284
            }, {
                name: "outro/o5_15.jpg",
                md5: "89a8504493449af5060c429f1c67074b",
                bytes: 111735
            }, {
                name: "outro/o5_14.jpg",
                md5: "a6d0284a555399af6675bae8731261e5",
                bytes: 112249
            }, {
                name: "outro/o5_13.jpg",
                md5: "b2a2101c93250c0de09e7f212695effc",
                bytes: 112392
            }, {
                name: "outro/o5_12.jpg",
                md5: "f8882e70a44b9d7abdf01f6c451fa8d5",
                bytes: 269999
            }, {
                name: "outro/o5_11.jpg",
                md5: "e0c80956d87f8e9a6b6893cc1bd77e31",
                bytes: 143739
            }, {
                name: "outro/o5_10.jpg",
                md5: "41149dedde8acff5d668956af58c421c",
                bytes: 163224
            }, {
                name: "outro/o5_1.jpg",
                md5: "b62791a65c25915ada3da52e6492d986",
                bytes: 159449
            }, {
                name: "outro/glitter.png",
                md5: "9900b13d109dc1fc9a472456fcdca9af",
                bytes: 1452
            }, {
                name: "outro/characters.png",
                md5: "01d3d6ce3bc3b54db8f2287ce20c1ac0",
                bytes: 3962
            }, {
                name: "level5_rock.png",
                md5: "37646358affb3407deefeeea892b7f2f",
                bytes: 851368
            }, {
                name: "level5_foreground_top_second.png",
                md5: "7726e6ec608ade46a3d87cb0827188f8",
                bytes: 198874
            }, {
                name: "level5_foreground_top_first.png",
                md5: "cdb69980ea51f3c9c20e339c41d79fcf",
                bytes: 167792
            },
            {
                name: "level5_foreground_bottom_second.png",
                md5: "7c579f908c174bd52ab122aba90c2b76",
                bytes: 149850
            }, {
                name: "level5_foreground_bottom_first.png",
                md5: "70bb4b90e8e843b3ee7052b6ceebb0c2",
                bytes: 171743
            }, {
                name: "level5_background_second.jpg",
                md5: "804de0a9e7ca297b35efac869a589629",
                bytes: 180128
            }, {
                name: "level5_background_first.jpg",
                md5: "3f540f9639b0e4e7bb7472ae73ce72f1",
                bytes: 165283
            }, {
                name: "intro/rock.png",
                md5: "a3384b7a0ef9cb106bb74ae9733a042a",
                bytes: 839179
            }, {
                name: "intro/monster.png",
                md5: "819547fa30b51c119f463c8a69862bca",
                bytes: 634033
            }, {
                name: "intro/i5_8.jpg",
                md5: "e8d6c2faa634650ecb019c9ef6b5cac7",
                bytes: 48257
            }, {
                name: "intro/i5_7.jpg",
                md5: "b68fac28b5dad5580ba4ca43e0aa2b21",
                bytes: 48178
            }, {
                name: "intro/i5_6.jpg",
                md5: "7576b466223bd094aad0d2e9728f6023",
                bytes: 48798
            }, {
                name: "intro/i5_5.jpg",
                md5: "61ccd7cac4de3eacb0bee792af34f877",
                bytes: 88872
            }, {
                name: "intro/i5_4.jpg",
                md5: "5ef464f07d0f8d85ba07564b9b1eb09f",
                bytes: 101565
            }, {
                name: "intro/i5_3.jpg",
                md5: "4f399ea9929c479c1f93efee3a396c1f",
                bytes: 112666
            }, {
                name: "intro/i5_2.jpg",
                md5: "956e397b78240c9ebe4b79cd4026d805",
                bytes: 122653
            }, {
                name: "intro/i5_1.jpg",
                md5: "d370e8dc44363f4a1dd0eca188fb6ae6",
                bytes: 136436
            }, {
                name: "flump_rocks/version",
                md5: "094c64a7fe18dfa1a09b2633dff12006",
                bytes: 1
            }, {
                name: "flump_rocks/md5",
                md5: "2fd314774fb484da7844605c675fffbb",
                bytes: 32
            }, {
                name: "flump_rocks/library.json",
                md5: "ca5d85c37cf6d717af468bec85265647",
                bytes: 4164
            }, {
                name: "flump_rocks/atlas0.png",
                md5: "f72ab8e21189670960ff988a772072e6",
                bytes: 193353
            }
        ]);
        a.set("bgs_level4", [{
                name: "outro/o4_6.jpg",
                md5: "7576b466223bd094aad0d2e9728f6023",
                bytes: 48798
            },
            {
                name: "outro/o4_5.jpg",
                md5: "61ccd7cac4de3eacb0bee792af34f877",
                bytes: 88872
            }, {
                name: "outro/o4_4.jpg",
                md5: "5ef464f07d0f8d85ba07564b9b1eb09f",
                bytes: 101565
            }, {
                name: "outro/o4_3.jpg",
                md5: "4f399ea9929c479c1f93efee3a396c1f",
                bytes: 112666
            }, {
                name: "outro/o4_2.jpg",
                md5: "956e397b78240c9ebe4b79cd4026d805",
                bytes: 122653
            }, {
                name: "outro/o4_1.jpg",
                md5: "d370e8dc44363f4a1dd0eca188fb6ae6",
                bytes: 136436
            }, {
                name: "level4_sky.jpg",
                md5: "10e8e1f02cbd888134b9dd8774ee0d71",
                bytes: 115134
            }, {
                name: "level4_ground_flat_second.png",
                md5: "4d6e1f05707598cd49ec51202c7e3f20",
                bytes: 229650
            }, {
                name: "level4_ground_flat_first.png",
                md5: "ea0ca52276a7195126b5e3b8a2191534",
                bytes: 225973
            }, {
                name: "level4_foreground_flat_second.png",
                md5: "d3564bec4221fe7b16283ba01d1c11f5",
                bytes: 180686
            }, {
                name: "level4_foreground_flat_first.png",
                md5: "535650e150980077710c61a9810d454d",
                bytes: 176844
            }, {
                name: "intro/i4_9.jpg",
                md5: "61337c04af85334578fa7679fb40009c",
                bytes: 159135
            }, {
                name: "intro/i4_8.jpg",
                md5: "fc73805952134b8180cd5f7b6fae2519",
                bytes: 165472
            }, {
                name: "intro/i4_7.jpg",
                md5: "7b16d95ef5bd4b5e40bee2422d009108",
                bytes: 119402
            }, {
                name: "intro/i4_6.jpg",
                md5: "698d975a1d23c4140e390de278ddc45d",
                bytes: 119582
            }, {
                name: "intro/i4_5.jpg",
                md5: "3c50675bafe0ec1379349db26123e2a7",
                bytes: 101205
            }, {
                name: "intro/i4_4.jpg",
                md5: "1993ef09d99648fbe57ba1b81238fe4a",
                bytes: 99687
            }, {
                name: "intro/i4_3.jpg",
                md5: "81bc5bd1c83125ef7d4976a5c0ebf90a",
                bytes: 225228
            }, {
                name: "intro/i4_2.jpg",
                md5: "cf0c73673ecdec7eeb2f1235ca2b9cf5",
                bytes: 229013
            }, {
                name: "intro/i4_11.jpg",
                md5: "a926331f01d2399075ea4b55f71d2743",
                bytes: 159790
            }, {
                name: "intro/i4_10.jpg",
                md5: "727ff33461c685a86103dc5f078e810f",
                bytes: 146476
            }, {
                name: "intro/i4_1.jpg",
                md5: "12c423d1f541e2327de1ccc09c2afc58",
                bytes: 223318
            }
        ]);
        a.set("bgs_level3", [{
            name: "outro/o3_4.jpg",
            md5: "81bc5bd1c83125ef7d4976a5c0ebf90a",
            bytes: 225228
        }, {
            name: "outro/o3_3.jpg",
            md5: "cf0c73673ecdec7eeb2f1235ca2b9cf5",
            bytes: 229013
        }, {
            name: "outro/o3_2.jpg",
            md5: "12c423d1f541e2327de1ccc09c2afc58",
            bytes: 223318
        }, {
            name: "outro/o3_1.jpg",
            md5: "a7aa0bb4ae8f66d85a1890b1bb3955b0",
            bytes: 221115
        }, {
            name: "level3_vines.png",
            md5: "2315f6876e614fd19338a44a4110c0e5",
            bytes: 47706
        }, {
            name: "level3_tree.png",
            md5: "73c6a7210d183c73c4aa6b5e78c4a5d3",
            bytes: 135257
        }, {
            name: "level3_plants_second.png",
            md5: "aa3a1825a34c8a240a975e48cd1a8207",
            bytes: 175063
        }, {
            name: "level3_plants_first.png",
            md5: "84791484450bce40742912da893d55d2",
            bytes: 255062
        }, {
            name: "level3_background_second.jpg",
            md5: "db1c21b43e6a6ce2b3d57d139d55dd60",
            bytes: 40112
        }, {
            name: "level3_background_first.jpg",
            md5: "d2593c2cb0a00491d5dd59bd0de17ef0",
            bytes: 135072
        }, {
            name: "intro/i3_7.jpg",
            md5: "cab2ae20885f4ea43080588b2068922c",
            bytes: 259938
        }, {
            name: "intro/i3_6.jpg",
            md5: "2a5fba717d6ef62f89915e4453c5b038",
            bytes: 258794
        }, {
            name: "intro/i3_5.jpg",
            md5: "1daee379f684f460efeb62b3bef26bab",
            bytes: 239992
        }, {
            name: "intro/i3_4.jpg",
            md5: "cd9a6cd7cf286d9b579ed27c5006b7fc",
            bytes: 443513
        }, {
            name: "intro/i3_3.jpg",
            md5: "a7cf35fe4a90ba666e4886a3ae62f197",
            bytes: 242971
        }, {
            name: "intro/i3_2.jpg",
            md5: "6a31332ed3972a3cea64ca2015f30189",
            bytes: 242305
        }, {
            name: "intro/i3_1.jpg",
            md5: "6da6bc2900a337bc8e6f95d7ef50c2bd",
            bytes: 248565
        }, {
            name: "intro/falling_sb_small.png",
            md5: "ebd4ceea6cd7ec4d117464cdfbcab2e4",
            bytes: 20948
        }, {
            name: "intro/falling_sb.png",
            md5: "a38832128e33475bace2ea257202ead8",
            bytes: 45515
        }]);
        a.set("bgs_level2", [{
                name: "outro/o2_3.jpg",
                md5: "a7cf35fe4a90ba666e4886a3ae62f197",
                bytes: 242971
            }, {
                name: "outro/o2_2.jpg",
                md5: "6a31332ed3972a3cea64ca2015f30189",
                bytes: 242305
            }, {
                name: "outro/o2_1.jpg",
                md5: "6da6bc2900a337bc8e6f95d7ef50c2bd",
                bytes: 248565
            }, {
                name: "outro/falling_sb_small.png",
                md5: "ebd4ceea6cd7ec4d117464cdfbcab2e4",
                bytes: 20948
            }, {
                name: "level2_sky.jpg",
                md5: "5a6dfdb46227ccb149c199431c7779b4",
                bytes: 13902
            },
            {
                name: "level2_sand.jpg",
                md5: "177ca5933c1a892a817e90dcfd5a1ec2",
                bytes: 99930
            }, {
                name: "level2_foreground_top.png",
                md5: "b1826289a05bad348ad1d94f2a9bba7c",
                bytes: 76363
            }, {
                name: "level2_foreground_bottom.png",
                md5: "0b9425e7739960f1904944c2bbe501ac",
                bytes: 70232
            }, {
                name: "level2_bushes_second.png",
                md5: "092ea3c9715fdbf939123183149db990",
                bytes: 97983
            }, {
                name: "level2_bushes_first.png",
                md5: "3ef4ccd070a83c46815b4d980c2e864d",
                bytes: 381573
            }, {
                name: "intro/staff.png",
                md5: "c61a663710a54fc8355bef3f7b517d28",
                bytes: 57091
            }, {
                name: "intro/scroll_top.jpg",
                md5: "39977d99aa94839cc144388f9da24420",
                bytes: 75461
            }, {
                name: "intro/scroll_bottom.jpg",
                md5: "4e060271762d6611ec700bfd2f66e490",
                bytes: 163976
            }, {
                name: "intro/scroll2_top.jpg",
                md5: "861d5817de017c472fd4e655b726d930",
                bytes: 70412
            }, {
                name: "intro/scroll2_bottom.jpg",
                md5: "e28d0980232d1154453a54e4561d5b5c",
                bytes: 159502
            }, {
                name: "intro/between_scrolls.jpg",
                md5: "2ad7bea2c729e66cae518d67d46c8a34",
                bytes: 63972
            }, {
                name: "intro/after_scrolls.jpg",
                md5: "6d1d1435aaa8d4430df019193610ae2e",
                bytes: 151878
            }
        ]);
        a.set("bgs_level1", [{
            name: "outro/scroll0_top.jpg",
            md5: "39977d99aa94839cc144388f9da24420",
            bytes: 75461
        }, {
            name: "outro/scroll0_bottom.jpg",
            md5: "4e060271762d6611ec700bfd2f66e490",
            bytes: 163976
        }, {
            name: "level1_sky.jpg",
            md5: "5632e8385aa0bff57991785c135e7070",
            bytes: 34350
        }, {
            name: "level1_shore.jpg",
            md5: "0b1b7dde55cf190b85902afcd872febd",
            bytes: 57013
        }, {
            name: "level1_sanddune.png",
            md5: "0418109dafbadb5c82d859fedb6d94ad",
            bytes: 110033
        }, {
            name: "level1_sand_second.png",
            md5: "ca8b164f2daf5418829840ebc376d1cd",
            bytes: 469819
        }, {
            name: "level1_sand_first.png",
            md5: "960eb3a2c9ad93ba3c8fd77960320ac1",
            bytes: 515156
        }, {
            name: "level1_grass2.png",
            md5: "0463aecdfc343e572ae1ad3c41ee08ae",
            bytes: 27967
        }, {
            name: "level1_grass1.png",
            md5: "42623e3078afd05a90e831cbba4224d9",
            bytes: 84420
        }, {
            name: "intro/i1_6.jpg",
            md5: "60723f02d4f7af5f3fd30297b5ed98c5",
            bytes: 191129
        }, {
            name: "intro/i1_5.jpg",
            md5: "9fb01a2173dacb941c90598f72e3d222",
            bytes: 197431
        }, {
            name: "intro/i1_4.jpg",
            md5: "0d2fbea8466b8d4bed6c194aedfac18d",
            bytes: 191271
        }, {
            name: "intro/i1_3.jpg",
            md5: "4d10af1b9113a93958cc9b9604184e8e",
            bytes: 210887
        }, {
            name: "intro/i1_2.jpg",
            md5: "55148d99708dff6ed32e4e560f1a6569",
            bytes: 224524
        }, {
            name: "intro/i1_1.jpg",
            md5: "648fd180f72c150261bb4838d6a3f617",
            bytes: 153783
        }, {
            name: "intro/growl_box.png",
            md5: "3eca6296abd1fe94d430d12c567004c6",
            bytes: 54493
        }, {
            name: "intro/exclamation.png",
            md5: "8cd2c62663faa748fe399645178498c7",
            bytes: 13398
        }]);
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
        for (var b = new G, d = a.keys(); d.hasNext();) {
            var c = d.next(),
                e = new C.Manifest;
            e.set_relativeBasePath("assets");
            for (var f = 0, g = a.get(c); f < g.length;) {
                var h = g[f];
                ++f;
                var i = h.name,
                    j = c + "/" + i + "?v=" + s.string(h.md5),
                    k = C.Manifest.inferType(i);
                if (k == C.AssetType.Image || k == C.AssetType.Audio) i = o.Strings.removeFileExtension(i);
                e.add(i, j, h.bytes, k)
            }
            b.set(c, e)
        }
        return b
    };
    C.Manifest.prototype = {
        set_externalBasePath: function(a) {
            this._externalBasePath = a;
            null != a && null;
            return a
        },
        get_externalBasePath: function() {
            return this._externalBasePath
        },
        set_relativeBasePath: function(a) {
            this._relativeBasePath = a;
            null != a && null;
            return a
        },
        get_relativeBasePath: function() {
            return this._relativeBasePath
        },
        getFullURL: function(a) {
            var b = null != this.get_externalBasePath() && C.Manifest._supportsCrossOrigin ? this.get_externalBasePath() : this.get_relativeBasePath(),
                d = null != this.get_externalBasePath() ? this.get_externalBasePath() : this.get_relativeBasePath();
            a.type == C.AssetType.Data && (d = b);
            return null != d ? o.Strings.joinPath(d, a.url) : a.url
        },
        clone: function() {
            var a = new C.Manifest;
            a.set_relativeBasePath(this.get_relativeBasePath());
            a.set_externalBasePath(this.get_externalBasePath());
            a._entries = this._entries.slice();
            return a
        },
        iterator: function() {
            return B.iter(this._entries)
        },
        add: function(a, b, d, c) {
            null == d && (d = 0);
            null == c && (c = C.Manifest.inferType(b));
            a = new C.AssetEntry(a,
                b, c, d);
            this._entries.push(a);
            return a
        },
        __class__: C.Manifest,
        __properties__: {
            set_relativeBasePath: "set_relativeBasePath",
            get_relativeBasePath: "get_relativeBasePath",
            set_externalBasePath: "set_externalBasePath",
            get_externalBasePath: "get_externalBasePath"
        }
    };
    p = {};
    p.BlendMode = k["flambe.display.BlendMode"] = {
        __ename__: ["flambe", "display", "BlendMode"],
        __constructs__: ["Normal", "Add", "CopyExperimental"]
    };
    p.BlendMode.Normal = ["Normal", 0];
    p.BlendMode.Normal.toString = q;
    p.BlendMode.Normal.__enum__ = p.BlendMode;
    p.BlendMode.Add = ["Add", 1];
    p.BlendMode.Add.toString = q;
    p.BlendMode.Add.__enum__ = p.BlendMode;
    p.BlendMode.CopyExperimental = ["CopyExperimental", 2];
    p.BlendMode.CopyExperimental.toString = q;
    p.BlendMode.CopyExperimental.__enum__ = p.BlendMode;
    J = {
        Point: function(a, b) {
            null == b && (b = 0);
            null == a && (a = 0);
            this.x = a;
            this.y = b
        }
    };
    k["flambe.math.Point"] = J.Point;
    J.Point.__name__ = ["flambe", "math", "Point"];
    J.Point.prototype = {
        __class__: J.Point
    };
    p.Sprite = function() {
        this.blendMode = this.scissor = null;
        var a = this;
        this._flags = 11;
        this._localMatrix = new J.Matrix;
        var b = function() {
            a._flags |= 12
        };
        this.x = new F.AnimatedFloat(0, b);
        this.y = new F.AnimatedFloat(0, b);
        this.rotation = new F.AnimatedFloat(0, b);
        this.scaleX = new F.AnimatedFloat(1, b);
        this.scaleY = new F.AnimatedFloat(1, b);
        this.anchorX = new F.AnimatedFloat(0, b);
        this.anchorY = new F.AnimatedFloat(0, b);
        this.alpha = new F.AnimatedFloat(1)
    };
    k["flambe.display.Sprite"] = p.Sprite;
    p.Sprite.__name__ = ["flambe", "display", "Sprite"];
    p.Sprite.hitTest = function(a, b, d) {
        var c = a._compMap.Sprite_1;
        if (null != c) {
            if (3 != (c._flags & 3)) return null;
            c.getLocalMatrix().inverseTransform(b, d, p.Sprite._scratchPoint) && (b = p.Sprite._scratchPoint.x, d = p.Sprite._scratchPoint.y);
            var e = c.scissor;
            if (null != e && !e.contains(b, d)) return null
        }
        a = p.Sprite.hitTestBackwards(a.firstChild, b, d);
        return null != a ? a : null != c && c.containsLocal(b, d) ? c : null
    };
    p.Sprite.render = function(a, b) {
        var d = a._compMap.Sprite_1;
        if (null != d) {
            var c = d.alpha._value;
            if (0 == (d._flags & 1) || 0 >= c) return;
            b.save();
            1 > c && b.multiplyAlpha(c);
            null != d.blendMode && b.setBlendMode(d.blendMode);
            c = d.getLocalMatrix();
            b.transform(c.m00, c.m10, c.m01, c.m11, c.m02, c.m12);
            c = d.scissor;
            null != c && b.applyScissor(c.x, c.y, c.width, c.height);
            d.draw(b)
        }
        c = a._compMap.Director_0;
        if (null != c)
            for (var c = c.occludedScenes, e = 0; e < c.length;) {
                var f = c[e];
                ++e;
                p.Sprite.render(f, b)
            }
        for (c = a.firstChild; null != c;) e = c.next, p.Sprite.render(c, b), c = e;
        null != d && b.restore()
    };
    p.Sprite.hitTestBackwards = function(a, b, d) {
        if (null != a) {
            var c = p.Sprite.hitTestBackwards(a.next, b, d);
            return null != c ? c : p.Sprite.hitTest(a, b, d)
        }
        return null
    };
    p.Sprite.__super__ = P;
    p.Sprite.prototype =
        t(P.prototype, {
            set_pointerEnabled: function(a) {
                this._flags = o.BitSets.set(this._flags, 2, a);
                return a
            },
            set_visible: function(a) {
                this._flags = o.BitSets.set(this._flags, 1, a);
                return a
            },
            get_pointerUp: function() {
                null == this._internal_pointerUp && (this._internal_pointerUp = new o.Signal1);
                return this._internal_pointerUp
            },
            get_pointerMove: function() {
                null == this._internal_pointerMove && (this._internal_pointerMove = new o.Signal1);
                return this._internal_pointerMove
            },
            get_pointerDown: function() {
                null == this._internal_pointerDown &&
                    (this._internal_pointerDown = new o.Signal1);
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
            setXY: function(a, b) {
                this.x.set__(a);
                this.y.set__(b);
                return this
            },
            getLocalMatrix: function() {
                0 != (this._flags & 4) && (this._flags &= -5, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value,
                    3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
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
            __class__: p.Sprite,
            __properties__: t(P.prototype.__properties__, {
                set_visible: "set_visible",
                get_visible: "get_visible",
                set_pointerEnabled: "set_pointerEnabled",
                get_pointerEnabled: "get_pointerEnabled"
            })
        });
    p.FillSprite = function(a, b, d) {
        p.Sprite.call(this);
        this.color = a;
        this.width = new F.AnimatedFloat(b);
        this.height = new F.AnimatedFloat(d)
    };
    k["flambe.display.FillSprite"] = p.FillSprite;
    p.FillSprite.__name__ = ["flambe", "display", "FillSprite"];
    p.FillSprite.__super__ = p.Sprite;
    p.FillSprite.prototype = t(p.Sprite.prototype, {
        onUpdate: function(a) {
            p.Sprite.prototype.onUpdate.call(this, a);
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
            a.fillRect(this.color, 0, 0, this.width._value, this.height._value)
        },
        __class__: p.FillSprite
    });
    p.Font = function(a, b) {
        this.name = b;
        this._glyphs = new W;
        for (var d = new p._Font.ConfigParser(a.getFile(b + ".fnt")), c = new W, e = b.lastIndexOf("/"), e = 0 <= e ? B.substr(b, 0, e + 1) : "", f = d.keywords(); f.hasNext();) switch (f.next()) {
            case "info":
                for (var g = d.pairs(); g.hasNext();) {
                    var h = g.next();
                    switch (h.key) {
                        case "size":
                            this.size = h.getInt()
                    }
                }
                break;
            case "page":
                for (var g =
                        0, i = null, j = d.pairs(); j.hasNext();) switch (h = j.next(), h.key) {
                    case "id":
                        g = h.getInt();
                        break;
                    case "file":
                        i = h.getString()
                }
                c.set(g, a.getTexture(e + o.Strings.removeFileExtension(i)));
                break;
            case "char":
                g = null;
                for (i = d.pairs(); i.hasNext();) switch (h = i.next(), h.key) {
                    case "id":
                        g = new p.Glyph(h.getInt());
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
                        g.xOffset =
                            h.getInt();
                        break;
                    case "yoffset":
                        g.yOffset = h.getInt();
                        break;
                    case "xadvance":
                        g.xAdvance = h.getInt()
                }
                this._glyphs.set(g.charCode, g);
                break;
            case "kerning":
                g = null;
                i = -1;
                for (j = d.pairs(); j.hasNext();) switch (h = j.next(), h.key) {
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
    k["flambe.display.Font"] = p.Font;
    p.Font.__name__ = ["flambe", "display", "Font"];
    p.Font.prototype = {
        getGlyphs: function(a) {
            for (var b = [], d = 0, c = a.length; d < c;) {
                var e =
                    d++,
                    e = a.charCodeAt(e),
                    f = this._glyphs.get(e);
                null != f ? b.push(f) : K.logger.warn("Requested a missing character from font", ["font", this.name, "charCode", e])
            }
            return b
        },
        __class__: p.Font
    };
    p.Glyph = function(a) {
        this.charCode = a
    };
    k["flambe.display.Glyph"] = p.Glyph;
    p.Glyph.__name__ = ["flambe", "display", "Glyph"];
    p.Glyph.prototype = {
        _internal_setKerning: function(a, b) {
            null == this._kernings && (this._kernings = new W);
            this._kernings.set(a, b)
        },
        getKerning: function(a) {
            return null != this._kernings ? this._kernings.get(a) | 0 : 0
        },
        draw: function(a,
            b, d) {
            0 < this.width && a.drawSubImage(this.page, b + this.xOffset, d + this.yOffset, this.x, this.y, this.width, this.height)
        },
        __class__: p.Glyph
    };
    p._Font = {};
    p._Font.ConfigParser = function(a) {
        this._configText = a;
        this._keywordPattern = new X("([a-z]+)(.*)", "");
        this._pairPattern = new X('([a-z]+)=("[^"]*"|[^\\s]+)', "")
    };
    k["flambe.display._Font.ConfigParser"] = p._Font.ConfigParser;
    p._Font.ConfigParser.__name__ = ["flambe", "display", "_Font", "ConfigParser"];
    p._Font.ConfigParser.advance = function(a, b) {
        var d = b.matchedPos();
        return B.substr(a,
            d.pos + d.len, a.length)
    };
    p._Font.ConfigParser.prototype = {
        pairs: function() {
            var a = this,
                b = this._pairText;
            return {
                next: function() {
                    b = p._Font.ConfigParser.advance(b, a._pairPattern);
                    return new p._Font.ConfigPair(a._pairPattern.matched(1), a._pairPattern.matched(2))
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
                    b = p._Font.ConfigParser.advance(b, a._keywordPattern);
                    a._pairText = a._keywordPattern.matched(2);
                    return a._keywordPattern.matched(1)
                },
                hasNext: function() {
                    return a._keywordPattern.match(b)
                }
            }
        },
        __class__: p._Font.ConfigParser
    };
    p._Font.ConfigPair = function(a, b) {
        this.key = a;
        this._value = b
    };
    k["flambe.display._Font.ConfigPair"] = p._Font.ConfigPair;
    p._Font.ConfigPair.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
    p._Font.ConfigPair.prototype = {
        getString: function() {
            return 34 != this._value.charCodeAt(0) ? null : B.substr(this._value, 1, this._value.length - 2)
        },
        getInt: function() {
            return s.parseInt(this._value)
        },
        __class__: p._Font.ConfigPair
    };
    p.Graphics =
        function() {};
    k["flambe.display.Graphics"] = p.Graphics;
    p.Graphics.__name__ = ["flambe", "display", "Graphics"];
    p.Graphics.prototype = {
        __class__: p.Graphics
    };
    p.ImageSprite = function(a) {
        p.Sprite.call(this);
        this.texture = a
    };
    k["flambe.display.ImageSprite"] = p.ImageSprite;
    p.ImageSprite.__name__ = ["flambe", "display", "ImageSprite"];
    p.ImageSprite.__super__ = p.Sprite;
    p.ImageSprite.prototype = t(p.Sprite.prototype, {
        getNaturalHeight: function() {
            return this.texture.get_height()
        },
        getNaturalWidth: function() {
            return this.texture.get_width()
        },
        draw: function(a) {
            a.drawImage(this.texture, 0, 0)
        },
        __class__: p.ImageSprite
    });
    p.Orientation = k["flambe.display.Orientation"] = {
        __ename__: ["flambe", "display", "Orientation"],
        __constructs__: ["Portrait", "Landscape"]
    };
    p.Orientation.Portrait = ["Portrait", 0];
    p.Orientation.Portrait.toString = q;
    p.Orientation.Portrait.__enum__ = p.Orientation;
    p.Orientation.Landscape = ["Landscape", 1];
    p.Orientation.Landscape.toString = q;
    p.Orientation.Landscape.__enum__ = p.Orientation;
    p.Stage = function() {};
    k["flambe.display.Stage"] = p.Stage;
    p.Stage.__name__ = ["flambe", "display", "Stage"];
    p.Stage.prototype = {
        __class__: p.Stage,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_fullscreenSupported: "get_fullscreenSupported"
        }
    };
    p.TextSprite = function(a, b) {
        null == b && (b = "");
        this._width = this._height = 0;
        this._glyphs = this._offsets = this._font = this._text = null;
        p.Sprite.call(this);
        this._font = a;
        this._text = b;
        this._flags |= 32
    };
    k["flambe.display.TextSprite"] = p.TextSprite;
    p.TextSprite.__name__ = ["flambe", "display", "TextSprite"];
    p.TextSprite.__super__ =
        p.Sprite;
    p.TextSprite.prototype = t(p.Sprite.prototype, {
        updateGlyphs: function() {
            if (0 != (this._flags & 32)) {
                this._flags &= -33;
                this._glyphs = this._font.getGlyphs(this._text);
                this._offsets = [0];
                for (var a = this._height = this._width = 0, b = this._glyphs.length; a < b;) {
                    var d = this._glyphs[a];
                    ++a;
                    a == b ? this._width += d.width : (this._width += d.xAdvance + d.getKerning(this._glyphs[a].charCode), this._offsets.push(this._width));
                    this._height = J.FMath.max(this._height, d.height + d.yOffset)
                }
            }
        },
        set_font: function(a) {
            this._font = a;
            this._flags |=
                32;
            return a
        },
        set_text: function(a) {
            this._text = a;
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
            for (var b = 0, d = this._glyphs.length; b < d;) this._glyphs[b].draw(a, this._offsets[b], 0), ++b
        },
        __class__: p.TextSprite,
        __properties__: t(p.Sprite.prototype.__properties__, {
            set_text: "set_text",
            get_text: "get_text",
            set_font: "set_font",
            get_font: "get_font"
        })
    });
    p.Texture =
        function() {};
    k["flambe.display.Texture"] = p.Texture;
    p.Texture.__name__ = ["flambe", "display", "Texture"];
    p.Texture.prototype = {
        __class__: p.Texture,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_graphics: "get_graphics"
        }
    };
    z = {
        External: function() {}
    };
    k["flambe.external.External"] = z.External;
    z.External.__name__ = ["flambe", "external", "External"];
    z.External.prototype = {
        __class__: z.External,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    f = {};
    f.Key = k["flambe.input.Key"] = {
        __ename__: ["flambe", "input",
            "Key"
        ],
        __constructs__: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Number0,Number1,Number2,Number3,Number4,Number5,Number6,Number7,Number8,Number9,Numpad0,Numpad1,Numpad2,Numpad3,Numpad4,Numpad5,Numpad6,Numpad7,Numpad8,Numpad9,NumpadAdd,NumpadDecimal,NumpadDivide,NumpadEnter,NumpadMultiply,NumpadSubtract,F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,Left,Up,Right,Down,Alt,Backquote,Backslash,Backspace,CapsLock,Comma,Command,Control,Delete,End,Enter,Equals,Escape,Home,Insert,LeftBracket,Minus,PageDown,PageUp,Period,Quote,RightBracket,Semicolon,Shift,Slash,Space,Tab,Menu,Search,Unknown".split(",")
    };
    f.Key.A = ["A", 0];
    f.Key.A.toString = q;
    f.Key.A.__enum__ = f.Key;
    f.Key.B = ["B", 1];
    f.Key.B.toString = q;
    f.Key.B.__enum__ = f.Key;
    f.Key.C = ["C", 2];
    f.Key.C.toString = q;
    f.Key.C.__enum__ = f.Key;
    f.Key.D = ["D", 3];
    f.Key.D.toString = q;
    f.Key.D.__enum__ = f.Key;
    f.Key.E = ["E", 4];
    f.Key.E.toString = q;
    f.Key.E.__enum__ = f.Key;
    f.Key.F = ["F", 5];
    f.Key.F.toString = q;
    f.Key.F.__enum__ = f.Key;
    f.Key.G = ["G", 6];
    f.Key.G.toString = q;
    f.Key.G.__enum__ = f.Key;
    f.Key.H = ["H", 7];
    f.Key.H.toString = q;
    f.Key.H.__enum__ = f.Key;
    f.Key.I = ["I", 8];
    f.Key.I.toString = q;
    f.Key.I.__enum__ =
        f.Key;
    f.Key.J = ["J", 9];
    f.Key.J.toString = q;
    f.Key.J.__enum__ = f.Key;
    f.Key.K = ["K", 10];
    f.Key.K.toString = q;
    f.Key.K.__enum__ = f.Key;
    f.Key.L = ["L", 11];
    f.Key.L.toString = q;
    f.Key.L.__enum__ = f.Key;
    f.Key.M = ["M", 12];
    f.Key.M.toString = q;
    f.Key.M.__enum__ = f.Key;
    f.Key.N = ["N", 13];
    f.Key.N.toString = q;
    f.Key.N.__enum__ = f.Key;
    f.Key.O = ["O", 14];
    f.Key.O.toString = q;
    f.Key.O.__enum__ = f.Key;
    f.Key.P = ["P", 15];
    f.Key.P.toString = q;
    f.Key.P.__enum__ = f.Key;
    f.Key.Q = ["Q", 16];
    f.Key.Q.toString = q;
    f.Key.Q.__enum__ = f.Key;
    f.Key.R = ["R", 17];
    f.Key.R.toString =
        q;
    f.Key.R.__enum__ = f.Key;
    f.Key.S = ["S", 18];
    f.Key.S.toString = q;
    f.Key.S.__enum__ = f.Key;
    f.Key.T = ["T", 19];
    f.Key.T.toString = q;
    f.Key.T.__enum__ = f.Key;
    f.Key.U = ["U", 20];
    f.Key.U.toString = q;
    f.Key.U.__enum__ = f.Key;
    f.Key.V = ["V", 21];
    f.Key.V.toString = q;
    f.Key.V.__enum__ = f.Key;
    f.Key.W = ["W", 22];
    f.Key.W.toString = q;
    f.Key.W.__enum__ = f.Key;
    f.Key.X = ["X", 23];
    f.Key.X.toString = q;
    f.Key.X.__enum__ = f.Key;
    f.Key.Y = ["Y", 24];
    f.Key.Y.toString = q;
    f.Key.Y.__enum__ = f.Key;
    f.Key.Z = ["Z", 25];
    f.Key.Z.toString = q;
    f.Key.Z.__enum__ = f.Key;
    f.Key.Number0 = ["Number0", 26];
    f.Key.Number0.toString = q;
    f.Key.Number0.__enum__ = f.Key;
    f.Key.Number1 = ["Number1", 27];
    f.Key.Number1.toString = q;
    f.Key.Number1.__enum__ = f.Key;
    f.Key.Number2 = ["Number2", 28];
    f.Key.Number2.toString = q;
    f.Key.Number2.__enum__ = f.Key;
    f.Key.Number3 = ["Number3", 29];
    f.Key.Number3.toString = q;
    f.Key.Number3.__enum__ = f.Key;
    f.Key.Number4 = ["Number4", 30];
    f.Key.Number4.toString = q;
    f.Key.Number4.__enum__ = f.Key;
    f.Key.Number5 = ["Number5", 31];
    f.Key.Number5.toString = q;
    f.Key.Number5.__enum__ = f.Key;
    f.Key.Number6 = ["Number6",
        32
    ];
    f.Key.Number6.toString = q;
    f.Key.Number6.__enum__ = f.Key;
    f.Key.Number7 = ["Number7", 33];
    f.Key.Number7.toString = q;
    f.Key.Number7.__enum__ = f.Key;
    f.Key.Number8 = ["Number8", 34];
    f.Key.Number8.toString = q;
    f.Key.Number8.__enum__ = f.Key;
    f.Key.Number9 = ["Number9", 35];
    f.Key.Number9.toString = q;
    f.Key.Number9.__enum__ = f.Key;
    f.Key.Numpad0 = ["Numpad0", 36];
    f.Key.Numpad0.toString = q;
    f.Key.Numpad0.__enum__ = f.Key;
    f.Key.Numpad1 = ["Numpad1", 37];
    f.Key.Numpad1.toString = q;
    f.Key.Numpad1.__enum__ = f.Key;
    f.Key.Numpad2 = ["Numpad2", 38];
    f.Key.Numpad2.toString = q;
    f.Key.Numpad2.__enum__ = f.Key;
    f.Key.Numpad3 = ["Numpad3", 39];
    f.Key.Numpad3.toString = q;
    f.Key.Numpad3.__enum__ = f.Key;
    f.Key.Numpad4 = ["Numpad4", 40];
    f.Key.Numpad4.toString = q;
    f.Key.Numpad4.__enum__ = f.Key;
    f.Key.Numpad5 = ["Numpad5", 41];
    f.Key.Numpad5.toString = q;
    f.Key.Numpad5.__enum__ = f.Key;
    f.Key.Numpad6 = ["Numpad6", 42];
    f.Key.Numpad6.toString = q;
    f.Key.Numpad6.__enum__ = f.Key;
    f.Key.Numpad7 = ["Numpad7", 43];
    f.Key.Numpad7.toString = q;
    f.Key.Numpad7.__enum__ = f.Key;
    f.Key.Numpad8 = ["Numpad8", 44];
    f.Key.Numpad8.toString =
        q;
    f.Key.Numpad8.__enum__ = f.Key;
    f.Key.Numpad9 = ["Numpad9", 45];
    f.Key.Numpad9.toString = q;
    f.Key.Numpad9.__enum__ = f.Key;
    f.Key.NumpadAdd = ["NumpadAdd", 46];
    f.Key.NumpadAdd.toString = q;
    f.Key.NumpadAdd.__enum__ = f.Key;
    f.Key.NumpadDecimal = ["NumpadDecimal", 47];
    f.Key.NumpadDecimal.toString = q;
    f.Key.NumpadDecimal.__enum__ = f.Key;
    f.Key.NumpadDivide = ["NumpadDivide", 48];
    f.Key.NumpadDivide.toString = q;
    f.Key.NumpadDivide.__enum__ = f.Key;
    f.Key.NumpadEnter = ["NumpadEnter", 49];
    f.Key.NumpadEnter.toString = q;
    f.Key.NumpadEnter.__enum__ =
        f.Key;
    f.Key.NumpadMultiply = ["NumpadMultiply", 50];
    f.Key.NumpadMultiply.toString = q;
    f.Key.NumpadMultiply.__enum__ = f.Key;
    f.Key.NumpadSubtract = ["NumpadSubtract", 51];
    f.Key.NumpadSubtract.toString = q;
    f.Key.NumpadSubtract.__enum__ = f.Key;
    f.Key.F1 = ["F1", 52];
    f.Key.F1.toString = q;
    f.Key.F1.__enum__ = f.Key;
    f.Key.F2 = ["F2", 53];
    f.Key.F2.toString = q;
    f.Key.F2.__enum__ = f.Key;
    f.Key.F3 = ["F3", 54];
    f.Key.F3.toString = q;
    f.Key.F3.__enum__ = f.Key;
    f.Key.F4 = ["F4", 55];
    f.Key.F4.toString = q;
    f.Key.F4.__enum__ = f.Key;
    f.Key.F5 = ["F5", 56];
    f.Key.F5.toString =
        q;
    f.Key.F5.__enum__ = f.Key;
    f.Key.F6 = ["F6", 57];
    f.Key.F6.toString = q;
    f.Key.F6.__enum__ = f.Key;
    f.Key.F7 = ["F7", 58];
    f.Key.F7.toString = q;
    f.Key.F7.__enum__ = f.Key;
    f.Key.F8 = ["F8", 59];
    f.Key.F8.toString = q;
    f.Key.F8.__enum__ = f.Key;
    f.Key.F9 = ["F9", 60];
    f.Key.F9.toString = q;
    f.Key.F9.__enum__ = f.Key;
    f.Key.F10 = ["F10", 61];
    f.Key.F10.toString = q;
    f.Key.F10.__enum__ = f.Key;
    f.Key.F11 = ["F11", 62];
    f.Key.F11.toString = q;
    f.Key.F11.__enum__ = f.Key;
    f.Key.F12 = ["F12", 63];
    f.Key.F12.toString = q;
    f.Key.F12.__enum__ = f.Key;
    f.Key.F13 = ["F13", 64];
    f.Key.F13.toString =
        q;
    f.Key.F13.__enum__ = f.Key;
    f.Key.F14 = ["F14", 65];
    f.Key.F14.toString = q;
    f.Key.F14.__enum__ = f.Key;
    f.Key.F15 = ["F15", 66];
    f.Key.F15.toString = q;
    f.Key.F15.__enum__ = f.Key;
    f.Key.Left = ["Left", 67];
    f.Key.Left.toString = q;
    f.Key.Left.__enum__ = f.Key;
    f.Key.Up = ["Up", 68];
    f.Key.Up.toString = q;
    f.Key.Up.__enum__ = f.Key;
    f.Key.Right = ["Right", 69];
    f.Key.Right.toString = q;
    f.Key.Right.__enum__ = f.Key;
    f.Key.Down = ["Down", 70];
    f.Key.Down.toString = q;
    f.Key.Down.__enum__ = f.Key;
    f.Key.Alt = ["Alt", 71];
    f.Key.Alt.toString = q;
    f.Key.Alt.__enum__ =
        f.Key;
    f.Key.Backquote = ["Backquote", 72];
    f.Key.Backquote.toString = q;
    f.Key.Backquote.__enum__ = f.Key;
    f.Key.Backslash = ["Backslash", 73];
    f.Key.Backslash.toString = q;
    f.Key.Backslash.__enum__ = f.Key;
    f.Key.Backspace = ["Backspace", 74];
    f.Key.Backspace.toString = q;
    f.Key.Backspace.__enum__ = f.Key;
    f.Key.CapsLock = ["CapsLock", 75];
    f.Key.CapsLock.toString = q;
    f.Key.CapsLock.__enum__ = f.Key;
    f.Key.Comma = ["Comma", 76];
    f.Key.Comma.toString = q;
    f.Key.Comma.__enum__ = f.Key;
    f.Key.Command = ["Command", 77];
    f.Key.Command.toString = q;
    f.Key.Command.__enum__ =
        f.Key;
    f.Key.Control = ["Control", 78];
    f.Key.Control.toString = q;
    f.Key.Control.__enum__ = f.Key;
    f.Key.Delete = ["Delete", 79];
    f.Key.Delete.toString = q;
    f.Key.Delete.__enum__ = f.Key;
    f.Key.End = ["End", 80];
    f.Key.End.toString = q;
    f.Key.End.__enum__ = f.Key;
    f.Key.Enter = ["Enter", 81];
    f.Key.Enter.toString = q;
    f.Key.Enter.__enum__ = f.Key;
    f.Key.Equals = ["Equals", 82];
    f.Key.Equals.toString = q;
    f.Key.Equals.__enum__ = f.Key;
    f.Key.Escape = ["Escape", 83];
    f.Key.Escape.toString = q;
    f.Key.Escape.__enum__ = f.Key;
    f.Key.Home = ["Home", 84];
    f.Key.Home.toString =
        q;
    f.Key.Home.__enum__ = f.Key;
    f.Key.Insert = ["Insert", 85];
    f.Key.Insert.toString = q;
    f.Key.Insert.__enum__ = f.Key;
    f.Key.LeftBracket = ["LeftBracket", 86];
    f.Key.LeftBracket.toString = q;
    f.Key.LeftBracket.__enum__ = f.Key;
    f.Key.Minus = ["Minus", 87];
    f.Key.Minus.toString = q;
    f.Key.Minus.__enum__ = f.Key;
    f.Key.PageDown = ["PageDown", 88];
    f.Key.PageDown.toString = q;
    f.Key.PageDown.__enum__ = f.Key;
    f.Key.PageUp = ["PageUp", 89];
    f.Key.PageUp.toString = q;
    f.Key.PageUp.__enum__ = f.Key;
    f.Key.Period = ["Period", 90];
    f.Key.Period.toString = q;
    f.Key.Period.__enum__ =
        f.Key;
    f.Key.Quote = ["Quote", 91];
    f.Key.Quote.toString = q;
    f.Key.Quote.__enum__ = f.Key;
    f.Key.RightBracket = ["RightBracket", 92];
    f.Key.RightBracket.toString = q;
    f.Key.RightBracket.__enum__ = f.Key;
    f.Key.Semicolon = ["Semicolon", 93];
    f.Key.Semicolon.toString = q;
    f.Key.Semicolon.__enum__ = f.Key;
    f.Key.Shift = ["Shift", 94];
    f.Key.Shift.toString = q;
    f.Key.Shift.__enum__ = f.Key;
    f.Key.Slash = ["Slash", 95];
    f.Key.Slash.toString = q;
    f.Key.Slash.__enum__ = f.Key;
    f.Key.Space = ["Space", 96];
    f.Key.Space.toString = q;
    f.Key.Space.__enum__ = f.Key;
    f.Key.Tab = ["Tab", 97];
    f.Key.Tab.toString = q;
    f.Key.Tab.__enum__ = f.Key;
    f.Key.Menu = ["Menu", 98];
    f.Key.Menu.toString = q;
    f.Key.Menu.__enum__ = f.Key;
    f.Key.Search = ["Search", 99];
    f.Key.Search.toString = q;
    f.Key.Search.__enum__ = f.Key;
    f.Key.Unknown = function(a) {
        a = ["Unknown", 100, a];
        a.__enum__ = f.Key;
        a.toString = q;
        return a
    };
    f.Keyboard = function() {};
    k["flambe.input.Keyboard"] = f.Keyboard;
    f.Keyboard.__name__ = ["flambe", "input", "Keyboard"];
    f.Keyboard.prototype = {
        __class__: f.Keyboard,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    f.KeyboardEvent =
        function() {
            this._internal_init(0, null)
        };
    k["flambe.input.KeyboardEvent"] = f.KeyboardEvent;
    f.KeyboardEvent.__name__ = ["flambe", "input", "KeyboardEvent"];
    f.KeyboardEvent.prototype = {
        _internal_init: function(a, b) {
            this.id = a;
            this.key = b
        },
        __class__: f.KeyboardEvent
    };
    f.Mouse = function() {};
    k["flambe.input.Mouse"] = f.Mouse;
    f.Mouse.__name__ = ["flambe", "input", "Mouse"];
    f.Mouse.prototype = {
        __class__: f.Mouse,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y",
            set_cursor: "set_cursor",
            get_cursor: "get_cursor"
        }
    };
    f.MouseButton = k["flambe.input.MouseButton"] = {
        __ename__: ["flambe", "input", "MouseButton"],
        __constructs__: ["Left", "Middle", "Right", "Unknown"]
    };
    f.MouseButton.Left = ["Left", 0];
    f.MouseButton.Left.toString = q;
    f.MouseButton.Left.__enum__ = f.MouseButton;
    f.MouseButton.Middle = ["Middle", 1];
    f.MouseButton.Middle.toString = q;
    f.MouseButton.Middle.__enum__ = f.MouseButton;
    f.MouseButton.Right = ["Right", 2];
    f.MouseButton.Right.toString = q;
    f.MouseButton.Right.__enum__ = f.MouseButton;
    f.MouseButton.Unknown = function(a) {
        a = ["Unknown",
            3, a
        ];
        a.__enum__ = f.MouseButton;
        a.toString = q;
        return a
    };
    f.MouseCursor = k["flambe.input.MouseCursor"] = {
        __ename__: ["flambe", "input", "MouseCursor"],
        __constructs__: ["Default", "Button", "None"]
    };
    f.MouseCursor.Default = ["Default", 0];
    f.MouseCursor.Default.toString = q;
    f.MouseCursor.Default.__enum__ = f.MouseCursor;
    f.MouseCursor.Button = ["Button", 1];
    f.MouseCursor.Button.toString = q;
    f.MouseCursor.Button.__enum__ = f.MouseCursor;
    f.MouseCursor.None = ["None", 2];
    f.MouseCursor.None.toString = q;
    f.MouseCursor.None.__enum__ = f.MouseCursor;
    f.MouseEvent = function() {
        this._internal_init(0, 0, 0, null)
    };
    k["flambe.input.MouseEvent"] = f.MouseEvent;
    f.MouseEvent.__name__ = ["flambe", "input", "MouseEvent"];
    f.MouseEvent.prototype = {
        _internal_init: function(a, b, d, c) {
            this.id = a;
            this.viewX = b;
            this.viewY = d;
            this.button = c
        },
        __class__: f.MouseEvent
    };
    f.Pointer = function() {};
    k["flambe.input.Pointer"] = f.Pointer;
    f.Pointer.__name__ = ["flambe", "input", "Pointer"];
    f.Pointer.prototype = {
        __class__: f.Pointer,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y"
        }
    };
    f.EventSource = k["flambe.input.EventSource"] = {
        __ename__: ["flambe", "input", "EventSource"],
        __constructs__: ["Mouse", "Touch"]
    };
    f.EventSource.Mouse = function(a) {
        a = ["Mouse", 0, a];
        a.__enum__ = f.EventSource;
        a.toString = q;
        return a
    };
    f.EventSource.Touch = function(a) {
        a = ["Touch", 1, a];
        a.__enum__ = f.EventSource;
        a.toString = q;
        return a
    };
    f.PointerEvent = function() {
        this._internal_init(0, 0, 0, null, null)
    };
    k["flambe.input.PointerEvent"] = f.PointerEvent;
    f.PointerEvent.__name__ = ["flambe", "input", "PointerEvent"];
    f.PointerEvent.prototype = {
        _internal_init: function(a, b, d, c, e) {
            this.id = a;
            this.viewX = b;
            this.viewY = d;
            this.hit = c;
            this.source = e;
            this._internal_stopped = !1
        },
        __class__: f.PointerEvent
    };
    f.Touch = function() {};
    k["flambe.input.Touch"] = f.Touch;
    f.Touch.__name__ = ["flambe", "input", "Touch"];
    f.Touch.prototype = {
        __class__: f.Touch,
        __properties__: {
            get_supported: "get_supported",
            get_maxPoints: "get_maxPoints",
            get_points: "get_points"
        }
    };
    f.TouchPoint = function(a) {
        this.id = a;
        this._internal_source = f.EventSource.Touch(this)
    };
    k["flambe.input.TouchPoint"] = f.TouchPoint;
    f.TouchPoint.__name__ = ["flambe", "input", "TouchPoint"];
    f.TouchPoint.prototype = {
        _internal_init: function(a, b) {
            this.viewX = a;
            this.viewY = b
        },
        __class__: f.TouchPoint
    };
    J.FMath = function() {};
    k["flambe.math.FMath"] = J.FMath;
    J.FMath.__name__ = ["flambe", "math", "FMath"];
    J.FMath.max = function(a, b) {
        return a > b ? a : b
    };
    J.FMath.clamp = function(a, b, d) {
        return a < b ? b : a > d ? d : a
    };
    J.Matrix = function() {
        this.identity()
    };
    k["flambe.math.Matrix"] = J.Matrix;
    J.Matrix.__name__ = ["flambe", "math", "Matrix"];
    J.Matrix.prototype = {
        inverseTransform: function(a,
            b, d) {
            var c = this.determinant();
            if (0 == c) return !1;
            a -= this.m02;
            b -= this.m12;
            d.x = (a * this.m11 - b * this.m01) / c;
            d.y = (b * this.m00 - a * this.m10) / c;
            return !0
        },
        determinant: function() {
            return this.m00 * this.m11 - this.m01 * this.m10
        },
        translate: function(a, b) {
            this.m02 += this.m00 * a + this.m01 * b;
            this.m12 += this.m11 * b + this.m10 * a
        },
        compose: function(a, b, d, c, e) {
            var f = Math.sin(e),
                e = Math.cos(e);
            this.set(e * d, f * d, -f * c, e * c, a, b)
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        set: function(a, b, d, c, e, f) {
            this.m00 = a;
            this.m01 = d;
            this.m02 = e;
            this.m10 = b;
            this.m11 = c;
            this.m12 = f
        },
        __class__: J.Matrix
    };
    J.Rectangle = function(a, b, d, c) {
        null == c && (c = 0);
        null == d && (d = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.set(a, b, d, c)
    };
    k["flambe.math.Rectangle"] = J.Rectangle;
    J.Rectangle.__name__ = ["flambe", "math", "Rectangle"];
    J.Rectangle.prototype = {
        contains: function(a, b) {
            a -= this.x;
            b -= this.y;
            return 0 <= a && 0 <= b && a <= this.width && b <= this.height
        },
        set: function(a, b, d, c) {
            this.x = a;
            this.y = b;
            this.width = d;
            this.height = c
        },
        __class__: J.Rectangle
    };
    i.BasicAssetPackLoader = function(a, b) {
        this._platform =
            a;
        this.promise = new o.Promise;
        this._bytesLoaded = new G;
        this._pack = new i._BasicAssetPackLoader.BasicAssetPack(b);
        var d = ba.array(b);
        if (0 == d.length) this.handleSuccess();
        else {
            for (var c = 0, e = new G, f = 0; f < d.length;) {
                var g = d[f];
                ++f;
                var h = e.get(g.name);
                null == h && (h = [], e.set(g.name, h));
                h.push(g)
            }
            this._assetsRemaining = ba.count(e);
            for (d = e.iterator(); d.hasNext();)
                if (h = d.next(), h = 1 < h.length ? this.pickBestEntry(h) : h[0], e = this.createPlaceholder(h), null != e) K.logger.warn("Using an asset placeholder", ["name", h.name, "type",
                    h.type
                ]), this.handleLoad(h, e);
                else {
                    c += h.bytes;
                    e = b.getFullURL(h);
                    try {
                        this.loadEntry(e, h)
                    } catch (j) {
                        this.handleError(h, "Unexpected error: " + s.string(j))
                    }
                }
            this.promise.set_total(c)
        }
    };
    k["flambe.platform.BasicAssetPackLoader"] = i.BasicAssetPackLoader;
    i.BasicAssetPackLoader.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
    i.BasicAssetPackLoader.prototype = {
        handleTextureError: function(a) {
            this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
        },
        handleError: function(a, b) {
            K.logger.warn("Error loading asset pack", ["error", b, "url", a.url]);
            this.promise.error.emit1(o.Strings.withFields(b, ["url", a.url]))
        },
        handleSuccess: function() {
            this.promise.set_result(this._pack)
        },
        handleProgress: function(a, b) {
            this._bytesLoaded.set(a.name, b);
            for (var d = 0, c = this._bytesLoaded.iterator(); c.hasNext();) var e = c.next(),
                d = d + e;
            this.promise.set_progress(d)
        },
        handleLoad: function(a, b) {
            this.handleProgress(a, a.bytes);
            var d = a.name;
            switch (a.type[1]) {
                case 0:
                    this._pack.textures.set(d, b);
                    break;
                case 1:
                    this._pack.sounds.set(d, b);
                    break;
                case 2:
                    this._pack.files.set(d,
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
                    if (!ba.has(this.getAudioFormats(), a.getUrlExtension())) return i.DummySound.getInstance()
            }
            return null
        },
        pickBestEntry: function(a) {
            switch (a[0].type[1]) {
                case 1:
                    for (var b = this.getAudioFormats(), d = 0; d < b.length;) {
                        var c = b[d];
                        ++d;
                        for (var e = 0; e < a.length;) {
                            var f = a[e];
                            ++e;
                            if (f.getUrlExtension() == c) return f
                        }
                    }
            }
            return a[0]
        },
        __class__: i.BasicAssetPackLoader
    };
    i._BasicAssetPackLoader = {};
    i._BasicAssetPackLoader.BasicAssetPack = function(a) {
        this._manifest = a;
        this.textures = new G;
        this.sounds = new G;
        this.files = new G
    };
    k["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = i._BasicAssetPackLoader.BasicAssetPack;
    i._BasicAssetPackLoader.BasicAssetPack.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
    i._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [C.AssetPack];
    i._BasicAssetPackLoader.BasicAssetPack.prototype = {
        get_manifest: function() {
            return this._manifest
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            var d = this.files.get(a);
            if (null == d && b) throw o.Strings.withFields("Missing file", ["name", a]);
            return d
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            var d = this.sounds.get(a);
            if (null == d && b) throw o.Strings.withFields("Missing sound", ["name", a]);
            return d
        },
        getTexture: function(a, b) {
            null == b && (b = !0);
            var d = this.textures.get(a);
            if (null == d && b) throw o.Strings.withFields("Missing texture", ["name", a]);
            return d
        },
        __class__: i._BasicAssetPackLoader.BasicAssetPack,
        __properties__: {
            get_manifest: "get_manifest"
        }
    };
    i.BasicKeyboard = function() {
        this.down = new o.Signal1;
        this.up = new o.Signal1;
        this.backButton = new o.Signal0;
        this._keyStates = new W
    };
    k["flambe.platform.BasicKeyboard"] = i.BasicKeyboard;
    i.BasicKeyboard.__name__ = ["flambe", "platform", "BasicKeyboard"];
    i.BasicKeyboard.__interfaces__ = [f.Keyboard];
    i.BasicKeyboard.prototype = {
        submitUp: function(a) {
            this._keyStates.exists(a) && (this._keyStates.remove(a), i.BasicKeyboard._sharedEvent._internal_init(i.BasicKeyboard._sharedEvent.id +
                1, i.KeyCodes.toKey(a)), this.up.emit1(i.BasicKeyboard._sharedEvent))
        },
        submitDown: function(a) {
            if (16777238 == a) return null != this.backButton._head ? (this.backButton.emit0(), !0) : !1;
            this._keyStates.exists(a) || (this._keyStates.set(a, !0), i.BasicKeyboard._sharedEvent._internal_init(i.BasicKeyboard._sharedEvent.id + 1, i.KeyCodes.toKey(a)), this.down.emit1(i.BasicKeyboard._sharedEvent));
            return !0
        },
        isDown: function(a) {
            return this._keyStates.exists(i.KeyCodes.toKeyCode(a))
        },
        get_supported: function() {
            return !0
        },
        __class__: i.BasicKeyboard,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    i.BasicMouse = function(a) {
        this._pointer = a;
        this._source = f.EventSource.Mouse(i.BasicMouse._sharedEvent);
        this.down = new o.Signal1;
        this.move = new o.Signal1;
        this.up = new o.Signal1;
        this.scroll = new o.Signal1;
        this._y = this._x = 0;
        this._cursor = f.MouseCursor.Default;
        this._buttonStates = new W
    };
    k["flambe.platform.BasicMouse"] = i.BasicMouse;
    i.BasicMouse.__name__ = ["flambe", "platform", "BasicMouse"];
    i.BasicMouse.__interfaces__ = [f.Mouse];
    i.BasicMouse.prototype = {
        prepare: function(a,
            b, d) {
            this._x = a;
            this._y = b;
            i.BasicMouse._sharedEvent._internal_init(i.BasicMouse._sharedEvent.id + 1, a, b, d)
        },
        submitScroll: function(a, b, d) {
            this._x = a;
            this._y = b;
            if (null == this.scroll._head) return !1;
            this.scroll.emit1(d);
            return !0
        },
        submitUp: function(a, b, d) {
            this._buttonStates.exists(d) && (this._buttonStates.remove(d), this.prepare(a, b, i.MouseCodes.toButton(d)), this._pointer.submitUp(a, b, this._source), this.up.emit1(i.BasicMouse._sharedEvent))
        },
        submitMove: function(a, b) {
            this.prepare(a, b, null);
            this._pointer.submitMove(a,
                b, this._source);
            this.move.emit1(i.BasicMouse._sharedEvent)
        },
        submitDown: function(a, b, d) {
            this._buttonStates.exists(d) || (this._buttonStates.set(d, !0), this.prepare(a, b, i.MouseCodes.toButton(d)), this._pointer.submitDown(a, b, this._source), this.down.emit1(i.BasicMouse._sharedEvent))
        },
        isDown: function(a) {
            return this._buttonStates.exists(i.MouseCodes.toButtonCode(a))
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
        __class__: i.BasicMouse,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y",
            set_cursor: "set_cursor",
            get_cursor: "get_cursor"
        }
    };
    i.BasicPointer = function(a, b, d) {
        null == d && (d = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        this.down = new o.Signal1;
        this.move = new o.Signal1;
        this.up = new o.Signal1;
        this._x = a;
        this._y = b;
        this._isDown = d
    };
    k["flambe.platform.BasicPointer"] = i.BasicPointer;
    i.BasicPointer.__name__ = ["flambe", "platform", "BasicPointer"];
    i.BasicPointer.__interfaces__ = [f.Pointer];
    i.BasicPointer.prototype = {
        prepare: function(a, b, d, c) {
            this._x = a;
            this._y = b;
            i.BasicPointer._sharedEvent._internal_init(i.BasicPointer._sharedEvent.id + 1, a, b, d, c)
        },
        submitUp: function(a, b, d) {
            if (this._isDown) {
                this._isDown = !1;
                var c = [],
                    e = p.Sprite.hitTest(A.root, a, b);
                if (null != e) {
                    var f = e.owner;
                    do {
                        var g = f._compMap.Sprite_1;
                        null != g && c.push(g);
                        f = f.parent
                    } while (null != f)
                }
                this.prepare(a, b, e, d);
                for (a = 0; a < c.length;)
                    if (g = c[a], ++a, g = g._internal_pointerUp, null != g && (g.emit1(i.BasicPointer._sharedEvent), i.BasicPointer._sharedEvent._internal_stopped)) return;
                this.up.emit1(i.BasicPointer._sharedEvent)
            }
        },
        submitMove: function(a, b, d) {
            var c = [],
                e = p.Sprite.hitTest(A.root, a, b);
            if (null != e) {
                var f = e.owner;
                do {
                    var g = f._compMap.Sprite_1;
                    null != g && c.push(g);
                    f = f.parent
                } while (null != f)
            }
            this.prepare(a, b, e, d);
            for (a = 0; a < c.length;)
                if (g = c[a], ++a, g = g._internal_pointerMove, null != g && (g.emit1(i.BasicPointer._sharedEvent), i.BasicPointer._sharedEvent._internal_stopped)) return;
            this.move.emit1(i.BasicPointer._sharedEvent)
        },
        submitDown: function(a, b, d) {
            if (!this._isDown) {
                this._isDown = !0;
                var c = [],
                    e = p.Sprite.hitTest(A.root, a, b);
                if (null != e) {
                    var f = e.owner;
                    do {
                        var g = f._compMap.Sprite_1;
                        null != g && c.push(g);
                        f = f.parent
                    } while (null != f)
                }
                this.prepare(a, b, e, d);
                for (a = 0; a < c.length;)
                    if (g = c[a], ++a, g = g._internal_pointerDown, null != g && (g.emit1(i.BasicPointer._sharedEvent), i.BasicPointer._sharedEvent._internal_stopped)) return;
                this.down.emit1(i.BasicPointer._sharedEvent)
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
        __class__: i.BasicPointer,
        __properties__: {
            get_supported: "get_supported",
            get_x: "get_x",
            get_y: "get_y"
        }
    };
    i.BasicTouch = function(a, b) {
        null == b && (b = 4);
        this._pointer = a;
        this._maxPoints = b;
        this._pointMap = new W;
        this._points = [];
        this.down = new o.Signal1;
        this.move = new o.Signal1;
        this.up = new o.Signal1
    };
    k["flambe.platform.BasicTouch"] = i.BasicTouch;
    i.BasicTouch.__name__ = ["flambe", "platform", "BasicTouch"];
    i.BasicTouch.__interfaces__ = [f.Touch];
    i.BasicTouch.prototype = {
        submitUp: function(a, b, d) {
            var c = this._pointMap.get(a);
            null != c && (c._internal_init(b, d), this._pointMap.remove(a), B.remove(this._points, c), this._pointerTouch == c && (this._pointerTouch = null, this._pointer.submitUp(b, d, c._internal_source)), this.up.emit1(c))
        },
        submitMove: function(a, b, d) {
            a = this._pointMap.get(a);
            null != a && (a._internal_init(b, d), this._pointerTouch == a && this._pointer.submitMove(b, d, a._internal_source), this.move.emit1(a))
        },
        submitDown: function(a, b, d) {
            if (!this._pointMap.exists(a)) {
                var c = new f.TouchPoint(a);
                c._internal_init(b, d);
                this._pointMap.set(a, c);
                this._points.push(c);
                null == this._pointerTouch && (this._pointerTouch = c, this._pointer.submitDown(b, d, c._internal_source));
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
        __class__: i.BasicTouch,
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
    i.DummySound = function() {
        this._playback = new i.DummyPlayback(this)
    };
    k["flambe.platform.DummySound"] = i.DummySound;
    i.DummySound.__name__ = ["flambe", "platform", "DummySound"];
    i.DummySound.__interfaces__ = [H.Sound];
    i.DummySound.getInstance = function() {
        null == i.DummySound._instance && (i.DummySound._instance = new i.DummySound);
        return i.DummySound._instance
    };
    i.DummySound.prototype = {
        get_duration: function() {
            return 0
        },
        loop: function() {
            return this._playback
        },
        play: function() {
            return this._playback
        },
        __class__: i.DummySound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    H.Playback = function() {};
    k["flambe.sound.Playback"] = H.Playback;
    H.Playback.__name__ = ["flambe", "sound", "Playback"];
    H.Playback.__interfaces__ = [o.Disposable];
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
    i.DummyPlayback = function(a) {
        this._sound =
            a;
        this.volume = new F.AnimatedFloat(0)
    };
    k["flambe.platform.DummyPlayback"] = i.DummyPlayback;
    i.DummyPlayback.__name__ = ["flambe", "platform", "DummyPlayback"];
    i.DummyPlayback.__interfaces__ = [H.Playback];
    i.DummyPlayback.prototype = {
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
        __class__: i.DummyPlayback,
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
    i.DummyStorage = function() {
        this.clear()
    };
    k["flambe.platform.DummyStorage"] = i.DummyStorage;
    i.DummyStorage.__name__ = ["flambe", "platform", "DummyStorage"];
    i.DummyStorage.__interfaces__ = [aa.Storage];
    i.DummyStorage.prototype = {
        clear: function() {
            this._hash = new G
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
        __class__: i.DummyStorage,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    i.DummyTouch = function() {
        this.down = new o.Signal1;
        this.move = new o.Signal1;
        this.up = new o.Signal1
    };
    k["flambe.platform.DummyTouch"] = i.DummyTouch;
    i.DummyTouch.__name__ = ["flambe",
        "platform", "DummyTouch"
    ];
    i.DummyTouch.__interfaces__ = [f.Touch];
    i.DummyTouch.prototype = {
        get_points: function() {
            return []
        },
        get_maxPoints: function() {
            return 0
        },
        get_supported: function() {
            return !1
        },
        __class__: i.DummyTouch,
        __properties__: {
            get_supported: "get_supported",
            get_maxPoints: "get_maxPoints",
            get_points: "get_points"
        }
    };
    i.EventGroup = function() {
        this._entries = []
    };
    k["flambe.platform.EventGroup"] = i.EventGroup;
    i.EventGroup.__name__ = ["flambe", "platform", "EventGroup"];
    i.EventGroup.__interfaces__ = [o.Disposable];
    i.EventGroup.prototype = {
        dispose: function() {
            for (var a = 0, b = this._entries; a < b.length;) {
                var d = b[a];
                ++a;
                d.dispatcher.removeEventListener(d.type, d.listener, !1)
            }
            this._entries = []
        },
        addDisposingListener: function(a, b, d) {
            var c = this;
            this.addListener(a, b, function(a) {
                c.dispose();
                d(a)
            })
        },
        addListener: function(a, b, d) {
            a.addEventListener(b, d, !1);
            this._entries.push(new i._EventGroup.Entry(a, b, d))
        },
        __class__: i.EventGroup
    };
    i._EventGroup = {};
    i._EventGroup.Entry = function(a, b, d) {
        this.dispatcher = a;
        this.type = b;
        this.listener =
            d
    };
    k["flambe.platform._EventGroup.Entry"] = i._EventGroup.Entry;
    i._EventGroup.Entry.__name__ = ["flambe", "platform", "_EventGroup", "Entry"];
    i._EventGroup.Entry.prototype = {
        __class__: i._EventGroup.Entry
    };
    i.KeyCodes = function() {};
    k["flambe.platform.KeyCodes"] = i.KeyCodes;
    i.KeyCodes.__name__ = ["flambe", "platform", "KeyCodes"];
    i.KeyCodes.toKey = function(a) {
        switch (a) {
            case 65:
                return f.Key.A;
            case 66:
                return f.Key.B;
            case 67:
                return f.Key.C;
            case 68:
                return f.Key.D;
            case 69:
                return f.Key.E;
            case 70:
                return f.Key.F;
            case 71:
                return f.Key.G;
            case 72:
                return f.Key.H;
            case 73:
                return f.Key.I;
            case 74:
                return f.Key.J;
            case 75:
                return f.Key.K;
            case 76:
                return f.Key.L;
            case 77:
                return f.Key.M;
            case 78:
                return f.Key.N;
            case 79:
                return f.Key.O;
            case 80:
                return f.Key.P;
            case 81:
                return f.Key.Q;
            case 82:
                return f.Key.R;
            case 83:
                return f.Key.S;
            case 84:
                return f.Key.T;
            case 85:
                return f.Key.U;
            case 86:
                return f.Key.V;
            case 87:
                return f.Key.W;
            case 88:
                return f.Key.X;
            case 89:
                return f.Key.Y;
            case 90:
                return f.Key.Z;
            case 48:
                return f.Key.Number0;
            case 49:
                return f.Key.Number1;
            case 50:
                return f.Key.Number2;
            case 51:
                return f.Key.Number3;
            case 52:
                return f.Key.Number4;
            case 53:
                return f.Key.Number5;
            case 54:
                return f.Key.Number6;
            case 55:
                return f.Key.Number7;
            case 56:
                return f.Key.Number8;
            case 57:
                return f.Key.Number9;
            case 96:
                return f.Key.Numpad0;
            case 97:
                return f.Key.Numpad1;
            case 98:
                return f.Key.Numpad2;
            case 99:
                return f.Key.Numpad3;
            case 100:
                return f.Key.Numpad4;
            case 101:
                return f.Key.Numpad5;
            case 102:
                return f.Key.Numpad6;
            case 103:
                return f.Key.Numpad7;
            case 104:
                return f.Key.Numpad8;
            case 105:
                return f.Key.Numpad9;
            case 107:
                return f.Key.NumpadAdd;
            case 110:
                return f.Key.NumpadDecimal;
            case 111:
                return f.Key.NumpadDivide;
            case 108:
                return f.Key.NumpadEnter;
            case 106:
                return f.Key.NumpadMultiply;
            case 109:
                return f.Key.NumpadSubtract;
            case 112:
                return f.Key.F1;
            case 113:
                return f.Key.F2;
            case 114:
                return f.Key.F3;
            case 115:
                return f.Key.F4;
            case 116:
                return f.Key.F5;
            case 117:
                return f.Key.F6;
            case 118:
                return f.Key.F7;
            case 119:
                return f.Key.F8;
            case 120:
                return f.Key.F9;
            case 121:
                return f.Key.F10;
            case 122:
                return f.Key.F11;
            case 123:
                return f.Key.F12;
            case 37:
                return f.Key.Left;
            case 38:
                return f.Key.Up;
            case 39:
                return f.Key.Right;
            case 40:
                return f.Key.Down;
            case 18:
                return f.Key.Alt;
            case 192:
                return f.Key.Backquote;
            case 220:
                return f.Key.Backslash;
            case 8:
                return f.Key.Backspace;
            case 20:
                return f.Key.CapsLock;
            case 188:
                return f.Key.Comma;
            case 15:
                return f.Key.Command;
            case 17:
                return f.Key.Control;
            case 46:
                return f.Key.Delete;
            case 35:
                return f.Key.End;
            case 13:
                return f.Key.Enter;
            case 187:
                return f.Key.Equals;
            case 27:
                return f.Key.Escape;
            case 36:
                return f.Key.Home;
            case 45:
                return f.Key.Insert;
            case 219:
                return f.Key.LeftBracket;
            case 189:
                return f.Key.Minus;
            case 34:
                return f.Key.PageDown;
            case 33:
                return f.Key.PageUp;
            case 190:
                return f.Key.Period;
            case 222:
                return f.Key.Quote;
            case 221:
                return f.Key.RightBracket;
            case 186:
                return f.Key.Semicolon;
            case 16:
                return f.Key.Shift;
            case 191:
                return f.Key.Slash;
            case 32:
                return f.Key.Space;
            case 9:
                return f.Key.Tab;
            case 16777234:
                return f.Key.Menu;
            case 16777247:
                return f.Key.Search
        }
        return f.Key.Unknown(a)
    };
    i.KeyCodes.toKeyCode = function(a) {
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
    i.MainLoop = function() {
        this._tickables = []
    };
    k["flambe.platform.MainLoop"] = i.MainLoop;
    i.MainLoop.__name__ = ["flambe", "platform", "MainLoop"];
    i.MainLoop.updateEntity = function(a, b) {
        var d = a._compMap.SpeedAdjuster_5;
        if (null != d && (d._internal_realDt = b, b *= d.scale._value, 0 >= b)) {
            d.onUpdate(b);
            return
        }
        for (var c = a.firstComponent; null != c;) d = c.next, c.onUpdate(b), c = d;
        for (c = a.firstChild; null != c;) d = c.next, i.MainLoop.updateEntity(c, b), c = d
    };
    i.MainLoop.prototype = {
        addTickable: function(a) {
            this._tickables.push(a)
        },
        render: function(a) {
            var b = a.willRender();
            null != b && (p.Sprite.render(A.root, b), a.didRender())
        },
        update: function(a) {
            if (0 >= a) K.logger.warn("Zero or negative time elapsed since the last frame!", ["dt", a]);
            else {
                1 < a && (a = 1);
                for (var b =
                        0; b < this._tickables.length;) {
                    var d = this._tickables[b];
                    null == d || d.update(a) ? this._tickables.splice(b, 1) : ++b
                }
                A.volume.update(a);
                i.MainLoop.updateEntity(A.root, a)
            }
        },
        __class__: i.MainLoop
    };
    i.ManifestBuilder = function() {};
    k["flambe.platform.ManifestBuilder"] = i.ManifestBuilder;
    i.ManifestBuilder.__name__ = ["flambe", "platform", "ManifestBuilder"];
    i.MouseCodes = function() {};
    k["flambe.platform.MouseCodes"] = i.MouseCodes;
    i.MouseCodes.__name__ = ["flambe", "platform", "MouseCodes"];
    i.MouseCodes.toButton = function(a) {
        switch (a) {
            case 0:
                return f.MouseButton.Left;
            case 1:
                return f.MouseButton.Middle;
            case 2:
                return f.MouseButton.Right
        }
        return f.MouseButton.Unknown(a)
    };
    i.MouseCodes.toButtonCode = function(a) {
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
    i.Renderer = function() {};
    k["flambe.platform.Renderer"] = i.Renderer;
    i.Renderer.__name__ = ["flambe", "platform", "Renderer"];
    i.Renderer.prototype = {
        __class__: i.Renderer
    };
    i.Tickable = function() {};
    k["flambe.platform.Tickable"] = i.Tickable;
    i.Tickable.__name__ = ["flambe", "platform", "Tickable"];
    i.Tickable.prototype = {
        __class__: i.Tickable
    };
    i.html.CanvasGraphics = function(a) {
        this._firstDraw = !1;
        this._canvasCtx = a.getContext("2d");
        this.clear()
    };
    k["flambe.platform.html.CanvasGraphics"] = i.html.CanvasGraphics;
    i.html.CanvasGraphics.__name__ = ["flambe", "platform", "html", "CanvasGraphics"];
    i.html.CanvasGraphics.__interfaces__ = [p.Graphics];
    i.html.CanvasGraphics.prototype = {
        willRender: function() {
            this._firstDraw = !0
        },
        applyScissor: function(a, b, d, c) {
            this._canvasCtx.beginPath();
            this._canvasCtx.rect(a | 0, b | 0, d |
                0, c | 0);
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
        fillRect: function(a, b, d, c, e) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.fillRect(a, b, d, c, e), this._canvasCtx.globalCompositeOperation = "source-over") : (this._canvasCtx.fillStyle =
                "#" + ("00000" + a.toString(16)).slice(-6), this._canvasCtx.fillRect(b | 0, d | 0, c | 0, e | 0))
        },
        drawPattern: function(a, b, d, c, e) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawPattern(a, b, d, c, e), this._canvasCtx.globalCompositeOperation = "source-over") : (null == a.pattern && (a.pattern = this._canvasCtx.createPattern(a.image, "repeat")), this._canvasCtx.fillStyle = a.pattern, this._canvasCtx.fillRect(b | 0, d | 0, c | 0, e | 0))
        },
        drawSubImage: function(a, b, d, c, e, f, g) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubImage(a, b, d, c, e, f, g), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.image, c | 0, e | 0, f | 0, g | 0, b | 0, d | 0, f | 0, g | 0)
        },
        drawImage: function(a, b, d) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawImage(a, b, d), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.image, b | 0, d | 0)
        },
        restore: function() {
            this._canvasCtx.restore()
        },
        transform: function(a,
            b, d, c, e, f) {
            this._canvasCtx.transform(a, b, d, c, e | 0, f | 0)
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
            this._canvasCtx.fillStyle = "rgba(0,0,0,0)";
            this._canvasCtx.fillRect(0, 0, this._canvasCtx.canvas.width, this._canvasCtx.canvas.height)
        },
        __class__: i.html.CanvasGraphics
    };
    i.html.CanvasRenderer = function(a) {
        this._graphics =
            new i.html.CanvasGraphics(a);
        this._graphics.clear()
    };
    k["flambe.platform.html.CanvasRenderer"] = i.html.CanvasRenderer;
    i.html.CanvasRenderer.__name__ = ["flambe", "platform", "html", "CanvasRenderer"];
    i.html.CanvasRenderer.__interfaces__ = [i.Renderer];
    i.html.CanvasRenderer.prototype = {
        didRender: function() {},
        willRender: function() {
            this._graphics.willRender();
            return this._graphics
        },
        createEmptyTexture: function(a, b) {
            return new i.html.CanvasTexture(i.html.HtmlUtil.createEmptyCanvas(a, b))
        },
        createTexture: function(a) {
            return new i.html.CanvasTexture(i.html.CanvasRenderer.CANVAS_TEXTURES ?
                i.html.HtmlUtil.createCanvas(a) : a)
        },
        __class__: i.html.CanvasRenderer
    };
    i.html.CanvasTexture = function(a) {
        this._graphics = null;
        this.image = a
    };
    k["flambe.platform.html.CanvasTexture"] = i.html.CanvasTexture;
    i.html.CanvasTexture.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
    i.html.CanvasTexture.__interfaces__ = [p.Texture];
    i.html.CanvasTexture.prototype = {
        getContext2d: function() {
            M.__instanceof(this.image, HTMLCanvasElement) || (this.image = i.html.HtmlUtil.createCanvas(this.image));
            return this.image.getContext("2d")
        },
        get_graphics: function() {
            null == this._graphics && (this.getContext2d(), this._graphics = new i.html._CanvasTexture.InternalGraphics(this));
            return this._graphics
        },
        get_height: function() {
            return this.image.height
        },
        get_width: function() {
            return this.image.width
        },
        writePixels: function(a, b, d, c, e) {
            var f = this.getContext2d(),
                g = f.createImageData(c, e),
                h = g.data;
            if (null != h.set) h.set(a.b);
            else {
                c = 4 * c * e;
                for (e = 0; e < c;) {
                    var i = e++;
                    h[i] = a.b[i]
                }
            }
            f.putImageData(g, b, d);
            this.pattern = null
        },
        readPixels: function(a, b, d, c) {
            return V.Bytes.ofData(this.getContext2d().getImageData(a,
                b, d, c).data)
        },
        __class__: i.html.CanvasTexture,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_graphics: "get_graphics"
        }
    };
    i.html._CanvasTexture = {};
    i.html._CanvasTexture.InternalGraphics = function(a) {
        i.html.CanvasGraphics.call(this, a.image);
        this._renderTarget = a
    };
    k["flambe.platform.html._CanvasTexture.InternalGraphics"] = i.html._CanvasTexture.InternalGraphics;
    i.html._CanvasTexture.InternalGraphics.__name__ = ["flambe", "platform", "html", "_CanvasTexture", "InternalGraphics"];
    i.html._CanvasTexture.InternalGraphics.__super__ =
        i.html.CanvasGraphics;
    i.html._CanvasTexture.InternalGraphics.prototype = t(i.html.CanvasGraphics.prototype, {
        fillRect: function(a, b, d, c, e) {
            i.html.CanvasGraphics.prototype.fillRect.call(this, a, b, d, c, e);
            this._renderTarget.pattern = null
        },
        drawPattern: function(a, b, d, c, e) {
            i.html.CanvasGraphics.prototype.drawPattern.call(this, a, b, d, c, e);
            this._renderTarget.pattern = null
        },
        drawSubImage: function(a, b, d, c, e, f, g) {
            i.html.CanvasGraphics.prototype.drawSubImage.call(this, a, b, d, c, e, f, g);
            this._renderTarget.pattern = null
        },
        drawImage: function(a,
            b, d) {
            i.html.CanvasGraphics.prototype.drawImage.call(this, a, b, d);
            this._renderTarget.pattern = null
        },
        __class__: i.html._CanvasTexture.InternalGraphics
    });
    i.html.HtmlAssetPackLoader = function(a, b) {
        i.BasicAssetPackLoader.call(this, a, b)
    };
    k["flambe.platform.html.HtmlAssetPackLoader"] = i.html.HtmlAssetPackLoader;
    i.html.HtmlAssetPackLoader.__name__ = ["flambe", "platform", "html", "HtmlAssetPackLoader"];
    i.html.HtmlAssetPackLoader.detectAudioFormats = function() {
        var a = x.document.createElement("audio");
        if (null == a || null ==
            a.canPlayType) return [];
        var b = new X("\\b(iPhone|iPod|iPad)\\b", "");
        if (!i.html.WebAudioSound.get_supported() && b.match(x.window.navigator.userAgent)) return [];
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
            }], d = [], c = 0; c < b.length;) {
            var e = b[c];
            ++c;
            var f = "";
            try {
                f = a.canPlayType(e.type)
            } catch (g) {}
            "" != f && d.push(e.extension)
        }
        return d
    };
    i.html.HtmlAssetPackLoader.supportsBlob = function() {
        if (i.html.HtmlAssetPackLoader._detectBlobSupport) {
            i.html.HtmlAssetPackLoader._detectBlobSupport = !1;
            try {
                (new XMLHttpRequest).responseType = "blob"
            } catch (a) {
                return !1
            }
            i.html.HtmlAssetPackLoader._URL = i.html.HtmlUtil.loadExtension("URL").value
        }
        return null != i.html.HtmlAssetPackLoader._URL && null != i.html.HtmlAssetPackLoader._URL.createObjectURL
    };
    i.html.HtmlAssetPackLoader.__super__ = i.BasicAssetPackLoader;
    i.html.HtmlAssetPackLoader.prototype = t(i.BasicAssetPackLoader.prototype, {
        sendRequest: function(a, b, d, c) {
            var e = this,
                f = new XMLHttpRequest,
                g = 0,
                h = function() {
                    g = Date.now();
                    f.open("GET", a, !0);
                    f.responseType =
                        d;
                    "" == f.responseType && (f.responseType = "arraybuffer");
                    f.send()
                },
                i = 0;
            if ("undefined" != typeof f.onprogress) {
                var j = 4;
                f.onprogress = function(a) {
                    g = Date.now();
                    e.handleProgress(b, a.loaded)
                };
                i = x.window.setInterval(function() {
                    5E3 < Date.now() - g && (f.abort(), --j, 0 < j ? h() : (x.window.clearInterval(i), e.handleError(b, "Failed to load asset: timeout")))
                }, 1E3)
            }
            f.onload = function() {
                x.window.clearInterval(i);
                var a = f.response;
                null == a ? a = f.responseText : "blob" == d && "arraybuffer" == f.responseType && (a = new Blob([f.response]));
                c(a)
            };
            f.onerror = function() {
                x.window.clearInterval(i);
                e.handleError(b, "Failed to load asset: error #" + s.string(f.status))
            };
            h();
            return f
        },
        getAudioFormats: function() {
            null == i.html.HtmlAssetPackLoader._audioFormats && (i.html.HtmlAssetPackLoader._audioFormats = i.html.HtmlAssetPackLoader.detectAudioFormats());
            return i.html.HtmlAssetPackLoader._audioFormats
        },
        loadEntry: function(a, b) {
            var d = this;
            switch (b.type[1]) {
                case 0:
                    var c = new Image,
                        e = new i.EventGroup;
                    e.addDisposingListener(c, "load", function() {
                        i.html.HtmlAssetPackLoader.supportsBlob() &&
                            i.html.HtmlAssetPackLoader._URL.revokeObjectURL(c.src);
                        var a = d._platform.getRenderer().createTexture(c);
                        null != a ? d.handleLoad(b, a) : d.handleTextureError(b)
                    });
                    e.addDisposingListener(c, "error", function() {
                        d.handleError(b, "Failed to load image")
                    });
                    i.html.HtmlAssetPackLoader.supportsBlob() ? this.sendRequest(a, b, "blob", function(a) {
                        c.src = i.html.HtmlAssetPackLoader._URL.createObjectURL(a)
                    }) : c.src = a;
                    break;
                case 1:
                    if (i.html.WebAudioSound.get_supported()) this.sendRequest(a, b, "arraybuffer", function(c) {
                        i.html.WebAudioSound.ctx.decodeAudioData(c,
                            function(a) {
                                d.handleLoad(b, new i.html.WebAudioSound(a))
                            },
                            function() {
                                K.logger.warn("Couldn't decode Web Audio, ignoring this asset", ["url", a]);
                                d.handleLoad(b, i.DummySound.getInstance())
                            })
                    });
                    else {
                        var f = x.document.createElement("audio");
                        f.preload = "auto";
                        var g = ++i.html.HtmlAssetPackLoader._mediaRefCount;
                        null == i.html.HtmlAssetPackLoader._mediaElements && (i.html.HtmlAssetPackLoader._mediaElements = new W);
                        i.html.HtmlAssetPackLoader._mediaElements.set(g, f);
                        e = new i.EventGroup;
                        e.addDisposingListener(f, "canplaythrough",
                            function() {
                                i.html.HtmlAssetPackLoader._mediaElements.remove(g);
                                d.handleLoad(b, new i.html.HtmlSound(f))
                            });
                        e.addDisposingListener(f, "error", function() {
                            i.html.HtmlAssetPackLoader._mediaElements.remove(g);
                            var c = f.error.code;
                            3 == c || 4 == c ? (K.logger.warn("Couldn't decode HTML5 audio, ignoring this asset", ["url", a, "code", c]), d.handleLoad(b, i.DummySound.getInstance())) : d.handleError(b, "Failed to load audio: " + s.string(f.error.code))
                        });
                        e.addListener(f, "progress", function() {
                            if (0 < f.buffered.length && 0 < f.duration) {
                                var a =
                                    f.buffered.end(0) / f.duration;
                                d.handleProgress(b, a * b.bytes | 0)
                            }
                        });
                        f.src = a;
                        f.load()
                    }
                    break;
                case 2:
                    this.sendRequest(a, b, "text", function(a) {
                        d.handleLoad(b, a)
                    })
            }
        },
        __class__: i.html.HtmlAssetPackLoader
    });
    i.html.HtmlExternal = function() {};
    k["flambe.platform.html.HtmlExternal"] = i.html.HtmlExternal;
    i.html.HtmlExternal.__name__ = ["flambe", "platform", "html", "HtmlExternal"];
    i.html.HtmlExternal.__interfaces__ = [z.External];
    i.html.HtmlExternal.prototype = {
        bind: function(a, b) {
            x.window[a] = b
        },
        call: function(a, b) {
            null == b &&
                (b = []);
            return L.field(x.window, a).apply(null, b)
        },
        get_supported: function() {
            return !0
        },
        __class__: i.html.HtmlExternal,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    o.LogHandler = function() {};
    k["flambe.util.LogHandler"] = o.LogHandler;
    o.LogHandler.__name__ = ["flambe", "util", "LogHandler"];
    o.LogHandler.prototype = {
        __class__: o.LogHandler
    };
    i.html.HtmlLogHandler = function(a) {
        this._tagPrefix = a + ": "
    };
    k["flambe.platform.html.HtmlLogHandler"] = i.html.HtmlLogHandler;
    i.html.HtmlLogHandler.__name__ = ["flambe", "platform",
        "html", "HtmlLogHandler"
    ];
    i.html.HtmlLogHandler.__interfaces__ = [o.LogHandler];
    i.html.HtmlLogHandler.isSupported = function() {
        return "object" == typeof console && null != console.info
    };
    i.html.HtmlLogHandler.prototype = {
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
        __class__: i.html.HtmlLogHandler
    };
    i.html.HtmlMouse = function(a, b) {
        i.BasicMouse.call(this, a);
        this._canvas = b
    };
    k["flambe.platform.html.HtmlMouse"] = i.html.HtmlMouse;
    i.html.HtmlMouse.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
    i.html.HtmlMouse.__super__ = i.BasicMouse;
    i.html.HtmlMouse.prototype = t(i.BasicMouse.prototype, {
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
            return i.BasicMouse.prototype.set_cursor.call(this, a)
        },
        __class__: i.html.HtmlMouse
    });
    i.html.HtmlSound = function(a) {
        this.audioElement = a
    };
    k["flambe.platform.html.HtmlSound"] = i.html.HtmlSound;
    i.html.HtmlSound.__name__ = ["flambe", "platform", "html", "HtmlSound"];
    i.html.HtmlSound.__interfaces__ = [H.Sound];
    i.html.HtmlSound.prototype = {
        get_duration: function() {
            return this.audioElement.duration
        },
        loop: function(a) {
            null == a && (a = 1);
            return new i.html._HtmlSound.HtmlPlayback(this, a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return new i.html._HtmlSound.HtmlPlayback(this, a, !1)
        },
        __class__: i.html.HtmlSound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    i.html._HtmlSound = {};
    i.html._HtmlSound.HtmlPlayback = function(a, b, d) {
        var c = this;
        this._sound =
            a;
        this._tickableAdded = !1;
        this._clonedElement = x.document.createElement("audio");
        this._clonedElement.loop = d;
        this._clonedElement.src = a.audioElement.src;
        this.volume = new F.AnimatedFloat(b, function() {
            c.updateVolume()
        });
        this.updateVolume();
        this.playAudio()
    };
    k["flambe.platform.html._HtmlSound.HtmlPlayback"] = i.html._HtmlSound.HtmlPlayback;
    i.html._HtmlSound.HtmlPlayback.__name__ = ["flambe", "platform", "html", "_HtmlSound", "HtmlPlayback"];
    i.html._HtmlSound.HtmlPlayback.__interfaces__ = [i.Tickable, H.Playback];
    i.html._HtmlSound.HtmlPlayback.prototype = {
        updateVolume: function() {
            this._clonedElement.volume = A.volume._value * this.volume._value
        },
        playAudio: function() {
            var a = this;
            this._clonedElement.play();
            this._tickableAdded || (i.html.HtmlPlatform.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._volumeBinding = A.volume.get_changed().connect(function() {
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
        __class__: i.html._HtmlSound.HtmlPlayback,
        __properties__: {
            set_paused: "set_paused",
            get_paused: "get_paused",
            get_ended: "get_ended",
            set_position: "set_position",
            get_position: "get_position",
            get_sound: "get_sound"
        }
    };
    i.html.HtmlStage = function(a) {
        var b = this;
        this._canvas = a;
        this.resize = new o.Signal0;
        this.scaleFactor = i.html.HtmlStage.computeScaleFactor();
        1 != this.scaleFactor && (K.logger.info("Reversing device DPI scaling", ["scaleFactor", this.scaleFactor]), i.html.HtmlUtil.setVendorStyle(this._canvas, "transform-origin", "top left"), i.html.HtmlUtil.setVendorStyle(this._canvas, "transform", "scale(" + 1 / this.scaleFactor + ")"));
        i.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange", function() {
            i.html.HtmlUtil.callLater(u(b, b.hideMobileBrowser), 200)
        }, !1), this.hideMobileBrowser());
        window.addEventListener("resize", u(this, this.onWindowResize), !1);
        this.onWindowResize();
        this.orientation = new o.Value(null);
        null != window.orientation && (window.addEventListener("orientationchange", u(this, this.onOrientationChange), !1), this.onOrientationChange());
        this.fullscreen = new o.Value(!1);
        i.html.HtmlUtil.addVendorListener(x.document,
            "fullscreenchange",
            function() {
                b.updateFullscreen()
            }, !1);
        this.updateFullscreen()
    };
    k["flambe.platform.html.HtmlStage"] = i.html.HtmlStage;
    i.html.HtmlStage.__name__ = ["flambe", "platform", "html", "HtmlStage"];
    i.html.HtmlStage.__interfaces__ = [p.Stage];
    i.html.HtmlStage.computeScaleFactor = function() {
        var a = window.devicePixelRatio;
        null == a && (a = 1);
        var b = x.document.createElement("canvas").getContext("2d"),
            b = i.html.HtmlUtil.loadExtension("backingStorePixelRatio", b).value;
        null == b && (b = 1);
        a /= b;
        b = screen.height;
        return 1136 <
            a * screen.width || 1136 < a * b ? 1 : a
    };
    i.html.HtmlStage.prototype = {
        updateFullscreen: function() {
            this.fullscreen.set__(!0 == i.html.HtmlUtil.loadFirstExtension(["fullscreen", "fullScreen", "isFullScreen"], x.document).value)
        },
        onOrientationChange: function() {
            this.orientation.set__(i.html.HtmlUtil.orientation(window.orientation))
        },
        hideMobileBrowser: function() {
            var a = this,
                b = x.document.documentElement.style;
            b.height = x.window.innerHeight + 100 + "px";
            b.width = x.window.innerWidth + "px";
            b.overflow = "visible";
            i.html.HtmlUtil.callLater(function() {
                i.html.HtmlUtil.hideMobileBrowser();
                i.html.HtmlUtil.callLater(function() {
                    b.height = x.window.innerHeight + "px";
                    a.onWindowResize()
                }, 100)
            })
        },
        resizeCanvas: function(a, b) {
            var d = this.scaleFactor * a,
                c = this.scaleFactor * b;
            if (this._canvas.width == d && this._canvas.height == c) return !1;
            this._canvas.width = d;
            this._canvas.height = c;
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
                var a = x.document.documentElement,
                    b = i.html.HtmlUtil.loadFirstExtension(["requestFullscreen", "requestFullScreen"], a).value;
                null != b && b.apply(a, [])
            } else a = i.html.HtmlUtil.loadFirstExtension(["cancelFullscreen", "cancelFullScreen"], x.document).value, null != a && a.apply(x.document, [])
        },
        requestResize: function(a, b) {
            if (this.resizeCanvas(a, b)) {
                var d = this._canvas.parentNode;
                d.style.width = a + "px";
                d.style.height = b + "px"
            }
        },
        unlockOrientation: function() {},
        lockOrientation: function() {},
        get_fullscreenSupported: function() {
            return !0 == i.html.HtmlUtil.loadFirstExtension(["fullscreenEnabled",
                "fullScreenEnabled"
            ], x.document).value
        },
        get_height: function() {
            return this._canvas.height
        },
        get_width: function() {
            return this._canvas.width
        },
        __class__: i.html.HtmlStage,
        __properties__: {
            get_width: "get_width",
            get_height: "get_height",
            get_fullscreenSupported: "get_fullscreenSupported"
        }
    };
    i.html.HtmlStorage = function(a) {
        this._storage = a
    };
    k["flambe.platform.html.HtmlStorage"] = i.html.HtmlStorage;
    i.html.HtmlStorage.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
    i.html.HtmlStorage.__interfaces__ = [aa.Storage];
    i.html.HtmlStorage.prototype = {
        clear: function() {
            try {
                this._storage.clear()
            } catch (a) {
                K.logger.warn("localStorage.clear failed", ["message", a.message])
            }
        },
        remove: function(a) {
            try {
                this._storage.removeItem("flambe:" + a)
            } catch (b) {
                K.logger.warn("localStorage.removeItem failed", ["message", b.message])
            }
        },
        get: function(a, b) {
            var d = null;
            try {
                d = this._storage.getItem("flambe:" + a)
            } catch (c) {
                K.logger.warn("localStorage.getItem failed", ["message", c.message])
            }
            if (null != d) try {
                return Q.run(d)
            } catch (e) {
                K.logger.warn("Storage unserialization failed", ["message", e])
            }
            return b
        },
        set: function(a, b) {
            var d;
            try {
                var c = new U;
                c.useCache = !0;
                c.useEnumIndex = !1;
                c.serialize(b);
                d = c.toString()
            } catch (e) {
                return K.logger.warn("Storage serialization failed", ["message", e]), !1
            }
            try {
                this._storage.setItem("flambe:" + a, d)
            } catch (f) {
                return K.logger.warn("localStorage.setItem failed", ["message", f.message]), !1
            }
            return !0
        },
        get_supported: function() {
            return !0
        },
        __class__: i.html.HtmlStorage,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    i.html.HtmlUtil = function() {};
    k["flambe.platform.html.HtmlUtil"] =
        i.html.HtmlUtil;
    i.html.HtmlUtil.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
    i.html.HtmlUtil.callLater = function(a, b) {
        null == b && (b = 0);
        x.window.setTimeout(a, b)
    };
    i.html.HtmlUtil.hideMobileBrowser = function() {
        x.window.scrollTo(1, 0)
    };
    i.html.HtmlUtil.loadExtension = function(a, b) {
        null == b && (b = x.window);
        var d = L.field(b, a);
        if (null != d) return {
            prefix: null,
            field: a,
            value: d
        };
        for (var d = a.charAt(0).toUpperCase() + B.substr(a, 1, null), c = 0, e = i.html.HtmlUtil.VENDOR_PREFIXES; c < e.length;) {
            var f = e[c];
            ++c;
            var g = f + d,
                h = L.field(b,
                    g);
            if (null != h) return {
                prefix: f,
                field: g,
                value: h
            }
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    i.html.HtmlUtil.loadFirstExtension = function(a, b) {
        for (var d = 0; d < a.length;) {
            var c = a[d];
            ++d;
            c = i.html.HtmlUtil.loadExtension(c, b);
            if (null != c.field) return c
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    i.html.HtmlUtil.polyfill = function(a, b) {
        null == b && (b = x.window);
        var d = i.html.HtmlUtil.loadExtension(a, b).value;
        if (null == d) return !1;
        b[a] = d;
        return !0
    };
    i.html.HtmlUtil.setVendorStyle = function(a, b, d) {
        for (var a = a.style, c = 0, e =
                i.html.HtmlUtil.VENDOR_PREFIXES; c < e.length;) {
            var f = e[c];
            ++c;
            a.setProperty("-" + f + "-" + b, d)
        }
        a.setProperty(b, d)
    };
    i.html.HtmlUtil.addVendorListener = function(a, b, d, c) {
        for (var e = 0, f = i.html.HtmlUtil.VENDOR_PREFIXES; e < f.length;) {
            var g = f[e];
            ++e;
            a.addEventListener(g + b, d, c)
        }
        a.addEventListener(b, d, c)
    };
    i.html.HtmlUtil.orientation = function(a) {
        switch (a) {
            case -90:
            case 90:
                return p.Orientation.Landscape;
            default:
                return p.Orientation.Portrait
        }
    };
    i.html.HtmlUtil.createEmptyCanvas = function(a, b) {
        var d = x.document.createElement("canvas");
        d.width = a;
        d.height = b;
        return d
    };
    i.html.HtmlUtil.createCanvas = function(a) {
        var b = i.html.HtmlUtil.createEmptyCanvas(a.width, a.height),
            d = b.getContext("2d");
        d.save();
        d.globalCompositeOperation = "copy";
        d.drawImage(a, 0, 0);
        d.restore();
        return b
    };
    i.html.HtmlUtil.fixAndroidMath = function() {
        if (0 <= x.window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
            K.logger.warn("Monkey patching around Android sin/cos bug", null);
            var a = Math.sin,
                b = Math.cos;
            Math.sin = function(b) {
                return 0 == b ? 0 : a(b)
            };
            Math.cos = function(a) {
                return 0 ==
                    a ? 1 : b(a)
            }
        }
    };
    z = {
        Web: function() {}
    };
    k["flambe.web.Web"] = z.Web;
    z.Web.__name__ = ["flambe", "web", "Web"];
    z.Web.prototype = {
        __class__: z.Web,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    i.html.HtmlWeb = function(a) {
        this._container = a
    };
    k["flambe.platform.html.HtmlWeb"] = i.html.HtmlWeb;
    i.html.HtmlWeb.__name__ = ["flambe", "platform", "html", "HtmlWeb"];
    i.html.HtmlWeb.__interfaces__ = [z.Web];
    i.html.HtmlWeb.prototype = {
        openBrowser: function(a) {
            x.window.open(a, "_blank")
        },
        createView: function(a, b, d, c) {
            var e = x.document.createElement("iframe");
            e.style.position = "absolute";
            e.style.border = "0";
            e.scrolling = "no";
            this._container.appendChild(e);
            a = new i.html.HtmlWebView(e, a, b, d, c);
            i.html.HtmlPlatform.instance.mainLoop.addTickable(a);
            return a
        },
        get_supported: function() {
            return !0
        },
        __class__: i.html.HtmlWeb,
        __properties__: {
            get_supported: "get_supported"
        }
    };
    z.WebView = function() {};
    k["flambe.web.WebView"] = z.WebView;
    z.WebView.__name__ = ["flambe", "web", "WebView"];
    z.WebView.__interfaces__ = [o.Disposable];
    z.WebView.prototype = {
        __class__: z.WebView
    };
    i.html.HtmlWebView =
        function(a, b, d, c, e) {
            var f = this;
            this.iframe = a;
            a = function() {
                f.updateBounds()
            };
            this.x = new F.AnimatedFloat(b, a);
            this.y = new F.AnimatedFloat(d, a);
            this.width = new F.AnimatedFloat(c, a);
            this.height = new F.AnimatedFloat(e, a);
            this.updateBounds();
            this.url = new o.Value(null, function(a) {
                f.loadUrl(a)
            });
            this.error = new o.Signal1
        };
    k["flambe.platform.html.HtmlWebView"] = i.html.HtmlWebView;
    i.html.HtmlWebView.__name__ = ["flambe", "platform", "html", "HtmlWebView"];
    i.html.HtmlWebView.__interfaces__ = [i.Tickable, z.WebView];
    i.html.HtmlWebView.prototype = {
        loadUrl: function(a) {
            null != this.iframe && (this.iframe.src = a)
        },
        updateBounds: function() {
            null != this.iframe && (this.iframe.style.left = this.x._value + "px", this.iframe.style.top = this.y._value + "px", this.iframe.width = this.width._value, this.iframe.height = this.height._value)
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
        __class__: i.html.HtmlWebView
    };
    i.html.WebAudioSound = function(a) {
        this.buffer = a
    };
    k["flambe.platform.html.WebAudioSound"] = i.html.WebAudioSound;
    i.html.WebAudioSound.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
    i.html.WebAudioSound.__interfaces__ = [H.Sound];
    i.html.WebAudioSound.__properties__ = {
        get_supported: "get_supported"
    };
    i.html.WebAudioSound.get_supported = function() {
        if (i.html.WebAudioSound._detectSupport) {
            i.html.WebAudioSound._detectSupport = !1;
            var a = i.html.HtmlUtil.loadExtension("AudioContext").value;
            null != a && (i.html.WebAudioSound.ctx =
                new a, i.html.WebAudioSound.gain = (i.html.WebAudioSound.ctx.createGain)?i.html.WebAudioSound.ctx.createGain():i.html.WebAudioSound.ctx.createGainNode(), i.html.WebAudioSound.gain.connect(i.html.WebAudioSound.ctx.destination), A.volume.watch(function(a) {
                    i.html.WebAudioSound.gain.gain.value = a
                }))
        }
        return null != i.html.WebAudioSound.ctx
    };
    i.html.WebAudioSound.prototype = {
        get_duration: function() {
            return this.buffer.duration
        },
        loop: function(a) {
            null == a && (a = 1);
            return new i.html._WebAudioSound.WebAudioPlayback(this, a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return new i.html._WebAudioSound.WebAudioPlayback(this,
                a, !1)
        },
        __class__: i.html.WebAudioSound,
        __properties__: {
            get_duration: "get_duration"
        }
    };
    i.html._WebAudioSound = {};
    i.html._WebAudioSound.WebAudioPlayback = function(a, b, d) {
        var c = this;
        this._sound = a;
        this._head = i.html.WebAudioSound.gain;
        this._sourceNode = i.html.WebAudioSound.ctx.createBufferSource();
        this._sourceNode.buffer = a.buffer;
        this._sourceNode.loop = d;
        (this._sourceNode.start) ?this._sourceNode.start(0) : this._sourceNode.noteOn(0);
        this.playAudio();
        this.volume = new F.AnimatedFloat(b, function(a) {
            c.setVolume(a)
        });
        1 != b && this.setVolume(b)
    };
    k["flambe.platform.html._WebAudioSound.WebAudioPlayback"] =
        i.html._WebAudioSound.WebAudioPlayback;
    i.html._WebAudioSound.WebAudioPlayback.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
    i.html._WebAudioSound.WebAudioPlayback.__interfaces__ = [i.Tickable, H.Playback];
    i.html._WebAudioSound.WebAudioPlayback.prototype = {
        playAudio: function() {
            this._sourceNode.connect(this._head);
            this._startedAt = i.html.WebAudioSound.ctx.currentTime;
            this._pausedAt = -1;
            this._tickableAdded || (this._tickableAdded = !0, i.html.HtmlPlatform.instance.mainLoop.addTickable(this))
        },
        insertNode: function(a) {
            0 <= this._pausedAt || (this._sourceNode.disconnect(), this._sourceNode.connect(a));
            a.connect(this._head);
            this._head = a
        },
        setVolume: function(a) {
            null == this._gainNode && (this._gainNode = (i.html.WebAudioSound.ctx.createGain)?i.html.WebAudioSound.ctx.createGain():i.html.WebAudioSound.ctx.createGainNode(), this.insertNode(this._gainNode));
            this._gainNode.gain.value = a
        },
        dispose: function() {
            this.set_paused(!0)
        },
        update: function(a) {
            this.volume.update(a);
            return 3 == this._sourceNode.playbackState || 0 <= this._pausedAt ? (this._tickableAdded = !1, !0) : !1
        },
        set_position: function(a) {
            return a
        },
        get_position: function() {
            return 3 == this._sourceNode.playbackState ? this._sound.get_duration() : 0 <= this._pausedAt ? this._pausedAt : (i.html.WebAudioSound.ctx.currentTime - this._startedAt) % this._sound.get_duration()
        },
        get_ended: function() {
            return 3 == this._sourceNode.playbackState
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
        __class__: i.html._WebAudioSound.WebAudioPlayback,
        __properties__: {
            set_paused: "set_paused",
            get_paused: "get_paused",
            get_ended: "get_ended",
            set_position: "set_position",
            get_position: "get_position",
            get_sound: "get_sound"
        }
    };
    z = {
        Director: function() {
            this._width = this._height = -1;
            this._transitor = null;
            this.scenes = [];
            this.occludedScenes = [];
            this._root = new N
        }
    };
    k["flambe.scene.Director"] = z.Director;
    z.Director.__name__ = ["flambe", "scene", "Director"];
    z.Director.__super__ = P;
    z.Director.prototype = t(P.prototype, {
        get_height: function() {
            return 0 >
                this._height ? A._platform.getStage().get_height() : this._height
        },
        get_width: function() {
            return 0 > this._width ? A._platform.getStage().get_width() : this._width
        },
        completeTransition: function() {
            null != this._transitor && (this._transitor.complete(), this._transitor = null, this.invalidateVisibility())
        },
        invalidateVisibility: function() {
            for (var a = this.scenes.length; 0 < a;) {
                var b = this.scenes[--a],
                    b = b._compMap.Scene_4;
                if (null == b || b.opaque) break
            }
            this.occludedScenes = 0 < this.scenes.length ? this.scenes.slice(a, this.scenes.length -
                1) : [];
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
            null != this._transitor && this._transitor.update(a) && this.completeTransition()
        },
        onRemoved: function() {
            this.completeTransition();
            for (var a = 0, b = this.scenes; a < b.length;) {
                var d = b[a];
                ++a;
                d.dispose()
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
        __class__: z.Director
    });
    z._Director = {};
    z._Director.Transitor = function() {};
    k["flambe.scene._Director.Transitor"] = z._Director.Transitor;
    z._Director.Transitor.__name__ = ["flambe", "scene", "_Director", "Transitor"];
    z._Director.Transitor.prototype = {
        complete: function() {
            this._transition.complete();
            this._onComplete()
        },
        update: function(a) {
            return this._transition.update(a)
        },
        __class__: z._Director.Transitor
    };
    z.Scene = function(a) {
        null == a && (a = !0);
        this.opaque = a;
        this.shown = new o.Signal0;
        this.hidden = new o.Signal0
    };
    k["flambe.scene.Scene"] = z.Scene;
    z.Scene.__name__ = ["flambe", "scene", "Scene"];
    z.Scene.__super__ = P;
    z.Scene.prototype = t(P.prototype, {
        get_name: function() {
            return "Scene_4"
        },
        __class__: z.Scene
    });
    z.Transition = function() {};
    k["flambe.scene.Transition"] = z.Transition;
    z.Transition.__name__ = ["flambe", "scene", "Transition"];
    z.Transition.prototype = {
        complete: function() {},
        update: function() {
            return !0
        },
        __class__: z.Transition
    };
    H._Mixer = {};
    H._Mixer.MixerSound = function(a, b) {
        this._source = a;
        this._channels =
            b;
        this._playbacks = []
    };
    k["flambe.sound._Mixer.MixerSound"] = H._Mixer.MixerSound;
    H._Mixer.MixerSound.__name__ = ["flambe", "sound", "_Mixer", "MixerSound"];
    H._Mixer.MixerSound.__interfaces__ = [o.Disposable, H.Sound];
    H._Mixer.MixerSound.prototype = {
        dispose: function() {
            for (var a = 0, b = this._playbacks; a < b.length;) {
                var d = b[a];
                ++a;
                d.dispose()
            }
            this._playbacks = []
        },
        get_duration: function() {
            return this._source.get_duration()
        },
        findOpenChannel: function() {
            for (var a = 0, b = this._channels; a < b;) {
                var d = a++,
                    c = this._playbacks[d];
                if (null ==
                    c || c.get_ended()) return d
            }
            return -1
        },
        playOrLoop: function(a, b) {
            var d = this.findOpenChannel();
            if (0 > d) return new i.DummyPlayback(this);
            var c = b ? this._source.loop(a) : this._source.play(a);
            return this._playbacks[d] = c
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
            p.Sprite.call(this);
            this.symbol = a;
            this.anchorX.set__(a.anchorX);
            this.anchorY.set__(a.anchorY)
        }
    };
    k["flambe.swf.BitmapSprite"] = w.BitmapSprite;
    w.BitmapSprite.__name__ = ["flambe", "swf", "BitmapSprite"];
    w.BitmapSprite.__super__ = p.Sprite;
    w.BitmapSprite.prototype = t(p.Sprite.prototype, {
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
    k["flambe.swf.Symbol"] =
        w.Symbol;
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
        var d = a.rect;
        this.x = d[0];
        this.y = d[1];
        this.width = d[2];
        this.height = d[3];
        d = a.origin;
        null != d ? (this.anchorX = d[0], this.anchorY = d[1]) : this.anchorY = this.anchorX = 0
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
        this._symbols = new G;
        var d = Y.parse(a.getFile(b + "/library.json"));
        this.frameRate = d.frameRate;
        for (var c = [], e = 0, f = d.movies; e < f.length;) {
            var g = f[e];
            ++e;
            g = new w.MovieSymbol(this, g);
            c.push(g);
            this._symbols.set(g.get_name(), g)
        }
        e = d.textureGroups;
        (1 != e[0].scaleFactor || 1 < e.length) && K.logger.warn("Flambe doesn't support Flump's Additional Scale Factors. Use Base Scales and load from different asset packs instead.",
            null);
        g = e[0].atlases;
        for (e = 0; e < g.length;) {
            d = g[e];
            ++e;
            for (var h = a.getTexture(b + "/" + o.Strings.removeFileExtension(d.file)), f = 0, d = d.textures; f < d.length;) {
                var i = d[f];
                ++f;
                i = new w.BitmapSymbol(i, h);
                this._symbols.set(i.get_name(), i)
            }
        }
        for (e = 0; e < c.length;) {
            g = c[e];
            ++e;
            f = 0;
            for (d = g.layers; f < d.length;) {
                g = d[f];
                ++f;
                h = 0;
                for (i = g.keyframes; h < i.length;) {
                    var j = i[h];
                    ++h;
                    if (null != j.symbolName) {
                        var k = this._symbols.get(j.symbolName);
                        null == g.lastSymbol ? g.lastSymbol = k : g.lastSymbol != k && (g.multipleSymbols = !0);
                        j.symbol = k
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
        p.Sprite.call(this);
        this.symbol = a;
        this.speed = new F.AnimatedFloat(1);
        this._animators = Array(a.layers.length);
        for (var b = 0, d = this._animators.length; b < d;) {
            var c = b++;
            this._animators[c] = new w._MovieSprite.LayerAnimator(a.layers[c])
        }
        this._position = this._frame = 0;
        this["goto"](1)
    };
    k["flambe.swf.MovieSprite"] = w.MovieSprite;
    w.MovieSprite.__name__ = ["flambe", "swf", "MovieSprite"];
    w.MovieSprite.__super__ = p.Sprite;
    w.MovieSprite.prototype = t(p.Sprite.prototype, {
        get_looped: function() {
            null == this._looped && (this._looped = new o.Signal0);
            return this._looped
        },
        set_paused: function(a) {
            this._flags = o.BitSets.set(this._flags, 16, a);
            return a
        },
        set_position: function(a) {
            return this._position = J.FMath.clamp(a, 0, this.symbol.duration)
        },
        "goto": function(a) {
            if (this._frame != a) {
                if (a < this._frame)
                    for (var b = 0, d = this._animators; b < d.length;) {
                        var c = d[b];
                        ++b;
                        c.changedKeyframe = !0;
                        c.keyframeIdx = 0
                    }
                b = 0;
                for (d = this._animators; b < d.length;) c = d[b], ++b, c.composeFrame(a);
                this._frame = a
            }
        },
        onUpdate: function(a) {
            p.Sprite.prototype.onUpdate.call(this, a);
            this.speed.update(a);
            var b = !1;
            0 == (this._flags & 16) && (this._position += this.speed._value * a, this._position > this.symbol.duration && (this._position %= this.symbol.duration, b = !0));
            this["goto"](this._position * this.symbol.frameRate);
            b && null != this._looped && this._looped.emit0()
        },
        onRemoved: function() {
            p.Sprite.prototype.onRemoved.call(this);
            for (var a = 0, b =
                    this._animators; a < b.length;) {
                var d = b[a];
                ++a;
                this.owner.removeChild(d.content)
            }
        },
        onAdded: function() {
            p.Sprite.prototype.onAdded.call(this);
            for (var a = 0, b = this._animators; a < b.length;) {
                var d = b[a];
                ++a;
                this.owner.addChild(d.content)
            }
        },
        __class__: w.MovieSprite,
        __properties__: t(p.Sprite.prototype.__properties__, {
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
            for (var b = 0, d = this._sprites.length; b < d;) {
                var c = b++,
                    e = a.keyframes[c];
                this._sprites[c] = null != e.symbol ? e.symbol.createSprite() : new p.Sprite
            }
            a = this._sprites[0]
        } else a = null != a.lastSymbol ? a.lastSymbol.createSprite() : new p.Sprite;
        this.content = (new N).add(a)
    };
    k["flambe.swf._MovieSprite.LayerAnimator"] = w._MovieSprite.LayerAnimator;
    w._MovieSprite.LayerAnimator.__name__ = ["flambe", "swf", "_MovieSprite", "LayerAnimator"];
    w._MovieSprite.LayerAnimator.prototype = {
        composeFrame: function(a) {
            for (var b = this.layer.keyframes, d = b.length - 1; this.keyframeIdx < d && b[this.keyframeIdx + 1].index <= a;) ++this.keyframeIdx, this.changedKeyframe = !0;
            var c;
            this.changedKeyframe && null != this._sprites ? (c = this._sprites[this.keyframeIdx], this.content.add(c)) : c = this.content._compMap.Sprite_1;
            this.changedKeyframe = !1;
            var e = b[this.keyframeIdx],
                f = e.visible && null != e.symbol;
            c.set_visible(f);
            if (f) {
                var f = e.x,
                    g = e.y,
                    h = e.scaleX,
                    i = e.scaleY,
                    j = e.skewX,
                    k = e.skewY,
                    l =
                    e.alpha;
                if (e.tweened && this.keyframeIdx < d) {
                    a = (a - e.index) / e.duration;
                    d = e.ease;
                    if (0 != d) {
                        var n;
                        0 > d ? (n = 1 - a, n = 1 - n * n, d = -d) : n = a * a;
                        a = d * n + (1 - d) * a
                    }
                    b = b[this.keyframeIdx + 1];
                    f += (b.x - f) * a;
                    g += (b.y - g) * a;
                    h += (b.scaleX - h) * a;
                    i += (b.scaleY - i) * a;
                    j += (b.skewX - j) * a;
                    k += (b.skewY - k) * a;
                    l += (b.alpha - l) * a
                }
                b = c.getLocalMatrix();
                a = Math.sin(j);
                j = Math.cos(j);
                d = Math.sin(k);
                k = Math.cos(k);
                b.set(k * h, d * h, -a * i, j * i, f, g);
                b.translate(-e.pivotX, -e.pivotY);
                c.alpha.set__(l)
            }
        },
        __class__: w._MovieSprite.LayerAnimator
    };
    w.MovieSymbol = function(a, b) {
        this._name =
            b.id;
        this.frameRate = a.frameRate;
        this.frames = 0;
        this.layers = Array(b.layers.length);
        for (var d = 0, c = this.layers.length; d < c;) {
            var e = d++,
                f = new w.MovieLayer(b.layers[e]);
            this.frames = Math.max(f.get_frames(), this.frames);
            this.layers[e] = f
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
        for (var d = 0, c = this.keyframes.length; d < c;) {
            var e = d++,
                b = new w.MovieKeyframe(a.keyframes[e], b);
            this.keyframes[e] = b
        }
    };
    k["flambe.swf.MovieLayer"] = w.MovieLayer;
    w.MovieLayer.__name__ = ["flambe", "swf", "MovieLayer"];
    w.MovieLayer.prototype = {
        get_frames: function() {
            var a = this.keyframes[this.keyframes.length - 1];
            return a.index +
                (a.duration | 0)
        },
        __class__: w.MovieLayer,
        __properties__: {
            get_frames: "get_frames"
        }
    };
    w.MovieKeyframe = function(a, b) {
        this.ease = 0;
        this.visible = this.tweened = !0;
        this.alpha = 1;
        this.skewX = this.skewY = this.pivotX = this.pivotY = 0;
        this.scaleX = this.scaleY = 1;
        this.x = this.y = 0;
        this.symbol = null;
        this.index = null != b ? b.index + b.duration : 0;
        this.duration = a.duration;
        this.label = a.label;
        this.symbolName = a.ref;
        var d = a.loc;
        null != d && (this.x = d[0], this.y = d[1]);
        d = a.scale;
        null != d && (this.scaleX = d[0], this.scaleY = d[1]);
        d = a.skew;
        null != d && (this.skewX =
            d[0], this.skewY = d[1]);
        d = a.pivot;
        null != d && (this.pivotX = d[0], this.pivotY = d[1]);
        null != a.alpha && (this.alpha = a.alpha);
        null != a.visible && (this.visible = a.visible);
        null != a.tweened && (this.tweened = a.tweened);
        null != a.ease && (this.ease = a.ease)
    };
    k["flambe.swf.MovieKeyframe"] = w.MovieKeyframe;
    w.MovieKeyframe.__name__ = ["flambe", "swf", "MovieKeyframe"];
    w.MovieKeyframe.prototype = {
        __class__: w.MovieKeyframe
    };
    o.Arrays = function() {};
    k["flambe.util.Arrays"] = o.Arrays;
    o.Arrays.__name__ = ["flambe", "util", "Arrays"];
    o.Assert = function() {};
    k["flambe.util.Assert"] = o.Assert;
    o.Assert.__name__ = ["flambe", "util", "Assert"];
    o.BitSets = function() {};
    k["flambe.util.BitSets"] = o.BitSets;
    o.BitSets.__name__ = ["flambe", "util", "BitSets"];
    o.BitSets.set = function(a, b, d) {
        return d ? a | b : a & ~b
    };
    o.LogLevel = k["flambe.util.LogLevel"] = {
        __ename__: ["flambe", "util", "LogLevel"],
        __constructs__: ["Info", "Warn", "Error"]
    };
    o.LogLevel.Info = ["Info", 0];
    o.LogLevel.Info.toString = q;
    o.LogLevel.Info.__enum__ = o.LogLevel;
    o.LogLevel.Warn = ["Warn", 1];
    o.LogLevel.Warn.toString = q;
    o.LogLevel.Warn.__enum__ =
        o.LogLevel;
    o.LogLevel.Error = ["Error", 2];
    o.LogLevel.Error.toString = q;
    o.LogLevel.Error.__enum__ = o.LogLevel;
    o.Promise = function() {
        this.success = new o.Signal1;
        this.error = new o.Signal1;
        this.progressChanged = new o.Signal0;
        this.hasResult = !1;
        this._total = this._progress = 0
    };
    k["flambe.util.Promise"] = o.Promise;
    o.Promise.__name__ = ["flambe", "util", "Promise"];
    o.Promise.prototype = {
        set_total: function(a) {
            this._total != a && (this._total = a, this.progressChanged.emit0());
            return a
        },
        set_progress: function(a) {
            this._progress != a &&
                (this._progress = a, this.progressChanged.emit0());
            return a
        },
        get: function(a) {
            return this.hasResult ? (a(this._result), null) : this.success.connect(a).once()
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
        __class__: o.Promise,
        __properties__: {
            set_result: "set_result",
            get_result: "get_result",
            set_progress: "set_progress",
            get_progress: "get_progress",
            set_total: "set_total",
            get_total: "get_total"
        }
    };
    o.Signal0 = function(a) {
        o.SignalBase.call(this, a)
    };
    k["flambe.util.Signal0"] = o.Signal0;
    o.Signal0.__name__ = ["flambe", "util", "Signal0"];
    o.Signal0.__super__ = o.SignalBase;
    o.Signal0.prototype = t(o.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: o.Signal0
    });
    o._SignalBase = {};
    o._SignalBase.Task = function(a) {
        this.next = null;
        this.fn = a
    };
    k["flambe.util._SignalBase.Task"] = o._SignalBase.Task;
    o._SignalBase.Task.__name__ = ["flambe", "util", "_SignalBase", "Task"];
    o._SignalBase.Task.prototype = {
        __class__: o._SignalBase.Task
    };
    D = void 0;
    T = void 0;
    Q = void 0;
    U = void 0;
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
                var d = this.str.charCodeAt(this.pos++);
                if (34 == d) break;
                if (92 == d) {
                    b.b += B.substr(this.str, a, this.pos - a - 1);
                    d = this.str.charCodeAt(this.pos++);
                    switch (d) {
                        case 114:
                            b.b +=
                                String.fromCharCode(13);
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
                            b.b += String.fromCharCode(d);
                            break;
                        case 117:
                            a = s.parseInt("0x" + B.substr(this.str, this.pos, 4));
                            this.pos += 4;
                            b.b += String.fromCharCode(a);
                            break;
                        default:
                            throw "Invalid escape sequence \\" + String.fromCharCode(d) + " at position " + (this.pos - 1);
                    }
                    a = this.pos
                } else if (d != d) throw "Unclosed string";
            }
            b.b += B.substr(this.str, a, this.pos - a - 1);
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
                    for (var a = {}, b = null, d = null;;) {
                        var c = this.str.charCodeAt(this.pos++);
                        switch (c) {
                            case 32:
                            case 13:
                            case 10:
                            case 9:
                                break;
                            case 125:
                                return (null != b || !1 == d) && this.invalidChar(), a;
                            case 58:
                                null == b && this.invalidChar();
                                a[b] = this.parseRec();
                                b = null;
                                d = !0;
                                break;
                            case 44:
                                d ? d = !1 : this.invalidChar();
                                break;
                            case 34:
                                d && this.invalidChar();
                                b = this.parseString();
                                break;
                            default:
                                this.invalidChar()
                        }
                    }
                    break;
                case 91:
                    a = [];
                    for (d = null;;) switch (c = this.str.charCodeAt(this.pos++), c) {
                        case 32:
                        case 13:
                        case 10:
                        case 9:
                            break;
                        case 93:
                            return !1 == d && this.invalidChar(), a;
                        case 44:
                            d ? d = !1 : this.invalidChar();
                            break;
                        default:
                            d && this.invalidChar(), this.pos--, a.push(this.parseRec()), d = !0
                    }
                    break;
                case 116:
                    d = this.pos;
                    if (114 != this.str.charCodeAt(this.pos++) || 117 != this.str.charCodeAt(this.pos++) || 101 != this.str.charCodeAt(this.pos++)) this.pos = d, this.invalidChar();
                    return !0;
                case 102:
                    d = this.pos;
                    if (97 !=
                        this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++) || 115 != this.str.charCodeAt(this.pos++) || 101 != this.str.charCodeAt(this.pos++)) this.pos = d, this.invalidChar();
                    return !1;
                case 110:
                    d = this.pos;
                    if (117 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++)) this.pos = d, this.invalidChar();
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
                    if (!this.reg_float.match(B.substr(this.str,
                            this.pos, null))) throw "Invalid float at position " + this.pos;
                    d = this.reg_float.matched(0);
                    this.pos += d.length;
                    d = s.parseFloat(d);
                    c = d | 0;
                    return c == d ? c : d;
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
    U = function() {
        this.buf = new Z;
        this.cache = [];
        this.useCache = U.USE_CACHE;
        this.useEnumIndex = U.USE_ENUM_INDEX;
        this.shash = new G;
        this.scount = 0
    };
    k["haxe.Serializer"] = U;
    U.__name__ = ["haxe", "Serializer"];
    U.run = function(a) {
        var b = new U;
        b.serialize(a);
        return b.toString()
    };
    U.prototype = {
        serialize: function(a) {
            var b = O["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b += s.string("n");
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += s.string("z");
                        break
                    }
                    this.buf.b += s.string("i");
                    this.buf.b += s.string(a);
                    break;
                case 2:
                    Math.isNaN(a) ? this.buf.b += s.string("k") : Math.isFinite(a) ? (this.buf.b += s.string("d"), this.buf.b +=
                        s.string(a)) : this.buf.b += s.string(0 > a ? "m" : "p");
                    break;
                case 3:
                    this.buf.b += s.string(a ? "t" : "f");
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
                            var d = 0;
                            this.buf.b += s.string("a");
                            for (var c = a.length, e = 0; e < c;) b = e++, null == a[b] ? d++ : (0 < d && (1 == d ? this.buf.b += s.string("n") : (this.buf.b += s.string("u"), this.buf.b += s.string(d)), d = 0), this.serialize(a[b]));
                            0 < d && (1 == d ? this.buf.b += s.string("n") : (this.buf.b += s.string("u"), this.buf.b += s.string(d)));
                            this.buf.b += s.string("h");
                            break;
                        case da:
                            this.buf.b += s.string("l");
                            for (a = a.iterator(); a.hasNext();) b = a.next(), this.serialize(b);
                            this.buf.b += s.string("h");
                            break;
                        case Date:
                            this.buf.b += s.string("v");
                            this.buf.b += s.string(B.dateStr(a));
                            break;
                        case G:
                            this.buf.b += s.string("b");
                            for (d = a.keys(); d.hasNext();) b = d.next(), this.serializeString(b), this.serialize(a.get(b));
                            this.buf.b += s.string("h");
                            break;
                        case W:
                            this.buf.b += s.string("q");
                            for (d = a.keys(); d.hasNext();) b = d.next(), this.buf.b += s.string(":"), this.buf.b += s.string(b),
                                this.serialize(a.get(b));
                            this.buf.b += s.string("h");
                            break;
                        case V.Bytes:
                            b = 0;
                            d = a.length - 2;
                            c = new Z;
                            for (e = U.BASE64; b < d;) {
                                var f = a.b[b++],
                                    g = a.b[b++],
                                    h = a.b[b++];
                                c.b += s.string(e.charAt(f >> 2));
                                c.b += s.string(e.charAt((f << 4 | g >> 4) & 63));
                                c.b += s.string(e.charAt((g << 2 | h >> 6) & 63));
                                c.b += s.string(e.charAt(h & 63))
                            }
                            b == d ? (f = a.b[b++], g = a.b[b++], c.b += s.string(e.charAt(f >> 2)), c.b += s.string(e.charAt((f << 4 | g >> 4) & 63)), c.b += s.string(e.charAt(g << 2 & 63))) : b == d + 1 && (f = a.b[b++], c.b += s.string(e.charAt(f >> 2)), c.b += s.string(e.charAt(f <<
                                4 & 63)));
                            b = c.b;
                            this.buf.b += s.string("s");
                            this.buf.b += s.string(b.length);
                            this.buf.b += s.string(":");
                            this.buf.b += s.string(b);
                            break;
                        default:
                            this.cache.pop(), null != a.hxSerialize ? (this.buf.b += s.string("C"), this.serializeString(O.getClassName(b)), this.cache.push(a), a.hxSerialize(this), this.buf.b += s.string("g")) : (this.buf.b += s.string("c"), this.serializeString(O.getClassName(b)), this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (this.useCache && this.serializeRef(a)) break;
                    this.buf.b += s.string("o");
                    this.serializeFields(a);
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache && this.serializeRef(a)) break;
                    this.cache.pop();
                    this.buf.b += s.string(this.useEnumIndex ? "j" : "w");
                    this.serializeString(O.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += s.string(":"), this.buf.b += s.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += s.string(":");
                    c = a.length;
                    this.buf.b += s.string(c - 2);
                    for (e = 2; e < c;) b = e++, this.serialize(a[b]);
                    this.cache.push(a);
                    break;
                case 5:
                    throw "Cannot serialize function";
                default:
                    throw "Cannot serialize " + s.string(a);
            }
        },
        serializeFields: function(a) {
            for (var b =
                    0, c = L.fields(a); b < c.length;) {
                var e = c[b];
                ++b;
                this.serializeString(e);
                this.serialize(L.field(a, e))
            }
            this.buf.b += s.string("g")
        },
        serializeRef: function(a) {
            for (var b = typeof a, c = 0, e = this.cache.length; c < e;) {
                var f = c++,
                    g = this.cache[f];
                if (typeof g == b && g == a) return this.buf.b += s.string("r"), this.buf.b += s.string(f), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += s.string("R"), this.buf.b += s.string(b)) : (this.shash.set(a, this.scount++), this.buf.b += s.string("y"),
                a = R.urlEncode(a), this.buf.b += s.string(a.length), this.buf.b += s.string(":"), this.buf.b += s.string(a))
        },
        toString: function() {
            return this.buf.b
        },
        __class__: U
    };
    T = function(a) {
        var b = this;
        this.id = window.setInterval(function() {
            b.run()
        }, a)
    };
    k["haxe.Timer"] = T;
    T.__name__ = ["haxe", "Timer"];
    T.delay = function(a, b) {
        var c = new T(b);
        c.run = function() {
            c.stop();
            a()
        };
        return c
    };
    T.prototype = {
        run: function() {},
        stop: function() {
            null != this.id && (window.clearInterval(this.id), this.id = null)
        },
        __class__: T
    };
    Q = function(a) {
        this.buf = a;
        this.length =
            a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = Q.DEFAULT_RESOLVER;
        null == a && (a = O, Q.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    k["haxe.Unserializer"] = Q;
    Q.__name__ = ["haxe", "Unserializer"];
    Q.initCodes = function() {
        for (var a = [], b = 0, c = Q.BASE64.length; b < c;) {
            var e = b++;
            a[Q.BASE64.charCodeAt(e)] = e
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
                    return s.parseFloat(B.substr(this.buf, a, this.pos - a));
                case 121:
                    b = this.readDigits();
                    if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < b) throw "Invalid string length";
                    a = B.substr(this.buf, this.pos, b);
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
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) : a.push(this.unserialize())
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
                    b = O.createEmptyInstance(a);
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
                        e = O.getEnumConstructs(a)[c];
                    if (null == e) throw "Unknown enum index " + b + "@" + c;
                    b = this.unserializeEnum(a, e);
                    this.cache.push(b);
                    return b;
                case 108:
                    b = new da;
                    for (this.cache.push(b); 104 != this.buf.charCodeAt(this.pos);) b.add(this.unserialize());
                    this.pos++;
                    return b;
                case 98:
                    c = new G;
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
                    return b = B.strDate(B.substr(this.buf, this.pos, 19)), this.cache.push(b), this.pos += 19, b;
                case 115:
                    b = this.readDigits();
                    c = this.buf;
                    if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < b) throw "Invalid bytes length";
                    e = Q.CODES;
                    null == e && (e = Q.initCodes(), Q.CODES = e);
                    for (var a = this.pos, f = b & 3, g = a + (b - f), h = V.Bytes.alloc(3 * (b >> 2) + (2 <= f ? f - 1 : 0)), i = 0; a < g;) {
                        var j = e[c.charCodeAt(a++)],
                            k = e[c.charCodeAt(a++)];
                        h.b[i++] = (j << 2 | k >> 4) & 255;
                        j = e[c.charCodeAt(a++)];
                        h.b[i++] = (k << 4 | j >> 2) & 255;
                        k = e[c.charCodeAt(a++)];
                        h.b[i++] = (j << 6 | k) & 255
                    }
                    2 <= f && (j = e[c.charCodeAt(a++)], k = e[c.charCodeAt(a++)], h.b[i++] = (j << 2 | k >> 4) & 255, 3 == f && (j = e[c.charCodeAt(a++)], h.b[i++] = (k << 4 | j >> 2) & 255));
                    this.pos += b;
                    this.cache.push(h);
                    return h;
                case 67:
                    b = this.unserialize();
                    a = this.resolver.resolveClass(b);
                    if (null == a) throw "Class not found " + b;
                    b = O.createEmptyInstance(a);
                    this.cache.push(b);
                    b.hxUnserialize(this);
                    if (103 != this.buf.charCodeAt(this.pos++)) throw "Invalid custom data";
                    return b
            }
            this.pos--;
            throw "Invalid char " +
                this.buf.charAt(this.pos) + " at position " + this.pos;
        },
        unserializeEnum: function(a, b) {
            if (58 != this.buf.charCodeAt(this.pos++)) throw "Invalid enum format";
            var c = this.readDigits();
            if (0 == c) return O.createEnum(a, b);
            for (var e = []; 0 < c--;) e.push(this.unserialize());
            return O.createEnum(a, b, e)
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >= this.length) throw "Invalid object";
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if (!M.__instanceof(b, String)) throw "Invalid object key";
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var e = this.buf.charCodeAt(this.pos);
                if (e != e) break;
                if (45 == e) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 > e || 57 < e) break;
                    a = 10 * a + (e - 48)
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
    D = {
        _Fast: {}
    };
    D._Fast.NodeAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.NodeAccess"] = D._Fast.NodeAccess;
    D._Fast.NodeAccess.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
    D._Fast.NodeAccess.prototype = {
        resolve: function(a) {
            var b = this.__x.elementsNamed(a).next();
            if (null == b) throw (this.__x.nodeType == v.Document ? "Document" : this.__x.getNodeName()) + " is missing element " +
                a;
            return new D.Fast(b)
        },
        __class__: D._Fast.NodeAccess
    };
    D._Fast.AttribAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.AttribAccess"] = D._Fast.AttribAccess;
    D._Fast.AttribAccess.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
    D._Fast.AttribAccess.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == v.Document) throw "Cannot access document attribute " + a;
            var b = this.__x.get(a);
            if (null == b) throw this.__x.getNodeName() + " is missing attribute " + a;
            return b
        },
        __class__: D._Fast.AttribAccess
    };
    D._Fast.HasAttribAccess =
        function(a) {
            this.__x = a
        };
    k["haxe.xml._Fast.HasAttribAccess"] = D._Fast.HasAttribAccess;
    D._Fast.HasAttribAccess.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
    D._Fast.HasAttribAccess.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == v.Document) throw "Cannot access document attribute " + a;
            return this.__x.exists(a)
        },
        __class__: D._Fast.HasAttribAccess
    };
    D._Fast.HasNodeAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.HasNodeAccess"] = D._Fast.HasNodeAccess;
    D._Fast.HasNodeAccess.__name__ = ["haxe", "xml", "_Fast",
        "HasNodeAccess"
    ];
    D._Fast.HasNodeAccess.prototype = {
        resolve: function(a) {
            return this.__x.elementsNamed(a).hasNext()
        },
        __class__: D._Fast.HasNodeAccess
    };
    D._Fast.NodeListAccess = function(a) {
        this.__x = a
    };
    k["haxe.xml._Fast.NodeListAccess"] = D._Fast.NodeListAccess;
    D._Fast.NodeListAccess.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
    D._Fast.NodeListAccess.prototype = {
        resolve: function(a) {
            for (var b = new da, a = this.__x.elementsNamed(a); a.hasNext();) {
                var c = a.next();
                b.add(new D.Fast(c))
            }
            return b
        },
        __class__: D._Fast.NodeListAccess
    };
    D.Fast = function(a) {
        if (a.nodeType != v.Document && a.nodeType != v.Element) throw "Invalid nodeType " + s.string(a.nodeType);
        this.x = a;
        this.node = new D._Fast.NodeAccess(a);
        this.nodes = new D._Fast.NodeListAccess(a);
        this.att = new D._Fast.AttribAccess(a);
        this.has = new D._Fast.HasAttribAccess(a);
        this.hasNode = new D._Fast.HasNodeAccess(a)
    };
    k["haxe.xml.Fast"] = D.Fast;
    D.Fast.__name__ = ["haxe", "xml", "Fast"];
    D.Fast.prototype = {
        getElements: function() {
            var a = this.x.elements();
            return {
                hasNext: u(a, a.hasNext),
                next: function() {
                    var b =
                        a.next();
                    return null == b ? null : new D.Fast(b)
                }
            }
        },
        getInnerHTML: function() {
            for (var a = new Z, b = this.x.iterator(); b.hasNext();) {
                var c = b.next();
                a.b += s.string(c.toString())
            }
            return a.b
        },
        getInnerData: function() {
            var a = this.x.iterator();
            if (!a.hasNext()) throw this.getName() + " does not have data";
            var b = a.next(),
                c = a.next();
            if (null != c) {
                if (b.nodeType == v.PCData && c.nodeType == v.CData && "" == R.trim(b.getNodeValue()) && (b = a.next(), null == b || b.nodeType == v.PCData && "" == R.trim(b.getNodeValue()) && null == a.next())) return c.getNodeValue();
                throw this.getName() + " does not only have data";
            }
            if (b.nodeType != v.PCData && b.nodeType != v.CData) throw this.getName() + " does not have data";
            return b.getNodeValue()
        },
        getName: function() {
            return this.x.nodeType == v.Document ? "Document" : this.x.getNodeName()
        },
        __class__: D.Fast,
        __properties__: {
            get_name: "getName",
            get_innerData: "getInnerData"
        }
    };
    D.Parser = function() {};
    k["haxe.xml.Parser"] = D.Parser;
    D.Parser.__name__ = ["haxe", "xml", "Parser"];
    D.Parser.parse = function(a) {
        var b = v.createDocument();
        D.Parser.doParse(a, 0, b);
        return b
    };
    D.Parser.doParse = function(a, b, c) {
        null == b && (b = 0);
        for (var e = null, f = 1, g = 1, h = null, i = 0, j = 0, k = 0, l = a.charCodeAt(b); l == l;) {
            switch (f) {
                case 0:
                    switch (l) {
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
                    switch (l) {
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
                    60 == l && (f = v.createPCData(B.substr(a, i, b - i)), c.addChild(f), j++, f = 0, g = 2);
                    break;
                case 17:
                    93 == l && 93 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (f = v.createCData(B.substr(a, i, b - i)), c.addChild(f), j++, b += 2, f = 1);
                    break;
                case 2:
                    switch (l) {
                        case 33:
                            if (91 == a.charCodeAt(b + 1)) {
                                b += 2;
                                if ("CDATA[" != B.substr(a, b, 6).toUpperCase()) throw "Expected <![CDATA[";
                                b += 5;
                                f = 17
                            } else if (68 == a.charCodeAt(b + 1) || 100 == a.charCodeAt(b + 1)) {
                                if ("OCTYPE" != B.substr(a, b + 2, 6).toUpperCase()) throw "Expected <!DOCTYPE";
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
                    if (!(97 <=
                            l && 122 >= l || 65 <= l && 90 >= l || 48 <= l && 57 >= l || 58 == l || 46 == l || 95 == l || 45 == l)) {
                        if (b == i) throw "Expected node name";
                        e = v.createElement(B.substr(a, i, b - i));
                        c.addChild(e);
                        f = 0;
                        g = 4;
                        continue
                    }
                    break;
                case 4:
                    switch (l) {
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
                    if (!(97 <= l && 122 >= l || 65 <= l && 90 >= l || 48 <= l && 57 >= l || 58 == l || 46 == l || 95 == l || 45 == l)) {
                        if (i == b) throw "Expected attribute name";
                        h = B.substr(a, i, b - i);
                        if (e.exists(h)) throw "Duplicate attribute";
                        f = 0;
                        g = 6;
                        continue
                    }
                    break;
                case 6:
                    switch (l) {
                        case 61:
                            f =
                                0;
                            g = 7;
                            break;
                        default:
                            throw "Expected =";
                    }
                    break;
                case 7:
                    switch (l) {
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
                    l == a.charCodeAt(i) && (g = B.substr(a, i + 1, b - i - 1), e.set(h, g), f = 0, g = 4);
                    break;
                case 9:
                    i = b = D.Parser.doParse(a, b, e);
                    f = 1;
                    break;
                case 11:
                    switch (l) {
                        case 62:
                            f = 1;
                            break;
                        default:
                            throw "Expected >";
                    }
                    break;
                case 12:
                    switch (l) {
                        case 62:
                            return 0 == j && c.addChild(v.createPCData("")), b;
                        default:
                            throw "Expected >";
                    }
                case 10:
                    if (!(97 <= l && 122 >= l || 65 <= l && 90 >= l || 48 <= l && 57 >= l || 58 == l || 46 == l || 95 == l || 45 == l)) {
                        if (i ==
                            b) throw "Expected node name";
                        if (B.substr(a, i, b - i) != c.getNodeName()) throw "Expected </" + c.getNodeName() + ">";
                        f = 0;
                        g = 12;
                        continue
                    }
                    break;
                case 15:
                    45 == l && 45 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (c.addChild(v.createComment(B.substr(a, i, b - i))), b += 2, f = 1);
                    break;
                case 16:
                    91 == l ? k++ : 93 == l ? k-- : 62 == l && 0 == k && (c.addChild(v.createDocType(B.substr(a, i, b - i))), f = 1);
                    break;
                case 14:
                    63 == l && 62 == a.charCodeAt(b + 1) && (b++, f = B.substr(a, i + 1, b - i - 2), c.addChild(v.createProlog(f)), f = 1)
            }
            l = a.charCodeAt(++b)
        }
        1 == f && (i = b, f = 13);
        if (13 == f) return (b !=
            i || 0 == j) && c.addChild(v.createPCData(B.substr(a, i, b - i))), b;
        throw "Unexpected end";
    };
    Array.prototype.indexOf ? B.remove = function(a, b) {
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
    v.Element = "element";
    v.PCData = "pcdata";
    v.CData = "cdata";
    v.Comment = "comment";
    v.DocType = "doctype";
    v.Prolog = "prolog";
    v.Document = "document";
    "undefined" != typeof document && (x.document = document);
    "undefined" != typeof window && (x.window = window, x.window.onerror = function(a, b, c) {
        var e = x.onerror;
        return null == e ? !1 : e(a, [b + ":" + c])
    });
    "undefined" != typeof JSON && (Y = JSON);
    c.ConstantsApp.STAGE_WIDTH = 960;
    c.ConstantsApp.STAGE_HEIGHT = 560;
    c.ConstantsApp.STAGE_CENTER_X = 480;
    c.ConstantsApp.STAGE_CENTER_Y = 280;
    c.ConstantsApp.GRAVITY = 1250;
    c.ConstantsApp.HELP_WATCHED = [!1, !1, !1, !1, !1];
    c.ConstantsApp.LAYER_BG = "layer_bg";
    c.ConstantsApp.LAYER_PLAYER = "layer_player";
    c.ConstantsApp.LAYER_FG = "layer_fg";
    c.ConstantsApp.LAYER_BG_BACK =
        "bbk";
    c.ConstantsApp.LAYER_MIDBACK = "bmb";
    c.ConstantsApp.LAYER_BG_MID = "bbm";
    c.ConstantsApp.LAYER_BG_FRONT = "bbf";
    c.ConstantsApp.EVENT_PAUSE = "eventPause";
    c.ConstantsApp.EVENT_UNPAUSE = "eventUnpause";
    c.ConstantsApp.EVENT_MUTE_TOGGLE = "EVENT_MUTE_TOGGLE";
    c.ConstantsApp.EVENT_WORLD_GENERATION_COMPLETE = "EVENT_WORLD_GENERATION_COMPLETE";
    c.ConstantsApp.EVENT_INPUT_FIELD_ENTER = "EVENT_INPUT_FIELD_ENTER";
    c.ConstantsApp.EVENT_E1_SPAWN_THROW = "onPlayerThrow";
    c.ConstantsApp.EVENT_E1_SPAWN_DUST = "onDustCreate";
    c.ConstantsApp.EVENT_E1_SPAWN_SHARD =
        "onShardCreate";
    c.ConstantsApp.EVENT_E2_ZAP_ENEMIES = "onZapEnemies";
    c.ConstantsApp.EVENT_E3_SHOCK = "onShockEnemies";
    c.ConstantsApp.EVENT_E3_SPAWN_SHARD = "onSpawnShard";
    c.ConstantsApp.EVENT_E3_SPAWN_SPLASH = "onSpawnSplash";
    c.ConstantsApp.EVENT_E4_SPAWN_SHARD = "onSpawnShard";
    c.ConstantsApp.EVENT_SPECIAL_DOWN = "onSpecDown";
    c.ConstantsApp.EVENT_SPECIAL_UP = "onSpecUp";
    c.ConstantsApp.BOOL_GAME_LOSE = "bool_game_lose";
    c.ConstantsApp.BOOL_GAME_WIN = "bool_game_win";
    c.ConstantsApp.BOOL_LEVEL_LOSE = "bool_level_lose";
    c.ConstantsApp.BOOL_LEVEL_WIN =
        "bool_level_win";
    c.ConstantsApp.BOOL_GAMEOVER = "bool_gameover";
    c.ConstantsApp.BOOL_LAST_GAME_WON = "bool_lastgamewon";
    c.ConstantsApp.BOOL_PAUSED = "bool_paused";
    c.ConstantsApp.BOOL_INPUT_LOCK = "bool_inputlock";
    c.ConstantsApp.BOOL_TOUCH_DEVICE = "bool_touch_device";
    c.ConstantsApp.BOOL_ORIENTATION_ALERT = "bool_orientation_alert";
    c.ConstantsApp.BOOL_LOCAL_TEXT_LOADED = "bool_local_text_loaded";
    c.ConstantsApp.INT_HEALTH = "int_health";
    c.ConstantsApp.INT_LIVES = "int_lives";
    c.ConstantsApp.INT_SCORE = "int_score";
    c.ConstantsApp.INT_LOADING_PROGRESS =
        "int_loading_progress";
    c.ConstantsApp.INT_EPISODE = "string_episode";
    c.ConstantsApp.INT_GROUND_LEVEL = "int_ground_level";
    c.ConstantsApp.FLOAT_CHARGE = "float_charge";
    c.ConstantsApp.INPUT_CLICK = "input_click";
    c.ConstantsApp.INPUT_SPACE = "input_space";
    c.ConstantsApp.INPUT_Z = "input_z";
    c.ConstantsApp.INPUT_X = "input_x";
    c.ConstantsApp.INPUT_C = "input_c";
    c.ConstantsApp.INPUT_P = "input_p";
    c.ConstantsApp.INPUT_UP = "input_up";
    c.ConstantsApp.INPUT_DOWN = "input_down";
    c.ConstantsApp.INPUT_LEFT = "input_left";
    c.ConstantsApp.INPUT_RIGHT =
        "input_right";
    c.ConstantsApp.CONFIG_XML_PATH = "config/config.xml";
    c.ConstantsApp.OPTION_SILENCE_AUDIO = !1;
    c.ConstantsApp.OPTION_SHOW_LOADING_ON_PLAY_AGAIN = !0;
    c.ConstantsApp.OPTION_SHOW_HITBOXES = !1;
    c.ConstantsApp.LOAD_FONT_EARLY = !1;
    c.ConstantsApp.episodeToTest = 5;
    c.ConstantsApp.scaleFactor = 1;
    c.ConstantsApp._E4SLOPE = 150;
    c.ConstantsScreen.SCREEN_LOADING = "loadpanel";
    c.ConstantsScreen.SCREEN_LOADING_OVERLAY = "loadoverlay";
    c.ConstantsScreen.SCREEN_SPLASH = "splash";
    c.ConstantsScreen.SCREEN_HELP = "help";
    c.ConstantsScreen.SCREEN_GAMEPLAY_HUD =
        "gameplayhud";
    c.ConstantsScreen.SCREEN_GAMEPLAY_MENU = "gameplaymenu";
    c.ConstantsScreen.SCREEN_QUIT_CONFIRM = "quitconfirm";
    c.ConstantsScreen.SCREEN_END_GAME = "endgame";
    c.ConstantsScreen.SCREEN_CUTSCENE_BORDERS = "cutsceneborders";
    c.ConstantsScreen.SCREEN_PAUSE_ALERT = "pause";
    c.ConstantsScreen.SCREEN_INTRO = "intro";
    c.ConstantsScreen.SCREEN_OUTRO = "outro";
    c.ConstantsScreen.TRANSITION_FADE = 0;
    c.ConstantsScreen.TRANSITION_SCROLL = 1;
    c.ConstantsScreen.TRANSITION_SCROLL_DOWN = 2;
    c.ConstantsScreen.TRANSITION_SCROLL_UP =
        3;
    c.ConstantsScreen.TRANSITION_STAGED = 4;
    c.ConstantsScreen.TRANSITION_SCREENSHOT = 5;
    c.ConstantsScreen.CHANGE_OPEN_BEGIN = 0;
    c.ConstantsScreen.CHANGE_OPEN_COMPLETE = 1;
    c.ConstantsScreen.CHANGE_CLOSE_BEGIN = 2;
    c.ConstantsScreen.CHANGE_CLOSE_COMPLETE = 3;
    c.ConstantsScreen.OUTPUT_OPENED = 0;
    c.ConstantsScreen.OUTPUT_CLOSED = 1;
    c.ConstantsScreen.CONDITION_CLOSED_ALL = 0;
    c.ConstantsScreen.CONDITION_CLOSED_SPECIFIC = 1;
    c.ConstantsScreen.CONDITION_TRANSITION_MIDWAY = 2;
    c.ConstantsScreen.CONDITION_TRANSITION_COMPLETE = 3;
    c.ConstantsScreen.CONDITION_IMMEDIATE =
        4;
    c.ConstantsScreen.FLOW_SPLASH_PLAY = "FLOW_SPLASH_PLAY";
    c.ConstantsScreen.FLOW_INTRO_CONTINUE = "FLOW_INTRO_CONTINUE";
    c.ConstantsScreen.FLOW_OUTRO_CONTINUE = "FLOW_OUTRO_CONTINUE";
    c.ConstantsScreen.FLOW_HELP_CLOSE = "FLOW_HELP_CLOSE";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU = "FLOW_GAMEPLAY_MENU";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE = "FLOW_GAMEPLAY_MENU_CLOSE";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP = "FLOW_GAMEPLAY_MENU_HELP";
    c.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT = "FLOW_GAMEPLAY_MENU_QUIT";
    c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES =
        "FLOW_GAMEPLAY_QUIT_YES";
    c.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO = "FLOW_GAMEPLAY_QUIT_NO";
    c.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN = "FLOW_END_GAME_PLAY_AGAIN";
    c.ConstantsScreen.FLOW_END_GAME_RETURN = "FLOW_END_GAME_RETURN";
    c.ConstantsScreen.FLOW_BRANCH_GAME_WIN = "FLOW_BRANCH_GAME_WIN";
    c.ConstantsScreen.FLOW_BRANCH_GAME_LOSE = "FLOW_BRANCH_GAME_LOSE";
    c.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN = "FLOW_BRANCH_LEVEL_WIN";
    c.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE = "FLOW_BRANCH_LEVEL_LOSE";
    j.buttons.ButtonBase.UP =
        "workinBtnUp";
    j.buttons.ButtonBase.DOWN = "workinBtnDown";
    j.buttons.ButtonBase.CLICK = "workinBtnClick";
    j.buttons.ButtonBase.CANCEL_DRAG = "workinBtnCancelDrag";
    l.Display.EVENT_UPDATE_DISPLAY = "event_update_display";
    j.screens.data.ScreenStateData.ACTION_STOP = 0;
    j.screens.data.ScreenStateData.ACTION_OPENED = 1;
    j.screens.data.ScreenStateData.ACTION_EVENT = 2;
    j.screens.data.ScreenStateData.ACTION_NEW_STATE = 3;
    j.screens.data.ScreenStateData.ACTION_CLOSED = 4;
    j.screens.data.ScreenStateData.ACTION_FLOW = 5;
    h.elements.Portrait._sparkles =
        4;
    h.elements.Portrait._sparkleRadius = 100;
    h.elements.entities.HelpBox._STATE_INACTIVE = 14;
    h.elements.entities.episode1.E1Monster._SINAMP = 100;
    h.elements.entities.episode1.E1Monster._FORWARD_MOVEMENT = 15;
    h.elements.entities.episode1.E1Monster._HURT_FALLBACK = 75;
    h.elements.entities.episode5.E5KillWall._SINAMP = 25;
    y.ConstantsCloud.FONT_DEFAULT = "Basic";
    y.ConstantsCloud.STRING_REGION_ID = "cloudregionid";
    y.ConstantsCloud.LOCALIZATION_XML_PATH = "config/";
    y.ConstantsCloud.EVENT_FILES_LOADED = "EVENT_WORKINCLOUD_FILES_LOADED";
    y.ConstantsCloud.EVENT_FILES_LOADING = "EVENT_FILES_LOADING";
    y.ConstantsCloud.EVENT_FILES_ERROR = "EVENT_FILES_ERROR";
    y.ConstantsCloud.EVENT_TWEENS_COMPLETE = "EVENT_TWEENS_COMPLETE";
    y.ConstantsCloud.EVENT_INPUT_ARBITRARY_KEY = "EVENT_INPUT_ARBITRARY_KEY";
    y.ConstantsCloud._uniqueId = 0;
    l.PoolManager.ALL_POOLS_FULL = "PoolManager_ALL_POOLS_FULL";
    n.WMEventFlow.EVENT_FLOW = "Nflow";
    n.WMEventInput.EVENT_INPUT = "eventinput";
    n.WMEventInput.PHASE_DOWN = 1;
    n.WMEventInput.PHASE_UP = 0;
    n.WMEventInput.PHASE_MOVE = 2;
    n.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT =
        "Neio";
    n.WMEventScreenOut.EVENT_SCREEN_OUTPUT = "Neso";
    n.WMEventUpdate.EVENT_UPDATE = "eventupdate";
    g.tween.PennerManager.EASE_LINEAR = "linear";
    g.tween.PennerManager.EASE = "ease";
    g.tween.PennerManager.EASE_QUAD = "quad";
    g.tween.PennerManager.EASE_IN = "easeIn";
    g.tween.PennerManager.EASE_QUAD_IN = "quadIn";
    g.tween.PennerManager.EASE_OUT = "easeOut";
    g.tween.PennerManager.EASE_QUAD_OUT = "quadOut";
    g.tween.PennerManager.EASE_EXPO = "expo";
    g.tween.PennerManager.EASE_EXPO_IN = "expoIn";
    g.tween.PennerManager.EASE_EXPO_OUT =
        "expoOut";
    g.tween.PennerManager.EASE_ELASTIC = "elastic";
    g.tween.PennerManager.EASE_ELASTIC_IN = "elasticIn";
    g.tween.PennerManager.EASE_ELASTIC_OUT = "elasticOut";
    g.tween.PennerManager.EASE_BUMP = "bump";
    g.tween.PennerManager.EASE_BUMP_IN = "bumpIn";
    g.tween.PennerManager.EASE_BUMP_OUT = "bumpOut";
    g.tween.PennerManager.EASE_BOUNCE = "bounce";
    g.tween.PennerManager.EASE_BOUNCE_IN = "bounceIn";
    g.tween.PennerManager.EASE_BOUNCE_OUT = "bounceOut";
    g.tween.PennerManager.EASE_CUBIC = "cubic";
    g.tween.PennerManager.EASE_CUBIC_IN =
        "cubicIn";
    g.tween.PennerManager.EASE_CUBIC_OUT = "cubicOut";
    g.tween.PennerManager.EASE_SPACE = "space";
    g.tween.PennerManager.EASE_SPACE_IN = "spaceIn";
    g.tween.PennerManager.EASE_SPACE_OUT = "spaceOut";
    g.tween.PennerManager.EASE_BLAST = "blast";
    g.tween.PennerManager.EASE_BLAST_IN = "blastIn";
    g.tween.PennerManager.EASE_BLAST_OUT = "blastOut";
    g.tween.PennerManager.EASE_WAVE = "wave";
    g.tween.PennerManager.EASE_WAVE_IN = "waveIn";
    g.tween.PennerManager.EASE_WAVE_OUT = "waveOut";
    g.tween.PennerManager.EASE_CIRCLE = "circle";
    g.tween.PennerManager.EASE_CIRCLE_IN =
        "circleIn";
    g.tween.PennerManager.EASE_CIRCLE_OUT = "circleOut";
    g.tween.WorkinTween.EVENT_TWEEN_CURRENT_COMPLETE = "wtETCC";
    g.tween.WorkinTween.EVENT_TWEENS_ALL_COMPLETE = "wtETAC";
    r.ServiceAnalytics._offlineUserId = "";
    r.ServiceAnalytics._offlineTrackingId = "";
    r.ServiceAnalytics._appId = "";
    r.ServiceAnalytics._sessionId = "";
    r.ServiceAnalytics._canadaShowGameTitle = "";
    r.ServiceAnalytics._flagInitted = !1;
    r.ServiceAnalytics._flagStarted = !1;
    r.ServiceAnalytics._flagLoaded = !1;
    r.ServiceAnalytics._flagCanadaTrackingEnabled = !1;
    r.ServiceAnalytics._DEFAULT_SHARED_OBJECT_ID = "nkcimocuresid";
    r.ServiceAnalytics.OPTION_ENABLE_TRACKING = !0;
    e.WMPointer._DELTA_ALLOWANCE = 30;
    e.WMPointer._DELTA_TIMEOUT = 0.2;
    e.WMSound.FADE_NONE = 0;
    e.WMSound.FADE_IN = 1;
    e.WMSound.FADE_OUT = -1;
    e.WorkinCloud.instance = new e.WorkinCloud;
    i.html.HtmlPlatform.instance = new i.html.HtmlPlatform;
    o.SignalBase.DISPATCHING_SENTINEL = new o.SignalConnection(null, null);
    A.root = new N;
    A.uncaughtError = new o.Signal1;
    A.hidden = new o.Value(!1);
    A.hasGPU = new o.Value(!1);
    A.volume = new F.AnimatedFloat(1);
    A._platform = i.html.HtmlPlatform.instance;
    A._calledInit = !1;
    K.logger = new o.Logger(A._platform.createLogHandler("flambe"));
    C.Manifest._buildManifest = C.Manifest.createBuildManifests();
    P = C.Manifest;
    z = (new X("\\b(Android)\\b", "")).match(x.window.navigator.userAgent) ? !1 : null != (new XMLHttpRequest).withCredentials;
    P._supportsCrossOrigin = z;
    p.Sprite._scratchPoint = new J.Point;
    i.BasicKeyboard._sharedEvent = new f.KeyboardEvent;
    i.BasicMouse._sharedEvent = new f.MouseEvent;
    i.BasicPointer._sharedEvent = new f.PointerEvent;
    i.html.CanvasRenderer.CANVAS_TEXTURES = (new X("(iPhone|iPod|iPad)", "")).match(x.window.navigator.userAgent);
    i.html.HtmlAssetPackLoader._mediaRefCount = 0;
    i.html.HtmlAssetPackLoader._detectBlobSupport = !0;
    i.html.HtmlUtil.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
    i.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = x.window.top == x.window && (new X("Mobile(/.*)? Safari", "")).match(x.window.navigator.userAgent);
    i.html.WebAudioSound._detectSupport = !0;
    U.USE_CACHE = !1;
    U.USE_ENUM_INDEX = !1;
    U.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    Q.DEFAULT_RESOLVER = O;
    Q.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    I.main()
})();