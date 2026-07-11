import { useState, useRef } from "react";
import { DevCard, ApiResponse } from "../types";

export type LoadingPhase =
  | "IDLE"
  | "SCOUTING"       // Scouting Player...
  | "LEAGUE_RECORD"  // Checking League Records...
  | "ANALYZING"      // Analyzing Performance...
  | "CALCULATING"    // Calculating Overall Rating...
  | "FORGING"        // Forging Ultimate Card...
  | "READY";

const PHASES: LoadingPhase[] = [
  "SCOUTING",
  "LEAGUE_RECORD",
  "ANALYZING",
  "CALCULATING",
  "FORGING",
];

const PHASE_MESSAGES: Record<LoadingPhase, string> = {
  IDLE: "",
  SCOUTING: "Scouting Player...",
  LEAGUE_RECORD: "Checking League Records...",
  ANALYZING: "Analyzing Performance...",
  CALCULATING: "Calculating Overall Rating...",
  FORGING: "Forging Ultimate Card...",
  READY: "Scouting Complete!",
};

export function useGenerator() {
  const [phase, setPhase] = useState<LoadingPhase>("IDLE");
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [card, setCard] = useState<DevCard | null>(null);
  const [opponentCard, setOpponentCard] = useState<DevCard | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const getPhaseMessage = () => PHASE_MESSAGES[phase];

  const reset = () => {
    setPhase("IDLE");
    setError(null);
    setCard(null);
    setOpponentCard(null);
  };

  const scout = async (username: string, opponentUsername?: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    setError(null);
    setCard(null);
    setOpponentCard(null);

    let activePhaseIndex = 0;
    setPhase(PHASES[0]);

    const intervalId = setInterval(() => {
      if (activePhaseIndex < PHASES.length - 1) {
        activePhaseIndex++;
        setPhase(PHASES[activePhaseIndex]);
      }
    }, 900);

    try {
      // 1. Fetch Primary Profile
      const response = await fetch(`/api/scout/${encodeURIComponent(username)}`, {
        signal: abortControllerRef.current.signal,
      });
      const payload = (await response.json()) as ApiResponse<DevCard>;

      if (!payload.success) {
        clearInterval(intervalId);
        setPhase("IDLE");
        setError(payload.error);
        return;
      }

      // 2. Fetch Opponent Profile (if provided)
      let oppCard: DevCard | null = null;
      if (opponentUsername) {
        const oppResponse = await fetch(`/api/scout/${encodeURIComponent(opponentUsername)}`, {
          signal: abortControllerRef.current.signal,
        });
        const oppPayload = (await oppResponse.json()) as ApiResponse<DevCard>;
        if (!oppPayload.success) {
          clearInterval(intervalId);
          setPhase("IDLE");
          setError(oppPayload.error);
          return;
        }
        oppCard = oppPayload.data;
      }

      clearInterval(intervalId);

      // Finish remaining phases quickly
      for (let i = activePhaseIndex; i < PHASES.length; i++) {
        setPhase(PHASES[i]);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      setCard(payload.data);
      if (oppCard) {
        setOpponentCard(oppCard);
      }
      setPhase("READY");
    } catch (err: any) {
      clearInterval(intervalId);
      if (err.name !== "AbortError") {
        setPhase("IDLE");
        setError({ code: "SCOUT_FAILED", message: "Failed to connect to Scout database." });
      }
    }
  };

  return {
    phase,
    error,
    card,
    opponentCard,
    scout,
    reset,
    message: getPhaseMessage(),
  };
}
