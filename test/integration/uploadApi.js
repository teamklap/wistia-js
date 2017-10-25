const fs = require('fs');
const test = require('ava');

const config = require('./config.json');
const wistia = require('../../')(config.apiPassword);

const uploadApi = wistia.uploadApi();
const dataApi = wistia.dataApi();

let testProject;

test.before(async t => {
	testProject = await dataApi.projects.create({
		name: 'Integration Test Project - Upload Api',
		description: 'This project was created as part of the wistiajs integration test. It can be deleted'
	});
})

test.after.always(async t => {
	await dataApi.projects.delete(testProject.hashedId);
});

test('Upload video to Wistia from file', async t => {
	const videoMetadata = await uploadApi.upload({
		name: 'Integration Test Video',
		description: 'Upload video to Wistia from file',
		project_id: testProject.id,
		file: fs.createReadStream(config.sampleVideoPath)
	});

	t.is(videoMetadata.name, 'Integration Test Video');
	t.is(videoMetadata.description, 'Upload video to Wistia from file');
});

test('Upload video to wistia from url', async t => {
	const videoMetadata = await uploadApi.upload({
		name: 'Integration Test Video',
		description: 'Upload video to wistia from url',
		project_id: testProject.id,
		url: config.sampleVideoUrl
	});

	t.is(videoMetadata.name, 'Integration Test Video');
	t.is(videoMetadata.description, 'Upload video to wistia from url');
});
