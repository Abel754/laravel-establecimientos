<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    // Leer las rutas por slug y no por ID
    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Relación 1:N para categorías y establecimientos
    public function establecimientos() {
        return $this->hasMany(Establecimiento::class);
    }
}
