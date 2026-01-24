import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface SpinnerLoaderProps {
    message?: string
    size?: 'sm' | 'md' | 'lg'
    overlay?: boolean
    fullscreen?: boolean
    className?: string
}

export function SpinnerLoader({
    message,
    size = 'md',
    overlay = false,
    fullscreen = false,
    className,
}: SpinnerLoaderProps) {
    const sizeClasses = {
        sm: 'size-6',
        md: 'size-8',
        lg: 'size-12',
    }

    const content = (
        <div className="flex flex-col items-center justify-center gap-3">
            <Spinner className={cn(sizeClasses[size], 'text-primary')} />
            {message && (
                <p className="text-sm text-muted-foreground text-balance">{message}</p>
            )}
        </div>
    )

    if (fullscreen) {
        return (
            <div
                className={cn(
                    'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50',
                    className
                )}
            >
                {content}
            </div>
        )
    }

    if (overlay) {
        return (
            <div
                className={cn(
                    'absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg',
                    className
                )}
            >
                {content}
            </div>
        )
    }

    return <div className={cn('flex items-center justify-center p-8', className)}>{content}</div>
}
