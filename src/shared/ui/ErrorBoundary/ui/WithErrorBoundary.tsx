"use client";

import React from "react";

import ErrorBoundary, { FallbackMapping } from "./ErrorBoundary";

// HOC로 감싸기 위한 withErrorBoundary 함수
function WithErrorBoundary(WrappedComponent: React.ComponentType<any>, fallbackMappings?: FallbackMapping[]) {
  const ComponentWithErrorBoundary = (props: any) => {
    return (
      <ErrorBoundary fallbackMappings={fallbackMappings}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  // 디버깅을 위한 displayName 설정
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${wrappedComponentName})`;

  return ComponentWithErrorBoundary;
}

export default WithErrorBoundary;
