(function() {
    function a() {}
    for (var b, c = "assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "), e = c.length, d = window.console = window.console || {}; e--;) b = c[e], d[b] || (d[b] = a)
})();
var fs = require("fs");
Config = {
    load: function() {
        var a;
        try {
            a = fs.readFileSync(ConfigDir + "html5wallet.conf"), a = JSON.parse(a)
        } catch (b) {
            if ("ENOENT" != b.code) {
                Modal.alert("Error", "Error loading config file: " + b.toString());
                return
            }
            a = {}
        }
        Config.fee = Math.max(a.fee || 0, .001);
        Config.minimizeToTray = a.minimizeToTray || !1;
        Config.minimizeOnClose = a.minimizeOnClose || !1;
        Config.theme = a.theme || "default";
        Config.themeIsInternal = a.themeIsInternal || !0;
        Config.addresses = a.addresses || {
            mine: [],
            others: []
        };
        Config.addresses.mine = Config.addresses.mine || [];
        Config.addresses.others = Config.addresses.others || []
    },
    save: function() {
        var a = {};
        $.each(Config, function(b, e) {
            "save" != b && "load" != b && (a[b] = e)
        });
        try {
            fs.writeFileSync(ConfigDir + "html5wallet.conf", JSON.stringify(a))
        } catch (b) {
            Modal.alert("File System Error", "Error saving config file: " + b.toString())
        }
    }
};
var fs = require("fs"),
    assert = require("assert");
Theme = {
    B: function(a) {
        assert(fs.existsSync(a));
        return function() {
            $('link[href*="themes/"]').remove();
            $("head").append('<link rel="stylesheet" href="' + a + '">')
        }
    },
    O: function(a) {
        return {
            o: !0,
            name: a,
            apply: Theme.B("css/themes/" + a + ".css"),
            D: "img/" + a + ".png"
        }
    },
    N: function(a) {
        var b = ConfigDir + "themes/" + a + "/theme.css",
            c = ConfigDir + "themes/" + a + "/preview.png";
        fs.existsSync(c) || (c = "img/no-preview.png");
        return {
            o: !1,
            name: a,
            apply: Theme.B(b),
            D: c
        }
    },
    f: null,
    U: function(a, b) {
        var c = Theme.f.filter(function(c) {
            return c.name == a &&
                c.o == b
        });
        0 < c.length && c[0].apply()
    },
    A: function() {
        try {
            var a = ConfigDir + "themes/";
            fs.readdirSync(a).forEach(function(b) {
                fs.lstatSync(a + b).isDirectory() && fs.existsSync(a + b + "/theme.css") && Theme.f.push(Theme.N(b))
            })
        } catch (b) {
            "ENOENT" != b.code && Modal.alert("File System Error", b.message)
        }
    },
    Q: function() {
        Theme.f = [];
        fs.readdirSync("css/themes").forEach(function(a) {
            ".css" == a.substr(a.length - 4) && Theme.f.push(Theme.O(a.substr(0, a.length - 4)))
        });
        Theme.A()
    },
    R: function() {
        Theme.f = Theme.f.filter(function(a) {
            return a.o
        });
        Theme.A()
    }
};
var m = require("bitcoin"),
    p = require("crypto");
