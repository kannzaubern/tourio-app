import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    switch (request.method) {
      case "GET": // Handle GET request to fetch a specific place
        console.log("Get specific place request.");
        const place = await Place.findById(id);
        if (!place) {
          response.status(404).json({ status: "Not Found" });
          return;
        }
        response.status(200).json(place);
        break;

      case "PUT": // Handle PUT request to update a specific place
        console.log("Updating place request.");
        const updatePlace = request.body; // Get updated data from request body
        await Place.findByIdAndUpdate(id, updatePlace); // Find and update specific place in the database
        response.status(200).json({ status: "Place was updated" });
        break;

      case "DELETE":
        console.log("Delete place request.");
        await Place.findByIdAndDelete(id); // Find and delete specific place in the database
        response.status(200).json({ status: "Successfully deleted" });
        break;

      default: // Handle unsupported HTTP methods
        console.log("Unsupported method request");
        response.status(405).json({ status: "Method not allowed" });
        break;
    }
  } catch (error) {
    // Log error and respond with 500 status for internal server errors
    console.error("Database operation failed:", error);
    response.status(500).json({ status: "Internal Server Error" });
  }
}
