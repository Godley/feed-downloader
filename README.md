# CS Blogs Feed Downloader
[![Build Status](https://travis-ci.org/csblogs/feed-downloader.svg?branch=master)](https://travis-ci.org/csblogs/feed-downloader)
[![Coverage Status](https://coveralls.io/repos/github/csblogs/feed-downloader/badge.svg?branch=master)](https://coveralls.io/github/csblogs/feed-downloader?branch=master)
[![Dependency Status](https://david-dm.org/csblogs/feed-downloader.svg)](https://david-dm.org/csblogs/feed-downloader)


The service which aggregates the new blog posts of [Computer Science Blogs](http://csblogs.com) users. 

It replaces the [csblogs-feed-aggregator](https://github.com/csblogs/csblogs-feed-aggregator) and improves upon it in the following ways:
* Correct parsing of a larger range of syndication feeds. ATOM feed parsing is significantly improved.
 * In theory, this covers ATOM and RSS.
*  Full behavioural test suite and code linting meaning it's easier to modify and verify new code
* Discovery of new blog posts kicks off the Amazon Simple Notification Service to inform future iOS/Android CS Blogs apps and the CS Blogs Slack group
* PostgreSQL rather than MongoDB
* Performance is improved by
  * Using an [If-Modified-Since](http://www.freesoft.org/CIE/RFC/1945/58.htm) HTTP request to only download and parse feeds that purports to have changed
  * Increased use of concurrency using [ES2015 Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

The application uses some AWS (Amazon Web Services) specific features, however it is platform agnostic and can be ran from any system which supports Node.js. The transpiled output of the source code has been verified as working on node v0.10.36 and above.