RPC = {
    a: null,
    P: function(a, b, c, e, d, h) {
        function f() {
            RPC.a.getInfo(function(a, b) {
                "v3.1.0.0-g32a928e" === b.version && h()
            })
        }

        function g() {
            RPC.a.dumpWallet("$test$.dat", function(a) {
                a = !!a;
                RPC.a.i = a;
                RPC.a.e = a;
                RPC.a.g = !a;
                a || fs.unlinkSync("$test$.dat");
                f()
            })
        }

        function l(a) {
            a ? setTimeout(function() {
                k.getBalance("*", 1, l)
            }, 1E3) : (RPC.a = k, g())
        }
        if (d) RPC.a = {
            getBalance: function(a, b, c) {
                c(null, 15247.00012)
            },
            sendToAddress: function(a, b, c) {
                c(null, "")
            },
            listTransactions: function(a, b, c) {
                c(null, [{
                    address: "iX8ccBLRqCiKGu8V2E33cErE8dmpHxcfBm",
                    category: "send",
                    amount: -5200,
                    fee: -.001,
                    confirmations: 3868,
                    blockhash: "3d7e4167918a134beef223f64f8225f1208fb385561fedd1de5d2916d62e9236",
                    blockindex: 2,
                    blocktime: 1409954240,
                    txid: "958b84928e2beea264f2d9e5ef43056b25d7f3e13d4c758426912be29e5ac533",
                    time: 1409954205,
                    timereceived: 1409954205
                }, {
                    address: "iX8ccBLRqCiKGu8V2E33cErE8dmpHxcfBm",
                    category: "receive",
                    amount: 20809.27917865,
                    confirmations: 3418,
                    blockhash: "db17d787c20a671f4019bfae105e65e4afae03c92fccdd6867b05c7b3c7a5cfb",
                    blockindex: 2,
                    blocktime: 1409983936,
                    txid: "7168aecf62c158a9d060ccd1690b983afd7b9be028e0d612f26f2d6aa59d96e5",
                    time: 1409983873,
                    timereceived: 1409983873
                }, {
                    address: "iX8ccBLRqCiKGu8V2E33cErE8dmpHxcfBm",
                    category: "generate",
                    amount: 20.27917865,
                    confirmations: 3418,
                    blockhash: "db17d787c20a671f4019bfae105e65e4afae03c92fccdd6867b05c7b3c7a5cfb",
                    blockindex: 2,
                    blocktime: 1409983936,
                    txid: "7168aecf62c158a9d060ccd1690b983afd7b9be028e0d612f26f2d6aa59d96e5",
                    time: 1409983873,
                    timereceived: 1409983873
                }])
            },
            getConnectionCount: function(a) {
                a(null, 8)
            },
            getNewAddress: function(a) {
                a(null, "ipnGUVGFn6M4Qfpih6rSLPpDud" + p.randomBytes(4).toString("hex"))
            },
            validateAddress: function(a, b) {
                b(null, {
                    isvalid: !0,
                    ismine: !0
                })
            },
            getBlockCount: function(a) {
                a(null, 91230)
            },
            dumpWallet: function(a, b) {
                b(!0)
            },
            walletLock: function(a) {
                a(null)
            },
            walletPassphrase: function(a, b, c, d) {
                d(null)
            },
            walletPassphraseChange: function(a, b, c) {
                c(null)
            },
            encryptWallet: function(a) {
                a(null)
            },
            getStakingInfo: function(a) {
                a(null, {
                    expectedtime: 12900
                })
            },
            getInfo: function(a) {
                a(null, {
                    balance: 1265.1009,
                    stake: 0,
                    version: "v3.0.1.0-g32a928e"
                })
            },
            setTxFee: function(a, b) {
                b(null, !0)
            },
            i: !0,
            g: !1,
            e: !0
        }, setTimeout(h, 1E3);
        else {
            var k = new m.Client({
                host: a,
                port: b,
                user: c,
                pass: e,
                timeout: 4E3
            });
            k.getBalance("*", 1, l)
        }
    }
};
var http = require("http");
assert = require("assert");

function s(a, b) {
    this.b = a;
    this.l = b || null;
    if (b) {
        var c = this;
        b.click(function() {
            t(c)
        })
    }
}
s.prototype.n = function() {};
s.prototype.G = function() {};
s.prototype.refresh = function() {};
var u = null;

function t(a) {
    var b = u;
    assert(a);
    assert(b);
    b.b.hide();
    b.G();
    b.l && b.l.removeClass("active");
    a.l && a.l.addClass("active");
    a.n();
    a.refresh();
    a.b.show();
    u = a
};

function v() {
    var a = $(".js-loading-panel");
    s.call(this, a);
    u = this
}
v.prototype = Object.create(s.prototype);
new v;
var util = require("util"),
    https = require("https"),
    http = require("http");

