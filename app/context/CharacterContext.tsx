"use client";

import React, { createContext, useContext, useState } from "react";
import { expressions } from "../components/expressions";

export type ActionName =
  | "waving_hand_gesture(hello)"
  | "walking"
  | "Stretching_arms"
  | "sitting_on_chair"
  | "Sitting_down_on_floor_pose"
  | "showing_the_background-hand_gesture"
  | "saluting_hand_gesture"
  | "Sad_disappointed_action"
  | "Running"
  | "Knee_down_pose"
  | "Jumping"
  | "fist_pumping_hand-gesture"
  | "Fighting_pose"
  | "Dismissing_hand_gesture"
  | "Dancing"
  | "crouch_sitting_pose"
  | "breathing_idle_standing"
  | "Agreeing"
  | "Acknowledging";

export interface SequenceItem {
  msg: string;
  action: ActionName;
  face_expression: string;
}

export const FACIAL_EXPRESSIONS: Record<string, Record<string, number>> = expressions

interface CharacterContextType {
  animation: ActionName;
  setAnimation: (anim: ActionName) => void;
  facialExpression: string;
  setFacialExpression: (exp: string) => void;
  isThinking: boolean;
  setIsThinking: (thinking: boolean) => void;
  sequence: SequenceItem[];
  currentSequenceIndex: number;
  activeSequenceStep: SequenceItem | null;
  playSequence: (items: SequenceItem[]) => void;
  advanceSequenceStep: () => void;
  clearSequence: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animation, setAnimation] = useState<ActionName>("breathing_idle_standing");
  const [facialExpression, setFacialExpression] = useState<string>("normal");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState<number>(0);

  const activeSequenceStep = sequence[currentSequenceIndex] || null;

  const playSequence = (items: SequenceItem[]) => {
    setSequence(items);
    setCurrentSequenceIndex(0);
    if (items.length > 0) {
      setAnimation(items[0].action);
      setFacialExpression(items[0].face_expression);
    }
  };

  const advanceSequenceStep = () => {
    if (currentSequenceIndex < sequence.length - 1) {
      const nextIdx = currentSequenceIndex + 1;
      setCurrentSequenceIndex(nextIdx);
      setAnimation(sequence[nextIdx].action);
      setFacialExpression(sequence[nextIdx].face_expression);
    } else {
      clearSequence();
    }
  };

  const clearSequence = () => {
    setSequence([]);
    setCurrentSequenceIndex(0);
    setAnimation("breathing_idle_standing");
    setFacialExpression("normal");
  };

  return (
    <CharacterContext.Provider
      value={{
        animation,
        setAnimation,
        facialExpression,
        setFacialExpression,
        isThinking,
        setIsThinking,
        sequence,
        currentSequenceIndex,
        activeSequenceStep,
        playSequence,
        advanceSequenceStep,
        clearSequence,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};