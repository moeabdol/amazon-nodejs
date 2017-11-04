const times = (n, block) => {
  let accum = '';

  for (var i = 0; i < n; ++i)
    accum += block.fn(i);

  return accum;
};

const forLoop = (from, to, incr, block) => {
  let accum = '';

  for (var i = from; i < to; i += incr)
    accum += block.fn(i);

  return accum;
};

const ifCond = (v1, v2, options) => {
  if (v1 === v2) {
    return options.fn(this);
  }

  return options.inverse(this);
};

const add = (v1, v2) => {
  return v1 + v2;
};

module.exports = {
  times,
  forLoop,
  ifCond,
  add
};