function w() {
    function a(a) {
        var b, c;
        b = [];
        c = new RegExp(a, "i");
        $.each(Config.addresses.others, function(a, d) {
            (c.test(d.label) || c.test(d.address)) && b.push(d)
        });
        g.d && $.each(g.d, function(a, d) {
            (c.test(d.username + "-io") || c.test(d.address)) && b.push({
                label: d.username + "-io",
                address: d.address
            })
        });
        return b
    }

    function b() {
        setTimeout(function() {
            k.find("> :not(.js-suggestion-prototype)").remove()
        }, 100)
    }
    var c = $(".js-tab-balance-content"),
        e = $(".js-tab-balance");
    s.call(this, c, e);
    this.b = c;
    this.k = $(".js-sync");
    this.L = this.k.find(".js-progress");
    this.K = this.k.find(".js-caption");
    var d = c.find(".js-balance-panel"),
        h = c.find(".js-payment-panel"),
        f = h.find("form");
    d.find(".js-payment-panel-toggle").click(function() {
        d.fadeOut(function() {
            h.fadeIn()
        })
    });
    f.find(".payment-button").click(function() {
        function a() {
            RPC.a.sendToAddress(b, c, function(a) {
                a ? "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message) : h.fadeOut(function() {
                    d.fadeIn()
                })
            })
        }
        var b = f.find(".js-payee")[0].value,
            c = parseFloat(f.find("#js-amount")[0].value);
        if ("" != b && !isNaN(c)) {
            g.d && $.each(g.d,
                function(a, c) {
                    c.username.toLowerCase() + "-io" === b.toLowerCase() && (b = c.address)
                });
            var e = util.format("Send <strong>%d IOC</strong> to <strong><small>%s</small></strong>?", c, b);
            Modal.confirm("Confirm Send", e, function() {
                if (RPC.a.e) return Modal.p("Unlock Wallet", "Enter your passphrase to continue.", "Passphrase", function(b) {
                    RPC.a.walletPassphrase(b, 1, !1, function(b) {
                        if (b) {
                            if (-14 == b.code) return Modal.j(), !1;
                            "ETIMEDOUT" != b.code && Modal.alert("RPC Error", b.message);
                            return !1
                        }
                        a()
                    });
                    return !0
                }), !1;
                a();
                return !0
            })
        }
    });
    f.find("input").focus(function() {
        var a = f.find("label[for='" + this.id + "']").parent();
        a.hasClass("active") || a.addClass("active")
    }).blur(function() {
        var a = f.find("label[for='" + this.id + "']").parent();
        "" == this.value && a.hasClass("active") && a.removeClass("active")
    });
    var g = this;
    g.d = null;
    var l = f.find(".js-payee"),
        k = f.find(".js-suggestions"),
        n = k.find(".js-suggestion-prototype");
    l.blur(function() {
        setTimeout(b, 100)
    }).keyup(function() {
        k.find("> :not(.js-suggestion-prototype)").remove();
        var c = l.val();
        1 > c.length ||
            a(c).forEach(function(a) {
                var c = n.clone();
                k.append(c);
                c.removeClass("js-suggestion-prototype hide");
                c.find(".js-label").text(a.label);
                c.find(".js-address").text(a.address);
                c.click(function() {
                    l.val(a.address);
                    b()
                })
            })
    })
}
w.prototype = Object.create(s.prototype);
var x = new w;
w.prototype.n = function() {
    var a = this.b,
        b = a.find(".js-balance-panel"),
        a = a.find(".js-payment-panel");
    "none" != a.css("display") && (a.hide(), b.show());
    var c = this;
    $(".js-status").show()
};
w.prototype.G = function() {
    $(".js-sync").hide();
    $(".js-status").hide()
};
w.prototype.refresh = function() {
    function a() {
        RPC.a.getInfo(function(a, b) {
            if (a) "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message);
            else {
                var c = b.stake,
                    e = b.balance.toString().split("."),
                    l = e[0],
                    e = 1 < e.length ? e[1] : null,
                    k = l,
                    n = l.length,
                    q = $(".js-balance"),
                    r = $(".js-stake-amount");
                e && (k = l + '.<span class="spendable-decimal">' + e + "</span>", n += e.length);
                q.html(k);
                r.text(c);
                12 < n && (15 < n ? q.css("font-size", "4em") : q.css("font-size", "5em"))
            }
        })
    }

    function b(b) {
        b || (b = "???");
        RPC.a.getStakingInfo(function(c, e) {
            if (c) "ETIMEDOUT" !=
                c.code && Modal.alert("RPC Error", c.message);
            else {
                var g = e.expectedtime,
                    g = 0 <= g ? util.format("Staking reward in %s", 60 > g ? (g | 1) + " secs" : 3600 > g ? (g / 60 | 1) + " mins" : 86400 > g ? (g / 60 / 60 | 1) + " hours" : (g / 60 / 60 / 24 | 1) + " days") : RPC.a.g ? "No mature coins to stake" : "Click lock button to enable staking",
                    g = util.format("Last block: %s - %s", b, g);
                $(".js-status").text(g);
                a()
            }
        })
    }

    function c(a, c) {
        if (u == e) {
            if (c && 0 >= c - a) e.k.hide();
            else {
                var f, g;
                c ? (f = a / c * 100 | 0, g = util.format("Syncing wallet (%d / %d blocks)", a, c)) : (f = 0, g = util.format("Syncing wallet (%d / ??? blocks)",
                    a));
                e.k.show();
                e.L.attr("value", f);
                e.K.text(g)
            }
            b(c)
        }
    }
    var e = this;
    (function() {
        RPC.a.getBlockCount(function(a, b) {
            if (a) "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message);
            else https.get("https://chainz.cryptoid.info/explorer/index.data.dws?coin=ioc", function(a) {
                var d = "";
                a.on("data", function(a) {
                    d += a
                });
                a.on("end", function() {
                    try {
                        var a = JSON.parse(d).blocks[0].height;
                        c(b, a)
                    } catch (e) {
                        c(b)
                    }
                });
                a.on("error", function() {
                    c(b)
                })
            }).on("error", function() {
                c(b)
            })
        })
    })()
};
util = require("util");

