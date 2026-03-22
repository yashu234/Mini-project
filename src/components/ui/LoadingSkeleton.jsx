import { cn } from '../../utils/cn'

export default function LoadingSkeleton({ className }) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-gradient-to-r from-slate-100 to-slate-200', className)}
    />
  )
}
