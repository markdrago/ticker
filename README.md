#Setup

To install, make sure you have [npm](npmjs.org) ( `curl http://npmjs.org/install.sh | sh` ), then:

`npm install`.

This project uses bower for javascript dependency management. If you don't have bower installed, you can install it with npm by

`npm install -g bower`.

Then in the root of this project, do `bower install` to pull in the necessary dependencies.

This project also uses [sass](http://sass-lang.com/) instead of css for stylesheets,
so you will need to run `gulp sass` to run the [gulp](http://gulpjs.com/) task that
will compile the sass into usable css. Alternatively, you can run `gulp watch-sass` to
listen for changes to any `.scss` file and automatically compile it.

Finally, to run, make sure you have permissions to listen on port 80, or just use
`sudo npm start`.

#Using the app

The application is very simple to use; the center of the screen displays a feed
of most recent quotes, with a countdown bar at the top and an offscreen section
for adding a new quote. To skip to the next or previous quote, you can click the
Next or Previous buttons in the lower right corner, or simply use the arrow keys.

###Adding a quote
To create a new quote, either mouseover the top of the app, or use the shortcut
`ctrl + n` to open the creation pane. Then type the name of the person who said
the quote, followed by the quote itself, and click add. If the quote consisted of
more than one line, or a conversation, you can click the `+ Add line` button. This
displays another pair of inputs, one for the speaker and one for the line, and a
button to remove the line if indeed you did not want it.
