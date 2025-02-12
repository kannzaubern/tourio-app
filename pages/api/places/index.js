import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    console.log("Place:", places);
    response.status(200).json(places);
    return;
  }
  response.status(405).json({ status: "Method not allowed..." });
}
