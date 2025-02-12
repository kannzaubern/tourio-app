import dbConnect from '@/db/connect';
import Place from '@/db/models/Places';

export default async function handler(request, response) {
    await dbConnect();
    const { id } = request.query;

    try {
        switch (request.method) {
            case 'PUT':
                const updatePlace = request.body;
                console.log('Updating place request.');
                await Place.findByIdAndUpdate(id, updatePlace);
                response.status(200).json({ status: 'Place was updated' });

                break;
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'Method not allowed.' });
    }


    // if (request.method === "GET") {
    //   const place = await Place.findById(id);

    //   if (!place) {
    //     response.status(404).json({ status: "Not Found" });
    //     return;
    //   }
    //   response.status(200).json(place);
    //   return;
    // }
    // response.status(405).json({ status: "Method not allowed" });

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
