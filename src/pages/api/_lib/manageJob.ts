import { api } from "../../../services/api";

interface Job {
    name: string;
    workingHoursPerDay: number,
    hoursEstimate: number,
    projectValue: number
}

export async function saveNewJob(job: Job, profileId: number,) {
    return await api.post(`/profiles/${profileId}/jobs`, job)
      
}