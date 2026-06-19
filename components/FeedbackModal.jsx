"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { RATING_CONFIG } from '@/lib/data';

export function FeedbackModal ({
    open,
    onOpenChange,
    feedback,
    intervieweeName,
}){

    const FeedbackModal = ({open, onOpenChange, feedback, intervieweeName}) => {
        if(!feedback) return null;
        const rating = RATING_CONFIG[feedback.overallRating];

  return (
    <Dialog open ={open} onOpenChange={onOpenChange}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  );
};

