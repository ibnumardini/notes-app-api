const { nanoid } = require('nanoid');

const id = nanoid(16);
const timestamps = new Date().toISOString();

const notes = [{
  title: 'Sample 1',
  tags: ['sample'],
  body: 'Lorem ipsum dolor sit amet.',
  id,
  createdAt: timestamps,
  updatedAt: timestamps,
}];

module.exports = notes;
