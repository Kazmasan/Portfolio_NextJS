// components/ProjectCard.tsx
import { Briefcase, GraduationCap } from 'lucide-react';

export default function ProjectCard({ project }: { project: any }) {
  const isCompany = project.type === 'company';

  return (
    <div className="border border-gray-200 p-6 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 interactive-card group hover:border-blue-300 dark:hover:border-blue-700">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {/* Icône dynamique selon le type de projet */}
          {isCompany ? (
            <Briefcase size={24} className="text-blue-600 dark:text-blue-400" />
          ) : (
            <GraduationCap size={24} className="text-green-600 dark:text-green-400" />
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {project.date}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {project.title}
      </h3>
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-3 font-medium">
        {project.organization}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tools.map((tool: string) => (
          <span 
            key={tool} 
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/40 dark:hover:text-blue-300"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}