
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SettingsPage() {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

    return (
        <div className="flex flex-col min-h-screen text-foreground">
            <header className="sticky top-0 z-10 glass-card rounded-b-none">
                <div className="flex items-center justify-between p-4">
                    <Link href="/profile" passHref>
                        <button className="p-2 -ml-2">
                            <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
                        </button>
                    </Link>
                    <h1 className="text-xl font-bold">Account</h1>
                    <div className="w-8"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-28">
                <div className="flex flex-col items-center p-6 space-y-4">
                    <div className="relative">
                        {userAvatar && <Image alt="Ethan Carter profile picture" className="w-32 h-32 rounded-full object-cover" src={userAvatar.imageUrl} width={128} height={128} data-ai-hint={userAvatar.imageHint} />}
                        <button className="absolute bottom-0 right-0 p-2 rounded-full glass-card">
                            <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">Ethan Carter</p>
                        <p className="text-muted-foreground">ethan.carter@email.com</p>
                    </div>
                </div>

                <div className="px-4 space-y-6">
                    <div>
                        <h2 className="px-2 text-lg font-bold">Settings</h2>
                        <div className="mt-2 space-y-1 glass-card p-2">
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                                        <span className="material-symbols-outlined text-foreground">notifications</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Notifications</p>
                                        <p className="text-sm text-muted-foreground">Manage your notifications</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                                        <span className="material-symbols-outlined text-foreground">text_fields</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Summary Detail</p>
                                        <p className="text-sm text-muted-foreground">Adjust summary detail level</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-muted-foreground">Medium</p>
                                    <span className="material-symbols-outlined text-muted-foreground">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                                        <span className="material-symbols-outlined text-foreground">language</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Language</p>
                                        <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-muted-foreground">English</p>
                                    <span className="material-symbols-outlined text-muted-foreground">arrow_forward_ios</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="px-2 text-lg font-bold">Usage</h2>
                        <div className="mt-2 space-y-1 glass-card p-2">
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                                        <span className="material-symbols-outlined text-foreground">history</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Document History</p>
                                        <p className="text-sm text-muted-foreground">View processing history</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-muted-foreground">arrow_forward_ios</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                                        <span className="material-symbols-outlined text-foreground">analytics</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Risk Insights</p>
                                        <p className="text-sm text-muted-foreground">Track insights over time</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-muted-foreground">arrow_forward_ios</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="px-2 text-lg font-bold">Feedback</h2>
                        <div className="mt-2 space-y-1 glass-card p-2">
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                                        <span className="material-symbols-outlined text-foreground">campaign</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Provide Feedback</p>
                                        <p className="text-sm text-muted-foreground">Share your thoughts</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-muted-foreground">arrow_forward_ios</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 glass-card rounded-t-none">
                <div className="flex justify-around py-2 px-4">
                    <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground">
                        <span className="material-symbols-outlined">upload_file</span>
                        <span className="text-xs">Upload</span>
                    </Link>
                    <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#">
                        <span className="material-symbols-outlined">description</span>
                        <span className="text-xs">Summaries</span>
                    </a>
                    <Link href="/profile" className="flex flex-col items-center gap-1 text-primary">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
                        <span className="text-xs font-bold">Account</span>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
