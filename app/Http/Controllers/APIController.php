<?php

namespace App\Http\Controllers;

use App\Imagen;
use App\Categoria;
use CategoriaSeed;
use App\Establecimiento;
use Illuminate\Http\Request;

class APIController extends Controller
{
    // Método para obtener todos los establecimientos
    public function index() {
        // Ens passem les dades junt amb la relació categoria
        $establecimientos = Establecimiento::with('categoria')->get();

        return response()->json($establecimientos);
    }

    // Método para obtener todas las categorías
    public function categorias() {
        $categorias = Categoria::all();
        return response()->json($categorias);
    }

    // Muestra los establecimientos de la categoria
    public function categoria(Categoria $categoria) {
        // Posem el with perquè també mostrarà la informació 'categoria' -> Mètode del Model Establecimiento relacionant amb Categorias
        $establecimientos = Establecimiento::where('categoria_id', $categoria->id)->with('categoria')->take(3)->get();
        return response()->json($establecimientos);
    }

    public function establecimientoscategoria(Categoria $categoria) {
        // Posem el with perquè també mostrarà la informació 'categoria' -> Mètode del Model Establecimiento relacionant amb Categorias
        $establecimientos = Establecimiento::where('categoria_id', $categoria->id)->with('categoria')->get();
        return response()->json($establecimientos);
    }

    // Muestra un establecimiento en específico
    public function show(Establecimiento $establecimiento) {

        $imagenes = Imagen::where('id_establecimiento', $establecimiento->uuid)->get();
        $establecimiento->imagenes = $imagenes;

        return response()->json($establecimiento);
    }
}
