"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function FeedbackModal ({
    open,
    onOpenChange,
    feedback,
    intervieweeName,
}){
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

