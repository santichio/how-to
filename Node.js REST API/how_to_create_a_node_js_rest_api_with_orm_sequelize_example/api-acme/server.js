const app = require('./src/app.js')

const PORT = 3000

app.listen(PORT, () => {
	console.log(`Server listen at port ${PORT}! Access via http://localhost:3000`)
})