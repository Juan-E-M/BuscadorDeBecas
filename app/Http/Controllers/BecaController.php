<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ocde;
use App\Models\Ods;
use App\Models\Country;
use App\Models\Beca;
use Illuminate\Support\Facades\Storage;


class BecaController extends Controller
{
    public function index()
    {
        $becas = Beca::with('ods', 'ocde', 'country')->get();
        $ocdes = Ocde::all();
        $odss = Ods::all();
        $countries = Country::all();
        return Inertia::render('Becas/Index', [
            'becas' => $becas,
            'ocdes' => $ocdes,
            'odss' => $odss,
            'countries'=> $countries
        ]);
    }

    public function create()
    {
        $ocdes = Ocde::all();
        $odss = Ods::all();
        $countries = Country::all();
        return Inertia::render('Becas/Create', [
            'ocdes' => $ocdes,
            'odss' => $odss,
            'countries' => $countries,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'institution' => 'required',
            'name' => 'required',
            'summary' => 'required',
            'type'=> 'required',
            'obligation'=> 'required',
            'region' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'budget' => 'required',
            'status' => 'required',
            'others' => 'required',
            'link' => 'required|url',
            'file' => 'file|mimes:pdf,doc,docx',
            'country' => 'required',
            'ods' => 'required|array',
            'ocde' => 'required|array',
        ]);
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $data['file_path'] = $filePath;
        }
        $beca = Beca::create($data);
        $beca->country()->associate($request->input('country'));
        $beca->save();
        if ($request->has('ods')) {
            $beca->ods()->attach($request->input('ods'));
        }
        if ($request->has('ocde')) {
            $beca->ocde()->attach($request->input('ocde'));
        }
        return redirect()->back();
    }
    private function getFileLink($filePath)
    {
        return asset(Storage::url($filePath));
    }

    public function show($id)
    {
        $beca = Beca::with('ods', 'ocde', 'country')->find($id);
        if (!$beca) {
            return response()->json(['message' => 'registro no encontrado'], 404);
        }
        $fileLink = $this->getFileLink($beca->file_path);
        $beca->file_path = $fileLink;
        return Inertia::render('Becas/Show', [
            'beca' => $beca,
        ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }
    public function destroy($id)
    {
        $beca = Beca::find($id);
        if (!$beca) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        if ($beca->file_path) {
            Storage::disk('public')->delete($beca->file_path);
        }
        $beca->delete();
        return Inertia::location(route('becas.index'));
    }




}