function y() {
    var a = $(".js-tab-transaction-content"),
        b = $(".js-tab-transaction");
    s.call(this, a, b);
    this.b = a;
    this.t = a.find(".js-show-sent-button");
    this.s = a.find(".js-show-received-button");
    this.r = a.find(".js-show-all-button");
    this.t.click(this.m.bind(this, "sent"));
    this.s.click(this.m.bind(this, "received"));
    this.r.click(this.m.bind(this, "all"))
}
y.prototype = Object.create(s.prototype);
y.prototype.m = function(a) {
    a && (this.F = a);
    var b = $(".js-tab-transaction-content");
    a = b.find(".sent");
    b = b.find(".received");
    a.show();
    b.show();
    this.s.removeClass("active");
    this.t.removeClass("active");
    this.r.removeClass("active");
    "sent" == this.F ? (b.hide(), this.t.addClass("active")) : "received" == this.F ? (a.hide(), this.s.addClass("active")) : this.r.addClass("active")
};
y.prototype.refresh = function() {
    var a = this;
    RPC.a.listTransactions("*", 100, function(b, c) {
        if (b) "ETIMEDOUT" != b.code && Modal.alert("RPC Error", b.message);
        else {
            var e = a.b.find(".js-transactions"),
                d = e.find(".js-transaction-prototype");
            e.find("> :not(.js-transaction-prototype)").remove();
            c.forEach(function(a) {
                var b = a.confirmations,
                    c = a.address,
                    l = a.amount,
                    k = a.category,
                    n = "send" == k ? "sent" : "received",
                    q = (new Date(1E3 * a.time)).toISOString().replace("T", " ").substr(0, 19),
                    r = Config.addresses.mine.filter(function(a) {
                        return a.address ===
                            c
                    })[0];
                r || (r = Config.addresses.others.filter(function(a) {
                    return a.address === c
                })[0]);
                r = r ? r.label : c;
                "sent" == n && (l += a.fee);
                a = d.clone();
                var U = a.find(".js-amount"),
                    H = a.find(".js-address"),
                    V = a.find(".js-date"),
                    W = a.find(".js-confirmations");
                a.removeClass("js-transaction-prototype hide").addClass(n);
                U.text(l);
                H.text(r);
                V.text(q + " UTC");
                W.text(b);
                "generate" != k && "immature" != k || H.html('<i class="icon-pickaxe"></i> ' + H.html());
                e.prepend(a)
            });
            a.m()
        }
    })
};
new y;
util = require("util");

function z() {
    function a() {
        e.fadeOut(70, function() {
            h.removeClass("active");
            g.q = "";
            g.c();
            f.val("");
            d.fadeIn(70)
        })
    }
    var b = $(".js-tab-address-book-content"),
        c = $(".js-tab-address-book");
    s.call(this, b, c);
    this.b = b;
    this.q = "";
    this.d = [];
    var e = b.find(".js-address-search"),
        d = b.find(".js-address-intro"),
        h = b.find(".js-search-button"),
        b = b.find(".js-add-address"),
        f = e.find("input"),
        g = this;
    f.blur(a).keyup(function() {
        g.q = f.val().toLowerCase();
        g.c()
    });
    h.click(function() {
        h.hasClass("active") ? a() : (h.addClass("active"), d.fadeOut(70,
            function() {
                e.fadeIn(70).find("input").focus()
            }))
    });
    b.click(function() {
        Modal.prompt("Add Address", "Leave the address empty to generate a new receiving address.", "Label", "Address", function(a, b) {
            if ("" == a) return !1;
            b ? RPC.a.validateAddress(b, function(c, d) {
                c ? "ETIMEDOUT" != c.code && Modal.alert("RPC Error", c.message) : d.isvalid ? (Config.addresses.others.push({
                    label: a,
                    address: b
                }), Config.save(), g.c()) : Modal.alert("Invalid Address", "That address was not valid.")
            }) : RPC.a.getNewAddress(function(b, c) {
                b ? "ETIMEDOUT" !=
                    b.code && Modal.alert("RPC Error", b.message) : (Config.addresses.mine.push({
                        label: a,
                        address: c
                    }), Config.save(), g.c())
            });
            return !0
        })
    })
}
z.prototype = Object.create(s.prototype);
var A = new z;
z.prototype.n = function() {
    var a = this;
};

