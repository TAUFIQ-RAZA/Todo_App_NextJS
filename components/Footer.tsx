'use client';

import { Mail, Github, Twitter, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    {/* Brand & Tagline */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            My Todo App
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
                            Crafted with passion by Taufiq. <br />
                            Organize your life, one task at a time.
                        </p>
                    </div>

                    {/* Contact & Links */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <motion.a
                            href="mailto:taufiq.dev@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full text-sm font-medium transition-shadow shadow-lg hover:shadow-xl"
                        >
                            <Mail className="w-4 h-4" />
                            <span>taufiq.dev@gmail.com</span>
                        </motion.a>

                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                            {[
                                { icon: Github, href: '#', label: 'GitHub' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -2 }}
                                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Made with</span>
                        <Heart className="w-3 h-3 text-red-500 fill-current" />
                        <span>for productivity</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
