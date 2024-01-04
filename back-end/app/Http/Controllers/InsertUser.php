<?php

namespace  App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class InsertUser extends Controller
{
    function insertData(Request $request)
    {
        $data = $request->all();
        $user = new User();
        $user->fill($data);
        $user->save();
        return response()->json(['message' => 'Data inserted successfully', 'user' => $user]);
    }
}
