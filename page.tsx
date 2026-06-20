"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronRight, X, Minus, Plus, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart } = useCart();
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = items.length > 0 ? 8.00 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    if (!isLoaded) {
        return <div className="bg-background min-h-screen" />;
    }

    return (
        <main className="bg-background min-h-screen text-foreground pt-24 md:pt-32 pb-32 md:pb-60 overflow-x-hidden selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
            {/* Stage I: Header */}
            <div className="container px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border/40 rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="text-primary font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">Your Selection</span>
                        <h1 className="text-6xl md:text-[8rem] font-serif font-light leading-none mb-12 tracking-tighter">
                            Your <span className="italic text-foreground/30">Cart.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-light italic font-serif leading-relaxed max-w-xl mb-12 md:mb-16">
                            Review your selected TAPROVIA items. Update quantities, remove items, and proceed to checkout when ready.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={() => router.push('/explore')}
                                className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background rounded-full h-16 px-10 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
                            >
                                Continue Shopping
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push('/checkout')}
                                className="border-border/40 text-muted-foreground hover:bg-accent hover:text-foreground rounded-full h-16 px-10 text-[11px] font-bold uppercase tracking-[0.3em] bg-transparent transition-all"
                            >
                                Go to Checkout
                            </Button>
                        </div>
                    </div>

                    {/* Atmospheric Glow */}
                    <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                </motion.div>
            </div>

            {/* Stage II: Content */}
            <div className="container px-4">
                {items.length > 0 ? (
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                        {/* Left Column: Items */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Summary Bar */}
                            <div className="bg-card border border-border/40 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Order Preview</span>
                                    <h2 className="text-2xl font-serif text-foreground tracking-tight">Items & Summary</h2>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/explore')}
                                        className="border-border/40 text-muted-foreground hover:text-foreground rounded-full h-12 px-6 text-[9px] font-bold uppercase tracking-widest bg-transparent transition-all"
                                    >
                                        Add More Items
                                    </Button>
                                    <Button
                                        onClick={() => router.push('/checkout')}
                                        className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full h-12 px-6 text-[9px] font-bold uppercase tracking-widest transition-all"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>

                            {/* Item List */}
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-card border border-border/40 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 group relative"
                                    >
                                        <div className="flex flex-col md:grid md:grid-cols-12 gap-10 items-center">
                                            {/* Item Image */}
                                            <div className="md:col-span-4 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border/40 bg-muted">
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                            </div>

                                            {/* Item Details */}
                                            <div className="md:col-span-4 text-center md:text-left">
                                                <h3 className="text-2xl font-serif text-foreground mb-2">{item.name}</h3>
                                                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-6 opacity-60">{item.origin}</p>
                                                <p className="text-muted-foreground text-lg font-serif italic">${item.price ? item.price.toFixed(2) : "0.00"} each</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="md:col-span-4 flex flex-col items-center md:items-end gap-8">
                                                {/* Quantity Control */}
                                                <div className="flex flex-col items-center md:items-end gap-3">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/45">Qty</span>
                                                    <div className="flex items-center gap-6 bg-secondary/50 border border-border/40 rounded-full p-2 pr-8">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground transition-all"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-sm text-foreground">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground transition-all"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <span className="text-xl font-serif text-primary ml-auto">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center gap-3 text-muted-foreground/40 hover:text-destructive transition-all group/btn"
                                                >
                                                    <Trash2 size={14} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Summary */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-card border border-border/40 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 sticky top-32 overflow-hidden"
                            >
                                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8 md:mb-12 tracking-tight">Order Summary</h2>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-center text-sm font-light text-muted-foreground">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Subtotal</span>
                                        <span className="font-serif italic text-lg text-foreground">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-muted-foreground">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Shipping</span>
                                        <span className="font-serif italic text-lg text-foreground">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-muted-foreground">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Estimated Tax</span>
                                        <span className="font-serif italic text-lg text-foreground">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-6 border-t border-border/40 flex justify-between items-end">
                                        <span className="text-xl font-serif text-foreground italic">Total</span>
                                        <span className="text-4xl font-serif text-primary tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Button
                                        onClick={() => router.push('/checkout')}
                                        className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-background rounded-full h-20 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-2xl"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/explore')}
                                        className="w-full border-border/40 text-muted-foreground hover:bg-accent hover:text-foreground rounded-full h-20 text-[11px] font-bold uppercase tracking-[0.3em] bg-transparent transition-all"
                                    >
                                        Continue Shopping
                                    </Button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full text-muted-foreground/40 hover:text-destructive text-[9px] font-bold uppercase tracking-[0.4em] transition-all pt-4"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-60 text-center"
                    >
                        <ShoppingBag size={64} className="mx-auto text-muted-foreground/20 mb-12" />
                        <h2 className="text-4xl font-serif text-foreground mb-8 italic">Your cart is as empty as a morning mist.</h2>
                        <Button
                            onClick={() => router.push('/explore')}
                            className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full h-16 px-12 text-[10px] font-bold uppercase tracking-[0.4em] transition-all"
                        >
                            Explore the Collection
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Footer Texture */}
            <div className="absolute bottom-20 right-10 text-[12vw] font-serif font-black text-foreground/[0.02] select-none pointer-events-none uppercase italic leading-none z-0">
                Sovereign.
            </div>
        </main>
    );
}
