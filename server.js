const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(express.json());

function checkAccountId(req, res, next) {
    const accountId = Number(req.headers['account-id']);
    if(!accountId){
        return res.status(401).json({status:'error', Message: 'Givee header as account-id'});
    }

    req.accountId = accountId;
    next();
    
}

app.use('/api/contacts', checkAccountId, contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server runing on : http://localhost:${PORT}`);
    
})

module.exports = app;