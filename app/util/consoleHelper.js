const p = function (sourceName,data, hue=25, variableName="") {
    const color = `hsl(${hue},100%,50%)`;
    const dimmedColor = `hsl(${hue},80%,50%)`;
  
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        console.log(
          `%c${sourceName}: %c${variableName}: %o`,
          `font-weight:bold;color:${color};`,
          `font-weight:normal;color:${dimmedColor};font-style: oblique;`,
          data
        );
      } else {
        console.log(
          `%c${sourceName}: %c${variableName}: %o`,
          `font-weight:bold;color:${color};`,
          `font-weight:normal;color:${dimmedColor};font-style: oblique;`,
          data
        );
      }
    } else {
      console.log(
        `%c${sourceName}: %c${variableName}: %s`,
        `font-weight:bold;color:${color};`,
        `font-weight:normal;color:${color};font-style: oblique;`,
        data
      );
    }
  };

  module.exports = p;