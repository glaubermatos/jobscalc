import { NextApiRequest, NextApiResponse } from "next"
import { saveNewJob } from "../_lib/manageJob"
import { backend } from "../_lib/services/backend"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {profileId} = req.query
        const {job} = req.body
        
        console.log({profileId, job})

    } 
    // else 
    //     if (req.method === 'GET') {
    //         const {email} = req.query
            
    //         console.log(email)

    //         const response = await api.get(`/profiles/${email}`)

    //         return res.json(response.data)
    // }

    res.status(200)
}