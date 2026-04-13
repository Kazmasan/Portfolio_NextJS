// components/ProjectCard.tsx
import { Briefcase, GraduationCap } from 'lucide-react';

export default function ProjectCard({ project }: { project: any }) {
  const isCompany = project.type === 'company';
  const palette = isCompany
    ? {
        cardHover: 'hover:border-blue-300 dark:hover:border-blue-700',
        iconBg: 'bg-blue-50 dark:bg-gray-700',
        iconColor: 'text-blue-600 dark:text-blue-400',
        titleHover: 'group-hover:text-blue-700 dark:group-hover:text-blue-400',
        organization: 'text-blue-700 dark:text-blue-400',
        chip: 'bg-blue-100 text-blue-900 hover:bg-blue-200 hover:text-blue-900 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-200',
      }
    : {
        cardHover: 'hover:border-emerald-300 dark:hover:border-emerald-700',
        iconBg: 'bg-emerald-50 dark:bg-gray-700',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        titleHover: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-400',
        organization: 'text-emerald-700 dark:text-emerald-400',
        chip: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 hover:text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-200',
      };

  return (
    <div className={`border border-sky-100 p-6 rounded-lg bg-white/95 dark:bg-gray-800 dark:border-gray-700 shadow-sm interactive-card group ${palette.cardHover}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${palette.iconBg}`}>
          {/* Icône dynamique selon le type de projet */}
          {isCompany ? (
            <Briefcase size={24} className={palette.iconColor} />
          ) : (
            <GraduationCap size={24} className={palette.iconColor} />
          )}
        </div>
        <span className="text-sm text-slate-500 dark:text-gray-400 font-mono">
          {project.date}
        </span>
      </div>
      
      <h3 className={`text-xl font-bold mb-2 text-slate-900 dark:text-white transition-colors duration-300 ${palette.titleHover}`}>
        {project.title}
      </h3>
      <p className={`text-sm mb-3 font-medium ${palette.organization}`}>
        {project.organization}
      </p>
      <p className="text-slate-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tools.map((tool: string) => (
          <span 
            key={tool} 
            className={`px-2 py-1 text-xs rounded transition-all duration-300 ${palette.chip}`}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}