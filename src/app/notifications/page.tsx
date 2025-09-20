
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, ShieldAlert, FileText, GitMerge, PartyPopper, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const notifications = [
    {
        id: 1,
        icon: FileText,
        title: 'New document summary available',
        time: '10:30 AM',
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-500/10'
    },
    {
        id: 2,
        icon: ShieldAlert,
        title: 'Risk alert: High risk detected in contract',
        time: 'Yesterday',
        iconColor: 'text-red-500',
        bgColor: 'bg-red-500/10'
    },
    {
        id: 3,
        icon: FileText,
        title: "Analysis complete: 'Lease Agreement'",
        time: '2 days ago',
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-500/10'
    },
    {
        id: 4,
        icon: GitMerge,
        title: 'App update: Version 2.1 released',
        time: '3 days ago',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-500/10'
    },
    {
        id: 5,
        icon: PartyPopper,
        title: 'Welcome to Legalease AI!',
        time: '1 week ago',
        iconColor: 'text-primary',
        bgColor: 'bg-primary/10'
    }
];

export default function NotificationsPage() {
    return (
        <div className="flex h-screen flex-col text-foreground">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between glass-card px-4 rounded-b-none">
                <Link href="/" passHref>
                    <Button variant="ghost" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
                <h1 className="text-lg font-bold">Notifications</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-border">
                    {notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                            <li key={notification.id} className="group flex cursor-pointer items-start gap-4 p-4 transition-colors glass-card border-none rounded-none hover:bg-white/20">
                                <div className={cn("mt-1 flex size-10 shrink-0 items-center justify-center rounded-full", notification.bgColor, notification.iconColor)}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-foreground">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                                </div>
                                <button className="invisible group-hover:visible flex items-center justify-center rounded-full p-1.5 text-muted-foreground hover:bg-muted/50">
                                    <X className="h-4 w-4" />
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </div>
    );
}
