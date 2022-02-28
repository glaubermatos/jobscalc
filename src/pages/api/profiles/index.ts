import { NextApiRequest, NextApiResponse } from "next";
import { backend } from "../_lib/services/backend";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const profile = req.body

        backend.post('/profiles', profile)
            .then(response => res.status(response.status).send(response.data))
            .catch(error => res.status(error.response.status).send(error.response.data))
    }
}