import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Button } from './ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetch from '@/hooks/Usefetch'
import { applyToJob } from '@/api/apiApplications'
import { BarLoader } from 'react-spinners'
import { Input } from '@/components/ui/input'

// ✅ Zod schema with safe file validation
const schema = z.object({
  experience: z
    .number()
    .min(0, { message: 'Experience must be at least 0' })
    .int(),
  skills: z.string().min(1, { message: 'Skills are required' }),
  resume: z
    .any()
    .refine(
      (file) =>
        file &&
        file[0] &&
        (file[0].type === 'application/pdf' ||
          file[0].type === 'application/msword' ||
          file[0].type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
      {
        message: 'Only PDF or Word documents are allowed'
      }
    )
})

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema)
  })

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply
  } = useFetch(applyToJob)

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: 'applied',
      resume: data.resume[0]
    }).then(() => {
      fetchJob()
      reset()
    })
  }

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button>
          {job?.isOpen ? (applied ? 'Applied' : 'Apply') : 'Hiring Closed'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill The Form Below</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input
            type="text"
            placeholder="Skills"
            className="flex-1"
            {...register('skills')}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}

          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
            {...register('experience', {
              valueAsNumber: true
            })}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="flex-1 file:text-gray-500"
            {...register('resume')}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}

          {errorApply?.message && (
            <p className="text-red-500">{errorApply.message}</p>
          )}

          {loadingApply && <BarLoader width="100%" color="red" />}

          <Button type="submit" variant="destructive" size="lg">
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose variant="outline">Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplyJobDrawer
