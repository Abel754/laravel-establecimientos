<?php

namespace App\Http\Controllers;

use App\Imagen;
use App\Establecimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

class ImagenController extends Controller
{
    public function store(Request $request) {

        // leer la imagen
        $ruta_imagen = $request->file('file')->store('establecimientos', 'public');

        // Resize a la imagen
        $imagen = Image::make(public_path("storage/{$ruta_imagen}"))->fit(800, 450);
        $imagen->save();

        // Almacenar con modelo
        $imagenDB = new Imagen;
        $imagenDB->id_establecimiento = $request['uuid'];
        $imagenDB->ruta_imagen = $ruta_imagen;

        $imagenDB->save();

        // Retornar respuesta
        $respuesta = [
            'archivo' => $ruta_imagen
        ];

        return response()->json($respuesta);

    }

    // Elimina imagen BD I servidor
    public function destroy(Request $request) {
        // Posem get('imagen) perquè és el que enviem mitjançant axios des de dropzone.js
        $imagen = $request->get('imagen');

        // El mateix amb el uuid
        $uuid = $request->get('uuid');
        // Posem first perquè només hi ha un
        $establecimiento = Establecimiento::where('uuid', $uuid)->first();
        // Executem el Policy
        $this->authorize('delete', $establecimiento);

        // Si existeix la imatge, esborrar
        if(File::exists('storage/' . $imagen)) {
            // Elimina imagen del servidor
            File::delete('storage/' . $imagen);

            // Elimina imagen de la BD
            Imagen::where('ruta_imagen', '=', $imagen)->delete();

            $respuesta = [
                'eliminado' => 'Imagen Eliminada',
                'imagen' => $imagen,
            ];
        }

        return response()->json($respuesta);
    }
}
