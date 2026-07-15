'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  blocking?: boolean; // true = não fecha ao clicar overlay
  className?: string;
};

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  blocking = false,
  className,
}: BottomSheetProps) {
  // Previne scroll do body enquanto sheet está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={blocking ? undefined : onClose}
            className="absolute inset-0 bg-black/50 z-40"
          />
          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50',
              'max-h-[90%] overflow-y-auto no-scrollbar',
              className
            )}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            {title && (
              <div className="px-5 pt-2 pb-1">
                <h3 className="text-lg font-bold text-text-primary">{title}</h3>
              </div>
            )}
            <div className="px-5 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
