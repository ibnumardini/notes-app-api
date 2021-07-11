const { nanoid } = require('nanoid');
const notes = require('../entities/notes-entity');

const addNote = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const resp = h.response({
      status: 'success',
      message: 'Note succesfully to add',
      data: {
        noteId: id,
        title,
      },
    }).code(201);

    return resp;
  }

  const resp = h.response({
    status: 'fail',
    message: 'Note failed to add',
  }).code(400);

  return resp;
};

const getNotes = () => ({
  status: 'success',
  data: {
    notes,
  },
  message: 'Notes successfully to get',
});

const getNote = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'status',
      data: {
        note,
      },
      message: 'Note successfully to get by id',
    };
  }

  const resp = h.response({
    status: 'fail',
    message: 'Note is not found',
  }).code(404);

  return resp;
};

const editNote = (req, h) => {
  const { id } = req.params;

  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const idx = notes.findIndex((note) => note.id === id);

  if (idx !== -1) {
    notes[idx] = {
      ...notes[idx],
      title,
      tags,
      body,
      updatedAt,
    };

    const resp = h.response({
      status: 'success',
      message: 'Note successfully to updated',
    }).code(200);

    return resp;
  }

  const resp = h.response({
    status: 'fail',
    message: 'Note failed to updated',
  }).code(400);

  return resp;
};

const deleteNote = (req, h) => {
  const { id } = req.params;

  const idx = notes.findIndex((note) => note.id === id);

  if (idx !== -1) {
    notes.splice(idx, 1);

    const resp = h.response({
      status: 'success',
      message: 'Note successfully deleted',
    }).code(200);

    return resp;
  }

  const resp = h.response({
    status: 'fail',
    message: 'Note failed to deleted',
  }).code(400);

  return resp;
};

module.exports = {
  addNote,
  getNotes,
  getNote,
  editNote,
  deleteNote,
};