function B() {
    var a = $(this).parent().parent(),
        b = a.parent().hasClass("js-my-addresses") ? "mine" : "others",
        c = a.find(".js-address").text();
    Modal.confirm("Delete Address", "Are you sure you want to delete this address?", function() {
        Config.addresses[b] = Config.addresses[b].filter(function(a) {
            return a.address != c
        });
        Config.save();
        A.c();
        return !0
    })
}

function C() {
    var a = $(this).parent().parent(),
        b = a.parent().hasClass("js-my-addresses") ? Config.addresses.mine : Config.addresses.others,
        c = a.find(".js-address").text();
    Modal.prompt("Rename Address", "Enter a new name for this address.", "Name", function(a) {
        if ("" == a) return !1;
        b.forEach(function(b) {
            b.address == c && (b.label = a)
        });
        Config.save();
        A.c();
        return !0
    })
}

function D() {
    var a = $(this),
        b = a.parent().find(".js-address").text();
}
z.prototype.c = function() {
    var a = this.b,
        b = a.find(".js-address-prototype"),
        c = a.find(".js-my-addresses"),
        e = this;
    c.text("");
    Config.addresses.mine.forEach(function(a) {
        var h = a.label;
        a = a.address;
        if (-1 != h.toLowerCase().indexOf(e.q)) {
            var f = b.clone().removeClass("js-address-prototype hide");
            f.find(".js-address-name").text(h);
            f.find(".js-address").text(a);
            f.find(".js-edit").click(C);
            f.find(".js-delete").click(B);
            c.append(f)
        }
    });
    c = a.find(".js-other-addresses");
    c.text("");
    Config.addresses.others.forEach(function(a) {
        var h = a.label;
        a = a.address;
        if (-1 != h.toLowerCase().indexOf(e.q)) {
            var f = b.clone().removeClass("js-address-prototype hide");
            f.find(".js-address-name").text(h);
            f.find(".js-address").text(a);
            f.find(".js-edit").click(C);
            f.find(".js-delete").click(B);
            c.append(f)
        }
    })
};
var os = require("os"),
    fs = require("fs"),
    E = require("csv-parse");

