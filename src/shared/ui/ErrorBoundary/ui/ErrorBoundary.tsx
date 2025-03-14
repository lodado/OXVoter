"use client";

import React from "react";

export interface FallbackMapping {
  condition: (error: Error) => boolean;
  component: React.ReactNode;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  // 여러 fallback 조건과 컴포넌트를 배열로 받습니다.
  fallbackMappings?: FallbackMapping[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 추가 로깅을 진행할 수 있습니다.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallbackMappings) {
        // 배열 내의 각 매핑 조건을 순차적으로 확인합니다.
        for (const mapping of this.props.fallbackMappings) {
          if (mapping.condition(this.state.error)) {
            return mapping.component;
          }
        }
      }
      // 조건에 맞는 매핑이 없으면 기본 폴백 UI를 렌더링합니다.
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
