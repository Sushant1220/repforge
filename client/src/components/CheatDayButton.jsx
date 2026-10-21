import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── constants ─────────────────────────────────── */
const TAUNT_MSGS = [
  'Not today 😈',
  'One more workout first 💪',
  'Earn it 🔥',
  'Nice try 😏',
  'Protein first.',
];

const DODGE_RADIUS  = 130;   // px – how close the cursor must be to trigger dodge
const DODGE_FACTOR  = 1.55;  // amplification of repulsion vector
const UNLOCK_AFTER  = Math.floor(Math.random() * 3) + 5; // 5–7 attempts

/* ─── helpers ───────────────────────────────────── */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function randomPos(contW, contH, btnW, btnH) {
  return {
    x: Math.random() * (contW - btnW),
    y: Math.random() * (contH - btnH),
  };
}

/* ═══════════════════════════════════════════════════
   CheatDayButton
═══════════════════════════════════════════════════ */
export const CheatDayButton = () => {
  const containerRef = useRef(null);
  const btnRef       = useRef(null);
  const posRef       = useRef({ x: 0, y: 0 });   // live position (no re-render)
  const rafRef       = useRef(null);

  const [displayPos, setDisplayPos]   = useState({ x: 0, y: 0 });
  const [label,      setLabel]        = useState('Cheat Day');
  const [attempts,   setAttempts]     = useState(0);
  const [unlocked,   setUnlocked]     = useState(false);
  const [showModal,  setShowModal]    = useState(false);
  const [isMobile,   setIsMobile]     = useState(false);
  const [mounted,    setMounted]      = useState(false);

  /* detect mobile / touch */
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* initial centering */
  useEffect(() => {
    if (!containerRef.current) return;
    const cont = containerRef.current.getBoundingClientRect();
    const btnW = 140, btnH = 44;
    const init = {
      x: (cont.width  - btnW) / 2,
      y: (cont.height - btnH) / 2,
    };
    posRef.current = init;
    setDisplayPos(init);
    setMounted(true);
  }, []);

  /* ── desktop: mousemove dodge ── */
  const handleMouseMove = useCallback((e) => {
    if (isMobile || unlocked || !containerRef.current || !btnRef.current) return;

    const cont = containerRef.current.getBoundingClientRect();
    const btn  = btnRef.current.getBoundingClientRect();
    const btnW = btn.width;
    const btnH = btn.height;

    const cursorX = e.clientX - cont.left;
    const cursorY = e.clientY - cont.top;

    const btnCX = posRef.current.x + btnW / 2;
    const btnCY = posRef.current.y + btnH / 2;

    const dx = btnCX - cursorX;
    const dy = btnCY - cursorY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < DODGE_RADIUS) {
      const force  = (DODGE_RADIUS - dist) / DODGE_RADIUS;
      const pushX  = (dx / dist) * force * DODGE_RADIUS * DODGE_FACTOR;
      const pushY  = (dy / dist) * force * DODGE_RADIUS * DODGE_FACTOR;

      const newX = clamp(posRef.current.x + pushX, 0, cont.width  - btnW);
      const newY = clamp(posRef.current.y + pushY, 0, cont.height - btnH);

      posRef.current = { x: newX, y: newY };

      // throttle state updates to rAF
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setDisplayPos({ ...posRef.current });
          rafRef.current = null;
        });
      }
    }
  }, [isMobile, unlocked]);

  /* ── mobile: tap to jump ── */
  const handleMobileTap = useCallback(() => {
    if (!containerRef.current || !btnRef.current) return;
    const cont = containerRef.current.getBoundingClientRect();
    const btn  = btnRef.current.getBoundingClientRect();

    if (unlocked) {
      setShowModal(true);
      return;
    }

    const newPos = randomPos(cont.width, cont.height, btn.width, btn.height);
    posRef.current = newPos;
    setDisplayPos(newPos);

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (nextAttempts >= UNLOCK_AFTER) {
      setUnlocked(true);
      setLabel('Cheat Day 🍕');
    } else {
      setLabel(TAUNT_MSGS[Math.floor(Math.random() * TAUNT_MSGS.length)]);
      setTimeout(() => setLabel('Cheat Day'), 1800);
    }
  }, [attempts, unlocked]);

  /* ── desktop: button actually clicked (only happens when unlocked) ── */
  const handleClick = useCallback(() => {
    if (!unlocked) return;
    setShowModal(true);
  }, [unlocked]);

  /* taunt label rotation on cursor close (desktop) */
  const tauntTimerRef = useRef(null);
  const attemptsRef = useRef(0);
  attemptsRef.current = attempts;

  const handleMouseMoveWithTaunt = useCallback((e) => {
    handleMouseMove(e);

    if (isMobile || unlocked) return;
    if (!containerRef.current || !btnRef.current) return;

    const cont = containerRef.current.getBoundingClientRect();
    const btn  = btnRef.current.getBoundingClientRect();
    const cursorX = e.clientX - cont.left;
    const cursorY = e.clientY - cont.top;
    const btnCX = posRef.current.x + btn.width / 2;
    const btnCY = posRef.current.y + btn.height / 2;
    const dist = Math.sqrt((btnCX - cursorX) ** 2 + (btnCY - cursorY) ** 2);

    if (dist < DODGE_RADIUS * 1.4 && !tauntTimerRef.current) {
      const nextAttempts = attemptsRef.current + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= UNLOCK_AFTER) {
        setUnlocked(true);
        setLabel('Click me! 🍕');
      } else {
        setLabel(TAUNT_MSGS[Math.floor(Math.random() * TAUNT_MSGS.length)]);
        tauntTimerRef.current = setTimeout(() => {
          setLabel('Cheat Day');
          tauntTimerRef.current = null;
        }, 1800);
      }
    }
  }, [handleMouseMove, isMobile, unlocked]);

  /* cleanup */
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tauntTimerRef.current) clearTimeout(tauntTimerRef.current);
  }, []);

  return (
    <>
      {/* ── Section Wrapper ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-3xl bg-[#161D27] border border-[#2A3442] p-6 space-y-3 shadow-lg overflow-hidden relative"
      >
        {/* subtle glow bg */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at 50% 110%, rgba(198,255,0,0.06) 0%, transparent 70%)',
          }}
        />

        {/* caption */}
        <p className="text-center text-sm font-semibold text-[#7E8A99] select-none">
          Think you deserve a cheat day?{' '}
          <span role="img" aria-label="smirk">😏</span>
        </p>

        {/* ── Dodge Container ── */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMoveWithTaunt}
          className="relative w-full select-none"
          style={{ height: 140 }}
        >
          {mounted && (
            <motion.button
              ref={btnRef}
              id="cheat-day-btn"
              aria-label="Cheat Day easter egg button"
              onClick={isMobile ? handleMobileTap : handleClick}
              animate={{ x: displayPos.x, y: displayPos.y }}
              transition={
                isMobile
                  ? { type: 'spring', stiffness: 280, damping: 22 }
                  : { type: 'spring', stiffness: 320, damping: 28, mass: 0.6 }
              }
              whileHover={unlocked ? { scale: 1.06 } : {}}
              whileTap={{ scale: 0.94 }}
              style={{ position: 'absolute', top: 0, left: 0 }}
              className={`
                px-6 py-2.5 rounded-full font-extrabold text-sm uppercase tracking-widest
                whitespace-nowrap cursor-pointer select-none
                border transition-colors duration-300
                ${unlocked
                  ? 'bg-[#C6FF00] text-[#0B0F14] border-[#C6FF00] shadow-[0_0_28px_rgba(198,255,0,0.55)]'
                  : 'bg-[#0B0F14] text-[#C6FF00] border-[#C6FF00]/50 shadow-[0_0_18px_rgba(198,255,0,0.18)] hover:shadow-[0_0_26px_rgba(198,255,0,0.32)]'
                }
              `}
            >
              {label}
            </motion.button>
          )}
        </div>

        {/* hint */}
        <p className="text-center text-[10px] text-[#3D4A58] font-medium select-none tracking-wide uppercase">
          {unlocked
            ? '👆 Go on, you earned it.'
            : isMobile
            ? 'Tap to try your luck'
            : 'Hover to catch it — if you can'}
        </p>
      </motion.div>

      {/* ── Unlock Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="cheat-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(11,15,20,0.82)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              key="cheat-modal-card"
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1,   opacity: 1, y: 0  }}
              exit={{   scale: 0.8,  opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full rounded-3xl p-8 text-center space-y-5 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #161D27 0%, #0F1820 100%)',
                border: '1px solid rgba(198,255,0,0.35)',
                boxShadow: '0 0 60px rgba(198,255,0,0.18), 0 24px 48px rgba(0,0,0,0.6)',
              }}
            >
              {/* glow ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse at 50% -10%, rgba(198,255,0,0.14) 0%, transparent 65%)',
                }}
              />

              <motion.div
                animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl"
                role="img"
                aria-label="pizza"
              >
                🍕
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-heading font-black text-[#C6FF00] tracking-tight">
                  Cheat Day Unlocked
                </h2>
                <p className="text-[#B8C2CF] text-sm leading-relaxed">
                  Enjoy it.{' '}
                  <span className="text-[#F5F7FA] font-semibold">
                    Then get back to the grind.
                  </span>
                </p>
              </div>

              <div className="flex gap-2 items-center justify-center text-[#7E8A99] text-xs font-medium">
                <span className="w-8 h-px bg-[#2A3442]" />
                You persisted. You deserve this.
                <span className="w-8 h-px bg-[#2A3442]" />
              </div>

              <motion.button
                id="cheat-modal-close-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-2xl bg-[#C6FF00] text-[#0B0F14] font-extrabold text-sm uppercase tracking-widest cursor-pointer shadow-[0_0_20px_rgba(198,255,0,0.4)] hover:bg-[#b5ea00] transition-colors"
              >
                Back to the Grind 💪
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CheatDayButton;
