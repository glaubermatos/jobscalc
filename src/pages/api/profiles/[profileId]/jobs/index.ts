import { NextApiRequest, NextApiResponse } from "next";
import { backend } from "../../../_lib/services/backend";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { profileId } = req.query
    
    if (req.method === 'GET') {
        const response = await backend.get(`/profiles/${profileId}/jobs`)
        res.status(response.status).send(response.data)
    }

    else if (req.method === 'POST') {
        const newJob = req.body

        backend.post(`/profiles/${profileId}/jobs`, newJob)
            .then(response => res.status(response.status).send(null))
            .catch(error => res.status(error.response.status).send(error.response.data))
    }
}