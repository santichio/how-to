const dataSource = require('../models')

class Services {
	constructor (modelName) {
		this.model = modelName
	}

	async getAllRecords() {
		return dataSource[this.model].findAll()
	}

	async getOneRecordById(id) {
		return dataSource[this.model].findByPk(id)
	}

	async createRecord(dataOfRecord) {
		return dataSource[this.model].create(dataOfRecord)
	}

	async updateRecord(updatedData, id) {
		const listOfUpdatedRecords = dataSource[this.model].update(updatedData, {
			where: { id: id }
		})

		if (listOfUpdatedRecords[0] === 0) {
			return false
		} else {
			return true
		}
	}

	async deleteRecord(id) {
		return dataSource[this.model].destroy({ where: { id: id}})
	}
}

module.exports = Services