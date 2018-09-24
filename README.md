# GrapesJS Plugin Twitter Bootstrap

Plugin Grapesjs with Twitter Bootstrap v3.3.7

### Usage
1. Clone this repository `git clone https://github.com/olivmonnier/grapesjs-plugin-bootstrap.git`
1. Replace in all files `grapesjs-plugin-bootstrap` with your plugin name
1. Update `package.json`
1. Install dependencies `npm i` and run the local server `npm start`
1. Start creating your plugin from `src/index.js`
1. Show some gif/demo if possible
1. Update README
1. When you're ready update the production file `npm run build`
1. Publish



## Summary

* Plugin name: `grapesjs-plugin-bootstrap`
* Components
  * `alert`
  * `container`
  * `dropdown`
  * `grid`
  * `label`
  * `media`
  * `panel`
  * `thumbnail`
  * `well`
* Blocks
  * `address`
  * `blockquote`
  * `button`
  * `header`
  * `image`
  * `link`
  * `list`
  * `paragraph`
  * `alert`
  * `dropdown`
  * `media`
  * `panel`
  * `thumbnail`
  * `well`
  * `container`
  * `row`
  * `column`
  * `columns-2`
  * `columns-3`
  * `columns-4`
  * `columns-4-8`
  * `columns-8-4`
...



## Download

* GIT
  * `git clone https://github.com/olivmonnier/grapesjs-plugin-bootstrap.git`


## Usage

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="dist/grapesjs-plugin-bootstrap.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      plugins: ['grapesjs-plugin-bootstrap'],
      pluginsOpts: {
        'grapesjs-plugin-bootstrap': {
          // options
        }
      }
  });
</script>
```





## Development

Clone the repository

```sh
$ git clone https://github.com/olivmonnier/grapesjs-plugin-bootstrap.git
$ cd grapesjs-plugin-bootstrap
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

## License

BSD 3-Clause
