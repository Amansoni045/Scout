"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-6 bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-zinc-400 max-w-md mb-4">
              An unexpected error occurred while rendering this component.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold rounded-lg transition-colors border border-zinc-700"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
