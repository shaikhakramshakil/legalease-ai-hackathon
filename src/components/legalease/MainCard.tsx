import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button";

export function MainCard() {
    return (
        <section className="mb-8">
            <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-primary-foreground">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[16px] border-white/20"></div>
            <div className="absolute -left-16 bottom-2 h-40 w-40 rounded-full border-[20px] border-white/20"></div>
            <div className="relative z-10 flex flex-col items-start gap-4">
                <h2 className="text-2xl font-bold">Simplify Your Legal Documents</h2>
                <p className="text-base font-light text-gray-200">
                Upload a document and let our AI provide you with clear summaries and
                risk assessments.
                </p>
                <Button
                variant="secondary"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 py-3 text-base font-bold text-secondary-foreground"
                >
                <UploadCloud className="h-6 w-6" />
                <span>Upload Document</span>
                </Button>
            </div>
            </div>
        </section>
    )
}
