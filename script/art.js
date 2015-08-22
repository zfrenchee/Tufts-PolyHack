// Generated by CoffeeScript 1.9.3
(function() {
  var canonicalGreen, canonicalOrange, canonicalPurple, colorVariance, doubleTriangle, flickerAll, flickerOne, nearColor, root3, s, sepDist, sidelength, trianglePattern, triangleStreak,
    slice = [].slice;

  root3 = Math.sqrt(3);

  s = void 0;

  canonicalGreen = [43, 152, 132];

  canonicalPurple = [149, 111, 168];

  canonicalOrange = [240, 130, 84];

  colorVariance = 30;

  sepDist = 3;

  sidelength = 80;

  $(document).ready(function() {
    var T, v;
    s = Snap('#art');
    v = new Vivus('thisis', {
      type: 'delayed',
      duration: 800
    });
    return T = trianglePattern([160, 500]);
  });

  trianglePattern = function(P1) {
    var P2, P3, P4, P5, P6, P7, T;
    P2 = [P1[0] + sidelength, P1[1]];
    P3 = [P2[0] + sidelength / 2, P1[1] + sidelength * root3 / 2];
    P4 = [P1[0] + sidelength * 3, P1[1]];
    P5 = [P3[0] + sidelength * 2, P3[1]];
    P6 = [P5[0] + sidelength / 2, P5[1] + sidelength * root3 / 2];
    P7 = [P1[0] + sidelength * 6, P1[1]];
    T = [triangleStreak(P1, canonicalGreen, 3), triangleStreak(P2, canonicalPurple, 5), triangleStreak(P3, canonicalPurple, 5), triangleStreak(P4, canonicalPurple, 3), triangleStreak(P5, canonicalOrange, 5), triangleStreak(P6, canonicalOrange, 5), triangleStreak(P7, canonicalGreen, 3)];
    T = T.reduce(function(a, b) {
      return a.concat(b);
    });
    flickerAll(T);
    return T;
  };

  flickerOne = function(t) {
    return t.animate({
      opacity: 0.9
    }, 2000, mina.bounce, (function(_this) {
      return function() {
        return t.animate({
          opacity: 1
        }, 2000, mina.bounce);
      };
    })(this));
  };

  flickerAll = function(T) {
    return _.map(_.shuffle(T), _.rateLimit(flickerOne, 60, true, (function(_this) {
      return function() {
        return flickerAll(T);
      };
    })(this)));
  };

  triangleStreak = function(bottomLeft, color, numTriangles) {
    var i, one, point, ref, ref1, triangles, two, x;
    triangles = [];
    for (x = i = 0, ref = numTriangles; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      point = [bottomLeft[0] + x * sidelength / 2 + sepDist, bottomLeft[1] - x * sidelength * root3 / 2 + sepDist];
      ref1 = doubleTriangle(point, color), one = ref1[0], two = ref1[1];
      triangles.push(one);
      triangles.push(two);
    }
    return _.shuffle(triangles);
  };

  doubleTriangle = function(S, color) {
    var E, N, W, b, g, one, r, ref, ref1, two;
    W = [S[0] - sidelength / 2, S[1] - sidelength * root3 / 2];
    E = [W[0] + sidelength, W[1]];
    N = [S[0], S[1] - sidelength * root3];
    ref = nearColor(color), r = ref[0], g = ref[1], b = ref[2];
    one = s.polygon(slice.call(S).concat(slice.call(W), slice.call(E))).attr({
      fill: Snap.rgb(r, g, b),
      opacity: 1
    });
    ref1 = nearColor(color), r = ref1[0], g = ref1[1], b = ref1[2];
    two = s.polygon(slice.call(N).concat(slice.call(W), slice.call(E))).attr({
      fill: Snap.rgb(r, g, b),
      opacity: 1
    });
    return [one, two];
  };

  nearColor = function(arg) {
    var b, g, r, rand;
    r = arg[0], g = arg[1], b = arg[2];
    rand = Math.random() - 0.5;
    return [rand * colorVariance + r, rand * colorVariance + g, rand * colorVariance + b];
  };

}).call(this);
