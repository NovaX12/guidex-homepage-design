import { jobHelpers } from "@/lib/supabase-helpers"
import JobTable from "./JobTable"

async function getJobs() {
  try {
    const jobs = await jobHelpers.getAllJobs()
    return jobs
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}

export default async function JobsPage() {
  const jobs = await getJobs()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-5">Job Management</h1>
      <JobTable initialJobs={jobs} />
    </div>
  )
}
