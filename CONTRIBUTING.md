# Contributing to the CS Blogs Feed Downloader

Thanks for your interest in contributing to the CS Blogs project. One of the main aims of the project was to expose more students, particularly those from The University of Hull, to the world of open source software development.

This document outlines how to contribute and some more technical information about the project to help you along the way.

## The CS Blogs feed what now?

The `feed-downloader` package is the beating heart of the system (if a heart beat every 5 minutes that is...) 

1. Every 5 minutes the system requests the syndication feed (RSS/ATOM) of every CS Blogs author
2. If there are new blog posts in said feed they are parsed out into nicely formatted `Post` objects
3. These post objects are persisted to a [PostgreSQL](http://www.postgresql.org) database
4. Finally, a notification is sent via [Amazon SNS](https://aws.amazon.com/sns/) to the Android App, (in future) the iOS app and the CS Blogs Slack channel.

The application code is written in Node.js, using [Babel](https://babeljs.io) to transpile from nice modern ES7 JavaScript to the ES5 (and subset of ES6) that node currently handles.

## How do I develop?
### Get yourself a task!
The very first thing you should do is speak to the project coordinator to discuss exactly which feature or fix you want to work on. Danny can be contacted by emailing [danny@csblogs.com](mailto:danny@csblogs.com), but an even better way to get in touch is to join the Slack group by clocking the slack button in the README of this repository.

If an item in the issue tracker has a `myfirstpr` label on it and no one has commented to claim it then you can start work on it, without having to contact anyone, once you've commented to say you're claiming it.

### Fork the code
Click the fork button in the top right hand corner of this repositories page on Github. Forking makes your own personal copy of the code under your name. Clone this new repo to your PC/Mac.

### Branch
Now you have the repository on your device you should make a branch name that accurately portrays the unit of work you are doing. Branch names should follow the [WP Calypso](https://github.com/Automattic/wp-calypso/blob/master/docs/git-workflow.md) naming conventions:
```
add/{something} -- When you are adding a completely new feature
update/{something} -- When you are iterating on an existing feature
fix/{something} -- When you are fixing something broken in a feature
try/{something} -- When you are trying out an idea and want feedback
```
You can create this new branch on the command line by running something like `git checkout -b add/my-cool-new-feature`.

### Run the code
The next thing to do is ensure that the existing code runs as expected. The first thing to do is run `npm install`, which will download all the libraries the application requires to run.

Now, run `npm test`. You should see a bunch of green ticks, and a message saying that all tests passed. A few statistics about how much of the code has been tested will also be printed to your command line.

Finally, run `npm start` -- this transpiles all of the source code to something Node.js can run and then starts the application.

### Start working!
Open your editor of choice (I like [VS Code](https://code.visualstudio.com)) and start on the feature or fix you were assigned in step one. Working in a [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) fashion ensures that all of your code will be tested once you're finished implementing your code.

In order for your code to be accepted into the repository it must conform to the [AirBnB JavaScript programming style guidelines](https://github.com/airbnb/javascript). Don't be daunted by this huge document. You can run `npm run lint` from your command line at any time to see which parts of your code aren't conforming to the spec. To go one step better you can see issues as you type by using an [ESLint plug-in for your favourite editor](http://eslint.org/docs/user-guide/integrations#editors).

As well as conforming to the style guidelines your code must be well tested. At the minimum this means all possible branches throughout your new functions should have unit test coverage. The project maintainer will be more than happy to help with any questions you can fire at him about testing.

### Make a pull request
From your copy of the repository on Github click the green Pull Request button. Set `csblogs/feed-downloader`'s master branch as the base fork and the branch you created earlier as the head fork.

Write a PR message that fully explains what you've done, with some basic documentation and an explanation of its usage.

The project maintainer, or another contributor, will review your work and give you some _constructive_ criticism on how to improve it. Once everyone is happy it'll be merged into the repository. At this point you should pour yourself a :beer: and celebrate a job well done :tada:
