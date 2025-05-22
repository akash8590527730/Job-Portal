import { getSingleJob, updateHiringStatus } from '@/api/apiJobs'
import ApplicationCard from '@/components/ApplicationCard'
import ApplyJobDrawer from '@/components/ApplyJobDrawer'
import useFetch from '@/hooks/Usefetch'
import { useUser } from '@clerk/clerk-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import MDEditor from '@uiw/react-md-editor'
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  MapPinIcon,
} from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Job = () => {
  const { isLoaded, user } = useUser()
  const { id } = useParams()

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  })

  useEffect(() => {
    if (isLoaded) fnJob()
  }, [isLoaded])

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  )

  const handleStatusChange = (value) => {
    const isOpen = value === 'open'
    fnHiringStatus(isOpen).then(() => fnJob())
  }

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={'100%'} color="red" />
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-12"
          alt={job?.title}
        />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon size={18} /> {job?.location}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase size={18} /> {job?.applications?.length} Applicants
        </div>
        <div
          className={`flex items-center gap-2 text-sm font-semibold   ${
            job?.isOpen ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {job?.isOpen ? (
            <>
              <DoorOpen size={18} /> Open
            </>
          ) : (
            <>
              <DoorClosed size={18} /> Closed
            </>
          )}
        </div>
      </div>

      {/* Hiring Status Toggle for Recruiter */}
      {job?.recruiter_id === user?.id && (
        <div className="w-full">
          <Select
            onValueChange={handleStatusChange}
            defaultValue={job?.isOpen ? 'open' : 'closed'}
          >
            <SelectTrigger
              className={`w-full border rounded px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                job?.isOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white text-black shadow-md rounded-md">
              <SelectItem value="open" className="px-4 py-2 hover:bg-green-100">
                Open
              </SelectItem>
              <SelectItem value="closed" className="px-4 py-2 hover:bg-red-100">
                Closed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* Apply Drawer for Candidates */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find(
            (ap) => ap.candidate_id === user.id
          )}
        />
      )}

      {/* Applications List for Recruiters */}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
          {job?.applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Job
