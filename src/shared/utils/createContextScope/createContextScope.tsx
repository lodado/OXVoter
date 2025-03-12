import * as React from 'react'

function createReactContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext)

  const Provider = (props: ContextValueType & { children: React.ReactNode }) => {
    const { children, ...context } = props
    // Only re-memoize when prop values change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => context, Object.values(context)) as ContextValueType
    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  function useContext(consumerName: string) {
    const context = React.useContext(Context)
    if (context) return context
    if (defaultContext !== undefined) return defaultContext
    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }

  Provider.displayName = `${rootComponentName}Provider`
  return [Provider, useContext] as const
}

/* -------------------------------------------------------------------------------------------------
 * createContextScope
 * -----------------------------------------------------------------------------------------------*/

type Scope<C = any> = { [scopeName: string]: React.Context<C>[] } | undefined
type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope }
interface CreateScope {
  scopeName: string
  (): ScopeHook
}

/* -------------------------------------------------------------------------------------------------
 * composeContextScopes
 * -----------------------------------------------------------------------------------------------*/

function composeContextScopes(...scopes: CreateScope[]) {
  const baseScope = scopes[0]
  if (scopes.length === 1) return baseScope

  const createScope: CreateScope = () => {
    const scopeHooks = scopes.map((createScopeFunc) => ({
      useScope: createScopeFunc(),
      scopeName: createScopeFunc.scopeName,
    }))

    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScope, { useScope, scopeName }) => {
        // We are calling a hook inside a callback which React warns against to avoid inconsistent
        // renders, however, scoping doesn't have render side effects so we ignore the rule.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scopeProps = useScope(overrideScopes)
        const currentScope = scopeProps[`__scope${scopeName}`]
        return { ...nextScope, ...currentScope }
      }, {})

      return React.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes])
    }
  }

  createScope.scopeName = baseScope.scopeName
  return createScope
}

function createContextScope(scopeName: string, createContextScopeDeps: CreateScope[] = []) {
  let defaultContexts: any[] = []

  /* -----------------------------------------------------------------------------------------------
   * createContext
   * ---------------------------------------------------------------------------------------------*/

  function createContext<ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType,
  ) {
    const BaseContext = React.createContext<ContextValueType | undefined>(defaultContext)
    const index = defaultContexts.length
    defaultContexts = [...defaultContexts, defaultContext]

    const Provider = (props: ContextValueType & { scope: Scope<ContextValueType>; children: React.ReactNode }) => {
      const { scope, children, ...context } = props
      const Context = scope?.[scopeName][index] || BaseContext
      // Only re-memoize when prop values change
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const value = React.useMemo(() => context, Object.values(context)) as ContextValueType
      return <Context.Provider value={value}>{children}</Context.Provider>
    }

    function useContext(consumerName: string, scope: Scope<ContextValueType | undefined>) {
      const Context = scope?.[scopeName][index] || BaseContext
      const context = React.useContext(Context)
      if (context) return context
      if (defaultContext !== undefined) return defaultContext
      // if a defaultContext wasn't specified, it's a required context.
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
    }

    Provider.displayName = `${rootComponentName}Provider`
    return [Provider, useContext] as const
  }

  /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/

  const createScope: CreateScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React.createContext(defaultContext)
    })
    return function useScope(scope: Scope) {
      const contexts = scope?.[scopeName] || scopeContexts
      return React.useMemo(() => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }), [scope, contexts])
    }
  }

  createScope.scopeName = scopeName
  return [createContext, composeContextScopes(createScope, ...createContextScopeDeps)] as const
}

/* -----------------------------------------------------------------------------------------------*/

export { createReactContext as createContext, createContextScope }
export type { CreateScope, Scope }
