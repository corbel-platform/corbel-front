![Codeship](https://codeship.com/projects/1c362220-953e-0133-5f34-4a53072d6648/status?branch=master)

## corbel-front

Admin frontend for Corbel

## Project Management

* [CI](https://codeship.com/projects/125138)
* [Chat](https://devialab.slack.com/messages/general/)


## Installation

```
gem install compass
npm install -g bower protractor
npm install
webdriver-manager update
```


## Run project

* Dev mode
	
	```
	grunt serve
	```

* Prod mode (optimized)

	```
	grunt serve:dist
	```

### Supported options

  * **serverPort** (`9000`): Change server port.
  * **testPort** (`9001`): Change test port
  * **liveReloadPort** (`35729`): Change liveReload port

	```
	grunt serve --serverPort 9003 --testPort 1234
	```


## Build project

```
grunt build
```


## Set environment config

Build/run project with specific environment config.

Supported values: `int` `prod`

```
grunt build --env int
grunt serve --env prod
```


## Run tests

* Unit

	```
	grunt test
	```

* End-2-End

	```
	npm run webdriver
	```

	```
	grunt test:e2e
	```


## Release

```
grunt release:1.2.3
```
