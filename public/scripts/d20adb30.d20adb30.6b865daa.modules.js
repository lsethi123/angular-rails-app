!function (a, b, c) {
  'use strict';
  b.module('ngResource', ['ng']).factory('$resource', [
    '$http',
    '$parse',
    function (a, d) {
      function e(a) {
        return f(a, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
      }
      function f(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, b ? '%20' : '+');
      }
      function g(a, b) {
        this.template = a += '#', this.defaults = b || {};
        var c = this.urlParams = {};
        k(a.split(/\W/), function (b) {
          b && new RegExp('(^|[^\\\\]):' + b + '\\W').test(a) && (c[b] = !0);
        }), this.template = a.replace(/\\:/g, ':');
      }
      function h(d, e, f) {
        function p(a, b) {
          var c = {};
          return b = l({}, e, b), k(b, function (b, d) {
            c[d] = b.charAt && '@' == b.charAt(0) ? o(a, b.substr(1)) : b;
          }), c;
        }
        function q(a) {
          m(a || {}, this);
        }
        var r = new g(d);
        return f = l({}, i, f), k(f, function (d, e) {
          d.method = b.uppercase(d.method);
          var f = 'POST' == d.method || 'PUT' == d.method || 'PATCH' == d.method;
          q[e] = function (b, c, e, g) {
            var h, i = {}, o = j, s = null;
            switch (arguments.length) {
            case 4:
              s = g, o = e;
            case 3:
            case 2:
              if (!n(c)) {
                i = b, h = c, o = e;
                break;
              }
              if (n(b)) {
                o = b, s = c;
                break;
              }
              o = c, s = e;
            case 1:
              n(b) ? o = b : f ? h = b : i = b;
              break;
            case 0:
              break;
            default:
              throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
            }
            var t = this instanceof q ? this : d.isArray ? [] : new q(h);
            return a({
              method: d.method,
              url: r.url(l({}, p(h, d.params || {}), i)),
              data: h
            }).then(function (a) {
              var b = a.data;
              b && (d.isArray ? (t.length = 0, k(b, function (a) {
                t.push(new q(a));
              })) : m(b, t)), (o || j)(t, a.headers);
            }, s), t;
          }, q.prototype['$' + e] = function (a, b, d) {
            var g, h = p(this), i = j;
            switch (arguments.length) {
            case 3:
              h = a, i = b, g = d;
              break;
            case 2:
            case 1:
              n(a) ? (i = a, g = b) : (h = a, i = b || j);
            case 0:
              break;
            default:
              throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
            }
            var k = f ? this : c;
            q[e].call(this, h, k, i, g);
          };
        }), q.bind = function (a) {
          return h(d, l({}, e, a), f);
        }, q;
      }
      var i = {
          get: { method: 'GET' },
          save: { method: 'POST' },
          query: {
            method: 'GET',
            isArray: !0
          },
          remove: { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        }, j = b.noop, k = b.forEach, l = b.extend, m = b.copy, n = b.isFunction, o = function (a, b) {
          return d(b)(a);
        };
      return g.prototype = {
        url: function (a) {
          var c, d, g = this, h = this.template;
          a = a || {}, k(this.urlParams, function (f, i) {
            c = a.hasOwnProperty(i) ? a[i] : g.defaults[i], b.isDefined(c) && null !== c ? (d = e(c), h = h.replace(new RegExp(':' + i + '(\\W)', 'g'), d + '$1')) : h = h.replace(new RegExp('(/?):' + i + '(\\W)', 'g'), function (a, b, c) {
              return '/' == c.charAt(0) ? c : b + c;
            });
          }), h = h.replace(/\/?#$/, '');
          var i = [];
          return k(a, function (a, b) {
            g.urlParams[b] || i.push(f(b) + '=' + f(a));
          }), i.sort(), h = h.replace(/\/*$/, ''), h + (i.length ? '?' + i.join('&') : '');
        }
      }, h;
    }
  ]);
}(window, window.angular), function (a, b, c) {
  'use strict';
  b.module('ngCookies', ['ng']).factory('$cookies', [
    '$rootScope',
    '$browser',
    function (a, d) {
      function e() {
        var a, e, f, i;
        for (a in h)
          k(g[a]) && d.cookies(a, c);
        for (a in g)
          e = g[a], b.isString(e) ? e !== h[a] && (d.cookies(a, e), i = !0) : b.isDefined(h[a]) ? g[a] = h[a] : delete g[a];
        if (i) {
          i = !1, f = d.cookies();
          for (a in g)
            g[a] !== f[a] && (k(f[a]) ? delete g[a] : g[a] = f[a], i = !0);
        }
      }
      var f, g = {}, h = {}, i = !1, j = b.copy, k = b.isUndefined;
      return d.addPollFn(function () {
        var b = d.cookies();
        f != b && (f = b, j(b, h), j(b, g), i && a.$apply());
      })(), i = !0, a.$watch(e), g;
    }
  ]).factory('$cookieStore', [
    '$cookies',
    function (a) {
      return {
        get: function (c) {
          var d = a[c];
          return d ? b.fromJson(d) : d;
        },
        put: function (c, d) {
          a[c] = b.toJson(d);
        },
        remove: function (b) {
          delete a[b];
        }
      };
    }
  ]);
}(window, window.angular), function (a, b) {
  'use strict';
  function c(a) {
    var b, c = {}, d = a.split(',');
    for (b = 0; b < d.length; b++)
      c[d[b]] = !0;
    return c;
  }
  function d(a, c) {
    function d(a, d, g, h) {
      if (d = b.lowercase(d), v[d])
        for (; q.last() && w[q.last()];)
          f('', q.last());
      u[d] && q.last() == d && f('', d), h = r[d] || !!h, h || q.push(d);
      var i = {};
      g.replace(k, function (a, b, c, d, f) {
        var g = c || d || f || '';
        i[b] = e(g);
      }), c.start && c.start(d, i, h);
    }
    function f(a, d) {
      var e, f = 0;
      if (d = b.lowercase(d))
        for (f = q.length - 1; f >= 0 && q[f] != d; f--);
      if (f >= 0) {
        for (e = q.length - 1; e >= f; e--)
          c.end && c.end(q[e]);
        q.length = f;
      }
    }
    var g, h, p, q = [], s = a;
    for (q.last = function () {
        return q[q.length - 1];
      }; a;) {
      if (h = !0, q.last() && x[q.last()])
        a = a.replace(new RegExp('(.*)<\\s*\\/\\s*' + q.last() + '[^>]*>', 'i'), function (a, b) {
          return b = b.replace(n, '$1').replace(o, '$1'), c.chars && c.chars(e(b)), '';
        }), f('', q.last());
      else if (0 === a.indexOf('<!--') ? (g = a.indexOf('-->'), g >= 0 && (c.comment && c.comment(a.substring(4, g)), a = a.substring(g + 3), h = !1)) : m.test(a) ? (p = a.match(j), p && (a = a.substring(p[0].length), p[0].replace(j, f), h = !1)) : l.test(a) && (p = a.match(i), p && (a = a.substring(p[0].length), p[0].replace(i, d), h = !1)), h) {
        g = a.indexOf('<');
        var t = 0 > g ? a : a.substring(0, g);
        a = 0 > g ? '' : a.substring(g), c.chars && c.chars(e(t));
      }
      if (a == s)
        throw 'Parse Error: ' + a;
      s = a;
    }
    f();
  }
  function e(a) {
    return B.innerHTML = a.replace(/</g, '&lt;'), B.innerText || B.textContent || '';
  }
  function f(a) {
    return a.replace(/&/g, '&amp;').replace(q, function (a) {
      return '&#' + a.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function g(a) {
    var c = !1, d = b.bind(a, a.push);
    return {
      start: function (a, e, g) {
        a = b.lowercase(a), !c && x[a] && (c = a), c || 1 != y[a] || (d('<'), d(a), b.forEach(e, function (a, c) {
          var e = b.lowercase(c);
          1 != A[e] || z[e] === !0 && !a.match(p) || (d(' '), d(c), d('="'), d(f(a)), d('"'));
        }), d(g ? '/>' : '>'));
      },
      end: function (a) {
        a = b.lowercase(a), c || 1 != y[a] || (d('</'), d(a), d('>')), a == c && (c = !1);
      },
      chars: function (a) {
        c || d(f(a));
      }
    };
  }
  var h = function (a) {
      var b = [];
      return d(a, g(b)), b.join('');
    }, i = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, j = /^<\s*\/\s*([\w:-]+)[^>]*>/, k = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, l = /^</, m = /^<\s*\//, n = /<!--(.*?)-->/g, o = /<!\[CDATA\[(.*?)]]>/g, p = /^((ftp|https?):\/\/|mailto:|#)/i, q = /([^\#-~| |!])/g, r = c('area,br,col,hr,img,wbr'), s = c('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'), t = c('rp,rt'), u = b.extend({}, t, s), v = b.extend({}, s, c('address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul')), w = b.extend({}, t, c('a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var')), x = c('script,style'), y = b.extend({}, r, v, w, u), z = c('background,cite,href,longdesc,src,usemap'), A = b.extend({}, z, c('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width')), B = document.createElement('pre');
  b.module('ngSanitize', []).value('$sanitize', h), b.module('ngSanitize').directive('ngBindHtml', [
    '$sanitize',
    function (a) {
      return function (b, c, d) {
        c.addClass('ng-binding').data('$binding', d.ngBindHtml), b.$watch(d.ngBindHtml, function (b) {
          b = a(b), c.html(b || '');
        });
      };
    }
  ]), b.module('ngSanitize').filter('linky', function () {
    var a = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/, b = /^mailto:/;
    return function (c) {
      if (!c)
        return c;
      for (var d, e, f, h = c, i = [], j = g(i); d = h.match(a);)
        e = d[0], d[2] == d[3] && (e = 'mailto:' + e), f = d.index, j.chars(h.substr(0, f)), j.start('a', { href: e }), j.chars(d[0].replace(b, '')), j.end('a'), h = h.substring(f + d[0].length);
      return j.chars(h), i.join('');
    };
  });
}(window, window.angular);