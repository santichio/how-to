class Controller {
	constructor(serviceEntity) {
		this.serviceEntity = serviceEntity
	}

	async getAll(req, res) {
		try {
			const recordsList = await this.serviceEntity.getAllRecords()
			return res.status(200).json(recordsList)
		} catch (err) {
			//error
		}
	}

	async getOneById(req, res) {
		const { id } = req.params

		try {
			const record = await this.serviceEntity.getOneRecordById(Number(id))
			return res.status(200).json(record)
		} catch (err) {
			// error
		}
	}

	async createNew(req, res) {
		const dataToCreate = req.body

		try {
			const newRecordCreated = await this.serviceEntity.createRecord(dataToCreate)
			return res.status(200).json(newRecordCreated)
		} catch (err) {
			// error
		}
	}

	async update(req, res) {
		const { id } = req.params
		const dataUpdated = req.body

		try {
			const isUpdated = await this.serviceEntity.updateRecord(dataUpdated, Number(id))

			if (!isUpdated) {
				return res.status(400).json({ message: 'Record doesn\'t updated!'})
			} else {
				return res.status(200).json({ message: 'Successfuly updated!' })
			}
		} catch (err) {
			// error
		}
	}

	async delete(req, res) {
		const { id } = req.params

		try {
			await this.serviceEntity.deleteRecord(Number(id))
			return res.status(200).json({ message: `ID ${id} deleted!` })
		} catch (err) {
			return res.status(500).json(err.message)
		}
	}
}

module.exports = Controller