function F() {
    var a = $(".js-settings-panel"),
        b = $(".js-tab-settings");
    this.b = a;
    s.call(this, a, b);
    var c = a.find('input[name="fee"]'),
        b = a.find('input[name="minimizeToTray"]'),
        e = a.find('input[name="minimizeOnClose"]'),
        d = os.platform();
    "win32" != d && "win64" != d && a.find(".js-minimize-to-tray-label").remove();
    c.change(function() {
        Config.fee = c.val();
        Config.save()
    });
    b.change(function() {
        Config.minimizeToTray = this.checked;
        Config.save()
    });
    e.change(function() {
        Config.minimizeOnClose = this.checked;
        Config.save()
    });
    c.val(Config.fee);
    b[0].checked = Config.minimizeToTray;
    e[0].checked = Config.minimizeOnClose;
    var d = a.find(".js-themes"),
        h = d.find(".js-theme-prototype");
    h.hide();
    var f = a.find(".js-export"),
        g = a.find(".js-import"),
        l = a.find(".js-show-data");
    f.click(function() {
        Modal.S("Export Wallet", "Choose where you would like to save the data.", "File", function(a) {
            RPC.a.dumpWallet(a, function(b) {
                b && (-13 != b.code ? "ETIMEDOUT" != b.code && Modal.alert("RPC Error", b.message) : Modal.p("Enter Passphrase", "Enter your passphrase to continue.", "Passphrase",
                    function(b) {
                        if ("" == b) return !1;
                        RPC.a.walletPassphrase(b, 5, !1, function(b) {
                            b ? -14 == b.code ? Modal.j() : "ETIMEDOUT" != b.code && Modal.alert("RPC Error", b.message) : RPC.a.dumpWallet(a, function(a) {
                                a && "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message)
                            })
                        });
                        return !0
                    }))
            });
            return !0
        })
    });
    g.click(function() {
        Modal.T("Import Addresses", "Select the CSV file exported by the Qt wallet.", "File", function(a) {
            fs.readFile(a, function(a, b) {
                a ? Modal.alert("File Error", a.message) : E(b, {}, function(a, b) {
                    a ? Modal.alert("CSV Error", a.message) :
                        (b.forEach(function(a) {
                            var b = a[0],
                                c = a[1];
                            "" === b && (b = "(No Label)");
                            RPC.a.validateAddress(c, function(a, d) {
                                if (!a && d.isvalid) {
                                    var e = d.ismine ? Config.addresses.mine : Config.addresses.others;
                                    0 < e.filter(function(a) {
                                        return a.address == c
                                    }).length || e.push({
                                        label: b,
                                        address: c
                                    })
                                }
                            })
                        }), Config.save())
                })
            });
            return !0
        })
    });
    l.click(function() {
        require("nw.gui").Shell.showItemInFolder(ConfigDir)
    });
    var f = a.find(".js-change-password"),
        k = a.find(".js-new-password"),
        n = a.find(".js-old-password"),
        q = a.find(".js-confirm-password");
    f.click(function() {
        function a(b) {
            Modal.alert("Invalid Password", b)
        }
        var b = k.val(),
            c = n.val(),
            d = q.val();
        RPC.a.i ? "" === b ? a("New password cannot be empty. To decrypt wallet, use export function in Settings tab.") : c === b ? a("New password cannot be the same as current password.") : b !== d ? a("New passwords do not match.") : RPC.a.walletPassphraseChange(c, b, function(a) {
            a ? -14 == a.code ? Modal.j() : "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message) : (Modal.alert("Success", "Password changed successfully."), k.val(""),
                n.val(""), q.val(""))
        }) : "" === b ? a("New password cannot be empty") : b !== d ? a("New passwords do not match.") : (Modal.alert("Exiting", "The wallet will exit to finish encrypting. Please restart it afterward."), RPC.a.encryptWallet(passphrase, function(a) {
            a ? "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message) : (RPC.a.i = !0, RPC.a.e = !0, G.removeClass("icon-unlock-2").addClass("icon-lock"), I.text("Encryption On"))
        }))
    });
    this.w = d;
    this.M = h;
    this.H = c;
    this.J = b;
    this.I = e
}
F.prototype = Object.create(s.prototype);
new F;
F.prototype.n = function() {
    this.H.val(Config.fee);
    this.J[0].checked = Config.minimizeToTray;
    this.I[0].checked = Config.minimizeOnClose;
    RPC.a.i || this.b.find(".js-old-password").hide();
    var a = this;
    this.w.find("> :not(.js-theme.prototype)").remove();
    Theme.R();
    Theme.f.forEach(function(b) {
        var c = a.M.clone();
        c.removeClass("js-theme-prototype");
        c.find(".js-theme-name").text(b.name);
        c.find(".js-theme-img").attr("src", b.D);
        c.click(function() {
            b.apply();
            Config.theme = b.name;
            Config.themeIsInternal = b.o;
            Config.save()
        });
        a.w.append(c);
        c.show()
    });
    RPC.a.getInfo(function(b, c) {
        if (!b) {
            var e = a.b.find(".js-daemon-version"),
                d = c.version,
                h = d.indexOf("-"),
                d = -1 != h ? d.substring(1, h) : d.substring(1);
            e.text(d)
        }
    })
};
var util = require("util"),
    J = $(".modal-popup"),
    K = $(".modal-popup-bg"),
    L = $(".wrapper"),
    aa = {
        plain: function(a) {
            return util.format('<input type="text" name="%s" placeholder="%s" />', a, a)
        },
        password: function(a) {
            return util.format('<input type="password" name="%s" placeholder="%s" />', a, a)
        },
        file: function(a) {
            return util.format('<input type="file" name="%s" />', a)
        },
        "export": function(a) {
            return util.format('<input type="file" name="%s" nwsaveas="wallet.dat" />', a)
        }
    };

