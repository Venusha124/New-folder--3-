"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Search, Menu, X, LayoutDashboard, LogOut, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./search-overlay";

import { getCustomerUser, logoutCustomer } from "@/actions/customer-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        let active = true;
        const fetchUser = async () => {
            const userData = await getCustomerUser();
            if (active) {
                setUser(userData);
            }
        };
        fetchUser();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            active = false;
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Grading Guide", href: "/grading" },
        { name: "Stories", href: "/stories" },
        { name: "Gallery", href: "/gallery" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" }
    ];

    return (
        <>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Cinematic Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-background/98 backdrop-blur-3xl flex flex-col p-8 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-24">
                            <span className="font-serif text-3xl font-light tracking-[-0.05em] text-foreground">
                                TAPRO<span className="text-primary italic">VIA</span>
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-foreground/40 hover:text-foreground bg-foreground/5 rounded-full w-14 h-14"
                            >
                                <X className="h-8 w-8" />
                            </Button>
                        </div>

                        <nav className="nav-menu flex flex-col space-y-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-4xl font-serif font-light text-foreground/40 hover:text-primary transition-all italic active:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-auto pt-12 border-t border-border/40">
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block">Registry Desk</span>
                            <div className="space-y-2">
                                <p className="text-foreground/40 text-sm font-light italic">exports@taprovia.com</p>
                                <p className="text-foreground/20 text-[10px] font-bold tracking-widest uppercase mt-4">Matara Highlands, Sri Lanka</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
                {/* Sovereign Top Bar - Collapsible */}
                <div
                    className={cn(
                        "bg-primary text-primary-foreground text-[9px] font-bold tracking-[0.4em] uppercase overflow-hidden transition-all duration-300",
                        isScrolled ? "h-0 opacity-0" : "h-8 opacity-100"
                    )}
                >
                    <div className="py-2 px-4 flex">
                        <div className="flex animate-marquee whitespace-nowrap">
                            <span className="mx-8">EST. 1924 | THE BENCHMARK OF CEYLON</span>
                            <span className="mx-8">•</span>
                            <span className="mx-8">GLOBAL LOGISTICS OPTIMIZED</span>
                            <span className="mx-8">•</span>
                            <span className="mx-8">SOVEREIGN PURITY GUARANTEED</span>
                            <span className="mx-8">•</span>
                            <span className="mx-8">CURATED ARCHIVE OF RARE GRADES</span>
                            <span className="mx-8">•</span>
                        </div>
                    </div>
                </div>

                <header
                    className={cn(
                        "w-full border-b transition-all duration-500 backdrop-blur-md",
                        isScrolled 
                            ? "bg-background/85 border-border/40 shadow-sm" 
                            : "bg-transparent border-transparent"
                    )}
                >
                    <div className={cn(
                        "container relative flex flex-col px-4 transition-all duration-500",
                        isScrolled ? "py-3" : "py-4 md:py-6"
                    )}>
                        <div className="flex items-center justify-between w-full">
                            {/* Left: Search */}
                            <div className="flex-1 flex justify-start hidden md:flex">
                                <Button
                                    onClick={() => setIsSearchOpen(true)}
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all"
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="md:hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMenuOpen(true)}
                                    className="text-foreground hover:bg-foreground/5 active:scale-95 transition-all"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Center: Logo */}
                            <div className="flex-0 flex flex-col items-center">
                                <Link href="/" className="flex flex-col items-center">
                                    <span className="font-serif text-3xl md:text-4xl font-light tracking-[-0.05em] text-foreground">
                                        TAPRO<span className="text-primary italic">VIA</span>
                                    </span>
                                    <span className={cn(
                                        "text-[6px] md:text-[8px] font-bold tracking-[1em] text-foreground/20 uppercase mt-2 transition-all duration-500 hidden md:block",
                                        isScrolled && "h-0 opacity-0 mt-0"
                                    )}>
                                        Sovereign Collection
                                    </span>
                                </Link>
                            </div>

                            {/* Right: User, Cart, Theme Toggle */}
                            <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
                                {/* Theme Switcher */}
                                <Button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all"
                                    aria-label="Toggle Theme"
                                >
                                    {mounted && theme === "dark" ? (
                                        <Sun className="h-5 w-5" />
                                    ) : (
                                        <Moon className="h-5 w-5" />
                                    )}
                                </Button>

                                <div className="hidden md:flex">
                                    {user ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all outline-none">
                                                    <User className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-card border-border text-foreground">
                                                <div className="px-2 py-2 flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{user.full_name}</p>
                                                    <p className="text-xs text-foreground/50 leading-none truncate">{user.email}</p>
                                                </div>
                                                <DropdownMenuSeparator className="bg-border/40" />
                                                <Link href="/account">
                                                    <DropdownMenuItem className="cursor-pointer focus:bg-foreground/10 focus:text-foreground">
                                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                                        <span>My Account</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator className="bg-border/40" />
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500 flex items-center"
                                                    onClick={async () => {
                                                        await logoutCustomer();
                                                        window.location.href = '/login';
                                                    }}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    <span>Log out</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Link href="/login">
                                            <Button variant="ghost" size="icon" className="hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all">
                                                <User className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                

                            </div>
                        </div>

                        {/* BOTTOM ROW: Navigation */}
                        <nav className={cn(
                            "items-center justify-center space-x-8 lg:space-x-12 transition-all duration-500 hidden md:flex",
                            isScrolled ? "h-0 opacity-0 overflow-hidden mt-0" : "mt-4 md:mt-6"
                        )}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/40 hover:text-primary transition-all relative group whitespace-nowrap"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </header>
            </div>
        </>
    );
}
