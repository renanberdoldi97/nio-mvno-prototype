'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NioIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

type FeedbackBannerProps = {
  title: string;
  className?: string;
  autoHideMs?: number; // padrão 6000ms
};

export function FeedbackBanner({
  title,
  className,
  autoHideMs = 6000,
}: FeedbackBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), autoHideMs);
    return () => clearTimeout(t);
  }, [autoHideMs]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, height: 56, marginBottom: 0 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'flex items-center gap-4 px-4 overflow-hidden',
            'bg-[#C5FCD1]',
            className
          )}
          style={{ borderRadius: 8 }}
        >
          <div className="text-[#094B18] flex-shrink-0">
            <NioIcon name="check-circle" size={20} />
          </div>
          <p className="text-sm font-semibold text-[#094B18] leading-tight">
            {title}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
