GoogleAnalytics.js
================

This is a helper object that allows you to define your GA parameters in the meta tags.
At it's most basic, it automates the implementation of google analytics, but also
allows for more advanced options to be passed and tracked.

Basic usage:
Include script in your HTML with
```html
<meta name="ga-domain" content="yourdomain.com" />
<meta name="ga-tracking-id" content="UA-12345678-1" />
<script type="text/javascript" src="lib/googleanalytics.js"></script>
```
Where the ga-domain is your domain, and ga-tracking-id meta tag is your Google Analytics ID.

Create instance with:
```js
/*
	Params:
		autoSentPageView - boolean: send pageview to analytics automatically
*/
var googleAnalytics = new GoogleAnalytics(true);
```

Advanced usage:
```js
/*
Params:
	action - string: "create" for initial instancing, "send" for additional requests, except custom dimensions and metrics, then "set"
	category - string: category of action
	options - object: additional options, docs at https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
*/
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
```