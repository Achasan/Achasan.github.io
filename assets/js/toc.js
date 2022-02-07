function getTOCNodes(master) {
  var nodes = Array.prototype.slice.call(master.getElementsByTagName("*"), 0);
  var tocNodes = nodes.filter(function (elem) {
    return elem.tagName == "A";
  });
  return tocNodes;
}
function getHeaderNodes(master) {
  var nodes = Array.prototype.slice.call(master.getElementsByTagName("*"), 0);
  var headerNodes = nodes.filter(function (elem) {
    return (
      elem.tagName == "H1" ||
      elem.tagName == "H2" ||
      elem.tagName == "H3" ||
      elem.tagName == "H4" ||
      elem.tagName == "H5" ||
      elem.tagName == "H6"
    );
  });
  return headerNodes;
}

var image = document.getElementsByClassName("post-full-image")[0];
var imageY = window.pageYOffset + image.getBoundingClientRect().bottom;

var article = document.getElementsByClassName("post-full-content")[0];
var articleX = window.pageXOffset + article.getBoundingClientRect().right;
var articleY = window.pageYOffset + article.getBoundingClientRect().top;

var toc = document.getElementsByClassName("toc")[0];

var headerNodes = getHeaderNodes(article);
var tocNodes = getTOCNodes(toc);

var before = undefined;

document.addEventListener(
  "scroll",
  function (e) {
    if (window.scrollY >= imageY - 60) {
      toc.style.cssText = "position: fixed; top: 100px;";
    } else {
      toc.style.cssText = "";
    }

    var current = headerNodes.filter(function (header) {
      var headerY = window.pageYOffset + header.getBoundingClientRect().top;
      return window.scrollY >= headerY - 100;
    });

    if (current.length > 0) {
      current = current[current.length - 1];

      var currentA = tocNodes.filter(function (tocNode) {
        return tocNode.innerHTML == current.innerHTML;
      });

      currentA = currentA[0];
      if (currentA) {
        if (before == undefined) before = currentA;

        if (before != currentA) {
          before.classList.remove("toc-active");
          before = currentA;
        }

        currentA.classList.add("toc-active");
      } else {
        if (before) before.classList.remove("toc-active");
      }
    } else {
      if (before) before.classList.remove("toc-active");
    }
  },
  false
);
