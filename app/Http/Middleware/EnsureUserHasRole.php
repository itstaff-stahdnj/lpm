<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        if (! $user->is_active) {
            auth()->logout();

            return redirect()->route('login')->withErrors([
                'email' => 'Akun Anda sedang dinonaktifkan oleh Administrator LPM.',
            ]);
        }

        // Check if user has any of the permitted roles
        if (! empty($roles) && ! $user->hasRole(...$roles)) {
            abort(403, 'Akses Ditolak: Anda tidak memiliki hak akses (role) untuk modul penjaminan mutu ini.');
        }

        return $next($request);
    }
}
