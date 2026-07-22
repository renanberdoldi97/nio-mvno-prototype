'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StepStatus = 'completed' | 'active' | 'pending' | 'failed';

type Step = {
  key: string;
  label: string;
  status: StepStatus;
};

type StepperProps = {
  steps: Step[];
  className?: string;
};

function StepCircle({ status }: { status: StepStatus }) {
  if (status === 'completed') {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5L5 9L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="w-8 h-8 rounded-full bg-error flex items-center justify-center flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center flex-shrink-0"
      >
        <div className="w-3 h-3 rounded-full bg-primary" />
      </motion.div>
    );
  }

  // pending
  return (
    <div className="w-8 h-8 rounded-full border-2 border-border bg-white flex-shrink-0" />
  );
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, i) => (
        <div key={step.key} className="flex flex-col items-center flex-1 relative">
          <div className="flex items-center w-full">
            {/* Linha esquerda */}
            {i > 0 && (
              <div className={cn(
                'flex-1 h-0.5',
                step.status === 'completed' || step.status === 'failed'
                  ? 'bg-primary'
                  : 'bg-border'
              )} />
            )}
            <StepCircle status={step.status} />
            {/* Linha direita */}
            {i < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5',
                steps[i + 1].status === 'completed' || steps[i + 1].status === 'failed'
                  ? 'bg-primary'
                  : 'bg-border'
              )} />
            )}
          </div>
          <span className={cn(
            'text-sm font-medium mt-2 text-center',
            step.status === 'pending' ? 'text-text-disabled' : 'text-text-primary'
          )}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
