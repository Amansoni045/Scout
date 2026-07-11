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
      className="w-full max-w-md mx-auto flex flex-col gap-3 relative z-10"
    >
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          LeetCode Username
        </label>
        <div className="relative flex items-center">
          <input
            id="username"
            type="text"
            placeholder="e.g. janesmith"
            disabled={isLoading}
            {...register("username")}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 outline-none transition-colors text-white placeholder-zinc-600 disabled:opacity-50 text-sm focus:ring-1 focus:ring-zinc-700"
          />
          {isLoading && (
            <div className="absolute right-3 w-5 h-5 rounded-full border-2 border-t-white border-white/10 animate-spin" />
          )}
        </div>
        {errors.username && (
          <span className="text-xs text-red-500 font-medium mt-1">
            {errors.username.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-50 text-sm tracking-wide active:scale-[0.99]"
      >
        {isLoading ? "Scouting..." : "Generate Developer Card"}
      </button>

      <div className="text-center mt-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          No Login Required • Public Profile Only
        </span>
      </div>
    </form>
  );
}
