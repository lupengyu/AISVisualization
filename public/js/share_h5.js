    var CryptoJS = CryptoJS || function (e, m) {
        var p = {},
            j = p.lib = {},
            l = function () {},
            f = j.Base = {
                extend: function (a) {
                    l.prototype = this;
                    var c = new l;
                    a && c.mixIn(a);
                    c.hasOwnProperty("init") || (c.init = function () {
                        c.$super.init.apply(this, arguments)
                    });
                    c.init.prototype = c;
                    c.$super = this;
                    return c
                },
                create: function () {
                    var a = this.extend();
                    a.init.apply(a, arguments);
                    return a
                },
                init: function () {},
                mixIn: function (a) {
                    for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
            },
            n = j.WordArray = f.extend({
                init: function (a, c) {
                    a = this.words = a || [];
                    this.sigBytes = c != m ? c : 4 * a.length
                },
                toString: function (a) {
                    return (a || h).stringify(this)
                },
                concat: function (a) {
                    var c = this.words,
                        q = a.words,
                        d = this.sigBytes;
                    a = a.sigBytes;
                    this.clamp();
                    if (d % 4)
                        for (var b = 0; b < a; b++) c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4);
                    else if (65535 < q.length)
                        for (b = 0; b < a; b += 4) c[d + b >>> 2] = q[b >>> 2];
                    else c.push.apply(c, q);
                    this.sigBytes += a;
                    return this
                },
                clamp: function () {
                    var a = this.words,
                        c = this.sigBytes;
                    a[c >>> 2] &= 4294967295 <<
                        32 - 8 * (c % 4);
                    a.length = e.ceil(c / 4)
                },
                clone: function () {
                    var a = f.clone.call(this);
                    a.words = this.words.slice(0);
                    return a
                },
                random: function (a) {
                    for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * e.random() | 0);
                    return new n.init(c, a)
                }
            }),
            b = p.enc = {},
            h = b.Hex = {
                stringify: function (a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var b = [], d = 0; d < a; d++) {
                        var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                        b.push((f >>> 4).toString(16));
                        b.push((f & 15).toString(16))
                    }
                    return b.join("")
                },
                parse: function (a) {
                    for (var c = a.length, b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d,
                        2), 16) << 24 - 4 * (d % 8);
                    return new n.init(b, c / 2)
                }
            },
            g = b.Latin1 = {
                stringify: function (a) {
                    var c = a.words;
                    a = a.sigBytes;
                    for (var b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                    return b.join("")
                },
                parse: function (a) {
                    for (var c = a.length, b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
                    return new n.init(b, c)
                }
            },
            r = b.Utf8 = {
                stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(g.stringify(a)))
                    } catch (c) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function (a) {
                    return g.parse(unescape(encodeURIComponent(a)))
                }
            },
            k = j.BufferedBlockAlgorithm = f.extend({
                reset: function () {
                    this._data = new n.init;
                    this._nDataBytes = 0
                },
                _append: function (a) {
                    "string" == typeof a && (a = r.parse(a));
                    this._data.concat(a);
                    this._nDataBytes += a.sigBytes
                },
                _process: function (a) {
                    var c = this._data,
                        b = c.words,
                        d = c.sigBytes,
                        f = this.blockSize,
                        h = d / (4 * f),
                        h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0);
                    a = h * f;
                    d = e.min(4 * a, d);
                    if (a) {
                        for (var g = 0; g < a; g += f) this._doProcessBlock(b, g);
                        g = b.splice(0, a);
                        c.sigBytes -= d
                    }
                    return new n.init(g, d)
                },
                clone: function () {
                    var a = f.clone.call(this);
                    a._data = this._data.clone();
                    return a
                },
                _minBufferSize: 0
            });
        j.Hasher = k.extend({
            cfg: f.extend(),
            init: function (a) {
                this.cfg = this.cfg.extend(a);
                this.reset()
            },
            reset: function () {
                k.reset.call(this);
                this._doReset()
            },
            update: function (a) {
                this._append(a);
                this._process();
                return this
            },
            finalize: function (a) {
                a && this._append(a);
                return this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function (a) {
                return function (c, b) {
                    return (new a.init(b)).finalize(c)
                }
            },
            _createHmacHelper: function (a) {
                return function (b, f) {
                    return (new s.HMAC.init(a,
                        f)).finalize(b)
                }
            }
        });
        var s = p.algo = {};
        return p
    }(Math);
    (function () {
        var e = CryptoJS,
            m = e.lib,
            p = m.WordArray,
            j = m.Hasher,
            l = [],
            m = e.algo.SHA1 = j.extend({
                _doReset: function () {
                    this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                },
                _doProcessBlock: function (f, n) {
                    for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                        if (16 > a) l[a] = f[n + a] | 0;
                        else {
                            var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16];
                            l[a] = c << 1 | c >>> 31
                        }
                        c = (h << 5 | h >>> 27) + j + l[a];
                        c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^
                            k) - 899497514);
                        j = k;
                        k = e;
                        e = g << 30 | g >>> 2;
                        g = h;
                        h = c
                    }
                    b[0] = b[0] + h | 0;
                    b[1] = b[1] + g | 0;
                    b[2] = b[2] + e | 0;
                    b[3] = b[3] + k | 0;
                    b[4] = b[4] + j | 0
                },
                _doFinalize: function () {
                    var f = this._data,
                        e = f.words,
                        b = 8 * this._nDataBytes,
                        h = 8 * f.sigBytes;
                    e[h >>> 5] |= 128 << 24 - h % 32;
                    e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);
                    e[(h + 64 >>> 9 << 4) + 15] = b;
                    f.sigBytes = 4 * e.length;
                    this._process();
                    return this._hash
                },
                clone: function () {
                    var e = j.clone.call(this);
                    e._hash = this._hash.clone();
                    return e
                }
            });
        e.SHA1 = j._createHelper(m);
        e.HmacSHA1 = j._createHmacHelper(m)
    })();

    function md5(string) {
        function md5_RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function md5_AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function md5_F(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        function md5_G(x, y, z) {
            return (x & z) | (y & (~z));
        }

        function md5_H(x, y, z) {
            return (x ^ y ^ z);
        }

        function md5_I(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function md5_FF(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };

        function md5_GG(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };

        function md5_HH(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };

        function md5_II(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };

        function md5_ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        function md5_WordToHex(lValue) {
            var WordToHexValue = "",
                WordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };

        function md5_Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
        string = md5_Utf8Encode(string);
        x = md5_ConvertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = md5_AddUnsigned(a, AA);
            b = md5_AddUnsigned(b, BB);
            c = md5_AddUnsigned(c, CC);
            d = md5_AddUnsigned(d, DD);
        }
        return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
    }


    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return function () {
            return md5(s4() + s4() + (new Date()).getTime());
        };
    };

    var configWX = function (shareId, cb) {
        var ticketUrl = 'http://123.207.167.170:8765/auth';

        $.ajax({
            url: ticketUrl,
            async: true,
            success: function (data) {
                var wx_appid = shareId;
                var wx_ticket = data.res;
                if (typeof wx_appid == 'undefined' || typeof wx_ticket == 'undefined')
                    return false;

                var configData = {
                    debug: true,
                    appId: wx_appid,
                    timestamp: (Date.now() / 1000 | 0),
                    nonceStr: guid()(),
                    signature: '',
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
                };

                var myconfig = function (ticket, configData) {
                    var strs = new Array();
                    strs[0] = 'jsapi_ticket=' + ticket;
                    strs[1] = 'noncestr=' + configData['nonceStr'];
                    strs[2] = 'timestamp=' + configData['timestamp'].toString();
                    strs[3] = 'url=' + location.href.split('#')[0];
                    str = strs.join('&');
                    sig = CryptoJS.SHA1(str);
                    configData['signature'] = sig.toString();
                    wx.config(configData);
                };

                myconfig(wx_ticket, configData);

                if (typeof cb == 'function') {
                    cb();
                }
            },
            error: function (xhr, data) {
                console.error(xhr);
            }
        });

    }