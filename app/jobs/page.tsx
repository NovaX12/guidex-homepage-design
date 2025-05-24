import { jobHelpers, savedJobsHelpers } from "@/lib/supabase-helpers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import JobCard from "@/components/JobCard"
import { redirect } from "next/navigation"
import AuthButtonServer from "@/components/AuthButtonServer"

async function getJobs() {
  const supabase = createServerComponentClient({ cookies })
  const { data: jobs, error } = await jobHelpers.getAllJobs(supabase)

  if (error) {
    console.error("Error fetching jobs:", error)
    return []
  }

  return jobs || []
}

async function getSavedJobIds(userId: string) {
  const supabase = createServerComponentClient({ cookies })
  const { data: savedJobIds, error } = await savedJobsHelpers.getSavedJobIds(supabase, userId)

  if (error) {
    console.error("Error fetching saved job IDs:", error)
    return []
  }

  return savedJobIds?.map((savedJob) => savedJob.job_id) || []
}

export default async function Jobs() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const jobs = await getJobs()
  const savedJobIds = await getSavedJobIds(session.user.id)

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <AuthButtonServer />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} userId={session.user.id} isSaved={savedJobIds.includes(job.id)} />
        ))}
      </div>
      <Link
        href="/jobs/add"
        className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Job
      </Link>
    </div>
  )
}
