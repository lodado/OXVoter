"use client";

import React from "react";

import InfoPage from "./InfoPage";

export interface FallbackMapping {
  condition: (error: Error) => boolean;
  component: (props: { onResetErrorBoundary?: () => void }) => React.ReactElement;
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}

  // 에러 상태를 리셋하는 함수
  handleResetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallbackMappings) {
        // 배열 내의 각 매핑 조건을 순차적으로 확인합니다.
        for (const mapping of this.props.fallbackMappings) {
          if (mapping.condition(this.state.error)) {
            // 폴백 컴포넌트에 리셋 함수 전달 (필요시)
            const FallbackComponent = mapping.component;
            return <FallbackComponent onResetErrorBoundary={this.handleResetErrorBoundary} />;
          }
        }
      }
      // 조건에 맞는 매핑이 없으면 기본 폴백 UI를 렌더링합니다.
      // InfoPage에도 reset 함수를 전달할 수 있습니다.
      return <InfoPage onResetErrorBoundary={this.handleResetErrorBoundary} />;
    }
    // 자식 컴포넌트에 resetErrorBoundary prop 추가 전달
    return this.props.children;
  }
}
