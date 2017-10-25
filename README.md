
# wistia-js : Node.js package for Wistia APIs

Some test coverage for:

- [Wistia Data API](https://wistia.com/doc/data-api)
- [Wistia Upload API](https://wistia.com/doc/upload-api)

## Installation

Install it from npm:

```bash
$ npm install wistia-js
```

## Usage

```javascript
const wistia = require('wistia-js')('<WISTIA_API_KEY>');
const wistiaData = wistia.dataApi();
const wistiaUpload = wistia.uploadApi();

// Example for Data API
const accountData = await wistiaData.account.list();

const newProject = await wistia.projects.create({
	name: 'New Wistia Project',
});

// Example for Upload API, i.e. using URL
const videoMetadata = await wistiaUpload.upload({
	project_id: '<WISTIA_PROJECT_ID>',
	url: 'http://url/to/video.mp4'
});

// Example for Upload API, i.e. using file stream
const videoMetadata = await wistiaUpload.upload({
	project_id: '<WISTIA_PROJECT_ID>',
	file: fs.createReadStream('./path/to/file.mp4')
});
```

* `WISTIA_API_KEY` is the API Password you got from the Wistia dashboard and `WISTIA_PROJECT_ID` is the optional Project ID
* For the available parameters and responses check the [Wistia documentation](https://wistia.com/doc/developers), sections of which are also linked below

## [Wistia Data API](https://wistia.com/doc/data-api)

### [Projects](https://wistia.com/doc/data-api#projects)

`wistiaData.projects.`
- `list()`
- `show(hashedProjectId)`
- `create(projectData)`
- `update(hashedProjectId, projectData)`
- `delete(hashedProjectId)`
- `copy(hashedProjectId, copyOptions`)

### [Account](https://wistia.com/doc/data-api#account)

`wistiaData.account.`
- `list()`

### [Project Sharings](https://wistia.com/doc/data-api#project_sharings)

*Not implemented yet*

- `projectSharingsList(project_id,cb)`
- `projectSharingsShow(project_id,sharing_id,cb)`
- `projectSharingsCreate(project_id,sharing_data,cb)`
- `projectSharingsUpdate(project_id,sharing_id,project_sharing_data,cb)`
- `projectSharingsDelete(project_id,sharing_id,cb)`

### [Medias](https://wistia.com/doc/data-api#medias)

`wistiaData.medias.`
- `show(hashedMediaId)`
- `list(hashedMediaId, pagingAndSorting)`
- `stats(hashedMediaId`
- `update(hashedMediaId, mediaData)`
- `delete(hashedMediaId)`
- `copy(hashedMediaId, copyOptions)`

### [Customizations](https://wistia.com/doc/data-api#customizations)

`wistiaData.customizations.`

- `show(hashedMediaId)`
- `create(hashedMediaId, customizationData)`
- `update(hashedMediaId, customizationData)`
- `delete(hashedMediaId)`

### [Captions](https://wistia.com/doc/data-api#captions)

`wistiaData.captions.`

- `index(hashedMediaId)`
- `create(hashedMediaId, captionData)`
- `show(hashedMediaId, langCode)`
- `update(hashedMediaId, langCode)`
- `purchase(hashedMediaId)`

## [Wistia Upload API](https://wistia.com/doc/upload-api)

- `upload(params)`

## Testing
* Create `test/integration/config.json`, see `test/integration/config.example.json`
* Then:

```bash
$ npm run test
```

* To enable debug messages:

```bash
$ DEBUG=wistiajs:* DEBUG_LEVEL=verbose npm run test
```

## Known Issues

* Uploading a file with unknown length (such as from an AWS S3 stream) does not seem work.
	* This could be an issue with the 'content-length' setting of the form-data library, see [here](https://github.com/request/request/issues/2499)
	* Attempts to implement this using another library were so far fruitless, potentially because Wistia does not currently support it
