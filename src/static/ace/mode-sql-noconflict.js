ace.define("ace/mode/sql", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/sql_highlight_rules", "ace/range"], function (a, b, c) {
    "use strict";
    var d = a("../lib/oop"), e = a("./text").Mode, f = a("../tokenizer").Tokenizer, g = a("./sql_highlight_rules").SqlHighlightRules, h = a("../range").Range, i = function () {
        this.$tokenizer = new f((new g).getRules())
    };
    d.inherits(i, e), function () {
        this.toggleCommentLines = function (a, b, c, d) {
            var e = !0, f = [], g = /^(\s*)--/;
            for (var i = c; i <= d; i++)if (!g.test(b.getLine(i))) {
                e = !1;
                break
            }
            if (e) {
                var j = new h(0, 0, 0, 0);
                for (var i = c; i <= d; i++) {
                    var k = b.getLine(i), l = k.match(g);
                    j.start.row = i, j.end.row = i, j.end.column = l[0].length, b.replace(j, l[1])
                }
            } else b.indentRows(c, d, "--")
        }
    }.call(i.prototype), b.Mode = i
}), ace.define("ace/mode/sql_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function (a, b, c) {
    "use strict";
    var d = a("../lib/oop"), e = a("../lib/lang"), f = a("./text_highlight_rules").TextHighlightRules, g = function () {
        var a = e.arrayToMap("select|from|where|and|or|group|by|order|limit|offset|having|as|case|when|else|end|type|left|right|join|on|outer|desc|asc".split("|")), b = e.arrayToMap("true|false|null".split("|")), c = e.arrayToMap("count|min|max|avg|sum|rank|now|coalesce".split("|"));
        this.$rules = {start:[
            {token:"comment", regex:"--.*$"},
            {token:"string", regex:'".*"'},
            {token:"string", regex:"'.*'"},
            {token:"constant.numeric", regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
            {token:function (d) {
                return d = d.toLowerCase(), a.hasOwnProperty(d) ? "keyword" : b.hasOwnProperty(d) ? "constant.language" : c.hasOwnProperty(d) ? "support.function" : "identifier"
            }, regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},
            {token:"keyword.operator", regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},
            {token:"lparen.paren", regex:"[\\(]"},
            {token:"paren.rparen", regex:"[\\)]"},
            {token:"text", regex:"\\s+"}
        ]}
    };
    d.inherits(g, f), b.SqlHighlightRules = g
}), function () {
    ace.require(["ace/ace"], function (a) {
        window.ace || (window.ace = {});
        for (var b in a)a.hasOwnProperty(b) && (ace[b] = a[b])
    })
}()