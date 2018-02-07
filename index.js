module.exports = (tests, group) => {
  const summary = tests.reduce((accum, [description, fn]) => {
    const {
      pass = 0, defer = 0, out = [],
    } = accum;

    if (typeof fn !== 'function') {
      return {
        pass,
        defer: defer + 1,
        out: [...out, `[_] ${description}`],
      };
    }

    try {
      fn.call(null);
      return {
        pass: pass + 1,
        defer,
        out: [...out, `[✓] ${description}`],
      };
    } catch (e) {
      const [name, line] = e.stack.split('\n').slice(0, 2);
      return {
        pass,
        defer,
        out: [
          ...out,
          `[x] ${description}`,
          `    :: ${name.trim()}`,
          `    :: ${line.trim().replace(__dirname, '~~>')}`,
        ],
      };
    }
  }, {});

  const { pass, defer } = summary;

  process.stdout.write(`${group} :: running ${tests.length} tests`);
  summary.out.forEach(item => process.stdout.write(` ${item}`));
  process.stdout.write(`\n ${pass}/${tests.length} - ${defer} deferred\n`);
};
