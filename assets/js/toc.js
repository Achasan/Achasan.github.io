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

var image;
var imageY;
var article;
var articleX;
var articleY;
var toc;
var headerNodes;
var tocNodes;
var before;

if (
  location.pathname.substring(0, 4) === "/tag" ||
  location.pathname.substring(0, 4) === "/"
) {
  document.removeEventListener("scroll", fixToc, false);
} else {
  image = document.getElementsByClassName("post-full-image")[0];
  imageY = window.pageYOffset + image.getBoundingClientRect().bottom;

  article = document.getElementsByClassName("post-full-content")[0];
  articleX = window.pageXOffset + article.getBoundingClientRect().right;
  articleY = window.pageYOffset + article.getBoundingClientRect().top;

  toc = document.getElementsByClassName("toc")[0];

  headerNodes = getHeaderNodes(article);
  tocNodes = getTOCNodes(toc);

  before = undefined;
}

function fixToc(e) {
  if (location.pathname.substring(0, 4) === "/tag") {
    return;
  }

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
}

document.addEventListener("scroll", fixToc, false);
