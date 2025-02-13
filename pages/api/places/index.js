import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  // Handle GET requests to fetch all places
  if (request.method === "GET") {
    const places = await Place.find(); // Retrieve all places from database
    console.log("Place:", places);

    response.status(200).json(places); // Respond with retrieved places as JSON;returns the data itself (e.g., a list of places).
    return;
  }

  // Handle POST requests to create a new place
  if (request.method === "POST") {
    console.log("Post in api/places");
    const placeData = request.body; // Get data from request body (new place data)
    await Place.create(placeData); // Insert new place into database

    response.status(201).json({ status: "New place created" }); // POST typically returns a status to indicate the action has been performed; not the data itself
    return;
  }

  response.status(405).json({ status: "Method not allowed" });
}
