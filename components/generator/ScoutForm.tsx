"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PROVIDER_RULES } from "@/core/config/provider-rules";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(PROVIDER_RULES.leetcode.usernameRegex, "Username contains invalid characters"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export function ScoutForm({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "" },
  });

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values.username.trim());
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md mx-auto flex flex-col gap-4 relative z-10 font-sans"
    >
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          Scout Coder Identity
        </label>
        <div className="relative flex items-center group">
          <span className="absolute left-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors text-sm">
            🔍
          </span>
          <input
            id="username"
            type="text"
            placeholder="Enter LeetCode handle..."
            disabled={isLoading}
            {...register("username")}
            className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-zinc-950/40 border border-white/5 focus:border-white/10 outline-none transition-all text-white placeholder-zinc-600 disabled:opacity-50 text-sm focus:ring-1 focus:ring-white/10"
          />
          {isLoading && (
            <div className="absolute right-4 w-4 h-4 rounded-full border border-t-white border-white/10 animate-spin" />
          )}
        </div>
        {errors.username && (
          <span className="text-[11px] text-red-500/80 font-bold tracking-tight mt-1">
            {errors.username.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-black rounded-xl transition-all cursor-pointer shadow-xl disabled:opacity-50 text-xs uppercase tracking-widest active:scale-[0.99] hover:shadow-white/5"
      >
        {isLoading ? "Analyzing profile..." : "Generate Developer Card"}
      </button>

      <div className="text-center">
        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
          No Login Required • Public LeetCode Profile Only
        </span>
      </div>
    </form>
  );
}
