import { NextApiRequest, NextApiResponse } from "next";
import { backend } from "../../../_lib/services/backend";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { profileId, jobId } = req.query

    if (req.method === 'DELETE') {
        backend.delete(`/profiles/${profileId}/jobs/${jobId}`)
            .then(response => res.status(response.status).send(null))
            .catch(error => res.status(error.response.status).send(error.response.data))
    }

    else if (req.method === 'PUT') {
        const jobToUpdate = req.body

        backend.put(`/profiles/${profileId}/jobs/${jobId}`, jobToUpdate)
            .then(response => res.status(response.status).send(response.data))
            .catch(error => res.status(error.response.status).send(error.response.data))
    }
} 