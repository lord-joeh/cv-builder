/**
 * A simple in-memory fixed window rate limiter.
 * This is suitable for a single-instance Node.js process (like inside a Docker container).
 */

interface RateLimitTracker {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitTracker>();

export function rateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000,
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const tracker = rateLimitMap.get(ip);

  // If there's an existing tracker and the window has not expired
  if (tracker && now < tracker.resetAt) {
    if (tracker.count >= limit) {
      return { success: false, remaining: 0, resetAt: tracker.resetAt };
    }

    // Increment count
    tracker.count += 1;
    return {
      success: true,
      remaining: limit - tracker.count,
      resetAt: tracker.resetAt,
    };
  }

  // Create a new tracker or reset the expired one
  const newResetAt = now + windowMs;
  rateLimitMap.set(ip, { count: 1, resetAt: newResetAt });

  // Periodically clean up expired IPs to prevent memory leaks if Map gets too large
  if (rateLimitMap.size > 1000) {
    cleanupRateLimits();
  }

  return { success: true, remaining: limit - 1, resetAt: newResetAt };
}

function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, tracker] of rateLimitMap.entries()) {
    if (now >= tracker.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}
