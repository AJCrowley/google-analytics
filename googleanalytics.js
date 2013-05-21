// _gaq array for Google Analytics params
var _gaq = _gaq || [];

// create self instantiating GA object
var GoogleAnalytics = function(inpageReq, debug)
{
	// if inpageReq param not passed, assume false
	inpageReq = inpageReq || false;
	// if debug param not passed, assume false
	debug = debug || false;
	// store self reference
	var self = this;

	// function to read data from meta tag
	this.getMeta = function(attr)
	{
		// get all meta tags
		var metaTags = document.getElementsByTagName("meta");
		// store result
		var result;
		// loop through all tags
		for(var i = 0; i < metaTags.length; i++)
		{
			// is this the one we seek?
			if (metaTags[i].name.search(attr) != -1)
			{
				// yep, store result and exit loop
				result = metaTags[i].content;
				break;
			}
		}
		// did we find it?
		if(!result)
		{
			// no, throw an error
			throw("Meta tag " + attr + " not found.");
		}
		// send back result
		return result;
	};

	this.trackEvent = function(category, action, value)
	{
		_gaq.push(["_trackEvent", category, action, value,, false]);
	};

	// setup defaults, including data from meta tags
	if(inpageReq)
	{
		var pluginUrl = "//www.google-analytics.com/plugins/ga/inpage_linkid.js";
		_gaq.push(["_require", "inpage_linkid", pluginUrl]);
	}
	try
	{
		_gaq.push(["_setAccount", this.getMeta("ga-tracking-id")]);
	}
	catch(err)
	{
		if(debug)
		{
			console.debug("FATAL: No tracking ID");
		}
		return;
	}
	try
	{
		_gaq.push(["_setDomainName", this.getMeta("ga-domain")]);
	}
	catch(err)
	{
		if(debug)
		{
			console.debug("No domain set");
		}
	}
	_gaq.push(["_trackPageview"]);
	// self executing function to embed script from google
	(
		function()
		{
			// create script element, set attributes
			var ga = document.createElement("script");
			ga.type = "text/javascript";
			ga.async = true;
			// determine if we're secure, use appropriate source for google's script
			ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
			// get first script tag
			var s = document.getElementsByTagName("script")[0];
			// and insert our new script element before
			s.parentNode.insertBefore(ga, s);
		}
	)();
};

// create instance
var googleAnalytics = new GoogleAnalytics();