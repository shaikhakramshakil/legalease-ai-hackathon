import { ChevronRight, FileText, Gavel, ShieldCheck } from "lucide-react";

export function Recents() {
    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Summaries</h2>
            <a className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="#">
                View All
            </a>
            </div>
            <div className="space-y-4">
            <div className="flex items-center justify-between glass-card p-4 transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70 hover:shadow-lg">
                <div className="flex items-center gap-4">
                <div className="rounded-lg bg-black/20 p-3">
                    <FileText className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-base font-bold">Tenancy Agreement.pdf</h3>
                    <p className="text-sm text-gray-400">
                    Simplified on 12/04/2024
                    </p>
                </div>
                </div>
                <ChevronRight className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between glass-card p-4 transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70 hover:shadow-lg">
                <div className="flex items-center gap-4">
                <div className="rounded-lg bg-black/20 p-3">
                    <Gavel className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-base font-bold">
                    Employment Contract.docx
                    </h3>
                    <p className="text-sm text-gray-400">
                    Simplified on 10/04/2024
                    </p>
                </div>
                </div>
                <ChevronRight className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between glass-card p-4 transition-all duration-300 hover:border-white/20 hover:bg-gray-900/70 hover:shadow-lg">
                <div className="flex items-center gap-4">
                <div className="rounded-lg bg-black/20 p-3">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-base font-bold">NDA_ProjectX.pdf</h3>
                    <p className="text-sm text-gray-400">
                    Simplified on 05/04/2024
                    </p>
                </div>
                </div>
                <ChevronRight className="text-gray-400" />
            </div>
            </div>
        </section>
    )
}
