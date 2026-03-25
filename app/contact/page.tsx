// app/contact/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, School, Linkedin, Github, ArrowLeft, Send, Copy, Check } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.");
      }

      setSubmitStatus({
        type: 'success',
        message: 'Message envoyé avec succès. Merci pour votre prise de contact !'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'envoyer le message pour le moment."
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 md:px-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Bouton Retour */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour au portfolio
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-white inline-block bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-3 rounded-2xl gradient-fade-hover animate-fade-up">Me contacter</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mt-6">
          Une opportunité de contrat pro ou de stage pour 2026-2027 ? Une question technique ? 
          N'hésitez pas à m'envoyer un message via le formulaire ou sur mes réseaux.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* COLONNE GAUCHE : FORMULAIRE */}
          <section className="animate-fade-up-delay-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white bg-gray-600 dark:bg-gray-600 px-4 py-2 rounded-lg inline-block">Votre Nom</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  placeholder="Jean Dupont"
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-white bg-gray-600 dark:bg-gray-600 px-4 py-2 rounded-lg inline-block">Votre Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  placeholder="nom@entreprise.fr"
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white bg-gray-600 dark:bg-gray-600 px-4 py-2 rounded-lg inline-block">Sujet</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  placeholder="Proposition de stage / Contrat pro ou autre"
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white bg-gray-600 dark:bg-gray-600 px-4 py-2 rounded-lg inline-block">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  placeholder="Bonjour Kyllian, j'aimerais échanger avec vous concernant..."
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {submitStatus && (
                <div
                  className={`rounded-lg border p-3 text-sm ${
                    submitStatus.type === 'success'
                      ? 'border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-200'
                      : 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-blue-500/20"
              >
                {isSending ? 'Envoi en cours...' : 'Envoyer le message'} <Send size={18} />
              </button>
            </form>
          </section>

          {/* COLONNE DROITE : INFOS & LIENS */}
          <section className="space-y-10 animate-fade-up-delay-2">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white inline-block bg-green-600 dark:bg-green-700 px-5 py-2 rounded-xl">Coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 interactive-surface p-2 rounded-xl">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg transition-transform duration-300 hover:scale-110">
                    <Mail size={20} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{personalInfo.email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      {copiedEmail ? <Check size={14} /> : <Copy size={14} />} {copiedEmail ? 'Copié' : 'Copier'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 interactive-surface p-2 rounded-xl">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg transition-transform duration-300 hover:scale-110">
                    <School size={20} />
                  </div>
                  <span className="font-medium">{personalInfo.emailecole}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white inline-block bg-purple-600 dark:bg-purple-700 px-5 py-2 rounded-xl">Réseaux Sociaux</h3>
              <div className="flex gap-4">
                <a 
                  href={`${personalInfo.linkedin}`} 
                  target="_blank"
                  className="p-5 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg"
                >
                  <Linkedin size={32} className="text-white" strokeWidth={2.5} />
                </a>
                <a 
                  href={`${personalInfo.github}`} 
                  target="_blank"
                  className="p-5 bg-gray-800 dark:bg-gray-200 hover:bg-black dark:hover:bg-white rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg"
                >
                  <Github size={32} className="text-white dark:text-gray-900" strokeWidth={2.5} />
                </a>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 interactive-card">
              <p className="text-sm italic text-gray-700 dark:text-gray-300">
                Basé à {personalInfo.location}, je suis mobile et prêt à relever de nouveaux défis dans toute la manche ! N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
              </p>
            </div>

          </section>

        </div>
      </div>
    </main>
  );
}