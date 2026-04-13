// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo, skills, project, school_project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import {
  Download,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isProjectsOverlayOpen, setIsProjectsOverlayOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isProjectsOverlayOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isProjectsOverlayOpen]);

  const heroBlur = scrollProgress * 10;
  const heroScale = 1 - scrollProgress * 0.06;
  const heroTranslateY = -scrollProgress * 24;
  const heroOverlayOpacity = scrollProgress * 0.45;
  const showTopBanner = scrollProgress > 0.78;
  const timelineItems = [
    { date: '2022', title: 'Obtention du bac', detail: 'Validation du baccalauréat et orientation vers l\'informatique.' },
    { date: '2022 - 2024', title: 'Classe préparatoire intégrée', detail: 'Parcours prépa intégré avec option informatique.' },
    { date: '2025 - 2027', title: 'Cycle ingénieur Systèmes & Réseaux', detail: 'Spécialisation systèmes et réseaux avec option cybersécurité.' },
    { date: '2027 - ...', title: 'En construction', detail: 'La suite du parcours est en construction.' },
  ];

  const professionalProjects = [...project]
    .sort((a, b) => b.id - a.id);

  const schoolProjects = [...school_project]
    .sort((a, b) => b.id - a.id);

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {isProjectsOverlayOpen && (
        <div className="fixed inset-0 z-[80] bg-slate-100/95 dark:bg-gray-900/95 backdrop-blur-md">
          <div className="h-full overflow-y-auto px-4 md:px-20 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">Mes projets</h2>
                <button
                  type="button"
                  onClick={() => setIsProjectsOverlayOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-sky-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Fermer
                </button>
              </div>

              <div className="space-y-10">
                <section>
                  <h3 className="text-xl font-semibold mb-4">Projets professionnels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professionalProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">Projets scolaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schoolProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 border-b border-sky-200/80 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-all duration-300 ${showTopBanner ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs font-bold">
              KC
            </span>
            <p className="font-semibold text-sm md:text-base truncate text-gray-900 dark:text-white">{personalInfo.name}</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setIsProjectsOverlayOpen(true)}
              className="px-3 md:px-4 py-2 border border-sky-200 dark:border-gray-700 rounded-full text-xs md:text-sm font-medium hover:bg-sky-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5"
            >
              Expériences et projets
            </button>
            <Link
              href="/contact"
              className="px-3 md:px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs md:text-sm font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              Me contacter <ArrowRight size={14} />
            </Link>
            <a
              href={personalInfo.cvLink}
              download
              className="px-3 md:px-4 py-2 border border-sky-200 dark:border-gray-700 rounded-full text-xs md:text-sm font-medium hover:bg-sky-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              Télécharger CV <Download size={14} />
            </a>
          </div>
        </div>
      </div>
      
      {/* 1. HERO SECTION */}
      <section 
        className="fixed inset-0 z-0 flex flex-col justify-center items-center text-center px-4 bg-slate-100 dark:bg-gray-900"
        style={{
          filter: `blur(${heroBlur}px)`,
          transform: `translateY(${heroTranslateY}px) scale(${heroScale})`,
          transformOrigin: 'center top',
        }}
      >
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight animate-fade-up">
            {personalInfo.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-3 max-w-2xl animate-fade-up-delay-1">
            {personalInfo.title} <br />
            <span className="text-blue-600 text-shift-hover hover:text-blue-500">{personalInfo.subtitle}</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8">
            Dynamique et curieux, je saurai m'adapter à tout type de situation.
          </p>

          <div className="flex gap-4 animate-fade-up-delay-2 justify-center">
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
            >
              Me contacter <ArrowRight size={18} />
            </Link>
            <a 
              href={personalInfo.cvLink} 
              download
              className="px-6 py-3 border border-sky-200 dark:border-gray-700 rounded-full font-medium hover:bg-sky-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
            >
              Télécharger CV <Download size={18} />
            </a>
          </div>
        </div>

        <div
          className="absolute inset-0 bg-white dark:bg-gray-900 pointer-events-none"
          style={{ opacity: heroOverlayOpacity }}
        />
      </section>

      <div className="h-screen" aria-hidden="true" />

      <div className="relative z-10 -mt-16 rounded-t-3xl bg-slate-50/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-sky-100/80 dark:border-gray-700/60">

      {/* 2. ABOUT SECTION */}
      <section className="pt-24 pb-20 px-4 md:px-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <h2 className="text-3xl font-bold mb-6">À propos</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            {personalInfo.bio}
          </p>
          <div className="bg-sky-50/80 border border-sky-100/90 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-lg interactive-surface">
            <h3 className="font-bold mb-2">Disponibilité</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Basé à {personalInfo.location} - mobilité possible selon le projet. Réponse rapide sous 24h.
            </p>
          </div>
        </div>
        <div className="relative h-80 w-full md:w-80 mx-auto bg-sky-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl interactive-card animate-soft-float group">
            {/* PLACEHOLDER IMAGE */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            </div>
            {/* Décommenter ci-dessous quand tu auras ta photo */}
            <Image src={personalInfo.photo} alt="Kyllian" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </section>

      {/* 3. TIMELINE HORIZONTALE */}
      <section className="pb-20 px-4 md:px-20 max-w-6xl mx-auto animate-fade-up">
        <h2 className="text-3xl font-bold mb-8">Timeline</h2>

        <div className="overflow-x-auto pb-4">
          <div className="relative flex min-w-[920px] gap-6 pt-10">
            <span className="absolute left-0 right-0 top-4 h-px bg-sky-200 dark:bg-gray-700" />

            {timelineItems.map((item) => (
              <article
                key={item.title}
                className="relative z-10 w-[220px] shrink-0 rounded-xl border border-sky-100/90 dark:border-gray-700/70 bg-white/90 dark:bg-gray-800/70 backdrop-blur-md p-4 shadow-sm"
              >
                <span className="absolute -top-[31px] left-4 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-slate-50 dark:ring-gray-900" />
                <p className="text-xs font-mono text-gray-500 mb-1">{item.date}</p>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section className="py-20 bg-sky-50/60 dark:bg-gray-800/50">
        <div className="px-4 md:px-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Compétences</h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm interactive-card border border-sky-100/90 dark:border-transparent hover:border-blue-300 dark:hover:border-blue-800">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Savoir-faire Technique</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {skills.technicalCategories.map((category) => (
                  <div key={category.title} className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-900/10">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-500 mb-2">{category.title}</h4>
                    <ul className="space-y-2">
                      {category.items.map((skill) => (
                        <li key={`${category.title}-${skill}`} className="flex items-start gap-2 text-sm transition-transform duration-300 hover:translate-x-1">
                          <span className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full"></span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-100/60 dark:bg-blue-900/20 md:col-span-2 xl:col-span-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">Points forts techniques</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {skills.technicalHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-blue-100">
                        <span className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm interactive-card border border-emerald-100 dark:border-transparent hover:border-green-300 dark:hover:border-green-800">
              <h3 className="text-xl font-bold mb-4 text-green-600">Savoir-être</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {skills.softCategories.map((category) => (
                  <div key={category.title} className="p-4 rounded-lg border border-green-100 dark:border-green-900/40 bg-green-50/40 dark:bg-green-900/10">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-green-500 mb-2">{category.title}</h4>
                    <ul className="space-y-2">
                      {category.items.map((skill) => (
                        <li key={`${category.title}-${skill}`} className="flex items-start gap-2 transition-transform duration-300 hover:translate-x-1">
                          <span className="w-2 h-2 mt-2 bg-green-500 rounded-full"></span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="p-4 rounded-lg border border-green-200 dark:border-green-900/50 bg-green-100/60 dark:bg-green-900/20 md:col-span-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-green-600 mb-2">Points forts humains</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {skills.softHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-green-100">
                        <span className="w-2 h-2 mt-1.5 bg-green-500 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>

    </main>
  );
}