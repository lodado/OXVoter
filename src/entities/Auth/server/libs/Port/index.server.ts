import supabaseAdapterInstance from './SupabaseAdapter'
// import vercelPostgresAdapter from './vercelPostgresAdapter'

const KEY = 'supabase'

const adapter = {
  supabase: supabaseAdapterInstance,
  // 'vercel': vercelPostgresAdapter
}

const AuthPort = adapter[KEY]()

export { AuthPort }
