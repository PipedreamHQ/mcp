import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

interface GitHubButtonProps {
  className?: string;
}

export function GitHubButton({ className = "" }: GitHubButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      className={`h-10 px-3 bg-black text-white border-black hover:bg-gray-800 hover:text-white dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-100 ${className}`}
    >
      <a 
        href="https://github.com/PipedreamHQ/mcp" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <Github className="size-4" />
        <span className="hidden font-semibold sm:inline">View on GitHub</span>
      </a>
    </Button>
  );
}