function M(a) {
    return util.format('<div class="buttons">%s</div>', a)
}
Modal = {
    v: function() {
        L.addClass("blurred");
        K.show();
        J.fadeIn(300)
    },
    h: function() {
        L.removeClass("blurred");
        K.hide();
        J.hide()
    },
    alert: function(a, b) {
        J.html('<span class="modal-title">' + a + "</span>" + ("<p>" + b + "</p>") + M('<a href="#" class="button button-ok"><i class="icon-check-mark"></i></a>'));
        J.find(".button-ok").click(Modal.h);
        Modal.v()
    },
    j: function() {
        Modal.alert("Bad Passphrase", "That passphrase is incorrect. Please try again.")
    },
    confirm: function(a, b, c) {
        J.html('<span class="modal-title">' + a + "</span>" + ("<p>" +
            b + "</p>") + M('<a href="#" class="button button-ok"><i class="icon-check-mark"></i></a><a href="#" class="button button-cancel"><i class="icon-remove"></i></a>'));
        J.find(".button-cancel").click(Modal.h);
        J.find(".button-ok").click(function() {
            c ? c() && Modal.h() : Modal.h()
        });
        Modal.v()
    }
};

function N(a) {
    return function(b, c) {
        function e() {
            if (g) {
                var a = [];
                h.forEach(function(b) {
                    b = J.find('input[name="' + b + '"]').val();
                    a.push(b)
                });
                g.apply(null, a) && Modal.h()
            }
        }
        b = '<span class="modal-title">' + b + "</span>";
        c = "<p>" + c + "</p>";
        for (var d = "", h = [], f = 2; f < arguments.length - 1; f++) d += aa[a](arguments[f]), h.push(arguments[f]);
        J.html(b + c + d + M('<a href="#" class="button button-ok"><i class="icon-check-mark"></i></a><a href="#" class="button button-cancel"><i class="icon-remove"></i></a>'));
        var g = arguments[arguments.length -
                1],
            d = J.find("input");
        J.find(".button-cancel").click(Modal.h);
        J.find(".button-ok").click(e);
        d.keypress(function(a) {
            13 === a.which && e()
        });
        Modal.v();
        d.first().focus()
    }
}
Modal.prompt = N("plain");
Modal.p = N("password");
Modal.T = N("file");
Modal.S = N("export");
var fs = require("fs"),
    child_process = require("child_process"),
    p = require("crypto"),
    O = require("nw.gui"),
    os = require("os");
Window = O.Window.get();
var P, Q = os.platform();
"win32" == Q || "win64" == Q ? P = process.env.APPDATA + "\\IOCoin\\" : "darwin" == Q ? P = process.env.HOME + "/Library/Application Support/IOCoin/" : "linux" == Q ? P = process.env.HOME + "/.iocoin/" : (alert("Fatal error: Unknown platform: " + Q), process.exit(1));
ConfigDir = P;
process.on("uncaughtException", function(a) {
    alert("Fatal error: " + a.stack);
    process.exit(1)
});

function ba(a, b, c) {
    a = fs.openSync(a, "a");
    fs.writeSync(a, "\n");
    fs.writeSync(a, "rpcuser=" + b + "\n");
    fs.writeSync(a, "rpcpassword=" + c);
    fs.closeSync(a)
}

function ca() {
    var a, b, c, e = ConfigDir + "iocoin.conf";
    (a = fs.existsSync(e)) || fs.existsSync(ConfigDir) || fs.mkdirSync(ConfigDir);
    if (a) {
        var d = {},
            h = /(.+)=(.+)/;
        fs.readFileSync(e).toString("ascii").replace("\r", "").split("\n").map(function(a) {
            a = h.exec(a);
            var b = null,
                c = null;
            a && (b = a[1], c = a[2]);
            b && c && (d[b] = c)
        });
        if (d.rpcuser && d.rpcpassword) return a = d.rpcuser, b = d.rpcpassword, c = d.rpcport || 33765, [a, b, c]
    }
    a = "iocoinrpc";
    b = p.randomBytes(16).toString("hex");
    c = 33765;
    ba(e, a, b);
    return [a, b, c]
}

function R() {
    RPC.a.g && !S.hasClass("lit") ? (S.addClass("lit"), T.text("Staking")) : !RPC.a.g && S.hasClass("lit") && (S.removeClass("lit"), T.text("Not Staking"));
    RPC.a.e && G.hasClass("icon-unlock-2") ? (G.removeClass("icon-unlock-2").addClass("icon-lock"), I.text("Wallet Locked")) : !RPC.a.e && G.hasClass("icon-lock") && (G.removeClass("icon-lock").addClass("icon-unlock-2"), RPC.a.i ? I.text("Wallet Unlocked") : I.text("Wallet Unencrypted"));
    u && u.refresh();
    (function() {
        RPC.a.getConnectionCount(function(a, b) {
            if (a) "ETIMEDOUT" !=
                a.code && Modal.alert("RPC Error", a.message);
            else {
                var c;
                c = 1 == b ? "1 connection" : b + " connections";
                $(".js-connection-count").text(c);
                c = $(".js-signal");
                0 == b && c.hasClass("lit") ? c.removeClass("lit") : 0 < b && !c.hasClass("lit") && c.addClass("lit")
            }
        })
    })()
}
var X = $(".js-lock"),
    S = $(".js-stake"),
    I = X.find(".tooltip"),
    G = X.find("i"),
    T = S.find(".tooltip");

