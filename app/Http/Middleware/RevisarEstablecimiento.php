<?php

namespace App\Http\Middleware;

use Closure;

class RevisarEstablecimiento
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(dd(Auth()->user()->establecimiento)) { // Si ja té algun establecimiento, redirecciona a editar perquè no pugui crear més
            return redirect('/establecimiento/edit');
        }
        return $next($request);
    }
}
