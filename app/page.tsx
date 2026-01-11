'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Zap, Target, Map, Trophy, DollarSign, Share2, Repeat } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Image from 'next/image';

// Generate stable random positions
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2,
  }));
};

// Animated Counter Component
function NumberCounter({ end, duration = 2, decimals = 0, prefix = '', suffix = '', className = '' }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(progress * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return <span ref={ref} className={className}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
}

// Animated Card Component
function AnimatedCard({ children, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="transition-all"
    >
      {children}
    </motion.div>
  );
}

// 3D Rotating Globe Component
function Globe3D() {
  const [particles, setParticles] = useState<any[]>([]);
  
  useEffect(() => {
    setParticles(generateParticles(50));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          rotateY: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative w-96 h-96"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30"></div>
        <div className="absolute inset-4 rounded-full border border-blue-500/20"></div>
        <div className="absolute inset-8 rounded-full border border-purple-500/20"></div>
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [heroParticles, setHeroParticles] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
    setHeroParticles(generateParticles(30).map(p => ({
      ...p,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5,
    })));
  }, []);

  const revenueData = [
    { year: 'Year 1', conservative: 6, base: 12, bull: 30 },
    { year: 'Year 2', conservative: 30, base: 60, bull: 150 },
    { year: 'Year 3', conservative: 120, base: 240, bull: 600 },
  ];

  const userGrowthData = [
    { month: 'M1', users: 0.1 },
    { month: 'M3', users: 1 },
    { month: 'M6', users: 2.5 },
    { month: 'M9', users: 5 },
    { month: 'M12', users: 8 },
    { month: 'M15', users: 15 },
    { month: 'M18', users: 25 },
  ];

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* HERO SECTION - Completely Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1E293B] to-black"></div>
        
        {/* Radial gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F59E0B]/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6366F1]/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E293B]/40 rounded-full blur-[150px]"></div>
        </div>

        {/* Animated particles */}
        {mounted && (
          <div className="absolute inset-0">
            {heroParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-[#F59E0B] rounded-full"
                style={{
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        )}

        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        
        {/* Logo at top left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-4 md:left-8 top-4 md:top-8 z-20"
        >
          <Image src="/logo.png" alt="Klaimeer Logo" width={200} height={200} className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Seed Round Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6"
            >
              <div className="px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-[#6366F1]/20 to-[#F59E0B]/20 border border-[#6366F1]/30 backdrop-blur-sm">
                <span className="text-[#F59E0B] font-bold text-xs md:text-sm aalto-wide">💎 SEED ROUND OPEN</span>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black mb-6 leading-none aalto-hero">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#F59E0B] via-[#6366F1] to-[#F59E0B] animate-gradient bg-[length:200%_auto]">
                KLAIMEER
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-4 text-gray-200 font-light aalto-display">
              Own The World. <span className="text-[#F59E0B]">One Plot at a Time.</span>
            </p>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto font-['TexGyreAdventor'] px-4">
              The World's First <span className="text-purple-400 font-semibold">Gamified Virtual Land Ownership Platform</span> <br/>
              Social Media + Monopoly + Google Maps
            </p>

            {/* Main Ask */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <div className="inline-block p-1 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#F59E0B] via-[#6366F1] to-[#F59E0B] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="bg-black rounded-2xl md:rounded-3xl px-6 sm:px-8 md:px-12 py-6 md:py-8 backdrop-blur-xl relative z-10">
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] mb-2 aalto-tight">
                    $8M
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 aalto-display">
                    Seed Round | 20% Equity
                  </div>
                  <div className="text-sm sm:text-base md:text-lg text-[#F59E0B] mt-2 aalto-display">
                    $32M Pre-Money Valuation
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {[
                { label: 'TAM', value: '$150B', icon: '🌍' },
                { label: 'Year 3 Revenue', value: '$240M', icon: '💰' },
                { label: 'Expected ROI', value: '20-30x', icon: '📈' },
                { label: 'IRR', value: '70-85%', icon: '🚀' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1E293B]/90 to-gray-800/90 border border-[#6366F1]/30 backdrop-blur-xl hover:border-[#6366F1]/50 transition-all shadow-[0_8px_32px_0_rgba(99,102,241,0.2)] hover:shadow-[0_8px_32px_0_rgba(245,158,11,0.3)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/5 to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="text-2xl md:text-3xl mb-2 md:mb-3">{stat.icon}</div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F59E0B] mb-1 aalto-display">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-400 aalto-wide">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 aalto-hero">
              The <span className="text-red-500">Problem</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-['TexGyreAdventor'] px-4">
              5 Billion smartphone users with nowhere to claim their digital territory
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <AnimatedCard delay={0.2}>
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-red-500/10 to-red-900/10 border-2 border-red-500/30 h-full backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl md:text-7xl mb-4 md:mb-6">⚠️</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 aalto-display">No Digital Ownership</h3>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    5B smartphone users can't own digital representations of meaningful real-world locations
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/10 to-orange-900/10 border-2 border-orange-500/30 h-full">
                <div className="text-5xl md:text-7xl mb-4 md:mb-6">🎮</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 aalto-display">Existing Platforms Fail</h3>
                <ul className="text-base md:text-lg text-gray-300 space-y-2">
                  <li>• r/place: FREE (no monetization)</li>
                  <li>• Decentraland: Complex crypto</li>
                  <li>• Mobile games: Not location-based</li>
                </ul>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.6}>
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-yellow-500/10 to-yellow-900/10 border-2 border-yellow-500/30 h-full">
                <div className="text-5xl md:text-7xl mb-4 md:mb-6">💸</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 aalto-display">Monetization Gap</h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  No competitive instincts or regional pride being monetized in location-based gaming
                </p>
              </div>
            </AnimatedCard>
          </div>

          <AnimatedCard delay={0.8}>
            <div className="p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 text-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight aalto-hero">
                The Gap: No <span className="text-emerald-400">PAID</span>, real-world map-based ownership platform<br className="hidden md:block"/>
                <span className="text-purple-400">with viral competitive mechanics</span>
              </p>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* SOLUTION SECTION - HOW IT WORKS */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 aalto-hero">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F59E0B] to-[#6366F1]">Solution</span>
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-4 aalto-display px-4">
              Social Media + Monopoly + Google Maps
            </p>
          </motion.div>

          {/* Core Mechanics - Step by Step */}
          <div className="mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-[#6366F1] aalto-display px-4">How Klaimeer Works</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { num: '1', icon: <Map className="w-8 h-8" />, title: 'Claim ANY Location', detail: 'Pick any spot on Earth', price: '$0.012-$0.12 (₹1-10)' },
                { num: '2', icon: <Trophy className="w-8 h-8" />, title: 'Own It Publicly', detail: 'Your name appears on map', price: 'Instant Gratification' },
                { num: '3', icon: <Repeat className="w-8 h-8" />, title: 'Others Challenge', detail: 'Anyone can outbid you', price: 'Pay MORE to win' },
                { num: '4', icon: <DollarSign className="w-8 h-8" />, title: 'You Get Paid', detail: 'Earn 80% of profit', price: 'Platform takes 20%' },
                { num: '5', icon: <Share2 className="w-8 h-8" />, title: 'Viral Growth', detail: 'Regional pride wars', price: 'Exponential spread' },
              ].map((step, i) => (
                <AnimatedCard key={i} delay={0.2 + i * 0.1}>
                  <div className="relative p-6 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#1E293B]/10 border-2 border-[#6366F1]/30 h-full hover:border-[#F59E0B]/60 transition-all backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                    <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#6366F1] flex items-center justify-center text-xl md:text-2xl font-bold aalto-tight">
                      {step.num}
                    </div>
                    <div className="text-[#6366F1] mb-3 md:mb-4 mt-2">{step.icon}</div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 aalto-wide">{step.title}</h4>
                    <p className="text-gray-400 text-sm mb-2 font-['TexGyreAdventor']">{step.detail}</p>
                    <p className="text-[#F59E0B] text-xs md:text-sm font-semibold font-['TexGyreAdventor']">{step.price}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Real Transaction Example */}
          <AnimatedCard delay={0.6}>
            <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#F59E0B] aalto-display">Real Transaction Example</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <div className="p-4 md:p-6 bg-black/50 rounded-xl">
                    <p className="text-gray-400 mb-2 text-sm md:text-base">Current Owner</p>
                    <p className="text-lg md:text-2xl font-bold aalto-display">Rajesh owns plot for <span className="text-cyan-400">$0.12 (₹10)</span></p>
                  </div>
                  <div className="p-4 md:p-6 bg-black/50 rounded-xl">
                    <p className="text-gray-400 mb-2 text-sm md:text-base">New Bidder</p>
                    <p className="text-lg md:text-2xl font-bold aalto-display">Priya bids <span className="text-purple-400">$0.18 (₹15)</span></p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg md:text-xl font-bold text-[#F59E0B] mb-4 aalto-display">💰 Money Flow:</h4>
                  <div className="space-y-3 text-base md:text-lg">
                    <p>✅ Priya pays: <span className="text-white font-bold">$0.18 (₹15)</span></p>
                    <p>✅ Rajesh gets: <span className="text-emerald-400 font-bold">$0.168 (₹14)</span>
                      <br/><span className="text-xs md:text-sm text-gray-400">(80% of profit + principal)</span>
                    </p>
                    <p>✅ Platform keeps: <span className="text-cyan-400 font-bold">$0.012 (~₹1)</span>
                      <br/><span className="text-xs md:text-sm text-gray-400">(20% of profit)</span>
                    </p>
                    <p className="text-purple-400 font-bold text-lg md:text-xl mt-4">🎉 New owner: Priya</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Why It's Addictive */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <AnimatedCard delay={0.8}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 h-full">
                <Zap className="w-16 h-16 mb-6 text-purple-400" />
                <h3 className="text-3xl font-bold mb-6 aalto-display">Why It's Addictive</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">🔥</span>
                    <div>
                      <strong className="text-orange-400">FOMO:</strong>
                      <p className="text-gray-300">"Someone just claimed my hometown!"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <strong className="text-yellow-400">Pride:</strong>
                      <p className="text-gray-300">"Tamil Nadu must beat Kerala!"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">⚔️</span>
                    <div>
                      <strong className="text-red-400">Competition:</strong>
                      <p className="text-gray-300">"I need to be #1 landowner"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">📈</span>
                    <div>
                      <strong className="text-emerald-400">Social Proof:</strong>
                      <p className="text-gray-300">"10M plots already claimed!"</p>
                    </div>
                  </li>
                </ul>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.9}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/40 h-full">
                <Target className="w-16 h-16 mb-6 text-cyan-400" />
                <h3 className="text-3xl font-bold mb-6 aalto-display">Proven Validation</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-black/50 rounded-xl">
                    <p className="text-5xl font-bold text-purple-400 mb-2 aalto-tight">2M users</p>
                    <p className="text-gray-300">wplace got in <span className="text-emerald-400 font-bold">72 hours</span> (July 2024)</p>
                  </div>
                  <div className="p-6 bg-black/50 rounded-xl">
                    <p className="text-5xl font-bold text-pink-400 mb-2 aalto-tight">10M+ users</p>
                    <p className="text-gray-300">r/place (Reddit) - Periodic viral events</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-[#F59E0B]/20 to-[#6366F1]/20 rounded-xl border border-[#F59E0B]/30">
                    <p className="text-xl font-bold text-emerald-400 aalto-display">
                      ✓ Massive demand validated.<br/>
                      But they're FREE. <span className="text-white">We're PAID.</span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* REVENUE STREAMS SECTION */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-black to-purple-950">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 aalto-hero">
              Revenue <span className="text-[#F59E0B]">Streams</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-['TexGyreAdventor'] px-4">5 Proven Revenue Sources | Year 1: $5.8M</p>
          </motion.div>

          {/* Revenue Streams Cards */}
          <div className="space-y-8 mb-16">
            {/* Stream 1: Initial Land Claims */}
            <AnimatedCard delay={0.2}>
              <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#F59E0B]/20 to-[#6366F1]/20 border-2 border-[#F59E0B]/40 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:bg-[position:100%_100%] transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-4 md:mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F59E0B] mb-2 aalto-display">1. Initial Land Claims</h3>
                      <p className="text-base md:text-lg lg:text-xl text-gray-300 font-['TexGyreAdventor']">PRIMARY REVENUE - 60-70% of total</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F59E0B] aalto-tight">$3.5M</div>
                    <div className="text-sm md:text-base lg:text-lg text-gray-400">Year 1 Revenue</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-4">
                    <div className="p-4 md:p-6 bg-black/30 rounded-xl">
                      <p className="text-emerald-400 font-bold mb-2 text-sm md:text-base">India Potential</p>
                      <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                        <li>• <span className="font-semibold">500M plots</span> addressable</li>
                        <li>• <span className="font-semibold">100M plots</span> claimed (20%)</li>
                        <li>• Avg price: <span className="text-cyan-400">$0.035 (₹3)</span></li>
                        <li>• Revenue: <span className="text-emerald-400 font-bold">₹30 Crore</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-black/30 rounded-xl">
                      <p className="text-cyan-400 font-bold mb-2">Global Potential</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• <span className="font-semibold">5B plots</span> possible</li>
                        <li>• <span className="font-semibold">500M plots</span> claimed (10%)</li>
                        <li>• Avg price: <span className="text-cyan-400">$0.06 (₹5)</span></li>
                        <li>• Revenue: <span className="text-emerald-400 font-bold">$30M (₹250 Crore)</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                  <p className="text-center text-lg"><span className="text-emerald-400 font-bold">💰 100% of payment</span> goes to platform on unclaimed land</p>
                </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Stream 2: Trading Fees */}
            <AnimatedCard delay={0.3}>
              <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-purple-400 mb-2 aalto-display">2. Trading Fees</h3>
                    <p className="text-xl text-gray-300">20-25% of total revenue</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-purple-400 aalto-tight">$288K</div>
                    <div className="text-lg text-gray-400">Year 1 Revenue</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-black/30 rounded-xl text-center">
                    <div className="text-4xl font-bold text-white mb-2 aalto-tight">1M</div>
                    <div className="text-gray-400">Monthly Transactions</div>
                  </div>
                  <div className="p-6 bg-black/30 rounded-xl text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">$0.12</div>
                    <div className="text-gray-400">Avg Profit/Transaction</div>
                  </div>
                  <div className="p-6 bg-black/30 rounded-xl text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">20%</div>
                    <div className="text-gray-400">Platform Cut</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                  <p className="text-center text-lg">Platform earns <span className="text-purple-400 font-bold">20% of profit difference</span> on every ownership change</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Stream 3: Premium Subscriptions */}
            <AnimatedCard delay={0.4}>
              <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/40">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-cyan-400 mb-2 aalto-display">3. Premium Subscriptions</h3>
                    <p className="text-xl text-gray-300">10-15% of revenue | Recurring</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-cyan-400 aalto-tight">$153K</div>
                    <div className="text-lg text-gray-400">Year 1 Revenue</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-black/30 rounded-xl">
                    <p className="text-cyan-400 font-bold mb-4">At 100K Users (5% convert)</p>
                    <div className="space-y-2 text-gray-300">
                      <p>• 4,000 users @ <span className="text-white">$1.20/year</span> = $4.8K</p>
                      <p>• 1,000 users @ <span className="text-white">$10.50/year</span> = $10.5K</p>
                      <p className="text-cyan-400 font-bold pt-2">Total: $15.3K/year</p>
                    </div>
                  </div>
                  <div className="p-6 bg-black/30 rounded-xl">
                    <p className="text-emerald-400 font-bold mb-4">At 1M Users (5% convert)</p>
                    <div className="space-y-2 text-gray-300">
                      <p>• 50,000 premium users</p>
                      <p>• Mix of tiers</p>
                      <p className="text-emerald-400 font-bold pt-2">Total: $153K/year</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Stream 4: Land Reservations */}
            <AnimatedCard delay={0.5}>
              <div className="p-10 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/40">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-orange-400 mb-2 aalto-display">4. Land Reservations</h3>
                    <p className="text-xl text-gray-300">5-10% of revenue | High-value areas</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-orange-400 aalto-tight">$360K</div>
                    <div className="text-lg text-gray-400">Year 1 Revenue</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-black/30 rounded-xl">
                    <p className="text-orange-400 font-bold mb-4">Direct Revenue</p>
                    <div className="space-y-2 text-gray-300">
                      <p>• 5,000 reservations/month</p>
                      <p>• Avg: <span className="text-white">$3.50 (₹300)</span> each</p>
                      <p className="text-orange-400 font-bold pt-2">$17.5K/month = $210K/year</p>
                    </div>
                  </div>
                  <div className="p-6 bg-black/30 rounded-xl">
                    <p className="text-red-400 font-bold mb-4">Challenge Revenue</p>
                    <div className="space-y-2 text-gray-300">
                      <p>• 20% reservations get challenged</p>
                      <p>• Higher value transactions</p>
                      <p className="text-red-400 font-bold pt-2">+$12K/month = $144K/year</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                  <p className="text-center text-lg">Users pay <span className="text-orange-400 font-bold">10x claim price</span> to reserve competitive areas</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Stream 5: Brand Sponsorships */}
            <AnimatedCard delay={0.6}>
              <div className="p-10 rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/40">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-pink-400 mb-2 aalto-display">5. Brand Sponsorships</h3>
                    <p className="text-xl text-gray-300">5-10% of revenue | Premium deals</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-pink-400 aalto-tight">$1.53M</div>
                    <div className="text-lg text-gray-400">Year 1 Revenue</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-black/30 rounded-xl">
                    <p className="text-pink-400 font-bold mb-4">Example Partnerships</p>
                    <div className="space-y-2 text-gray-300">
                      <p>• <span className="text-orange-500 font-semibold">Swiggy</span> owns Mumbai: <span className="text-white">$12K/month</span></p>
                      <p>• <span className="text-red-500 font-semibold">Zomato</span> owns Bangalore: <span className="text-white">$12K/month</span></p>
                      <p>• <span className="text-purple-500 font-semibold">PhonePe</span> owns Tamil Nadu: <span className="text-white">$30K/month</span></p>
                      <p>• <span className="text-emerald-500 font-semibold">CRED</span> owns Delhi: <span className="text-white">$18K/month</span></p>
                    </div>
                  </div>
                  <div className="p-6 bg-black/30 rounded-xl">
                    <p className="text-purple-400 font-bold mb-4">Partnership Value</p>
                    <div className="space-y-2 text-gray-300">
                      <p>• Brands "own" entire cities/states</p>
                      <p>• Massive brand visibility</p>
                      <p>• User engagement rewards</p>
                      <p className="text-pink-400 font-bold pt-2">10 partnerships = $600-840K/year</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Year 1 Summary */}
          <AnimatedCard delay={0.8}>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-purple-500/30 border-2 border-emerald-500/50">
              <h3 className="text-5xl font-bold text-center mb-8 aalto-display">Year 1 Revenue Mix</h3>
              <div className="grid md:grid-cols-5 gap-6 mb-8">
                <div className="text-center p-6 bg-black/40 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-2 aalto-tight">$3.5M</div>
                  <div className="text-sm text-gray-400 mb-1">Land Claims</div>
                  <div className="text-xl text-emerald-400 font-bold aalto-tight">60%</div>
                </div>
                <div className="text-center p-6 bg-black/40 rounded-xl">
                  <div className="text-3xl font-bold text-pink-400 mb-2 aalto-tight">$1.53M</div>
                  <div className="text-sm text-gray-400 mb-1">Brand Deals</div>
                  <div className="text-xl text-pink-400 font-bold aalto-tight">26%</div>
                </div>
                <div className="text-center p-6 bg-black/40 rounded-xl">
                  <div className="text-3xl font-bold text-orange-400 mb-2 aalto-tight">$360K</div>
                  <div className="text-sm text-gray-400 mb-1">Reservations</div>
                  <div className="text-xl text-orange-400 font-bold aalto-tight">6%</div>
                </div>
                <div className="text-center p-6 bg-black/40 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400 mb-2 aalto-tight">$288K</div>
                  <div className="text-sm text-gray-400 mb-1">Trading Fees</div>
                  <div className="text-xl text-purple-400 font-bold aalto-tight">5%</div>
                </div>
                <div className="text-center p-6 bg-black/40 rounded-xl">
                  <div className="text-3xl font-bold text-cyan-400 mb-2 aalto-tight">$153K</div>
                  <div className="text-sm text-gray-400 mb-1">Subscriptions</div>
                  <div className="text-xl text-cyan-400 font-bold aalto-tight">3%</div>
                </div>
              </div>
              <div className="text-center p-8 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/40">
                <p className="text-3xl text-gray-300 mb-2">Total Year 1 Revenue</p>
                <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">$5.8M</p>
                <p className="text-2xl text-emerald-400 mt-2">(~₹50 Crore)</p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* MARKET SECTION */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-purple-950 to-gray-900">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 aalto-hero">
              The <span className="text-[#F59E0B]">Market</span>
            </h2>
            <p className="text-2xl text-gray-400 font-['TexGyreAdventor']">Massive opportunity in location-based competitive gaming</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'TAM', amount: 150, desc: 'Total Addressable Market', color: 'from-blue-500 to-blue-600', icon: '🌍' },
              { title: 'SAM', amount: 15, desc: 'Serviceable Addressable', color: 'from-purple-500 to-purple-600', icon: '🎯' },
              { title: 'SOM (Y3)', amount: 1.2, desc: 'Unicorn Candidate', color: 'from-emerald-500 to-emerald-600', icon: '👑' },
            ].map((market, i) => (
              <AnimatedCard key={i} delay={0.2 + i * 0.2}>
                <div className={`p-10 rounded-3xl bg-gradient-to-br ${market.color} bg-opacity-10 border-2 border-white/20 text-center h-full`}>
                  <div className="text-6xl mb-4">{market.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-300 aalto-wide">{market.title}</h3>
                  <NumberCounter end={market.amount} duration={2} className="text-7xl font-bold text-white block aalto-tight" suffix="B" decimals={market.amount < 10 ? 1 : 0} />
                  <p className="mt-4 text-lg text-gray-300">{market.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={0.8}>
            <div className="bg-gray-900/50 p-10 rounded-3xl border-2 border-gray-700">
              <h3 className="text-4xl font-bold mb-8 text-center aalto-display">User Growth Projection (Millions)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '14px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '14px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '12px', padding: '12px' }}
                    labelStyle={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* FINANCIAL PROJECTIONS */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 aalto-hero">
              Financial <span className="text-[#F59E0B]">Projections</span>
            </h2>
          </motion.div>

          <AnimatedCard delay={0.2}>
            <div className="bg-gray-900/50 p-10 rounded-3xl border-2 border-gray-700 mb-12">
              <h3 className="text-4xl font-bold mb-8 text-center aalto-display">3-Year Revenue Growth ($M)</h3>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9ca3af" style={{ fontSize: '16px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '16px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="conservative" fill="#60a5fa" name="Conservative (30%)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="base" fill="#8b5cf6" name="Base Case (50%)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="bull" fill="#10b981" name="Bull Case (20%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Conservative', prob: '30%', revenue: '$120M', users: '15M', valuation: '$400M', color: 'from-blue-500/20 to-blue-900/20', border: 'border-blue-500/30' },
              { name: 'Base Case', prob: '50%', revenue: '$240M', users: '25M', valuation: '$800M-1.2B', color: 'from-purple-500/20 to-purple-900/20', border: 'border-purple-500/50', highlight: true },
              { name: 'Bull Case', prob: '20%', revenue: '$600M', users: '50M', valuation: '$2-3B', color: 'from-emerald-500/20 to-emerald-900/20', border: 'border-emerald-500/30' },
            ].map((scenario, i) => (
              <AnimatedCard key={i} delay={0.4 + i * 0.2}>
                <div className={`p-8 rounded-3xl bg-gradient-to-br ${scenario.color} border-2 ${scenario.border} ${scenario.highlight ? 'ring-2 ring-purple-500/50' : ''} h-full relative`}>
                  {scenario.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-xs font-bold">
                      MOST LIKELY
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 aalto-wide">{scenario.name}</h3>
                  <p className="text-gray-400 mb-6">{scenario.prob} Probability</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Year 3 Revenue</p>
                      <p className="text-4xl font-bold aalto-tight">{scenario.revenue}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Active Users</p>
                      <p className="text-2xl font-bold aalto-display">{scenario.users}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Valuation</p>
                      <p className="text-xl font-bold text-[#F59E0B] aalto-display">{scenario.valuation}</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* THE ASK - $8M */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-7xl md:text-9xl font-bold mb-12">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">Ask</span>
            </h2>
            
            <div className="mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 blur-3xl opacity-20"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative inline-block"
              >
                <NumberCounter 
                  end={8} 
                  duration={2} 
                  className="text-[10rem] md:text-[15rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 leading-none" 
                  prefix="$"
                  suffix="M"
                />
                <p className="text-4xl text-gray-300 mt-6">Seed Round @ $32M Pre-Money</p>
                <p className="text-2xl text-emerald-400 mt-2">20% Equity for Investors</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <AnimatedCard delay={0.4}>
                <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/50 text-left">
                  <h3 className="text-3xl font-bold mb-8 text-emerald-400 aalto-display">Use of Funds</h3>
                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                      <span>Go-to-Market (User Acquisition)</span>
                      <span className="font-bold text-xl">$4.8M <span className="text-sm text-gray-400">(60%)</span></span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                      <span>Team Building (25 people)</span>
                      <span className="font-bold text-xl">$1.6M <span className="text-sm text-gray-400">(20%)</span></span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                      <span>Product Development</span>
                      <span className="font-bold text-xl">$1.2M <span className="text-sm text-gray-400">(15%)</span></span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                      <span>Legal & Compliance</span>
                      <span className="font-bold text-xl">$400K <span className="text-sm text-gray-400">(5%)</span></span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-8 text-purple-400 aalto-display">Expected Returns</h3>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-black/30 rounded-xl">
                      <p className="text-gray-400 mb-2">Your Investment Today</p>
                      <p className="text-5xl font-bold aalto-tight">$8M</p>
                      <p className="text-emerald-400 text-sm mt-1">(20% Equity)</p>
                    </div>
                    <div className="text-6xl text-center text-emerald-400">↓</div>
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30">
                      <p className="text-gray-400 mb-2">Your Return (Year 5)</p>
                      <p className="text-6xl font-bold text-emerald-400">$160-240M</p>
                      <p className="text-3xl text-emerald-400 mt-4 font-bold aalto-tight">20x-30x ROI</p>
                      <p className="text-xl text-gray-300 mt-2">IRR: 70-85%</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.6}>
              <div className="p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-500/30 to-purple-500/30 border-2 border-emerald-500/50">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 aalto-display">Ready to Join the Revolution?</h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8">
                  The window is NOW. In 12 months, copycats will emerge.<br className="hidden sm:block"/>
                  But we'll have 10M+ users and category leadership.
                </p>
                <a 
                  href="mailto:founders@klaimeer.com"
                  className="inline-flex items-center gap-3 md:gap-4 px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 bg-gradient-to-r from-[#F59E0B] to-[#6366F1] hover:from-[#FBBF24] hover:to-[#818CF8] rounded-full text-xl sm:text-2xl md:text-3xl font-bold transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(245,158,11,0.5)] aalto-display relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  <span className="relative z-10">Schedule a Call</span>
                  <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-400">
                  founders@klaimeer.com
                </p>
              </div>
            </AnimatedCard>

            <div className="mt-12 md:mt-20 pt-12 md:pt-16 border-t border-gray-800">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                KLAIMEER
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400">
                Own The World. One Plot at a Time. 🌍
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
