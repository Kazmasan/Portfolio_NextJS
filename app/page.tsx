// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo, skills, projects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import {
  Download,
  ArrowRight,
  CalendarClock,
} from 'lucide-react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const heroBlur = scrollProgress * 10;
  const heroScale = 1 - scrollProgress * 0.06;
  const heroTranslateY = -scrollProgress * 24;
  const heroOverlayOpacity = scrollProgress * 0.45;
  const showTopBanner = scrollProgress > 0.78;
  const timelineItems = [
    { date: '2022', title: 'Entrée en cycle ingénieur', detail: 'Début du parcours CESI - spécialité informatique.' },
    { date: '2024', title: "EFF'INNOV Technologies", detail: 'Outils internes de gestion et suivi de données.' },
    { date: '2025', title: 'Normandie Cyber Protection', detail: 'Intégration MISP / OpenCTI / Wazuh.' },
    { date: '2026', title: 'Projet IA RES-Q+', detail: 'Développement chatbot IA orienté usage métier.' },
  ];

  const technicalCount = skills.technicalCategories.reduce((total, category) => total + category.items.length, 0);
  const softCount = skills.softCategories.reduce((total, category) => total + category.items.length, 0);

  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 border-b border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-all duration-300 ${showTopBanner ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <p className="font-semibold text-sm md:text-base truncate">{personalInfo.name}</p>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/contact"
              className="px-3 md:px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs md:text-sm font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              Me contacter <ArrowRight size={14} />
            </Link>
            <a
              href={personalInfo.cvLink}
              download
              className="px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-xs md:text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              Télécharger CV <Download size={14} />
            </a>
          </div>
        </div>
      </div>
      
      {/* 1. HERO SECTION */}
      <section 
        className="fixed inset-0 z-0 flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
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
            Je construis des produits web fiables, clairs et orientés impact métier.
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
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
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

      <div className="relative z-10 -mt-16 rounded-t-3xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/60 dark:border-gray-700/60">

      {/* 2. BENTO HIGHLIGHTS */}
      <section className="pt-24 pb-10 px-4 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="md:col-span-2 p-6 rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md interactive-card">
            <p className="text-sm text-gray-500 mb-2">Approche</p>
            <p className="text-lg md:text-xl font-semibold mb-3">Développement orienté résultat, sécurité opérationnelle et qualité logicielle.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expérience concrète entre développement web, cybersécurité SOC et analyse de données techniques.</p>
          </article>

          <article className="p-6 rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md interactive-card">
            <p className="text-sm text-gray-500 mb-2">Expériences</p>
            <p className="text-3xl font-bold mb-2">{projects.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Projets professionnels & académiques</p>
          </article>

          <article className="p-6 rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md interactive-card">
            <p className="text-sm text-gray-500 mb-2">Compétences techniques</p>
            <p className="text-3xl font-bold mb-2">{technicalCount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Stack polyvalente orientée terrain</p>
          </article>

          <article className="p-6 rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md interactive-card">
            <p className="text-sm text-gray-500 mb-2">Soft skills</p>
            <p className="text-3xl font-bold mb-2">{softCount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Communication, autonomie, méthode</p>
          </article>

          <article className="md:col-span-2 p-6 rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md interactive-card">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <CalendarClock size={18} />
              <p className="font-semibold">Disponibilité</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Basé à {personalInfo.location} - mobilité possible selon le projet. Réponse rapide sous 24h.
            </p>
          </article>
        </div>
      </section>

      {/* 3. ABOUT & HOBBIES SECTION */}
      <section className="py-20 px-4 md:px-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <h2 className="text-3xl font-bold mb-6">À propos</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            {personalInfo.bio}
          </p>
          {/* Section Intérêts séparée comme demandé */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg interactive-surface">
            <h3 className="font-bold mb-2">Intérêts & Hobbies</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cinéma, Bandes Dessinées, Musique, Littérature, jeux vidéos
            </p>
          </div>
        </div>
        <div className="relative h-80 w-full md:w-80 mx-auto bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl interactive-card animate-soft-float group">
            {/* PLACEHOLDER IMAGE */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            </div>
            {/* Décommenter ci-dessous quand tu auras ta photo */}
            <Image src="/roxas.jpg" alt="Kyllian" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="px-4 md:px-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Compétences</h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm interactive-card border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Savoir-faire Technique</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Chaque catégorie reste en liste verticale, mais les catégories sont affichées côte à côte pour une lecture plus rapide.</p>

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
              </div>

              <div className="mt-6 pt-5 border-t border-blue-100 dark:border-blue-900/50">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-500 mb-3">Focus opérationnel</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.technicalHighlights.map((item) => (
                    <span key={item} className="px-3 py-1.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm interactive-card border border-transparent hover:border-green-200 dark:hover:border-green-800">
              <h3 className="text-xl font-bold mb-4 text-green-600">Savoir-être</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">Compétences comportementales renforcées en stage, en projet et en environnement exigeant.</p>

              <div className="space-y-5">
                {skills.softCategories.map((category) => (
                  <div key={category.title}>
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
              </div>

              <div className="mt-6 pt-5 border-t border-green-100 dark:border-green-900/50">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-green-500 mb-3">Posture pro</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.softHighlights.map((item) => (
                    <span key={item} className="px-3 py-1.5 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section className="py-20 px-4 md:px-20 max-w-6xl mx-auto animate-fade-up">
        <h2 className="text-3xl font-bold mb-10">Expériences & Projets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 6. TIMELINE */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50 px-4 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Timeline</h2>
          <div className="space-y-5">
            {timelineItems.map((item) => (
              <article key={item.title} className="relative pl-8 py-2">
                <span className="absolute left-0 top-3 w-3 h-3 rounded-full bg-blue-600" />
                <span className="absolute left-[5px] top-6 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />
                <p className="text-xs font-mono text-gray-500 mb-1">{item.date}</p>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      </div>

    </main>
  );
}