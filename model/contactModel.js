const { getPool,sql } = require('../config/database');

// get Contacts
async function getContacts(accountId, options) {
    const favoriteOnly = options.favoriteOnly;
    const search = options.search;
    const page = options.page;
    let sortBy = options.sortBy;
    let sortDir = options.sortDir;
    
    const pool = await getPool();

    let whereClause = 'WHERE account_id = @accountId';

    if(favoriteOnly){
        whereClause += 'AND is_favorite = 1';
    }

    if(search){
        whereClause += 'AND (first_name LIKE @search OR last_name LIKE @search)';
    }

    const allowedSortColumns = ['first_name', 'last_name', 'created_at'];
    if(allowedSortColumns.includes(sortBy)===false){
        sortBy = 'created_at';
    }
    if(sortDir !== 'ASC' && sortDir !== 'DESC'){
        sortDir = 'DESC';
    }

    //pagination 10 data per page
    const perPage = 10;
    let currentPage = Number(page);
    if(!currentPage || currentPage<1){
        currentPage = 1;
    }
    const offset = (currentPage-1)*perPage;
    
    const request = pool.request();
    request.input('accountId', sql.Int, accountId);
    if (search) {
        request.input('search', sql.NVarChar, '%' + search + '%');
    }
    request.input('offset', sql.Int, offset);
    request.input('perPage', sql.Int, perPage);

    const result = await request.query(
    'SELECT id, first_name, last_name, is_favorite, personal_note, created_at ' +
      'FROM contacts ' +
      whereClause +
      ' ORDER BY ' + sortBy + ' ' + sortDir +
      ' OFFSET @offset ROWS FETCH NEXT @perPage ROWS ONLY'
    );

     return result.recordset;
}

//getContactById
async function getContactById(accountId, id) {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('accountId', sql.Int, accountId)
        .input('id',sql.Int, id)
        .query(
            'SELECT id, first_name, last_name, is_favorite, personal_note, created_at ' +
            'FROM contacts WHERE account_id = @accountId AND id = @id'
        );

    return result.recordset[0];
}


// setFavorite Mark
async function markFavorite(accountId, id) {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('accountId', sql.Int, accountId)
        .input('id', sql.Int, id)
        .query(
            'UPDATE contacts SET is_favorite = 1 ' +
        'OUTPUT INSERTED.* ' +
        'WHERE account_id = @accountId AND id = @id'
        );
    return result.recordset[0];
}

// Set Unfavorite mark
async function removeFavorite(accountId, id) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('accountId', sql.Int, accountId)
    .input('id', sql.Int, id)
    .query(
      'UPDATE contacts SET is_favorite = 0 ' +
        'OUTPUT INSERTED.* ' +
        'WHERE account_id = @accountId AND id = @id'
    );

  return result.recordset[0];
}

// make favorite or unfavorite
async function toggleFavorite(accountId, id) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('accountId', sql.Int, accountId)
    .input('id', sql.Int, id)
    .query(
      'UPDATE contacts ' +
        'SET is_favorite = CASE WHEN is_favorite = 1 THEN 0 ELSE 1 END ' +
        'OUTPUT INSERTED.* ' +
        'WHERE account_id = @accountId AND id = @id'
    );

  return result.recordset[0];
}

// update personal notes
async function updateNote(accountId, id, note) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('accountId', sql.Int, accountId)
    .input('id', sql.Int, id)
    .input('note', sql.NVarChar, note)
    .query(
      'UPDATE contacts SET personal_note = @note ' +
        'OUTPUT INSERTED.* ' +
        'WHERE account_id = @accountId AND id = @id'
    );

  return result.recordset[0];
}

//get stats counts
async function getStats(accountId) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('accountId', sql.Int, accountId)
    .query(
      'SELECT ' +
        'COUNT(*) AS total_contacts, ' +
        'SUM(CASE WHEN is_favorite = 1 THEN 1 ELSE 0 END) AS favorite_contacts, ' +
        'SUM(CASE WHEN personal_note IS NOT NULL THEN 1 ELSE 0 END) AS contacts_with_notes ' +
        'FROM contacts WHERE account_id = @accountId'
    );

  return result.recordset[0];
}

module.exports = {
  getContacts,
  getContactById,
  markFavorite,
  removeFavorite,
  toggleFavorite,
  updateNote,
  getStats,
};
