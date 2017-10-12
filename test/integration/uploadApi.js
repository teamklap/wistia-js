const fs = require('fs');
const test = require('ava');

const config = require('./config.json');
const Wistia = require('../../')(config.apiKey);

const WistiaUpload = Wistia.WistiaUpload();

test('Upload video to Wistia', async t => {
	const videoMetadata = await WistiaUpload.upload({
		name: 'Test Video',
		description: 'This video was uploaded for integration testing',
		project_id: config.projectId,
		file: fs.createReadStream(config.sampleVideoPath)
	});

	t.is(videoMetadata.description, 'This video was uploaded for integration testing');
	t.is(videoMetadata.name, 'Test Video');
});
