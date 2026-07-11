"use client";

import React, { useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Image, FileCode, Shapes, ChevronDown, Check, Loader2 } from "lucide-react";

interface Props {
  onExport: (format: "png" | "jpg" | "svg") => Promise<void>;
  cardTitle: string;
}

type ExportStatus = "idle" | "preparing" | "success";

export function ExportDropdown({ onExport, cardTitle }: Props) {
  const [status, setStatus] = useState<ExportStatus>("idle");
  const [format, setFormat] = useState<"PNG" | "JPG" | "SVG" | null>(null);

  const handleSelect = async (selectedFormat: "png" | "jpg" | "svg") => {
    setStatus("preparing");
    setFormat(selectedFormat.toUpperCase() as "PNG" | "JPG" | "SVG");
    try {
      await onExport(selectedFormat);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setFormat(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const getButtonText = () => {
    if (status === "preparing") return `Preparing ${format}...`;
    if (status === "success") return "Downloaded";
    return `Download ${cardTitle}`;
  };

  return (
    <div className="relative w-full">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild disabled={status !== "idle"}>
          <button
            className={`w-full py-3.5 px-5 rounded-xl border flex items-center justify-between font-black text-[11px] uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg outline-none select-none active:scale-[0.98]
              ${
                status === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : status === "preparing"
                  ? "bg-zinc-900 border-white/5 text-zinc-400"
                  : "bg-white text-zinc-950 border-transparent hover:-translate-y-[1px] hover:shadow-white/5"
              }
            `}
          >
            <span className="flex items-center gap-2">
              {status === "preparing" && <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />}
              {status === "success" && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              {getButtonText()}
            </span>
            {status === "idle" && <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 text-zinc-950" />}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={6}
            className="z-50 min-w-[160px] bg-zinc-950/95 backdrop-blur-xl border border-white/5 p-1.5 rounded-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100
              /* Mobile bottom sheet overlay simulation on small viewports */
              max-sm:fixed max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:min-w-0 max-sm:max-w-none
            "
          >
            <DropdownMenu.Item
              onSelect={() => handleSelect("png")}
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer outline-none transition-colors"
            >
              <Image className="w-3.5 h-3.5" />
              <span>PNG Image</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleSelect("jpg")}
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer outline-none transition-colors"
            >
              <Image className="w-3.5 h-3.5" />
              <span>JPG Image</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleSelect("svg")}
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer outline-none transition-colors"
            >
              <Shapes className="w-3.5 h-3.5" />
              <span>SVG Vector</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
