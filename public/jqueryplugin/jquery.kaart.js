/*jslint browser: true, indent: 2 */
/*globals window, XMLSerializer, jQuery, Modernizr */
(function ($) {

  "use strict";
  /**
   * http://stackoverflow.com/questions/6507293/convert-xml-to-string-with-jquery
   */
  function xmlToString(xmlData) {

    var xmlString;

    if (typeof xmlData === "string") {
      return xmlData;
    }

    //IE
    if (window.ActiveXObject && xmlData.xml !== undefined) {
      xmlString = xmlData.xml;
      // code for Mozilla, Firefox, Opera, etc.
    } else {
      xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
  }

  /**
   * http://stackoverflow.com/questions/7981100/how-do-i-dynamically-insert-an-svg-image-into-html/7986519#7986519
   */
  function cloneToDoc(node, doc) {
    if (!doc) {
      doc = document;
    }
    var clone, i, a, c, len;
    clone = doc.createElementNS(node.namespaceURI, node.nodeName);
    for (i = 0, len = node.attributes.length; i < len; i += 1) {
      a = node.attributes[i];
      if (!/^xmlns\b/.test(a.nodeName)) { // IE can't create these
        clone.setAttributeNS(a.namespaceURI, a.nodeName, a.nodeValue);
      }
    }
    for (i = 0, len = node.childNodes.length; i < len; i += 1) {
      c = node.childNodes[i];
      clone.insertBefore(c.nodeType === 1 ? cloneToDoc(c, doc) : doc.createTextNode(c.nodeValue), null);
    }
    return clone;
  }

  /**
   * http://stackoverflow.com/questions/9689310/which-svg-support-detection-method-is-best
   */
  function supportsSVG() {
    return !!document.createElementNS &&
      !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
  }

  /**
   * http://weston.ruter.net/2009/05/07/detecting-support-for-data-uris/
   */
  function supportsdataURI() {
    var data, support;
    data = new Image();
    support = true;
    data.onload = data.onerror = function () {
      if (this.width !== 1 || this.height !== 1) {
        support = false;
      }
    };
    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    return support;
  }

  /**
   * https://github.com/Modernizr/Modernizr/pull/227
   */
  function supportsJSON() {
    return !!window.JSON && !!window.JSON.parse;
  }

  /**
   * http://blogs.msdn.com/b/giorgio/archive/2009/04/14/how-to-detect-ie8-using-javascript-client-side.aspx
   */
  function isIE8Browser() {
    var rv, ua, re;
    rv = -1;
    ua = navigator.userAgent;
    re = new RegExp("Trident\/([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(ua) !== null) {
      rv = parseFloat(RegExp.$1);
    }
    return (rv === 4);
  }

  function getXMLDocument(xhr) {

    var xml;

    try {
      xml = document.importNode(xhr.responseXML.documentElement, true);
    } catch (e) {
      try {
        xml = cloneToDoc(xhr.responseXML.documentElement);
      } catch (e1) {
        try {
          xml = xhr.responseXML.xml;
        } catch (e2) {
          xml = "Could not retrieve XML data.";
        }
      }
    }

    return xml;
  }

  function getSVGDocument(xhr) {

    var svg;

    if (supportsSVG()) {
      svg = getXMLDocument(xhr);
    } else {
      svg = "Your browser does not support SVG natively.";
    }
    return svg;
  }

  function booleanTrue(value) {

    var retval = false;
    if (value === true) {
      retval = true;
    }
    if (value === 1) {
      retval = true;
    }
    if (value === "1") {
      retval = true;
    }
    if (value === "on") {
      retval = true;
    }
    if (value === "yes") {
      retval = true;
    }
    return retval;
  }

  function getOptions(options) {
    var opts, key;
    opts = $.extend({}, $.fn.kaart.defaults, options);
    opts.cacheurl = (options.cacheurl === undefined) ? null : options.cacheurl;
    opts.proxyurl = (options.proxyurl === undefined) ? null : options.proxyurl;
    opts.filename = (options.filename === undefined) ? null : options.filename;
    for (key in opts) {
      if (opts.hasOwnProperty(key) && opts[key] === "") {
        delete opts[key];
      }
    }
    if (options.imagemap !== undefined && booleanTrue(options.imagemap)) {
      opts.imagemap = "1";
    } else {
      delete opts.imagemap;
    }
    if (options.serversidecachehandling !== undefined && booleanTrue(options.serversidecachehandling)) {
      opts.cacheurl = null;
      opts.serversidecachehandling = "1";
    }

    return opts;
  }


  function getParams(opts) {
    var url, cacheurl, proxyurl, async, filename, elem, dataType, postbody, uniquename, params,
      serversidecachehandling;
    // Kaart web service does not need these
    url = opts.url;
    delete opts.url;
    cacheurl = opts.cacheurl;
    delete opts.cacheurl;
    proxyurl = opts.proxyurl;
    delete opts.proxyurl;
    async = opts.async;
    delete opts.async;
    filename = opts.filename;
    delete opts.filename;
    elem = opts.elem;
    delete opts.elem;

    if (opts.format === "svg") {
      if (supportsSVG()) {
        dataType = "xml";
        opts.base64 = "0";
      } else {
        dataType = "text";
      }
    }

    if (opts.format === "kml") {
      dataType = "xml";
      opts.base64 = "0";
    }

    if (opts.imagemap !== undefined && opts.imagemap === "1") {
      dataType = "html";
    } else if (opts.format === "png" || opts.format === "gif" || opts.format === "jpeg") {
      opts.base64 = "1";
      dataType = "text";
    }

    if (opts.serversidecachehandling !== undefined && opts.serversidecachehandling === "1") {
      serversidecachehandling = opts.serversidecachehandling;
      delete opts.serversidecachehandling;
      opts.base64 = "0";
      dataType = "text";
    } else {
      serversidecachehandling = null;
    }

    opts.width = String(opts.width);

    postbody = JSON.stringify(opts);
    if (filename === null) {
      uniquename = $.md5(postbody) + ".";
    } else {
      uniquename = filename + ".";
    }
    if (opts.imagemap === "1") {
      uniquename += "html";
    } else {
      uniquename += opts.format;
    }
    params = {
      url : url,
      postbody : postbody,
      opts : opts,
      uniquename : uniquename,
      cacheurl : cacheurl,
      proxyurl : proxyurl,
      elem : elem,
      dataType : dataType,
      async : async,
      serversidecachehandling : serversidecachehandling
    };

    return params;
  }

  function getCachedMap(opts, params, xhr) {
    var map;
    if (opts.format === "png" || opts.format === "gif" || opts.format === "jpeg") {
      map = $("<img />").attr("src", params.cacheurl + params.uniquename);
    } else if (opts.format === "svg") {
      map = getSVGDocument(xhr);
    } else if (opts.format === "kml") {
      map = getXMLDocument(xhr);
    }

    return map;
  }

  function cacheMap(mapdata, cacheparams) {

    var postbody, retval;

    if (cacheparams.format === "svg" || cacheparams.format === "kml") {
      mapdata = xmlToString(mapdata);
    }
    postbody = { mapdata : mapdata,  filename : cacheparams.filename, format : cacheparams.format, imagemap: cacheparams.imagemap };
    retval = null;
    $.ajax({
      type : "POST",
      url : cacheparams.cacheurl,
      data : postbody,
      async : false,
      success : function (data) {
        retval = data;
      },
      error : function (xhr, txt, err) {
        retval = { error : "An error occurred while attempting to cache a map at " + cacheparams.cacheurl + ". textStatus: " + txt + "; errorThrown: " + err };
      }
    });

    return retval;
  }


  function buildMap(params, data, xhr) {

    var map, url, cacheparams, img;

    cacheparams = {filename: params.uniquename, cacheurl: params.cacheurl, format: params.opts.format, imagemap: params.opts.imagemap};

    if (params.opts.imagemap === "1" && params.cacheurl === null) {
      map = data;
    } else {
      if (params.opts.format === "svg") {
        map = getSVGDocument(xhr);
        if (params.cacheurl !== null) {
          cacheMap(map, cacheparams);
        }
      } else if (params.opts.format === "kml") {
        map = getXMLDocument(xhr);
        if (params.cacheurl !== null) {
          cacheMap(map, cacheparams);
        }
      } else {
        img = $("<img />");
        if (supportsdataURI() && params.cacheurl === null) {
          if (data.length > 32768 && isIE8Browser()) {
            map = "Internet Explorer 8 does not support data URIs larger than 32K and there is no cache URL configured. Cannot display image.";
          } else {
            map = img.attr("src", "data:image/" + params.opts.format + ";base64," + data);
          }
        } else if (params.cacheurl === null) {
          map = "Your browser does not support data URIs and there is no cache URL configured. Cannot display image.";
        } else if (params.cacheurl !== null) {
          url = cacheMap(data, cacheparams);
          if (url.error !== undefined) {
            map = url.error;
          } else if (params.opts.imagemap === "1") {
            map = data;
          } else {
            map = img.attr("src", url);
          }
        }
      }
    }
    if (params.noreturn) {
      return params.cacheurl + params.uniquename;
    }
    return map;
  }

  function getMapFromServer(params) {

    var url;

    if (params.proxyurl !== null) {
      url = params.proxyurl + "?url=" + encodeURIComponent(params.url) + "&mode=native";
    } else {
      url = params.url;
    }

    $.ajax({
      type : "POST",
      async : params.async,
      url : url,
      data : params.postbody,
      contentType : "application/json",
      processData : false,
      dataType : params.dataType
    });

  }


  function requestMap(params) {

    var map;
    map = null;
    $.ajaxSetup({
      // data = the map = what is returned from POST request by getMapFromServer below
      success : function (data, status, xhr) {
        map = buildMap(params, data, xhr);
      },
      error : function (xhr, txt, err) {
        map = "An error occurred while requesting a map. textStatus: " + txt + "; errorThrown: " + err + "; responseText:" + xhr.responseText;
      }
    });

    getMapFromServer(params);

    return map;
  }

  function retrieveMap(opts) {

    var params, map, imagemap = false;
    if (opts.imagemap !== undefined && opts.imagemap === "1") {
      imagemap = true;
    }
    if (!supportsJSON()) {
      return "Your browser does not support JSON and jQuery.kaart requires JSON.";
    }

    params = getParams(opts);

    /**
     * If file exists at opts.cacheurl, retrieve it; if 404, request a map from the webservice
     */
    if (params.cacheurl !== null) {
      $.ajax({
        type : "GET",
        url : params.cacheurl + params.uniquename,
        dataType : params.dataType,
        async : params.async,
        cache : false, // otherwise the 404 is cached
        success : function (data, status, xhr) {
          if (imagemap) {
            map = data;
          } else {
            map = getCachedMap(opts, params, xhr);
          }
        },
        error : function (xhr) {
          if (xhr.status === 404) {
            map = requestMap(params);
          }
        }
      });
    } else {
      map = requestMap(params);
    }
    if (imagemap) {
      return map;
    }
    if (opts.format === "svg" || opts.format === "kml") {
      return xmlToString(map);
    }
    // bitmap
    return map.attr("src");
  }

  function createMap(opts) {

    var params, returnvalue;

    if (!supportsJSON()) {
      return "Your browser does not support JSON and jQuery.kaart requires JSON.";
    }

    params = getParams(opts);

    if (params.cacheurl === null && params.serversidecachehandling !== "1") {
      return "No cache URL configured.";
    }

    params.noreturn = true;

    /**
     * If file exists at opts.cacheurl, return the opts.cacheurl; if 404, request a map from the webservice
     */
    if (params.cacheurl !== null) {
      $.ajax({
        type : "HEAD",
        url : params.cacheurl + params.uniquename,
        dataType : params.dataType,
        async : params.async,
        cache : false, // otherwise the 404 is cached
        success : function () {
          returnvalue = params.cacheurl + params.uniquename;
        },
        error : function (xhr) {
          if (xhr.status === 404) {
            returnvalue = requestMap(params);
          }
        }
      });

      if (returnvalue !== params.cacheurl + params.uniquename) {
        returnvalue = "Error: could not create map.";
      } else {
        returnvalue = true;
      }
    }

    if (params.serversidecachehandling === "1") {
      $.ajax({
        type : "POST",
        async : params.async,
        url : params.url + "?filename=" + params.uniquename,
        data : params.postbody,
        contentType : "application/json",
        processData : false,
        dataType : params.dataType,
        cache: false,
        // data is a URL of a map image
        success : function (data) {
          returnvalue = data;
        },
        error : function (xhr, txt, err) {
          returnvalue = "An error occurred while requesting a map. textStatus: " + txt + "; errorThrown: " + err;
        }
      });
    }

    return returnvalue;
  }

  function injectMap(params) {

    $.ajaxSetup({
      // data = the map = what is returned from POST request by getMapFromServer below
      success : function (data, status, xhr) {
        $(params.elem).html(buildMap(params, data, xhr));
      },
      error : function (xhr, txt, err) {
        $(params.elem).html("An error occurred while requesting a map. textStatus: " + txt + "; errorThrown: " + err + "; responseText:" + xhr.responseText);
      }
    });

    getMapFromServer(params);
  }

  function addMapToElement(elem, opts) {

    if (!supportsJSON()) {
      $(elem).html("Your browser does not support JSON and jQuery.kaart requires JSON.");
      return;
    }

    if (opts.format === "kml") {
      $(elem).html("Embedding a KML document in an HTML document is not supported. Use jQuery.fn.kaart('retrieve', options) to get a KML map as a string.");
      return;
    }

    opts.elem = elem;
    var params = getParams(opts);

    /**
     * If file exists at opts.cacheurl, inject that in the document; if 404, request a map from the webservice
     */
    if (params.cacheurl !== null) {
      $.ajax({
        type : "GET",
        async : params.async,
        url : params.cacheurl + params.uniquename,
        dataType : params.dataType,
        cache : false,  // otherwise the 404 is cached
        success : function (data, status, xhr) {
          var map = getCachedMap(opts, params, xhr);
          $(params.elem).html(map);
        },
        error : function (xhr) {
          if (xhr.status === 404) {
            injectMap(params);
          }
        }
      });
    } else if (params.serversidecachehandling !== "1") {
      injectMap(params);
    }

    if (params.serversidecachehandling === "1") {
      $.ajax({
        type : "POST",
        async : params.async,
        url : params.url + "?filename=" + params.uniquename,
        data : params.postbody,
        contentType : "application/json",
        processData : false,
        dataType : params.dataType,
        cache: false,
        // data is a URL of a map image
        success : function (data) {
          $(params.elem).html($("<img />").attr("src", data));
        },
        error : function (xhr, txt, err) {
          $(params.elem).html("An error occurred while requesting a map. textStatus: " + txt + "; errorThrown: " + err);
        }
      });
    }
  }

  var methods = {
    inject : function (options) {
      return this.each(function () {
        addMapToElement($(this), getOptions(options));
      });
    },

    retrieve : function (options) {
      return retrieveMap(getOptions(options));
    },

    create : function (options) {
      return createMap(getOptions(options));
    }
  };

  $.fn.kaart = function (method) {
    /**
     * http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
     */
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    if (typeof method === "object" || !method) {
      return methods.inject.apply(this, arguments);
    }
    $.error("Method " + method + " does not exist on jQuery.kaart");
    return null;
  };

  $.fn.kaart.defaults = {
    type : "dutchlanguagearea",
    base64 : "1",
    width : "300",
    async : true
  };

}(jQuery));
