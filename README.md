
# wistia-js : Node.js package for Wistia APIs

So far tested for:

- [Wistia Data API](https://wistia.com/doc/data-api)
- [Wistia Upload API](https://wistia.com/doc/upload-api)

Installation
--------------------------------------

Install it from npm:

```bash
$ npm install wistia-js
```

Usage
--------------------------------------

```js

const wistia = require('wistia-js')('<WISTIA_API_KEY>');
const wistiaData = Wistia.dataApi();
const wistiaUpload = Wistia.uploadApi();

// Example for Data API
const accountData = await wistiaData.account.list();

const newProject = await wistia.projects.create({
	name: 'New Wistia Project',
});

// Example for Upload API, i.e. using URL
const videoMetadata = wistiaUpload.upload({
	project_id: '<WISTIA_PROJECT_ID>',
	url: 'http://url/to/video.mp4'
});

// Example for Upload API, i.e. using file stream
const videoMetadata = await wistiaUpload.upload({
	project_id: '<WISTIA_PROJECT_ID>',
	file: fs.createReadStream('//path/to/file.mp4')
});

```
Where **WISTIA_API_KEY** is the API Password you got from the Wistia dashboard and **WISTIA_PROJECT_ID** is the optional Project ID.

## Wistia Data API Functions

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

### Events

- `eventRead(event_key,cb)`


### Project Sharings

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

### Captions

- `captionsIndex(media_id,cb)`
- `captionsCreate(media_id,caption_data,cb)`
- `captionsShow(media_id,lang_code,cb)`
- `captionsUpdate(media_id,lang_code,cb)`
- `captionsPurchase(media_id,cb)`

## Wistia Upload API Functions

- `upload(params)`

Testing
--------------------------------------
* Create `test/integration/config.json` from `test/integration/config.example.json`
* Then:

```bash
$ npm run test
```
