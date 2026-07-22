'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NioIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

type FeedbackBannerProps = {
  title: string;
  description?: string;
  className?: string;
  // 0 = não esconde automaticamente (fixo)
  autoHideMs?: number;
};

export function FeedbackBanner({
  title,
  description,
  className,
  autoHideMs = 6000,
}: FeedbackBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoHideMs) return;
    const t = setTimeout(() => setVisible(false), autoHideMs);
    return () => clearTimeout(t);
  }, [autoHideMs]);

  return (
    <div className={cn('mb-6', className)}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'flex gap-3 px-4 bg-[#C5FCD1] rounded-lg',
              description ? 'items-start py-4' : 'items-center'
            )}
            style={!description ? { height: 56, borderRadius: 8 } : undefined}
          >
            <div className={cn('text-[#094B18] flex-shrink-0', description && 'mt-0.5')}>
              <NioIcon name="check-circle" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#094B18] leading-tight">
                {title}
              </p>
              {description && (
                <p className="text-sm font-normal text-[#094B18] mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
