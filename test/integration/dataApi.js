const fs = require('fs');
const test = require('ava');

const config = require('./config.json');
const Wistia = require('../../')(config.apiKey);

const wistia = new Wistia.dataApi();

let testProject;

test.serial('.projects#create', async t => {
	testProject = await wistia.projects.create({
		name: 'Wistiajs Integration Test Project',
	});

	t.is(testProject.name, 'Wistiajs Integration Test Project');
});

test.serial('.projects#list', async t => {
	const projects = await wistia.projects.list();
	const foundTestProject = projects.find(project => project.id === testProject.id);

	t.deepEqual(testProject, foundTestProject, 'The test project is among the list of retrieved projects');
});

test.serial('.projects#show', async t => {
	const project = await wistia.projects.show(testProject.hashedId);

	t.is(testProject.id, project.id, 'The project shown is the test project');
});

test.serial('.projects#delete', async t => {
	const deletedProject = await wistia.projects.delete(testProject.hashedId);

	t.is(testProject.id, deletedProject.id, 'The test project was deleted');
});
