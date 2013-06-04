/*
	GoogleAnalytics.js by Kris McCann, 2013

	This is a helper object that allows you to define your GA parameters in the meta tags.
	At it's most basic, it automates the implementation of google analytics, but also
	allows for more advanced options to be passed and tracked.

	Basic usage:
	var googleAnalytics = new GoogleAnalytics(true);

	Params:
		autoSentPageView - boolean: send pageview to analytics automatically

	Advanced usage:
	googleAnalytics.track
	(
		"send",
		"social",
		{
			"socialNetwork": "facebook",
			"socialAction": "like",
			"socialTarget": "http://www.facebook.com"
		}
	);

	Params:
		action - string: "create" for initial instancing, "send" for additional requests, except custom dimensions and metrics, then "set"
		category - string: category of action
		options - object: additional options, docs at https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
*/
(
	function()
	{
		// create self instantiating GA object
		window.GoogleAnalytics = function(autoSendPageView)
		{
			// create self reference for scope
			var self = this;
			// init empty container object for our tracking
			//this.analytics;
			// initialize
			this.init(this.getMeta("ga-tracking-id"), this.getMeta("ga-domain"));
			// do we want to auto send the pageview?
			if(autoSendPageView)
			{
				// send pageview
				this.track("send", "pageview");
			}
		};

		GoogleAnalytics.prototype =
		{
			// insert script and setup google's object
			init: function(trackingId, trackingDomain)
			{
				//window['GoogleAnalyticsObject'] = "ga";
				this.analytics = this.analytics || function()
				{
					(this.analytics.q = this.analytics.q || []).push(arguments);
				},
				this.analytics.l = new Date();
				gaScript = document.createElement("script"),
				scriptBlock = document.getElementsByTagName("script")[0];
				gaScript.async = 1;
				gaScript.src = "//www.google-analytics.com/analytics.js";
				scriptBlock.parentNode.insertBefore(gaScript, scriptBlock);
				this.analytics("create", trackingId, trackingDomain);
			},

			// function to read data from meta tag
			getMeta: function(attr)
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
					console.log("Meta tag " + attr + " not found.");
					// and return
					return;
				}
				// send back result
				return result;
			},

			track: function(action, cat, options)
			{
				if(cat)
				{
					if(options)
					{
						this.analytics(action, cat, options);
					}
					else
					{
						this.analytics(action, cat);
					}
				}
				else
				{
					if(options)
					{
						this.analytics(action, options);
					}
					else
					{
						throw("FATAL: Nothing to do");
					}
				}
			}
		};
	}
)();
