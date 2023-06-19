<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    //
    public function index()
    {
        $groups = Group::all();
        return response()->json($groups, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'group_name' => 'required',
            'desc' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'created_by' => 'required',
            'category_id' => 'required',

        ]);
        $new_group = Group::create([
            'group_name' => $validatedData['group_name'],
            'desc' => $validatedData['desc'],
            'category_id' => $validatedData['category_id'],
            'created_by' => $validatedData['created_by'],
        ]);
        $file = $request->file('image');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $disk = 'local';

        // Save the file to the specified location
        $path = $file->storeAs('public/images', $fileName, $disk);

        // Create a symbolic link
        $publicPath = Storage::url($path);

        $new_group->header_path = $publicPath;
        $new_group->save();

        return response()->json($new_group, 201);
    }

    public function show(string $id)
    {
        $group = Group::find($id);
        return response()->json($group, 200);
    }

    public function update(Request $request, string $id)
    {
        $group = Group::find($id);
        $group->update($request->all());
        return response()->json($group);
    }

    public function destroy(string $id)
    {
        $group = Group::find($id);
        $group->delete();
        return response()->json(null, 204);
    }
}
