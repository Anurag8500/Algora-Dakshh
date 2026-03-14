import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="outline-none">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
                Algora
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              Built with Web3 programmable payments. The future of decentralized AI execution.
            </p>
          </div>

          <div className="flex gap-12 font-medium">
             <div className="space-y-4 text-center md:text-left">
                <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Docs</Link>
                <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</Link>
                <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link>
             </div>
             <div className="space-y-4 text-center md:text-left">
                <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Terms</Link>
                <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Privacy</Link>
                <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Status</Link>
             </div>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-8 text-xs text-muted-foreground/60">
          <p>© 2026 Algora. All rights reserved.</p>
          <div className="mt-4 md:mt-0 items-center justify-center flex gap-1">
            <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse inline-block" /> 
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