function da() {
    RPC.a.i ? RPC.a.g ? RPC.a.walletLock(function(a) {
        a ? "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message) : (RPC.a.g = !1, RPC.a.e = !0)
    }) : Modal.p("Unlock Wallet", "Enter your passphrase to unlock the wallet.", "Passphrase", function(a) {
        RPC.a.walletPassphrase(a, 1E9, !1, function(a) {
            a ? -14 == a.code ? Modal.j() : "ETIMEDOUT" != a.code && Modal.alert("RPC Error", a.message) : (RPC.a.g = !0, RPC.a.e = !1)
        });
        return !0
    }) : Modal.alert("No Password", "Set a password in the Settings tab to enable locking.")
}

function ea() {
    var a = new O.Menu;
    a.append(new O.MenuItem({
        label: "Cut",
        click: function() {
            document.execCommand("cut")
        }
    }));
    a.append(new O.MenuItem({
        label: "Copy",
        click: function() {
            document.execCommand("copy")
        }
    }));
    a.append(new O.MenuItem({
        label: "Paste",
        click: function() {
            document.execCommand("paste")
        }
    }));
    $(document).on("contextmenu", function(b) {
        b.preventDefault();
        a.popup(b.originalEvent.x, b.originalEvent.y)
    });
    RPC.a.setTxFee(Config.fee, function() {});
    t(x);
    $(".js-tab-panel").show();
    $(".js-signal").show();
    X.show();
    S.show();
    DEBUG && $(".js-button-refresh").show().click(function() {
        location.reload()
    });
    X.click(da);
    R();
    setInterval(R, 4E3)
}
var Y = null;

function fa() {
    var a = os.platform();
    Y = child_process.spawn("win32" == a || "win64" == a ? process.env["PROGRAMFILES(X86)"] ? process.env["PROGRAMFILES(X86)"] + "\\IOCoin HTML5 Wallet\\iocoind.exe" : process.env.PROGRAMFILES + "\\IOCoin HTML5 Wallet\\iocoind.exe" : "/usr/local/bin/iocoind", ["-server", "-min", "-splash=0"]);
    Y.on("exit", function() {
        0 == Y.V ? alert("Daemon has exited, exiting wallet.") : alert("Daemon encountered an error. If iocoind is already running, wait for it to exit or kill it and try starting the wallet again.");
        process.exit(0)
    });
    Y.on("error", function(a) {
        alert("ENOENT" == a.code ? "Wallet daemon could not be found. Please re-install HTML5 wallet." : "Daemon error: " + a.message);
        process.exit(1)
    })
}
process.on("exit", function() {
    Y && Y.kill()
});
var Z;
Window.on("minimize", function() {
    var a = os.platform();
    !Config.minimizeToTray || "win32" != a && "win64" != a || (this.hide(), Z = new O.Tray({
        icon: "img/logo_small.png",
        title: "Opal Coin"
    }), Z.tooltip = "Opal Coin", Z.on("click", function() {
        Window.show();
        this.remove()
    }))
});
DEBUG && Window.showDevTools();
(function() {
    Config.load();
    Theme.Q();
    Theme.U(Config.theme, Config.themeIsInternal);
    Window.title = "Opal Coin Mk II Wallet v1.0.0";
    $("#js-title").text("Opal Coin Mk II Wallet v1.0.0");
    if ("darwin" == os.platform()) {
        var a = new O.Menu({
            type: "menubar"
        });
        a.createMacBuiltin("Opal Coin");
        Window.menu = a
    }
    $(".js-button-close").click(function() {
        Config.minimizeOnClose ? Window.minimize() : process.exit(0)
    });
    $(".js-button-minimize").click(function() {
        Window.minimize()
    });
    var b = ca(),
        a = b[0],
        c = b[1],
        b = b[2];
    a && c || (alert("RPC username or password could not be read from iocoin.conf."),
        process.exit(1));
    DEBUG || fa();
    RPC.P("localhost", b, a, c, DEBUG, ea)
})();
