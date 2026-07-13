import type { VercelRequest, VercelResponse } from "@vercel/node"


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  const query = req.query.q


  if (!query || typeof query !== "string") {
    return res.status(400).json({
      error: "Missing search query"
    })
  }


  try {

    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    )


    if (!response.ok) {
      return res.status(response.status).json({
        error: "Deezer request failed"
      })
    }


    const data = await response.json()


    return res.status(200).json(data)


  } catch(error) {

    console.error(error)

    return res.status(500).json({
      error: "Internal server error"
    })

  }

}