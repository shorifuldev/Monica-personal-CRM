const contactModel = require('../model/contactModel')

// GET/api/contacts
async function listContacts(req, res) {
    try {
        const contacs = await contactModel.getContacts(req.accountId,{
            favoriteOnly : req.query.favorite ==='1',
            search: req.query.search,
            page: req.query.page,
            sortBy: req.query.sort_by,
            sortDir: req.query.sort_dir
        });
        res.json({status: 'sucess', data: contacs});
    }
    catch (error) {

        console.log(error);
        res.status(500).json({status:'error', message: 'Something is wrong'});

    }
}

// GET/api/contacts/favorites
async function listFavorites(req, res) {
    try {
        const contacs = await contactModel.getContacts(req.accountId,{
            favoriteOnly:true,
            page: req.query.page
        });

        res.json({status:'success', data:contacs});
    }
    catch (error) {
        console.log(error);
        req.status(500).json({status:'error', message:'Something is wrong'})
    }
}


// GET/api/contacts/:id
async function getContact(req, res) {
    try {
        const contact = await contactModel.getContactById(req.accountId, req.params.id);

        if(!contact){
            res.status(404).json({status: 'error', message: 'Contact not found'})
        }
        res.json({status:'sucess', data: contact});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({status:'error', message:'Something is wrong'})
    }
}

// POST/api/contacts/:id/favorite
async function addFavorite(req, res) {
  try {
    const contact = await contactModel.markFavorite(req.accountId, req.params.id);

    if (!contact) {
      return res.status(404).json({ status: 'error', message: 'Contact not found!' });
    }

    res.json({ status: 'success', data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something is wrong' });
  }
}


// DELETE/api/contacts/:id/favorite

async function deleteFavorite(req, res) {
    console.log(req.params);
    
  try {
    const contact = await contactModel.removeFavorite(req.accountId, req.params.id);

    if (!contact) {
      return res.status(404).json({ status: 'error', message: 'Contact not found!' });
    }

    res.json({ status: 'success', data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something is wrong' });
  }
}

// PATCH /api/contacts/:id/favorite
async function toggleFavorite(req, res) {
  try {
    const contact = await contactModel.toggleFavorite(req.accountId, req.params.id);

    if (!contact) {
      return res.status(404).json({ status: 'error', message: 'Contact not found!' });
    }

    res.json({ status: 'success', data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something is wrong' });
  }
}

// PUT /api/contacts/:id/note
async function updateNote(req, res) {
  try {
    const note = req.body.personal_note || null;
    const contact = await contactModel.updateNote(req.accountId, req.params.id, note);

    if (!contact) {
      return res.status(404).json({ status: 'error', message: 'Contact not found!' });
    }

    res.json({ status: 'success', data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something is wrong' });
  }
}

// GET /api/contacts/stats
async function getStats(req, res) {
  try {
    const stats = await contactModel.getStats(req.accountId);
    res.json({ status: 'success', data: stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something is wrong' });
  }
}

module.exports = {
  listContacts,
  listFavorites,
  getContact,
  addFavorite,
  deleteFavorite,
  toggleFavorite,
  updateNote,
  getStats,
};
