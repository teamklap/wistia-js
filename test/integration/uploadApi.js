const fs = require('fs');
const test = require('ava');

const config = require('./config.json');
const wistia = require('../../')(config.apiKey);

const uploadApi = wistia.uploadApi();
const dataApi = wistia.dataApi();

let testProject;

test.before(async t => {
	testProject = await dataApi.projects.create({
		name: 'Wistiajs Integration Upload Api Test Project',
		description: 'This project was created as part of the wistiajs integration test. It can be deleted'
	});
})

test.after(async t => {
	await dataApi.projects.delete(testProject.hashedId);
});

test('Upload video to Wistia', async t => {
	const videoMetadata = await uploadApi.upload({
		name: 'Test Video',
		project_id: testProject.id,
		description: 'This video was uploaded for integration testing',
		file: fs.createReadStream(config.sampleVideoPath)
	});

	t.is(videoMetadata.description, 'This video was uploaded for integration testing');
	t.is(videoMetadata.name, 'Test Video');
});
