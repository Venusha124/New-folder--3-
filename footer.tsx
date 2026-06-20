import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

export function Footer() {
    return (
        <footer className="bg-secondary text-foreground border-t border-border/40 relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container py-24 md:py-32 px-4 relative z-10">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-12">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-4xl font-light tracking-tighter text-foreground">
                                TAPRO<span className="text-primary italic">VIA</span>
                            </span>
                        </Link>

                        <p className="text-foreground/45 text-lg font-light leading-relaxed max-w-sm italic">
                            "Cultivating the benchmark of Ceylon excellence since 1924. A legacy of purity, delivered globally."
                        </p>
                        <div className="flex space-x-8">
                            {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-foreground/30 hover:text-primary transition-all transform hover:-translate-y-1">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-12">
                        <div>
                            <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Products</h4>
                            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <li><Link href="/" className="text-foreground/40 hover:text-foreground transition-colors">Home</Link></li>
                                <li><Link href="/products" className="text-foreground/40 hover:text-foreground transition-colors">Products</Link></li>
                                <li><Link href="/stories" className="text-foreground/40 hover:text-foreground transition-colors">Stories</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.5em] text-primary">About Us</h4>
                            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <li><Link href="/about" className="text-foreground/40 hover:text-foreground transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="text-foreground/40 hover:text-foreground transition-colors">Contact Us</Link></li>
                                <li><Link href="/shipping" className="text-foreground/40 hover:text-foreground transition-colors">Logistics</Link></li>
                                <li><Link href="/faq" className="text-foreground/40 hover:text-foreground transition-colors">Inquiries</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <div className="lg:col-span-3">
                        <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Subscribe to our newsletter</h4>
                        <p className="text-foreground/50 text-xs font-light mb-8 leading-relaxed">Join our registry for exclusive access to reserve grades and seasonal field reports.</p>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p suppressHydrationWarning className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.4em]">
                        &copy; {new Date().getFullYear()} TAPROVIA EXPORT CO.
                    </p>
                    <div className="flex space-x-12 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.4em]">
                        <Link href="/privacy" className="hover:text-foreground/40 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground/40 transition-colors">Terms</Link>
                        <Link href="/compliance" className="hover:text-foreground/40 transition-colors">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
