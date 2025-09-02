import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  return (
    <Progress 
      value={progress} 
      className={cn("w-full", className)}
    />
  );
};
