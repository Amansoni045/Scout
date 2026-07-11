"use client";

import React from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PROVIDER_RULES } from "@/core/config/provider-rules";

const makeSchema = (isComparison: boolean) =>
  z.object({
    username: z
      .string()
      .min(3, "Username is required")
      .max(30, "Username must not exceed 30 characters")
      .regex(PROVIDER_RULES.leetcode.usernameRegex, "Contains invalid characters"),
    opponentUsername: z
      .string()
      .optional()
      .refine((val) => !isComparison || (val && val.trim().length >= 3), {
        message: "Opponent username is required",
      })
      .refine((val) => !isComparison || !val || PROVIDER_RULES.leetcode.usernameRegex.test(val), {
        message: "Contains invalid characters",
      }),
  });

type FormValues = {
  username: string;
  opponentUsername?: string;
};

interface Props {
  onSubmit: (username: string, opponentUsername?: string) => void;
  isLoading: boolean;
  isComparison?: boolean;
}

export function ScoutForm({ onSubmit, isLoading, isComparison = false }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(makeSchema(isComparison)),
    defaultValues: { username: "", opponentUsername: "" },
  });

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values.username.trim(), values.opponentUsername?.trim());
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md mx-auto flex flex-col gap-4 relative z-10 font-sans"
    >
      {/* Contestant 1 */}
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {isComparison ? "First Contestant" : "Scout Coder Identity"}
        </label>
        <div className="relative flex items-center group">
          <span className="absolute left-4 flex items-center justify-center">
            <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          </span>
          <input
            id="username"
            type="text"
            placeholder="Enter LeetCode handle..."
            disabled={isLoading}
            {...register("username")}
            className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-zinc-950/40 border border-white/5 focus:border-white/10 outline-none transition-all text-white placeholder-zinc-600 disabled:opacity-50 text-sm focus:ring-1 focus:ring-white/10"
          />
          {isLoading && !isComparison && (
            <div className="absolute right-4 w-4 h-4 rounded-full border border-t-white border-white/10 animate-spin" />
          )}
        </div>
        {errors.username && (
          <span className="text-[11px] text-red-500/80 font-bold tracking-tight mt-1">
            {errors.username.message}
          </span>
        )}
      </div>

      {/* Contestant 2 (Comparison Mode) */}
      {isComparison && (
        <div className="flex flex-col gap-2 text-left animate-reveal">
          <label htmlFor="opponentUsername" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Second Contestant
          </label>
          <div className="relative flex items-center group">
            <span className="absolute left-4 flex items-center justify-center">
              <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
            </span>
            <input
              id="opponentUsername"
              type="text"
              placeholder="Enter second LeetCode handle..."
              disabled={isLoading}
              {...register("opponentUsername")}
              className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-zinc-950/40 border border-white/5 focus:border-white/10 outline-none transition-all text-white placeholder-zinc-600 disabled:opacity-50 text-sm focus:ring-1 focus:ring-white/10"
            />
            {isLoading && (
              <div className="absolute right-4 w-4 h-4 rounded-full border border-t-white border-white/10 animate-spin" />
            )}
          </div>
          {errors.opponentUsername && (
            <span className="text-[11px] text-red-500/80 font-bold tracking-tight mt-1">
              {errors.opponentUsername.message}
            </span>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-black rounded-xl transition-all cursor-pointer shadow-xl disabled:opacity-50 text-xs uppercase tracking-widest active:scale-[0.99]"
      >
        {isLoading ? "Comparing contestants..." : isComparison ? "Compare Contestants" : "Generate Developer Card"}
      </button>

      <div className="text-center">
        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
          No Login Required • Public LeetCode Profile Only
        </span>
      </div>
    </form>
  );
}
