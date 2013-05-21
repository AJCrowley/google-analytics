Google Analytics
================

Include script in your HTML with
```html
<meta name="ga-domain" content="yourdomain.com" />
<meta name="ga-tracking-id" content="UA-12345678-1" />
<script type="text/javascript" src="lib/googleanalytics.js"></script>
```
Where the ga-domain is your domain, and ga-tracking-id meta tag is your Google Analytics ID.

The rest is handled automatically!

You can handle tracking with the following syntax:
```js
googleAnalytics.trackEvent("eventCategory", "eventAction", "eventDetail");
```

When the object is instance (usually contained within the main googleanalytics.js file, there are two optional params, both boolean:
```js
var googleAnalytics = new GoogleAnalytics([inpage link ID required], [debug mode]);
```
Both default to false. Sometimes Google requires the inpage link ID. If this is the case, the first parameter should be true. Debug mode just outputs useful info into the console if true.
