import Alias from '../models/alias-model'

const createAlias = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an alias',
    })
  }

  const alias = new Alias(body)

  if (!alias) {
    return res
      .status(400)
      .json({ success: false, error: 'failed to create alias' })
  }

  alias
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: alias._id,
        message: 'Alias created!',
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Alias not created!',
      })
    })
}

const updateAlias = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Alias.findOne({ _id: req.params.id }, (err, alias) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Alias not found!',
      })
    }
    alias.name = body.name
    alias.time = body.time
    alias.rating = body.rating
    alias
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: alias._id,
          message: 'Alias updated!',
        })
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Alias not updated!',
        })
      })
  })
}

const deleteAlias = async (req, res) => {
  await Alias.findOneAndDelete({ _id: req.params.id }, (err, alias) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!alias) {
      return res.status(404).json({ success: false, error: `Alias not found` })
    }

    return res.status(200).json({ success: true, data: alias })
  }).catch((err) => console.log(err))
}

const getAliasById = async (req, res) => {
  await Alias.findOne({ _id: req.params.id }, (err, alias) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!alias) {
      return res.status(404).json({ success: false, error: `Alias not found` })
    }
    return res.status(200).json({ success: true, data: alias })
  }).catch((err) => console.log(err))
}

const getAliases = async (req, res) => {
  await Alias.find({}, (err, aliases) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!aliases.length) {
      return res.status(404).json({ success: false, error: `Alias not found` })
    }
    return res.status(200).json({ success: true, data: aliases })
  }).catch((err) => console.log(err))
}

export const AliasCtrl = {
  createAlias,
  updateAlias,
  deleteAlias,
  getAliases,
  getAliasById,
}
