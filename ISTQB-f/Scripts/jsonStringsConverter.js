function getJson(str) {
    var rs = str.replace(/(&quot\;)/g, "\"");
    return JSON.parse(rs);
}