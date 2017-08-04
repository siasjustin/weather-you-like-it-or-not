const serialize = function(obj, excludes){
	let str = '';
	for (var prop in obj) if(!excludes.includes(prop)) str += prop + '=' + encodeURIComponent(obj[prop]) + '&';
	return str.substring(0, str.length-1);
}

const slugify = function(text){
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
}

const mountComponent = function() {
  window.scrollTo(0, 0);
  console.log("component has mounted");
}
const unmountComponent = function() {
  console.log("component unmounted");
}


/**
 * Gets the browser name or returns an empty string if unknown. 
 * This function also caches the result to provide for any 
 * future calls this function has.
 *
 * @returns {string}
 */
 
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        "Don't know";
};




let isMobile = false,
  isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  appName = isIos ? 'iOs' : 'Android',
  appUrl = isIos ? 'https://itunes.apple.com/us/app/ofo-riding-your-way-in-the-us-uk-and-sg/id1190831637?mt=8' : 'https://play.google.com/store/apps/details?id=so.ofo.abroad&hl=en', 
  isTablet = (isMobile && window.innerWidth > 600) ? true : false,
  isCellular = (isMobile && window.innerWidth < 600) ? true : false;


module.exports = {
  serialize,
	slugify,
  mountComponent,
  unmountComponent,
  browser,
  isMobile,
  isTablet,
  isCellular,
  isIos,
  appName,
  appUrl,
}