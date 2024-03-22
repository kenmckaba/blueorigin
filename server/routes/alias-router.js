const express = require('express')

const AliasCtrl = require('../controllers/alias-ctrl')

const router = express.Router()

router.post('/alias', AliasCtrl.createAlias)
router.put('/alias/:id', AliasCtrl.updateAlias)
router.delete('/alias/:id', AliasCtrl.deleteAlias)
router.get('/alias/:id', AliasCtrl.getAliasById)
router.get('/aliases', AliasCtrl.getaliases)

module.exports = router