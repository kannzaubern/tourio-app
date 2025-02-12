import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("Id", id);

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      response.status(404).json({ status: "Not Found" });
      return;
    }
    response.status(200).json(place);
    return;
  }

  if (request.method === "POST") {
    const placeData = request.body;
    await Place.create(placeData);

    response.status(201).json({ status: "New place created" });
    return;
  }

  response.status(405).json({ status: "Method not allowed" });
}
