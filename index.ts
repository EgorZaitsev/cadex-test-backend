import express from "express"
import { json } from "body-parser"

const app = express()
app.use(json())

app.post("/api/triangulate", (req, res) => {
	const { length, width, height } = req.body
	
	const triangulation = calculateTriangulation(length, width, height)
	
	res.json({ triangulation })
})

function calculateTriangulation(length: number, width: number, height: number): number[] {
	const vertices = [
		// front
		0,
		0,
		0,
		length,
		0,
		0,
		length,
		height,
		0,
		0,
		height,
		0,
		// back
		0,
		0,
		width,
		length,
		0,
		width,
		length,
		height,
		width,
		0,
		height,
		width,
	]
	
	const indices = [
		0, 1, 2, 0, 2, 3,
		4, 5, 6, 4, 6, 7,
		3, 2, 6, 3, 6, 7,
		0, 1, 5, 0, 5, 4,
		1, 5, 6, 1, 6, 2,
		0, 4, 7, 0, 7, 3,
	]
	
	const triangulation: number[] = []
	
	for (let i = 0; i < indices.length; i += 3) {
		const a = indices[i] * 3
		const b = indices[i + 1] * 3
		const c = indices[i + 2] * 3
		
		triangulation.push(
			vertices[a],
			vertices[a + 1],
			vertices[a + 2],
			vertices[b],
			vertices[b + 1],
			vertices[b + 2],
			vertices[c],
			vertices[c + 1],
			vertices[c + 2],
		)
	}
	
	return triangulation
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

