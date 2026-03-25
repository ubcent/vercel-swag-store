import { env } from "@/shared/config"

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

interface ApiEnvelope<T> {
  success: boolean
  data: T
  meta?: Record<string, unknown>
  error?: { code: string; message: string }
}

export interface FetchResult<T> {
  data: T
  meta?: Record<string, unknown>
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<FetchResult<T>> {
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "x-vercel-protection-bypass": env.API_BYPASS_TOKEN,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  const json: ApiEnvelope<T> = await res.json()

  if (!json.success) {
    throw new ApiError(
      json.error?.code ?? "UNKNOWN",
      json.error?.message ?? "An unknown error occurred",
      res.status,
    )
  }

  return { data: json.data, meta: json.meta }
}
